<template>
  <BasePageContainer>
    <BasePageHeader
      title="Role Details"
      subtitle="View role information and assigned permissions."
    />

    <BaseDetailSection title="Role Information">
      <BaseDetailGrid :items="details" />
    </BaseDetailSection>

    <BaseDetailSection title="Assigned Permissions">
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="group in permissionGroups"
          :key="group.name"
          class="rounded-lg border border-[var(--color-border)] p-4"
        >
          <h3 class="mb-3 font-semibold">
            {{ group.name }}
          </h3>

          <div class="flex flex-wrap gap-2">
            <BaseBadge
              v-for="permission in group.permissions"
              :key="permission"
              type="info"
            >
              {{ formatLabel(permission) }}
            </BaseBadge>
          </div>
        </div>
      </div>
    </BaseDetailSection>
  </BasePageContainer>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { useRoute } from "vue-router";

import BaseBadge from "../../../components/ui/BaseBadge.vue";
import BaseDetailGrid from "../../../components/ui/BaseDetailGrid.vue";
import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BasePageContainer from "../../../components/ui/BasePageContainer.vue";
import BaseDetailSection from "../../../components/ui/BaseDetailSection.vue";

import { fetchRole } from "../api/roleApi";
import { emptyValue, formatLabel } from "../../../utils/format";

const route = useRoute();
const role = ref(null);

onMounted(async () => {
  role.value = await fetchRole(route.params.id);
});

const details = computed(() => {
  if (!role.value) {
    return [];
  }

  return [
    {
      key: "name",
      label: "Role Name",
      value: formatLabel(role.value.name),
    },
    {
      key: "description",
      label: "Description",
      value: emptyValue(role.value.description),
    },
    {
      key: "permissions_count",
      label: "Permissions",
      value: role.value.permissions?.length || 0,
    },
  ];
});

const permissionGroups = computed(() => {
  const groups = {};

  (role.value?.permissions || []).forEach((permission) => {
    const permissionName =
      typeof permission === "string" ? permission : permission.name;

    const group = permissionName.split(".")[0];

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(permissionName);
  });

  return Object.entries(groups).map(([name, permissions]) => ({
    name: formatLabel(name),
    permissions,
  }));
});
</script>
