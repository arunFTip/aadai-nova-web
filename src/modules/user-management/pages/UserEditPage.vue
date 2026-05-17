<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Edit User</h1>

    <BaseCard>
      <p v-if="loading">Loading user...</p>

      <form v-else class="space-y-4" @submit.prevent="submit">
        <BaseFormSection
          title="Edit User Information"
          description="Edit the user's information and assign access roles."
        >
          <p v-if="error" class="text-[var(--color-danger)]">
            {{ error }}
          </p>

          <BaseInput v-model="form.name" label="Name" />
          <p v-if="has('name')" class="mt-1 text-sm text-[var(--color-danger)]">
            {{ first("name") }}
          </p>

          <BaseInput v-model="form.email" label="Email" type="email" />
          <p
            v-if="has('email')"
            class="mt-1 text-sm text-[var(--color-danger)]"
          >
            {{ first("email") }}
          </p>
          <div>
            <label class="block mb-2 font-semibold"> Status </label>

            <BaseSelect
              v-model="form.status"
              :options="[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]"
            />
          </div>

          <div>
            <label class="block mb-2 font-semibold"> Role </label>

            <BaseSelect
              v-model="form.roles"
              :options="[
                { label: 'Select Role', value: '' },
                ...roles.map((role) => ({
                  label: role.name,
                  value: role.name,
                })),
              ]"
            />
          </div>
        </BaseFormSection>
        <BaseFormActions
          :loading="saving"
          submit-text="Update User"
          loading-text="Updating..."
          cancel-to="/admin/users"
        />
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseInput from "../../../components/ui/BaseInput.vue";
import { useRoute, useRouter } from "vue-router";
import { fetchUser, updateUser, updateUserRoles } from "../api/userApi";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { useToast } from "../../../composables/useToast";
import { fetchRoles } from "../../role-management/api/roleApi";
import { useFormErrors } from "../../../composables/useFormErrors";
import BaseFormSection from "../../../components/ui/BaseFormSection.vue";
import BaseFormActions from "../../../components/ui/BaseFormActions.vue";
import BaseSelect from "../../../components/ui/BaseSelect.vue";

const roles = ref([]);

const route = useRoute();

const loading = ref(false);

const toast = useToast();

const form = reactive({
  name: "",
  email: "",
  status: "active",
  roles: "",
});

const router = useRouter();
const saving = ref(false);
const error = ref("");
const { setErrors, clearErrors, first, has } = useFormErrors();
onMounted(async () => {
  loading.value = true;

  try {
    const [user, allRoles] = await Promise.all([
      fetchUser(route.params.id),
      fetchRoles(),
    ]);

    form.name = user.name;
    form.email = user.email;
    form.status = user.status;
    form.roles = user.roles[0] ?? "";
    roles.value = allRoles.roles;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

async function submit() {
  saving.value = true;
  clearErrors();

  try {
    await updateUser(route.params.id, form);
    await updateUserRoles(route.params.id, form.roles ? [form.roles] : []);

    toast.success("User updated successfully");
    router.push("/admin/users");
  } catch (e) {
    if (e.response?.status === 422) {
      setErrors(e.response.data.errors);
    } else {
      toast.error("Unable to update user");
    }

    console.error(e);
  } finally {
    saving.value = false;
  }
}
</script>
