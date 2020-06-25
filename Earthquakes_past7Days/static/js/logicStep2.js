
// We create the street view tile layer that will be the default background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapbox_api_key
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: mapbox_api_key
});

// We create the dark view tile layer that will be an option for our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: mapbox_api_key
});

// We create the satellite view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: mapbox_api_key
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  // Light: light,
  // Dark: dark,
  Satellite: satelliteStreets
};

// Create the map object with a center and zoom level - scale is from 0-18.
let map = L.map("mapid", {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    // We set the style for each cicleMarker using our styleInfo function
    style: styleInfo
  }).addTo(map);
});

// // Drawing Polygons
// // Accessing the Toronto neighborhoods GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/Duegan24/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);
// // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     style: myStyle,
//     onEachFeature: function(feature, layer) {
//       console.log(layer);
//       layer.bindPopup("<h3> Neighborhood:  " + feature.properties.AREA_NAME + "</h3><hr><h4> Code:  " + feature.properties.AREA_S_CD +"</h4>");
//     }
//   }).addTo(map);
// });


// // Create Lines
// // Accessing the Toronto airline routes GeoJSON URL.
// let torontoData = "https://raw.githubusercontent.com/Duegan24/Mapping_Earthquakes/Mapping_GeoJSON_LineStrings/torontoRoutes.json";

// // Grabbing our GeoJSON data.
// d3.json(torontoData).then(function(data) {
//   console.log(data);
// // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     style: myStyle,
//     onEachFeature: function(feature, layer) {
//       console.log(layer);
//       layer.bindPopup("<h3> Airline:  " + feature.properties.airline + "</h3><hr><h4> Desination:  " + feature.properties.dst+"</h4>");
//     }
//   }).addTo(map);
// });


// // Mapping Points

// // Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/Duegan24/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

// // Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//   console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h3> Airport Code:  " + feature.properties.faa + "</h3><hr><h4> Airport Name:  " + feature.properties.name+"</h4>");
//     }
//   }).addTo(map);
// });


// // Create Circles
// // Get data from cities.js
// let cityData = cities;

// // Loop through the cities array and create one marker for each city.
// cityData.forEach(city => {
//   console.log(city)
//   L.circleMarker(city.location, {
//     radius: (city.population/200000),
//     color: 'orange',
//     lineweight: 4,
//   })
//   .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//   .addTo(map);
// });




