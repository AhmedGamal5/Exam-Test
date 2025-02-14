export function startTimer(duration, onTimeout) {
  let countdownTime = duration;
  const countdownElement = document.getElementById("countdown");

  const interval = setInterval(() => {
    if (countdownTime > 0) {
      countdownTime--;
      countdownElement.textContent = formatTime(countdownTime);
    } else {
      clearInterval(interval);
      onTimeout();
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
