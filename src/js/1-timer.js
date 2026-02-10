import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let dateTimeP = document.querySelector('#datetime-picker');
let button = document.querySelector('[data-start]');
let days = document.querySelector('[data-days]');
let hours = document.querySelector('[data-hours]');
let minutes = document.querySelector('[data-minutes]');
let seconds = document.querySelector('[data-seconds]');

button.disabled = true;

let userSelectedDate = null;
let timeStop = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDate = selectedDates[0];
    let dateNow = new Date();

    if (selectedDate <= dateNow) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      button.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      button.disabled = false;
    }

    console.log(selectedDates[0]);
  },
};

button.addEventListener('click', () => {
  if (userSelectedDate === null) {
    return;
  } else {
    if (timeStop !== null) {
      clearInterval(timeStop);

      timeStop = null;
    }

    timeStop = setInterval(function () {
      let howMuchTime = userSelectedDate - new Date();
      if (howMuchTime <= 0) {
        clearInterval(timeStop);
        showTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        dateTimeP.disabled = false;
        timeStop = null;
        return;
      }

      const timeOne = convertMs(howMuchTime);
      showTimer(timeOne);
    }, 1000);
  }
  button.disabled = true;
  dateTimeP.disabled = true;
});

function convertMs(howMuchTime) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(howMuchTime / day);

  const hours = Math.floor((howMuchTime % day) / hour);

  const minutes = Math.floor(((howMuchTime % day) % hour) / minute);

  const seconds = Math.floor((((howMuchTime % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showTimer(timeTwo) {
  days.textContent = addLeadingZero(timeTwo.days);
  hours.textContent = addLeadingZero(timeTwo.hours);
  minutes.textContent = addLeadingZero(timeTwo.minutes);
  seconds.textContent = addLeadingZero(timeTwo.seconds);
  return;
}

function addLeadingZero(value) {
  let string = value.toString();
  return string.padStart(2, '0');
}

flatpickr('#datetime-picker', options);