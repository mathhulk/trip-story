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

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import CountryMenu from "@/components/CountryMenu.vue";
import { countries, type Country } from "@/lib/countries";
import mapboxgl, {
  Event,
  Marker,
  type EasingOptions,
  type LngLatBoundsLike,
} from "mapbox-gl";
import useMap from "@/composables/useMap";

interface Props {
  country: string;
}

const props = defineProps<Props>();

const map = useMap();
const router = useRouter();

let markers: Marker[] = [];

// To-do: Is there a better way to organize this component..?
const active = ref(false);
const templates = ref([]);

const country = computed(() => {
  return countries.find(
    (country) => country.title.toLowerCase() === props.country
  ) as Country;
});

const handleMoveEnd = (event: Event & { view?: string }) => {
  if (event.view !== country.value.title) return;

  active.value = true;

  for (const cityIndex in country.value.cities) {
    const { center, reverse } = country.value.cities[cityIndex]!;

    const marker = new mapboxgl.Marker({
      element: templates.value[cityIndex],
      // Disable panning
      draggable: true,
      anchor: reverse ? "top" : "bottom",
      offset: [16, reverse ? 8 : 24],
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
  const cityIdentifier = title.toLowerCase();
  router.push("/countries/" + countryIdentifier + "/" + cityIdentifier);
};

const getMarkerClass = (reverse?: boolean) => {
  return { "marker-reverse": reverse };
};

// To-do: Use map.jumpTo for initial page load and prefers-reduced-motion
const enter = () => {
  map.on("moveend", handleMoveEnd);

  map.setStyle("mapbox://styles/mathhulk/clbznbvgs000314k8gtwa9q60");

  const options: EasingOptions = {
    duration: 2500,
    pitch: 0,
    // To-do: Fix additive padding bug in Mapbox GL JS
    padding: { left: 128, right: 128, top: 0, bottom: 0 },
  };

  // fitBounds seems to hang when a single point was supplied or
  // the LngLat includes too many numbers after the decimal..?
  if (country.value.cities.length === 1) {
    options.center = country.value.cities[0]!.center;
    options.zoom = 7;

    map.flyTo(options, { view: country.value.title });

    return;
  }

  let xMinimum = Infinity;
  let xMaximum = -Infinity;
  let yMinimum = Infinity;
  let yMaximum = -Infinity;

  for (const cityIndex in country.value.cities) {
    const [longitude, latitude] = country.value.cities[cityIndex]!.center;

    xMinimum = xMinimum < longitude ? xMinimum : longitude;
    xMaximum = xMaximum > longitude ? xMaximum : longitude;
    yMinimum = yMinimum < latitude ? yMinimum : latitude;
    yMaximum = yMaximum > latitude ? yMaximum : latitude;
  }

  const bounds: LngLatBoundsLike = [
    [xMinimum, yMinimum],
    [xMaximum, yMaximum],
  ];

  options.maxZoom = 7;

  map.fitBounds(bounds, options, { view: country.value.title });
};

const exit = () => {
  map.off("moveend", handleMoveEnd);
  for (const marker of markers) marker.remove();
  markers = [];
};

onMounted(enter);
onUnmounted(exit);

watch(
  () => props.country,
  () => {
    exit();
    nextTick(enter);
  }
);
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
