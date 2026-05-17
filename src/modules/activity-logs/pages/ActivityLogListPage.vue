<template>
  <div>
    <BasePageHeader
      title="Activity Logs"
      subtitle="Track system changes, user actions, and audit history."
    />

    <AdvancedFilterBar
      v-model="filters"
      :fields="filterFields"
      @change="loadLogs"
    />

    <BaseTableSkeleton v-if="loading" :columns="5" :rows="8" />

    <div v-else class="space-y-4">
      <BaseCard v-for="log in logs" :key="log.id">
        <div class="flex justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <BaseBadge :type="actionVariant(log.action)">
                {{ log.action }}
              </BaseBadge>

              <p class="font-semibold">
                {{ log.model }}
                <span v-if="log.record_label"> - {{ log.record_label }} </span>
              </p>
            </div>

            <p class="mt-1 text-sm text-[var(--color-muted)]">
              By {{ log.user }}
            </p>
          </div>

          <p class="text-sm text-[var(--color-muted)]">
            {{ log.date }}
          </p>
        </div>

        <pre
          class="mt-4 rounded border border-[var(--color-border)] bg-[var(--color-code-bg)] p-4 text-sm overflow-auto"
          >{{ JSON.stringify(log.changes, null, 2) }}
                </pre
        >
      </BaseCard>

      <BasePagination
        :meta="pagination"
        :per-page="perPage"
        @change="loadLogs"
        @update:perPage="updatePerPage"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseBadge from "../../../components/ui/BaseBadge.vue";
import BasePagination from "../../../components/ui/BasePagination.vue";
import BaseTableSkeleton from "../../../components/ui/BaseTableSkeleton.vue";
import AdvancedFilterBar from "../../../components/filters/AdvancedFilterBar.vue";

import { fetchActivityLogs } from "../api/activityLogApi";

const route = useRoute();
const router = useRouter();

const logs = ref([]);
const pagination = ref(null);
const loading = ref(false);
const perPage = ref(10);

const filters = ref({
  model: route.query.model || "",
  action: route.query.action || "",
  user: route.query.user || "",
  date_filter: route.query.date_filter || "",
  from: route.query.from || "",
  to: route.query.to || "",
});

const filterFields = [
  {
    key: "model",
    type: "text",
    placeholder: "Filter by model",
  },
  {
    key: "action",
    type: "select",
    options: [
      { label: "All Actions", value: "" },
      { label: "Created", value: "created" },
      { label: "Updated", value: "updated" },
      { label: "Deleted", value: "deleted" },
    ],
  },
  {
    key: "user",
    type: "text",
    placeholder: "Filter by user",
  },
  {
    key: "date",
    type: "date_range",
  },
];

onMounted(() => {
  loadLogs();
});

async function loadLogs(page = 1) {
  loading.value = true;
  syncFiltersToUrl();

  try {
    const data = await fetchActivityLogs(page, filters.value, perPage.value);

    logs.value = data.logs;
    pagination.value = data.pagination;
  } finally {
    loading.value = false;
  }
}

function updatePerPage(value) {
  perPage.value = value;
  loadLogs();
}

function syncFiltersToUrl() {
  const query = {};

  Object.entries(filters.value).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      query[key] = value;
    }
  });

  router.replace({ query });
}

function actionVariant(action) {
  const value = String(action).toLowerCase().trim();

  switch (value) {
    case "created":
      return "success";

    case "updated":
      return "warning";

    case "deleted":
      return "danger";

    default:
      return "default";
  }
}
</script>
