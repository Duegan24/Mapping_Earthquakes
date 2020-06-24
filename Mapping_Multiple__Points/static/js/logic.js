// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level - scale is from 0-18.
let map = L.map("mapid", {
    center: [34.0522, -100],
    zoom: 4
});

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(city => {
  console.log(city)
  L.circleMarker(city.location, {
    radius: (city.population/200000),
    color: 'orange',
    lineweight: 4,
  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
});



let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapbox_api_key
});


// Then we add our 'graymap' tile layer to the map
streets.addTo(map);



