<template>
  <button
    class="text-[var(--color-link)] hover:underline"
    @click="$emit('click')"
  >
    View
  </button>
</template>

<script setup>
defineEmits(["click"]);
</script>
