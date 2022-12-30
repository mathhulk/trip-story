<template>
  <div id="map" />

  <div v-if="active && open" class="tip">
    <div class="tip-button" @click="close">
      <FeatherIcon icon="x" />
    </div>

    <p class="tip-text">Click on a marker to explore a location.</p>
  </div>

  <div v-if="active" class="menu">
    <router-link to="/" class="menu-button">
      <FeatherIcon icon="arrow-left" />
    </router-link>

    <router-link to="/countries" class="menu-button" :class="{ disabled }">
      <FeatherIcon icon="map" />
    </router-link>
  </div>

  <div v-if="loading" class="loading">
    <div class="loading-icon" />

    <p class="loading-text">Loading...</p>
  </div>
  
  <router-view v-else :map="map" />
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import FeatherIcon from "./components/FeatherIcon.vue";

mapboxgl.accessToken = "pk.eyJ1IjoibWF0aGh1bGsiLCJhIjoiY2t6bTFhcDU2M2prOTJwa3VwcTJ2d2dpMiJ9.WEJWEP_qrKGXkYOgbIsaGg";

const map = ref(null);
const loading = ref(true);
const open = ref(true);

const route = useRoute();

const active = computed(() => {
  return route.name !== "Trip";
});

const disabled = computed(() => {
  return route.name === "Countries";
});

const close = () => {
  open.value = false;
};

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mathhulk/clbznbvgs000314k8gtwa9q60",
    attributionControl: false,
    center: [ -120.153851, 37.298538 ],
    zoom: 5
  });

  map.value.on("load", () => {
    loading.value = false;
  });
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

.tip, .menu {
  border-radius: 4px;

  background-color: #262626;

  display: flex;

  position: absolute;
}

.tip {
  bottom: 16px;
  left: 16px;

  padding: 8px 16px 8px 8px;

  align-items: center;

  .tip-icon {
    height: 32px;
    width: 32px;

    color: white;

    display: grid;
    place-items: center;
  }

  .tip-text {
    margin-left: 16px;

    line-height: 1;
    font-size: 14px;
    color: white;
  }

  .tip-button {
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
  }
}

.menu {
  top: 16px;
  left: 16px;

  padding: 8px;

  .menu-button {
    height: 32px;
    width: 32px;

    color: #8d8d8d;

    cursor: pointer;

    display: grid;
    place-items: center;

    border-radius: 4px;

    transition: color 150ms ease;

    &.disabled {
      color: #3C3C3C;
    }

    &:not(.disabled) {
      background-color: rgba(white, 0.1);
      
      &:hover {
        color: white;
      }
    }

    &:first-child {
      margin-right: 8px;
    }
  }
}

.loading {
  height: 100vh;
  width: 100vw;

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
