import { ref } from "vue";

export function useFormErrors() {
  const errors = ref({});

  function setErrors(apiErrors = {}) {
    errors.value = apiErrors;
  }

  function clearErrors() {
    errors.value = {};
  }

  function first(field) {
    return errors.value[field]?.[0] || "";
  }

  function has(field) {
    return !!errors.value[field];
  }

  return {
    errors,
    setErrors,
    clearErrors,
    first,
    has,
  };
}
