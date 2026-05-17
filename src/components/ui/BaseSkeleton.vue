<template>
  <div
    class="animate-pulse rounded-md bg-[var(--color-table-row-hover)]"
    :style="{
      width,
      height,
    }"
  />
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: "100%",
  },

  height: {
    type: String,
    default: "16px",
  },
});
</script>
