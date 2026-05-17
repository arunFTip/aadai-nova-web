<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
    :style="badgeStyle"
  >
    <slot />
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
});

const badgeStyle = computed(() => {
  switch (props.type) {
    case "success":
      return {
        backgroundColor: "var(--color-success-bg)",
        color: "var(--color-success-text)",
      };

    case "danger":
      return {
        backgroundColor: "var(--color-danger-bg)",
        color: "var(--color-danger-text)",
      };

    case "warning":
      return {
        backgroundColor: "var(--color-warning-bg)",
        color: "var(--color-warning-text)",
      };

    case "info":
      return {
        backgroundColor: "var(--color-info-bg)",
        color: "var(--color-info-text)",
      };

    default:
      return {
        backgroundColor: "var(--color-badge-bg)",
        color: "var(--color-badge-text)",
      };
  }
});
</script>
