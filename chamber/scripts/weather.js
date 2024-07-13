// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const weatherLocation = document.querySelector('#weather-location');
const forecastContainer = document.querySelector('#forecast-container');

// API URLs
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=38.4087&lon=-121.3716&units=imperial&appid=9c512e7079772f7423a56ff2ae60ed9f';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=38.4087&lon=-121.3716&units=imperial&appid=9c512e7079772f7423a56ff2ae60ed9f';

// Asynchronous function to fetch weather data from the API
async function apiFetch() {
    try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        if (currentWeatherResponse.ok) {
            const currentWeather = await currentWeatherResponse.json();
            displayCurrentWeather(currentWeather);
            // Logging for testing
            //console.log(currentWeatherData);    
        } else {
            throw Error(await currentWeatherResponse.text());
        }

        // Fetch forecast
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
            // Logging for testing
            //console.log(forecastData);  
        } else {
            throw Error(await forecastResponse.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to display the current weather results on the page
function displayCurrentWeather(current) {
    // Display rounded current temperature
    currentTemp.textContent = `${Math.round(current.main.temp)}`;

    // Display rounded "feels like" temperature
    document.getElementById('feels-like-temp').textContent = `${Math.round(current.main.feels_like)}`;

    // Construct URL for weather icon
    const iconsrc = `https://openweathermap.org/img/w/${current.weather[0].icon}.png`;

    // Get weather description
    let desc = current.weather[0].description;

    // Set source of weather icon
    weatherIcon.setAttribute('src', iconsrc);

    // Set alt text of weather icon
    weatherIcon.setAttribute('alt', desc);

    // Display weather description
    weatherDesc.textContent = capitalizeWords(desc);

    // Display location with country
    const country = current.sys.country || '';
    weatherLocation.textContent = `${current.name}, ${country}`;

    // Extract the sunrise timestamp from the current weather data
    const sunriseTimestamp = current.sys.sunrise;

    // Extract the sunset timestamp from the current weather data
    const sunsetTimestamp = current.sys.sunset;

    // Format the sunrise timestamp into a readable time string using the formatTime function
    const sunriseTime = formatTime(sunriseTimestamp);

    // Format the sunset timestamp into a readable time string using the formatTime function
    const sunsetTime = formatTime(sunsetTimestamp);

    // Set the text content of the element with the id 'sunrise-time' to the formatted sunrise time
    document.getElementById('sunrise-time').textContent = sunriseTime;

    // Set the text content of the element with the id 'sunset-time' to the formatted sunset time
    document.getElementById('sunset-time').textContent = sunsetTime;
}

// Function to display the forecast on the page
function displayForecast(forecast) {
    // Filter the forecast list to include only items at 12:00:00 (noon) and for 5 days
    const forecastData = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

    // Logging for testing
    //console.log(forecastData);

    // Map over the forecastData array to create HTML elements for each forecast item
    const forecastHTML = forecastData.map(item => {
        // Create a Date object from the dt_txt property of the forecast item
        const date = new Date(item.dt_txt);

        // Get the day of the week using the getDay() method and an array of day names
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];

        // Filter the forecast list to include only items with the same date as the current item
        // and map the filtered items to an array of temperature values
        const temps = forecast.list.filter(i => i.dt_txt.startsWith(item.dt_txt.split(' ')[0])).map(i => i.main.temp);

        // Find the highest temperature from the temps array using the spread operator and Math.max()
        const highTemp = Math.max(...temps);

        // Logging for testing
        //console.log(highTemp);

        // Find the lowest temperature from the temps array using the spread operator and Math.min()
        const lowTemp = Math.min(...temps);

        // Logging for testing
        //console.log(lowTemp);

        // Get the weather icon code from the forecast item
        let iconCode = item.weather[0].icon;

        // Force the daytime version for all icon codes
        iconCode = iconCode.replace('n', 'd');

        // Construct the URL for the weather icon
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

        // Return an HTML string for the forecast item, including the day of the week and the high/low temperatures
        return `
        <div class="forecast-item">
          <div class="forecast-day">${dayOfWeek}</div>
          <img class="forecast-icon" src="${iconUrl}" alt="Weather Icon">
          <div class="forecast-temp">
            <span class="high-temp">${Math.round(highTemp)}°F</span> / <span class="low-temp">${Math.round(lowTemp)}°F</span>
          </div>
        </div>
      `;
    }).join('');
    document.querySelector('.forecast-list').innerHTML = forecastHTML;
}

// Function to capitalize the first letter of each word
function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(l) {
        return l.toUpperCase()
    });
}

// Function to format Unix timestamp as hh:mm AM/PM
function formatTime(timestamp) {
    // Create a new Date object from the Unix timestamp (multiplied by 1000 to convert to milliseconds)
    const date = new Date(timestamp * 1000);

    // Get the hours component of the date
    let hours = date.getHours();

    // Get the minutes component of the date
    const minutes = date.getMinutes();

    // Determine if it's AM or PM based on the hours value
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;

    // Handle midnight (0 hours) by converting it to 12
    hours = hours ? hours : 12;

    // Create the formatted time string in the format "hh:mm AM/PM"
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    // Return the formatted time string
    return formattedTime;
}

// Call the apiFetch function to get and display weather data
apiFetch();