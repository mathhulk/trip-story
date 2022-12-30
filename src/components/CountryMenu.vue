<template>
  <div class="country-menu">
    <div class="country-menu-icon" :style="country.style" />

    <div class="country-menu-text">
      <p class="country-menu-title">{{ country.title }}</p>
      <p class="country-menu-description">Country</p>
    </div>

    <div v-if="active" class="country-menu-button" @click="copy">
      <FeatherIcon icon="link" />
    </div>

    <div v-else class="country-menu-button" @click="push">
      <FeatherIcon icon="map-pin" />
    </div>
  </div>
</template>

<script setup>
import FeatherIcon from "./FeatherIcon.vue";
import { useRouter } from "vue-router";

const props = defineProps([ "country", "active" ]);

const router = useRouter();

const push = () => {
  const countryIdentifier = props.country.title.toLowerCase();
  router.push("/countries/" + countryIdentifier);
};

const copy = () => navigator.clipboard.writeText(window.location.href);
</script>

<style lang="scss" scoped>
.country-menu {
  position: relative;

  background-color: #2d2d2d;

  padding-right: 8px;

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

    background-color: #059669;

    box-shadow: 0 0 0 8px rgba(#059669, 0.25);
  }

  .country-menu-icon {
    height: 48px;
    width: 72px;

    border-radius: 4px 0 0 4px;
  }

  .country-menu-text {
    line-height: 1;

    flex-grow: 1;

    padding: 0 16px;

    p.country-menu-title {
      font-size: 14px;
      font-weight: 500;
      color: white;

      margin-bottom: 2px;
    }

    p.country-menu-description {
      font-size: 12px;
      color: rgba(white, 0.5);
    }
  }

  .country-menu-button {
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
