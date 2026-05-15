<template>
    <BaseCard>
        <h3 class="text-sm text-[var(--color-muted)]">
            {{ title }}
        </h3>

        <p class="text-3xl font-bold mt-2">
            {{ value }}
        </p>
    </BaseCard>
</template>

<script setup>
import BaseCard from './BaseCard.vue'

defineProps({
    title: String,
    value: [String, Number],
})
</script>
