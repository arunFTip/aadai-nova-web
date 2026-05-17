<template>
  <div class="relative w-full">
    <button
      type="button"
      class="h-11 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-left text-sm outline-none focus:border-[var(--color-primary)]"
      @click="open = !open"
    >
      <span class="block truncate">
        {{ selectedLabel }}
      </span>
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-50 mt-2 w-[min(760px,calc(100vw-2rem))] rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl"
    >
      <div class="grid grid-cols-1 md:grid-cols-4">
        <div
          class="border-b border-[var(--color-border)] p-4 md:border-b-0 md:border-r"
        >
          <div class="space-y-1">
            <button
              v-for="preset in presets"
              :key="preset.value"
              type="button"
              class="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[var(--color-table-row-hover)]"
              :class="
                selectedPreset === preset.value
                  ? 'bg-[var(--color-table-row-hover)] font-semibold'
                  : ''
              "
              @click="selectPreset(preset)"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>

        <div class="p-4 md:col-span-3">
          <VueDatePicker
            v-model="range"
            range
            inline
            auto-apply
            :enable-time-picker="false"
          />

          <div
            class="mt-4 flex flex-col gap-3 border-t border-[var(--color-border)] pt-4 md:flex-row md:items-center md:justify-between"
          >
            <div class="text-sm text-[var(--color-muted)]">
              {{ customLabel }}
            </div>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="h-10 rounded-lg border border-[var(--color-border)] px-4 text-sm"
                @click="cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                class="h-10 rounded-lg bg-[var(--color-primary)] px-4 text-sm font-semibold text-white"
                @click="apply"
              >
                Apply
              </button>
            </div>
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
const selectedPreset = ref("");

const presets = [
  { label: "All Dates", value: "" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "Last 30 Days", value: "last_30_days" },
  { label: "Last 90 Days", value: "last_90_days" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "This Quarter", value: "this_quarter" },
  { label: "Last Quarter", value: "last_quarter" },
  { label: "This Year", value: "this_year" },
  { label: "Last Year", value: "last_year" },
];

const customLabel = computed(() => {
  if (!range.value || !range.value[0] || !range.value[1]) {
    return "Select a custom date range";
  }

  return `${formatDisplayDate(range.value[0])} → ${formatDisplayDate(range.value[1])}`;
});

function selectPreset(preset) {
  selectedPreset.value = preset.value;
  selectedLabel.value = preset.label;
  range.value = null;

  emit("change", {
    date_filter: preset.value,
    from: "",
    to: "",
  });

  open.value = false;
}

function apply() {
  if (!range.value || !range.value[0] || !range.value[1]) {
    return;
  }

  const from = formatDate(range.value[0]);
  const to = formatDate(range.value[1]);

  selectedPreset.value = "custom";
  selectedLabel.value = `${formatDisplayDate(range.value[0])} → ${formatDisplayDate(range.value[1])}`;

  emit("change", {
    date_filter: "custom",
    from,
    to,
  });

  open.value = false;
}

function cancel() {
  open.value = false;
}

function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

function formatDisplayDate(date) {
  return new Date(date).toLocaleDateString();
}
</script>
