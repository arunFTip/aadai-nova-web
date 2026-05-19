<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div
      v-for="item in items"
      :key="item.label"
      class="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4"
    >
      <p class="text-xs font-medium uppercase text-[var(--color-muted)]">
        {{ item.label }}
      </p>

      <div class="mt-2 text-sm font-medium">
        <slot :name="item.key" :item="item">
          {{ item.value || "-" }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
