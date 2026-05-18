<template>
  <BaseFieldWrapper :label="label" :error="error" :hint="hint">
    <select
      :value="modelValue"
      class="h-11 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 text-sm outline-none focus:border-[var(--color-primary)]"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </BaseFieldWrapper>
</template>

<script setup>
import BaseFieldWrapper from "./BaseFieldWrapper.vue";

defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },

  options: {
    type: Array,
    default: () => [],
  },

  label: {
    type: String,
    default: "",
  },

  error: {
    type: String,
    default: "",
  },

  hint: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>
