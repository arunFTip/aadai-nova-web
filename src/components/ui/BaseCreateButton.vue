<template>
  <router-link :to="to">
    <button
      class="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-primary-contrast)] hover:opacity-90"
    >
      ➕ {{ label }}
    </button>
  </router-link>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    default: "Create",
  },
});
</script>
