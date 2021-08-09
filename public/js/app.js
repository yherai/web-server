console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form');
const locationInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const locationValue = locationInput.value;

  fetch(`http://localhost:3000/weather?address=${locationValue}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = '';
          return;
        }

        const { location, weather, temperature, feelslike } = data;

        messageOne.textContent = location;
        messageTwo.textContent = `Weather: ${weather}. Temperature: ${temperature}. Feels like: ${feelslike}`;
      });
    }
  );
});
