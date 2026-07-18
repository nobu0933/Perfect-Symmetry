// gallery.js

// main.js から渡された renderPreview をギャラリー描画時にも使い回すための変数
let storedRenderPreview = null;
let itemToDeleteIndex = null; // ★追加: 削除対象のインデックスを保持する変数

export function initGallery(getAppState, renderPreview) {
	storedRenderPreview = renderPreview; // 関数を保持しておく

	// ==========================================
	// --- 保存モーダルの設定 ---
	// ==========================================
	const saveBtn = document.getElementById('saveGalleryBtn');
	const saveModal = document.getElementById('save-gallery-modal');
	const closeSaveBtn = document.getElementById('close-save-gallery-btn');
	const confirmSaveBtn = document.getElementById('confirm-save-gallery-btn');
	const cancelSaveBtn = document.getElementById('cancel-save-gallery-btn');

	const savePreviewCanvas = document.getElementById('gallery-preview-canvas');
	const savePreviewInfo = document.getElementById('gallery-preview-info');

	let currentState = null;

	if (saveBtn) {
		saveBtn.addEventListener('click', () => {
			// ★追加: すでに保存済み（チェックマーク状態）なら、ここで処理を止めて何も起こらないようにする
			if (saveBtn.dataset.saved === 'true') return;

			if (saveModal) {
				if (typeof getAppState === 'function') {
					currentState = getAppState();
				}

				if (savePreviewCanvas && typeof renderPreview === 'function' && currentState) {
					const previewCtx = savePreviewCanvas.getContext('2d');
					previewCtx.clearRect(0, 0, savePreviewCanvas.width, savePreviewCanvas.height);
					renderPreview(
						previewCtx,
						savePreviewCanvas.width,
						savePreviewCanvas.height,
						currentState,
					);
				}

				if (savePreviewInfo && currentState) {
					savePreviewInfo.innerHTML = `
						<strong>【作品の情報】</strong><br>
						平面群： ${currentState.symmetryGroup}<br>
						図形の形： ${currentState.shapeType} （サイズ: ${Math.round(currentState.shapeSize)}）<br>
						配置数： ${currentState.placementsCount}個<br>
						得点： ${currentState.score}点
					`;
				}
				saveModal.style.display = 'flex';
			}
		});
	}

	function closeSaveModal() {
		if (saveModal) saveModal.style.display = 'none';
	}

	if (closeSaveBtn) closeSaveBtn.addEventListener('click', closeSaveModal);
	if (cancelSaveBtn) cancelSaveBtn.addEventListener('click', closeSaveModal);

	if (confirmSaveBtn) {
		confirmSaveBtn.addEventListener('click', () => {
			if (currentState) {
				// --- 1. データの保存処理 ---
				currentState.date = new Date().toLocaleString();
				let galleryData = JSON.parse(localStorage.getItem('symmetry_gallery') || '[]');
				galleryData.unshift(currentState);

				if (galleryData.length > 100) {
					galleryData.pop();
				}

				localStorage.setItem('symmetry_gallery', JSON.stringify(galleryData));

				// --- 2. ボタンのサイズ固定と状態の記憶 ---
				// ボタンの現在のサイズを取得
				const rect = confirmSaveBtn.getBoundingClientRect();
				const originalWidth = confirmSaveBtn.style.width;
				const originalHeight = confirmSaveBtn.style.height;

				// 元のHTMLやスタイルを記憶
				const originalHTML = confirmSaveBtn.innerHTML;
				const originalBg = confirmSaveBtn.style.backgroundColor;
				const originalBorder = confirmSaveBtn.style.borderColor;
				const originalColor = confirmSaveBtn.style.color;
				const originalPointerEvents = confirmSaveBtn.style.pointerEvents;

				// サイズをピクセル単位で固定して、縮むのを防ぐ
				confirmSaveBtn.style.width = `${rect.width}px`;
				confirmSaveBtn.style.height = `${rect.height}px`;

				// --- 3. 緑色のチェックマークに変化させる ---
				confirmSaveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

				// !important を使って強制的に緑色にする
				confirmSaveBtn.style.setProperty('background-color', '#28a745', 'important');
				confirmSaveBtn.style.setProperty('border-color', '#28a745', 'important');
				confirmSaveBtn.style.color = '#fff'; // チェックマークのアイコンは白色に

				// disabled は使わず、ポインターイベント（クリック反応）を無効化して連打を防ぐ
				confirmSaveBtn.style.pointerEvents = 'none';

				// --- 4. 1秒後（1000ミリ秒後）にポップアップを閉じる ---
				setTimeout(() => {
					// モーダルを閉じる
					closeSaveModal();

					// メイン画面の保存ボタンをチェックマークにする
					if (saveBtn) {
						saveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
						saveBtn.title = '保存済み';
						// saveBtn.style.cursor = 'default';
						saveBtn.style.color = '#28a745';

						saveBtn.dataset.saved = 'true';

						// saveBtn.blur();
						// saveBtn.style.outline = 'none';
						// saveBtn.style.boxShadow = 'none';
						// saveBtn.style.border = 'none';
						// saveBtn.style.background = 'transparent';
					}

					// --- ポップアップ内のボタンを元の状態に戻しておく（次回開いたとき用） ---
					confirmSaveBtn.innerHTML = originalHTML;

					// setProperty で付けた important を解除して元のスタイルに戻す
					confirmSaveBtn.style.removeProperty('background-color');
					confirmSaveBtn.style.removeProperty('border-color');
					if (originalBg) confirmSaveBtn.style.backgroundColor = originalBg;
					if (originalBorder) confirmSaveBtn.style.borderColor = originalBorder;

					confirmSaveBtn.style.color = originalColor;
					confirmSaveBtn.style.pointerEvents = originalPointerEvents;
					confirmSaveBtn.style.width = originalWidth;
					confirmSaveBtn.style.height = originalHeight;
				}, 600); // 600ミリ秒 = 1秒
			}
		});
	}

	// ==========================================
	// --- ★追加: 削除モーダルの設定 ---
	// ==========================================
	const deleteModal = document.getElementById('delete-gallery-modal');
	const closeDeleteBtn = document.getElementById('close-delete-gallery-btn');
	const confirmDeleteBtn = document.getElementById('confirm-delete-gallery-btn');
	const cancelDeleteBtn = document.getElementById('cancel-delete-gallery-btn');

	function closeDeleteModal() {
		if (deleteModal) deleteModal.style.display = 'none';
		itemToDeleteIndex = null; // 閉じるときにリセット
	}

	if (closeDeleteBtn) closeDeleteBtn.addEventListener('click', closeDeleteModal);
	if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', closeDeleteModal);

	if (confirmDeleteBtn) {
		confirmDeleteBtn.addEventListener('click', () => {
			if (itemToDeleteIndex !== null) {
				let currentGallery = JSON.parse(localStorage.getItem('symmetry_gallery') || '[]');
				// 該当データを削除
				currentGallery.splice(itemToDeleteIndex, 1);
				localStorage.setItem('symmetry_gallery', JSON.stringify(currentGallery));

				closeDeleteModal();
				loadAndDisplayGallery(); // 削除後に一覧を再描画
			}
		});
	}
	// ==========================================
	// --- ★追加: ギャラリー拡大表示モーダルの設定 ---
	// ==========================================
	const viewGalleryModal = document.getElementById('view-gallery-modal');
	const closeViewGalleryBtn = document.getElementById('close-view-gallery-btn');

	// モーダルを閉じる処理を共通化
	const closeViewModal = () => {
		if (viewGalleryModal) viewGalleryModal.style.display = 'none';
	};

	// ×ボタンをクリックしたときに閉じる
	if (closeViewGalleryBtn) {
		closeViewGalleryBtn.addEventListener('click', closeViewModal);
	}

	// ★追加: 画面の余白（キャンバス以外）をクリックしたときにも閉じる
	if (viewGalleryModal) {
		viewGalleryModal.addEventListener('click', (e) => {
			// クリックした要素のIDが「view-gallery-canvas」でなければ閉じる
			if (e.target.id !== 'view-gallery-canvas') {
				closeViewModal();
			}
		});
	}
}

