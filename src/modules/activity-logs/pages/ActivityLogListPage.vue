<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <input
      v-model="filters.model"
      @input="loadLogs()"
      type="text"
      placeholder="Filter by model"
      class="px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-card)]"
    />

    <select
      v-model="filters.action"
      @change="loadLogs()"
      class="px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-card)]"
    >
      <option value="">All Actions</option>
      <option value="created">Created</option>
      <option value="updated">Updated</option>
      <option value="deleted">Deleted</option>
    </select>

    <input
      v-model="filters.user"
      @input="loadLogs()"
      type="text"
      placeholder="Filter by user"
      class="px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-card)]"
    />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <DateRangeFilter @change="applyDateFilter" />
    </div>
    <div class="mb-4">
      <button
        @click="resetFilters"
        class="px-4 py-2 rounded bg-[var(--color-danger)] text-white"
      >
        Reset Filters
      </button>
    </div>
  </div>
  <div class="space-y-4">
    <div class="space-y-4">
      <BaseCard v-for="log in logs" :key="log.id">
        <div class="flex justify-between mb-2">
          <div>
            <p class="font-semibold">{{ log.action }} {{ log.model }}</p>

            <p class="text-sm text-[var(--color-muted)]">By {{ log.user }}</p>
          </div>

          <p class="text-sm text-[var(--color-muted)]">
            {{ log.date }}
          </p>
        </div>

        <pre
          class="bg-[var(--color-code-bg)] border border-[var(--color-border)] p-4 rounded text-sm overflow-auto"
          >{{ JSON.stringify(log.changes, null, 2) }}
        </pre>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseTable from "../../../components/ui/BaseTable.vue";
import { fetchActivityLogs } from "../api/activityLogApi";
import BasePagination from "../../../components/ui/BasePagination.vue";
import DateRangeFilter from "../../../components/filters/DateRangeFilter.vue";

const logs = ref([]);
const pagination = ref(null);

const columns = [
  { key: "action", label: "Action" },
  { key: "model", label: "Model" },
  { key: "record_id", label: "Record ID" },
  { key: "user", label: "User" },
  { key: "date", label: "Date" },
];

const filters = ref({
  model: "",
  action: "",
  user: "",
  date_filter: "",
  from: "",
  to: "",
});
function resetFilters() {
  filters.value = {
    model: "",
    action: "",
    user: "",
    date_filter: "",
    from: "",
    to: "",
  };

  loadLogs();
}

function applyDateFilter(payload) {
  filters.value.date_filter = payload.date_filter;
  filters.value.from = payload.from;
  filters.value.to = payload.to;

  loadLogs();
}

onMounted(() => {
  loadLogs();
});

async function loadLogs(page = 1) {
  const data = await fetchActivityLogs(page, filters.value);

  logs.value = data.logs;
  pagination.value = data.pagination;
}
</script>
