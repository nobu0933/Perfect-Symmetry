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

	// ★ 六角格子判定と、単位ベクトルの長さを計算
	const isHexagonal = config.system === 'hexagonal';
	const L = CELL_SIZE;
	const H_tri = (L * Math.sqrt(3)) / 2;

	// ★ 座標 (u, v) を直交座標 (x, y) に変換するヘルパー関数
	const getPos = (u, v) => {
		if (isHexagonal) {
			// 六角格子の場合：uを水平方向、vを斜め60度方向のベクトルとして直交座標に変換
			return {
				x: OFFSET_X + u * L + v * (L / 2),
				y: OFFSET_Y + v * H_tri,
			};
		} else {
			// 直交格子の場合（既存ロジック）
			return {
				x: OFFSET_X + u * CELL_SIZE,
				y: OFFSET_Y + v * CELL_SIZE,
			};
		}
	};

	// 対称面 (線) の描画
	config.lines.forEach(([u1, v1, u2, v2, type, vis]) => {
		const isMirrorHint = type === 'm' && hints.mirror;
		const isGlideHint = type === 'g' && hints.glide;
		const isInitialVisible = vis === 'i' && hints.showProblem;

		if (isInitialVisible || (vis === 'h' && (isMirrorHint || isGlideHint))) {
			// ヘルパー関数で始点と終点を計算
			const p1 = getPos(u1, v1);
			const p2 = getPos(u2, v2);

			ctx.beginPath();
			ctx.strokeStyle = 'red';
			if (type === 'm') {
				ctx.lineWidth = 4;
				ctx.setLineDash([]);
			} else if (type === 'g') {
				ctx.lineWidth = 3;
				ctx.setLineDash(CELL_SIZE === 200 ? [6, 6] : [8, 8]);
			}
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
			ctx.setLineDash([]);
		}
	});

	// 回転対称軸の描画
	config.rotations.forEach(([u, v, n, vis]) => {
		const isRotationHint = hints.rotation;
		const isInitialVisible = vis === 'i' && hints.showProblem;

		if (isInitialVisible || (vis === 'h' && isRotationHint)) {
			// ヘルパー関数で中心座標を計算
			const p = getPos(u, v);
			const cx = p.x;
			const cy = p.y;

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
