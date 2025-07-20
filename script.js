const datetimeInput = document.getElementById("input");
const startBtn = document.getElementById("start");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const alarmSound = document.getElementById("alarmSound");

let countdownInterval;
let isRunning = false;

startBtn.addEventListener('click', () => {
  if(!isRunning){
      const selectDate = new Date(datetimeInput.value).getTime();
      console.log(selectDate);
      const now = new Date().getTime();

  if(isNaN(selectDate) || selectDate <= now){
    alert("Please select a valid future date and time .");
    return;
  }

  datetimeInput.disabled = true;
  startBtn.textContent = "Clear Timer";
  isRunning = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const difference = selectDate - currentTime;

    if(difference <= 0){
      clearInterval(countdownInterval);
      alarmSound.play();

    setTimeout(() => {
      alert("⏰Countdown Complete! ");
      alarmSound.pause();
      alarmSound.currentTime = 0;
      resetTimer();
    }, 500)
      return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference / (1000 * 60 * 60 )) % 24);
    const m = Math.floor((difference / (1000 * 60 )) % 60);
    const s = Math.floor((difference / 1000 ) % 60);

    days.textContent = d.toString().padStart(2, "0");
    hours.textContent = h.toString().padStart(2, "0");
    minutes.textContent = m.toString().padStart(2, "0");
    seconds.textContent = s.toString().padStart(2, "0");
   
  }, 1000);
}else{
  clearInterval(countdownInterval);
  resetTimer();
} 
})

function resetTimer(){
    isRunning = false;
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    startBtn.textContent = "Start timer";
    countdownInterval = null;
    datetimeInput.disabled = false;
}