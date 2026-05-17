<template>
  <button
    class="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm hover:bg-[var(--color-table-row-hover)]"
    @click="$emit('click')"
  >
    🔄 Refresh
  </button>
</template>

<script setup>
defineEmits(["click"]);
</script>
