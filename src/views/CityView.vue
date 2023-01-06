<template>
  <div class="side-bar">
    <CountryMenu :country="country" />

    <CityMenu :country="country" :city="city" :active="true" />
  </div>

  <div 
    class="location-marker" 
    v-show="active"
    v-for="location in city.locations" 
    ref="templates"
    @click="handleClick(location.title)"
    @mousedown="handleMouseDown"
    :data-tooltip="location.title"
  />
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import CountryMenu from "@/components/CountryMenu.vue";
import CityMenu from "@/components/CityMenu.vue";
import countries from "@/countries";
import mapboxgl from "mapbox-gl";
import tippy from "tippy.js";

const props = defineProps([ "country", "city", "map" ]);

const router = useRouter();

// To-do: Is there a better way to organize this component..?
const active = ref(false);
const templates = ref([]);
const markers = [];
let tooltips;

let country;
let city;

const updateCity = () => {
  if (country?.title.toLowerCase() !== props.country) country = countries.find(country => country.title.toLowerCase() === props.country);
  city = country.cities.find(city => city.title.toLowerCase() === props.city);
};

const handleMoveEnd = (event) => {
  if (event.view !== city.title) return;

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

const enter = () => {
  props.map.on("moveend", handleMoveEnd);
  props.map.setStyle("mapbox://styles/mathhulk/cl0ovzd7j000u14mlcv35f827");

  const options = {
    duration: 2500,
    pitch: 0,
    // To-do: Fix additive padding bug in Mapbox GL JS
    padding: { left: 128, right: 128, top: 128, bottom: 128 }
  };

  // fitBounds seems to hang when a single point was supplied or
  // the LngLat includes too many numbers after the decimal..?
  if (city.locations.length === 1) {
    options.center = city.locations[0].center;
    options.zoom = 15;

    props.map.flyTo(options, { view: city.title });

    return;
  };
  
  let xMinimum, yMinimum, xMaximum, yMaximum;

  for (const locationIndex in city.locations) {
    const [ longitude, latitude ] = city.locations[locationIndex].center;

    xMinimum = xMinimum < longitude ? xMinimum : longitude;
    xMaximum = xMaximum > longitude ? xMaximum : longitude;
    yMinimum = yMinimum < latitude ? yMinimum : latitude;
    yMaximum = yMaximum > latitude ? yMaximum : latitude;
  }

  const bounds = [ 
    [ xMinimum, yMinimum ], 
    [ xMaximum, yMaximum ] 
  ];

  options.maxZoom = 15;

  props.map.fitBounds(bounds, options, { view: city.title });
};

const exit = () => {
  props.map.off("moveend", handleMoveEnd);

  for (const marker of markers) marker.remove();
  if (tooltips) for (const tooltip of tooltips) tooltip.destroy();

  markers.value = [];

  active.value = false;
};

onMounted(enter);
onUnmounted(exit);

watch(() => props.city, () => {
  updateCity();
  exit();
  nextTick(enter);
});

updateCity();
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