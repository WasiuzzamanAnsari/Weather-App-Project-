//All Global variables
const apiKey = 'c3b8e12277b8d5f0e392aadcd911bf83';    //MY API KEY
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const defaultUnit = 'metric'; // Changes unit to celcius

//All Elements
const cityInput = document.getElementById('cityInput');
const searchCityBtn = document.getElementById('searchCityBtn');
const getLocationBtn = document.getElementById('getLocationBtn');
const recentCitiesSelect = document.getElementById('recentCities');
const weatherData = document.getElementById('weatherData');
const forecastData = document.getElementById('forecastData');
const errorMessage = document.getElementById('errorMessage');


//All Functions for handeling weather data

// Function to fetch weather of cities  
async function fetchWeather(city) {
    try {
        const response = await fetch(`${weatherApiUrl}?q=${city}&units=${defaultUnit}&appid=${apiKey}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
        saveRecentSearch(city);
    } catch (error) {
        errorMessage.classList.remove('hidden');
        weatherData.classList.add('hidden');
    }
}

// Function to fetch forecast of selected city
async function fetchForecast(city) {
    try {
        const response = await fetch(`${forecastApiUrl}?q=${city}&units=${defaultUnit}&appid=${apiKey}`);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

// Function to display fetched weather data
function displayWeather(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('weatherCondition').innerText = data.weather[0].description;
    document.getElementById('temp').innerText = parseInt(`${data.main.temp}°C`);
    document.getElementById('humidityValue').innerText = data.main.humidity;
    document.getElementById('windSpeedValue').innerText = data.wind.speed;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherData.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

// Function to display 5 days forecast of selected city
function displayForecast(data) {
    const forecastCards = document.getElementById('forecastCards');
    forecastCards.innerHTML = '';
    data.list.slice(0, 5).forEach(item => {
        const card = document.createElement('div');
        card.classList.add('bg-blue-100', 'p-4', 'rounded', 'text-center');
        card.innerHTML = `
            <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" class="w-12 mx-auto" alt="">
            <p>${item.main.temp}°C</p>
            <p>Wind: ${item.wind.speed} km/h</p>
            <p>Humidity: ${item.main.humidity}%</p>
        `;
        forecastCards.appendChild(card);
    });
    forecastData.classList.remove('hidden');
}

// Function to save recent searched city in local storage
function saveRecentSearch(city) {
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (!recentCities.includes(city)) {
        recentCities.push(city);
        if (recentCities.length > 5) recentCities.shift();     // Keep only 5 recent searches
        localStorage.setItem('recentCities', JSON.stringify(recentCities));
    }
    populateRecentCitiesDropdown();
}

// Function to show recent searched cities in the dropdown
function populateRecentCitiesDropdown() {
    const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    recentCitiesSelect.innerHTML = '<option value="" disabled selected>Select a city</option>';
    recentCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.innerText = city;
        recentCitiesSelect.appendChild(option);
    });
}

// Function to fetch weather of current Location
function fetchWeatherByCoordinates(lat, lon) {
    fetch(`${weatherApiUrl}?lat=${lat}&lon=${lon}&units=${defaultUnit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            saveRecentSearch(data.name);
            fetchForecast(data.name);
        })
        .catch(() => {
            errorMessage.classList.remove('hidden');
            weatherData.classList.add('hidden');
        });
}
//All Event Listeners
searchCityBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === "") {
        errorMessage.innerText = "Please enter a city name.";
        errorMessage.classList.remove('hidden');
        weatherData.classList.add('hidden');
    } else {
        fetchWeather(city);
        fetchForecast(city);
        errorMessage.classList.add('hidden');
    }
});


cityInput.addEventListener('input', () => {
    errorMessage.classList.add('hidden');
});

getLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        });
    } else {
        errorMessage.innerText = "Geolocation is not supported by this browser.";
        errorMessage.classList.remove('hidden');
    }
});

recentCitiesSelect.addEventListener('change', (e) => {
    const city = e.target.value;
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    }
});

// Calling the function of recent searched cities
populateRecentCitiesDropdown();