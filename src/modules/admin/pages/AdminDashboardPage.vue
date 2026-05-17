<template>
  <div>
    <BaseCard>
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <p class="mt-2 text-[var(--color-muted)]">
        Welcome, {{ auth.user?.name }}
      </p>

      <div v-if="stats" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Users" :value="stats.total_users" />
        <StatsCard title="Active Users" :value="stats.active_users" />
        <StatsCard title="Inactive Users" :value="stats.inactive_users" />
        <StatsCard title="Roles" :value="stats.total_roles" />
      </div>

      <BaseCard v-if="stats?.recent_activities?.length">
        <h2 class="text-xl font-semibold mb-4">Recent Activities</h2>

        <div class="space-y-4">
          <div
            v-for="activity in stats.recent_activities"
            :key="activity.id"
            class="border-b border-[var(--color-border)] pb-4"
          >
            <div class="flex items-center justify-between">
              <div class="font-semibold capitalize">
                {{ activity.action }} {{ activity.model }}

                <span class="font-bold">
                  {{ activity.record_label }}
                </span>
              </div>

              <span
                class="px-2 py-1 rounded text-xs"
                :class="{
                  'bg-green-100 text-green-700': activity.action === 'created',

                  'bg-blue-100 text-blue-700': activity.action === 'updated',

                  'bg-red-100 text-red-700': activity.action === 'deleted',
                }"
              >
                {{ activity.action }}
              </span>
            </div>

            <div class="text-sm text-[var(--color-muted)] mt-1">
              By: {{ activity.performed_by }}
            </div>

            <div v-if="activity.action === 'updated'" class="mt-2 text-sm">
              <div v-for="(value, key) in activity.new" :key="key">
                <strong>{{ key }}</strong
                >:
                {{ activity.old[key] ?? "-" }}
                →
                {{ value }}
              </div>
            </div>

            <div v-if="activity.action === 'created'" class="mt-2 text-sm">
              Created new record
            </div>

            <div v-if="activity.action === 'deleted'" class="mt-2 text-sm">
              Deleted record
            </div>

            <div class="text-xs text-[var(--color-muted)] mt-2">
              {{ activity.created_at }}
            </div>
          </div>
        </div>
      </BaseCard>

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
