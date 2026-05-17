<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  >
    <div
      class="w-full max-w-md rounded-xl bg-[var(--color-card)] p-6 shadow-xl"
    >
      <h2 class="text-lg font-semibold">
        {{ title }}
      </h2>

      <p class="mt-2 text-sm text-[var(--color-muted)]">
        {{ message }}
      </p>

      <div class="mt-6 flex justify-end gap-3">
        <button
          class="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm"
          @click="$emit('cancel')"
        >
          Cancel
        </button>

        <button
          class="rounded-lg bg-[var(--color-danger)] px-4 py-2 text-sm text-white"
          @click="$emit('confirm')"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
});

defineEmits(["cancel", "confirm"]);
</script>
