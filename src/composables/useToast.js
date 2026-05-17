import { toast } from "vue-sonner";

export function useToast() {
  function success(message) {
    toast.success(message);
  }

  function error(message) {
    toast.error(message);
  }

  function warning(message) {
    toast.warning(message);
  }

  function info(message) {
    toast.info(message);
  }

  return {
    success,
    error,
    warning,
    info,
  };
}
