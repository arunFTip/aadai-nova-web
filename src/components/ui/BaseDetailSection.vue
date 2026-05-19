<template>
  <BaseCard>
    <div class="space-y-4">
      <div v-if="title || description">
        <h2 v-if="title" class="text-lg font-semibold">
          {{ title }}
        </h2>

        <p v-if="description" class="text-sm text-[var(--color-muted)]">
          {{ description }}
        </p>
      </div>

      <slot />
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "./BaseCard.vue";

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
