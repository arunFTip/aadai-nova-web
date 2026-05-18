<template>
  <BasePageContainer>
    <BasePageHeader
      title="Security Policies"
      subtitle="Manage authentication, login restrictions, and security policies."
    />
    <SettingsSectionCard
      title="Access Policies"
      description="Control login and access restrictions."
    >
      <BaseCheckbox
        v-model="form.allow_mobile_login"
        label="Allow Mobile Login"
      />
      <BaseCheckbox
        v-model="form.allow_outside_office_login"
        label="Allow Outside Office Login"
      />
      <BaseInput
        v-model="form.session_timeout"
        type="number"
        label="Session Timeout (Minutes)"
      />
      <BaseTextarea
        v-model="form.allowed_ip_ranges"
        label="Allowed IP Ranges"
        placeholder="One IP/range per line"
      />
    </SettingsSectionCard>
    <div class="flex justify-end">
      <BaseButton :loading="saving" @click="submit"> Save Policies </BaseButton>
    </div>
  </BasePageContainer>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import BaseButton from "../../../components/ui/BaseButton.vue";
import BaseInput from "../../../components/ui/BaseInput.vue";
import BaseTextarea from "../../../components/ui/BaseTextarea.vue";
import BaseCheckbox from "../../../components/ui/BaseCheckbox.vue";
import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BasePageContainer from "../../../components/ui/BasePageContainer.vue";
import { useToast } from "../../../composables/useToast";
import SettingsSectionCard from "../components/SettingsSectionCard.vue";
import {
  fetchTenantPolicies,
  saveTenantPolicy,
} from "../api/tenantPoliciesApi";
const toast = useToast();
const saving = ref(false);
const form = reactive({
  allow_mobile_login: true,
  allow_outside_office_login: true,
  session_timeout: 120,
  allowed_ip_ranges: "",
});
onMounted(async () => {
  const policies = await fetchTenantPolicies();
  form.allow_mobile_login = policies["security.allow_mobile_login"] ?? true;
  form.allow_outside_office_login =
    policies["security.allow_outside_office_login"] ?? true;
  form.session_timeout = policies["security.session_timeout"] ?? 120;
  form.allowed_ip_ranges = policies["security.allowed_ip_ranges"] ?? "";
});
async function submit() {
  saving.value = true;
  try {
    await Promise.all([
      saveTenantPolicy(
        "security.allow_mobile_login",
        form.allow_mobile_login,
        "boolean",
      ),
      saveTenantPolicy(
        "security.allow_outside_office_login",
        form.allow_outside_office_login,
        "boolean",
      ),
      saveTenantPolicy(
        "security.session_timeout",
        form.session_timeout,
        "number",
      ),
      saveTenantPolicy(
        "security.allowed_ip_ranges",
        form.allowed_ip_ranges,
        "text",
      ),
    ]);
    toast.success("Security policies saved successfully");
  } catch (e) {
    toast.error("Unable to save security policies");
    console.error(e);
  } finally {
    saving.value = false;
  }
}
</script>
