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
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
    ' <div class="col-2">
      <div class="forecast-date">${formatDay(forecastDay.time * 1000)}</div>  
          src="${forecastDay.condition.icon_url}"
          alt=""
          width="42" /><div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temperature.maximum
            )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temperature.minimum
            )}°</span>
          </div>
    </div>`;  
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(response.data);
}


function getForecast(coordinates) {
  let apiKey = "a34tf68cfb143a32002a6d05a5caocaf";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=-77.0365427&lat=38.8950368&key=a34tf68cfb143a32002a6d05a5caocaf&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  cityElement.innerHTML = response.data.city;
  currentDescription.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data. time * 1000);
  iconElement.setAttribute(
    "src",
    response.data.condition.icon_url
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "a34tf68cfb143a32002a6d05a5caocaf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=washington&key=a34tf68cfb143a32002a6d05a5caocaf&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York","Washington","Los Angeles")

