// main.js
import { SymmetryGroups } from './symmetryGroups.js';
import { SymmetryConfig } from './symmetryConfig.js';
import { ShapeDefs, SHAPES, SHAPE_TYPES, SHAPE_COLORS } from './shapes.js';
import { ProblemConfig } from './problemConfig.js';
import {
	initGallery,
	resetSaveButton,
	loadAndDisplayGallery,
	openSaveGalleryModal,
} from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
	// ==========================================
	// --- 追加：ギャラリー用の連携関数 ---
	// ==========================================

	// ① 現在の情報を記録・取得する関数
	function getAppState() {
		return {
			symmetryGroup: currentGroup,
			shapeType: initialShape.type,
			shapeColor: initialShape.color,
			shapeSize: initialShape.size,
			placementsCount: placedShapes.length,
			score: currentScore, // ★追加: 得点を状態に含める
			placements: JSON.parse(JSON.stringify(placedShapes)),
		};
	}

	// ② プレビュー用キャンバスに縮小して描画する関数
	window.renderPreview = function (previewCtx, previewWidth, previewHeight, state) {
		const mainCanvasWidth = canvas.width || 600;
		const mainCanvasHeight = canvas.height || 600;

		const scaleX = previewWidth / mainCanvasWidth;
		const scaleY = previewHeight / mainCanvasHeight;
		const scale = Math.min(scaleX, scaleY);

		previewCtx.save();
		previewCtx.scale(scale, scale);

		// 背景をクリア
		previewCtx.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);

		const config = SymmetryConfig[state.symmetryGroup];
		const isHexagonal = config && config.system === 'hexagonal';

		// 保存された各配置データについて、キャンバス全体に繰り返し描画する
		state.placements.forEach((shape) => {
			if (isHexagonal) {
				const L = CELL_SIZE;
				const H_tri = (L * Math.sqrt(3)) / 2;

				const vFloat = shape.y / H_tri;
				const uFloat = (shape.x - vFloat * (L / 2)) / L;
				const uBase = uFloat - Math.floor(uFloat);
				const vBase = vFloat - Math.floor(vFloat);
				const relX = uBase * L + vBase * (L / 2);
				const relY = vBase * H_tri;

				const maxU = Math.ceil(mainCanvasWidth / L) + 2;
				const maxV = Math.ceil(mainCanvasHeight / H_tri) + 2;

				for (let u = -3; u <= maxU; u++) {
					for (let v = -3; v <= maxV; v++) {
						const dx = u * L + v * (L / 2);
						const dy = v * H_tri;

						drawShape(
							previewCtx,
							relX + dx,
							relY + dy,
							shape.angle,
							shape.flipped,
							state.shapeType,
							state.shapeSize,
							state.shapeColor,
							1.0,
						);
					}
				}
			} else {
				const relX = ((shape.x % CELL_SIZE) + CELL_SIZE) % CELL_SIZE;
				const relY = ((shape.y % CELL_SIZE) + CELL_SIZE) % CELL_SIZE;

				for (let gx = -CELL_SIZE; gx <= mainCanvasWidth; gx += CELL_SIZE) {
					for (let gy = -CELL_SIZE; gy <= mainCanvasHeight; gy += CELL_SIZE) {
						drawShape(
							previewCtx,
							gx + relX,
							gy + relY,
							shape.angle,
							shape.flipped,
							state.shapeType,
							state.shapeSize,
							state.shapeColor,
							1.0,
						);
					}
				}
			}
		});

		previewCtx.restore();
	};

	// ★ 変更: 引数を window.renderPreview に修正
	initGallery(getAppState, window.renderPreview);

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

let isMouseInCanvas = false;
let previewShape = { x: 0, y: 0, angle: 0, flipped: false };
let placedShapes = [];

let isScored = false;
let currentScore = 0; // ★追加: 現在の得点を保持する変数
export let solvedCount = 0; // 採点した問題数
export let cumulativeScore = 0; // 5問の合計得点
export let problemHistory = []; // ★追加: 解いた問題の履歴を保存する配列
export const MAX_PROBLEMS = {
	easy: 5,
	hard: 5,
	// timeattack:
	blind: 5,
};

function updateProblemCountDisplay() {
	const countDisplay = document.getElementById('problem-count-display');
	if (countDisplay) {
		const max = MAX_PROBLEMS[currentAppMode];
		if (max) {
			const currentNum = Math.min(solvedCount + 1, max);
			countDisplay.textContent = `${currentNum}/${max}問目`;
		} else {
			countDisplay.textContent = '';
		}
	}
}

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
// 1. 状態管理用のグローバル変数
// ==========================================
let currentAppMode = 'front'; // 現在のモード ('front', 'easy', 'normal' など)
let currentGroup = 'p1'; // 'p2', 'pm' など
let currentProblemData = null; // 選択された問題のタイトルや解説情報
let currentActiveSymbols = []; // 現在画面に表示すべき問題の記号ID配列
let currentHintSymbols = []; // ヒントとして表示すべき記号ID配列
let isHintMode = false; // ヒントが表示されているかどうかのフラグ

// ==========================================
// 2. 問題をランダムに選択する関数
// ==========================================

// ★ 追加: 重み付きランダム選択関数
function getWeightedRandomGroup(modeConfig) {
	let totalWeight = 0;
	const groupKeys = Object.keys(modeConfig);

	for (const key of groupKeys) {
		// weightが未設定(undefined)の場合はデフォルトの 1 とする
		const weight = modeConfig[key].weight !== undefined ? modeConfig[key].weight : 1;
		totalWeight += weight;
	}

	let randomValue = Math.random() * totalWeight;

	for (const key of groupKeys) {
		const weight = modeConfig[key].weight !== undefined ? modeConfig[key].weight : 1;
		randomValue -= weight;

		if (randomValue <= 0) {
			return key;
		}
	}

	return groupKeys[0];
}

