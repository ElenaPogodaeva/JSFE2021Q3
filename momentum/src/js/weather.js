export default function showWeather() {
  const weatherIcon = document.querySelector(".weather-icon");
  const temperature = document.querySelector(".temperature");
  const weatherDescription = document.querySelector(".weather-description");
  const wind = document.querySelector(".wind");
  const humidity = document.querySelector(".humidity");

  const city = document.querySelector(".city");
  const error = document.querySelector(".weather-error");

  city.value = "Минск";
  city.textContent = "Минск";
  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=19b49def7b99621ed575529c92f7ba37&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    //  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

    if (data.cod === "404") {
      error.textContent = "Error! City not found";
      clearWeather();
    } else if (data.cod === "400") {
      error.textContent = "Error! Enter the city";
      clearWeather();
    } else {
      error.textContent = "";
      weatherIcon.className = "weather-icon owf";
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Wind speed ${data.wind.speed.toFixed(0)} m/s`;
      humidity.textContent = `Humidity ${data.main.humidity.toFixed(0)}%`;
    }
  }
  function clearWeather() {
    weatherIcon.className = "";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  }

  function setCity() {
    // city.value = 'Минск';
    //city.textContent = 'Минск';
    getWeather();
  }
  //error.textContent = 'Error';
  console.log(error);
  //document.addEventListener("DOMContentLoaded", getWeather);
  city.addEventListener("change", setCity);

  function setLocalStorage() {
    localStorage.setItem("city", city.value);
    localStorage.setItem("temperature", temperature.textContent);
    localStorage.setItem("weatherDescription", weatherDescription.textContent);
    localStorage.setItem("wind", wind.textContent);
    localStorage.setItem("humidity", humidity.textContent);
  }

  window.addEventListener("beforeunload", setLocalStorage);

  function getLocalStorage() {
    if (localStorage.getItem("city")) {
      city.value = localStorage.getItem("city");
    }
    if (localStorage.getItem("temperature")) {
      temperature.textContent = localStorage.getItem("temperature");
    }
    if (localStorage.getItem("weatherDescription")) {
      weatherDescription.textContent =
        localStorage.getItem("weatherDescription");
    }
    if (localStorage.getItem("wind")) {
      wind.textContent = localStorage.getItem("wind");
    }
    if (localStorage.getItem("humidity")) {
      humidity.textContent = localStorage.getItem("humidity");
    }
  }

  window.addEventListener("DOMContentLoaded", getLocalStorage);
}
