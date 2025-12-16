<template>
  <img v-if="!tour" class="tour-tip" src="../assets/images/drawing.png" />

  <div class="tour-bar">
    <div
      v-show="tour"
      class="tour-bar-indicator"
      ref="indicator"
      @animationend="() => skipNext()"
    />

    <div v-if="tour" class="tour-bar-button" @click="end(true)">
      <FeatherIcon icon="x" />
    </div>

    <div v-else class="tour-bar-button" @click="start">
      <FeatherIcon icon="play" />
    </div>

    <div
      class="tour-bar-button"
      :class="{ disabled: !tour || skipPreviousDisabled }"
      @click="() => skipPrevious()"
    >
      <FeatherIcon icon="skip-back" />
    </div>

    <div
      class="tour-bar-button"
      :class="{ disabled: !tour }"
      @click="() => togglePaused()"
    >
      <FeatherIcon :icon="icon" />
    </div>

    <div
      class="tour-bar-button"
      :class="{ disabled: !tour || skipNextDisabled }"
      @click="() => skipNext(true)"
    >
      <FeatherIcon icon="skip-forward" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import FeatherIcon from "@/components/FeatherIcon.vue";
import { countries } from "@/lib/countries";

const router = useRouter();
const route = useRoute();

const tour = ref(false);
const paused = ref(false);

const countryIndex = ref<number | null>(null);
const cityIndex = ref<number | null>(null);
const locationIndex = ref<number | null>(null);

const indicator = ref<HTMLDivElement | null>(null);

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
  return (
    locationIndex.value === 0 &&
    cityIndex.value === 0 &&
    countryIndex.value === 0
  );
});

const skipNextDisabled = computed(() => {
  if (
    countryIndex.value === null ||
    cityIndex.value === null ||
    locationIndex.value === null
  )
    return true;

  return (
    locations.value.length === locationIndex.value + 1 &&
    cities.value.length === cityIndex.value + 1 &&
    countries.length === countryIndex.value + 1
  );
});

const cities = computed(() => {
  if (countryIndex.value === null) return [];
  return countries[countryIndex.value]?.cities ?? [];
});

const locations = computed(() => {
  if (cityIndex.value === null) return [];
  return cities.value[cityIndex.value]?.locations ?? [];
});

const skipNext = (user = true) => {
  if (!tour.value) return;

  if (skipNextDisabled.value) {
    if (!user) end(false);

    return;
  }

  if (
    countryIndex.value === null ||
    cityIndex.value === null ||
    locationIndex.value === null
  )
    return;

  if (
    locations.value.length === locationIndex.value + 1 &&
    cities.value.length === cityIndex.value + 1
  ) {
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

  if (
    locationIndex.value === null ||
    cityIndex.value === null ||
    countryIndex.value === null
  )
    return;

  if (locationIndex.value === 0 && cityIndex.value === 0) {
    countryIndex.value--;
    cityIndex.value = cities.value.length - 1;
    locationIndex.value = locations.value.length - 1;
  } else if (locationIndex.value === 0) {
    cityIndex.value--;
    locationIndex.value = locations.value.length - 1;
  } else {
    locationIndex.value--;
  }

  updateRoute();
};

const getIdentifiers = () => {
  if (
    countryIndex.value === null ||
    cityIndex.value === null ||
    locationIndex.value === null ||
    !countries[countryIndex.value] ||
    !cities.value[cityIndex.value] ||
    !locations.value[locationIndex.value]
  )
    return;

  const countryIdentifier = countries[countryIndex.value]!.title.toLowerCase();
  const cityIdentifier = cities.value[cityIndex.value]!.title.toLowerCase();
  const locationIdentifier =
    locations.value[locationIndex.value]!.title.toLowerCase();

  return {
    country: countryIdentifier,
    city: cityIdentifier,
    location: locationIdentifier,
  };
};

const updateRoute = () => {
  if (!indicator.value) return;

  const identifiers = getIdentifiers();
  if (!identifiers) return;

  router.push(
    "/countries/" +
      identifiers.country +
      "/" +
      identifiers.city +
      "/" +
      identifiers.location
  );

  // Required for replaying an animation
  indicator.value.classList.remove("active");
  void indicator.value.offsetWidth;
  indicator.value.classList.add("active");

  indicator.value.style.animationDuration = "15s";
  indicator.value.style.animationPlayState = "running";

  paused.value = false;
};

const togglePaused = () => {
  if (!indicator.value) return;

  indicator.value.style.animationPlayState = paused.value
    ? "running"
    : "paused";

  paused.value = !paused.value;
};

const end = (user: boolean) => {
  tour.value = false;
  paused.value = false;

  countryIndex.value = null;
  cityIndex.value = null;
  locationIndex.value = null;

  if (user) return;

  router.push("/countries");
};

watch(
  () => route.params,
  () => {
    if (!tour.value) return;

    const { country, city, location } = route.params;

    const identifiers = getIdentifiers();
    if (!identifiers) return;

    if (
      identifiers.country === country &&
      identifiers.city === city &&
      identifiers.location === location
    )
      return;

    end(true);
  }
);
</script>

<style lang="scss" scoped>
.tour-tip {
  position: absolute;

  height: 32px;
  width: 128px;

  top: 72px;
  left: 144px;
}

.tour-bar {
  border-radius: 4px;

  background-color: #262626;

  display: flex;

  position: absolute;

  overflow: hidden;

  top: 16px;
  left: 120px;

  padding: 8px;

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
      color: #3c3c3c;
    }

    &:not(.disabled) {
      background-color: #3c3c3c;

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