function generateRandomProblem() {
	if (!ProblemConfig[currentAppMode]) return;

	// ★ 修正: modeConfig を変数に格納
	const modeConfig = ProblemConfig[currentAppMode];
	const groupsInMode = Object.keys(modeConfig);
	if (groupsInMode.length === 0) return;

	// ★ 修正: Math.random()の均等選択から、重み付き選択関数に置き換え
	currentGroup = getWeightedRandomGroup(modeConfig);
	const groupData = modeConfig[currentGroup];

	if (groupData && groupData.problems && groupData.problems.length > 0) {
		currentProblemData = groupData.problems[Math.floor(Math.random() * groupData.problems.length)];

		// symbolSetsが存在し、かつ空ではない場合のみ処理を行うように安全対策を追加
		if (currentProblemData.symbolSets && currentProblemData.symbolSets.length > 0) {
			const symbolSet =
				currentProblemData.symbolSets[
					Math.floor(Math.random() * currentProblemData.symbolSets.length)
				];

			// コピーを作成して基本の配列をセット
			currentActiveSymbols = symbolSet.problem ? [...symbolSet.problem] : [];
			currentHintSymbols = symbolSet.hint ? [...symbolSet.hint] : [];

			// ★追加: rand指定がある場合はランダムに抽出して追加する（複数対応）
			if (symbolSet.rand) {
				// 単一のオブジェクトでも配列でも統一して処理できるように変換
				const randConfigs = Array.isArray(symbolSet.rand) ? symbolSet.rand : [symbolSet.rand];

				randConfigs.forEach((randConfig) => {
					const { pool, pCount, hCount } = randConfig;
					if (pool && Array.isArray(pool)) {
						// プールをシャッフル
						const shuffledPool = [...pool].sort(() => 0.5 - Math.random());

						const countP = pCount || 0;
						const countH = hCount || 0;
						const totalNeeded = countP + countH;

						// 必要な数だけ取り出して配列に追加
						const selectedForProblem = shuffledPool.slice(0, countP);
						const selectedForHint = shuffledPool.slice(
							countP,
							Math.min(totalNeeded, shuffledPool.length),
						);

						currentActiveSymbols.push(...selectedForProblem);
						currentHintSymbols.push(...selectedForHint);
					}
				});
			}
		} else {
			currentActiveSymbols = [];
			currentHintSymbols = [];
		}
	}

	// ★ 変更: 新設した共通クリア関数を呼び出す
	clearHintState();

	const nameEl = document.getElementById('group-name-display');
	if (nameEl && SymmetryGroups[currentGroup]) {
		const title = currentProblemData ? currentProblemData.title : 'フリー配置';
		nameEl.textContent = title;
	}

	const groupSelect = document.getElementById('group-select');
	if (groupSelect) groupSelect.value = currentGroup;

	resetPlacement();
}

// ==========================================
// 追加: デバッグ用の状態管理フラグ
// ==========================================
let isManualInitMode = false; // 「自分で初期配置を決める」がONかどうか
let isPlacingFirst = false; // 最初の1個目を手動で配置中かどうか

// --- ランダム生成用の設定 ---
const INITIAL_ANGLE_STEP = 90;

// 初期図形をランダムに生成する関数
function generateRandomInitialShape() {
	let minSize, maxSize;

	// モードごとにサイズの上限・下限を設定（数値はお好みで調整してください）
	switch (currentAppMode) {
		case 'easy':
			minSize = 30;
			maxSize = 60;
			break;
		case 'hard':
			minSize = 30;
			maxSize = 60;
			break;
		case 'timeattack':
			minSize = 50;
			maxSize = 90;
			break;
		case 'blind':
			minSize = 50;
			maxSize = 140;
			break;
		case 'debug':
		default:
			minSize = 30;
			maxSize = CELL_SIZE / 2; // デフォルト (100)
			break;
	}

	const type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
	const colorObj = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];
	const color = colorObj.value;

	// 設定された minSize と maxSize を使ってランダムサイズを決定
	const size = Math.random() * (maxSize - minSize) + minSize;
	const padding = CELL_SIZE * 0.1;
	const allowedRange = CELL_SIZE - padding * 2;

	const x = OFFSET_X + padding + Math.random() * allowedRange;
	const y = OFFSET_Y + padding + Math.random() * allowedRange;

	const steps = Math.floor(360 / INITIAL_ANGLE_STEP);
	const angle = Math.floor(Math.random() * steps) * INITIAL_ANGLE_STEP;
	const flipped = Math.random() > 0.5;

	return { x, y, angle, flipped, type, size, color, isInitial: true };
}

// ゲームモードの表示を更新する関数
function updateModeDisplay(mode) {
	const modeNames = {
		easy: 'イージー',
		hard: 'ハード',
		timeattack: 'タイムアタック',
		blind: 'ブラインド',
		debug: 'デバッグ',
	};
	const modeDisplay = document.getElementById('current-mode-display');
	if (modeDisplay) {
		const displayName = modeNames[mode] || mode;
		modeDisplay.textContent = `ゲームモード：${displayName}`;
	}
}

// 初期配置図形のセットアップ
let initialShape = generateRandomInitialShape();
placedShapes.push(initialShape);
previewShape.angle = initialShape.angle;
previewShape.flipped = initialShape.flipped;

