<template>
  <div class="feather-icon" v-html="html" />
</template>

<script setup>
import { computed } from "vue";
import feather from "feather-icons";

const props = defineProps({
  icon: {
    type: String,
    required: true
  },

  width: {
    type: Number,
    default: 16
  },

  height: {
    type: Number,
    default: 16
  },

  color: {
    type: String,
    default: "currentColor"
  },
  
  fill: {
    type: String,
    default: "none"
  }
});

const html = computed(() => {
  return feather.icons[props.icon].toSvg({ width: props.width, height: props.height, color: props.color, fill: props.fill });
});
</script>
