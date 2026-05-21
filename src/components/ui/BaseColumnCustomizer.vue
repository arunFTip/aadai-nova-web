<template>
  <div class="relative inline-block">
    <button
      class="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm hover:bg-[var(--color-table-row-hover)]"
      @click="open = !open"
    >
      ⚙ Columns
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-lg"
    >
      <div class="space-y-3">
        <label
          v-for="column in columns"
          :key="column.key"
          class="flex items-center gap-2 text-sm"
        >
          <input
            v-model="column.visible"
            type="checkbox"
            :disabled="visibleCount === 1 && column.visible"
            @change="save"
          />

          {{ column.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { saveUserPreference } from "../../modules/user-preferences/api/userPreferenceApi";
import {
  getAllPreferences,
  loadPreferences,
} from "../../stores/preferenceStore";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },

  storageKey: {
    type: String,
    required: true,
  },
});

const open = ref(false);

const visibleCount = computed(() => {
  return props.columns.filter((column) => column.visible).length;
});

onMounted(async () => {
  await loadPreferences();

  const preferences = getAllPreferences();

  const saved = preferences[props.storageKey];

  if (!saved) {
    return;
  }

  props.columns.forEach((column) => {
    const savedColumn = saved.find((item) => item.key === column.key);

    if (savedColumn) {
      column.visible = savedColumn.visible;
    }
  });
});

async function save() {
  await saveUserPreference(props.storageKey, props.columns, "json");
}
</script>
