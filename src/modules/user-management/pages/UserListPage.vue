<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Users</h1>

      <router-link to="/admin/users/create">
        <BaseButton> Create User </BaseButton>
      </router-link>
    </div>

    <BaseCard>
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

      <BaseTable v-else :columns="columns" :items="filteredUsers" />
    </BaseCard>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseTable from "../../../components/ui/BaseTable.vue";
import { fetchUsers } from "../api/userApi";
import BaseButton from "../../../components/ui/BaseButton.vue";

const search = ref("");

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});

const loading = ref(false);

const users = ref([]);

const error = ref("");

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
];

onMounted(async () => {
  loading.value = true;
  error.value = "";

  try {
    users.value = await fetchUsers();
  } catch (e) {
    error.value = "Unable to load users";
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
