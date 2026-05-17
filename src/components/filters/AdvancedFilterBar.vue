<template>
  <div
    class="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm"
  >
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
      <template v-for="field in fields" :key="field.key">
        <BaseSearchInput
          v-if="field.type === 'text'"
          :model-value="modelValue[field.key]"
          :placeholder="field.placeholder"
          @update:model-value="updateField(field.key, $event)"
        />

        <BaseSelect
          v-else-if="field.type === 'select'"
          :model-value="modelValue[field.key]"
          :options="field.options"
          @update:model-value="updateField(field.key, $event)"
        />

        <DateRangeFilter
          v-else-if="field.type === 'date_range'"
          @change="updateDateRange"
        />
      </template>

      <button
        type="button"
        class="h-11 w-full rounded-lg bg-[var(--color-danger)] px-5 text-sm font-semibold text-white hover:opacity-90"
        @click="reset"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import DateRangeFilter from "./DateRangeFilter.vue";
import { useDebounceFn } from "@vueuse/core";
import BaseSearchInput from "../ui/BaseSearchInput.vue";
import BaseSelect from "../ui/BaseSelect.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
  },
});

const debouncedChange = useDebounceFn(() => {
  emit("change");
}, 500);

const emit = defineEmits(["update:modelValue", "change", "reset"]);

function updateField(key, value) {
  emit("update:modelValue", {
    ...props.modelValue,
    [key]: value,
  });

  debouncedChange();
}

function updateDateRange(payload) {
  emit("update:modelValue", {
    ...props.modelValue,
    date_filter: payload.date_filter,
    from: payload.from,
    to: payload.to,
  });

  debouncedChange();
}

function reset() {
  const resetValues = {};

  props.fields.forEach((field) => {
    if (field.type === "date_range") {
      resetValues.date_filter = "";
      resetValues.from = "";
      resetValues.to = "";
    } else {
      resetValues[field.key] = "";
    }
  });

  emit("update:modelValue", resetValues);
  emit("reset");
  debouncedChange();
}
</script>
