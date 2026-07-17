// utils.js
import { SymmetryConfig } from './symmetryConfig.js';

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

// ★ 拡張版：hintsに加えて、問題用の activeSymbols, hintSymbols, isHintModeFlag を受け取れるようにします
export const drawSymmetryElements = (
	ctx,
	groupId,
	OFFSET_X,
	OFFSET_Y,
	CELL_SIZE,
	hints,
	activeSymbols = null,
	hintSymbols = null,
	isHintModeFlag = false,
) => {
	const config = SymmetryConfig[groupId];
	if (!config) return;

	const isHexagonal = config.system === 'hexagonal';
	const L = CELL_SIZE;
	const H_tri = (L * Math.sqrt(3)) / 2;

	const getPos = (u, v) => {
		if (isHexagonal) {
			return {
				x: OFFSET_X + u * L + v * (L / 2),
				y: OFFSET_Y + v * H_tri,
			};
		} else {
			return {
				x: OFFSET_X + u * CELL_SIZE,
				y: OFFSET_Y + v * CELL_SIZE,
			};
		}
	};

	// 共通の描画判定ロジック
	const getDisplayState = (id, type) => {
		const numId = Number(id);
		// A. 問題・ヒントの指定（配列）がある場合（本番・練習モード）
		if (activeSymbols || hintSymbols) {
			// ★ hints.showProblem がオンのときだけ問題の記号を表示する
			if (hints.showProblem && activeSymbols && activeSymbols.includes(numId)) {
				return { visible: true, isHint: false };
			}
			// ヒント記号は isHintModeFlag がオンなら独立して表示する
			if (hintSymbols && hintSymbols.includes(numId) && isHintModeFlag) {
				return { visible: true, isHint: true };
			}
			return { visible: false, isHint: false };
		}

		// B. 指定がない場合（デバッグモード：チェックボックス連動）
		// ★ 「問題を表示」がオフの場合は非表示にする
		if (!hints.showProblem) {
			return { visible: false, isHint: false };
		}

		if (type === 'm' && hints.mirror) return { visible: true, isHint: false };
		if (type === 'g' && hints.glide) return { visible: true, isHint: false };
		if (type.startsWith('r') && hints.rotation) return { visible: true, isHint: false };

		return { visible: false, isHint: false };
	};

	// 対称面 (線) の描画
	if (config.lines) {
		// Object.entries を使い、IDと配列 [type, u1, v1, u2, v2] を正しく取得
		Object.entries(config.lines).forEach(([id, [type, u1, v1, u2, v2]]) => {
			const { visible, isHint } = getDisplayState(id, type);
			if (!visible) return;

			const p1 = getPos(u1, v1);
			const p2 = getPos(u2, v2);

			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = 'red';
			ctx.globalAlpha = isHint ? 0.5 : 1.0; // ヒントの不透明度

			if (type === 'm') {
				ctx.lineWidth = 4;
				ctx.setLineDash([]);
			} else if (type === 'g') {
				ctx.lineWidth = 3;
				ctx.setLineDash([8, 8]);
			}

			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
			ctx.restore();
		});
	}

	// 回転対称軸の描画
	if (config.rotations) {
		Object.entries(config.rotations).forEach(([id, [type, u, v]]) => {
			const { visible, isHint } = getDisplayState(id, type);
			if (!visible) return;

			const p = getPos(u, v);
			const cx = p.x;
			const cy = p.y;

			// 'r2' -> 2, 'r3' -> 3 のように数値を抽出
			const n = parseInt(type.replace('r', ''), 10);

			ctx.save();
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'red';
			ctx.globalAlpha = isHint ? 0.5 : 1.0; // ヒントの不透明度
			ctx.beginPath();

			const r = CELL_SIZE === 200 ? 10 : 17; // 枠サイズに応じた半径調整

			if (n === 2) {
				ctx.ellipse(cx, cy, r, r * 0.65, 0, 0, 2 * Math.PI);
			} else if (n === 3) {
				for (let i = 0; i < 3; i++) {
					const angle = (i * 2 * Math.PI) / 3 - Math.PI / 2;
					ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
				}
				ctx.closePath();
			} else if (n === 4) {
				for (let i = 0; i < 4; i++) {
					const angle = (i * 2 * Math.PI) / 4 - Math.PI / 4;
					ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
				}
				ctx.closePath();
			} else if (n === 6) {
				for (let i = 0; i < 6; i++) {
					const angle = (i * Math.PI) / 3;
					ctx.lineTo(cx + r * 0.8 * Math.cos(angle), cy + r * 0.8 * Math.sin(angle));
				}
				ctx.closePath();
			}

			ctx.lineWidth = 1;
			ctx.fill();
			ctx.stroke();
			ctx.restore();
		});
	}
};
