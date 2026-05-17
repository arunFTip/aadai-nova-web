import axios from "axios";
import { useLoadingStore } from "../stores/loading";
import { toast } from "vue-sonner";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.request.use((config) => {
  const loadingStore = useLoadingStore();
  loadingStore.show();

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore();
    loadingStore.hide();

    return response;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.hide();

    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      toast.error("Session expired. Please login again.");
    } else if (status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else if (status === 422) {
      const message = error.response?.data?.message;

      if (message && !error.response?.data?.errors) {
        toast.error(message);
      }
    } else if (status >= 500) {
      toast.error("Server error occurred.");
    }

    return Promise.reject(error);
  },
);

export default client;
