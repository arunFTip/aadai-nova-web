<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Create Role</h1>

    <BaseCard>
      <form class="space-y-4" @submit.prevent="submit">
        <BaseFormSection
          title="Role Information"
          description="Create a new role and assign permissions."
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
          :loading="loading"
          submit-text="Create Role"
          loading-text="Creating..."
          cancel-to="/admin/roles"
        />
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
import { useToast } from "../../../composables/useToast";
import { createRole, fetchPermissions } from "../api/roleApi";
import { useFormErrors } from "../../../composables/useFormErrors";
import BaseFormSection from "../../../components/ui/BaseFormSection.vue";
import BaseFormActions from "../../../components/ui/BaseFormActions.vue";

const permissions = ref([]);
const router = useRouter();
const loading = ref(false);

const form = reactive({
  name: "",
  permissions: [],
});

const { errors, setErrors, clearErrors, first, has } = useFormErrors();

const toast = useToast();

onMounted(async () => {
  permissions.value = await fetchPermissions();
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
