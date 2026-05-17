<template>
  <div class="space-y-4">
    <div v-for="item in items" :key="item.id" class="flex gap-4">
      <div class="flex flex-col items-center">
        <div class="mt-1 h-3 w-3 rounded-full bg-[var(--color-primary)]" />

        <div class="mt-1 flex-1 w-px bg-[var(--color-border)]" />
      </div>

      <div class="flex-1 pb-4">
        <div class="flex items-center gap-2">
          <BaseBadge :type="badgeType(item.action)">
            {{ item.action }}
          </BaseBadge>

          <p class="font-medium">
            {{ item.model }}

            <span v-if="item.record_label"> - {{ item.record_label }} </span>
          </p>
        </div>

        <p class="mt-1 text-sm text-[var(--color-muted)]">
          By {{ item.performed_by || item.user || "System" }}
        </p>
        <p class="mt-1 text-xs text-[var(--color-muted)]">
          {{ item.date || item.created_at }}
        </p>

        <p class="mt-1 text-xs text-[var(--color-muted)]">
          {{ item.date }}
        </p>

        <div
          v-if="item.old && item.new"
          class="mt-2 text-sm text-[var(--color-muted)]"
        >
          <div v-for="(value, key) in item.new" :key="key" class="mb-1">
            <strong>{{ key }}</strong
            >:
            {{ item.old[key] ?? "-" }}
            →
            {{ value }}
          </div>
        </div>

        <div
          v-else-if="item.old || item.new"
          class="mt-2 text-sm text-[var(--color-muted)]"
        >
          {{
            item.action === "deleted" ? "Deleted record" : "Created new record"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseBadge from "./BaseBadge.vue";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

function badgeType(action) {
  const value = String(action).toLowerCase().trim();

  switch (value) {
    case "created":
      return "success";

    case "updated":
      return "warning";

    case "deleted":
      return "danger";

    default:
      return "default";
  }
}
</script>
