<template>
    <div class="auth-layout bg-[var(--color-bg)] text-[var(--color-text)]">
        <router-view />
    </div>
</template>

<style scoped>
.auth-layout {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
