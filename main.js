const apiKey = 'bf4789431e56472c98c183207232506'; // Replace with your WeatherAPI API key

// Function to fetch weather data for a specific city
function fetchWeatherData(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      console.log(data);

      // Update weather data on the page
      const temp = document.querySelector('.temp');
      const conditionOutput = document.querySelector('.condition');
      const dateOutput = document.querySelector('.date');
      const timeOutput = document.querySelector('.time');
      const nameOutput = document.querySelector('.name');
      const icon = document.querySelector('.icon');
      const cloudOutput = document.querySelector('.cloud');
      const humidityOutput = document.querySelector('.humidity');
      const windOutput = document.querySelector('.wind');
      const app = document.querySelector('.weather-app');

      // Round off temperature value
      temp.innerHTML = `${data.current.temp_c}&#176;C`;
      conditionOutput.innerHTML = data.current.condition.text;

      const date = new Date(data.location.localtime);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const time = data.location.localtime.substr(11);

      dateOutput.innerHTML = `${dayOfWeek(
        day,
        month,
        year
      )} ${day}, ${month} ${year}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.location.name;
      const iconId = data.current.condition.icon.substr(
        '//cdn.weatherapi.com/weather/64x64'.length
      );
      icon.src = `./icons${iconId}`;

      temp.textContent = `${data.current.temp_c}°C`;
      cloudOutput.innerHTML = `${data.current.cloud}%`;
      humidityOutput.innerHTML = `${data.current.humidity}%`;
      windOutput.innerHTML = `${data.current.wind_kph} km/h`;

      let timeOfDay = 'day';

      if (!data.current.is_day) {
        timeOfDay = 'night';
      }

      const code = data.current.condition.code;

      if (code === 1000) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
      } else if (
        code === 1003 ||
        code === 1006 ||
        code === 1009 ||
        code === 1030 ||
        code === 1069 ||
        code === 1087 ||
        code === 1135 ||
        code === 1273 ||
        code === 1276 ||
        code === 1279 ||
        code === 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
      } else if (
        code === 1063 ||
        code === 1069 ||
        code === 1072 ||
        code === 1050 ||
        code === 1053 ||
        code === 1080 ||
        code === 1083 ||
        code === 1086 ||
        code === 1089 ||
        code === 1092 ||
        code === 1095 ||
        code === 1204 ||
        code === 1207 ||
        code === 1240 ||
        code === 1243 ||
        code === 1246 ||
        code === 1249 ||
        code === 1252
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
      }

      app.style.opacity = '1';
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        alert('City not found, please try again');
      } else {
        console.error('An error occurred:', error);
      }
      app.style.opacity = '1';
    });
}

// Function to get the day of the week
function dayOfWeek(day, month, year) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();
  return `${days[dayOfWeek]} ${months[month - 1]} ${year}`;
}

// Event listener for the location search form
const locationForm = document.getElementById('locationInput');
locationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchInput = document.querySelector('.search');
  const city = searchInput.value.trim();
  if (city !== '') {
    fetchWeatherData(city);
    searchInput.value = '';
  }
});

// Event listeners for the city buttons
const cityButtons = document.querySelectorAll('.city');
cityButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCity = button.textContent;
    fetchWeatherData(selectedCity);
  });
});
