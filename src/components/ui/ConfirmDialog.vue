<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div
      class="bg-[var(--color-card)] text-[var(--color-text)] rounded-lg p-6 w-full max-w-md border border-[var(--color-border)] shadow-[var(--shadow-card)]"
    >
      <h2 class="text-xl font-semibold mb-4">
        {{ title }}
      </h2>

      <p class="text-[var(--color-muted)] mb-6">
        {{ message }}
      </p>

      <div class="flex justify-end gap-3">
        <BaseButton @click="$emit('cancel')"> Cancel </BaseButton>

        <BaseButton variant="danger" @click="$emit('confirm')">
          Confirm
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";

defineProps({
  show: Boolean,
  title: String,
  message: String,
});

defineEmits(["confirm", "cancel"]);
</script>
