<script setup>
import { onMounted } from "vue";
import { Toaster } from "vue-sonner";
import GlobalLoader from "./components/ui/GlobalLoader.vue";
import { useThemeStore } from "./stores/theme";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.applyTheme();
});
</script>

<template>
  <router-view />
  <Toaster rich-colors position="top-right" :theme="themeStore.current" />
  <GlobalLoader />
</template>
