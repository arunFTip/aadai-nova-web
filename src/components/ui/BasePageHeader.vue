<template>
  <div
    class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
  >
    <div>
      <h1 class="text-2xl font-bold">
        {{ title }}
      </h1>

      <p v-if="subtitle" class="mt-1 text-sm text-[var(--color-muted)]">
        {{ subtitle }}
      </p>
    </div>

    <div class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  subtitle: {
    type: String,
    default: "",
  },
});
</script>
