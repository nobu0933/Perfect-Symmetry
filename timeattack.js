// timeattack.js
let timeAttackInterval = null;
let remainingTime = 60; // 1分 (60秒)
let timelimit = 60;

// ★ スタート待機中かどうかを判定するフラグ
export let isTimeAttackWaiting = false;

// ==========================================
// UIのロック・アンロック関数
// ==========================================
export function lockGameUIForTimeAttack() {
	// ボタンの無効化
	const buttons = ['score-btn', 'flip-btn', 'rotate-btn', 'reset-btn', 'hint-action-btn'];
	buttons.forEach((id) => {
		const btn = document.getElementById(id);
		if (btn) btn.disabled = true;
	});

	// キャンバス操作の無効化
	const canvas = document.getElementById('gameCanvas');
	if (canvas) canvas.style.pointerEvents = 'none';

	// ★ 追加: 配置数ゲージと出題タイトルを非表示
	const gaugeContainer = document.getElementById('gauge-container');
	if (gaugeContainer) gaugeContainer.style.display = 'none';

	const groupNameDisplay = document.getElementById('group-name-display');
	if (groupNameDisplay) groupNameDisplay.style.display = 'none';

	// ★ 追加: UIロック時にキャンバスを白カバーで隠す
	const pauseOverlay = document.getElementById('pause-overlay');
	if (pauseOverlay) {
		pauseOverlay.style.display = 'block';
	}
}

export function unlockGameUIForTimeAttack() {
	// ボタンの有効化
	const buttons = ['score-btn', 'flip-btn', 'rotate-btn', 'reset-btn', 'hint-action-btn'];
	buttons.forEach((id) => {
		const btn = document.getElementById(id);
		if (btn) btn.disabled = false;
	});

	// キャンバス操作の有効化
	const canvas = document.getElementById('gameCanvas');
	if (canvas) canvas.style.pointerEvents = 'auto';

	// ★ 追加: 配置数ゲージと出題タイトルを再表示
	const gaugeContainer = document.getElementById('gauge-container');
	if (gaugeContainer) gaugeContainer.style.display = 'block';

	const groupNameDisplay = document.getElementById('group-name-display');
	if (groupNameDisplay) groupNameDisplay.style.display = 'block';

	// ★ 追加: UIロック解除時に白カバーを外す
	const pauseOverlay = document.getElementById('pause-overlay');
	if (pauseOverlay) {
		pauseOverlay.style.display = 'none';
	}
}

// ==========================================
// タイマー処理
// ==========================================
let timeUpCallback = null; // ★ 追加: タイムアップ時の処理を保存する変数

export function prepareTimeAttack() {
	clearInterval(timeAttackInterval);
	remainingTime = timelimit;
	updateTimerDisplay();

	isTimeAttackWaiting = true;
	lockGameUIForTimeAttack();

	const timerDisplay = document.getElementById('timer-display');
	if (timerDisplay) {
		timerDisplay.style.display = 'block';
	}
}

export function startTimeAttack(onTimeUpCallback) {
	isTimeAttackWaiting = false;
	unlockGameUIForTimeAttack();

	// ★ 変更: 再開時にも使えるようコールバック処理を保存しておく
	if (onTimeUpCallback) {
		timeUpCallback = onTimeUpCallback;
	}

	clearInterval(timeAttackInterval);
	timeAttackInterval = setInterval(() => {
		remainingTime--;
		updateTimerDisplay();

		if (remainingTime <= 0) {
			stopTimeAttack();
			// lockGameUIForTimeAttack();
			if (timeUpCallback) timeUpCallback();
		}
	}, 1000);
}

export function stopTimeAttack() {
	isTimeAttackWaiting = false;
	clearInterval(timeAttackInterval);
	const timerDisplay = document.getElementById('timer-display');
	if (timerDisplay) {
		timerDisplay.style.display = 'none';
	}
}

// ★ 追加: タイマーの一時停止とUIロック
export function pauseTimeAttack() {
	clearInterval(timeAttackInterval);
	lockGameUIForTimeAttack();
}

// ★ 追加: タイマーの再開とUIロック解除
export function resumeTimeAttack() {
	unlockGameUIForTimeAttack();
	clearInterval(timeAttackInterval);

	timeAttackInterval = setInterval(() => {
		remainingTime--;
		updateTimerDisplay();

		if (remainingTime <= 0) {
			stopTimeAttack();
			// lockGameUIForTimeAttack();
			if (timeUpCallback) timeUpCallback();
		}
	}, 1000);
}

function updateTimerDisplay() {
	const timerDisplay = document.getElementById('timer-display');
	if (timerDisplay) {
		timerDisplay.textContent = `残り時間: ${remainingTime}秒`;
		if (remainingTime <= 10) {
			timerDisplay.style.color = '#d9534f';
		} else {
			timerDisplay.style.color = '#333';
		}
	}
}
