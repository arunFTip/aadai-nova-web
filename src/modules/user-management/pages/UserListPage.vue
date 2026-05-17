<template>
  <div>
    <div class="flex items-start justify-between">
      <BasePageHeader
        title="Users"
        subtitle="Manage application users, roles, and account status."
      />

      <PageActionsBar>
        <BaseRefreshButton @click="loadUsers" />

        <BaseColumnCustomizer
          :columns="columns"
          storage-key="table.users.columns"
        />

        <BaseCreateButton to="/admin/users/create" label="Create User" />
      </PageActionsBar>
    </div>
    <BaseCard>
      <AdvancedFilterBar v-model="filters" :fields="filterFields" />

      <p v-if="error" class="text-[var(--color-danger)] mb-4">
        {{ error }}
      </p>

      <BaseTableSkeleton v-if="loading" :columns="5" :rows="8" />

      <BaseTable
        v-else
        :columns="visibleColumns"
        :items="users"
        :sort-by="sortBy"
        :sort-direction="sortDirection"
        @sort="sort"
        :pagination="pagination"
      >
        <template #roles="{ item }">
          <div class="flex flex-wrap gap-2">
            <BaseBadge v-for="role in item.roles" :key="role" type="info">
              {{ role }}
            </BaseBadge>
          </div>
        </template>
        <template #status="{ item }">
          <BaseBadge :type="item.status === 'active' ? 'success' : 'danger'">
            {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
          </BaseBadge>
        </template>
        <template #actions="{ item }">
          <router-link
            v-if="auth.hasPermission('user.update')"
            :to="`/admin/users/${item.id}/edit`"
            class="text-[var(--color-link)] hover:underline"
          >
            Edit
          </router-link>

          <button
            v-if="auth.hasPermission('user.delete')"
            class="text-[var(--color-danger)] hover:underline"
            @click="askDeleteUser(item.id)"
          >
            Delete
          </button>
        </template>
      </BaseTable>

      <BasePagination
        :meta="pagination"
        :per-page="perPage"
        @change="loadUsers"
        @update:perPage="updatePerPage"
      />
      <BaseConfirmModal
        :show="showDeleteDialog"
        title="Delete User"
        message="Are you sure you want to delete this user?"
        @confirm="confirmDeleteUser"
        @cancel="showDeleteDialog = false"
      />
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseTable from "../../../components/ui/BaseTable.vue";
import { fetchUsers, deleteUser } from "../api/userApi";
import BaseButton from "../../../components/ui/BaseButton.vue";
import BasePagination from "../../../components/ui/BasePagination.vue";
import { useDebounceFn } from "@vueuse/core";
import { useToast } from "../../../composables/useToast";
import { useAuthStore } from "../../../stores/auth";
import AdvancedFilterBar from "../../../components/filters/AdvancedFilterBar.vue";
import { useRoute, useRouter } from "vue-router";
import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BaseTableSkeleton from "../../../components/ui/BaseTableSkeleton.vue";
import BaseBadge from "../../../components/ui/BaseBadge.vue";
import BaseColumnCustomizer from "../../../components/ui/BaseColumnCustomizer.vue";
import { computed } from "vue";
import BaseTableToolbar from "../../../components/ui/BaseTableToolbar.vue";
import { useDebouncedSearch } from "../../../composables/useDebouncedSearch";
import BaseRefreshButton from "../../../components/ui/BaseRefreshButton.vue";
import BaseCreateButton from "../../../components/ui/BaseCreateButton.vue";
import PageActionsBar from "../../../components/ui/PageActionsBar.vue";
import BaseConfirmModal from "../../../components/ui/BaseConfirmModal.vue";

const route = useRoute();
const router = useRouter();

const search = ref("");

const loading = ref(false);

const toast = useToast();

const users = ref([]);

const error = ref("");

const pagination = ref(null);
const currentPage = ref(1);
const perPage = ref(10);

const sortBy = ref("id");
const sortDirection = ref("desc");

const showDeleteDialog = ref(false);
const selectedUserId = ref(null);

const auth = useAuthStore();
const status = ref("");

const filters = ref({
  search: route.query.search || "",
  status: route.query.status || "",
});

function syncFiltersToUrl() {
  const query = {};

  Object.entries(filters.value).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      query[key] = value;
    }
  });

  router.replace({
    query,
  });
}

const filterFields = [
  {
    key: "search",
    type: "text",
    placeholder: "Search users",
  },
  {
    key: "status",
    type: "select",
    options: [
      { label: "All Status", value: "" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

const columns = ref([
  { key: "name", label: "Name", visible: true },
  { key: "email", label: "Email", visible: true },
  { key: "roles", label: "Roles", visible: true },
  { key: "status", label: "Status", visible: true },
]);

const visibleColumns = computed(() => {
  return columns.value.filter((column) => column.visible);
});

function updatePerPage(value) {
  perPage.value = value;

  loadUsers();
}

syncFiltersToUrl();

onMounted(() => {
  loadUsers();
});

async function loadUsers(page = 1) {
  loading.value = true;
  error.value = "";

  try {
    const data = await fetchUsers(
      page,
      filters.value.search,
      perPage.value,
      sortBy.value,
      sortDirection.value,
      filters.value.status,
    );

    users.value = data.users;
    pagination.value = data.pagination;
    currentPage.value = data.pagination.current_page;
  } catch (e) {
    error.value = "Unable to load users";
    console.error(e);
  } finally {
    loading.value = false;
  }
}

useDebouncedSearch(filters, () => {
  loadUsers();
});

watch(search, () => {
  debouncedSearch();
});

function askDeleteUser(id) {
  selectedUserId.value = id;
  showDeleteDialog.value = true;
}
async function confirmDeleteUser() {
  if (!selectedUserId.value) {
    return;
  }

  try {
    await deleteUser(selectedUserId.value);

    toast.success("User deleted successfully");

    loadUsers();
  } catch (e) {
    toast.error("Unable to delete user");
    console.error(e);
  } finally {
    showDeleteDialog.value = false;
    selectedUserId.value = null;
  }
}

function sort(column) {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortDirection.value = "asc";
  }

  loadUsers();
}
</script>
