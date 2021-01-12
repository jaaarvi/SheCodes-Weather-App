//Current time for current location
let date = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let today = days[date.getDay()];
let hour = date.getHours();

let minute = date.getMinutes();
let currentTime = document.querySelector("#current-time")

if (minute < 10) {
  currentTime.innerHTML = `${today} ${hour}:0${minute}`
} else {
  currentTime.innerHTML = `${today} ${hour}:${minute}`
}


//Show current weather 
function displayWeather(response) {
  console.log(response);
}

function currentWeather(val) {
  let city = val;
  let apiKey = "841177f590ddad9bbbcdad145d970953";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appi=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}


//Search by city
function searchLocation(event) {
  event.preventDefault();
  let currentLocation = document.querySelector("#current-location");
  let newLocation = document.querySelector("#location-input");
  currentLocation.innerHTML = newLocation.value;
  let city = newLocation.value;
  currentWeather(city);
}

let newLocation = document.querySelector("#location-search");
newLocation.addEventListener("submit", searchLocation);
let locationButton = document.querySelector("#search-button");
locationButton.addEventListener("click", searchLocation);


//Search by current location



//Switch units C/F
function switchUnits(event) {
  event.preventDefault();
  let currentUnit = document.querySelector("#temp-unit");
  let currentTemp = document.querySelector("#ctemp");

  if (currentUnit.innerHTML === "Celsius") {
    currentTemp.innerHTML = "-6°C";
    currentUnit.innerHTML = "Fahrenheit";
  } else {
    currentTemp.innerHTML = "21°F";
    currentUnit.innerHTML = "Celsius";
  };
}

let switchTo = document.querySelector("a.switch");
switchTo.addEventListener("click", switchUnits);

