// C1 - DATE
let today = new Date();
let day = today.getDate();
let month = today.getMonth();

today = `${day} / ${month} / ${today.getFullYear()}`;
document.getElementById("date").innerHTML = today;

function time() {
    let today = new Date();
    document.getElementById('time').innerHTML = today.toLocaleTimeString('en-US');
}

var myVar = setInterval(function () {
    time();
}, 1000);

// WEATHER PLANNER
async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '0230a7586be87e3e898ae448bd67fc37'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let weatherRespond = await fetch(url);
        if (!weatherRespond.ok) { //if weather respond isnt okay, throw error city not found
            throw new Error('City not found');
        }
        const weatherData = await weatherRespond.json(); //else await the weatherdata to be uploaded into weatherRespond URL
        displayWeather(weatherData);
    } catch (error) { //if any errors, display the error where the weather data will be 
        document.getElementById('weather').innerText = error.message;
    }
}


function displayWeather(data) {
    let weatherContain = document.getElementById('weatherContain')

    document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;

    const weatherCondition = data.weather[0].main.toLowerCase(); // Get weather condition and convert to lowercase for easier comparison

    if (weatherCondition === "rain") {
        document.getElementById("weatherIcon").innerHTML = '<i class="fas fa-cloud-rain"></i>';
        // weatherContain.style.backgroundColor = "red";
    } else if (weatherCondition === "clear") {
        document.getElementById("weatherIcon").innerHTML = '<i class="fas fa-sun"></i>';
        // weatherContain.style.backgroundColor = "red";
    } else if (weatherCondition === "clouds") {
        document.getElementById("weatherIcon").innerHTML = '<i class="fas fa-cloud"></i>';
        // weatherContain.style.backgroundColor = "red";
    }

    const localTime = new Date((data.dt + data.timezone) * 1000);
    const formattedTime = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    const formattedDate = localTime.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    
    document.getElementById('time').innerText = `${formattedTime}, ${formattedDate}`;
}