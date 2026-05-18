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
app.use(createPinia());
await loadPreferences();

app.use(router);

app.mount("#app");
