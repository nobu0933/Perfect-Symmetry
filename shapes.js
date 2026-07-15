// shapes.js

// 図形の色バリエーション（紫と濃い黄色っぽいオレンジを追加）
export const SHAPE_COLORS = [
	'#333333', // 黒
	'#0056b3', // 青
	'#28a745', // 緑
	'#800080', // 紫
	'#d97706', // 濃い黄色っぽいオレンジ
];

// 図形のパス描画定義（原点が視覚的中心になるようにオフセットを計算して描画する）
export const ShapeDefs = {
	triangle: {
		drawPath: (context, size) => {
			// 直角三角形の「重心」を原点(0,0)に合わせるためのオフセット
			const cx = -size / 3;
			const cy = -size / 6;

			context.moveTo(cx, cy);
			context.lineTo(cx + size, cy);
			context.lineTo(cx, cy + size / 2);
			context.closePath();
		},
	},
	six: {
		drawPath: (context, size) => {
			// 数字の「6」のような非対称な図形
			const t = size * 0.25; // 線の太さ
			const w = size * 0.8; // 幅
			const h = size; // 高さ

			// バウンディングボックスの中心を原点に合わせる
			const cx = -w / 2;
			const cy = -h / 2;

			// 外側の輪郭（時計回りで描画）
			context.moveTo(cx, cy);
			context.lineTo(cx + w, cy);
			context.lineTo(cx + w, cy + t);
			context.lineTo(cx + t, cy + t);
			context.lineTo(cx + t, cy + h / 2);
			context.lineTo(cx + w, cy + h / 2);
			context.lineTo(cx + w, cy + h);
			context.lineTo(cx, cy + h);
			context.closePath();

			// 内側の穴（反時計回りで描画して中をくり抜く）
			context.moveTo(cx + t, cy + h / 2 + t);
			context.lineTo(cx + t, cy + h - t);
			context.lineTo(cx + w - t, cy + h - t);
			context.lineTo(cx + w - t, cy + h / 2 + t);
			context.closePath();
		},
	},
	l_shape: {
		drawPath: (context, size) => {
			// L字型
			const t = size * 0.25; // 線の太さ
			const w = size * 0.75; // 全体の幅
			const h = size; // 全体の高さ

			// バウンディングボックスの中心を原点に合わせる
			const cx = -w / 2;
			const cy = -h / 2;

			context.moveTo(cx, cy);
			context.lineTo(cx + t, cy);
			context.lineTo(cx + t, cy + h - t);
			context.lineTo(cx + w, cy + h - t);
			context.lineTo(cx + w, cy + h);
			context.lineTo(cx, cy + h);
			context.closePath();
		},
	},
	f_shape: {
		drawPath: (context, size) => {
			// Fの字型
			const t = size * 0.2; // 線の太さ
			const w = size * 0.8; // 上部の横棒の幅
			const h = size; // 全体の高さ
			const mw = size * 0.6; // 中段の横棒の長さ
			const my = size * 0.4; // 中段の横棒の位置（Yオフセット）

			// バウンディングボックスの中心を原点に合わせる
			const cx = -w / 2;
			const cy = -h / 2;

			context.moveTo(cx, cy);
			context.lineTo(cx + w, cy);
			context.lineTo(cx + w, cy + t);
			context.lineTo(cx + t, cy + t);
			context.lineTo(cx + t, cy + my);
			context.lineTo(cx + mw, cy + my);
			context.lineTo(cx + mw, cy + my + t);
			context.lineTo(cx + t, cy + my + t);
			context.lineTo(cx + t, cy + h);
			context.lineTo(cx, cy + h);
			context.closePath();
		},
	},
};

// 登録されている図形のキー一覧を自動生成
export const SHAPE_TYPES = Object.keys(ShapeDefs);
