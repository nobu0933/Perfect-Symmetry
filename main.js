// main.js
import { SymmetryGroups } from './symmetryGroups.js';
import { SymmetryConfig } from './symmetryConfig.js';
// ★ shapes.js から図形データをインポート
import { ShapeDefs, SHAPES, SHAPE_TYPES, SHAPE_COLORS } from './shapes.js';

document.addEventListener('DOMContentLoaded', () => {
	// 1. 図形プルダウンの生成と連動
	const shapeSelect = document.getElementById('debug-shape-select');
	if (shapeSelect) {
		shapeSelect.innerHTML = '';
		for (const key in SHAPES) {
			const option = document.createElement('option');
			option.value = SHAPES[key].id;
			option.textContent = SHAPES[key].nameJa;
			shapeSelect.appendChild(option);
		}

		// 起動時にランダム生成された図形をUIに合わせる
		shapeSelect.value = initialShape.type;

		// 変更イベント：initialShapeを書き換え、配置済みの初期図形も更新する
		shapeSelect.addEventListener('change', (e) => {
			initialShape.type = e.target.value;
			if (placedShapes.length > 0 && placedShapes[0].isInitial) {
				placedShapes[0].type = initialShape.type;
			}
			draw();
		});
	}

	// 2. カスタムカラーピッカーの生成と連動
	const colorSelect = document.getElementById('debug-color-select');
	const pickerTrigger = document.getElementById('color-picker-trigger');
	const pickerOptions = document.getElementById('color-picker-options');

	if (colorSelect && pickerTrigger && pickerOptions) {
		colorSelect.innerHTML = '';
		pickerOptions.innerHTML = '';

		SHAPE_COLORS.forEach((color, index) => {
			const option = document.createElement('option');
			option.value = color.value;
			colorSelect.appendChild(option);

			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'color-option';
			btn.style.backgroundColor = color.value;
			btn.addEventListener('click', () => {
				selectColor(color.value);
				pickerOptions.style.display = 'none';
			});
			pickerOptions.appendChild(btn);
		});

		function selectColor(hexColor) {
			colorSelect.value = hexColor;
			pickerTrigger.style.backgroundColor = hexColor;

			// ★ initialShapeの色を更新し、キャンバスに即時反映
			initialShape.color = hexColor;
			if (placedShapes.length > 0 && placedShapes[0].isInitial) {
				placedShapes[0].color = hexColor;
			}
			draw();
			colorSelect.dispatchEvent(new Event('change'));
		}

		// 初期カラーを設定 (ランダム生成された色をセット)
		selectColor(initialShape.color);

		pickerTrigger.addEventListener('click', (e) => {
			e.stopPropagation();
			const isVisible = pickerOptions.style.display === 'flex';
			pickerOptions.style.display = isVisible ? 'none' : 'flex';
		});

		document.addEventListener('click', () => {
			pickerOptions.style.display = 'none';
		});
	}

	// 3. 「自分で初期配置を決める」チェックボックスの連動
	const manualToggle = document.getElementById('manual-init-toggle');
	const manualHint = document.getElementById('manual-init-hint');
	if (manualToggle) {
		manualToggle.addEventListener('change', (e) => {
			isManualInitMode = e.target.checked;
			if (manualHint) {
				manualHint.style.display = e.target.checked ? 'block' : 'none';
			}

			if (currentAppMode === 'debug') {
				if (isManualInitMode) {
					// ONになったら即座に配置をリセットして手動配置モードに入る
					resetPlacement();
				} else {
					// OFFになったとき、まだ手動配置が終わっていなければ元の問題を復活させる
					if (isPlacingFirst) {
						isPlacingFirst = false;
						placedShapes = [{ ...initialShape, isInitial: true }];
						draw();
					}
				}
			}
		});
	}
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 200;
const OFFSET_X = 200;
const OFFSET_Y = 200;

let currentGroup = 'p1';
let isMouseInCanvas = false;
let previewShape = { x: 0, y: 0, angle: 0, flipped: false };
let placedShapes = [];

let isScored = false;

// ==========================================
// デバッグカウンターの更新関数
// ==========================================
function updateDebugCounters(scoreData = null) {
	if (currentAppMode !== 'debug') return;

	// 配置数の更新 (初期図形以外のユーザー配置数)
	const userPlacedCount = placedShapes.filter((s) => !s.isInitial).length;
	const placedCountEl = document.getElementById('debug-placed-count');
	if (placedCountEl) placedCountEl.textContent = userPlacedCount;

	// 減点内訳の更新
	if (scoreData) {
		document.getElementById('debug-penalty-extra').textContent = scoreData.extraPenalty || 0;
		document.getElementById('debug-penalty-missing').textContent = scoreData.missingCount || 0;
		document.getElementById('debug-penalty-position').textContent = Math.round(
			scoreData.positionPenalty || 0,
		);
		document.getElementById('debug-penalty-transform').textContent = Math.round(
			scoreData.transformPenalty || 0,
		);
	} else if (!isScored) {
		// リセットされた場合は0に戻す
		document.getElementById('debug-penalty-extra').textContent = 0;
		document.getElementById('debug-penalty-missing').textContent = 0;
		document.getElementById('debug-penalty-position').textContent = 0;
		document.getElementById('debug-penalty-transform').textContent = 0;
	}
}

// ==========================================
// 追加: デバッグ用の状態管理フラグ
// ==========================================
let isManualInitMode = false; // 「自分で初期配置を決める」がONかどうか
let isPlacingFirst = false; // 最初の1個目を手動で配置中かどうか

// --- ランダム生成用の設定 ---
const INITIAL_ANGLE_STEP = 90; // 向きの刻み幅
const MIN_SIZE = 30; // 現状程度のサイズ（下限）
const MAX_SIZE = CELL_SIZE / 2; // 単位格子の半分の正方形（上限）

// 初期図形をランダムに生成する関数
function generateRandomInitialShape() {
	const type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
	const colorObj = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];
	const color = colorObj.value; // ★修正: オブジェクトではなくカラーコード文字列を取り出す

	const size = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;

	// ★ 単位格子の端10%（20px）には配置されないよう制限
	const padding = CELL_SIZE * 0.1; // 10%がデフォ
	const allowedRange = CELL_SIZE - padding * 2; // 160px

	const x = OFFSET_X + padding + Math.random() * allowedRange;
	const y = OFFSET_Y + padding + Math.random() * allowedRange;

	// 刻み幅に応じたランダムな角度
	const steps = Math.floor(360 / INITIAL_ANGLE_STEP);
	const angle = Math.floor(Math.random() * steps) * INITIAL_ANGLE_STEP;

	// ランダムな反転状態
	const flipped = Math.random() > 0.5;

	return { x, y, angle, flipped, type, size, color, isInitial: true };
}

// 初期配置図形のセットアップ
let initialShape = generateRandomInitialShape();
placedShapes.push(initialShape);
// プレビューの初期角度・反転状態を合わせる（右クリック時の回転ズレを防ぐため）
previewShape.angle = initialShape.angle;
previewShape.flipped = initialShape.flipped;

// セレクトボックスの選択肢を動的に生成
function initGroupSelector() {
	const groupSelect = document.getElementById('group-select');
	groupSelect.innerHTML = '';
	for (const key in SymmetryGroups) {
		const option = document.createElement('option');
		option.value = key;
		option.textContent = SymmetryGroups[key].name;
		groupSelect.appendChild(option);
	}
}
initGroupSelector();

// ヒントのチェック状態を取得
function getHints() {
	return {
		rotation: document.getElementById('hint-rotation').checked,
		mirror: document.getElementById('hint-mirror').checked,
		glide: document.getElementById('hint-glide').checked,
		showProblem: document.getElementById('show-problem-toggle').checked, // ★これを追加
	};
}

// ヒントのチェックボックスが変更されたら再描画
['hint-rotation', 'hint-mirror', 'hint-glide', 'show-problem-toggle'].forEach((id) => {
	document.getElementById(id).addEventListener('change', () => {
		draw();
		if (isScored) {
			drawModelAnswer();
		}
	});
});

function hideResult() {
	document.getElementById('result-area').style.display = 'none';
	document.getElementById('next-btn').style.display = 'none';
}

function wrap(val, offset, size) {
	return offset + ((((val - offset) % size) + size) % size);
}
1;
// 六角格子（ひし形単位胞）専用の wrap 関数
function wrapHex(x, y, OFFSET_X, OFFSET_Y, CELL_SIZE) {
	const L = CELL_SIZE;
	const H_tri = (L * Math.sqrt(3)) / 2; // 正三角形の高さ

	// 1. 直交座標を、並進ベクトル a1, a2 の係数 (u, v) に変換
	const vFloat = (y - OFFSET_Y) / H_tri;
	const uFloat = (x - OFFSET_X - vFloat * (L / 2)) / L;

	// 2. 単位格子内（0.0 〜 1.0未満）に収める（JavaScriptの負数modulo対策を含む）
	const uBase = ((uFloat % 1) + 1) % 1;
	const vBase = ((vFloat % 1) + 1) % 1;

	// 3. 再び直交座標に戻してオブジェクトで返す
	return {
		x: OFFSET_X + uBase * L + vBase * (L / 2),
		y: OFFSET_Y + vBase * H_tri,
	};
}

function resetUI() {
	isScored = false;
	document.getElementById('score-btn').disabled = false;
	document.getElementById('flip-btn').disabled = false;
	document.getElementById('reset-btn').disabled = false;
	canvas.style.cursor = 'none';
	// document.getElementById('show-user-answer-toggle').checked = false;

	// ヒントのチェックをすべて外す（デフォルトオフ）
	document.getElementById('hint-rotation').checked = false;
	document.getElementById('hint-mirror').checked = false;
	document.getElementById('hint-glide').checked = false;

	// 問題が切り替わるたびに「問題を表示」をオンに戻す
	document.getElementById('show-problem-toggle').checked = true;

	hideResult();
}

document.getElementById('group-select').addEventListener('change', (e) => {
	currentGroup = e.target.value;
	resetPlacement();
});

document.getElementById('show-user-answer-toggle').addEventListener('change', () => {
	drawModelAnswer();
});

function getCorrectShapes() {
	const p0 = initialShape;
	const groupDef = SymmetryGroups[currentGroup];
	if (groupDef) {
		return groupDef.getCorrectShapes(p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap, wrapHex);
	}
	return [{ ...p0 }];
}

function drawShape(context, x, y, angle, flipped, type, size, color, alpha = 1.0) {
	context.save();
	context.globalAlpha = alpha;
	context.translate(x, y);
	context.rotate((angle * Math.PI) / 180);
	if (flipped) context.scale(-1, 1);

	context.beginPath();

	// ★ shapes.js に定義されている描画ロジックを呼び出す
	if (ShapeDefs[type] && ShapeDefs[type].drawPath) {
		ShapeDefs[type].drawPath(context, size);
	}

	context.fillStyle = color;
	context.fill();
	context.restore();
}

function drawInAllCells(x, y, angle, flipped, alpha = 1.0) {
	const config = SymmetryConfig[currentGroup];
	const isHexagonal = config && config.system === 'hexagonal';

	if (isHexagonal) {
		// ==========================================
		// 六角格子系 (system: 'hexagonal') の並進
		// ==========================================
		const L = CELL_SIZE;
		const H_tri = (L * Math.sqrt(3)) / 2; // 正三角形の高さ

		// 1. 直交座標(x, y)を、斜交座標系(u, v)に変換
		// v軸方向(斜め60度)の成分
		const vFloat = y / H_tri;
		// u軸方向(水平)の成分
		const uFloat = (x - vFloat * (L / 2)) / L;

		// 2. 単位格子内(0.0 〜 1.0未満)の相対的な位置に丸め込む（moduloと同じ役割）
		const uBase = uFloat - Math.floor(uFloat);
		const vBase = vFloat - Math.floor(vFloat);

		// 3. 直交座標系のベース相対座標(relX, relY)に戻す
		const relX = uBase * L + vBase * (L / 2);
		const relY = vBase * H_tri;

		// 4. キャンバス全体を覆うようにループ描画
		// 斜め方向へのズレを考慮し、直交より少し広め（-3 ～ 最大幅+2）にループを回す
		const maxU = Math.ceil(canvas.width / L) + 2;
		const maxV = Math.ceil(canvas.height / H_tri) + 2;

		for (let u = -3; u <= maxU; u++) {
			for (let v = -3; v <= maxV; v++) {
				const dx = u * L + v * (L / 2);
				const dy = v * H_tri;

				drawShape(
					ctx,
					relX + dx,
					relY + dy,
					angle,
					flipped,
					initialShape.type,
					initialShape.size,
					initialShape.color,
					alpha,
				);
			}
		}
	} else {
		// ==========================================
		// 直交格子系 (system: 'orthogonal') の並進（既存コード）
		// ==========================================
		const relX = ((x % CELL_SIZE) + CELL_SIZE) % CELL_SIZE;
		const relY = ((y % CELL_SIZE) + CELL_SIZE) % CELL_SIZE;

		// 従来の 0 〜 canvas.width(600) までの4回(4マス)ループから、
		// -CELL_SIZE(-200) 〜 canvas.width(600) までの 5回(5マス)ループに変更 (5×5=25個描画)
		for (let gx = -CELL_SIZE; gx <= canvas.width; gx += CELL_SIZE) {
			for (let gy = -CELL_SIZE; gy <= canvas.height; gy += CELL_SIZE) {
				drawShape(
					ctx,
					gx + relX,
					gy + relY,
					angle,
					flipped,
					initialShape.type,
					initialShape.size,
					initialShape.color,
					alpha,
				);
			}
		}
	}
}

// =========================================================================
// 変更後：draw() 関数
// =========================================================================
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 現在のグループの設定から六角格子（hexagonal）かどうかを判定
	const config = SymmetryConfig[currentGroup];
	const isHexagonal = config && config.system === 'hexagonal';

	if (isHexagonal) {
		// ==================== 六角格子 (system: 'hexagonal') の描画 ====================
		const H_tri = (CELL_SIZE * Math.sqrt(3)) / 2; // 正三角形の高さ（約173.2px）
		const SQRT_3 = Math.sqrt(3);

		// --- 1. 薄い格子線 (1px) の描画 ---
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 1;

		// A. 水平線群
		const minN = Math.floor(-OFFSET_Y / H_tri) - 1;
		const maxN = Math.ceil((canvas.height - OFFSET_Y) / H_tri) + 1;
		for (let n = minN; n <= maxN; n++) {
			const y = OFFSET_Y + n * H_tri;
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
			ctx.stroke();
		}

		// 斜め線のループ範囲 (画面の端まで確実にカバーする範囲を算出)
		const xStartMin = -canvas.height / SQRT_3;
		const minU = Math.floor((xStartMin - OFFSET_X) / CELL_SIZE) - 2;
		const maxU = Math.ceil((canvas.width + Math.abs(xStartMin) - OFFSET_X) / CELL_SIZE) + 2;

		// B. 60度斜め線群（傾き √3）
		for (let u = minU; u <= maxU; u++) {
			const xTop = OFFSET_X + u * CELL_SIZE - OFFSET_Y / SQRT_3;
			const xBottom = OFFSET_X + u * CELL_SIZE + (canvas.height - OFFSET_Y) / SQRT_3;
			ctx.beginPath();
			ctx.moveTo(xTop, 0);
			ctx.lineTo(xBottom, canvas.height);
			ctx.stroke();
		}

		// C. 120度斜め線群（傾き -√3）
		for (let u = minU; u <= maxU; u++) {
			const xTop = OFFSET_X + u * CELL_SIZE + OFFSET_Y / SQRT_3;
			const xBottom = OFFSET_X + u * CELL_SIZE - (canvas.height - OFFSET_Y) / SQRT_3;
			ctx.beginPath();
			ctx.moveTo(xTop, 0);
			ctx.lineTo(xBottom, canvas.height);
			ctx.stroke();
		}

		// --- 2. メイン単位格子枠（ひし形、太線 3px） ---
		ctx.strokeStyle = '#8c8c8c';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(OFFSET_X, OFFSET_Y);
		ctx.lineTo(OFFSET_X + CELL_SIZE, OFFSET_Y);
		ctx.lineTo(OFFSET_X + CELL_SIZE * 1.5, OFFSET_Y + H_tri);
		ctx.lineTo(OFFSET_X + CELL_SIZE * 0.5, OFFSET_Y + H_tri);
		ctx.closePath();
		ctx.stroke();
	} else {
		// ==================== 直交格子 (system: 'orthogonal') の描画（従来通り） ====================
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 1;
		for (let x = 0; x <= canvas.width; x += CELL_SIZE) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas.height);
			ctx.stroke();
		}
		for (let y = 0; y <= canvas.height; y += CELL_SIZE) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
			ctx.stroke();
		}

		// メイン単位格子枠（正方形、太線 3px）
		ctx.strokeStyle = '#8c8c8c';
		ctx.lineWidth = 3;
		ctx.strokeRect(OFFSET_X, OFFSET_Y, CELL_SIZE, CELL_SIZE);
	}

	// 平面群ごとの描画（ヒント状態を渡す）
	const groupDef = SymmetryGroups[currentGroup];
	if (groupDef && groupDef.drawAxes) {
		groupDef.drawAxes(ctx, OFFSET_X, OFFSET_Y, CELL_SIZE, getHints());
	}

	placedShapes.forEach((shape) => {
		drawInAllCells(shape.x, shape.y, shape.angle, shape.flipped, 1.0);
	});

	if (isMouseInCanvas && !isScored) {
		if (isPlacingFirst) {
			// 最初の1個目を手動配置中の場合：周期的なプレビューを表示する
			drawInAllCells(previewShape.x, previewShape.y, previewShape.angle, previewShape.flipped, 0.4);
		} else {
			// 2個目以降の通常の配置時：カーソル位置のみにプレビュー
			drawShape(
				ctx,
				previewShape.x,
				previewShape.y,
				previewShape.angle,
				previewShape.flipped,
				initialShape.type,
				initialShape.size,
				initialShape.color,
				0.4,
			);
		}
	}
}

