<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-gray-900 text-white">
      <div class="p-6 border-b border-gray-800">
        <h1 class="text-2xl font-bold">Aadai Nova</h1>
      </div>

      <nav class="p-4 space-y-2">
        <router-link
          v-for="item in filteredMenu"
          :key="item.path"
          :to="item.path"
          class="block px-4 py-2 rounded hover:bg-gray-800"
          active-class="bg-gray-800"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </aside>

    <div class="flex-1">
      <header class="bg-white border-b border-gray-200 px-6 py-4">
        <h2 class="text-xl font-semibold">Admin Panel</h2>
      </header>

      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import menu from "../../modules/admin/config/menu";
import { useAuthStore } from "../../stores/auth";

const auth = useAuthStore();

const filteredMenu = computed(() => {
  return menu.filter((item) => {
    if (!item.permission) {
      return true;
    }

    return auth.hasPermission(item.permission);
  });
});
</script>
