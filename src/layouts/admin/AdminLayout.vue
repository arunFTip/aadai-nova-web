<template>
  <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <div :class="layoutClass">
      <div
        :class="
          isHorizontalLayout
            ? 'min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]'
            : 'flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]'
        "
      >
        <div
          v-if="mobileSidebarOpen"
          class="fixed inset-0 z-40 bg-black/50 lg:hidden"
          @click="mobileSidebarOpen = false"
        />
        <template v-if="!isHorizontalLayout">
          <aside
            :class="[
              sidebarClass,
              mobileSidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full lg:translate-x-0',
            ]"
            class="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] transition-transform duration-300 lg:static"
          >
            <div
              class="flex items-center border-b border-white/10 px-4 py-5"
              :class="theme.sidebarMode === 'icon' ? 'justify-center' : ''"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-bg)]/10 text-xl"
              >
                🧵
              </div>

              <div v-if="theme.sidebarMode !== 'icon'" class="ml-3">
                <h1 class="text-xl font-bold text-white">Aadai Nova</h1>

                <p
                  class="text-xs"
                  :class="'text-[var(--sidebar-muted)]' || 'text-white/50'"
                >
                  ERP Platform
                </p>
              </div>
            </div>

            <nav class="p-4 space-y-2">
              <div class="space-y-6">
                <div v-for="section in filteredSections" :key="section.title">
                  <button
                    v-if="theme.sidebarMode !== 'icon'"
                    type="button"
                    class="mb-2 flex w-full items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]"
                    @click="toggleSection(section)"
                  >
                    <span>
                      {{ section.title }}
                    </span>

                    <span
                      v-if="section.collapsible"
                      class="transition-transform duration-200"
                      :class="
                        sectionState[section.title] ? 'rotate-0' : '-rotate-90'
                      "
                    >
                      ⌄
                    </span>
                  </button>
                  <transition
                    enter-active-class="transition-all duration-200 ease-out"
                    leave-active-class="transition-all duration-150 ease-in"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-96 opacity-100"
                    leave-from-class="max-h-96 opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                  >
                    <div
                      v-show="sectionState[section.title]"
                      class="space-y-1 overflow-hidden"
                    >
                      <router-link
                        v-for="item in section.items"
                        :key="item.label"
                        :to="item.to"
                        class="group relative flex items-center rounded-lg px-3 py-3 transition-all"
                        :class="[
                          theme.sidebarMode === 'icon'
                            ? 'justify-center'
                            : 'gap-3',
                          isActive(item)
                            ? activeMenuClass
                            : 'text-[var(--sidebar-muted)] hover:bg-[var(--color-bg)]/10 hover:text-white/50',
                        ]"
                        @click="mobileSidebarOpen = false"
                      >
                        <span class="text-lg">
                          {{ item.icon }}
                        </span>

                        <span
                          v-if="theme.sidebarMode !== 'icon'"
                          class="whitespace-nowrap"
                        >
                          {{ item.label }}
                        </span>

                        <div
                          v-if="theme.sidebarMode === 'icon'"
                          class="absolute left-16 hidden rounded-md bg-black px-2 py-1 text-xs text-white shadow-lg group-hover:block"
                        >
                          {{ item.label }}
                        </div>
                      </router-link>
                    </div>
                  </transition>
                </div>
              </div>
            </nav>
            <div
              class="border-t p-4"
              :class="sidebarUiClass?.border || 'border-white/10'"
            >
              <button
                type="button"
                class="flex w-full items-center rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-[var(--color-bg)]/10 hover:text-white"
                :class="
                  theme.sidebarMode === 'icon' ? 'justify-center' : 'gap-3'
                "
                @click="toggleSidebar"
              >
                <span>
                  {{ theme.sidebarMode === "icon" ? "➡️" : "⬅️" }}
                </span>

                <span v-if="theme.sidebarMode !== 'icon'">
                  Collapse Sidebar
                </span>
              </button>
            </div>
          </aside>
        </template>

        <aside
          v-if="showSecondarySidebar && !isHorizontalLayout"
          class="hidden w-56 border-r border-[var(--color-border)] bg-[var(--color-card)] md:flex md:flex-col"
        >
          <div class="border-b border-[var(--color-border)] p-4">
            <h3
              class="mb-4 text-sm font-semibold uppercase text-[var(--color-muted)]"
            >
              Settings
            </h3>
            <p class="mt-1 text-xs text-[var(--color-muted)]">
              Configure application preferences and system behavior.
            </p>
          </div>

          <nav class="space-y-1">
            <router-link
              v-for="item in secondaryMenuItems"
              :key="item.label"
              :to="item.to"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-[var(--color-table-row-hover)]"
              :class="
                isActive(item)
                  ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)] font-semibold'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-table-row-hover)]'
              "
            >
              <span>{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </router-link>
          </nav>
        </aside>

        <div class="flex-1">
          <div
            v-if="isHorizontalLayout"
            class="border-b border-[var(--color-border)] bg-[var(--color-card)] px-6 py-3"
          >
            <nav class="flex items-center gap-2 overflow-x-auto">
              <template
                v-for="section in filteredSections"
                :key="section.title"
              >
                <router-link
                  v-for="item in section.items"
                  :key="item.label"
                  :to="item.to"
                  class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap"
                  :class="
                    isActive(item)
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)]'
                      : 'hover:bg-[var(--color-table-row-hover)]'
                  "
                >
                  <span>{{ item.icon }}</span>
                  <span>{{ item.label }}</span>
                </router-link>
              </template>
            </nav>
            <div
              v-if="isHorizontalLayout && showSecondarySidebar"
              class="border-b border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-2"
            >
              <nav class="flex items-center gap-2 overflow-x-auto">
                <router-link
                  v-for="item in secondaryMenuItems"
                  :key="item.label"
                  :to="item.to"
                  class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap"
                  :class="
                    isActive(item)
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)]'
                      : 'hover:bg-[var(--color-table-row-hover)]'
                  "
                >
                  <span>{{ item.icon }}</span>
                  <span>{{ item.label }}</span>
                </router-link>
              </nav>
            </div>
          </div>
          <header
            :class="headerClass"
            class="border-b border-[var(--header-border)] bg-[var(--header-bg)] px-6 py-4 text-[var(--header-text)]"
          >
            <h2 class="text-xl font-semibold">Admin Panel</h2>
            <button
              type="button"
              class="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
              @click="mobileSidebarOpen = true"
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
import { computed, watchEffect, reactive, ref } from "vue";
import menu from "../../modules/admin/config/menu";
import { useAuthStore } from "../../stores/auth";
import { useThemeStore } from "../../stores/theme";
import { useRoute } from "vue-router";
import { getThemeSettings } from "../../utils/theme";
import {
  setPreference,
  getPreference,
  getAllPreferences,
} from "../../stores/preferenceStore";
import { adminMenu } from "../../layouts/admin/menu/adminMenu";
import { settingsMenu } from "../../layouts/admin/menu/settingsMenu";

