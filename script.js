var APIKey = "1f3c2c140755fa984ae37713c1ff8a71";

var city= "london";

// api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}


var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


// fetch(queryURL)


// // Add your own API key between the ""
// var APIKey = "1f3c2c140755fa984ae37713c1ff8a71";

// // Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + 1f3c2c140755fa984ae37713c1ff8a71;


function isNoon(entry) {
    return entry.dt_txt.endsWith(" 12:00:00");
}



// We then created an Fetch call
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    // Create CODE HERE to Log the queryURL
    console.log (queryURL);
    console.log (data); 
    var name = (data.name);
    var date = (data.dt);
    var temp = (data.main.temp);
    var humidity = (data.main.humidity);
    var wind = (data.wind.speed);
    var lon = (data.coord.lon);
    var lat = (data.coord.lat);
    var string_to_print = name+" "+date+" "+temp+" "+humidity+" "+wind
    console.log(string_to_print);

     //5 days
    var second_queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    return fetch(second_queryURL);
    })
    .then(function (second_response) {
        return second_response.json();
      })
      .then(function (data) {
        console.log(data); 
        // Extract entries with time at 12:00 PM
        const noonData = Object.values(data.list).filter(isNoon);
        console.log(noonData); 
    // Function to check if the time in the dt_txt property is 12:00 PM

 })
  