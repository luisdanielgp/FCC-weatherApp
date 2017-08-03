

$( document ).ready(function getLocation() {
  if (navigator.geolocation) {
  var timeoutVal = 10 * 1000 * 1000;
  navigator.geolocation.getCurrentPosition(
    getPosition,
    displayError,
    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
  );
}
else {
  alert("Geolocation is not supported by this browser");
}

function getPosition(position) {
  //window.alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
   var lat = position.coords.latitude;
   var lon = position.coords.longitude;

  $.getJSON('https://fcc-weather-api.glitch.me/api/current?units=metric&lat=' + lat + '&lon=' + lon, function(wd){
    //console.log('got it ' , wd);
    var currentLocation = wd.name + ', ' + wd.sys.country;
    var currentWeather = wd.weather[0].description;
    var currentTemperature = Math.round(wd.main.temp);
    var currentIcon = wd.weather[0].icon;

    $('#location').html(currentLocation);
    $('#temperature').html(currentTemperature);
    $('#description').html(currentWeather);
    $('#icon').attr("src",currentIcon);

    var getTemperatureUnit = document.getElementById("temperatureUnit");
    var getTemperature = document.getElementById("temperature");

    getTemperatureUnit.addEventListener('click',function() {
      if (getTemperatureUnit.innerHTML === 'ºC') {
        getTemperatureUnit.innerHTML= 'ºF';
        getTemperature.innerHTML= Math.round(currentTemperature * 1.8 + 32);
      }else  {
         getTemperatureUnit.innerHTML= 'ºC';
         getTemperature.innerHTML= currentTemperature;
   }
});
  })
}
});

function displayError(error) {
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}
