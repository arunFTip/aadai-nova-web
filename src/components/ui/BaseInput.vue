<template>
  <BaseFieldWrapper :label="label" :error="error" :hint="hint">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full rounded border border-[var(--color-border)] bg-[var(--color-input)] px-4 py-2 text-[var(--color-text)] placeholder:text-[var(--color-muted)]"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </BaseFieldWrapper>
</template>

<script setup>
import BaseFieldWrapper from "./BaseFieldWrapper.vue";

defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  error: String,
});

defineEmits(["update:modelValue"]);
</script>
