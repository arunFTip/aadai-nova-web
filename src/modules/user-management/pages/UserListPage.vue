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
        class="mb-4 px-4 py-2 border border-gray-300 rounded"
      >
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>

      <input
        v-model="search"
        type="text"
        placeholder="Search users..."
        class="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
      />
      <p v-if="error" class="text-red-600 mb-4">
        {{ error }}
      </p>
      <p v-if="loading">Loading users...</p>

      <BaseTable v-else :columns="columns" :items="users" @sort="sort">
        <template #actions="{ item }">
          <router-link
            v-if="auth.hasPermission('user.update')"
            :to="`/admin/users/${item.id}/edit`"
            class="text-blue-600 hover:underline"
          >
            Edit
          </router-link>
          <button
            v-if="auth.hasPermission('user.delete')"
            class="text-red-600 hover:underline"
            @click="askDeleteUser(item.id)"
          >
            Delete
          </button>
          <ConfirmDialog
            :show="showDeleteDialog"
            title="Delete User"
            message="Are you sure you want to delete this user?"
            @confirm="confirmDeleteUser"
            @cancel="showDeleteDialog = false"
          />
        </template>
      </BaseTable>
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

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
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
