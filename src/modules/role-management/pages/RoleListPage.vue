<template>
  <div>
    <div class="flex items-start justify-between">
      <BasePageHeader
        title="Roles"
        subtitle="Manage user roles and permission assignments."
      />

      <PageActionsBar>
        <BaseRefreshButton @click="loadRoles" />

        <BaseColumnCustomizer
          :columns="columns"
          storage-key="table.roles.columns"
        />

        <BaseCreateButton to="/admin/roles/create" label="Create Role" />
      </PageActionsBar>
    </div>

    <BaseCard>
      <AdvancedFilterBar v-model="filters" :fields="filterFields" />
      <BaseTableSkeleton v-if="loading" :columns="3" :rows="6" />

      <BaseTable
        v-else
        :columns="visibleColumns"
        :items="roles"
        :pagination="pagination"
        :sort-by="sortBy"
        :sort-direction="sortDirection"
        @sort="sort"
      >
        <template #permissions="{ item }">
          <div class="max-w-[420px] overflow-x-auto">
            <div class="flex w-max gap-2 pb-1">
              <BaseBadge
                v-for="permission in item.permissions"
                :key="permission.id"
                type="info"
              >
                {{ permission.name }}
              </BaseBadge>
            </div>
          </div>
        </template>
        <template #actions="{ item }">
          <div class="space-y-2">
            <router-link
              v-if="auth.hasPermission('admin.update')"
              :to="`/admin/roles/${item.id}/edit`"
              class="text-blue-600 hover:underline"
            >
              Edit
            </router-link>
            <button
              v-if="
                auth.hasPermission('admin.delete') &&
                item.name !== 'super-admin'
              "
              class="text-red-600 hover:underline"
              @click="askDeleteRole(item.id)"
            >
              Delete
            </button>
          </div>
        </template>
      </BaseTable>
      <BasePagination
        :meta="pagination"
        :per-page="perPage"
        @change="loadRoles"
        @update:perPage="updatePerPage"
      />
      <BaseConfirmModal
        :show="showDeleteModal"
        title="Delete Role"
        message="Are you sure you want to delete this role?"
        @cancel="showDeleteModal = false"
        @confirm="confirmDeleteRole"
      />
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseTable from "../../../components/ui/BaseTable.vue";
import { fetchRoles, deleteRole } from "../api/roleApi";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { useAuthStore } from "../../../stores/auth";

import { useToast } from "../../../composables/useToast";
import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BaseTableSkeleton from "../../../components/ui/BaseTableSkeleton.vue";
import BaseBadge from "../../../components/ui/BaseBadge.vue";
import { computed } from "vue";
import BaseColumnCustomizer from "../../../components/ui/BaseColumnCustomizer.vue";
import BaseTableToolbar from "../../../components/ui/BaseTableToolbar.vue";
import BasePagination from "../../../components/ui/BasePagination.vue";
import { useDebouncedSearch } from "../../../composables/useDebouncedSearch";
import AdvancedFilterBar from "../../../components/filters/AdvancedFilterBar.vue";
import BaseRefreshButton from "../../../components/ui/BaseRefreshButton.vue";
import BaseCreateButton from "../../../components/ui/BaseCreateButton.vue";
import PageActionsBar from "../../../components/ui/PageActionsBar.vue";
import BaseConfirmModal from "../../../components/ui/BaseConfirmModal.vue";

const roles = ref([]);
const auth = useAuthStore();

const loading = ref(false);

const toast = useToast();

const pagination = ref(null);
const perPage = ref(10);
const sortBy = ref("id");
const sortDirection = ref("desc");

const showDeleteModal = ref(false);
const selectedRoleId = ref(null);

const filters = ref({
  search: "",
});
const filterFields = [
  {
    key: "search",
    type: "text",
    placeholder: "Search roles",
  },
];
useDebouncedSearch(filters, () => {
  loadRoles();
});

const columns = ref([
  { key: "name", label: "Role", visible: true },
  { key: "description", label: "Description", visible: true },
  { key: "permissions", label: "Permissions", visible: true },
]);

const visibleColumns = computed(() => {
  return columns.value.filter((column) => column.visible);
});

onMounted(() => {
  loadRoles();
});

async function loadRoles(page = 1) {
  loading.value = true;

  try {
    const data = await fetchRoles(
      page,
      filters.value.search,
      perPage.value,
      sortBy.value,
      sortDirection.value,
    );

    roles.value = data.roles;
    pagination.value = data.pagination;
  } finally {
    loading.value = false;
  }
}

function sort(column) {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortDirection.value = "asc";
  }

  loadRoles();
}
function updatePerPage(value) {
  perPage.value = value;
  loadRoles();
}

function askDeleteRole(id) {
  selectedRoleId.value = id;
  showDeleteModal.value = true;
}

async function confirmDeleteRole() {
  if (!selectedRoleId.value) {
    return;
  }

  try {
    await deleteRole(selectedRoleId.value);

    toast.success("Role deleted successfully");

    loadRoles();
  } catch (e) {
    toast.error("Unable to delete role");
  } finally {
    showDeleteModal.value = false;
    selectedRoleId.value = null;
  }
}
</script>
