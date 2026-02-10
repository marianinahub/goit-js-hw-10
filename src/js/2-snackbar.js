import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delay = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayNumber = Number(delay.value);

  const radioButton = document.querySelector('input[name="state"]:checked');
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioButton.value === 'fulfilled') {
        resolve(delayNumber);
      } else {
        reject(delayNumber);
      }
    }, delayNumber);
  })
    .then(value =>
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
      })
    )
    .catch(error =>
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
      })
    );
});