<template>
  <div
    v-if="loadingStore.loading"
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]"
  >
    <div
      class="bg-[var(--color-card)] text-[var(--color-text)] px-6 py-4 rounded-lg shadow border border-[var(--color-border)]"
    >
      Loading...
    </div>
  </div>
</template>

<script setup>
import { useLoadingStore } from "../../stores/loading";

const loadingStore = useLoadingStore();
</script>
