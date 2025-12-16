<template>
  <div class="menu-bar">
    <router-link to="/" class="menu-bar-button">
      <FeatherIcon icon="arrow-left" />
    </router-link>

    <router-link to="/countries" custom v-slot="{ navigate }">
      <div
        @click="() => navigate()"
        @keypress.enter="() => navigate()"
        role="link"
        class="menu-bar-button"
        :class="{ disabled }"
      >
        <FeatherIcon icon="map" />
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import FeatherIcon from "@/components/FeatherIcon.vue";

const route = useRoute();

const disabled = computed(() => {
  return route.name === "Countries";
});
</script>

<style lang="scss" scoped>
.menu-bar {
  border-radius: 4px;

  background-color: #262626;

  display: flex;

  position: absolute;

  top: 16px;
  left: 16px;

  padding: 8px;

  &.menu-tour {
    left: 120px;

    .menu-button:not(.disabled) {
      background-color: #3c3c3c;
    }
  }

  .menu-bar-button {
    height: 32px;
    width: 32px;

    color: #8d8d8d;

    display: grid;
    place-items: center;

    border-radius: 4px;

    transition: color 150ms ease;

    &.disabled {
      color: #3c3c3c;
    }

    &:not(.disabled) {
      background-color: rgba(white, 0.1);

      cursor: pointer;

      &:hover {
        color: white;
      }
    }

    &:first-child {
      margin-right: 8px;
    }
  }
}
</style>
