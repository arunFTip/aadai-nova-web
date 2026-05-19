<template>
  <button :class="buttonClass" :type="type" :disabled="disabled">
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
  type: {
    type: String,
    default: "button",
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonClass = computed(() => [
  "px-4 py-2 rounded disabled:opacity-50",
  props.variant === "danger"
    ? "bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-white"
    : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-contrast)]",
]);
</script>
