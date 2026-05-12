<template>
  <div>
    <label v-if="label" class="block text-sm font-medium mb-1">
      {{ label }}
    </label>

    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border border-gray-300 rounded"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p v-if="error" class="text-sm text-red-600 mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  error: String,
});

defineEmits(["update:modelValue"]);
</script>
