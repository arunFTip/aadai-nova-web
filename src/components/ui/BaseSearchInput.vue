<template>
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--color-muted)]"
    >
      🔍
    </div>

    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="h-11 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] pl-10 pr-10 text-sm outline-none focus:border-[var(--color-primary)]"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <button
      v-if="modelValue"
      type="button"
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-muted)]"
      @click="$emit('update:modelValue', '')"
    >
      ✕
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },

  placeholder: {
    type: String,
    default: "Search...",
  },
});

defineEmits(["update:modelValue"]);
</script>
