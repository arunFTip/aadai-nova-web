import { defineStore } from "pinia";
import client from "../api/client";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    permissions: (state) => state.user?.permissions || [],

    hasPermission: (state) => {
      return (permission) => {
        return state.user?.permissions?.includes(permission);
      };
    },
  },
  actions: {
    async login(payload) {
      const response = await client.post("/auth/login", payload);

      this.user = response.data.data.user;
      this.token = response.data.data.token;

      localStorage.setItem("token", this.token);

      client.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const { clearBootstrapCache } = await import("./preferenceStore");
      clearBootstrapCache();
    },

    async fetchUser() {
      if (!this.token) return;

      client.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const response = await client.get("/auth/me");

      this.user = response.data.data.user;
    },

    async clearSession() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      delete client.defaults.headers.common.Authorization;

      const { clearBootstrapCache } = await import("./preferenceStore");
      clearBootstrapCache();
    },

    async logout() {
      if (this.token) {
        client.defaults.headers.common.Authorization = `Bearer ${this.token}`;

        try {
          await client.post("/auth/logout");
        } catch {
          // Still clear local session if API is unavailable.
        }
      }

      await this.clearSession();
    },
  },
});
