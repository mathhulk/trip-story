<template>
  <div v-if="open" class="tip-bar">
    <div class="tip-bar-button" @click="close">
      <FeatherIcon icon="x" />
    </div>

    <p class="tip-bar-text">Click on a marker to explore a location.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FeatherIcon from "@/components/FeatherIcon.vue";

const open = ref(true);

const close = () => {
  open.value = false;
};
</script>

<style lang="scss" scoped>
.tip-bar {
  border-radius: 4px;

  background-color: #262626;

  display: flex;

  position: absolute;

  bottom: 16px;
  left: 16px;

  padding: 8px 16px 8px 8px;

  align-items: center;

  .tip-bar-text {
    margin-left: 16px;

    line-height: 1;
    font-size: 14px;
    color: white;
  }

  .tip-bar-button {
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
</style>
