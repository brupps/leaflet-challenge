# leaflet-challenge
In this challenge, I was tasked with creating a map using data from USGS of recent, global earthquakes. I created markers from the geoJSON data that displayed where the earthquakes happened. The color of the marker is determined by the depth of the earthquake and the size of the marker is determined by the magnitude of the earthquake (larger circles = stronger magnitude). In addition, I added two different map views, one a topgraphical map and the other a "night" or dark global map to make the markers stand out. I also added a legend that corresponded with the depth of the earthquakes along with pop-ups for each marker that showed the information for that earthquake. Then I added the geoJSON layer for tectonic plates using data from [github] (https://github.com/fraxen/tectonicplates).


## Instructions
Create the Earthquake Visualization

### Part 1
Your first task is to visualize an earthquake dataset. Complete the following steps:
1. Get your dataset. To do so, follow these steps:
- The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed Links to an external site. page and choose a dataset to visualize. The following image is an example screenshot of what appears when you visit this link:
3-Data

- When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:
4-JSON

2. Import and visualize the data by doing the following:
- Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
    - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
    - Hint: The depth of the earth can be found as the third coordinate for each earthquake.
- Include popups that provide additional information about the earthquake when its associated marker is clicked.
- Create a legend that will provide context for your map data.
- Your visualization should look something like the preceding map.

### Part 2
Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates Links to an external site..

This part is completely optional; you can complete this part as a way to challenge yourself and boost your new skills.

Perform the following tasks:
- Plot the tectonic plates dataset on the map in addition to the earthquakes.
- Add other base maps to choose from.
- Put each dataset into separate overlays that can be turned on and off independently.
- Add layer controls to your map.

## References
Dataset created by the [United States Geological Survey] (https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) 

## Acknowledgements
Skills for this assignment were obtained through the activities and instruction from class with instructor Othmane Benyoucef. In addition further research and skills were acquired through leafletjs.com. 