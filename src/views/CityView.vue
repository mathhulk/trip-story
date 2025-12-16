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

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import CountryMenu from "@/components/CountryMenu.vue";
import CityMenu from "@/components/CityMenu.vue";
import { countries, type City, type Country } from "@/lib/countries";
import {
  Event,
  Marker,
  type EasingOptions,
  type LngLatBoundsLike,
} from "mapbox-gl";
import tippy, { type Instance } from "tippy.js";
import useMap from "@/composables/useMap";

interface Props {
  country: string;
  city: string;
}

const props = defineProps<Props>();

const map = useMap();
const router = useRouter();

let markers: Marker[] = [];
let tooltips: Instance[] = [];

// To-do: Is there a better way to organize this component..?
const active = ref(false);
const templates = ref([]);

const country = computed(() => {
  return countries.find(
    (country) => country.title.toLowerCase() === props.country
  ) as Country;
});

const city = computed(() => {
  return country.value.cities.find(
    (city) => city.title.toLowerCase() === props.city
  ) as City;
});

const handleMoveEnd = (event: Event & { view?: string }) => {
  if (event.view !== city.value.title) return;

  active.value = true;

  tooltips = tippy("[data-tooltip]", {
    arrow: false,
    offset: [0, 10],
    animation: "fade",
    duration: 150,
    maxWidth: 512,
    content: (reference) => reference.getAttribute("data-tooltip")!,
  });

  for (const locationIndex in city.value.locations) {
    const { center } = city.value.locations[locationIndex]!;

    const marker = new Marker({
      element: templates.value[locationIndex],
      // Disable panning
      draggable: true,
      anchor: "center",
    })
      .setLngLat(center)
      .addTo(map);

    markers.push(marker);
  }
};

// Disable dragging
const handleMouseDown = (event: MouseEvent) => {
  event.stopPropagation();
};

const handleClick = (title: string) => {
  const countryIdentifier = country.value.title.toLowerCase();
  const cityIdentifier = city.value.title.toLowerCase();
  const locationIdentifier = title.toLowerCase();

  router.push(
    "/countries/" +
      countryIdentifier +
      "/" +
      cityIdentifier +
      "/" +
      locationIdentifier
  );
};

// To-do: Use map.jumpTo for initial page load and prefers-reduced-motion
const enter = () => {
  map.on("moveend", handleMoveEnd);

  map.setStyle("mapbox://styles/mathhulk/cl0ovzd7j000u14mlcv35f827");

  const options: EasingOptions = {
    duration: 2500,
    pitch: 0,
    // To-do: Fix additive padding bug in Mapbox GL JS
    padding: { left: 128, right: 128, top: 128, bottom: 128 },
  };

  // fitBounds seems to hang when a single point was supplied or
  // the LngLat includes too many numbers after the decimal..?
  if (city.value.locations.length === 1) {
    options.center = city.value.locations[0]!.center;
    options.zoom = 15;

    map.flyTo(options, { view: city.value.title });

    return;
  }

  let xMinimum = Infinity;
  let xMaximum = -Infinity;
  let yMinimum = Infinity;
  let yMaximum = -Infinity;

  for (const locationIndex in city.value.locations) {
    const [longitude, latitude] = city.value.locations[locationIndex]!.center;

    xMinimum = xMinimum < longitude ? xMinimum : longitude;
    xMaximum = xMaximum > longitude ? xMaximum : longitude;
    yMinimum = yMinimum < latitude ? yMinimum : latitude;
    yMaximum = yMaximum > latitude ? yMaximum : latitude;
  }

  const bounds: LngLatBoundsLike = [
    [xMinimum, yMinimum],
    [xMaximum, yMaximum],
  ];

  options.maxZoom = 15;

  map.fitBounds(bounds, options, { view: city.value.title });
};

const exit = () => {
  map.off("moveend", handleMoveEnd);

  for (const marker of markers) marker.remove();
  markers = [];

  for (const tooltip of tooltips) tooltip.destroy();
  tooltips = [];

  active.value = false;
};

onMounted(enter);
onUnmounted(exit);

watch(
  () => props.city,
  () => {
    exit();
    nextTick(enter);
  }
);
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