canvas.addEventListener('mousemove', (e) => {
	const rect = canvas.getBoundingClientRect();
	const mx = e.clientX - rect.left;
	const my = e.clientY - rect.top;

	if (mx >= 0 && mx <= canvas.width && my >= 0 && my <= canvas.height) {
		isMouseInCanvas = true;
		previewShape.x = mx;
		previewShape.y = my;
	} else {
		isMouseInCanvas = false;
	}
	draw();
});

canvas.addEventListener('mouseleave', () => {
	isMouseInCanvas = false;
	draw();
});

// 右クリック時の回転角度を平面群の設定に合わせて動的に変更
canvas.addEventListener('contextmenu', (e) => {
	e.preventDefault();
	if (!isMouseInCanvas || isScored) return;

	// 平面群ごとの回転角度を取得（未定義の場合は180度をデフォルトに）
	const angleStep = SymmetryConfig[currentGroup]?.clickAngle ?? 180;
	previewShape.angle = (previewShape.angle + angleStep) % 360;
	draw();
});

function flipShape() {
	if (isScored) return;
	previewShape.flipped = !previewShape.flipped;
	draw();
}

// --- resetPlacement() の上書き ---
function resetPlacement() {
	if (currentAppMode === 'debug' && isManualInitMode) {
		// 手動配置モード：最初は図形を空にし、配置待ち状態にする
		placedShapes = [];
		isPlacingFirst = true;
	} else {
		// 通常モード：ランダム生成(または既存)の初期図形を問題として配置する
		placedShapes = [{ ...initialShape, isInitial: true }];
		isPlacingFirst = false;
	}

	previewShape.angle = initialShape.angle;
	previewShape.flipped = initialShape.flipped;

	if (typeof resetUI === 'function') resetUI();
	draw();
	updateDebugCounters(); // ★これを追加（配置数と減点をリセット）

	// ==========================================
	// ★ ここを追加: 平面群の名前を画面に表示する
	// ==========================================
	const nameEl = document.getElementById('group-name-display');
	if (nameEl && SymmetryGroups[currentGroup]) {
		// symmetryGroups.js で定義されている名前を取得して表示
		nameEl.textContent = SymmetryGroups[currentGroup].name;
	}
}

