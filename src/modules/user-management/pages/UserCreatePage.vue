<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Create User</h1>

    <BaseCard>
      <form class="space-y-4" @submit.prevent="submit">
        <BaseInput
          v-model="form.name"
          label="Name"
          placeholder="Enter name"
          :error="errors.name?.[0]"
        />

        <BaseInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="Enter email"
          :error="errors.email?.[0]"
        />

        <BaseInput
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="Enter password"
          :error="errors.password?.[0]"
        />

        <BaseInput
          v-model="form.password_confirmation"
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          :error="errors.password_confirmation?.[0]"
        />

        <BaseButton :disabled="loading">
          {{ loading ? "Saving..." : "Save User" }}
        </BaseButton>
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
import { toast } from "vue-sonner";

const router = useRouter();
const loading = ref(false);
const error = ref("");
const errors = ref({});

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
async function submit() {
  loading.value = true;
  error.value = "";

  try {
    await createUser(form);
    toast.success("User created successfully");
    router.push("/admin/users");
  } catch (e) {
    console.error(e);

    if (e.response?.status === 422) {
      errors.value = e.response.data.errors;
    } else {
      error.value = "Unable to create user";
    }
  } finally {
    loading.value = false;
  }
}
</script>
