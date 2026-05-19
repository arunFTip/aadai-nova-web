<template>
  <BasePageContainer>
    <BasePageHeader
      title="User Details"
      subtitle="View complete user information."
    />

    <BaseDetailSection
      title="Basic Information"
      description="User account details and access information."
    >
      <BaseDetailGrid :items="details" />
    </BaseDetailSection>
  </BasePageContainer>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { useRoute } from "vue-router";

import BasePageContainer from "../../../components/ui/BasePageContainer.vue";
import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BaseDetailSection from "../../../components/ui/BaseDetailSection.vue";
import BaseDetailGrid from "../../../components/ui/BaseDetailGrid.vue";

import { fetchUser } from "../api/userApi";

const route = useRoute();

const user = ref(null);

onMounted(async () => {
  user.value = await fetchUser(route.params.id);
});

const details = computed(() => {
  if (!user.value) {
    return [];
  }

  return [
    {
      key: "name",
      label: "Name",
      value: user.value.name,
    },

    {
      key: "email",
      label: "Email",
      value: user.value.email,
    },

    {
      key: "status",
      label: "Status",
      value: user.value.status,
    },

    {
      key: "roles",
      label: "Roles",
      value: user.value.roles?.join(", "),
    },

    {
      key: "created_at",
      label: "Created At",
      value: user.value.created_at,
    },
  ];
});
</script>
