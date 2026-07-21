// result.js
import { openSaveGalleryModal } from './gallery.js'; // ★ 追加: モーダルを開く関数をインポート

// --- 変更箇所：関数の引数とスコア表示部分 (3行目付近) ---
// ★ 第5引数に cumulativeTotalScore を追加
window.showTotalResult = function (
	cumulativeScore,
	solvedCount,
	mode,
	historyData = [],
	cumulativeTotalScore = 0,
) {
	// 他の画面をすべて非表示にする
	document.getElementById('view-front').style.display = 'none';
	document.getElementById('view-game').style.display = 'none';
	document.getElementById('view-gallery').style.display = 'none';

	// リザルト画面を表示する
	const viewResult = document.getElementById('view-result');
	if (viewResult) {
		viewResult.style.display = 'block';
	}

	// スコアと詳細情報の表示を更新
	const scoreDisplay = document.getElementById('result-score-display');
	const detailDisplay = document.getElementById('result-detail-display');
	const maxScore = solvedCount * 100; // 1問100点満点の場合の最大得点

	if (mode === 'timeattack') {
		// タイムアタックモードの場合
		if (scoreDisplay) {
			scoreDisplay.textContent = `Score : ${cumulativeScore} pt`;
			scoreDisplay.style.color = '#28a745'; // 色指定をリセット
		}
		if (detailDisplay) detailDisplay.innerHTML = ''; // 得点率は不要なため空にする
	} else {
		const accuracy = maxScore > 0 ? Math.round((cumulativeTotalScore / maxScore) * 100) : 0;

		if (scoreDisplay) {
			// 得点率に応じた文字色の変更
			if (cumulativeTotalScore == maxScore) {
				scoreDisplay.textContent = `🎉 ${cumulativeTotalScore} / ${maxScore} Perfect!`;
				scoreDisplay.style.color = '#28a745'; // 緑 (90%超)
			} else if (accuracy > 90) {
				scoreDisplay.textContent = `${cumulativeTotalScore} / ${maxScore}`;
				scoreDisplay.style.color = '#28a745'; // 緑 (90%超)
			} else if (accuracy > 0) {
				scoreDisplay.textContent = `${cumulativeTotalScore} / ${maxScore}`;
				scoreDisplay.style.color = '#ff9800'; // オレンジ (90%以下)
			} else {
				scoreDisplay.textContent = `${cumulativeTotalScore} / ${maxScore}`;
				scoreDisplay.style.color = '#d9534f'; // 赤 (0%)
			}
		}

		if (detailDisplay) {
			detailDisplay.innerHTML = `
				得点率: <strong>${accuracy}</strong> %
			`;
		}
	}

	// ▼▼▼ 変更: 履歴データのCanvas描画処理 ▼▼▼
	const historyDisplay = document.getElementById('result-history-display');

	if (historyDisplay) {
		historyDisplay.innerHTML = ''; // 中身を一度リセット

		if (historyData && historyData.length > 0) {
			// 各問題の図形を描画
			historyData.forEach((item, index) => {
				const wrapper = document.createElement('div');
				wrapper.style.position = 'relative'; // ★ ボタンを右下に固定するため追加
				wrapper.style.display = 'flex';
				wrapper.style.flexDirection = 'column';
				wrapper.style.alignItems = 'center';
				wrapper.style.background = '#fff';
				wrapper.style.padding = '10px';
				wrapper.style.borderRadius = '8px';
				wrapper.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
				wrapper.style.width = '130px';

				// プレビュー用のCanvasを作成
				const canvas = document.createElement('canvas');
				canvas.width = 130;
				canvas.height = 130;
				canvas.style.border = '1px solid #ccc';
				canvas.style.marginBottom = '10px';
				canvas.style.backgroundColor = '#fff';

				const titleEl = document.createElement('div');
				titleEl.style.fontSize = '0.9em';
				titleEl.style.color = '#333';
				titleEl.textContent = `${item.state.symmetryGroup.replace('_h', '')}`;

				const scoreColor = item.score === 100 ? '#28a745' : item.score > 0 ? '#ff9800' : '#d9534f';
				const scoreEl = document.createElement('div');
				scoreEl.style.fontWeight = 'bold';
				scoreEl.style.color = scoreColor;
				scoreEl.textContent = `${item.score}点`;

				wrapper.appendChild(canvas);
				wrapper.appendChild(titleEl);
				wrapper.appendChild(scoreEl);

				// ▼▼▼ ここから追加: タイムアタックの場合のみ finalScore も表示 ▼▼▼
				if (mode === 'timeattack' && item.finalScore !== undefined) {
					const finalScoreEl = document.createElement('div');
					finalScoreEl.style.fontSize = '0.85em';
					finalScoreEl.style.color = '#555';
					finalScoreEl.style.marginTop = '2px';
					finalScoreEl.textContent = `${item.finalScore} pt`; // 括弧書きなどで表示
					wrapper.appendChild(finalScoreEl);
				}
				// ▲▲▲ ここまで追加 ▲▲▲

				// ▼▼▼ ここから追加: 保存用のカメラボタンを生成 ▼▼▼
				const saveResultBtn = document.createElement('button');
				saveResultBtn.innerHTML = '<i class="fa-solid fa-camera"></i>';
				saveResultBtn.style.position = 'absolute';
				saveResultBtn.style.bottom = '12px';
				saveResultBtn.style.right = '12px'; // カードの右下に配置
				saveResultBtn.style.background = 'transparent';
				saveResultBtn.style.border = 'none';
				saveResultBtn.style.fontSize = '1.2em';
				saveResultBtn.style.color = '#0c98ab';
				saveResultBtn.style.cursor = 'pointer';
				saveResultBtn.title = 'この作品をギャラリーに保存';

				// ▼ 修正: 描画用データ(state)と、得点・配置数などのデータ(item)を結合して渡す
				saveResultBtn.addEventListener('click', () => {
					// ギャラリー保存関数が期待する形にデータを整える
					const galleryData = {
						...item.state, // 図形の配置データや平面群の名前を展開
						score: item.score, // 履歴データから得点を付与
						// ★ 修正: gallery.js に合わせてプロパティ名を placementsCount に変更
						placementsCount:
							item.placementsCount !== undefined
								? item.placementsCount
								: item.state.placementsCount !== undefined
									? item.state.placementsCount
									: item.state.shapes
										? item.state.shapes.length
										: 0,
					};

					openSaveGalleryModal(galleryData, saveResultBtn);
				});

				// カードにボタンを追加
				wrapper.appendChild(saveResultBtn);
				// ▲▲▲ ここまで追加 ▲▲▲

				historyDisplay.appendChild(wrapper);

				// Canvasに図形を描画する
				if (window.renderPreview && item.state) {
					const ctx = canvas.getContext('2d');
					window.renderPreview(ctx, canvas.width, canvas.height, item.state);
				}
			});

			historyDisplay.style.display = 'flex';
		} else {
			historyDisplay.style.display = 'none';
		}
	}
	// ▲▲▲ 変更ここまで ▲▲▲
};