// --- マウスホイールでのサイズ変更（新規追加） ---
canvas.addEventListener(
	'wheel',
	(e) => {
		if (isPlacingFirst) {
			e.preventDefault(); // 画面スクロールを防止
			if (e.deltaY < 0) {
				initialShape.size += 5; // 上にスクロールで拡大
			} else {
				initialShape.size -= 5; // 下にスクロールで縮小
			}
			// サイズの下限・上限を制限
			initialShape.size = Math.max(10, Math.min(initialShape.size, CELL_SIZE));
			draw();
		}
	},
	{ passive: false },
);

// --- canvasのクリックイベントの上書き ---
canvas.addEventListener('click', (e) => {
	if (isScored) {
		const toggle = document.getElementById('show-problem-toggle');
		toggle.checked = !toggle.checked;
		draw();
		drawModelAnswer();
		return;
	}

	if (!isMouseInCanvas) return;

	if (isPlacingFirst) {
		// ★ 1個目（自分で初期配置を決める）の場合
		initialShape.x = previewShape.x;
		initialShape.y = previewShape.y;
		initialShape.angle = previewShape.angle;
		initialShape.flipped = previewShape.flipped;
		initialShape.isInitial = true;

		// 最初の問題図形として placedShapes に登録し、手動配置を終了
		placedShapes = [{ ...initialShape }];
		isPlacingFirst = false;
	} else {
		// ★ 2個目以降（通常のゲームプレイ時の配置）
		placedShapes.push({
			x: previewShape.x,
			y: previewShape.y,
			angle: previewShape.angle,
			flipped: previewShape.flipped,
			isInitial: false,
		});
	}
	draw();
	updateDebugCounters(); // ★これを追加（クリックして配置するたびに数を更新）
});