// ==========================================
// ヒントとトグルのイベント管理
// ==========================================
function getHints() {
	const showProblemEl = document.getElementById('show-problem-toggle');
	return {
		// 種類の個別トグルを廃止したため、ここでは常に true（描画許可）を出しておく。
		// 実際の表示・非表示は isHintMode と problemConfig.js のデータによって制御される。
		rotation: true,
		mirror: true,
		glide: true,
		showProblem: showProblemEl ? showProblemEl.checked : true,
	};
}

// ヒントのチェックボックスが変更されたら再描画
['hint-toggle', 'show-problem-toggle'].forEach((id) => {
	const el = document.getElementById(id);
	if (el) {
		el.addEventListener('change', (e) => {
			if (id === 'hint-toggle') {
				isHintMode = e.target.checked;
			}
			draw();
			if (isScored) {
				drawModelAnswer();
			}
		});
	}
});

function hideResult() {
	document.getElementById('result-area').style.display = 'none';
	document.getElementById('next-btn').style.display = 'none';
}

function wrap(val, offset, size) {
	return offset + ((((val - offset) % size) + size) % size);
}

// 六角格子（ひし形単位胞）専用の wrap 関数
function wrapHex(x, y, OFFSET_X, OFFSET_Y, CELL_SIZE) {
	const L = CELL_SIZE;
	const H_tri = (L * Math.sqrt(3)) / 2;

	const vFloat = (y - OFFSET_Y) / H_tri;
	const uFloat = (x - OFFSET_X - vFloat * (L / 2)) / L;

	const uBase = ((uFloat % 1) + 1) % 1;
	const vBase = ((vFloat % 1) + 1) % 1;

	return {
		x: OFFSET_X + uBase * L + vBase * (L / 2),
		y: OFFSET_Y + vBase * H_tri,
	};
}

function resetUI() {
	isScored = false;
	currentScore = 0; // ★追加: リセット時に0に戻す
	document.getElementById('score-btn').disabled = false;
	document.getElementById('flip-btn').disabled = false;
	document.getElementById('rotate-btn').disabled = false;
	document.getElementById('reset-btn').disabled = false;
	canvas.style.cursor = 'none';
	canvas.title = ''; // ★追加: ツールチップの文字をリセットして非表示にする

	// ★追加: 模範解答キャンバスのリセット
	const aCanvas = document.getElementById('answerCanvas');
	if (aCanvas) {
		aCanvas.style.cursor = 'none'; // リセット時はなし、またはdefaultなどに変更可
		aCanvas.title = ''; // ツールチップの文字をリセット
	}

	// // ★ 追加: ヒントボタンを復活
	// const hintBtn = document.getElementById('hint-action-btn');
	// if (hintBtn) hintBtn.disabled = false;

	// // ヒントのチェックを外す（デフォルトオフ）
	// const hintToggle = document.getElementById('hint-toggle');
	// if (hintToggle) hintToggle.checked = false;
	// isHintMode = false;

	// // 問題が切り替わるたびに「問題を表示」をオンに戻す
	// const showProblemToggle = document.getElementById('show-problem-toggle');
	// if (showProblemToggle) showProblemToggle.checked = true;

	hideResult();
}

function clearHintState() {
	isHintMode = false;
	const hintToggle = document.getElementById('hint-toggle');
	if (hintToggle) hintToggle.checked = false;

	const showProblemToggle = document.getElementById('show-problem-toggle');
	if (showProblemToggle) showProblemToggle.checked = true;

	// 「ヒントを見る」ボタンを再度押せるように復活させる
	const hintBtn = document.getElementById('hint-action-btn');
	if (hintBtn) hintBtn.disabled = false;
}

