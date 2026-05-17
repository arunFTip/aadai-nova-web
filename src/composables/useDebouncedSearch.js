import { watch } from "vue";

export function useDebouncedSearch(source, callback, delay = 500) {
  let timeout = null;

  watch(
    source,
    () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        callback();
      }, delay);
    },
    {
      deep: true,
    },
  );
}
