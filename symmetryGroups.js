// symmetryGroups.js
import { filterDuplicates, drawSymmetryElements } from './utils.js';

export const SymmetryGroups = {
	p1: {
		name: 'p1 (並進のみ)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			return filterDuplicates([{ ...p0 }]);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p1', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p1', 0, 0, 200, hints),
	},
	p2: {
		name: 'p2 (2回回転)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let corrects = [{ ...p0 }];
			let cx = OFFSET_X + CELL_SIZE / 2,
				cy = OFFSET_Y + CELL_SIZE / 2;
			corrects.push({
				x: wrap(2 * cx - p0.x, OFFSET_X, CELL_SIZE),
				y: wrap(2 * cy - p0.y, OFFSET_Y, CELL_SIZE),
				angle: (p0.angle + 180) % 360,
				flipped: p0.flipped,
				isInitial: false,
			});
			return filterDuplicates(corrects);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p2', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p2', 0, 0, 200, hints),
	},
	pm: {
		name: 'pm (鏡映)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let corrects = [{ ...p0 }];
			corrects.push({
				x: wrap(2 * OFFSET_X - p0.x, OFFSET_X, CELL_SIZE),
				y: p0.y,
				angle: (360 - p0.angle) % 360,
				flipped: !p0.flipped,
				isInitial: false,
			});
			return filterDuplicates(corrects);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'pm', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'pm', 0, 0, 200, hints),
	},
	pg: {
		name: 'pg (映進)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let corrects = [{ ...p0 }];
			corrects.push({
				x: wrap(2 * OFFSET_X - p0.x, OFFSET_X, CELL_SIZE),
				y: wrap(p0.y + CELL_SIZE / 2, OFFSET_Y, CELL_SIZE),
				angle: (360 - p0.angle) % 360,
				flipped: !p0.flipped,
				isInitial: false,
			});
			return filterDuplicates(corrects);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'pg', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'pg', 0, 0, 200, hints),
	},
	cm: {
		name: 'cm (鏡映・映進)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let corrects = [{ ...p0 }];
			corrects.push({
				x: wrap(2 * OFFSET_X - p0.x, OFFSET_X, CELL_SIZE),
				y: p0.y,
				angle: (360 - p0.angle) % 360,
				flipped: !p0.flipped,
				isInitial: false,
			});
			let len = corrects.length;
			for (let i = 0; i < len; i++) {
				let c = corrects[i];
				corrects.push({
					x: wrap(c.x + CELL_SIZE / 2, OFFSET_X, CELL_SIZE),
					y: wrap(c.y + CELL_SIZE / 2, OFFSET_Y, CELL_SIZE),
					angle: c.angle,
					flipped: c.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(corrects);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'cm', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'cm', 0, 0, 200, hints),
	},
	pmm: {
		name: 'pmm (縦横鏡映・2回回転)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let corrects = [{ ...p0 }];
			corrects.push({
				x: wrap(2 * OFFSET_X - p0.x, OFFSET_X, CELL_SIZE),
				y: p0.y,
				angle: (360 - p0.angle) % 360,
				flipped: !p0.flipped,
				isInitial: false,
			});
			let len = corrects.length;
			for (let i = 0; i < len; i++) {
				let c = corrects[i];
				corrects.push({
					x: c.x,
					y: wrap(2 * OFFSET_Y - c.y, OFFSET_Y, CELL_SIZE),
					angle: (180 - c.angle + 360) % 360,
					flipped: !c.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(corrects);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'pmm', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'pmm', 0, 0, 200, hints),
	},
	p2mg: {
		name: 'p2mg (2回回転・縦鏡映・横映進)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let corrects = [{ ...p0 }];
			// 縦鏡映 (x = 1/4 基準)
			const mx = 2 * (OFFSET_X + CELL_SIZE / 4) - p0.x;
			corrects.push({
				x: wrap(mx, OFFSET_X, CELL_SIZE),
				y: p0.y,
				angle: (360 - p0.angle) % 360,
				flipped: !p0.flipped,
				isInitial: false,
			});
			// 横映進 (y = 0 基準、x方向に CELL_SIZE/2 シフト)
			const len = corrects.length;
			for (let i = 0; i < len; i++) {
				const p = corrects[i];
				corrects.push({
					x: wrap(p.x + CELL_SIZE / 2, OFFSET_X, CELL_SIZE),
					y: wrap(2 * OFFSET_Y - p.y, OFFSET_Y, CELL_SIZE),
					angle: (180 - p.angle + 360) % 360,
					flipped: !p.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(corrects);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p2mg', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p2mg', 0, 0, 200, hints),
	},
	pgg: {
		name: 'pgg (縦横映進・2回回転)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let corrects = [{ ...p0 }];
			corrects.push({
				x: wrap(2 * OFFSET_X - p0.x, OFFSET_X, CELL_SIZE),
				y: wrap(p0.y + CELL_SIZE / 2, OFFSET_Y, CELL_SIZE),
				angle: (360 - p0.angle) % 360,
				flipped: !p0.flipped,
				isInitial: false,
			});
			let len = corrects.length;
			for (let i = 0; i < len; i++) {
				let c = corrects[i];
				corrects.push({
					x: wrap(c.x + CELL_SIZE / 2, OFFSET_X, CELL_SIZE),
					y: wrap(2 * OFFSET_Y - c.y, OFFSET_Y, CELL_SIZE),
					angle: (180 - c.angle + 360) % 360,
					flipped: !c.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(corrects);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'pgg', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'pgg', 0, 0, 200, hints),
	},
	cmm: {
		name: 'cmm (縦横鏡映・2回回転・中心等価)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let corrects = [{ ...p0 }];
			corrects.push({
				x: wrap(2 * OFFSET_X - p0.x, OFFSET_X, CELL_SIZE),
				y: p0.y,
				angle: (360 - p0.angle) % 360,
				flipped: !p0.flipped,
				isInitial: false,
			});
			let len = corrects.length;
			for (let i = 0; i < len; i++) {
				let c = corrects[i];
				corrects.push({
					x: c.x,
					y: wrap(2 * OFFSET_Y - c.y, OFFSET_Y, CELL_SIZE),
					angle: (180 - c.angle + 360) % 360,
					flipped: !c.flipped,
					isInitial: false,
				});
			}
			let len2 = corrects.length;
			for (let i = 0; i < len2; i++) {
				let c = corrects[i];
				corrects.push({
					x: wrap(c.x + CELL_SIZE / 2, OFFSET_X, CELL_SIZE),
					y: wrap(c.y + CELL_SIZE / 2, OFFSET_Y, CELL_SIZE),
					angle: c.angle,
					flipped: c.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(corrects);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'cmm', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'cmm', 0, 0, 200, hints),
	},
	p4: {
		name: 'p4 (4回回転)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let corrects = [{ ...p0 }];
			let cx = OFFSET_X + CELL_SIZE / 2,
				cy = OFFSET_Y + CELL_SIZE / 2;
			for (let i = 1; i < 4; i++) {
				let prev = corrects[i - 1];
				let dx = prev.x - cx,
					dy = prev.y - cy;
				corrects.push({
					x: wrap(cx - dy, OFFSET_X, CELL_SIZE),
					y: wrap(cy + dx, OFFSET_Y, CELL_SIZE),
					angle: (prev.angle + 90) % 360,
					flipped: prev.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(corrects);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p4', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p4', 0, 0, 200, hints),
	},
	p4mm: {
		name: 'p4mm (4回回転・鏡映)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let pts = [{ ...p0 }];
			let cx = OFFSET_X + CELL_SIZE / 2,
				cy = OFFSET_Y + CELL_SIZE / 2;
			for (let i = 1; i < 4; i++) {
				let prev = pts[i - 1];
				let dx = prev.x - cx,
					dy = prev.y - cy;
				pts.push({
					x: wrap(cx - dy, OFFSET_X, CELL_SIZE),
					y: wrap(cy + dx, OFFSET_Y, CELL_SIZE),
					angle: (prev.angle + 90) % 360,
					flipped: prev.flipped,
					isInitial: false,
				});
			}
			let len = pts.length;
			for (let i = 0; i < len; i++) {
				let p = pts[i];
				pts.push({
					x: wrap(2 * OFFSET_X - p.x, OFFSET_X, CELL_SIZE),
					y: p.y,
					angle: (360 - p.angle) % 360,
					flipped: !p.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(pts);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p4mm', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p4mm', 0, 0, 200, hints),
	},
	p4mg: {
		name: 'p4mg (4回回転・対角鏡映・縦横映進)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let pts = [{ ...p0 }];
			let cx = OFFSET_X,
				cy = OFFSET_Y;
			for (let i = 1; i < 4; i++) {
				let prev = pts[i - 1];
				let dx = prev.x - cx,
					dy = prev.y - cy;
				pts.push({
					x: wrap(cx - dy, OFFSET_X, CELL_SIZE),
					y: wrap(cy + dx, OFFSET_Y, CELL_SIZE),
					angle: (prev.angle + 90) % 360,
					flipped: prev.flipped,
					isInitial: false,
				});
			}
			let len = pts.length;
			for (let i = 0; i < len; i++) {
				let p = pts[i];
				pts.push({
					x: wrap(p.x + CELL_SIZE / 2, OFFSET_X, CELL_SIZE),
					y: wrap(2 * OFFSET_Y - p.y + CELL_SIZE / 2, OFFSET_Y, CELL_SIZE),
					angle: (180 - p.angle + 360) % 360,
					flipped: !p.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(pts);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p4mg', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p4mg', 0, 0, 200, hints),
	},
	p3: {
		name: 'p3 (3回回転)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let pts = [{ ...p0 }];
			let cx = OFFSET_X + CELL_SIZE / 2,
				cy = OFFSET_Y + CELL_SIZE / 2;
			for (let i = 1; i < 3; i++) {
				let prev = pts[i - 1];
				let dx = prev.x - cx,
					dy = prev.y - cy;
				let nx = dx * Math.cos((2 * Math.PI) / 3) - dy * Math.sin((2 * Math.PI) / 3);
				let ny = dx * Math.sin((2 * Math.PI) / 3) + dy * Math.cos((2 * Math.PI) / 3);
				pts.push({
					x: wrap(cx + nx, OFFSET_X, CELL_SIZE),
					y: wrap(cy + ny, OFFSET_Y, CELL_SIZE),
					angle: (prev.angle + 120) % 360,
					flipped: prev.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(pts);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p3', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p3', 0, 0, 200, hints),
	},
	p3m1: {
		name: 'p3m1 (3回回転・鏡映)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let pts = [{ ...p0 }];
			let cx = OFFSET_X + CELL_SIZE / 2,
				cy = OFFSET_Y + CELL_SIZE / 2;
			for (let i = 1; i < 3; i++) {
				let prev = pts[i - 1];
				let dx = prev.x - cx,
					dy = prev.y - cy;
				let nx = dx * Math.cos((2 * Math.PI) / 3) - dy * Math.sin((2 * Math.PI) / 3);
				let ny = dx * Math.sin((2 * Math.PI) / 3) + dy * Math.cos((2 * Math.PI) / 3);
				pts.push({
					x: wrap(cx + nx, OFFSET_X, CELL_SIZE),
					y: wrap(cy + ny, OFFSET_Y, CELL_SIZE),
					angle: (prev.angle + 120) % 360,
					flipped: prev.flipped,
					isInitial: false,
				});
			}
			let len = pts.length;
			for (let i = 0; i < len; i++) {
				let p = pts[i];
				pts.push({
					x: wrap(2 * OFFSET_X - p.x, OFFSET_X, CELL_SIZE),
					y: p.y,
					angle: (360 - p.angle) % 360,
					flipped: !p.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(pts);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p3m1', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p3m1', 0, 0, 200, hints),
	},
	p31m: {
		name: 'p31m (3回回転・鏡映)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let pts = [{ ...p0 }];
			let cx = OFFSET_X + CELL_SIZE / 2,
				cy = OFFSET_Y + CELL_SIZE / 2;
			for (let i = 1; i < 3; i++) {
				let prev = pts[i - 1];
				let dx = prev.x - cx,
					dy = prev.y - cy;
				let nx = dx * Math.cos((2 * Math.PI) / 3) - dy * Math.sin((2 * Math.PI) / 3);
				let ny = dx * Math.sin((2 * Math.PI) / 3) + dy * Math.cos((2 * Math.PI) / 3);
				pts.push({
					x: wrap(cx + nx, OFFSET_X, CELL_SIZE),
					y: wrap(cy + ny, OFFSET_Y, CELL_SIZE),
					angle: (prev.angle + 120) % 360,
					flipped: prev.flipped,
					isInitial: false,
				});
			}
			let len = pts.length;
			for (let i = 0; i < len; i++) {
				let p = pts[i];
				pts.push({
					x: p.x,
					y: wrap(2 * OFFSET_Y - p.y, OFFSET_Y, CELL_SIZE),
					angle: (180 - p.angle + 360) % 360,
					flipped: !p.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(pts);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p31m', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p31m', 0, 0, 200, hints),
	},
	p6: {
		name: 'p6 (6回回転)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let pts = [{ ...p0 }];
			let cx = OFFSET_X + CELL_SIZE / 2,
				cy = OFFSET_Y + CELL_SIZE / 2;
			for (let i = 1; i < 6; i++) {
				let prev = pts[i - 1];
				let dx = prev.x - cx,
					dy = prev.y - cy;
				let nx = dx * Math.cos(Math.PI / 3) - dy * Math.sin(Math.PI / 3);
				let ny = dx * Math.sin(Math.PI / 3) + dy * Math.cos(Math.PI / 3);
				pts.push({
					x: wrap(cx + nx, OFFSET_X, CELL_SIZE),
					y: wrap(cy + ny, OFFSET_Y, CELL_SIZE),
					angle: (prev.angle + 60) % 360,
					flipped: prev.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(pts);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p6', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p6', 0, 0, 200, hints),
	},
	p6mm: {
		name: 'p6mm (6回回転・鏡映)',
		getCorrectShapes: (p0, OFFSET_X, OFFSET_Y, CELL_SIZE, wrap) => {
			let pts = [{ ...p0 }];
			let cx = OFFSET_X + CELL_SIZE / 2,
				cy = OFFSET_Y + CELL_SIZE / 2;
			for (let i = 1; i < 6; i++) {
				let prev = pts[i - 1];
				let dx = prev.x - cx,
					dy = prev.y - cy;
				let nx = dx * Math.cos(Math.PI / 3) - dy * Math.sin(Math.PI / 3);
				let ny = dx * Math.sin(Math.PI / 3) + dy * Math.cos(Math.PI / 3);
				pts.push({
					x: wrap(cx + nx, OFFSET_X, CELL_SIZE),
					y: wrap(cy + ny, OFFSET_Y, CELL_SIZE),
					angle: (prev.angle + 60) % 360,
					flipped: prev.flipped,
					isInitial: false,
				});
			}
			let len = pts.length;
			for (let i = 0; i < len; i++) {
				let p = pts[i];
				pts.push({
					x: wrap(2 * OFFSET_X - p.x, OFFSET_X, CELL_SIZE),
					y: p.y,
					angle: (360 - p.angle) % 360,
					flipped: !p.flipped,
					isInitial: false,
				});
			}
			return filterDuplicates(pts);
		},
		drawAxes: (ctx, OX, OY, CS, hints) => drawSymmetryElements(ctx, 'p6mm', OX, OY, CS, hints),
		drawModelAxes: (ctx, hints) => drawSymmetryElements(ctx, 'p6mm', 0, 0, 200, hints),
	},
};
