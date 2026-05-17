<template>
  <div class="relative">
    <button
      type="button"
      class="px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-card)]"
      @click="open = !open"
    >
      {{ selectedLabel }}
    </button>

    <div
      v-if="open"
      class="absolute z-50 mt-2 w-[720px] bg-[var(--color-card)] border border-[var(--color-border)] rounded shadow-lg p-4"
    >
      <div class="grid grid-cols-4 gap-4">
        <div class="space-y-2">
          <button
            v-for="preset in presets"
            :key="preset.value"
            type="button"
            class="block w-full text-left px-3 py-2 rounded hover:bg-[var(--color-table-row-hover)]"
            @click="selectPreset(preset)"
          >
            {{ preset.label }}
          </button>
        </div>

        <div class="col-span-3">
          <VueDatePicker
            v-model="range"
            range
            inline
            :enable-time-picker="false"
          />

          <div class="flex justify-end gap-3 mt-4">
            <button
              type="button"
              class="px-4 py-2 rounded border border-[var(--color-border)]"
              @click="open = false"
            >
              Cancel
            </button>

            <button
              type="button"
              class="px-4 py-2 rounded bg-[var(--color-primary)] text-white"
              @click="apply"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";

const emit = defineEmits(["change"]);

const open = ref(false);
const range = ref(null);
const selectedLabel = ref("All Dates");

const presets = [
  { label: "All Dates", value: "" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "Last 30 Days", value: "last_30_days" },
  { label: "Last 90 Days", value: "last_90_days" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "This Year", value: "this_year" },
  { label: "Last Year", value: "last_year" },
];

function selectPreset(preset) {
  selectedLabel.value = preset.label;

  emit("change", {
    date_filter: preset.value,
    from: "",
    to: "",
  });

  open.value = false;
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function apply() {
  if (!range.value || !range.value[0] || !range.value[1]) {
    return;
  }

  const from = formatDate(range.value[0]);
  const to = formatDate(range.value[1]);

  selectedLabel.value = `${from} → ${to}`;

  emit("change", {
    date_filter: "custom",
    from,
    to,
  });

  open.value = false;
}
</script>
