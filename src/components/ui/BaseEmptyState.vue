<template>
  <div
    class="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-12 text-center"
  >
    <div
      class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-table-row-hover)] text-3xl"
    >
      {{ icon }}
    </div>

    <h3 class="text-lg font-semibold">
      {{ title }}
    </h3>

    <p
      v-if="description"
      class="mt-2 max-w-md text-sm text-[var(--color-muted)]"
    >
      {{ description }}
    </p>

    <div v-if="$slots.actions" class="mt-6">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: "📄",
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },
});
</script>
