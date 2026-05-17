<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Edit Role</h1>

    <BaseCard>
      <p v-if="loading">Loading role...</p>

      <form v-else class="space-y-4" @submit.prevent="submit">
        <BaseFormSection
          title="Edit Role Information"
          description="Edit the role's information and assign permissions."
        >
          <BaseInput
            v-model="form.name"
            label="Role Name"
            placeholder="Enter role name"
          />
          <p v-if="has('name')" class="mt-1 text-sm text-[var(--color-danger)]">
            {{ first("name") }}
          </p>

          <div>
            <h3 class="font-semibold mb-2">Permissions</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <label
                v-for="permission in permissions"
                :key="permission.id"
                class="flex items-center gap-2"
              >
                <input
                  v-model="form.permissions"
                  type="checkbox"
                  :value="permission.name"
                />

                <span>{{ permission.name }}</span>
              </label>
            </div>
          </div>
        </BaseFormSection>
        <BaseFormActions
          :loading="saving"
          submit-text="Update Role"
          loading-text="Updating..."
          cancel-to="/admin/roles"
        />
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "../../../composables/useToast";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseInput from "../../../components/ui/BaseInput.vue";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { fetchPermissions, fetchRole, updateRole } from "../api/roleApi";
import { useFormErrors } from "../../../composables/useFormErrors";
import BaseFormSection from "../../../components/ui/BaseFormSection.vue";
import BaseFormActions from "../../../components/ui/BaseFormActions.vue";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const saving = ref(false);
const permissions = ref([]);

const toast = useToast();

const form = reactive({
  name: "",
  permissions: [],
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
    form.permissions = role.permissions.map((permission) => permission.name);
    permissions.value = allPermissions;
  } catch (e) {
    toast.error("Unable to load role");
    console.error(e);
  } finally {
    loading.value = false;
  }
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
