<template>
  <BaseModal :show="show" :title="title" :size="size" @close="$emit('close')">
    <slot />

    <template #footer>
      <div class="flex justify-end">
        <button
          class="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "./BaseModal.vue";

defineProps({
  show: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: "",
  },

  size: {
    type: String,
    default: "md",
  },
});

defineEmits(["close"]);
</script>
