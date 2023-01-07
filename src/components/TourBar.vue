<template>
  <div class="tour-bar">
    <div v-show="tour" class="tour-bar-indicator" ref="indicator" @animationend="skipNext" />

    <img v-if="!tour" class="tour-bar-drawing" src="../assets/images/drawing.png">

    <div v-if="tour" class="tour-bar-button" @click="end(true)">
      <FeatherIcon icon="x" />
    </div>

    <div v-else class="tour-bar-button" @click="start">
      <FeatherIcon icon="play" />
    </div>

    <div class="tour-bar-button" :class="{ disabled: !tour || skipPreviousDisabled }" @click="skipPrevious">
      <FeatherIcon icon="skip-back" />
    </div>

    <div class="tour-bar-button" :class="{ disabled: !tour }" @click="togglePaused">
      <FeatherIcon :icon="icon" />
    </div>

    <div class="tour-bar-button" :class="{ disabled: !tour || skipNextDisabled }" @click="skipNext(true)">
      <FeatherIcon icon="skip-forward" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import FeatherIcon from "@/components/FeatherIcon.vue";
import countries from "@/countries.js";

const router = useRouter();
const route = useRoute();

const tour = ref(false);
const paused = ref(false);

const countryIndex = ref(null);
const cityIndex = ref(null);
const locationIndex = ref(null);

const indicator = ref(null);

const start = () => {
  tour.value = true;

  countryIndex.value = 0;
  cityIndex.value = 0;
  locationIndex.value = 0;

  updateRoute();
};

const icon = computed(() => {
  if (paused.value) return "play";
  return "pause";
});

const skipPreviousDisabled = computed(() => {
  return locationIndex.value === 0 && cityIndex.value === 0 && countryIndex.value === 0;
});

const skipNextDisabled = computed(() => {
  return locations.value.length === locationIndex.value + 1 && cities.value.length === cityIndex.value + 1 && countries.length === countryIndex.value + 1;
});

const cities = computed(() => {
  return countries[countryIndex.value].cities;
});

const locations = computed(() => {
  return cities.value[cityIndex.value].locations;
});

const skipNext = (user = true) => {
  if (!tour.value) return;

  if (skipNextDisabled.value) {
    if (!user) end(false);

    return;
  }
  
  if (locations.value.length === locationIndex.value + 1 && cities.value.length === cityIndex.value + 1) {
    countryIndex.value++;
    cityIndex.value = 0;
    locationIndex.value = 0;
  } else if (locations.value.length === locationIndex.value + 1) {
    cityIndex.value++;
    locationIndex.value = 0;
  } else {
    locationIndex.value++;
  }

  updateRoute();
};

const skipPrevious = () => {
  if (skipPreviousDisabled.value || !tour.value) return;
  
  if (locationIndex === 0 && cityIndex === 0) {
    countryIndex.value--;
    cityIndex.value = cities.value.length - 1;
    locationIndex.value = locations.value.length - 1;
  } else if (locationIndex === 0) {
    cityIndex.value--;
    locationIndex.value = locations.value.length - 1;
  } else {
    locationIndex.value--;
  }

  updateRoute();
};

const getIdentifiers = () => {
  const countryIdentifier = countries[countryIndex.value].title.toLowerCase();
  const cityIdentifier = cities.value[cityIndex.value].title.toLowerCase();
  const locationIdentifier = locations.value[locationIndex.value].title.toLowerCase();

  return { countryIdentifier, cityIdentifier, locationIdentifier };
};

const updateRoute = () => {
  const { countryIdentifier, cityIdentifier, locationIdentifier } = getIdentifiers();
  router.push("/countries/" + countryIdentifier + "/" + cityIdentifier + "/" + locationIdentifier);

  // Required for replaying an animation
  indicator.value.classList.remove("active");
  void indicator.value.offsetWidth;
  indicator.value.classList.add("active");

  indicator.value.style.animationDuration = "15s";
  indicator.value.style.animationPlayState = "running";

  paused.value = false;
};

const togglePaused = () => {
  indicator.value.style.animationPlayState = paused.value ? "running" : "paused";

  paused.value = !paused.value;
};

const end = (user) => {
  tour.value = false;
  paused.value = false;

  countryIndex.value = null;
  cityIndex.value = null;
  locationIndex.value = null;

  if (user) return;

  router.push("/countries");
};

watch(() => route.params, () => {
  if (!tour.value) return;

  const { country, city, location } = route.params;
  const { countryIdentifier, cityIdentifier, locationIdentifier } = getIdentifiers();

  if (countryIdentifier === country && cityIdentifier === city && locationIdentifier === location) return;

  end(true);
});
</script>

<style lang="scss" scoped>
.tour-bar {
  border-radius: 4px;

  background-color: #262626;

  display: flex;

  position: absolute;

  top: 16px;
  left: 120px;

  padding: 8px;

  .tour-bar-drawing {
    position: absolute;

    height: 32px;
    width: 128px;

    bottom: -40px;
    left: 24px;
  }

  @keyframes time {
    0% {
      width: 0%;
    }

    100% {
      width: 100%;
    }
  }

  .tour-bar-indicator {
    z-index: 1;

    height: 100%;

    background-color: black;

    position: absolute;

    border-radius: 4px;

    top: 0;
    left: 0;

    &.active {
      animation: time;
      animation-iteration-count: 1;
      animation-timing-function: linear;
    }
  }

  .tour-bar-button {
    height: 32px;
    width: 32px;

    z-index: 2;

    color: #8d8d8d;

    display: grid;
    place-items: center;

    border-radius: 4px;

    transition: color 150ms ease;

    &.disabled {
      color: #3C3C3C;
    }

    &:not(.disabled) {
      background-color: #3C3C3C;

      cursor: pointer;
      
      &:hover {
        color: white;
      }
    }

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>