// 連動プルダウンの初期化
function initDebugSelectors() {
	const modeSelect = document.getElementById('debug-mode-select');
	const groupSelect = document.getElementById('debug-group-select');
	const problemSelect = document.getElementById('debug-problem-select');
	const symbolSelect = document.getElementById('debug-symbol-select');

	if (!modeSelect || !groupSelect || !problemSelect || !symbolSelect) return;

	function updateGroups() {
		const mode = modeSelect.value;
		groupSelect.innerHTML = '';
		const groups = ProblemConfig[mode] || {};

		for (const groupKey in groups) {
			const option = document.createElement('option');
			option.value = groupKey;
			option.textContent = groupKey;
			groupSelect.appendChild(option);
		}
		updateProblems();
	}

	function updateProblems() {
		const mode = modeSelect.value;
		const groupKey = groupSelect.value;
		problemSelect.innerHTML = '';

		if (ProblemConfig[mode] && ProblemConfig[mode][groupKey]) {
			const problems = ProblemConfig[mode][groupKey].problems;
			problems.forEach((prob, index) => {
				const option = document.createElement('option');
				option.value = index;
				option.textContent = prob.title;
				problemSelect.appendChild(option);
			});
		}
		updateSymbolSets();
	}

	function updateSymbolSets() {
		const mode = modeSelect.value;
		const groupKey = groupSelect.value;
		const probIndex = problemSelect.value;
		symbolSelect.innerHTML = '';

		if (ProblemConfig[mode] && ProblemConfig[mode][groupKey]) {
			const currentProblemData = ProblemConfig[mode][groupKey].problems[probIndex];
			if (currentProblemData && currentProblemData.symbolSets) {
				currentProblemData.symbolSets.forEach((set, index) => {
					const option = document.createElement('option');
					option.value = index;

					const problemStr = set.problem ? JSON.stringify(set.problem) : '[]';
					const hintStr = set.hint ? JSON.stringify(set.hint) : '[]';
					let randStr = '';
					if (set.rand) {
						const randConfigs = Array.isArray(set.rand) ? set.rand : [set.rand];
						const randDetails = randConfigs
							.map((r) => `(pool:${JSON.stringify(r.pool)} p:${r.pCount || 0} h:${r.hCount || 0})`)
							.join(' & ');
						randStr = ` + rand: ${randDetails}`;
					}

					option.textContent = `problem: ${problemStr}, hint: ${hintStr}${randStr}`;
					symbolSelect.appendChild(option);
				});
			}
		}
		applySelection();
	}

	function applySelection() {
		const mode = modeSelect.value;
		const groupKey = groupSelect.value;
		const probIndex = problemSelect.value;
		const symbolIndex = symbolSelect.value;

		if (ProblemConfig[mode] && ProblemConfig[mode][groupKey]) {
			currentGroup = groupKey;
			currentProblemData = ProblemConfig[mode][groupKey].problems[probIndex];

			if (currentProblemData && currentProblemData.symbolSets.length > 0) {
				const symbolSet = currentProblemData.symbolSets[symbolIndex];
				if (symbolSet) {
					currentActiveSymbols = symbolSet.problem ? [...symbolSet.problem] : [];
					currentHintSymbols = symbolSet.hint ? [...symbolSet.hint] : [];

					// ★追加: デバッグ機能からの適用時にもランダム抽出を実行（複数対応）
					if (symbolSet.rand) {
						const randConfigs = Array.isArray(symbolSet.rand) ? symbolSet.rand : [symbolSet.rand];

						randConfigs.forEach((randConfig) => {
							const { pool, pCount, hCount } = randConfig;
							if (pool && Array.isArray(pool)) {
								const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
								const countP = pCount || 0;
								const countH = hCount || 0;
								const totalNeeded = countP + countH;

								const selectedForProblem = shuffledPool.slice(0, countP);
								const selectedForHint = shuffledPool.slice(
									countP,
									Math.min(totalNeeded, shuffledPool.length),
								);

								currentActiveSymbols.push(...selectedForProblem);
								currentHintSymbols.push(...selectedForHint);
							}
						});
					}
				}
			}

			if (typeof resetPlacement === 'function') {
				resetPlacement();
			}
		}
	}

	modeSelect.addEventListener('change', updateGroups);
	groupSelect.addEventListener('change', updateProblems);
	problemSelect.addEventListener('change', updateSymbolSets);
	symbolSelect.addEventListener('change', applySelection);

	updateGroups();
}
initDebugSelectors();

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
		const L = CELL_SIZE;
		const H_tri = (L * Math.sqrt(3)) / 2;

		const vFloat = y / H_tri;
		const uFloat = (x - vFloat * (L / 2)) / L;

		const uBase = uFloat - Math.floor(uFloat);
		const vBase = vFloat - Math.floor(vFloat);

		const relX = uBase * L + vBase * (L / 2);
		const relY = vBase * H_tri;

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
		const relX = ((x % CELL_SIZE) + CELL_SIZE) % CELL_SIZE;
		const relY = ((y % CELL_SIZE) + CELL_SIZE) % CELL_SIZE;

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

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const config = SymmetryConfig[currentGroup];
	const isHexagonal = config && config.system === 'hexagonal';

	if (isHexagonal) {
		const H_tri = (CELL_SIZE * Math.sqrt(3)) / 2;
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 1;

		for (let i = -5; i <= Math.ceil(canvas.width / CELL_SIZE) + 5; i++) {
			for (let j = -5; j <= Math.ceil(canvas.height / H_tri) + 5; j++) {
				// 基準位置(OFFSET)を足してズレを解消する
				const cx = OFFSET_X + i * CELL_SIZE + j * (CELL_SIZE / 2);
				const cy = OFFSET_Y + j * H_tri;
				ctx.beginPath();
				ctx.moveTo(cx, cy);
				ctx.lineTo(cx + CELL_SIZE, cy);
				ctx.lineTo(cx + CELL_SIZE * 1.5, cy + H_tri);
				ctx.lineTo(cx + CELL_SIZE * 0.5, cy + H_tri);
				ctx.closePath();
				// ★ 追加: 120度の線（右上の頂点から左下の頂点への対角線）
				ctx.moveTo(cx + CELL_SIZE, cy);
				ctx.lineTo(cx + CELL_SIZE * 0.5, cy + H_tri);
				ctx.stroke();
			}
		}

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
		ctx.strokeStyle = '#8c8c8c';
		ctx.lineWidth = 3;
		ctx.strokeRect(OFFSET_X, OFFSET_Y, CELL_SIZE, CELL_SIZE);
	}

	// 1. 先に配置した図形を描画する
	placedShapes.forEach((shape) => {
		drawInAllCells(shape.x, shape.y, shape.angle, shape.flipped, 1.0);
	});

	// 2. その上から対称記号を描画する
	const hints = getHints();
	const groupDef = SymmetryGroups[currentGroup];
	if (groupDef) {
		// モードに関わらず、常に選択されている問題記号とヒント記号をそのまま渡す
		groupDef.drawAxes(
			ctx,
			OFFSET_X,
			OFFSET_Y,
			CELL_SIZE,
			hints,
			currentActiveSymbols,
			currentHintSymbols,
			isHintMode,
		);
	}

	if (isMouseInCanvas && !isScored) {
		if (isPlacingFirst) {
			drawInAllCells(previewShape.x, previewShape.y, previewShape.angle, previewShape.flipped, 0.4);
		} else {
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

canvas.addEventListener('contextmenu', (e) => {
	e.preventDefault();
	if (!isMouseInCanvas || isScored) return;

	const angleStep = SymmetryConfig[currentGroup]?.clickAngle ?? 180;
	previewShape.angle = (previewShape.angle + angleStep) % 360;
	draw();
});

function flipShape() {
	if (isScored) return;
	previewShape.flipped = !previewShape.flipped;
	draw();
}

function rotateShape() {
	if (isScored) return;
	const angleStep = SymmetryConfig[currentGroup]?.clickAngle ?? 180;
	previewShape.angle = (previewShape.angle + angleStep) % 360;
	draw();
}

function resetPlacement() {
	if (currentAppMode === 'debug' && isManualInitMode) {
		placedShapes = [];
		isPlacingFirst = true;
	} else {
		placedShapes = [{ ...initialShape, isInitial: true }];
		isPlacingFirst = false;
	}

	previewShape.angle = initialShape.angle;
	previewShape.flipped = initialShape.flipped;

	if (typeof resetUI === 'function') resetUI();
	draw();
	updateDebugCounters();

	// const nameEl = document.getElementById('group-name-display');
	// if (nameEl) {
	// 	if (currentAppMode === 'debug') {
	// 		nameEl.textContent = SymmetryGroups[currentGroup]
	// 			? `${SymmetryGroups[currentGroup].name} (デバッグ)`
	// 			: 'フリー配置';
	// 	} else {
	// 		nameEl.textContent = currentProblemData ? currentProblemData.title : 'フリー配置';
	// 	}
	// }
	const nameEl = document.getElementById('group-name-display');
	if (nameEl) {
		nameEl.textContent = currentProblemData ? currentProblemData.title : 'フリー配置';
	}
}

canvas.addEventListener(
	'wheel',
	(e) => {
		if (isPlacingFirst) {
			e.preventDefault();
			if (e.deltaY < 0) {
				initialShape.size += 5;
			} else {
				initialShape.size -= 5;
			}
			initialShape.size = Math.max(10, Math.min(initialShape.size, CELL_SIZE));
			draw();
		}
	},
	{ passive: false },
);

document.getElementById('hint-action-btn').addEventListener('click', () => {
	isHintMode = true;
	const hintToggle = document.getElementById('hint-toggle');
	if (hintToggle) hintToggle.checked = true;

	// 1度押したら押せないように無効化する
	document.getElementById('hint-action-btn').disabled = true;
	draw();
});

// --- canvasのクリックイベントの上書き ---
canvas.addEventListener('click', (e) => {
	if (isScored) {
		const toggle = document.getElementById('show-problem-toggle');
		if (toggle) {
			toggle.checked = !toggle.checked;
			toggle.dispatchEvent(new Event('change'));
		}
		return;
	}

	if (!isMouseInCanvas) return;

	if (isPlacingFirst) {
		initialShape.x = previewShape.x;
		initialShape.y = previewShape.y;
		initialShape.angle = previewShape.angle;
		initialShape.flipped = previewShape.flipped;
		initialShape.isInitial = true;

		placedShapes = [{ ...initialShape }];
		isPlacingFirst = false;
	} else {
		placedShapes.push({
			x: previewShape.x,
			y: previewShape.y,
			angle: previewShape.angle,
			flipped: previewShape.flipped,
			isInitial: false,
		});
	}
	draw();
	updateDebugCounters();
});

function doScore() {
	if (isScored) return;

	const showProblemToggle = document.getElementById('show-problem-toggle');
	if (showProblemToggle) showProblemToggle.checked = false;

	const hintToggle = document.getElementById('hint-toggle');
	if (hintToggle) hintToggle.checked = false;
	isHintMode = false;

	let totalScore = 0;
	let errors = [];

	let extraPenalty = 0;
	let missingCount = 0;
	let positionPenalty = 0;
	let transformPenalty = 0;

	const userPlaced = placedShapes.filter((s) => !s.isInitial);

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
				let minDistance = Infinity;
				let minMatchPriority = Infinity;

				userPlaced.forEach((user, index) => {
					if (usedUserIndices.has(index)) return;

					let dist = Infinity;

					if (isHexagonal) {
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
						const diffX = Math.abs(user.x - target.x) % CELL_SIZE;
						const minDx = Math.min(diffX, CELL_SIZE - diffX);
						const diffY = Math.abs(user.y - target.y) % CELL_SIZE;
						const minDy = Math.min(diffY, CELL_SIZE - diffY);
						dist = Math.sqrt(minDx * minDx + minDy * minDy);
					}

					const angleDiff = Math.abs(user.angle - target.angle) % 360;
					const isAngleCorrect = angleDiff < 5 || angleDiff > 355;
					const isFlipCorrect = user.flipped === target.flipped;
					const isTransformCorrect = isAngleCorrect && isFlipCorrect;

					const matchPriority = dist + (isTransformCorrect ? 0 : 10000);

					if (matchPriority < minMatchPriority) {
						minMatchPriority = matchPriority;
						minDistance = dist;
						bestMatchIndex = index;
					}
				});

				if (bestMatchIndex === -1 || minDistance > 50) {
					missingCount++;
				} else {
					usedUserIndices.add(bestMatchIndex);
					const bestMatch = userPlaced[bestMatchIndex];

					totalScore += pointsPerTarget * 0.4;

					if (minDistance <= 3) {
						totalScore += pointsPerTarget * 0.3;
					} else {
						const posScore = pointsPerTarget * 0.3 * (1 - (minDistance - 3) / 47);
						totalScore += posScore;
						positionPenalty += pointsPerTarget * 0.3 - posScore;
						positionPenaltyCount++;
					}

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
	currentScore = totalScore; // ★追加: 計算されたtotalScoreをグローバル変数に格納する

	// ★ 変更: MAX_PROBLEMS に設定されているモードの場合のみ加算
	if (MAX_PROBLEMS[currentAppMode]) {
		solvedCount++;
		cumulativeScore += totalScore;

		// ▼▼▼ 変更：解いた問題の情報と「図形の状態」を履歴に保存 ▼▼▼
		if (currentProblemData) {
			problemHistory.push({
				title: currentProblemData.title || currentGroup,
				score: currentScore,
				state: {
					symmetryGroup: currentGroup,
					shapeType: initialShape.type,
					shapeColor: initialShape.color,
					shapeSize: initialShape.size,
					placements: JSON.parse(JSON.stringify(placedShapes)), // 配置情報をコピーして保存
				},
			});
		}
		// ▲▲▲ 変更ここまで ▲▲▲
	}

	updateDebugCounters({
		extraPenalty,
		missingCount,
		positionPenalty,
		transformPenalty,
	});

	document.getElementById('score-btn').disabled = true;
	document.getElementById('flip-btn').disabled = true;
	document.getElementById('rotate-btn').disabled = true;
	document.getElementById('reset-btn').disabled = true;
	document.getElementById('hint-action-btn').disabled = true;
	// ★変更: 採点後はキャンバスをクリックできることを明示するため、cursorとtitleを変更する
	canvas.style.cursor = 'pointer';
	canvas.title = '対称性を表示';
	// ★追加: 模範解答キャンバスにも同様の効果を適用
	const aCanvas = document.getElementById('answerCanvas');
	if (aCanvas) {
		aCanvas.style.cursor = 'pointer';
		aCanvas.title = '対称性を表示';
	}
	document.getElementById('result-area').style.display = 'block';
	document.getElementById('result-area').style.display = 'block';

	const nextBtn = document.getElementById('next-btn');
	nextBtn.style.display = 'block';

	// ★ 変更：最大問題数に達しているか確認し、ボタンのテキストを「リザルトへ」に変更する
	const targetCount = MAX_PROBLEMS[currentAppMode];
	if (targetCount && solvedCount >= targetCount) {
		nextBtn.textContent = 'リザルトへ';
	} else {
		nextBtn.textContent = '次の問題';
	}

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
	// ★ 変更: モードごとの設定問題数を取得し、達しているかチェック
	const targetCount = MAX_PROBLEMS[currentAppMode];

	if (targetCount && solvedCount >= targetCount) {
		// リザルト画面の処理へ移行
		if (typeof window.showTotalResult === 'function') {
			// ▼▼▼ 変更：第4引数に problemHistory を追加 ▼▼▼
			window.showTotalResult(cumulativeScore, solvedCount, currentAppMode, problemHistory);
		}
		return; // 次の問題は生成せずに処理を終了する
	}

	initialShape = generateRandomInitialShape();

	// ★ 追加: 新しい問題に進むタイミングでヒント状態を完全にクリア
	clearHintState();
	resetSaveButton();

	const shapeSelect = document.getElementById('debug-shape-select');
	if (shapeSelect) shapeSelect.value = initialShape.type;

	const colorSelect = document.getElementById('debug-color-select');
	const pickerTrigger = document.getElementById('color-picker-trigger');
	if (colorSelect && pickerTrigger) {
		colorSelect.value = initialShape.color;
		pickerTrigger.style.backgroundColor = initialShape.color;
	}

	if (currentAppMode !== 'debug') {
		generateRandomProblem();
	} else {
		resetPlacement();
	}

	// ▼▼▼ ここ（関数の最後）に追加します ▼▼▼
	updateProblemCountDisplay();
	// ▲▲▲ ここまで ▲▲▲
}

document.getElementById('flip-btn').addEventListener('click', flipShape);
document.getElementById('rotate-btn').addEventListener('click', rotateShape);
document.getElementById('reset-btn').addEventListener('click', resetPlacement);
document.getElementById('score-btn').addEventListener('click', doScore);
document.getElementById('next-btn').addEventListener('click', nextProblem);

document.getElementById('answerCanvas').addEventListener('click', () => {
	if (isScored) {
		const toggle = document.getElementById('show-problem-toggle');
		if (toggle) {
			toggle.checked = !toggle.checked;
			toggle.dispatchEvent(new Event('change'));
		}
		return;
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

function drawModelAnswer() {
	// ★ 追加: 出題された平面群の名前を表示
	const groupNameEl = document.getElementById('answer-group-name');
	if (groupNameEl) {
		const displayGroup = currentGroup.replace('_h', ''); // ★ _hを削除
		groupNameEl.textContent = `平面群：${displayGroup}`;
	}

	const aCanvas = document.getElementById('answerCanvas');
	const aCtx = aCanvas.getContext('2d');

	aCtx.resetTransform();
	aCtx.clearRect(0, 0, aCanvas.width, aCanvas.height);

	const config = SymmetryConfig[currentGroup];
	const isHexagonal = config && config.system === 'hexagonal';

	aCtx.save();
	try {
		if (isHexagonal) {
			aCtx.translate(30, 68);
			aCtx.scale(0.6, 0.6);
		} else {
			aCtx.translate(50, 50);
			aCtx.scale(0.7, 0.7);
		}

		aCtx.strokeStyle = '#e0e0e0';
		aCtx.lineWidth = 2;
		aCtx.beginPath();

		if (isHexagonal) {
			const L = CELL_SIZE;
			const H_tri = (L * Math.sqrt(3)) / 2;
			for (let v = -3; v <= 3; v++) {
				const y = v * H_tri;
				aCtx.moveTo(-3 * L + v * (L / 2), y);
				aCtx.lineTo(3 * L + v * (L / 2), y);
			}
			for (let u = -4; u <= 4; u++) {
				aCtx.moveTo(u * L + -3 * (L / 2), -3 * H_tri);
				aCtx.lineTo(u * L + 3 * (L / 2), 3 * H_tri);
				aCtx.moveTo(u * L - -3 * (L / 2), -3 * H_tri);
				aCtx.lineTo(u * L - 3 * (L / 2), 3 * H_tri);
			}
		} else {
			for (let i = -2; i <= 3; i++) {
				const pos = i * CELL_SIZE;
				aCtx.moveTo(pos, -2 * CELL_SIZE);
				aCtx.lineTo(pos, 3 * CELL_SIZE);
				aCtx.moveTo(-2 * CELL_SIZE, pos);
				aCtx.lineTo(3 * CELL_SIZE, pos);
			}
		}
		aCtx.stroke();

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

		aCtx.save();
		try {
			const groupDef = SymmetryGroups[currentGroup];
			const showProblemToggle = document.getElementById('show-problem-toggle');
			const isShowAxes = showProblemToggle ? showProblemToggle.checked : true;
			if (isShowAxes && groupDef && groupDef.drawModelAxes) {
				groupDef.drawModelAxes(aCtx, {
					rotation: true,
					mirror: true,
					glide: true,
					showProblem: true,
				});
			}
		} catch (e) {
			console.error('対称記号の描画中にエラーが発生しました:', e);
		} finally {
			aCtx.restore();
		}

		const centerX = OFFSET_X + CELL_SIZE / 2;
		const centerY = OFFSET_Y + CELL_SIZE / 2;
		const getLocal = (val, center) => {
			let diff = (val - center) % CELL_SIZE;
			if (diff > CELL_SIZE / 2) diff -= CELL_SIZE;
			if (diff < -CELL_SIZE / 2) diff += CELL_SIZE;
			return center + diff - OFFSET_X;
		};

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

		// 1. 先に図形を描画する
		try {
			const showUserAnswer = document.getElementById('show-user-answer-toggle');
			if (showUserAnswer && showUserAnswer.checked) {
				const userPlaced = placedShapes.filter((s) => !s.isInitial);
				userPlaced.forEach((shape) => {
					let localX, localY;
					if (isHexagonal) {
						const wrapped = wrapHex(shape.x, shape.y, OFFSET_X, OFFSET_Y, CELL_SIZE);
						localX = wrapped.x - OFFSET_X;
						localY = wrapped.y - OFFSET_Y;
					} else {
						localX = getLocal(shape.x, centerX);
						localY = getLocal(shape.y, centerY);
					}
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
				let localX, localY;
				if (isHexagonal) {
					const wrapped = wrapHex(shape.x, shape.y, OFFSET_X, OFFSET_Y, CELL_SIZE);
					localX = wrapped.x - OFFSET_X;
					localY = wrapped.y - OFFSET_Y;
				} else {
					localX = getLocal(shape.x, centerX);
					localY = getLocal(shape.y, centerY);
				}
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
		} catch (e) {
			console.error('図形の描画中にエラーが発生しました:', e);
		}

		// 2. その上から対称記号を描画する
		aCtx.save();
		try {
			const groupDef = SymmetryGroups[currentGroup];
			const showProblemToggle = document.getElementById('show-problem-toggle');
			const isShowAxes = showProblemToggle ? showProblemToggle.checked : true;
			if (isShowAxes && groupDef && groupDef.drawModelAxes) {
				groupDef.drawModelAxes(aCtx, {
					rotation: true,
					mirror: true,
					glide: true,
					showProblem: true,
				});
			}
		} catch (e) {
			console.error('対称記号の描画中にエラーが発生しました:', e);
		} finally {
			aCtx.restore();
		}
	} finally {
		aCtx.restore();
	}
}

draw();

function syncDebugPanel() {
	if (!currentGroup || !currentProblemData) return;

	const modeSelect = document.getElementById('debug-mode-select');
	const groupSelect = document.getElementById('debug-group-select');
	const problemSelect = document.getElementById('debug-problem-select');
	const symbolSelect = document.getElementById('debug-symbol-select');

	let foundMode = null;
	let foundProbIndex = 0;
	let foundSymbolIndex = 0;

	for (const mode in ProblemConfig) {
		if (ProblemConfig[mode] && ProblemConfig[mode][currentGroup]) {
			const problems = ProblemConfig[mode][currentGroup].problems;
			const idx = problems.findIndex((p) => p.title === currentProblemData.title);
			if (idx !== -1) {
				foundMode = mode;
				foundProbIndex = idx;
				break;
			}
		}
	}

	if (!foundMode) return;

	if (currentProblemData.symbolSets) {
		const currentStr = JSON.stringify(currentActiveSymbols);
		const sIdx = currentProblemData.symbolSets.findIndex(
			(set) => JSON.stringify(set.problem || []) === currentStr,
		);
		if (sIdx !== -1) foundSymbolIndex = sIdx;
	}

	if (modeSelect) modeSelect.value = foundMode;

	if (groupSelect) {
		groupSelect.innerHTML = '';
		for (const g in ProblemConfig[foundMode]) {
			const opt = document.createElement('option');
			opt.value = g;
			opt.textContent = g;
			groupSelect.appendChild(opt);
		}
		groupSelect.value = currentGroup;
	}

	if (problemSelect) {
		problemSelect.innerHTML = '';
		const problems = ProblemConfig[foundMode][currentGroup].problems;
		problems.forEach((prob, index) => {
			const opt = document.createElement('option');
			opt.value = index;
			opt.textContent = prob.title;
			problemSelect.appendChild(opt);
		});
		problemSelect.value = foundProbIndex;
	}

	if (symbolSelect) {
		symbolSelect.innerHTML = '';
		currentProblemData.symbolSets.forEach((set, index) => {
			const opt = document.createElement('option');
			opt.value = index;
			const pStr = set.problem ? JSON.stringify(set.problem) : '[]';
			const hStr = set.hint ? JSON.stringify(set.hint) : '[]';
			opt.textContent = `problem: ${pStr}, hint: ${hStr}`;
			symbolSelect.appendChild(opt);
		});
		symbolSelect.value = foundSymbolIndex;
	}

	if (typeof initialShape !== 'undefined' && initialShape) {
		const shapeSelect = document.getElementById('debug-shape-select');
		if (shapeSelect && initialShape.type) {
			shapeSelect.value = initialShape.type;
		}

		const colorSelect = document.getElementById('debug-color-select');
		if (colorSelect && initialShape.color) {
			colorSelect.value = initialShape.color;
			const colorTrigger = document.getElementById('color-picker-trigger');
			if (colorTrigger) {
				const matchedOpt = Array.from(colorSelect.options).find(
					(opt) => opt.value === initialShape.color,
				);
				if (matchedOpt) {
					colorTrigger.innerHTML = matchedOpt.innerHTML;
				} else {
					colorTrigger.textContent = initialShape.color;
				}
			}
		}
	}
}

window.startGame = function (mode) {
	currentAppMode = mode;

	// ★ 追加: ゲーム開始時にカウントと合計スコアをリセット
	solvedCount = 0;
	cumulativeScore = 0;
	problemHistory = []; // ★追加: 新しいゲームを始める時に履歴を空にする

	// ★ 追加: 新たにゲームを開始するタイミングで、ヒント状態やボタンの有効化を完全に初期化する
	clearHintState();
	resetSaveButton();

	updateModeDisplay(mode);

	// ▼▼▼ ここに追加します ▼▼▼
	updateProblemCountDisplay();
	// ▲▲▲ ここまで ▲▲▲

	if (['easy', 'hard', 'timeattack', 'blind'].includes(mode)) {
		generateRandomProblem();
		initialShape = generateRandomInitialShape();
	}

	document.getElementById('view-front').style.display = 'none';
	document.getElementById('view-gallery').style.display = 'none';
	document.getElementById('view-game').style.display = 'block';

	const debugPanel = document.getElementById('debug-panel');
	if (debugPanel) {
		debugPanel.style.display = mode === 'debug' ? 'block' : 'none';
	}

	if (mode === 'debug') {
		syncDebugPanel();
	}

	if (typeof resetPlacement === 'function') resetPlacement();
};

// リザルト画面から同じモードで再スタートする処理
window.continueGame = function () {
	// リザルト画面を非表示にする
	const viewResult = document.getElementById('view-result');
	if (viewResult) {
		viewResult.style.display = 'none';
	}

	// 現在のモードでゲームを再開する（startGame等は既存の初期化関数に合わせてください）
	if (typeof startGame === 'function') {
		startGame(currentAppMode);
	} else {
		console.error('startGame 関数が見つかりません。');
	}
};

window.openGallery = function () {
	currentAppMode = 'gallery';
	document.getElementById('view-front').style.display = 'none'; //[cite: 24]
	document.getElementById('view-game').style.display = 'none'; //[cite: 24]
	document.getElementById('view-gallery').style.display = 'block'; //[cite: 24]

	// ★追加: ギャラリー画面を開いたときに一覧を描画する
	if (typeof loadAndDisplayGallery === 'function') {
		loadAndDisplayGallery();
	}
};

window.returnToFront = function () {
	if (currentAppMode === 'gallery' || currentAppMode === 'debug') {
		executeReturnToFront();
	} else {
		// リザルト画面が表示されているかを判定
		const viewResult = document.getElementById('view-result');
		const isResultScreen = viewResult && viewResult.style.display === 'block';

		// リザルト画面からの遷移の場合のみ確認ダイアログを出す
		if (isResultScreen) {
			executeReturnToFront();
			// 画面の切り替え処理（既存の処理）
			// document.getElementById('view-game').style.display = 'none';
			// document.getElementById('view-gallery').style.display = 'none';
			if (viewResult) viewResult.style.display = 'none';

			// document.getElementById('view-front').style.display = 'block';
		} else {
			document.getElementById('return-confirm-modal').style.display = 'flex';
		}
	}
};

window.confirmReturnToFront = function () {
	document.getElementById('return-confirm-modal').style.display = 'none';
	executeReturnToFront();
};

window.closeReturnConfirm = function () {
	document.getElementById('return-confirm-modal').style.display = 'none';
};

function executeReturnToFront() {
	currentAppMode = 'front';
	document.getElementById('view-front').style.display = 'block';
	document.getElementById('view-game').style.display = 'none';
	document.getElementById('view-gallery').style.display = 'none';
}

window.openTutorial = function () {
	document.getElementById('tutorial-modal').style.display = 'flex';
};

window.closeTutorial = function () {
	document.getElementById('tutorial-modal').style.display = 'none';
};
