<template>
  <div class="side-bar">
    <CountryMenu :country="country" />

    <CityMenu :country="country" :city="city" :active="true" />
  </div>

  <div 
    v-show="active" 
    class="location-marker" 
    v-for="location in city.locations" 
    ref="templates"
    @click="handleClick(location.title)"
    @mousedown="handleMouseDown"
    :data-tooltip="location.title"
  />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import CountryMenu from "@/components/CountryMenu.vue";
import CityMenu from "@/components/CityMenu.vue";
import countries from "@/countries";
import mapboxgl from "mapbox-gl";
import tippy from "tippy.js";

const props = defineProps([ "country", "city", "map" ]);
const country = countries.find(country => country.title.toLowerCase() === props.country);
const city = country.cities.find(city => city.title.toLowerCase() === props.city);

const router = useRouter();

const active = ref(false);

const templates = ref([]);

const markers = [];

let tooltips;

const initialize = () => {
  active.value = true;

  tooltips = tippy("[data-tooltip]", {
    arrow: false, 
    offset: [ 0, 10 ],
    animation: "fade",
    duration: 150,
    maxWidth: 512,
    content: (reference) => reference.getAttribute("data-tooltip")
  });

  for (const locationIndex in city.locations) {
    const { center } = city.locations[locationIndex];

    const marker = new mapboxgl.Marker({ 
      element: templates.value[locationIndex], 
      // Disable panning
      draggable: true,
      anchor: "center"
    })
      .setLngLat(center)
      .addTo(props.map);

    markers.push(marker);
  }
};

const handleMoveEnd = (event) => {
  // To-do: Force component to remount when country changes
  if (event.view !== city.title) return;

  initialize();
};

// Disable dragging 
const handleMouseDown = (event) => {
  event.stopPropagation();
};

const handleClick = (title) => {
  const countryIdentifier = country.title.toLowerCase();
  const cityIdentifier = city.title.toLowerCase();
  const locationIdentifier = title.toLowerCase();

  router.push("/countries/" + countryIdentifier + "/" + cityIdentifier + "/" + locationIdentifier);
};

onMounted(() => {
  props.map.on("moveend", handleMoveEnd);

  props.map.setStyle("mapbox://styles/mathhulk/cl0ovzd7j000u14mlcv35f827");
  
  let xMinimum, yMinimum, xMaximum, yMaximum;

  for (const locationIndex in city.locations) {
    const [ longitude, latitude ] = city.locations[locationIndex].center;

    xMinimum = xMinimum < longitude ? xMinimum : longitude;
    xMaximum = xMaximum > longitude ? xMaximum : longitude;
    yMinimum = yMinimum < latitude ? yMinimum : latitude;
    yMaximum = yMaximum > latitude ? yMaximum : latitude;
  }

  const options = {
    duration: 2500,
    maxZoom: 15,
    pitch: 0,
    padding: {
      left: 128,
      right: 128,
      top: 128,
      bottom: 128
    }
  };

  const bounds = [ 
    [ xMinimum, yMinimum ], 
    [ xMaximum, yMaximum ] 
  ];

  props.map.fitBounds(bounds, options, { view: city.title });
});

onUnmounted(() => {
  props.map.off("moveend", handleMoveEnd);

  for (const marker of markers) marker.remove();

  // The component can be unmounted mid-flight 
  // before tooltips have been created
  if (!active.value) return;

  for (const tooltip of tooltips) tooltip.destroy();
});
</script>

<style lang="scss">
.side-bar {
  position: absolute;

  right: 16px;
  top: 16px;

  width: 384px;

  > :first-child {
    margin-bottom: 8px;
  }
}

.location-marker {
  height: 12px;
  width: 12px;

  cursor: pointer;

  border-radius: 6px;

  background-color: #9333ea;

  &::before {
    content: "";

    width: 24px;
    height: 24px;

    border-radius: 12px;

    background-color: rgba(#9333ea, 0.25);

    left: -6px;
    top: -6px;

    position: absolute;
  }
}

.tippy-box[data-animation="fade"][data-state="visible"] {
  opacity: 1;
}

.tippy-box[data-animation="fade"][data-state="hidden"] {
  opacity: 0;
}

.tippy-content {
  background-color: #262626;

  padding: 8px 16px;

  border-radius: 4px;

  font-size: 16px;
  font-weight: 500;
  color: white;
  line-height: 1;
}
</style>