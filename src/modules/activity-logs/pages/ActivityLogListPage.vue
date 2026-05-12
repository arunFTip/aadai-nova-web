<template>
  <div class="space-y-4">
    <div class="space-y-4">
      <BaseCard v-for="log in logs" :key="log.id">
        <div class="flex justify-between mb-2">
          <div>
            <p class="font-semibold">{{ log.action }} {{ log.model }}</p>

            <p class="text-sm text-gray-500">By {{ log.user }}</p>
          </div>

          <p class="text-sm text-gray-500">
            {{ log.date }}
          </p>
        </div>

        <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto"
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

const logs = ref([]);
const pagination = ref(null);

const columns = [
  { key: "action", label: "Action" },
  { key: "model", label: "Model" },
  { key: "record_id", label: "Record ID" },
  { key: "user", label: "User" },
  { key: "date", label: "Date" },
];

onMounted(() => {
  loadLogs();
});

async function loadLogs(page = 1) {
  const data = await fetchActivityLogs(page);

  logs.value = data.logs;
  pagination.value = data.pagination;
}
</script>
