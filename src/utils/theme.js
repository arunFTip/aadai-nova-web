import { getPreference } from "../stores/preferenceStore";

export function getThemeSettings() {
  return {
    layoutWidth: getPreference("theme.layout_width", "full"),
    sidebarMode: getPreference("theme.sidebar_mode", "expanded"),
    headerPosition: getPreference("theme.header_position", "scrollable"),
    mode: getPreference("theme.mode", "light"),
    skin: getPreference("theme.skin", "green"),
    sidebarColor: getPreference("theme.sidebar_color", "dark"),
    headerColor: getPreference("theme.header_color", "light"),
    sidebarOrientation: getPreference("theme.sidebar_orientation", "vertical"),
  };
}
