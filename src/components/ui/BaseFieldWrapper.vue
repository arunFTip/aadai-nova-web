<template>
  <div>
    <label v-if="label" class="mb-2 block font-semibold">
      {{ label }}
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
defineProps({
  label: {
    type: String,
    default: "",
  },

  error: {
    type: String,
    default: "",
  },

  hint: {
    type: String,
    default: "",
  },
});
</script>
