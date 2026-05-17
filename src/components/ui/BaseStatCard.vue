<template>
  <div
    class="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm"
  >
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm text-[var(--color-muted)]">
          {{ title }}
        </p>

        <h3 class="mt-2 text-3xl font-bold">
          {{ value }}
        </h3>

        <p v-if="description" class="mt-2 text-sm text-[var(--color-muted)]">
          {{ description }}
        </p>
      </div>

      <div
        v-if="icon"
        class="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-table-row-hover)] text-2xl"
      >
        {{ icon }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  value: {
    type: [String, Number],
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  icon: {
    type: String,
    default: "",
  },
});
</script>
