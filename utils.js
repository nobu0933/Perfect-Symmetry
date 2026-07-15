// utils.js
import { SymmetryConfig } from './symmetryConfig.js';

// 重複パターンを削除する関数 (浮動小数点誤差を考慮)
export const filterDuplicates = (shapes) => {
	const unique = [];
	shapes.forEach((shape) => {
		const isDup = unique.some((u) => {
			const angleDiff = Math.abs(u.angle - shape.angle) % 360;
			const angleMatch = angleDiff < 0.1 || angleDiff > 359.9;
			return (
				Math.abs(u.x - shape.x) < 0.1 &&
				Math.abs(u.y - shape.y) < 0.1 &&
				angleMatch &&
				u.flipped === shape.flipped
			);
		});
		if (!isDup) unique.push(shape);
	});
	return unique;
};

// 共通の対称記号描画関数
export const drawSymmetryElements = (ctx, groupId, OFFSET_X, OFFSET_Y, CELL_SIZE, hints) => {
	const config = SymmetryConfig[groupId];
	if (!config) return;

	// 対称面 (線) の描画
	config.lines.forEach(([x1, y1, x2, y2, type, vis]) => {
		const isMirrorHint = type === 'm' && hints.mirror;
		const isGlideHint = type === 'g' && hints.glide;

		// ★ 「初期表示要素 (i)」 かつ 「問題を表示」がオンの場合に描画を許可
		const isInitialVisible = vis === 'i' && hints.showProblem;

		// 条件を結合
		if (isInitialVisible || (vis === 'h' && (isMirrorHint || isGlideHint))) {
			ctx.beginPath();
			ctx.strokeStyle = 'red';
			if (type === 'm') {
				ctx.lineWidth = 4;
				ctx.setLineDash([]);
			} else if (type === 'g') {
				ctx.lineWidth = 3;
				ctx.setLineDash(CELL_SIZE === 200 ? [6, 6] : [8, 8]);
			}
			ctx.moveTo(OFFSET_X + x1 * CELL_SIZE, OFFSET_Y + y1 * CELL_SIZE);
			ctx.lineTo(OFFSET_X + x2 * CELL_SIZE, OFFSET_Y + y2 * CELL_SIZE);
			ctx.stroke();
			ctx.setLineDash([]);
		}
	});

	// 回転対称軸の描画
	config.rotations.forEach(([x, y, n, vis]) => {
		const isRotationHint = hints.rotation;

		// ★ 同様に、「初期表示要素 (i)」 かつ 「問題を表示」がオンの場合に描画を許可
		const isInitialVisible = vis === 'i' && hints.showProblem;

		if (isInitialVisible || (vis === 'h' && isRotationHint)) {
			const cx = OFFSET_X + x * CELL_SIZE;
			const cy = OFFSET_Y + y * CELL_SIZE;
			ctx.fillStyle = 'red';
			ctx.beginPath();
			const r = 17; // 4回回転以上の基準サイズ(約24pxの半分)

			if (n === 2) {
				// 楕円
				ctx.ellipse(cx, cy, 10, 6.5, 0, 0, 2 * Math.PI);
			} else if (n === 3) {
				// 三角形
				ctx.moveTo(cx, cy - r);
				ctx.lineTo(cx + r * 0.866, cy + r / 2);
				ctx.lineTo(cx - r * 0.866, cy + r / 2);
				ctx.closePath();
			} else if (n === 4) {
				// ひし形
				ctx.moveTo(cx, cy - r);
				ctx.lineTo(cx + r, cy);
				ctx.lineTo(cx, cy + r);
				ctx.lineTo(cx - r, cy);
				ctx.closePath();
			} else if (n === 6) {
				// 六角形
				for (let i = 0; i < 6; i++) {
					const angle = (i * Math.PI) / 3;
					ctx.lineTo(cx + r * 0.8 * Math.cos(angle), cy + r * 0.8 * Math.sin(angle));
				}
				ctx.closePath();
			}
			ctx.fill();
		}
	});
};
