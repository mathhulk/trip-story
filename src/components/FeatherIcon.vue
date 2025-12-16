<template>
  <div class="feather-icon" v-html="html" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import feather, { type FeatherIconNames } from "feather-icons";

interface Props {
  icon: FeatherIconNames;
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
}

const props = defineProps<Props>();

const html = computed(() => {
  return feather.icons[props.icon].toSvg({
    width: props.width ?? 16,
    height: props.height ?? 16,
    color: props.color ?? "currentColor",
    fill: props.fill ?? "none",
  });
});
</script>
