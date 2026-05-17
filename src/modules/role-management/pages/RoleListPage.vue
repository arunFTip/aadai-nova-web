<template>
  <div>
    <BasePageHeader
      title="Roles"
      subtitle="Manage user roles and permission assignments."
    >
      <template #actions>
        <router-link
          v-if="auth.hasPermission('admin.create')"
          to="/admin/roles/create"
        >
          <BaseButton> Create Role </BaseButton>
        </router-link>
      </template>
    </BasePageHeader>

    <BaseCard>
      <BaseTableSkeleton v-if="loading" :columns="3" :rows="6" />

      <BaseTable v-else :columns="columns" :items="roles">
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
import { useToast } from "../../../composables/useToast";
import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BaseTableSkeleton from "../../../components/ui/BaseTableSkeleton.vue";
import BaseBadge from "../../../components/ui/BaseBadge.vue";

const roles = ref([]);
const auth = useAuthStore();
const showDeleteDialog = ref(false);
const selectedRoleId = ref(null);

const loading = ref(false);

const toast = useToast();

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Role Name" },
  { key: "guard_name", label: "Guard" },
];

onMounted(async () => {
  loading.value = true;

  try {
    roles.value = await fetchRoles();
  } finally {
    loading.value = false;
  }
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
