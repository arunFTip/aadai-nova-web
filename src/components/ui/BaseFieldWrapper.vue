<template>
  <div>
    <label
      v-if="label"
      class="mb-2 inline-flex items-center gap-1 font-semibold"
    >
      <span>
        {{ label }}
      </span>

      <span v-if="required" class="text-[var(--color-danger)]"> * </span>
      <BaseHelpTooltip v-if="help" :text="help" />
    </label>
    <slot />

    <p v-if="error" class="mt-1 text-sm text-[var(--color-danger)]">
      {{ error }}
    </p>

    <p v-else-if="hint" class="mt-1 text-xs text-[var(--color-muted)]">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import BaseHelpTooltip from "./BaseHelpTooltip.vue";
defineProps({
  label: {
    type: String,
    default: "",
  },

  error: {
    type: String,
    default: "",
  },
  help: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>
