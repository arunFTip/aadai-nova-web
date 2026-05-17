<template>
  <div class="flex items-center justify-end gap-3 pt-2">
    <slot name="left" />

    <router-link v-if="cancelTo" :to="cancelTo">
      <BaseButton type="button" variant="secondary">
        {{ cancelText }}
      </BaseButton>
    </router-link>

    <BaseButton :disabled="loading" :type="submitType">
      {{ loading ? loadingText : submitText }}
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },

  submitText: {
    type: String,
    default: "Save",
  },

  loadingText: {
    type: String,
    default: "Saving...",
  },

  cancelText: {
    type: String,
    default: "Cancel",
  },

  cancelTo: {
    type: String,
    default: "",
  },

  submitType: {
    type: String,
    default: "submit",
  },
});
</script>
