<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]"
  >
    <div class="text-center">
      <h1 class="text-6xl font-bold text-[var(--color-danger)] mb-4">403</h1>

      <p class="text-xl text-[var(--color-muted)] mb-6">
        You do not have permission to access this page.
      </p>

      <router-link
        to="/admin"
        class="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-contrast)] rounded"
      >
        Go Back
      </router-link>
    </div>
  </div>
</template>
