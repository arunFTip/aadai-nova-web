<template>
  <BaseModal :show="show" :title="title" size="sm" @close="$emit('cancel')">
    <p class="text-sm text-[var(--color-muted)]">
      {{ message }}
    </p>

    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          class="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm"
          @click="$emit('cancel')"
        >
          Cancel
        </button>

        <button
          class="rounded-lg bg-[var(--color-danger)] px-4 py-2 text-sm text-white disabled:opacity-50"
          :disabled="loading"
          @click="$emit('confirm')"
        >
          {{ loading ? "Processing..." : "Confirm" }}
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
    default: "Confirm Action",
  },

  message: {
    type: String,
    default: "Are you sure?",
  },

  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["cancel", "confirm"]);
</script>
