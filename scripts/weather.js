// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');

// API URL
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=38.41&lon=-121.46&units=imperial&appid=9c512e7079772f7423a56ff2ae60ed9f';

// Asynchronous function to fetch weather data from the API
async function apiFetch() {
    try {
        // Fetch data from the API
        const response = await fetch(url);
        // Check if the response is successful
        if (response.ok) {
            // Parse the JSON response
            const data = await response.json();
            // Log data for testing
            //console.log(data); 
            // Call function to display the weather data
            displayResults(data);
        } else {
            // Log any errors that occur during the fetch
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to display the weather results on the page
function displayResults(data) {
    // Display rounded current temperature
    currentTemp.textContent = `${Math.round(data.main.temp)}`;
    // Display rounded "feels like" temperature
    document.getElementById('feels-like-temp').textContent = `${Math.round(data.main.feels_like)}`;
    // Construct URL for weather icon
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    // Get weather description
    let desc = data.weather[0].description;
    // Set source of weather icon
    weatherIcon.setAttribute('src', iconsrc);
    // Set alt text of weather icon
    weatherIcon.setAttribute('alt', desc);
    // Display weather description
    weatherDesc.textContent = capitalizeWords(desc);
}

// Function to capitalize the first letter of each word
function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(l) {
        return l.toUpperCase()
    });
}

// Call the apiFetch function to get and display weather data
apiFetch();