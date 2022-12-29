<template>
  <div class="marker" v-show="active" ref="franceTemplate">
    <div class="marker-icon marker-icon-france" />

    <div class="marker-text">
      <p class="marker-title">France</p>

      <p class="marker-description">3 locations</p>
    </div>
  </div>

  <div class="marker" v-show="active" ref="belgiumTemplate">
    <div class="marker-icon marker-icon-belgium" />

    <div class="marker-text">
      <p class="marker-title">Belgium</p>

      <p class="marker-description">1 location</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import mapboxgl from "mapbox-gl";

const props = defineProps([ "map" ]);

const active = ref(false);

const franceMarker = ref(null);
const franceTemplate = ref(null);

const belgiumMarker = ref(null);
const belgiumTemplate = ref(null);

const DEFAULT_LAYER_OPTIONS = {
  source: {
    type: "vector",
    url: "mapbox://mapbox.country-boundaries-v1",
  },
  "source-layer": "country_boundaries",
  type: "fill"
}

const initialize = () => {
  active.value = true;

  // France
  const franceLayerOptions = {
    id: "france-boundaries",
    paint: {
      "fill-color": "#059669",
      "fill-opacity": 0.5
    }
  };

  props.map.addLayer({ ...DEFAULT_LAYER_OPTIONS, ...franceLayerOptions });
  props.map.setFilter("france-boundaries", [ "in", "name_en", "France" ]);

  franceMarker.value = new mapboxgl.Marker({
    element: franceTemplate.value,
    anchor: "center"
  })
    .setLngLat([ 2.574716, 47.007522 ])
    .addTo(props.map);

  // Belgium
  const belgiumLayerOptions = {
    id: "belgium-boundaries",
    paint: {
      "fill-color": "#dc2626",
      "fill-opacity": 0.5
    }
  };

  props.map.addLayer({ ...DEFAULT_LAYER_OPTIONS, ...belgiumLayerOptions });
  props.map.setFilter("belgium-boundaries", [ "in", "name_en", "Belgium" ]);

  belgiumMarker.value = new mapboxgl.Marker({
    element: belgiumTemplate.value,
    anchor: "center"
  })
    .setLngLat([ 4.779704, 50.648169 ])
    .addTo(props.map);
};

const handleMoveEnd = (event) => {
  if (event.view !== "world") return;

  initialize();
};

onMounted(() => {  
  props.map.on("moveend", handleMoveEnd);

  // To-do: Padding
  const location = {
    center: [ 2.574716, 47.007522 ],
    zoom: 5,
    speed: 0.5
  };

  props.map.flyTo(location, { view: "world" });
});

onUnmounted(() => {
  props.map.off("moveend", handleMoveEnd);

  // The component can be unmounted mid-flight before 
  // layers, sources, and markers have been added
  if (!active.value) return;

  props.map.removeLayer("belgium-boundaries");
  props.map.removeLayer("france-boundaries");

  // Adding a layer also adds a source for country boundaries
  props.map.removeSource("belgium-boundaries");
  props.map.removeSource("france-boundaries");

  franceMarker.value.remove();
  belgiumMarker.value.remove();
});
</script>

<style lang="scss" scoped>
.marker {
  background-color: #262626;

  font-family: "Inter", sans-serif;

  padding: 8px 16px;

  border-radius: 4px;

  display: flex;

  .marker-text {
    line-height: 1;  

    p.marker-title {
      font-size: 16px;
      font-weight: 500;
      color: white;

      margin-bottom: 4px;
    }

    p.marker-description {
      font-size: 12px;
      color: rgba(white, 0.5);
    }
  }

  .marker-icon {
    height: 32px;
    width: 32px;

    margin-right: 16px;

    border-radius: 16px;

    &.marker-icon-france {
      background: linear-gradient(to right, blue 33%, white 33% 67%, red 67%);
    }

    &.marker-icon-belgium {
      background: linear-gradient(to right, black 33%, yellow 33% 67%, red 67%);
    }
  }
}
</style>
