<script setup>
import { Toaster } from "vue-sonner";
import GlobalLoader from "./components/ui/GlobalLoader.vue";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <router-view />
  <Toaster rich-colors position="top-right" />
  <GlobalLoader />
</template>
