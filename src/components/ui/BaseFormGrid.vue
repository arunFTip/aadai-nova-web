<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  columns: {
    type: Number,
    default: 2,
  },
});

const gridClass = computed(() => {
  const map = {
    1: "grid grid-cols-1 gap-4",
    2: "grid grid-cols-1 gap-4 md:grid-cols-2",
    3: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
    4: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4",
  };

  return map[props.columns] || map[2];
});
</script>
