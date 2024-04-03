mapboxgl.accessToken =
  "pk.eyJ1Ijoia3Jha2VuMTIzIiwiYSI6ImNsdHU1M3V3ajFhZjUya21vcGMwNG9ldDQifQ.B5h0r_S1blXJS0mJMgwYIA";


  var  ncBoundary = [[121.0586,14.7795], [121.0318,14.7252]]
// Initialize the map
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [121.0601, 14.7675],
  zoom: 13,
  maxBounds: ncBoundary,
  maxZoom:13,
});

// Load display the Shapefile
fetch("country.zip")
  .then(response => response.arrayBuffer())
  .then((buffer) => {
    shp(buffer).then((geojson) => {
      map.on("load", function () {
        map.addSource("shapefile", {
          type: "geojson",
          data: geojson,
        });
        map.addLayer({
          id: "shapefile-layer",
          type: "fill",
          source: "shapefile",
          layout: {},
          paint: {
            "fill-color": "#088",
            "fill-opacity": 0.8,
          },
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error loading Shapefile:", error);
  });

// Add a marker to display cursor coordinates
var marker = new mapboxgl.Marker({
  color: "#FF5733",
})
  .setLngLat([0, 0])
  .addTo(map);

// Update cursor coordinates when the mouse moves over the map
map.on("mousemove", function (e) {
  marker.setLngLat(e.lngLat);
  document.getElementById("coordinates").innerHTML =
    "Longitude: " +
    e.lngLat.lng.toFixed(4) +
    "<br>Latitude: " +
    e.lngLat.lat.toFixed(4);
});
