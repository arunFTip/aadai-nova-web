<template>
  <div>
    <BasePageHeader
      title="Settings"
      subtitle="Manage application configuration, preferences, and policies."
    />

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <BaseCard
        v-for="item in items"
        :key="item.title"
        class="transition hover:shadow-lg"
      >
        <router-link :to="item.to">
          <h2 class="text-lg font-semibold">
            {{ item.title }}
          </h2>

          <p class="mt-2 text-sm text-[var(--color-muted)]">
            {{ item.description }}
          </p>
        </router-link>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import BaseCard from "../../../components/ui/BaseCard.vue";
import BasePageHeader from "../../../components/ui/BasePageHeader.vue";

const items = [
  {
    title: "Localization",
    description: "Manage timezone, currency, and formatting preferences.",
    to: "/admin/settings/localization",
  },

  {
    title: "Security Policies",
    description: "Manage login restrictions and access policies.",
    to: "/admin/settings/security",
  },

  {
    title: "Preferences",
    description: "Manage UI preferences and personalization.",
    to: "/admin/settings/preferences",
  },
  {
    title: "Branding",
    description: "Manage logo, colors, and tenant branding.",
    to: "/admin/settings/branding",
  },
  {
    title: "Notifications",
    description: "Manage email, system, and push notification preferences.",
    to: "/admin/settings/notifications",
  },
  {
    title: "Integrations",
    description:
      "Manage third-party integrations and external service connections.",
    to: "/admin/settings/integrations",
  },
];
</script>
