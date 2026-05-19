<template>
  <BaseFieldWrapper
    :label="label"
    :error="error"
    :hint="hint"
    :required="required"
  >
    <div class="relative">
      <input
        v-model="search"
        type="text"
        :placeholder="placeholder"
        class="h-11 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 pr-10 text-sm outline-none focus:border-[var(--color-primary)]"
        @focus="open = true"
        @input="open = true"
      />

      <button
        v-if="modelValue"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-muted)] hover:text-[var(--color-danger)]"
        @click="clear"
      >
        ✕
      </button>

      <div
        v-if="open"
        class="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg"
      >
        <button
          v-for="option in filteredOptions"
          :key="option.value"
          type="button"
          class="block w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-table-row-hover)]"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </button>

        <div
          v-if="filteredOptions.length === 0"
          class="px-4 py-3 text-sm text-[var(--color-muted)]"
        >
          No options found
        </div>
      </div>
    </div>
  </BaseFieldWrapper>
</template>

<script setup>
import { computed, ref, watch } from "vue";

import BaseFieldWrapper from "./BaseFieldWrapper.vue";

const props = defineProps({
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

  placeholder: {
    type: String,
    default: "Search...",
  },

  error: {
    type: String,
    default: "",
  },

  hint: {
    type: String,
    default: "",
  },

  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const search = ref("");

watch(
  () => [props.modelValue, props.options],
  () => {
    const selected = props.options.find(
      (option) => option.value === props.modelValue,
    );

    search.value = selected?.label || "";
  },
  {
    immediate: true,
    deep: true,
  },
);

const filteredOptions = computed(() => {
  if (!search.value) {
    return props.options;
  }

  return props.options.filter((option) => {
    return option.label.toLowerCase().includes(search.value.toLowerCase());
  });
});

function selectOption(option) {
  emit("update:modelValue", option.value);

  search.value = option.label;
  open.value = false;
}

function clear() {
  emit("update:modelValue", "");

  search.value = "";
  open.value = true;
}
</script>
