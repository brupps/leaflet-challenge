// Create a permanent variable
const url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

  //Plot earthquakes from geojson
function earthquakeMarkers(response) {

  // Function to determine marker color
   function getColor(depth){
      if (depth < 10){
          return "#00FF00";
      } else if (depth < 30){
          return "greenyellow";
      } else if (depth < 50){
          return "yellow";
      } else if (depth < 70){
          return "orange";
      } else if (depth < 90){
          return "orangered";
      } else {return "red"};
  };


  
//function to create map
function createMap(earthquakes) {
  // Create the tile layer that will be the background of our map.
  let topo =  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }
  );
  let night = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
  });

  // Create a baseMap to hold the base and add to map.
  let baseMaps = {
      "Topographic": topo,
      "Night": night
  };

  //Create overlaymap to hold earthquake locations.
  let overlayMaps = {
      "Earthquakes": earthquakes,
  };

  // Create map with the options.
  let myMap = L.map("map", {
      center: [0, 0],
      zoom: 3,
      layers: [topo, earthquakes],
  });

     // Create the Tectonic Plate geoJSON
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then((geodata) => {

    let plates = L.geoJson(geodata,{
        style: {
            color: 'red', 
            opacity: .5,           
            fill: false
        }
    });

    // Add the plates to overlay
    layerControl.addOverlay(plates, 'Tectonic Plates');

    });

  // Create a layer control with basemaps and overlay maps and add it to the map.
  let layerControl = L.control.layers(baseMaps, overlayMaps, {
          collapsed: false,
      })
      .addTo(myMap);

  // Add Legend
  let legend = L.control({
      position: 'bottomright'
  });
  legend.onAdd = function (myMap) {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [-10, 10, 30, 50, 70, 90],
          labels = [];
      // loop through our density intervals and generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
  };
  legend.addTo(myMap);
}

    // Function to determine marker size
    function markerSize(magnitude){
       return magnitude * 3;          
    };
    
    // Add pop up info to each marker.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3>\
      <hr><p>Date: ${new Date(feature.properties.time)}</p>\
      <p>Magnitude: ${feature.properties.mag}</p>\
      <p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }

    // Function to create the circle
    function createMarker(geoJsonPoint, coords){
      return L.circleMarker(coords, {
          radius : markerSize(geoJsonPoint.properties.mag),
          weight: 1,
          color: 'gray',
          fillColor: getColor(geoJsonPoint.geometry.coordinates[2]),
          fillOpacity: 0.75
      });
  };

    //create geojson layer 
    let earthquakesLocations = L.geoJSON(response, {
      onEachFeature: onEachFeature,
      pointToLayer: createMarker});
    
      
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakesLocations);
};

//perform API call for the earthquake locations
d3.json(url).then(earthquakeMarkers);
