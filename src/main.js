import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
import "@vuepic/vue-datepicker/dist/main.css";
import { loadPreferences } from "./stores/preferenceStore";
import { fetchThemeSettings } from "./modules/settings/api/themeSettingsApi";
import { applyThemeSettings } from "./utils/applyThemeSettings";

const app = createApp(App);
app.use(createPinia());
await loadPreferences();
try {
  const themeSettings = await fetchThemeSettings();

  applyThemeSettings(themeSettings);
} catch (e) {
  console.error("Unable to load theme settings", e);
}

app.use(router);

app.mount("#app");
