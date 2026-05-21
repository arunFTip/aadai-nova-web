<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Create User</h1>

    <BaseFormCard @submit="submit">
      <BaseFormSection
        title="User Information"
        description="Create a new user account and assign access roles."
      >
        <BaseFormGrid>
          <BaseInput
            v-model="form.name"
            label="Name"
            placeholder="Enter name"
            :error="first('name')"
          />

          <BaseInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="Enter email"
            :error="first('email')"
          />
        </BaseFormGrid>

        <BaseFormGrid>
          <BaseInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Enter password"
            :error="first('password')"
          />

          <BaseInput
            v-model="form.password_confirmation"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            :error="first('password_confirmation')"
          />
        </BaseFormGrid>
        <BaseFormGrid>
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
          <BaseSearchableSelect
            v-model="form.roles"
            label="Role"
            placeholder="Search role"
            :error="first('roles')"
            :options="[
              ...roles.map((role) => ({
                label: formatLabel(role.name),
                value: role.name,
              })),
            ]"
          />
        </BaseFormGrid>
      </BaseFormSection>

      <BaseFormActions
        :loading="loading"
        submit-text="Create User"
        loading-text="Creating..."
        cancel-to="/admin/users"
      />
    </BaseFormCard>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseInput from "../../../components/ui/BaseInput.vue";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { useRouter } from "vue-router";
import { createUser } from "../api/userApi";
import { useToast } from "../../../composables/useToast";
import { useFormErrors } from "../../../composables/useFormErrors";
import BaseFormSection from "../../../components/ui/BaseFormSection.vue";
import BaseFormActions from "../../../components/ui/BaseFormActions.vue";
import BaseSelect from "../../../components/ui/BaseSelect.vue";
import { fetchRoles } from "../../role-management/api/roleApi";
import BaseFormGrid from "../../../components/ui/BaseFormGrid.vue";
import BaseSearchableSelect from "../../../components/ui/BaseSearchableSelect.vue";
import { formatLabel } from "../../../utils/format";
import BaseFormCard from "../../../components/ui/BaseFormCard.vue";

const router = useRouter();
const loading = ref(false);
const error = ref("");
const errors = ref({});
const roles = ref([]);
const { setErrors, clearErrors, first, has } = useFormErrors();

const toast = useToast();

const form = reactive({
  name: "",
  email: "",
  status: "active",
  password: "",
  password_confirmation: "",
  roles: "",
});

onMounted(async () => {
  const data = await fetchRoles();

  roles.value = data.roles;
});

async function submit() {
  async function submit() {
    console.log("submit clicked");
  }

  loading.value = true;
  clearErrors();

  try {
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
      status: form.status,
      role: form.roles || "user",
    };

    //await createUser(payload);

    const user = await createUser(payload);

    if (form.roles) {
      await updateUserRoles(user.id, [form.roles]);
    }

    toast.success("User created successfully");

    router.push("/admin/users");
  } catch (e) {
    if (e.response?.status === 422) {
      setErrors(e.response.data.errors);
    } else {
      toast.error("Unable to create user");
    }

    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>
