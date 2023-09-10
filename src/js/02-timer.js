import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', startTimer);
startBtn.setAttribute('disabled', 'disabled');
let timerId = null;

const flatpickrr = new flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (selectedDates[0].getTime() < date.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', 'disabled');
    } else {
      updateTime();
      startBtn.removeAttribute('disabled');
    }
  },
});

function startTimer() {
  timerId = setInterval(() => {
    updateTime();
  }, 1000);
  startBtn.setAttribute('disabled', 'disabled');
}

const updateTime = () => {
  const date = new Date();
  const ms = flatpickrr.selectedDates[0].getTime() - date.getTime();
  if (ms < 0) {
    clearTimeout(timerId);
    startBtn.removeAttribute('disabled');
    return;
  }
  const stayTime = convertMs(ms);
  days.textContent = addLeadingZero(stayTime.days);
  hours.textContent = addLeadingZero(stayTime.hours);
  minutes.textContent = addLeadingZero(stayTime.minutes);
  seconds.textContent = addLeadingZero(stayTime.seconds);
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
