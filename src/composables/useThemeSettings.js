import { computed } from "vue";
import { usePreferencesStore } from "@/stores/preferences";

export function useThemeSettings() {
  const preferences = usePreferencesStore();

  const themeMode = computed(() => preferences.themeMode || "light");

  const sidebarMode = computed(() => preferences.sidebarMode || "expanded");

  const layoutMode = computed(() => preferences.layoutMode || "full");

  const skin = computed(() => preferences.skin || "default");

  return {
    themeMode,
    sidebarMode,
    layoutMode,
    skin,
  };
}
