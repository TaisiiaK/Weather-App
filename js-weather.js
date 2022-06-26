let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let dayCurrent = document.querySelector("#actualDay");
dayCurrent.innerHTML = `${day}`;

let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hoursAndMinutes = document.querySelector("#actualTime");
hoursAndMinutes.innerHTML = `${hours}:${minutes}`;

let date = today.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[today.getMonth()];
let todayDate = document.querySelector("#actualDate");
todayDate.innerHTML = `${date} ${month}`;

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", handleSubmit);

function searchCity(city) {
  let apiKey = "2c41ea2f88672461a8a3403ce29353e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  searchCity(city);
}
let celcium;

function showTemperature(response) {
  document.querySelector("#actualCity").innerHTML = response.data.name;
  celcium = Math.round(response.data.main.temp);
  document.querySelector("#actualNumberdegree").innerHTML = celcium;
  document.querySelector(
    "#actualWind"
  ).innerHTML = `Wind:${response.data.wind.speed}km/h`;
  document.querySelector(
    "#actualHumidity"
  ).innerHTML = `Humidity:${response.data.main.humidity}%`;
  document.querySelector("#actualDescription").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
}
searchCity("Kyiv");

let current = document.querySelector("#currentButton");
current.addEventListener("click", currentButtonclick);

function currentButtonclick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "2c41ea2f88672461a8a3403ce29353e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  axios.get(apiUrl).then(showTemperature);
}

function changeDegreeFahrenheit() {
  document.querySelector("#actualNumberdegree").innerHTML = Math.round(
    celcium * 1.8 + 32
  );
}
let fahrenheitClick = document.querySelector("#fahrenheyt-link");
fahrenheitClick.addEventListener("click", changeDegreeFahrenheit);

function changeDegreeCelciy() {
  document.querySelector("#actualNumberdegree").innerHTML = celcium;
}
let celciyClick = document.querySelector("#celcius-link");
celciyClick.addEventListener("click", changeDegreeCelciy);
