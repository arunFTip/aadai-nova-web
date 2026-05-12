<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Roles</h1>

      <router-link
        v-if="auth.hasPermission('admin.create')"
        to="/admin/roles/create"
      >
        <BaseButton> Create Role </BaseButton>
      </router-link>
    </div>

    <BaseCard>
      <BaseTable :columns="columns" :items="roles" />
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseTable from "../../../components/ui/BaseTable.vue";
import { fetchRoles } from "../api/roleApi";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { useAuthStore } from "../../../stores/auth";

const roles = ref([]);
const auth = useAuthStore();

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Role Name" },
  { key: "guard_name", label: "Guard" },
];

onMounted(async () => {
  roles.value = await fetchRoles();
});
</script>
