<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Create Role</h1>

    <BaseCard>
      <form class="space-y-4" @submit.prevent="submit">
        <BaseInput
          v-model="form.name"
          label="Role Name"
          placeholder="Enter role name"
        />

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

        <BaseButton :disabled="loading">
          {{ loading ? "Saving..." : "Save Role" }}
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import BaseInput from "../../../components/ui/BaseInput.vue";
import BaseButton from "../../../components/ui/BaseButton.vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { createRole, fetchPermissions } from "../api/roleApi";

const permissions = ref([]);
const router = useRouter();
const loading = ref(false);

const form = reactive({
  name: "",
  permissions: [],
});

onMounted(async () => {
  permissions.value = await fetchPermissions();
});

async function submit() {
  loading.value = true;

  try {
    await createRole(form);

    toast.success("Role created successfully");

    router.push("/admin/roles");
  } catch (e) {
    toast.error("Unable to create role");
    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>
