<template>
  <div class="city-menu">
    <div class="city-menu-text">
      <p class="city-menu-title">{{ city.title }}</p>
      <p class="city-menu-description">City</p>
    </div>

    <div v-if="active" class="city-menu-button" @click="copy">
      <FeatherIcon icon="link" />
    </div>

    <div v-else class="city-menu-button" @click="push">
      <FeatherIcon icon="map-pin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { City, Country } from "@/lib/countries";
import FeatherIcon from "./FeatherIcon.vue";
import { useRouter } from "vue-router";

interface Props {
  country: Country;
  city: City;
  active?: boolean;
}

const props = defineProps<Props>();

const router = useRouter();

const push = () => {
  const countryIdentifier = props.country.title.toLowerCase();
  const cityIdentifier = props.city.title.toLowerCase();
  router.push("/countries/" + countryIdentifier + "/" + cityIdentifier);
};

const copy = () => navigator.clipboard.writeText(window.location.href);
</script>

<style lang="scss" scoped>
.city-menu {
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

    background-color: #2563eb;

    box-shadow: 0 0 0 8px rgba(#2563eb, 0.25);
  }

  .city-menu-text {
    line-height: 1;

    flex-grow: 1;

    p.city-menu-title {
      font-size: 14px;
      font-weight: 500;
      color: white;

      margin-bottom: 2px;
    }

    p.city-menu-description {
      font-size: 12px;
      color: rgba(white, 0.5);
    }
  }

  .city-menu-button {
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
</style>
