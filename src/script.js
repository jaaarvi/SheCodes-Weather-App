//Update interface
function updateWeather(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#ctemp")
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentType = document.querySelector("#ctype");
  currentType.innerHTML = response.data.weather[0].description;
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = response.data.name;

  let newTime = response.data.timezone;
  callTime(newTime);
}

//Search for a city
function cityWeather(val) {
  let city = val;
  let apiKey = "841177f590ddad9bbbcdad145d970953";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "";
  let currentUnit = document.querySelector("#temp-unit");

  if (currentUnit.innerHTML === "Celsius") {
    units = "imperial";
  } else {
    units = "metric";
  };
  
  let apiUrl = `${apiEndPoint}?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function searchLocation(event) {
  event.preventDefault();
  let newLocation = document.querySelector("#location-input");
  let city = newLocation.value;
  cityWeather(city);
}

let newLocation = document.querySelector("#location-search");
newLocation.addEventListener("submit", searchLocation);
let locationButton = document.querySelector("#search-button");
locationButton.addEventListener("click", searchLocation);

//Set geolocation button
function geoWeather(position) {
  console.log(position);
  let currentUnit = document.querySelector("#temp-unit");
  
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "841177f590ddad9bbbcdad145d970953";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "";

  if (currentUnit.innerHTML === "Celsius") {
    units = "imperial";
  } else {
    units = "metric";
  };
  
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function callLocation() {
  navigator.geolocation.getCurrentPosition(geoWeather);
}

let geoButton = document.querySelector("#geolocation");
geoButton.addEventListener("click", callLocation);


//On load in update...
function onLoad(position) {
  console.log(position);
  let currentUnit = document.querySelector("#temp-unit");

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "841177f590ddad9bbbcdad145d970953";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "";

  if (currentUnit.innerHTML === "Celsius") {
    units = "imperial";
  } else {
    units = "metric";
  };

  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

navigator.geolocation.getCurrentPosition(onLoad);

//Get matching time and date
function callTime(response) {
  let utc = Date.now();
  let offsetTime = response;
  console.log(offsetTime);
  let newTime = utc + offsetTime;
  let updateTime = new Date(newTime);

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let today = days[updateTime.getDay()];
  let hour = updateTime.getHours();
  let minute = updateTime.getMinutes();

  let displayTime = document.querySelector("#current-time");
 
  if (minute < 10) {
    displayTime.innerHTML = `${today} ${hour}:0${minute}`
  } else {
    displayTime.innerHTML = `${today} ${hour}:${minute}`
  }
}

//Switching temp units
function switchUnits(event) {
  event.preventDefault();
  let currentUnit = document.querySelector("#temp-unit");

  if (currentUnit.innerHTML === "Celsius") {
    currentUnit.innerHTML = "Fahrenheit";
  } else {
    currentUnit.innerHTML = "Celsius";
  };

  let currentLocation = document.querySelector("#current-location");
  cityWeather(currentLocation.innerHTML);
}

let switchTo = document.querySelector("a.switch");
switchTo.addEventListener("click", switchUnits);