// ==========================================
// ★追加: 保存ボタンを初期状態（カメラアイコン）にリセットする関数
// ==========================================
export function resetSaveButton() {
	const saveBtn = document.getElementById('saveGalleryBtn');
	if (saveBtn) {
		// 保存済みフラグを解除
		saveBtn.dataset.saved = 'false';

		// アイコンをカメラに戻す（※もしボタンにテキストも含まれていた場合は適宜書き換えてください）
		saveBtn.innerHTML = '<i class="fa-solid fa-camera"></i>';
		saveBtn.style.color = '#0c98ab';

		// ツールチップ（保存済み）を解除
		saveBtn.removeAttribute('title');

		// Javascriptで直接上書きしたスタイルをクリアし、CSSの本来のデザインに戻す
		// saveBtn.style.cursor = '';
		// saveBtn.style.color = '';
		// saveBtn.style.outline = '';
		// saveBtn.style.boxShadow = '';
		// saveBtn.style.border = '';
		// saveBtn.style.background = '';
	}
}

// ==========================================
// ★ ギャラリー画面を開いたときに一覧を描画する関数
// ==========================================
export function loadAndDisplayGallery() {
	const container = document.getElementById('gallery-container');
	const countDisplay = document.getElementById('gallery-count-display');
	if (!container) return;

	let galleryData = JSON.parse(localStorage.getItem('symmetry_gallery') || '[]');

	// 上部のカウント表示を更新
	if (countDisplay) {
		countDisplay.textContent = `保存数：${galleryData.length}/100`;
	}

	if (galleryData.length === 0) {
		container.innerHTML =
			'<p style="text-align: center; color: #666;">まだ保存された作品はありません。</p>';
		return;
	}

	container.innerHTML = '';

	const gridWrapper = document.createElement('div');
	gridWrapper.style.display = 'flex';
	gridWrapper.style.flexWrap = 'wrap';
	gridWrapper.style.gap = '20px';
	gridWrapper.style.justifyContent = 'flex-start';

	galleryData.forEach((item, index) => {
		const card = document.createElement('div');
		card.style.position = 'relative';
		card.style.border = '1px solid #ccc';
		card.style.borderRadius = '8px';
		card.style.padding = '12px';
		card.style.background = '#fff';
		card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
		card.style.width = '240px';

		const canvas = document.createElement('canvas');
		canvas.width = 216;
		canvas.height = 216;
		canvas.style.background = '#fafafa';
		canvas.style.display = 'block';
		canvas.style.margin = '0 auto 10px auto';
		canvas.style.cursor = 'pointer'; // ★追加: クリックできることをマウスカーソルで示す

		// ★追加: キャンバス（格子エリア）をクリックしたとき、拡大表示モーダルを開く
		canvas.addEventListener('click', () => {
			const viewModal = document.getElementById('view-gallery-modal');
			const viewCanvas = document.getElementById('view-gallery-canvas');
			if (viewModal && viewCanvas && storedRenderPreview) {
				const ctx = viewCanvas.getContext('2d');
				ctx.clearRect(0, 0, viewCanvas.width, viewCanvas.height);
				// 大きいキャンバス (600x600) に再描画
				storedRenderPreview(ctx, viewCanvas.width, viewCanvas.height, item);
				viewModal.style.display = 'flex';
			}
		});

		const info = document.createElement('div');
		info.style.fontSize = '0.85em';
		info.style.lineHeight = '1.5';
		info.innerHTML = `
			<div style="color: #888; font-size: 0.8em; margin-bottom: 5px;">${item.date}</div>
			平面群 : ${item.symmetryGroup}<br>
			得点 : ${item.score}点
		`;

		const deleteBtn = document.createElement('button');
		deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
		deleteBtn.style.position = 'absolute';
		deleteBtn.style.bottom = '12px';
		deleteBtn.style.right = '12px';
		deleteBtn.style.background = 'transparent';
		deleteBtn.style.border = 'none';
		deleteBtn.style.fontSize = '1.2em';
		deleteBtn.style.color = '#666';
		deleteBtn.style.cursor = 'pointer';
		deleteBtn.style.opacity = '0.6';
		deleteBtn.title = 'この作品を削除する';

		deleteBtn.addEventListener('mouseenter', () => {
			deleteBtn.style.opacity = '1';
			deleteBtn.style.color = '#d32f2f';
		});
		deleteBtn.addEventListener('mouseleave', () => {
			deleteBtn.style.opacity = '0.6';
			deleteBtn.style.color = '#666';
		});

		deleteBtn.addEventListener('click', () => {
			const confirmToggle = document.getElementById('confirm-delete-toggle');
			const requiresConfirm = confirmToggle ? confirmToggle.checked : true;

			if (!requiresConfirm) {
				// ★トグルがオフ（確認不要）の場合は即座に削除
				let currentGallery = JSON.parse(localStorage.getItem('symmetry_gallery') || '[]');
				currentGallery.splice(index, 1);
				localStorage.setItem('symmetry_gallery', JSON.stringify(currentGallery));
				loadAndDisplayGallery();
			} else {
				// ★トグルがオンの場合は、削除用モーダルを立ち上げる
				itemToDeleteIndex = index; // どのインデックスを削除するか記憶

				const modal = document.getElementById('delete-gallery-modal');
				const previewCanvas = document.getElementById('delete-gallery-preview-canvas');
				const previewInfo = document.getElementById('delete-gallery-preview-info');

				// モーダル内のキャンバスに選択した作品を描画
				if (previewCanvas && storedRenderPreview) {
					const ctx = previewCanvas.getContext('2d');
					ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
					storedRenderPreview(ctx, previewCanvas.width, previewCanvas.height, item);
				}

				// モーダル内のテキストに選択した作品の情報を表示
				if (previewInfo) {
					previewInfo.innerHTML = `
						<strong>【作品の情報】</strong><br>
						保存日時： ${item.date}<br>
						平面群： ${item.symmetryGroup}<br>
						得点： ${item.score}点
					`;
				}

				if (modal) {
					modal.style.display = 'flex';
				}
			}
		});

		card.appendChild(canvas);
		card.appendChild(info);
		card.appendChild(deleteBtn);
		gridWrapper.appendChild(card);

		if (storedRenderPreview) {
			const ctx = canvas.getContext('2d');
			storedRenderPreview(ctx, canvas.width, canvas.height, item);
		}
	});

	container.appendChild(gridWrapper);
}
