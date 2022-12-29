<template>
  <!--<div class="marker" ref="franceMarker">
    <div class="marker-icon marker-icon-france" />

    <div class="marker-text">
      <p class="marker-title">France</p>

      <p class="marker-description">4 locations</p>
    </div>
  </div>

  <div class="marker" ref="belgiumMarker">
    <div class="marker-icon marker-icon-belgium" />

    <div class="marker-text">
      <p class="marker-title">Belgium</p>

      <p class="marker-description">1 location</p>
    </div>
  </div>-->
</template>

<script setup>

const BASIC_STYLE = "mapbox://styles/mathhulk/cl0ovzd7j000u14mlcv35f827";
const MONOCHROME_STYLE = "mapbox://styles/mathhulk/clbznbvgs000314k8gtwa9q60";
const ACCESS_TOKEN = "pk.eyJ1IjoibWF0aGh1bGsiLCJhIjoiY2t6bTFhcDU2M2prOTJwa3VwcTJ2d2dpMiJ9.WEJWEP_qrKGXkYOgbIsaGg";

const displayWorld = () => {

    /*const popupOptions = { 
      anchor: "bottom-left", 
      offset: [ -32, -16 ],
      closeButton: false
    };

    // Prevent displaying a marker element
    const element = document.createElement("div");

    const markerOptions = {
      element
    };

    for (const _index in countries) {
      const country = countries[_index];

      const id = "country-" + _index

      map.value.addLayer({
        id,
        source: {
          type: "vector",
          url: "mapbox://mapbox.country-boundaries-v1",
        },
        "source-layer": "country_boundaries",
        type: "fill",
        paint: {
          "fill-color": country.fillColor,
          "fill-opacity": 0.5
        }
      });

      map.value.setFilter(id, [ "in", "name_en", country.name ]);

      const popup = new mapboxgl.Popup(popupOptions)
        .setHTML(franceMarker.value)
        .addTo(map.value)
        // Force the popup to remain open
        .on("close", ({ target }) => {
          target.addTo(map.value);
        });

      country.popup = 

      const popup = 

      new mapboxgl.Marker(markerOptions)
        .setLngLat([ 2.574716, 47.007522 ])
        .addTo(map.value)
        .setPopup(francePopup);
    }*/

  map.value.flyTo({
    center: [ 2.574716, 47.007522 ],
    zoom: 5,
    speed: 0.5
  });
};
</script>

<style lang="scss">



</style>
