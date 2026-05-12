<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr class="border-b">
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
        <tr v-for="item in items" :key="item.id" class="border-b">
          <td v-for="column in columns" :key="column.key" class="py-2">
            {{ item[column.key] }}
          </td>

          <td v-if="$slots.actions" class="py-2">
            <slot name="actions" :item="item" />
          </td>
        </tr>

        <tr v-if="items.length === 0">
          <td
            :colspan="$slots.actions ? columns.length + 1 : columns.length"
            class="py-6 text-center text-gray-500"
          >
            No records found
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
