<template>
  <div
    class="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm"
  >
    <div v-if="title || description" class="mb-6">
      <h2 v-if="title" class="text-lg font-semibold">
        {{ title }}
      </h2>

      <p v-if="description" class="mt-1 text-sm text-[var(--color-muted)]">
        {{ description }}
      </p>
    </div>

    <div class="space-y-5">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },
});
</script>
