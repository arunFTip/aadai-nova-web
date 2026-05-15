<template>
  <div class="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <aside
      class="w-64 bg-[var(--color-sidebar)] text-[var(--color-sidebar-text)]"
    >
      <div class="p-6 border-b border-[var(--color-border)]">
        <h1 class="text-2xl font-bold">Aadai Nova</h1>
      </div>

      <nav class="p-4 space-y-2">
        <router-link
          v-for="item in filteredMenu"
          :key="item.path"
          :to="item.path"
          class="block px-4 py-2 rounded hover:bg-[var(--color-sidebar-hover)]"
          active-class="bg-[var(--color-sidebar-hover)]"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </aside>

    <div class="flex-1">
      <header
        class="bg-[var(--color-card)] border-b border-[var(--color-border)] px-6 py-4 flex items-center justify-between"
      >
        <h2 class="text-xl font-semibold">Admin Panel</h2>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded border border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-text)] hover:bg-[var(--color-bg)]"
          :aria-label="themeStore.isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :title="themeStore.isDark ? 'Light theme' : 'Dark theme'"
          @click="themeStore.toggleTheme"
        >
          <svg
            v-if="themeStore.isDark"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>
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
import { useThemeStore } from "../../stores/theme";

const auth = useAuthStore();
const themeStore = useThemeStore();

const filteredMenu = computed(() => {
  return menu.filter((item) => {
    if (!item.permission) {
      return true;
    }

    return auth.hasPermission(item.permission);
  });
});
</script>
