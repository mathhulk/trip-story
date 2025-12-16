<template>
  <slot />
</template>

<script setup lang="ts">
import { mapKey } from "@/lib/map";
import type { Map } from "mapbox-gl";
import { provide } from "vue";

interface Props {
  map: Map;
}

const props = defineProps<Props>();

provide(mapKey, props.map);
</script>
