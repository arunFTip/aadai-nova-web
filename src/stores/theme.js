import { defineStore } from "pinia";

const THEME_KEY = "theme";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const useThemeStore = defineStore("theme", {
  state: () => ({
    current: getPreferredTheme(),
  }),

  getters: {
    isDark: (state) => state.current === "dark",
  },

  actions: {
    applyTheme() {
      document.documentElement.classList.toggle("dark", this.isDark);
      localStorage.setItem(THEME_KEY, this.current);
    },

    toggleTheme() {
      this.current = this.isDark ? "light" : "dark";
      this.applyTheme();
    },
  },
});