function doScore() {
	if (isScored) return;

	document.getElementById('show-problem-toggle').checked = false;
	document.getElementById('hint-rotation').checked = false;
	document.getElementById('hint-mirror').checked = false;
	document.getElementById('hint-glide').checked = false;

	let totalScore = 0;
	let errors = [];

	// デバッグ用減点記録変数
	let extraPenalty = 0;
	let missingCount = 0;
	let positionPenalty = 0;
	let transformPenalty = 0;

	const userPlaced = placedShapes.filter((s) => !s.isInitial);

	// ★ 現在のグループが六角格子かどうかを判定
	const config = SymmetryConfig[currentGroup];
	const isHexagonal = config && config.system === 'hexagonal';

	if (currentGroup === 'p1') {
		totalScore = 100;
	} else {
		const corrects = getCorrectShapes();
		const targets = corrects.filter((c) => !c.isInitial);

		if (targets.length > 0) {
			const pointsPerTarget = 100 / targets.length;
			const usedUserIndices = new Set();

			let incorrectTransformCount = 0;
			let positionPenaltyCount = 0;

			targets.forEach((target) => {
				let bestMatchIndex = -1;
				let minDistance = Infinity; // 実際の最短距離（採点用）
				let minMatchPriority = Infinity; // ★ マッチング優先度（ペアリング用）

				userPlaced.forEach((user, index) => {
					if (usedUserIndices.has(index)) return;

					let dist = Infinity;

					if (isHexagonal) {
						// 六角格子における最短距離計算
						const L = CELL_SIZE;
						const H_tri = (L * Math.sqrt(3)) / 2;

						const dx = user.x - target.x;
						const dy = user.y - target.y;

						const dv = dy / H_tri;
						const du = (dx - dv * (L / 2)) / L;

						const wrapU = du - Math.round(du);
						const wrapV = dv - Math.round(dv);

						const closestDx = wrapU * L + wrapV * (L / 2);
						const closestDy = wrapV * H_tri;

						dist = Math.hypot(closestDx, closestDy);
					} else {
						// 直交格子における最短距離計算
						const diffX = Math.abs(user.x - target.x) % CELL_SIZE;
						const minDx = Math.min(diffX, CELL_SIZE - diffX);
						const diffY = Math.abs(user.y - target.y) % CELL_SIZE;
						const minDy = Math.min(diffY, CELL_SIZE - diffY);
						dist = Math.sqrt(minDx * minDx + minDy * minDy);
					}

					// ==========================================
					// ★ 修正箇所: 向き・反転状態を評価して優先度を計算
					// ==========================================
					const angleDiff = Math.abs(user.angle - target.angle) % 360;
					const isAngleCorrect = angleDiff < 5 || angleDiff > 355;
					const isFlipCorrect = user.flipped === target.flipped;
					const isTransformCorrect = isAngleCorrect && isFlipCorrect;

					// 向きや反転が「違う」図形には、マッチング優先度スコアに +10000 のペナルティを与える。
					// これにより、少し遠くても「向き・反転が合っている図形」が優先して結び付けられる。
					const matchPriority = dist + (isTransformCorrect ? 0 : 10000);

					if (matchPriority < minMatchPriority) {
						minMatchPriority = matchPriority;
						minDistance = dist; // 実際の採点計算に使うのは純粋な距離
						bestMatchIndex = index;
					}
				});

				// ==========================================
				// 採点計算（以降は変更なし）
				// ==========================================
				if (bestMatchIndex === -1 || minDistance > 50) {
					missingCount++;
				} else {
					usedUserIndices.add(bestMatchIndex);
					const bestMatch = userPlaced[bestMatchIndex];

					// 1. 位置の大まかな一致 (40%)
					totalScore += pointsPerTarget * 0.4;

					// 2. 距離による精度の得点 (最大30%)
					if (minDistance <= 3) {
						totalScore += pointsPerTarget * 0.3;
					} else {
						const posScore = pointsPerTarget * 0.3 * (1 - (minDistance - 3) / 47);
						totalScore += posScore;
						positionPenalty += pointsPerTarget * 0.3 - posScore;
						positionPenaltyCount++;
					}

					// 3. 向きと反転の得点 (30%)
					const angleDiff = Math.abs(bestMatch.angle - target.angle) % 360;
					const isAngleCorrect = angleDiff < 5 || angleDiff > 355;
					const isFlipCorrect = bestMatch.flipped === target.flipped;

					if (isAngleCorrect && isFlipCorrect) {
						totalScore += pointsPerTarget * 0.3;
					} else {
						transformPenalty += pointsPerTarget * 0.3;
						incorrectTransformCount++;
					}
				}
			});

			// 余分な配置のペナルティ
			const extraCount = userPlaced.length - targets.length;
			if (extraCount > 0) {
				extraPenalty = extraCount * 20;
				totalScore -= extraPenalty;
				errors.push('・余分な模様が配置されています。');
			}

			if (missingCount > 0) errors.push('・配置すべき場所に模様がありません。');
			if (positionPenaltyCount > 0) errors.push('・配置位置が少しズレている模様があります。');
			if (incorrectTransformCount > 0) errors.push('・模様の向き、または反転状態が違います。');
		}
	}

	totalScore = Math.max(0, Math.min(100, Math.round(totalScore)));
	isScored = true;

	updateDebugCounters({
		extraPenalty,
		missingCount,
		positionPenalty,
		transformPenalty,
	});

	document.getElementById('score-btn').disabled = true;
	document.getElementById('flip-btn').disabled = true;
	document.getElementById('reset-btn').disabled = true;
	canvas.style.cursor = 'default';
	document.getElementById('result-area').style.display = 'block';
	document.getElementById('next-btn').style.display = 'block';

	const scoreDisplay = document.getElementById('score-display');
	const adviceDisplay = document.getElementById('advice-display');

	if (totalScore === 100) {
		scoreDisplay.style.color = '#28a745';
		scoreDisplay.textContent = '🎉 100点 Perfect!';
		adviceDisplay.style.display = 'block';
		adviceDisplay.textContent = '完璧です！';
	} else if (totalScore >= 90) {
		scoreDisplay.style.color = '#ff9800';
		scoreDisplay.textContent = `採点結果: ${totalScore}点`;
		adviceDisplay.style.display = 'block';
		adviceDisplay.textContent = 'ほぼ完璧です！';
	} else {
		scoreDisplay.style.color = totalScore > 0 ? '#ff9800' : '#d9534f';
		scoreDisplay.textContent = `採点結果: ${totalScore}点`;
		adviceDisplay.style.display = 'block';
		adviceDisplay.innerHTML = errors.join('<br>') || 'もう少しで完璧です！';
	}

	drawModelAnswer();
	draw();
}

