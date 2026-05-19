<template>
  <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <div :class="layoutClass">
      <div
        class="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"
      >
        <aside :class="sidebarClass" class="transition-all duration-300">
          <div class="p-6 border-b border-[var(--color-border)]">
            <h1 class="text-2xl font-bold">Aadai Nova</h1>
          </div>

          <nav class="p-4 space-y-2">
            <router-link
              v-for="item in menuItems"
              :key="item.label"
              :to="item.to"
              class="group relative flex items-center rounded-lg px-3 py-3 transition-all"
              :class="[
                theme.sidebarMode === 'icon' ? 'justify-center' : 'gap-3',

                isActive(item)
                  ? 'bg-[var(--color-primary)] text-white shadow'
                  : 'hover:bg-[var(--color-sidebar-hover)]',
              ]"
            >
              <span>{{ item.icon }}</span>
              <span>{{ item.label }}</span>
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
              class="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
              @click="toggleSidebar"
            >
              ☰
            </button>

            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded border border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-text)] hover:bg-[var(--color-bg)]"
              :aria-label="
                themeStore.isDark
                  ? 'Switch to light theme'
                  : 'Switch to dark theme'
              "
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
    </div>
  </div>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import menu from "../../modules/admin/config/menu";
import { useAuthStore } from "../../stores/auth";
import { useThemeStore } from "../../stores/theme";
import { useRoute } from "vue-router";
import { getThemeSettings } from "../../utils/theme";
import { setPreference } from "../../stores/preferenceStore";

const auth = useAuthStore();
const themeStore = useThemeStore();

const menuItems = menu;

const theme = computed(() => getThemeSettings());
const sidebarClass = computed(() => "w-64");

const layoutClass = computed(() => {
  return theme.value.layoutWidth === "boxed" ? "mx-auto max-w-7xl" : "w-full";
});

const route = useRoute();

watchEffect(() => {
  document.documentElement.classList.toggle(
    "dark",
    theme.value.mode === "dark",
  );
});

function isActive(item) {
  if (item.to === "/admin") {
    return route.path === "/admin";
  }

  return route.path === item.to || route.path.startsWith(`${item.to}/`);
}

// const sidebarClass = computed(() => {
//   if (theme.value.sidebarMode === "icon") {
//     return "w-20";
//   }

//   if (theme.value.sidebarMode === "collapsed") {
//     return "w-24";
//   }

//   return "w-64";
// });

function toggleSidebar() {
  const nextMode = theme.value.sidebarMode === "icon" ? "expanded" : "icon";

  setPreference("theme.sidebar_mode", nextMode);
}

const filteredMenu = computed(() => {
  return menu.filter((item) => {
    if (!item.permission) {
      return true;
    }

    return auth.hasPermission(item.permission);
  });
});
</script>
