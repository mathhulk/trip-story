<template>
  <!-- To-do: Mobile compatibility -->
  <div id="map" />

  <template v-if="active">
    <TipBar />
    <TourBar />
    <MenuBar />
  </template>

  <div v-if="loading || !map" class="loading">
    <div class="loading-icon" />
    <p class="loading-text">Loading...</p>
  </div>

  <MapProvider v-else :map="map">
    <router-view />
  </MapProvider>
</template>

<script setup lang="ts">
import { Map } from "mapbox-gl";
import { onMounted, ref, computed, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import MapProvider from "@/components/MapProvider.vue";
import MenuBar from "@/components/MenuBar.vue";
import TipBar from "@/components/TipBar.vue";
import TourBar from "@/components/TourBar.vue";

const route = useRoute();

let map: Map | undefined;

const loading = ref(true);

const active = computed(() => {
  return route.name !== "Trip";
});

onMounted(() => {
  map = new Map({
    container: "map",
    style: "mapbox://styles/mathhulk/clbznbvgs000314k8gtwa9q60",
    attributionControl: false,
    center: [-120.153851, 37.298538],
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    zoom: 5,
  });

  map.on("load", () => {
    loading.value = false;
  });
});

onUnmounted(() => {
  map?.remove();
});
</script>

<style lang="scss">
#map {
  height: 100vh;
  width: 100vw;
}

a {
  text-decoration: none;
}

// Disable Mapbox attribution
.mapboxgl-ctrl a.mapboxgl-ctrl-logo {
  display: none;
}

body {
  font-family: "Inter", sans-serif;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(120deg);
  }
  75% {
    transform: rotate(240deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  height: 100vh;
  width: 100vw;

  z-index: 999;

  position: fixed;

  background-color: white;

  display: flex;
  align-items: center;

  padding: 0 32px;

  left: 0;
  top: 0;

  .loading-icon {
    height: 32px;
    width: 32px;

    border-radius: 4px;

    background-color: #262626;

    margin-right: 16px;

    display: grid;
    place-items: center;

    &::before {
      content: "";

      height: 16px;
      width: 16px;

      border-radius: 50%;
      border-style: solid;
      border-width: 2px;
      border-color: transparent white white white;

      animation: spin 500ms linear infinite;
    }
  }

  p.loading-text {
    font-size: 16px;
    font-weight: 500;
    color: #262626;
  }
}
</style>
