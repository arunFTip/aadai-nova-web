import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
import "@vuepic/vue-datepicker/dist/main.css";
import { loadPreferences } from "./stores/preferenceStore";

const app = createApp(App);
await loadPreferences();
app.use(createPinia());
app.use(router);

app.mount("#app");
