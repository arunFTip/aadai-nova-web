<template>
  <div>
    <BaseCard>
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <p class="mt-2 text-[var(--color-muted)]">Welcome, {{ auth.user?.name }}</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <StatsCard title="Users" value="120" />
        <StatsCard title="Sales" value="45" />
        <StatsCard title="Revenue" value="$12,500" />
      </div>

      <BaseButton @click="logout"> Logout </BaseButton>
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth";
import BaseButton from "../../../components/ui/BaseButton.vue";
import BaseCard from "../../../components/ui/BaseCard.vue";
import StatsCard from "../../../components/ui/StatsCard.vue";

const router = useRouter();
const auth = useAuthStore();

onMounted(async () => {
  await auth.fetchUser();
});

async function logout() {
  await auth.logout();
  router.push("/login");
}
</script>
