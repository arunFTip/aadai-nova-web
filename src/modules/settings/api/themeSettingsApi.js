import { saveUserPreference } from "../../user-preferences/api/userPreferenceApi";

export async function saveThemeSettings(form) {
  await Promise.all([
    saveUserPreference("theme.layout_width", form.layout_width),
    saveUserPreference("theme.sidebar_mode", form.sidebar_mode),
    saveUserPreference("theme.header_position", form.header_position),
    saveUserPreference("theme.mode", form.theme_mode),
    saveUserPreference("theme.skin", form.skin),
    saveUserPreference("theme.sidebar_color", form.sidebar_color),
    saveUserPreference("theme.header_color", form.header_color),
  ]);
}
