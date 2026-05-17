<template>
  <section class="space-y-4">
    <div v-if="title || description" class="flex items-center justify-between">
      <div>
        <h2 v-if="title" class="text-lg font-semibold">
          {{ title }}
        </h2>

        <p v-if="description" class="mt-1 text-sm text-[var(--color-muted)]">
          {{ description }}
        </p>
      </div>

      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>

    <div>
      <slot />
    </div>
  </section>
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
