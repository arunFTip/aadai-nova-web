import { setPreference } from "../stores/preferenceStore";

export function applyThemeSettings(settings = {}) {
  setPreference("theme.layout_width", settings["theme.layout_width"] || "full");

  setPreference(
    "theme.sidebar_mode",
    settings["theme.sidebar_mode"] || "expanded",
  );

  setPreference(
    "theme.sidebar_orientation",
    settings["theme.sidebar_orientation"] || "vertical",
  );

  setPreference(
    "theme.header_position",
    settings["theme.header_position"] || "scrollable",
  );

  setPreference("theme.mode", settings["theme.mode"] || "light");

  setPreference("theme.skin", settings["theme.skin"] || "green");

  setPreference(
    "theme.sidebar_color",
    settings["theme.sidebar_color"] || "dark",
  );

  setPreference(
    "theme.header_color",
    settings["theme.header_color"] || "light",
  );
}
