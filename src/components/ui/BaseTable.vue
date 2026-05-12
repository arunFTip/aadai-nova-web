<template>
    <div class="overflow-x-auto">
        <table class="w-full text-left">
            <thead>
                <tr class="border-b">
                    <th
                        v-for="column in columns"
                        :key="column.key"
                        class="py-2"
                    >
                        {{ column.label }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="item in items"
                    :key="item.id"
                    class="border-b"
                >
                <tr v-if="items.length === 0">
    <td
        :colspan="columns.length"
        class="py-6 text-center text-gray-500"
    >
        No records found
    </td>
</tr>
                    <td
                        v-for="column in columns"
                        :key="column.key"
                        class="py-2"
                    >
                        {{ item[column.key] }}
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
})
</script>