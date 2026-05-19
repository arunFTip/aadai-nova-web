<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Edit Role</h1>

    <p v-if="loading">Loading role...</p>

    <BaseFormCard @submit="submit">
      <BaseFormSection
        title="Edit Role Information"
        description="Edit the role's information and assign permissions."
      >
        <BaseFormGrid>
          <BaseInput
            v-model="form.name"
            label="Role Name"
            placeholder="Enter role name"
            :error="first('name')"
          />

          <BaseTextarea
            v-model="form.description"
            label="Description"
            placeholder="Enter role description"
            :error="first('description')"
          />
        </BaseFormGrid>

        <<BasePermissionGrid
          v-model="form.permissions"
          :groups="permissionGroups"
        />
      </BaseFormSection>
      <BaseFormActions
        :loading="saving"
        submit-text="Update Role"
        loading-text="Updating..."
        cancel-to="/admin/roles"
      />
    </BaseFormCard>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "../../../composables/useToast";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseInput from "../../../components/ui/BaseInput.vue";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { fetchPermissions, fetchRole, updateRole } from "../api/roleApi";
import { useFormErrors } from "../../../composables/useFormErrors";
import BaseFormSection from "../../../components/ui/BaseFormSection.vue";
import BaseFormActions from "../../../components/ui/BaseFormActions.vue";
import BaseTextarea from "../../../components/ui/BaseTextarea.vue";
import BaseFormGrid from "../../../components/ui/BaseFormGrid.vue";
import BaseFormCard from "../../../components/ui/BaseFormCard.vue";
import BasePermissionGrid from "../../../components/ui/BasePermissionGrid.vue";
import { formatLabel } from "../../../utils/format";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const saving = ref(false);
const permissions = ref([]);

const toast = useToast();

const form = reactive({
  name: "",
  permissions: [],
  description: "",
});

const { errors, setErrors, clearErrors, first, has } = useFormErrors();

onMounted(async () => {
  loading.value = true;

  try {
    const [role, allPermissions] = await Promise.all([
      fetchRole(route.params.id),
      fetchPermissions(),
    ]);

    form.name = role.name;
    form.description = role.description || "";
    form.permissions = role.permissions.map((permission) => permission.name);
    permissions.value = allPermissions;
  } catch (e) {
    toast.error("Unable to load role");
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const permissionGroups = computed(() => {
  const groups = {};

  permissions.value.forEach((permission) => {
    const permissionName =
      typeof permission === "string" ? permission : permission.name;

    const group = permissionName.split(".")[0];

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(permissionName);
  });

  return Object.entries(groups).map(([name, permissions]) => ({
    name: formatLabel(name),
    permissions,
  }));
});

async function submit() {
  loading.value = true;
  clearErrors();

  try {
    await updateRole(route.params.id, form);

    toast.success("Role updated successfully");

    router.push("/admin/roles");
  } catch (e) {
    if (e.response?.status === 422) {
      setErrors(e.response.data.errors);
    } else {
      toast.error("Unable to update role");
    }

    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>
