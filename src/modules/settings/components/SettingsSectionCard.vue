<template>
  <BaseCard>
    <div class="mb-6">
      <h2 class="text-lg font-semibold">
        {{ title }}
      </h2>

      <p v-if="description" class="mt-1 text-sm text-[var(--color-muted)]">
        {{ description }}
      </p>
    </div>

    <div class="space-y-4">
      <slot />
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "../../../components/ui/BaseCard.vue";

defineProps({
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
