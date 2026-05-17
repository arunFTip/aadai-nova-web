<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Users</h1>

      <router-link
        v-if="auth.hasPermission('user.create')"
        to="/admin/users/create"
      >
        <BaseButton> Create User </BaseButton>
      </router-link>
    </div>

    <BaseCard>
      <select
        v-model="perPage"
        @change="loadUsers()"
        class="mb-4 px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-input)] text-[var(--color-text)]"
      >
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>
      <select
        v-model="status"
        @change="loadUsers()"
        class="mb-4 px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-card)]"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input
        v-model="search"
        type="text"
        placeholder="Search users..."
        class="w-full mb-4 px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-input)] text-[var(--color-text)] placeholder:text-[var(--color-muted)]"
      />
      <p v-if="error" class="text-[var(--color-danger)] mb-4">
        {{ error }}
      </p>
      <p v-if="loading">Loading users...</p>

      <BaseTable v-else :columns="columns" :items="users" @sort="sort">
        <template #roles="{ item }">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="role in item.roles"
              :key="role"
              class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
            >
              {{ role }}
            </span>
          </div>
        </template>
        <template #status="{ item }">
          <span
            :class="[
              'px-2 py-1 rounded text-xs capitalize',
              item.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700',
            ]"
          >
            {{ item.status }}
          </span>
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
      <ConfirmDialog
        :show="showDeleteDialog"
        title="Delete User"
        message="Are you sure you want to delete this user?"
        @confirm="confirmDeleteUser"
        @cancel="showDeleteDialog = false"
      />
      <BasePagination :pagination="pagination" @change="loadUsers" />
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
import { toast } from "vue-sonner";
import ConfirmDialog from "../../../components/ui/ConfirmDialog.vue";
import { useAuthStore } from "../../../stores/auth";

const search = ref("");

const loading = ref(false);

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

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "roles", label: "Roles" },
  { key: "status", label: "Status" },
];

onMounted(() => {
  loadUsers();
});

async function loadUsers(page = 1) {
  loading.value = true;
  error.value = "";

  try {
    const data = await fetchUsers(
      page,
      search.value,
      perPage.value,
      sortBy.value,
      sortDirection.value,
      status.value,
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

const debouncedSearch = useDebounceFn(() => {
  loadUsers();
}, 500);

watch(search, () => {
  debouncedSearch();
});
function askDeleteUser(id) {
  selectedUserId.value = id;
  showDeleteDialog.value = true;
}

async function confirmDeleteUser() {
  try {
    await deleteUser(selectedUserId.value);

    users.value = users.value.filter(
      (user) => user.id !== selectedUserId.value,
    );

    toast.success("User deleted successfully");
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

// TODO: Add date in columns and filters // TODO: Find better date component
