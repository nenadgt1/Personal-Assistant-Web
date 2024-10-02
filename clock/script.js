// Switch Between Clock, Stopwatch, Timer, and Exact Time
const clockSection = document.getElementById('clock-section');
const stopwatchSection = document.getElementById('stopwatch-section');
const timerSection = document.getElementById('timer-section');
const exactTimeSection = document.getElementById('exact-time-section');

document.getElementById('show-clock').addEventListener('click', () => {
    switchSection('clock');
});
document.getElementById('show-stopwatch').addEventListener('click', () => {
    switchSection('stopwatch');
});
document.getElementById('show-timer').addEventListener('click', () => {
    switchSection('timer');
});
document.getElementById('show-exact-time').addEventListener('click', () => {
    switchSection('exact-time');
});

function switchSection(section) {
    clockSection.style.display = section === 'clock' ? 'block' : 'none';
    stopwatchSection.style.display = section === 'stopwatch' ? 'block' : 'none';
    timerSection.style.display = section === 'timer' ? 'block' : 'none';
    exactTimeSection.style.display = section === 'exact-time' ? 'block' : 'none';
}

// CLOCK
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock-display').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);

// STOPWATCH
let stopwatchInterval;
let stopwatchStartTime;
let elapsedTime = 0;

document.getElementById('start-stopwatch').addEventListener('click', () => {
    if (!stopwatchInterval) {
        stopwatchStartTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10);
    }
});

document.getElementById('stop-stopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedTime = 0;
    document.getElementById('stopwatch-display').textContent = '00:00:00.000';
});

function updateStopwatch() {
    elapsedTime = Date.now() - stopwatchStartTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const milliseconds = String(elapsedTime % 1000).padStart(3, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const minutes = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    document.getElementById('stopwatch-display').textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// TIMER
let timerInterval;
let remainingTime;

document.getElementById('start-timer').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('timer-minutes').value, 10) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value, 10) || 0;
    remainingTime = (minutes * 60 + seconds) * 1000;
    if (remainingTime > 0) {
        timerInterval = setInterval(updateTimer, 1000);
    }
});

document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    remainingTime = 0;
    document.getElementById('timer-display').textContent = '00:00';
});

function updateTimer() {
    remainingTime -= 1000;
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timer-display').textContent = '00:00';
        alert('Timer finished!');
    } else {
        const totalSeconds = Math.floor(remainingTime / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        document.getElementById('timer-display').textContent = `${minutes}:${seconds}`;
    }
}

// EXACT TIME TO MILLISECONDS
function updateExactTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    document.getElementById('exact-time-display').textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
setInterval(updateExactTime, 1);
