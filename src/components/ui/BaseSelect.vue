<template>
  <select
    :value="modelValue"
    class="h-11 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 text-sm outline-none focus:border-[var(--color-primary)]"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },

  options: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["update:modelValue"]);
</script>