function nextProblem() {
	// ★ 新規追加: ランダムトグルがオンの場合、平面群をランダムに変更する
	const randomToggle = document.getElementById('random-group-toggle');
	if (randomToggle && randomToggle.checked) {
		const groupKeys = Object.keys(SymmetryConfig);
		const randomGroup = groupKeys[Math.floor(Math.random() * groupKeys.length)];

		currentGroup = randomGroup;

		// UIのセレクトボックスも同期させる
		const groupSelect = document.getElementById('group-select');
		if (groupSelect) {
			groupSelect.value = randomGroup;
		}
	}

	// 新しい図形をランダム生成してリセット
	initialShape = generateRandomInitialShape();

	// ★ 新しく生成された図形・色をデバッグUIの表示にも同期させる
	const shapeSelect = document.getElementById('debug-shape-select');
	if (shapeSelect) shapeSelect.value = initialShape.type;

	const colorSelect = document.getElementById('debug-color-select');
	const pickerTrigger = document.getElementById('color-picker-trigger');
	if (colorSelect && pickerTrigger) {
		colorSelect.value = initialShape.color;
		pickerTrigger.style.backgroundColor = initialShape.color;
	}

	resetPlacement();
}

document.getElementById('flip-btn').addEventListener('click', flipShape);
document.getElementById('reset-btn').addEventListener('click', resetPlacement);
document.getElementById('score-btn').addEventListener('click', doScore);
document.getElementById('next-btn').addEventListener('click', nextProblem);
// ★ 採点後に模範解答エリアをクリックした際も「問題を表示」を切り替える
document.getElementById('answerCanvas').addEventListener('click', () => {
	if (isScored) {
		const toggle = document.getElementById('show-problem-toggle');
		toggle.checked = !toggle.checked;
		draw();
		drawModelAnswer();
	}
});

