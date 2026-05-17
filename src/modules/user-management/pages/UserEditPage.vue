<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Edit User</h1>

    <BaseCard>
      <p v-if="loading">Loading user...</p>

      <form v-else class="space-y-4" @submit.prevent="submit">
        <p v-if="error" class="text-[var(--color-danger)]">
          {{ error }}
        </p>

        <BaseInput v-model="form.name" label="Name" />

        <BaseInput v-model="form.email" label="Email" type="email" />

        <div>
          <label class="block mb-2 font-semibold"> Status </label>

          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input v-model="form.status" type="radio" value="active" />

              <span>Active</span>
            </label>

            <label class="flex items-center gap-2">
              <input v-model="form.status" type="radio" value="inactive" />

              <span>Inactive</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block mb-2 font-semibold"> Role </label>

          <select v-model="form.roles" class="w-full border rounded px-3 py-2">
            <option value="">Select Role</option>

            <option v-for="role in roles" :key="role.id" :value="role.name">
              {{ role.name }}
            </option>
          </select>
        </div>

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
import { fetchUser, updateUser, updateUserRoles } from "../api/userApi";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { toast } from "vue-sonner";
import { fetchRoles } from "../../role-management/api/roleApi";

const roles = ref([]);

const route = useRoute();

const loading = ref(false);

const form = reactive({
  name: "",
  email: "",
  roles: "",
  status: "active",
});

const router = useRouter();
const saving = ref(false);
const error = ref("");

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
    roles.value = allRoles;
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
    await updateUserRoles(route.params.id, [form.roles]);
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
