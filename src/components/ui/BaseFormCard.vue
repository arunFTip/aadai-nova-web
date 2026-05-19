<template>
  <BaseCard>
    <form class="space-y-4" @submit.prevent="$emit('submit')">
      <slot />
    </form>
  </BaseCard>
</template>

<script setup>
import BaseCard from "./BaseCard.vue";

defineEmits(["submit"]);
</script>