window.addEventListener('keydown', (e) => {
	if (e.key === 'm' || e.key === 'M') {
		flipShape();
	} else if (e.key === 'r' || e.key === 'R') {
		if (!isScored) {
			resetPlacement();
		}
	} else if (e.key === 'Enter') {
		if (!isScored) {
			doScore();
		} else {
			nextProblem();
		}
	}
});

// =========================================================================
// 変更後：drawModelAnswer() 関数
// =========================================================================
function drawModelAnswer() {
	const aCanvas = document.getElementById('answerCanvas');
	const aCtx = aCanvas.getContext('2d');
	aCtx.clearRect(0, 0, aCanvas.width, aCanvas.height);

	const config = SymmetryConfig[currentGroup];
	const isHexagonal = config && config.system === 'hexagonal';

	aCtx.save();

	if (isHexagonal) {
		// ひし形幅は 1.5 * CELL_SIZE = 300、高さは H_tri = 173.2 になるため、
		// 240x240 の解答欄に綺麗に収まるよう、0.6倍に縮小して中央に寄せます。
		aCtx.translate(30, 68);
		aCtx.scale(0.6, 0.6);
	} else {
		aCtx.translate(20, 20);
	}

	// ==========================================
	// ★ 追加: 周囲の薄い格子線の描画
	// ==========================================
	aCtx.strokeStyle = '#e0e0e0'; // メイン枠よりさらに薄いグレー
	aCtx.lineWidth = 2;
	aCtx.beginPath();

	if (isHexagonal) {
		const L = CELL_SIZE;
		const H_tri = (L * Math.sqrt(3)) / 2;

		// 水平線群
		for (let v = -3; v <= 3; v++) {
			const y = v * H_tri;
			const xStart = -3 * L + v * (L / 2);
			const xEnd = 3 * L + v * (L / 2);
			aCtx.moveTo(xStart, y);
			aCtx.lineTo(xEnd, y);
		}

		// 60度斜め線群
		for (let u = -4; u <= 4; u++) {
			const xStart = u * L + -3 * (L / 2);
			const yStart = -3 * H_tri;
			const xEnd = u * L + 3 * (L / 2);
			const yEnd = 3 * H_tri;
			aCtx.moveTo(xStart, yStart);
			aCtx.lineTo(xEnd, yEnd);
		}
		// 120度斜め線群
		for (let u = -4; u <= 4; u++) {
			const xStart = u * L - -3 * (L / 2);
			const yStart = -3 * H_tri;
			const xEnd = u * L - 3 * (L / 2);
			const yEnd = 3 * H_tri;
			aCtx.moveTo(xStart, yStart);
			aCtx.lineTo(xEnd, yEnd);
		}
	} else {
		// 直交格子の格子線
		for (let i = -2; i <= 3; i++) {
			const pos = i * CELL_SIZE;
			// 垂直線
			aCtx.moveTo(pos, -2 * CELL_SIZE);
			aCtx.lineTo(pos, 3 * CELL_SIZE);
			// 水平線
			aCtx.moveTo(-2 * CELL_SIZE, pos);
			aCtx.lineTo(3 * CELL_SIZE, pos);
		}
	}
	aCtx.stroke();

	// ==========================================
	// メイン単位格子枠（太線）
	// ==========================================
	aCtx.strokeStyle = '#8c8c8c';
	aCtx.lineWidth = 2;

	if (isHexagonal) {
		const H_tri = (CELL_SIZE * Math.sqrt(3)) / 2;
		aCtx.beginPath();
		aCtx.moveTo(0, 0);
		aCtx.lineTo(CELL_SIZE, 0);
		aCtx.lineTo(CELL_SIZE * 1.5, H_tri);
		aCtx.lineTo(CELL_SIZE * 0.5, H_tri);
		aCtx.closePath();
		aCtx.stroke();
	} else {
		aCtx.strokeRect(0, 0, CELL_SIZE, CELL_SIZE);
	}

	const groupDef = SymmetryGroups[currentGroup];
	if (groupDef && groupDef.drawModelAxes) {
		groupDef.drawModelAxes(aCtx, getHints());
	}

	// ★ 座標を単位格子の中心(CELL_SIZE/2)に最も近い周期座標に変換する関数
	const centerX = OFFSET_X + CELL_SIZE / 2;
	const centerY = OFFSET_Y + CELL_SIZE / 2;
	const getLocal = (val, center) => {
		let diff = (val - center) % CELL_SIZE;
		if (diff > CELL_SIZE / 2) diff -= CELL_SIZE;
		if (diff < -CELL_SIZE / 2) diff += CELL_SIZE;
		return center + diff - OFFSET_X;
	};

	// ★ 模範解答キャンバス内でも、境界を跨ぐはみ出し(周期性)を正確に描画する
	const drawPeriodicInAnswer = (context, x, y, angle, flipped, type, size, color, alpha) => {
		if (isHexagonal) {
			const L = CELL_SIZE;
			const H_tri = (L * Math.sqrt(3)) / 2;
			for (let u = -2; u <= 2; u++) {
				for (let v = -2; v <= 2; v++) {
					const dx = u * L + v * (L / 2);
					const dy = v * H_tri;
					drawShape(context, x + dx, y + dy, angle, flipped, type, size, color, alpha);
				}
			}
		} else {
			for (let gx = -CELL_SIZE; gx <= CELL_SIZE; gx += CELL_SIZE) {
				for (let gy = -CELL_SIZE; gy <= CELL_SIZE; gy += CELL_SIZE) {
					drawShape(context, x + gx, y + gy, angle, flipped, type, size, color, alpha);
				}
			}
		}
	};

	const showUserAnswer = document.getElementById('show-user-answer-toggle').checked;
	if (showUserAnswer) {
		const userPlaced = placedShapes.filter((s) => !s.isInitial);
		userPlaced.forEach((shape) => {
			const localX = isHexagonal ? shape.x - OFFSET_X : getLocal(shape.x, centerX);
			const localY = isHexagonal ? shape.y - OFFSET_Y : getLocal(shape.y, centerY);
			drawPeriodicInAnswer(
				aCtx,
				localX,
				localY,
				shape.angle,
				shape.flipped,
				initialShape.type,
				initialShape.size,
				'red',
				0.4,
			);
		});
	}

	const corrects = getCorrectShapes();
	corrects.forEach((shape) => {
		const localX = isHexagonal ? shape.x - OFFSET_X : getLocal(shape.x, centerX);
		const localY = isHexagonal ? shape.y - OFFSET_Y : getLocal(shape.y, centerY);
		drawPeriodicInAnswer(
			aCtx,
			localX,
			localY,
			shape.angle,
			shape.flipped,
			initialShape.type,
			initialShape.size,
			initialShape.color,
			1.0,
		);
	});

	aCtx.restore();
}

