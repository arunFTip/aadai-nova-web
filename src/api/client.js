import axios from "axios";
import { useLoadingStore } from "../stores/loading";

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

    return Promise.reject(error);
  },
);

export default client;
