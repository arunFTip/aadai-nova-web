<template>
  <div>
    <BaseCard>
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <p class="mt-2 text-[var(--color-muted)]">
        Welcome, {{ auth.user?.name }}
      </p>

      <BaseSection
        title="Overview"
        description="System summary and key statistics."
      >
        <div
          v-if="stats"
          class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          <BaseStatCard
            title="Total Users"
            :value="stats.total_users"
            description="Total registered users"
            icon="👤"
          />

          <BaseStatCard
            title="Active Users"
            :value="stats.active_users"
            description="Currently active users"
            icon="✅"
          />

          <BaseStatCard
            title="Inactive Users"
            :value="stats.inactive_users"
            description="Inactive user accounts"
            icon="🚫"
          />

          <BaseStatCard
            title="Roles"
            :value="stats.total_roles"
            description="Available system roles"
            icon="🛡️"
          />
        </div>
      </BaseSection>

      <BaseSection
        title="Recent Activities"
        description="Latest user and system actions."
      >
        <BaseCard v-if="stats?.recent_activities?.length">
          <div class="space-y-4">
            <BaseActivityTimeline
              v-if="stats?.recent_activities?.length"
              :items="stats.recent_activities"
            />
          </div>
        </BaseCard>
      </BaseSection>

      <BaseButton @click="logout"> Logout </BaseButton>
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth";
import BaseButton from "../../../components/ui/BaseButton.vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import StatsCard from "../../../components/ui/StatsCard.vue";
import { fetchDashboardStats } from "../../dashboard/api/dashboardApi";
import BaseStatCard from "../../../components/ui/BaseStatCard.vue";
import BaseSection from "../../../components/ui/BaseSection.vue";
import BaseActivityTimeline from "../../../components/ui/BaseActivityTimeline.vue";

const router = useRouter();
const auth = useAuthStore();
const stats = ref(null);

onMounted(async () => {
  await auth.fetchUser();
  stats.value = await fetchDashboardStats();
});

async function logout() {
  await auth.logout();
  router.push("/login");
}
</script>