draw();

// ==========================================
// 画面切り替え・UI制御ロジック
// ==========================================

// 現在のモードを記録する変数
let currentAppMode = 'front';

// フロント画面からゲームを開始する
window.startGame = function (mode) {
	currentAppMode = mode;

	// ★ 新規追加: モードに応じて「ランダムな平面群」トグルを制御
	const randomToggle = document.getElementById('random-group-toggle');
	if (randomToggle) {
		if (mode === 'debug') {
			// デバッグモード起動時はオフ
			randomToggle.checked = false;
		} else if (['easy', 'hard', 'timeattack', 'blind'].includes(mode)) {
			//[cite: 5]
			// それ以外の通常プレイモード起動時は常にオン
			randomToggle.checked = true;
			// ★ 新規追加: 1問目のために、ここで強制的にランダムな平面群を抽選する
			if (typeof SymmetryConfig !== 'undefined') {
				const groupKeys = Object.keys(SymmetryConfig);
				const randomGroup = groupKeys[Math.floor(Math.random() * groupKeys.length)];
				currentGroup = randomGroup; // 現在の平面群を上書き

				// セレクトボックスも同期
				const groupSelect = document.getElementById('group-select');
				if (groupSelect) {
					groupSelect.value = randomGroup;
				}
			}

			// ==========================================
			// ★ 今回追加：以前の図形や色を引き継がないよう、新しく抽選し直す
			// ==========================================
			initialShape = generateRandomInitialShape();

			// UI（デバッグ用パネルのセレクトボックスなど）の表示も同期させる
			const shapeSelect = document.getElementById('debug-shape-select');
			if (shapeSelect) shapeSelect.value = initialShape.type;

			const colorSelect = document.getElementById('debug-color-select');
			const pickerTrigger = document.getElementById('color-picker-trigger');
			if (colorSelect && pickerTrigger) {
				colorSelect.value = initialShape.color;
				pickerTrigger.style.backgroundColor = initialShape.color;
			}
			// ==========================================
		}
	}

	// 画面の表示切り替え
	document.getElementById('view-front').style.display = 'none'; //[cite: 5]
	document.getElementById('view-gallery').style.display = 'none'; //[cite: 5]
	document.getElementById('view-game').style.display = 'block'; //[cite: 5]

	// デバッグモード専用パネルの出し分け
	const debugPanel = document.getElementById('debug-panel');
	if (debugPanel) {
		debugPanel.style.display = mode === 'debug' ? 'block' : 'none';
	}

	if (typeof resetPlacement === 'function') {
		resetPlacement();
	}
};

