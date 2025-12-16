<template>
  <div
    class="marker"
    v-show="active"
    v-for="country in countries"
    @mousedown="handleMouseDown"
    @click="handleClick(country.title)"
    :key="country.title"
    ref="templates"
  >
    <div class="marker-tooltip">
      <div class="tooltip-icon" :style="country.style" />

      <p class="tooltip-text">{{ country.title }}</p>
    </div>

    <div class="marker-icon" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import mapboxgl, { Event, Marker, type LngLatBoundsLike } from "mapbox-gl";
import { countries } from "@/lib/countries";
import useMap from "@/composables/useMap";

const map = useMap();
const router = useRouter();

let markers: Marker[] = [];

// To-do: Is there a better way to organize this component..?
const active = ref(false);
const templates = ref([]);

// Disable dragging
const handleMouseDown = (event: MouseEvent) => {
  event.stopPropagation();
};

const handleClick = (title: string) => {
  const countryIdentifier = title.toLowerCase();
  router.push("/countries/" + countryIdentifier);
};

const handleMoveEnd = (event: Event & { view?: string }) => {
  if (event.view !== "countries") return;

  active.value = true;

  for (const countryIndex in countries) {
    const { center } = countries[countryIndex]!;

    const marker = new mapboxgl.Marker({
      element: templates.value[countryIndex],
      anchor: "bottom",
      // Disable panning
      draggable: true,
    })
      .setLngLat(center)
      .addTo(map);

    markers.push(marker);
  }
};

// To-do: Use map.jumpTo for initial page load and prefers-reduced-motion
onMounted(() => {
  map.on("moveend", handleMoveEnd);

  map.setStyle("mapbox://styles/mathhulk/clbznbvgs000314k8gtwa9q60");

  let xMinimum = Infinity;
  let xMaximum = -Infinity;
  let yMinimum = Infinity;
  let yMaximum = -Infinity;

  for (const country of countries) {
    const [longitude, latitude] = country.center;

    xMinimum = xMinimum < longitude ? xMinimum : longitude;
    xMaximum = xMaximum > longitude ? xMaximum : longitude;
    yMinimum = yMinimum < latitude ? yMinimum : latitude;
    yMaximum = yMaximum > latitude ? yMaximum : latitude;
  }

  const options = {
    duration: 2500,
    maxZoom: 5,
    pitch: 0,
    // To-do: Fix additive padding bug in Mapbox GL JS
    padding: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const bounds: LngLatBoundsLike = [
    [xMinimum, yMinimum],
    [xMaximum, yMaximum],
  ];

  map.fitBounds(bounds, options, { view: "countries" });
});

onUnmounted(() => {
  map.off("moveend", handleMoveEnd);
  for (const marker of markers) marker.remove();
  markers = [];
});
</script>

<style lang="scss" scoped>
.marker {
  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;

  .marker-tooltip {
    background-color: #262626;

    border-radius: 4px;

    overflow: hidden;

    display: flex;

    .tooltip-icon {
      height: 30px;
      width: 45px;
    }

    .tooltip-text {
      font-size: 14px;
      font-weight: 500;
      color: white;
      line-height: 1;
      font-family: "Inter", sans-serif;

      padding: 8px 16px;
    }
  }

  .marker-icon {
    height: 16px;
    width: 16px;

    margin-top: 16px;

    cursor: pointer;

    border-radius: 8px;

    background-color: #059669;

    box-shadow: 0 0 0 8px rgba(#059669, 0.25);
  }
}
</style>
