const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const resetBtn = document.getElementById('reset-btn');

const DURATION_24H = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

let endTime;

function initTimer() {
    const savedEndTime = localStorage.getItem('countdownEndTime');
    
    if (savedEndTime) {
        endTime = parseInt(savedEndTime, 10);
    } else {
        startNewTimer();
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

function startNewTimer() {
    endTime = Date.now() + DURATION_24H;
    localStorage.setItem('countdownEndTime', endTime);
}

function updateTimer() {
    const now = Date.now();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
        hoursEl.innerText = '00';
        minutesEl.innerText = '00';
        secondsEl.innerText = '00';
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

resetBtn.addEventListener('click', () => {
    localStorage.removeItem('countdownEndTime');
    startNewTimer();
    updateTimer();
    
    // Simple visual feedback for reset
    resetBtn.innerText = 'Resetted!';
    setTimeout(() => {
        resetBtn.innerText = 'Reset Timer';
    }, 1000);
});

initTimer();
