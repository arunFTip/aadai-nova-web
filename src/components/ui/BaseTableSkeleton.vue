<template>
  <div class="space-y-3">
    <div
      v-for="row in rows"
      :key="row"
      class="grid gap-4"
      :style="{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }"
    >
      <BaseSkeleton v-for="column in columns" :key="column" height="20px" />
    </div>
  </div>
</template>

<script setup>
import BaseSkeleton from "./BaseSkeleton.vue";

defineProps({
  rows: {
    type: Number,
    default: 5,
  },

  columns: {
    type: Number,
    default: 4,
  },
});
</script>
