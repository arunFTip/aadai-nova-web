<template>
  <button
    type="button"
    class="flex h-full flex-col rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow"
    :class="
      active
        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-2 ring-[var(--color-primary)]/20'
        : 'border-[var(--color-border)]'
    "
    @click="$emit('click')"
  >
    <div class="mb-3">
      <slot name="preview" />
    </div>

    <p class="font-semibold">
      {{ title }}
    </p>

    <p v-if="description" class="mt-1 text-sm text-[var(--color-muted)]">
      {{ description }}
    </p>
  </button>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  active: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>
