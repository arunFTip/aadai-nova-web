<template>
  <label class="flex items-center gap-3">
    <input
      :checked="modelValue"
      type="checkbox"
      class="h-4 w-4 rounded border-[var(--color-border)]"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <span class="text-sm font-medium">
      {{ label }}
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>
