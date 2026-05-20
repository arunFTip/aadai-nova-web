const skins = {
  green: {
    primary: "#059669",
    primaryHover: "#047857",
    primaryContrast: "#ffffff",
  },
  blue: {
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryContrast: "#ffffff",
  },
  sky: {
    primary: "#0284c7",
    primaryHover: "#0369a1",
    primaryContrast: "#ffffff",
  },
  yellow: {
    primary: "#ca8a04",
    primaryHover: "#a16207",
    primaryContrast: "#111827",
  },
  slate: {
    primary: "#475569",
    primaryHover: "#334155",
    primaryContrast: "#ffffff",
  },
};

const sidebarThemes = {
  dark: { bg: "#111827", text: "#f9fafb", muted: "#9ca3af" },
  light: { bg: "#ffffff", text: "#111827", muted: "#6b7280" },
  green: { bg: "#065f46", text: "#ecfdf5", muted: "#a7f3d0" },
  blue: { bg: "#1e3a8a", text: "#eff6ff", muted: "#bfdbfe" },
  slate: { bg: "#334155", text: "#f8fafc", muted: "#cbd5e1" },
};

const headerThemes = {
  light: { bg: "#ffffff", text: "#111827", border: "#e5e7eb" },
  dark: { bg: "#111827", text: "#f9fafb", border: "#374151" },
  green: { bg: "#065f46", text: "#ecfdf5", border: "#047857" },
  blue: { bg: "#1e3a8a", text: "#eff6ff", border: "#2563eb" },
  slate: { bg: "#334155", text: "#f8fafc", border: "#475569" },
};

const appThemes = {
  light: {
    bg: "#f5f7fb",
    surface: "#ffffff",
    text: "#111827",
    muted: "#6b7280",
    border: "#e5e7eb",
  },
  dark: {
    bg: "#0f172a",
    surface: "#111827",
    text: "#f9fafb",
    muted: "#9ca3af",
    border: "#1f2937",
  },
};

export function applyThemeVariables(theme = {}) {
  const root = document.documentElement;

  const skin = skins[theme.skin || "green"] || skins.green;
  const app = appThemes[theme.mode || "light"] || appThemes.light;
  const sidebar =
    sidebarThemes[theme.sidebar_color || "dark"] || sidebarThemes.dark;
  const header =
    headerThemes[theme.header_color || "light"] || headerThemes.light;

  root.style.setProperty("--color-primary", skin.primary);
  root.style.setProperty("--color-primary-hover", skin.primaryHover);
  root.style.setProperty("--color-primary-contrast", skin.primaryContrast);

  root.style.setProperty("--color-bg", app.bg);
  root.style.setProperty("--color-surface", app.surface);
  root.style.setProperty("--color-text", app.text);
  root.style.setProperty("--color-muted", app.muted);
  root.style.setProperty("--color-border", app.border);

  root.style.setProperty("--sidebar-bg", sidebar.bg);
  root.style.setProperty("--sidebar-text", sidebar.text);
  root.style.setProperty("--sidebar-muted", sidebar.muted);

  root.style.setProperty("--header-bg", header.bg);
  root.style.setProperty("--header-text", header.text);
  root.style.setProperty("--header-border", header.border);

  root.classList.toggle("dark", theme.mode === "dark");
}
