<template>
  <BaseFieldWrapper :label="label" :error="error" :hint="hint">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </BaseFieldWrapper>
</template>

<script setup>
import BaseFieldWrapper from "./BaseFieldWrapper.vue";

defineProps({
  modelValue: {
    type: String,
    default: "",
  },

  label: {
    type: String,
    default: "",
  },

  placeholder: {
    type: String,
    default: "",
  },

  hint: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: 4,
  },
});

defineEmits(["update:modelValue"]);
</script>
