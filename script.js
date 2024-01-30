var APIKey = "1f3c2c140755fa984ae37713c1ff8a71";

var city= "london";

// api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}


var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var listweatherdata = []


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
    const name = (data.name);
    const date = (data.dt);
    const temp = (data.main.temp);
    const humidity = (data.main.humidity);
    const wind = (data.wind.speed);
    const lon = (data.coord.lon);
    const lat = (data.coord.lat);
    // var string_to_print = name+" "+date+" "+temp+" "+humidity+" "+wind
    // console.log(string_to_print);
    const commonData = {temp:temp, humidity:humidity, date:date}
    listweatherdata.push(commonData)

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
        const noonData = {}
        for (const key in data.list){
            // console.log(key)
            const entry = data.list[key];
 
            if (isNoon(entry)) {
                
                const dateFive = (entry.dt);
                const temperatureFive = (entry.main.temp);
                const humidityFive = (entry.main.humidity);

                const commonData = {temp:temperatureFive, humidity:humidityFive, date:dateFive}
                // console.log(commonData)
                listweatherdata.push(commonData)
            }
        }
        // Object.values(data.list).filter(isNoon);
        // console.log(noonData); 
    // Function to check if the time in the dt_txt property is 12:00 PM

    console.log(listweatherdata[0].temp)
    console.log(listweatherdata[1].humidity)
    // console.log(listweatherdata)
 })
  