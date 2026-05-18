<template>
  <BasePageContainer>
    <BasePageHeader
      title="Settings"
      subtitle="Manage application configuration, preferences, and policies."
    />

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <BaseCard
        v-for="item in items"
        :key="item.title"
        class="transition duration-200 hover:-translate-y-1 hover:shadow-lg"
      >
        <router-link :to="item.to" class="block">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-lg font-semibold">
                {{ item.title }}
              </h2>

              <p class="mt-2 text-sm text-[var(--color-muted)]">
                {{ item.description }}
              </p>
            </div>

            <span class="text-xl"> ⚙️ </span>
          </div>
        </router-link>
      </BaseCard>
    </div>
  </BasePageContainer>
</template>

<script setup>
import BaseCard from "../../../components/ui/BaseCard.vue";
import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BasePageContainer from "../../../components/ui/BasePageContainer.vue";

const items = [
  {
    title: "Localization",
    icon: "🌐",

    description: "Manage timezone, currency, and formatting preferences.",
    to: "/admin/settings/localization",
  },

  {
    title: "Security Policies",
    icon: "🔐",

    description: "Manage login restrictions and access policies.",
    to: "/admin/settings/security",
  },

  {
    title: "Preferences",
    icon: "🎛️",

    description: "Manage UI preferences and personalization.",
    to: "/admin/settings/preferences",
  },
  {
    title: "Branding",
    icon: "🎨",

    description: "Manage logo, colors, and tenant branding.",
    to: "/admin/settings/branding",
  },
  {
    title: "Notifications",
    icon: "🔔",

    description: "Manage email, system, and push notification preferences.",
    to: "/admin/settings/notifications",
  },
  {
    title: "Integrations",
    icon: "🔌",

    description:
      "Manage third-party integrations and external service connections.",
    to: "/admin/settings/integrations",
  },
];
</script>
