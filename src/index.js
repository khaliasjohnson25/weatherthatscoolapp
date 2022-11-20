function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

navigator.geolocation.getCurrentPosition(handlePosition)

function displayForecast(response){
   console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index)  {
  if(index< 6){
  forecastHTML =  forecastHTML +
  `
            <div class="col-2">
               <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png" id="icon-scattered-clouds-day" alt="" width="36"/>
              <div class="weather-forecast-temperature"></div>  
               <span class="weather-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
              <span class="weather-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
  
  `;
  forecastHTML = forecastHTML +`</div>`;
  forecastElement.innnerHTML = forecastHTML;
  getForecast(response.data.coordinates);
}
}}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let currentDescription = document.querySelector("#current-description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.name;
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    response.data.condition.icon_url
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "a34tf68cfb143a32002a6d05a5caocaf";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=38.8951&lon=-77.0364&key=a34tf68cfb143a32002a6d05a5caocaf&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

displayForecast(response);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Washington");

