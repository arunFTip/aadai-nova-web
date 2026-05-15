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
      <BaseTable :columns="columns" :items="roles">
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

            <div class="flex flex-wrap gap-2">
              <span
                v-for="permission in item.permissions"
                :key="permission.id"
                class="px-2 py-1 bg-gray-200 rounded text-xs"
              >
                {{ permission.name }}
              </span>
            </div>
          </div>
        </template>
      </BaseTable>
    </BaseCard>
    <ConfirmDialog
      :show="showDeleteDialog"
      title="Delete Role"
      message="Are you sure you want to delete this role?"
      @confirm="confirmDeleteRole"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseTable from "../../../components/ui/BaseTable.vue";
import { fetchRoles, deleteRole } from "../api/roleApi";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { useAuthStore } from "../../../stores/auth";
import ConfirmDialog from "../../../components/ui/ConfirmDialog.vue";
import { toast } from "vue-sonner";

const roles = ref([]);
const auth = useAuthStore();
const showDeleteDialog = ref(false);
const selectedRoleId = ref(null);

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Role Name" },
  { key: "guard_name", label: "Guard" },
];

onMounted(async () => {
  roles.value = await fetchRoles();
});

function askDeleteRole(id) {
  selectedRoleId.value = id;
  showDeleteDialog.value = true;
}

async function confirmDeleteRole() {
  try {
    await deleteRole(selectedRoleId.value);

    roles.value = roles.value.filter(
      (role) => role.id !== selectedRoleId.value,
    );

    toast.success("Role deleted successfully");
  } catch (e) {
    toast.error("Unable to delete role");
    console.error(e);
  } finally {
    showDeleteDialog.value = false;
    selectedRoleId.value = null;
  }
}
</script>
