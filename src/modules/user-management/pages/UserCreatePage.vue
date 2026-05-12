<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Create User</h1>

    <BaseCard>
      <form class="space-y-4" @submit.prevent="submit">
        <BaseInput v-model="form.name" label="Name" placeholder="Enter name" />

        <BaseInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="Enter email"
        />

        <BaseInput
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="Enter password"
        />

        <BaseInput
          v-model="form.password_confirmation"
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
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

const router = useRouter();
const loading = ref(false);
const error = ref("");

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
    router.push("/admin/users");
  } catch (e) {
    error.value = "Unable to create user";
    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>
