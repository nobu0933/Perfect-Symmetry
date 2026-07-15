// main.js
import { SymmetryGroups } from './symmetryGroups.js';
import { SymmetryConfig } from './symmetryConfig.js';

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

// --- ランダム生成用の設定 ---
const INITIAL_ANGLE_STEP = 90; // 向きの刻み幅（後で変更しやすいように変数化）
const SHAPE_COLORS = ['#333333', '#0056b3', '#28a745']; // 黒, 青, 緑
const SHAPE_TYPES = ['triangle', 'six']; // 図形の種類（直角三角形, 数字の6）
const MIN_SIZE = 30; // 現状程度のサイズ（下限）
const MAX_SIZE = CELL_SIZE / 2; // 単位格子の半分の正方形（上限）

// 初期図形をランダムに生成する関数
function generateRandomInitialShape() {
	const type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
	const color = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];
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

function resetUI() {
	isScored = false;
	document.getElementById('score-btn').disabled = false;
	document.getElementById('flip-btn').disabled = false;
	document.getElementById('reset-btn').disabled = false;
	canvas.style.cursor = 'none';
	document.getElementById('show-user-answer-toggle').checked = false;

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
		return groupDef.getCorrectShapes(p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap);
	}
	return [{ ...p0 }];
}

// drawTriangle の代わりにこれを追加します
function drawShape(context, x, y, angle, flipped, type, size, color, alpha = 1.0) {
	context.save();
	context.globalAlpha = alpha;
	context.translate(x, y);
	context.rotate((angle * Math.PI) / 180);
	if (flipped) context.scale(-1, 1);

	context.beginPath();

	if (type === 'triangle') {
		// 直角三角形 (元の 30x15 の比率を維持するよう size を基準に計算)
		context.moveTo(0, 0);
		context.lineTo(size, 0);
		context.lineTo(0, size / 2);
		context.closePath();
	} else if (type === 'six') {
		// 数字の「6」のような非対称な図形
		const t = size * 0.25; // 線の太さ
		const w = size * 0.8; // 幅
		const h = size; // 高さ

		// 外側の輪郭（時計回りで描画）
		context.moveTo(0, 0);
		context.lineTo(w, 0);
		context.lineTo(w, t);
		context.lineTo(t, t);
		context.lineTo(t, h / 2);
		context.lineTo(w, h / 2);
		context.lineTo(w, h);
		context.lineTo(0, h);
		context.closePath();

		// 内側の穴（反時計回りで描画して中をくり抜く）
		context.moveTo(t, h / 2 + t);
		context.lineTo(t, h - t);
		context.lineTo(w - t, h - t);
		context.lineTo(w - t, h / 2 + t);
		context.closePath();
	}

	context.fillStyle = color;
	context.fill();
	context.restore();
}

