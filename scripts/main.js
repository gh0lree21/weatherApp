
// Grant Holley
// October 22, 2022


let results = null;

// Call Weather API
async function getWeather(url) {
    const response = await fetch(url);

    if (response.ok) {
        // Parse to json data
        const data = await response.json();

        // Display information to user
        output(data);
    }
}
function output(data) {

    // Debugging
    results = data;
    console.log("first: ", results);
    // End Debugging

    // Set up simple GUI in html.
    const weatherElement = document.getElementById("weather");
    let weatherNameElement = document.createElement("h3");
    weatherNameElement.innerHTML = data.name;

    // Create a list of weather details that is easily displayed as a list. 
    let theWeather = createWeatherDetsList(data);
    let weatherDetsList = document.createElement("ul");
    
    // Place weather details inside a list on the web page. 
    for (let i = 1; i < theWeather.length; i++) {
        let listItem = document.createElement('li');
        listItem.textContent = theWeather[i];
        weatherDetsList.append(listItem);
        weatherDetsList.style.listStyle = "none";

    }    
       
    weatherElement.appendChild(weatherNameElement);
    weatherElement.appendChild(weatherDetsList);
}


function createWeatherDetsList(data) {
    // Takes desired information from json weather data, formats it, and puts it in 
    // a list to make it easier to display. 

    let theWeather = [];
    theWeather[0] = data.name;
    theWeather[1] = "Looks like " + data.weather[0].description;
    theWeather[2] = "Temperature: " + Math.round(data.main.temp) + "°F";
    theWeather[3] = "Feels like: " + Math.round(data.main.feels_like) + "°F";
    theWeather[4] = "Wind speed: " + Math.round(data.wind.speed) + "mph";
    theWeather[5] = "Gusts: " + Math.round(data.wind.gust) + "mph";
    theWeather[6] = "Humidity: " + data.main.humidity + "%";

    console.log(theWeather); // Debugging
    return theWeather
    
}

async function buttonPressed() {
    // Function to implement when submit button is pressed. 

    // Takes user input from text boxes and create the API call. 
    let lat = await document.getElementById("latitude").value;
    let lon = await document.getElementById("longitude").value;

    try {
        let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=58b324bfb8977b8c04efa5d54e992761";
        getWeather(url);
    } catch {
        let error = document.createElement("h4");
        error.innerHTML = "Sorry, the coordinates you entered threw an error.";
        document.querySelector("body").appendChild(error);
    }


}


// Implements document structure and button listener. 
document.getElementById("heading").innerHTML = "Weather App";

document.getElementById("lat").innerHTML = "Latitude:";
document.getElementById("lon").innerHTML = "Longitude:";

const input = document.getElementById("input");
const btn = document.getElementById("submitBtn")
document.getElementById("submitBtn").innerHTML = "Submit";
btn.addEventListener('click', buttonPressed);
