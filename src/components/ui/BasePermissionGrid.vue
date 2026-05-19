<template>
  <div class="space-y-4">
    <div v-for="group in groups" :key="group.name">
      <h3 class="mb-3 font-semibold">
        {{ group.name }}
      </h3>

      <div class="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        <label
          v-for="permission in group.permissions"
          :key="permission"
          class="flex items-center gap-2 rounded border border-[var(--color-border)] p-3"
        >
          <input
            :checked="modelValue.includes(permission)"
            type="checkbox"
            @change="toggle(permission)"
          />

          <span class="text-sm">
            {{ formatPermission(permission) }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },

  groups: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
function formatPermission(permission) {
  return permission
    .replaceAll(".", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toggle(permission) {
  const values = [...props.modelValue];

  const index = values.indexOf(permission);

  if (index >= 0) {
    values.splice(index, 1);
  } else {
    values.push(permission);
  }

  emit("update:modelValue", values);
}
</script>
