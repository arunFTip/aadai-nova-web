<template>
  <div>
    <label v-if="label" class="block text-sm font-medium mb-1">
      {{ label }}
    </label>

    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-input)] text-[var(--color-text)] placeholder:text-[var(--color-muted)]"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p v-if="error" class="text-sm text-[var(--color-danger)] mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
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
