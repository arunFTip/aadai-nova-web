<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="$emit('close')"
  >
    <div
      class="w-full rounded-xl bg-[var(--color-card)] shadow-xl"
      :class="maxWidth"
    >
      <div
        v-if="title || $slots.header"
        class="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4"
      >
        <slot name="header">
          <h2 class="text-lg font-semibold">
            {{ title }}
          </h2>
        </slot>

        <button
          class="text-[var(--color-muted)] hover:text-[var(--color-text)]"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>

      <div class="p-6">
        <slot />
      </div>

      <div
        v-if="$slots.footer"
        class="border-t border-[var(--color-border)] px-6 py-4"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: "",
  },

  size: {
    type: String,
    default: "md",
  },
});

const emit = defineEmits(["close"]);

const maxWidth = computed(() => {
  switch (props.size) {
    case "sm":
      return "max-w-sm";

    case "lg":
      return "max-w-4xl";

    case "xl":
      return "max-w-6xl";

    default:
      return "max-w-2xl";
  }
});

function handleEscape(event) {
  if (event.key === "Escape" && props.show) {
    emit("close");
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEscape);
});
</script>
