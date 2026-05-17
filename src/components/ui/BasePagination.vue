<template>
  <div
    v-if="meta"
    class="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
  >
    <div class="text-sm text-[var(--color-muted)]">
      Showing
      <strong>{{ meta.from }}</strong>
      to
      <strong>{{ meta.to }}</strong>
      of
      <strong>{{ meta.total }}</strong>
      results
    </div>

    <div class="flex items-center gap-3">
      <select
        :value="perPage"
        class="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
        @change="$emit('update:perPage', Number($event.target.value))"
      >
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="h-10 rounded-lg border border-[var(--color-border)] px-4 text-sm disabled:opacity-50"
          :disabled="meta.current_page === 1"
          @click="$emit('change', meta.current_page - 1)"
        >
          Previous
        </button>

        <div class="text-sm">
          Page {{ meta.current_page }} of {{ meta.last_page }}
        </div>

        <button
          type="button"
          class="h-10 rounded-lg border border-[var(--color-border)] px-4 text-sm disabled:opacity-50"
          :disabled="meta.current_page === meta.last_page"
          @click="$emit('change', meta.current_page + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  meta: {
    type: Object,
    required: true,
  },
  perPage: {
    type: Number,
    default: 10,
  },
});

defineEmits(["change", "update:perPage"]);
</script>
