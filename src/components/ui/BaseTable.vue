<template>
  <div>
    <div
      v-if="$slots.toolbar || $slots.leftToolbar"
      class="mb-3 flex items-center justify-between"
    >
      <div>
        <slot name="leftToolbar" />
      </div>

      <div class="flex justify-end">
        <slot name="toolbar" />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-[var(--color-border)]">
            <th class="py-2">S.No</th>

            <th
              v-for="column in columns"
              :key="column.key"
              class="py-2 cursor-pointer select-none"
              @click="$emit('sort', column.key)"
            >
              <div class="flex items-center gap-1">
                {{ column.label }}

                <span v-if="sortBy === column.key">
                  {{ sortDirection === "asc" ? "▲" : "▼" }}
                </span>
              </div>
            </th>

            <th v-if="$slots.actions" class="py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
            class="border-b border-[var(--color-border)] odd:bg-[var(--color-table-row)] even:bg-[var(--color-table-row-alt)] hover:bg-[var(--color-table-row-hover)]"
          >
            <td class="py-2">
              {{
                ((pagination?.current_page || 1) - 1) *
                  (pagination?.per_page || items.length) +
                index +
                1
              }}
            </td>

            <td v-for="column in columns" :key="column.key" class="py-2">
              <slot :name="column.key" :item="item">
                {{ item[column.key] }}
              </slot>
            </td>

            <td v-if="$slots.actions" class="py-2">
              <slot name="actions" :item="item" />
            </td>
          </tr>

          <tr v-if="items.length === 0">
            <td
              :colspan="
                $slots.actions ? columns.length + 2 : columns.length + 1
              "
              class="py-6"
            >
              <BaseEmptyState
                title="No records found"
                description="There are no records to display right now."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import BaseEmptyState from "./BaseEmptyState.vue";

defineProps({
  columns: {
    type: Array,
    default: () => [],
  },

  items: {
    type: Array,
    default: () => [],
  },

  pagination: {
    type: Object,
    default: null,
  },
  sortBy: {
    type: String,
    default: "",
  },

  sortDirection: {
    type: String,
    default: "asc",
  },
});

defineEmits(["sort"]);
</script>
