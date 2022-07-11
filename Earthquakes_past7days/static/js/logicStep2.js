
// Add a Map Object


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v10',
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [satelliteStreets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/russellctaylor/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Add GeoJSON data.
// Accessing the airport GeoJSON URL
//let airportData = "https://raw.githubusercontent.com/russellctaylor/Mapping_Earthquakes/main/majorAirports.json";



// Create a style for the lines.
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


// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {

    // We turn each feature into a circleMarker on the map.
    
    pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },
        style: styleInfo
        }).addTo(map);
    });







/////////////////



//L.geoJSON(sanFranAirport, {
 // onEachFeature: function(feature, layer) {
 //   layer.bindPopup();
 //  }
//});

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport, {
  // We turn each feature into a marker on the map.
 // pointToLayer: function(feature, latlng) {
 //   console.log(feature);
 //   return L.marker(latlng)
 //   .bindPopup("<h2>" + feature.properties.city + "</h2>");
 // }

//}).addTo(map);
// Create the map object with a center and zoom level.
//let map = L.map("mapid", {
//    center: [
//      40.7, -94.5
//    ],
//    zoom: 4
//  });




// Get data from cities.js
//let cityData = cities;

// Loop through the cities array and create one marker for each city.
// Loop through the cities array and create one marker for each city.
// Loop through the cities array and create one marker for each city.
//cityData.forEach(function(city) {
  //console.log(city)
 // L.circleMarker(city.location, {radius: city.population/200000})
  //.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
//.addTo(map);
//});