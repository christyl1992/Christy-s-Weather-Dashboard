const recentSearchesLimit = 5;
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];


function fetchWeather(city) {

  var APIKey = "1f3c2c140755fa984ae37713c1ff8a71";
  // city = localStorage.getItem('lastSearchedCity');
  // var city = "london";
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  function isNoon(entry) {
    return entry.dt_txt.endsWith(" 12:00:00");
  }

  // We then created an Fetch call
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // Create CODE HERE to Log the queryURL
      console.log(queryURL);
      console.log(data);
      const name = (data.name);
      const date = (data.dt);
      const temp = ((data.main.temp) - 273.15).toFixed(2);
      const humidity = (data.main.humidity);
      const wind = (data.wind.speed);
      const lon = (data.coord.lon);
      const lat = (data.coord.lat);

      // Transfer content to HTML
      document.getElementById('city-name').textContent = name + " (" + new Date(data.dt * 1000).toLocaleDateString() + ")";
      document.getElementById('current-temp').textContent = "Temp: " + temp + " °C";
      document.getElementById('current-wind').textContent = "Wind: " + wind + " meter/sec";
      document.getElementById('current-humidity').textContent = "Humidity: " + data.main.humidity + "%";

      //5 days
      var second_queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
      return fetch(second_queryURL);
    })
    .then(function (second_response) {
      return second_response.json();
    })
    .then(function (data) {
      console.log(data);
      // Extract entries with time at 12:00 PM
      const forecastContainer = document.getElementById('forecast');
      forecastContainer.innerHTML = ''; // Clear previous entries
      for (const key in data.list) {
        // console.log(key)
        const entry = data.list[key];

        if (isNoon(entry)) {

          const dateFive = (entry.dt);
          const temperatureFive = (entry.main.temp - 273.15).toFixed(2);;
          const humidityFive = (entry.main.humidity);
          const windFive = (entry.wind.speed);

          //Transfer content to html
          const forecastCard = document.createElement('div');
          forecastCard.setAttribute('class', 'card col-2');
          forecastCard.innerHTML = `
                <p class="text-gray-600">${new Date(dateFive * 1000).toLocaleDateString()}</p>
                <p class="text-gray-600">Temp: ${temperatureFive} °C</p>
                <p class="text-gray-600">Wind: ${windFive} meter/sec</p>
                <p class="text-gray-600">Humidity: ${humidityFive}%</p>`;
          forecastContainer.appendChild(forecastCard);
        }
      }
    })
}

function displayRecentSearches() {
  const recentSearchesContainer = document.getElementById('history');
  recentSearchesContainer.innerHTML = recentSearches
    .map(city => `<button class="city-btn" data-value=${city}>${city}</button>`)
    .join('');
}

function updateRecentSearches(city) {
  if (!recentSearches.includes(city)) {
    if (recentSearches.length >= recentSearchesLimit) {
      recentSearches.pop(); // Remove the oldest search
    }
    recentSearches.unshift(city); // Add new city to the front
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displayRecentSearches();
  }
}

function saveToLocalStorage(city) {
  localStorage.setItem('lastSearchedCity', city);
  updateRecentSearches(city);
}

document.addEventListener('DOMContentLoaded', () => {
  displayRecentSearches();
});

// Event listeners for search
document.getElementById('search-button').addEventListener('click', () => {
  const cityInput = document.getElementById('search-input').value;
  saveToLocalStorage(cityInput);
  updateRecentSearches(cityInput);
  fetchWeather(cityInput);
});


