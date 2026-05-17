<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Create User</h1>

    <BaseCard>
      <form class="space-y-4" @submit.prevent="submit">
        <BaseFormSection
          title="User Information"
          description="Create a new user account and assign access roles."
        >
          <BaseInput
            v-model="form.name"
            label="Name"
            placeholder="Enter name"
          />
          <p v-if="has('name')" class="mt-1 text-sm text-[var(--color-danger)]">
            {{ first("name") }}
          </p>
          <BaseInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="Enter email"
          />
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

          <BaseInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Enter password"
          />
          <p
            v-if="has('password')"
            class="mt-1 text-sm text-[var(--color-danger)]"
          >
            {{ first("password") }}
          </p>

          <BaseInput
            v-model="form.password_confirmation"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
          />
          <p
            v-if="has('password_confirmation')"
            class="mt-1 text-sm text-[var(--color-danger)]"
          >
            {{ first("password_confirmation") }}
          </p>
        </BaseFormSection>

        <BaseFormActions
          :loading="loading"
          submit-text="Create User"
          loading-text="Creating..."
          cancel-to="/admin/users"
        />
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
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

const router = useRouter();
const loading = ref(false);
const error = ref("");
const errors = ref({});

const { setErrors, clearErrors, first, has } = useFormErrors();

const toast = useToast();

const form = reactive({
  name: "",
  email: "",
  status: "active",
  password: "",
  password_confirmation: "",
});
async function submit() {
  loading.value = true;
  clearErrors();

  try {
    await createUser(form);
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
