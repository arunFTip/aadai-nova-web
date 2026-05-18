<template>
  <BasePageContainer>
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
              <BaseBadge :type="badgeType(log.action)">
                {{ formatLabel(log.action) }}
              </BaseBadge>

              <p class="font-semibold">
                {{ log.model }}
                <span v-if="log.record_label"> - {{ log.record_label }} </span>
              </p>
            </div>

            <p class="mt-1 text-sm text-[var(--color-muted)]">
              By {{ log.user }}
              <BaseViewButton @click="viewLogDetails(log)" />
            </p>
          </div>

          <p class="text-sm text-[var(--color-muted)]">
            {{ formatDateTime(log.date) }}
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
      <BaseInfoModal
        :show="showDetailsModal"
        title="Activity Log Details"
        size="lg"
        @close="showDetailsModal = false"
      >
        <div v-if="selectedLog" class="space-y-4">
          <div>
            <p class="font-semibold">Action</p>

            <p>{{ selectedLog.action }}</p>
          </div>

          <div>
            <p class="font-semibold">Model</p>

            <p>{{ selectedLog.model }}</p>
          </div>

          <div>
            <p class="font-semibold">Performed By</p>

            <p>
              {{ selectedLog.user || selectedLog.performed_by || "System" }}
            </p>
          </div>

          <div>
            <p class="font-semibold">Date</p>

            <p>
              {{ selectedLog.date || selectedLog.created_at }}
            </p>
          </div>

          <div>
            <p class="mb-2 font-semibold">Changes</p>

            <div
              class="overflow-x-auto rounded-lg border border-[var(--color-border)]"
            >
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-border)]">
                    <th class="px-4 py-2 text-left">Field</th>

                    <th class="px-4 py-2 text-left">Old Value</th>

                    <th class="px-4 py-2 text-left">New Value</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(change, key) in logChanges(selectedLog)"
                    :key="key"
                    class="border-b border-[var(--color-border)]"
                  >
                    <td class="px-4 py-2 font-medium">
                      {{ key }}
                    </td>

                    <td class="px-4 py-2">
                      {{ change.old ?? "-" }}
                    </td>

                    <td class="px-4 py-2">
                      {{ change.new ?? "-" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </BaseInfoModal>
    </div>
  </BasePageContainer>
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
import BaseViewButton from "../../../components/ui/BaseViewButton.vue";
import BaseInfoModal from "../../../components/ui/BaseInfoModal.vue";
import { badgeType } from "../../../utils/badge";
import { formatLabel, formatDateTime } from "../../../utils/format";
import BasePageContainer from "../../../components/ui/BasePageContainer.vue";

const route = useRoute();
const router = useRouter();

const logs = ref([]);
const pagination = ref(null);
const loading = ref(false);
const perPage = ref(10);
const selectedLog = ref(null);
const showDetailsModal = ref(false);

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

function viewLogDetails(log) {
  selectedLog.value = log;
  showDetailsModal.value = true;
}

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

function logChanges(log) {
  if (!log) {
    return {};
  }

  const oldValues = log.old || log.changes?.old || {};
  const newValues = log.new || log.changes?.attributes || {};

  const allKeys = new Set([
    ...Object.keys(oldValues),
    ...Object.keys(newValues),
  ]);

  const result = {};

  allKeys.forEach((key) => {
    result[key] = {
      old: oldValues[key] ?? "-",
      new: newValues[key] ?? "-",
    };
  });

  return result;
}
</script>
