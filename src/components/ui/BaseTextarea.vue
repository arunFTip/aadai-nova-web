<template>
  <div>
    <label v-if="label" class="mb-2 block font-semibold">
      {{ label }}
    </label>

    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p v-if="hint" class="mt-1 text-xs text-[var(--color-muted)]">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
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

  rows: {
    type: Number,
    default: 4,
  },
});

defineEmits(["update:modelValue"]);
</script>
