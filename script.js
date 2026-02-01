const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Target Time: Feb 2, 2026, 12:30 PM IST
// IST is UTC+5:30. So 12:30 IST is 07:00 UTC.
const TARGET_DATE = new Date('2026-02-02T07:00:00Z').getTime();

function initTimer() {
    updateTimer();
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = Date.now();
    const timeLeft = TARGET_DATE - now;

    if (timeLeft <= 0) {
        hoursEl.innerText = '00';
        minutesEl.innerText = '00';
        secondsEl.innerText = '00';
        document.title = "Countdown Finished";
        return;
    }

    const h = Math.floor(timeLeft / (1000 * 60 * 60));
    const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((timeLeft % (1000 * 60)) / 1000);

    hoursEl.innerText = h.toString().padStart(2, '0');
    minutesEl.innerText = m.toString().padStart(2, '0');
    secondsEl.innerText = s.toString().padStart(2, '0');

    // Update tab title for dynamic effect
    document.title = `${hoursEl.innerText}:${minutesEl.innerText}:${secondsEl.innerText} - Countdown`;
}

initTimer();
