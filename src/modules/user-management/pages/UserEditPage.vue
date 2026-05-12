<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Edit User</h1>

    <BaseCard>
      <p v-if="loading">Loading user...</p>

      <form v-else class="space-y-4" @submit.prevent="submit">
        <p v-if="error" class="text-red-600">
          {{ error }}
        </p>

        <BaseInput v-model="form.name" label="Name" />

        <BaseInput v-model="form.email" label="Email" type="email" />

        <BaseButton :disabled="saving">
          {{ saving ? "Saving..." : "Update User" }}
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseInput from "../../../components/ui/BaseInput.vue";
import { useRoute, useRouter } from "vue-router";
import { fetchUser, updateUser } from "../api/userApi";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { toast } from "vue-sonner";

const route = useRoute();

const loading = ref(false);

const form = reactive({
  name: "",
  email: "",
});

const router = useRouter();
const saving = ref(false);
const error = ref("");

onMounted(async () => {
  loading.value = true;

  try {
    const user = await fetchUser(route.params.id);

    form.name = user.name;
    form.email = user.email;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

async function submit() {
  saving.value = true;
  error.value = "";

  try {
    await updateUser(route.params.id, form);
    toast.success("User updated successfully");
    router.push("/admin/users");
  } catch (e) {
    error.value = "Unable to update user";
    console.error(e);
  } finally {
    saving.value = false;
  }
}
</script>