// ギャラリー画面を開く
window.openGallery = function () {
	currentAppMode = 'gallery';
	document.getElementById('view-front').style.display = 'none';
	document.getElementById('view-game').style.display = 'none';
	document.getElementById('view-gallery').style.display = 'block';
};

// フロント画面に戻る（ボタンが押されたときの処理）
window.returnToFront = function () {
	// 「ギャラリー」または「デバッグモード」の場合は確認なしで即座に戻る
	if (currentAppMode === 'gallery' || currentAppMode === 'debug') {
		executeReturnToFront();
	} else {
		// 通常のゲームモードの場合は自作の確認ポップアップを表示する
		document.getElementById('return-confirm-modal').style.display = 'flex';
	}
};

// 確認ポップアップで「はい」を押したときの処理
window.confirmReturnToFront = function () {
	document.getElementById('return-confirm-modal').style.display = 'none';
	executeReturnToFront();
};

// 確認ポップアップで「いいえ」または「×」を押したときの処理
window.closeReturnConfirm = function () {
	document.getElementById('return-confirm-modal').style.display = 'none';
};

// 実際にフロント画面へ戻る処理を行う内部関数
function executeReturnToFront() {
	currentAppMode = 'front';
	document.getElementById('view-front').style.display = 'block';
	document.getElementById('view-game').style.display = 'none';
	document.getElementById('view-gallery').style.display = 'none';
}

// チュートリアルを開く
window.openTutorial = function () {
	document.getElementById('tutorial-modal').style.display = 'flex';
};

// チュートリアルを閉じる
window.closeTutorial = function () {
	document.getElementById('tutorial-modal').style.display = 'none';
};

// ギャラリー保存（プレースホルダー）
window.saveToGallery = function () {
	alert('ギャラリーに保存しました（機能は後で実装します）');
};
