<template>
  <div
    v-if="pagination && pagination.last_page > 1"
    class="flex items-center justify-between mt-4"
  >
    <p class="text-sm text-gray-600">
      Page {{ pagination.current_page }} of {{ pagination.last_page }}
    </p>

    <div class="flex gap-2">
      <BaseButton
        :disabled="pagination.current_page === 1"
        @click="$emit('change', pagination.current_page - 1)"
      >
        Previous
      </BaseButton>

      <BaseButton
        :disabled="pagination.current_page === pagination.last_page"
        @click="$emit('change', pagination.current_page + 1)"
      >
        Next
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";

defineProps({
  pagination: Object,
});

defineEmits(["change"]);
</script>
