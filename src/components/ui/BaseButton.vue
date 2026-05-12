<template>
    <button
        class="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
        :disabled="disabled"
    >
        <slot />
    </button>
</template>

<script setup>
defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
})
</script>