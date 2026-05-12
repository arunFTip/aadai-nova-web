<template>
  <button :class="buttonClass" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "primary",
  },
});

const buttonClass = computed(() => [
  "px-4 py-2 rounded text-white disabled:opacity-50",
  props.variant === "danger"
    ? "bg-red-600 hover:bg-red-700"
    : "bg-gray-900 hover:bg-gray-800",
]);
</script>
