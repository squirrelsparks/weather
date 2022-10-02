const searchInput = document.getElementById("searchInput");
const searchSubmit = document.getElementById("searchSubmit");
const city = document.getElementById("city");
const skyConditions = document.getElementById("skyConditions");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const msg = document.getElementById("errorMsg");
var lat;
var lon;
//api key from OpenWeather
const key = "eb8310fb4222164ed5204fec61de6c8f";


//when search term entered/submitted, then...
//if I wanted to add in a search by zip code, write an if statement after assiging search variable.
//and then split to use the geoURL vs a zipURL
//also, need to addEventListener for pressing enter after typing in the search field...
searchSubmit.addEventListener('click', () => {
   var search = searchInput.value;
//using OpenWeather api for city/state/zip to translate to lat/long.
   var geoUrl ="http://api.openweathermap.org/geo/1.0/direct?q="+search+"&limit=1&appid="+key;   
   fetch(geoUrl)
   .then(response => response.json())
   .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      //latLong.textContent = `${lat} latitude and ${lon} longitude`;
      
      //prep for next api call to use lat/lon to call current weather
      const newUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
     
      fetch(newUrl)
      .then(response => response.json())
      .then(data => {
      console.log(data);
      city.textContent = data.city.name;
      skyConditions.textContent = data.list[0].weather[0].main;
      temperature.textContent = `${data.list[0].main.temp} degrees Fahrenheit`;
      feelsLike.textContent = `Feels like: ${data.list[0].main.feels_like} degrees Fahrenheit`;
      })
   })
   .catch(() =>{
      var errorMsg = "Could not display weather. Please try again.";
      msg.textContent =`${errorMsg}`;
     });
  
})

