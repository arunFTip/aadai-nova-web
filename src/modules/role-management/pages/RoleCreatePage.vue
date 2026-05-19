<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Create Role</h1>

    <BaseFormCard @submit="submit">
      <BaseFormSection
        title="Role Information"
        description="Create a new role and assign
        permissions."
      >
        <BaseFormGrid>
          <BaseInput
            v-model="form.name"
            label="Role Name"
            required="true"
            placeholder="Enter role name"
            hint="The name of the role (e.g., Admin, Editor)"
            help="This is the name that will be displayed for the role. It should be unique and descriptive."
            :error="first('name')"
            ,
          />

          <BaseTextarea
            v-model="form.description"
            label="Description"
            placeholder="Enter role description"
            :error="first('description')"
          />
        </BaseFormGrid>

        <BasePermissionGrid
          v-model="form.permissions"
          :groups="permissionGroups"
        />
      </BaseFormSection>
      <BaseFormActions
        :loading="loading"
        submit-text="Create Role"
        loading-text="Creating..."
        cancel-to="/admin/roles"
      />
    </BaseFormCard>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseInput from "../../../components/ui/BaseInput.vue";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { useRouter } from "vue-router";
import { useToast } from "../../../composables/useToast";
import { createRole, fetchPermissions } from "../api/roleApi";
import { useFormErrors } from "../../../composables/useFormErrors";
import BaseFormSection from "../../../components/ui/BaseFormSection.vue";
import BaseFormActions from "../../../components/ui/BaseFormActions.vue";
import BaseTextarea from "../../../components/ui/BaseTextarea.vue";
import BaseFormGrid from "../../../components/ui/BaseFormGrid.vue";
import BaseFormCard from "../../../components/ui/BaseFormCard.vue";
import BasePermissionGrid from "../../../components/ui/BasePermissionGrid.vue";
import { formatLabel } from "../../../utils/format";

const permissions = ref([]);
const router = useRouter();
const loading = ref(false);

const form = reactive({
  name: "",
  permissions: [],
  description: "",
});

const { errors, setErrors, clearErrors, first, has } = useFormErrors();

const toast = useToast();

onMounted(async () => {
  permissions.value = await fetchPermissions();
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
    await createRole(form);

    toast.success("Role created successfully");

    router.push("/admin/roles");
  } catch (e) {
    if (e.response?.status === 422) {
      setErrors(e.response.data.errors);
    } else {
      toast.error("Unable to create role");
    }

    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>