function drawInAllCells(x, y, angle, flipped, alpha = 1.0) {
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

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

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

	// 平面群ごとの描画（ヒント状態を渡す）
	const groupDef = SymmetryGroups[currentGroup];
	if (groupDef && groupDef.drawAxes) {
		groupDef.drawAxes(ctx, OFFSET_X, OFFSET_Y, CELL_SIZE, getHints());
	}

	placedShapes.forEach((shape) => {
		drawInAllCells(shape.x, shape.y, shape.angle, shape.flipped, 1.0);
	});

	if (isMouseInCanvas && !isScored) {
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

canvas.addEventListener('click', (e) => {
	// ★ 採点済みの場合は「問題を表示」をトグルする
	if (isScored) {
		const toggle = document.getElementById('show-problem-toggle');
		toggle.checked = !toggle.checked;
		// 変更を反映するために再描画
		draw();
		drawModelAnswer();
		return;
	}

	if (!isMouseInCanvas) return;

	placedShapes.push({
		x: wrap(previewShape.x, OFFSET_X, CELL_SIZE),
		y: wrap(previewShape.y, OFFSET_Y, CELL_SIZE),
		angle: previewShape.angle,
		flipped: previewShape.flipped,
		isInitial: false,
	});
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

function resetPlacement() {
	placedShapes = [{ ...initialShape }];
	// 初期図形の状態に合わせてプレビュー図形も同期する
	previewShape.angle = initialShape.angle;
	previewShape.flipped = initialShape.flipped;
	resetUI();
	draw();
}

function doScore() {
	if (isScored) return;

	// ★ 採点ボタンを押した際に自動的に「問題を表示」と「すべてのヒント」をオフにする
	document.getElementById('show-problem-toggle').checked = false;
	document.getElementById('hint-rotation').checked = false;
	document.getElementById('hint-mirror').checked = false;
	document.getElementById('hint-glide').checked = false;

	let totalScore = 0; // ★ 0点スタートに変更
	let errors = [];

	const userPlaced = placedShapes.filter((s) => !s.isInitial);

	// ★ p1の場合は並進のみ（追加配置は不要）
	if (currentGroup === 'p1') {
		totalScore = 100;
		// if (userPlaced.length === 0) {
		// 	totalScore = 100;
		// } else {
		// 	// 余分な配置がある場合は減点していく
		// 	totalScore = 100 - userPlaced.length * 20;
		// 	errors.push('・p1は並進のみのため、新たな模様の配置は不要です。');
		// }
	} else {
		// --- 加点方式の採点ロジック ---
		const corrects = getCorrectShapes();
		const targets = corrects.filter((c) => !c.isInitial);

		if (targets.length > 0) {
			const pointsPerTarget = 100 / targets.length;
			const usedUserIndices = new Set(); // 同じユーザー配置を複数回正解扱いにしないための管理

			let missingCount = 0;
			let incorrectTransformCount = 0;
			let positionPenaltyCount = 0;

			targets.forEach((target) => {
				let bestMatchIndex = -1;
				let minDistance = Infinity;

				userPlaced.forEach((user, index) => {
					if (usedUserIndices.has(index)) return; // 既に他のターゲットの正解として使われたものはスキップ
					const dist = Math.sqrt(Math.pow(user.x - target.x, 2) + Math.pow(user.y - target.y, 2));
					if (dist < minDistance) {
						minDistance = dist;
						bestMatchIndex = index;
					}
				});

				if (bestMatchIndex === -1 || minDistance > 50) {
					// ターゲット付近に何も配置されていない場合（0点）
					missingCount++;
				} else {
					// ターゲット付近に配置されている場合（加点）
					usedUserIndices.add(bestMatchIndex);
					const bestMatch = userPlaced[bestMatchIndex];

					// 1. 位置が大体合っていれば部分点 (40%)
					totalScore += pointsPerTarget * 0.4;

					// 2. 距離による精度の得点 (最大30%)
					if (minDistance <= 3) {
						totalScore += pointsPerTarget * 0.3;
					} else {
						const posScore = pointsPerTarget * 0.3 * (1 - (minDistance - 3) / 47);
						totalScore += posScore;
						positionPenaltyCount++;
					}

					// 3. 向きと反転の得点 (30%)
					const angleDiff = Math.abs(bestMatch.angle - target.angle) % 360;
					const isAngleCorrect = angleDiff < 5 || angleDiff > 355;
					const isFlipCorrect = bestMatch.flipped === target.flipped;

					if (isAngleCorrect && isFlipCorrect) {
						totalScore += pointsPerTarget * 0.3;
					} else {
						incorrectTransformCount++;
					}
				}
			});

			// 余分な配置のペナルティ (過剰に配置するほど0点に近づく)
			const extraCount = userPlaced.length - targets.length;
			if (extraCount > 0) {
				totalScore -= extraCount * 20; // 1つにつき20点減点
				errors.push('・余分な模様が配置されています。');
			}
			// エラーメッセージの集約
			if (missingCount > 0) errors.push('・配置すべき場所に模様がありません。');
			if (positionPenaltyCount > 0) errors.push('・配置位置が少しズレている模様があります。');
			if (incorrectTransformCount > 0) errors.push('・模様の向き、または反転状態が違います。');
		}
	}

	// 得点計算（下限は0点、上限は100点）
	totalScore = Math.max(0, Math.min(100, Math.round(totalScore)));

	isScored = true;

	document.getElementById('score-btn').disabled = true;
	document.getElementById('flip-btn').disabled = true;
	document.getElementById('reset-btn').disabled = true;
	canvas.style.cursor = 'default';

	document.getElementById('result-area').style.display = 'block';
	document.getElementById('next-btn').style.display = 'block';

	const scoreDisplay = document.getElementById('score-display');
	const adviceDisplay = document.getElementById('advice-display');

	// --- 採点表示の条件分岐 ---
	if (totalScore === 100) {
		// 100点満点の場合
		scoreDisplay.style.color = '#28a745'; // 緑色
		scoreDisplay.textContent = '🎉 100点 Perfect!';
		adviceDisplay.style.display = 'block';
		adviceDisplay.textContent = '完璧です！';
	} else if (totalScore >= 90) {
		// 90点以上100点未満の場合
		scoreDisplay.style.color = '#ff9800'; // オレンジ色
		scoreDisplay.textContent = `採点結果: ${totalScore}点`;
		adviceDisplay.style.display = 'block';
		adviceDisplay.textContent = 'ほぼ完璧です！';
	} else {
		// 90点未満の場合
		scoreDisplay.style.color = totalScore > 0 ? '#ff9800' : '#d9534f'; // 0点なら赤、それ以外はオレンジ
		scoreDisplay.textContent = `採点結果: ${totalScore}点`;
		adviceDisplay.style.display = 'block';
		adviceDisplay.innerHTML = errors.join('<br>') || 'もう少しで完璧です！微調整してみましょう。';
	}

	drawModelAnswer();
	draw();
}

function nextProblem() {
	// 新しい図形をランダム生成してリセット
	initialShape = generateRandomInitialShape();
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

function drawModelAnswer() {
	const aCanvas = document.getElementById('answerCanvas');
	const aCtx = aCanvas.getContext('2d');
	aCtx.clearRect(0, 0, aCanvas.width, aCanvas.height);

	aCtx.save();
	aCtx.translate(20, 20);

	aCtx.strokeStyle = '#8c8c8c';
	aCtx.lineWidth = 2;
	aCtx.strokeRect(0, 0, 200, 200);

	// 解答描画にもヒント状態を渡す
	const groupDef = SymmetryGroups[currentGroup];
	if (groupDef && groupDef.drawModelAxes) {
		groupDef.drawModelAxes(aCtx, getHints());
	}

	const showUserAnswer = document.getElementById('show-user-answer-toggle').checked;
	if (showUserAnswer) {
		const userPlaced = placedShapes.filter((s) => !s.isInitial);
		userPlaced.forEach((shape) => {
			const localX = shape.x - OFFSET_X;
			const localY = shape.y - OFFSET_Y;
			drawShape(
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
		const localX = shape.x - OFFSET_X;
		const localY = shape.y - OFFSET_Y;
		drawShape(
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
