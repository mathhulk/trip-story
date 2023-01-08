<template>
  <div class="side-bar">
    <CountryMenu :country="country" :active="true" />
  </div>

  <div 
    v-show="active" 
    class="marker" 
    v-for="city in country.cities" 
    :class="getMarkerClass(city.reverse)"
    ref="templates"
    @click="handleClick(city.title)"
    @mousedown="handleMouseDown"
  >
    <p class="marker-tooltip">{{ city.title }}</p>

    <div class="marker-icon" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import CountryMenu from "@/components/CountryMenu.vue";
import countries from "@/countries";
import mapboxgl from "mapbox-gl";

const props = defineProps([ "country", "map" ]);

const router = useRouter();

// To-do: Is there a better way to organize this component..?
const active = ref(false);
const templates = ref([]);
const markers = [];

let country;

const updateCountry = () => {
  country = countries.find(country => country.title.toLowerCase() === props.country);
  if (!country) return router.push("/countries");
};

const handleMoveEnd = (event) => {
  if (event.view !== country.title) return;

  active.value = true;

  for (const cityIndex in country.cities) {
    const { center, reverse } = country.cities[cityIndex];

    const marker = new mapboxgl.Marker({ 
      element: templates.value[cityIndex], 
      // Disable panning
      draggable: true,
      anchor: reverse ? "top" : "bottom",
      offset: [ 16, reverse ? 8 : 24 ]
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
  const cityIdentifier = title.toLowerCase();
  router.push("/countries/" + countryIdentifier + "/" + cityIdentifier);
};

const getMarkerClass = (reverse) => {
  return { "marker-reverse": reverse };
};

// To-do: Use map.jumpTo for initial page load and prefers-reduced-motion
const enter = () => {
  props.map.on("moveend", handleMoveEnd);
  props.map.setStyle("mapbox://styles/mathhulk/clbznbvgs000314k8gtwa9q60");

  const options = {
    duration: 2500,
    pitch: 0,
    // To-do: Fix additive padding bug in Mapbox GL JS
    padding: { left: 128, right: 128, top: 0, bottom: 0 }
  };

  // fitBounds seems to hang when a single point was supplied or
  // the LngLat includes too many numbers after the decimal..?
  if (country.cities.length === 1) {
    options.center = country.cities[0].center;
    options.zoom = 7;

    props.map.flyTo(options, { view: country.title });

    return;
  }
  
  let xMinimum, yMinimum, xMaximum, yMaximum;

  for (const cityIndex in country.cities) {
    const [ longitude, latitude ] = country.cities[cityIndex].center;

    xMinimum = xMinimum < longitude ? xMinimum : longitude;
    xMaximum = xMaximum > longitude ? xMaximum : longitude;
    yMinimum = yMinimum < latitude ? yMinimum : latitude;
    yMaximum = yMaximum > latitude ? yMaximum : latitude;
  }

  const bounds = [ 
    [ xMinimum, yMinimum ], 
    [ xMaximum, yMaximum ] 
  ];

  options.maxZoom = 7;

  props.map.fitBounds(bounds, options, { view: country.title });
};

const exit = () => {
  props.map.off("moveend", handleMoveEnd);

  for (const marker of markers) marker.remove();
};

onMounted(enter);
onUnmounted(exit);

watch(() => props.country, () => {
  updateCountry();
  exit();
  nextTick(enter);
});

updateCountry();
</script>

<style lang="scss" scoped>
.side-bar {
  position: absolute;

  right: 16px;
  top: 16px;

  width: 384px;
}

.marker {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: -16px;

  cursor: pointer;

  &.marker-reverse {
    flex-direction: column-reverse;

    .marker-icon {
      margin-bottom: 16px;
    }
  }

  &:not(.marker-reverse) .marker-icon {
    margin-top: 16px;
  }

  .marker-tooltip {
    background-color: #262626;

    font-family: "Inter", sans-serif;

    padding: 8px 16px;

    border-radius: 4px;

    font-size: 14px;
    font-weight: 500;
    color: white;
    line-height: 1;  
  }

  .marker-icon {
    height: 16px;
    width: 16px;

    cursor: pointer;

    border-radius: 8px;

    background-color: #2563eb;

    box-shadow: 0 0 0 8px rgba(#2563eb, 0.25);
  }
}
</style>