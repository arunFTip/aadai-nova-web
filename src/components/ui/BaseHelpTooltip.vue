<template>
  <div class="relative inline-block group">
    <button
      type="button"
      class="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-muted)] text-[10px] text-white"
    >
      ?
    </button>

    <div
      class="absolute left-6 top-0 z-50 hidden w-64 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-xs shadow-lg group-hover:block dark:bg-[var(--color-surface)]"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
