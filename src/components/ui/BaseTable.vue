<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr class="border-b border-[var(--color-border)]">
          <th
            v-for="column in columns"
            :key="column.key"
            class="py-2 cursor-pointer select-none"
            @click="$emit('sort', column.key)"
          >
            {{ column.label }}
          </th>

          <th v-if="$slots.actions" class="py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
          class="border-b border-[var(--color-border)] odd:bg-[var(--color-table-row)] even:bg-[var(--color-table-row-alt)] hover:bg-[var(--color-table-row-hover)]"
        >
          <td v-for="column in columns" :key="column.key" class="py-2">
            <slot :name="column.key" :item="item">
              {{ item[column.key] }}
            </slot>
          </td>

          <td v-if="$slots.actions" class="py-2">
            <slot name="actions" :item="item" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: Array,
  items: Array,
});
defineEmits(["sort"]);
</script>
