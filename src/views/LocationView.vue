<template>
  <div class="overlay" />

  <div class="side-bar">
    <CountryMenu :country="country" />

    <CityMenu :country="country" :city="city" />

    <div class="side-bar-menu">
      <div class="menu-text">
        <p class="menu-title">{{ location.title }}</p>
        <p class="menu-description">{{ location.description || "Location" }}</p>
      </div>

      <div class="menu-button" @click="copy">
        <FeatherIcon icon="link" />
      </div>
    </div>

    <div v-if="location.cover" class="side-bar-cover">
      <img :src="getImage(location.cover)">
    </div>

    <div class="side-bar-container">
      <div v-for="image in location.images" class="container-picture">
        <img :src="getImage(image)">
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import FeatherIcon from "@/components/FeatherIcon.vue";
import CountryMenu from "@/components/CountryMenu.vue";
import CityMenu from "@/components/CityMenu.vue";
import countries from "@/countries";
import mapboxgl from "mapbox-gl";

const props = defineProps([ "country", "city", "location", "map" ]);

let marker;

let country;
let city;
let location;

const updateLocation = () => {
  if (country?.title.toLowerCase() !== props.country) country = countries.find(country => country.title.toLowerCase() === props.country);
  if (!country) return router.push("/countries");

  if (city?.title.toLowerCase() !== props.city) city = country.cities.find(city => city.title.toLowerCase() === props.city);
  if (!city) return router.push("/countries/" + country);

  location = city.locations.find(location => location.title.toLowerCase() === props.location);
  if (!location) return router.push("/countries/" + country + "/" + city);
};

const getImage = (image) => {
  return new URL(`../assets/images/locations/${image}.jpg`, import.meta.url).href;
};

const copy = () => navigator.clipboard.writeText(window.location.href);

const handleMoveEnd = (event) => {
  if (event.view !== location.title) return;
  
  marker = new mapboxgl.Marker({ 
    color: "#2d2d2d",
    anchor: "center",
    offset: [ 0, 0 ]
  })
    .setLngLat(location.center)
    .addTo(props.map);
};

const enter = () => {
  props.map.on("moveend", handleMoveEnd);
  props.map.setStyle("mapbox://styles/mathhulk/clcb14wmh00ac14s84f2zg7fn");

  const options = {
    duration: 2500,
    zoom: 18,
    pitch: 50,
    center: location.center,
    // To-do: Fix additive padding bug in Mapbox GL JS
    padding: { left: 0, right: 400, top: 0, bottom: 0 }
  };

  props.map.flyTo(options, { view: location.title });
};

const exit = () => {
  props.map.off("moveend", handleMoveEnd);

  if (marker) marker.remove();
};

onMounted(enter);
onUnmounted(exit);

watch(() => props.location, () => {
  updateLocation();
  exit();
  enter();
});

updateLocation();
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;

  top: 0;
  right: 0;

  width: 768px;
  height: 100%;

  background: linear-gradient(to left, #E5E3CD 384px, transparent);
}

.side-bar {
  position: absolute;

  padding: 16px 16px 16px 40px;

  top: 0;
  right: 0;

  width: 440px;
  max-height: 100vh;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  > :not(:first-child) {
    margin-top: 8px;
  }

  .side-bar-cover {
    aspect-ratio: 16 / 9;

    img {
      object-fit: cover;

      height: 100%;
      width: 100%;

      border-radius: 4px;
    }
  }

  .side-bar-container {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;

    .container-picture {
      aspect-ratio: 9 / 16;

      width: calc(50% - 4px);

      &:not(:last-child):nth-child(odd) {
        margin-right: 8px;
      }

      &:nth-child(n + 3) {
        margin-top: 8px;
      }

      img {
        object-fit: cover;

        height: 100%;

        border-radius: 4px;
      }
    }
  }

  .side-bar-menu {
    position: relative;

    background-color: #2d2d2d;

    padding: 8px 8px 8px 16px;

    border-radius: 4px;

    display: flex;
    align-items: center;

    &::before {
      height: 16px;
      width: 16px;

      position: absolute;

      top: 16px;
      left: -32px;

      content: "";

      border-radius: 8px;

      background-color: #9333ea;

      box-shadow: 0 0 0 8px rgba(#9333ea, 0.25);
    }

    .menu-text {
      line-height: 1;

      flex-grow: 1;

      p.menu-title {
        font-size: 14px;
        font-weight: 500;
        color: white;

        margin-bottom: 2px;
      }

      p.menu-description {
        font-size: 12px;
        color: rgba(white, 0.5);
      }
    }

    .menu-button {
      height: 32px;
      width: 32px;

      background-color: rgba(white, 0.1);

      color: #8d8d8d;

      cursor: pointer;

      display: grid;
      place-items: center;

      border-radius: 4px;

      transition: color 150ms ease;

      &:hover {
        color: white;
      }

      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}
</style>