const auth = useAuthStore();
const themeStore = useThemeStore();

const mobileSidebarOpen = ref(false);

const menuItems = menu;

const theme = computed(() => getThemeSettings());

// const theme = computed(() => ({
//   layoutWidth: preferences["theme.layout_width"] || "full",
//   sidebarMode: preferences["theme.sidebar_mode"] || "expanded",
//   sidebarOrientation: preferences["theme.sidebar_orientation"] || "vertical",
//   headerPosition: preferences["theme.header_position"] || "scrollable",
//   mode: preferences["theme.mode"] || "light",
//   skin: preferences["theme.skin"] || "green",
//   sidebarColor: preferences["theme.sidebar_color"] || "dark",
//   headerColor: preferences["theme.header_color"] || "light",
// }));

const preferences = getAllPreferences();

watchEffect(() => {
  document.documentElement.classList.toggle(
    "dark",
    preferences["theme.mode"] === "dark",
  );
});

const layoutClass = computed(() => {
  return theme.value.layoutWidth === "boxed" ? "mx-auto max-w-7xl" : "w-full";
});

const isHorizontalLayout = computed(() => {
  return theme.value.sidebarOrientation === "horizontal";
});

const filteredSections = computed(() => {
  return adminMenu
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        auth.hasPermission(item.permission),
      ),
    }))
    .filter((section) => section.items.length > 0);
});

const headerClass = computed(() => {
  return theme.value.headerPosition === "fixed" ? "sticky top-0 z-30" : "";
});

const activeMenuClass = computed(() => {
  const styles = {
    green:
      "bg-gradient-to-r from-emerald-900/90 to-emerald-700/70 text-white shadow-lg ring-1 ring-emerald-500/20",

    blue: "bg-gradient-to-r from-blue-900/90 to-blue-700/70 text-white shadow-lg ring-1 ring-blue-500/20",

    sky: "bg-gradient-to-r from-sky-900/90 to-sky-700/70 text-white shadow-lg ring-1 ring-sky-500/20",

    yellow:
      "bg-gradient-to-r from-yellow-800/90 to-yellow-600/70 text-black shadow-lg ring-1 ring-yellow-400/20",

    slate:
      "bg-gradient-to-r from-slate-800/90 to-slate-600/70 text-white shadow-lg ring-1 ring-slate-400/20",
  };

  return styles[theme.value.skin] || styles.green;
});

const showSecondarySidebar = computed(() => {
  return route.path.startsWith("/admin/settings");
});

const secondaryMenuItems = computed(() => {
  if (!showSecondarySidebar.value) {
    return [];
  }

  return settingsMenu.filter((item) => auth.hasPermission(item.permission));
});

const route = useRoute();

watchEffect(() => {
  document.documentElement.classList.toggle(
    "dark",
    theme.value.mode === "dark",
  );
});

const sectionState = reactive(getPreference("theme.sidebar_sections", {}));

adminMenu.forEach((section) => {
  if (sectionState[section.title] === undefined) {
    sectionState[section.title] = section.open ?? true;
  }
});

filteredSections.value.forEach((section) => {
  const hasActiveItem = section.items.some((item) => isActive(item));

  if (hasActiveItem) {
    sectionState[section.title] = true;
  }
});

function toggleSection(section) {
  if (!section.collapsible) {
    return;
  }

  sectionState[section.title] = !sectionState[section.title];

  setPreference("theme.sidebar_sections", { ...sectionState });
}

function isActive(item) {
  if (item.to === "/admin") {
    return route.path === "/admin";
  }

  return route.path === item.to || route.path.startsWith(`${item.to}/`);
}

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
