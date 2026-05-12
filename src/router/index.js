import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("../layouts/auth/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("../modules/auth/pages/LoginPage.vue"),
      },
    ],
  },

  {
    path: "/admin",
    component: () => import("../layouts/admin/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "admin.dashboard",
        component: () =>
          import("../modules/admin/pages/AdminDashboardPage.vue"),
      },
      {
        path: "users",
        name: "admin.users",
        component: () =>
          import("../modules/user-management/pages/UserListPage.vue"),
      },
      {
        path: "users/create",
        name: "admin.users.create",
        component: () =>
          import("../modules/user-management/pages/UserCreatePage.vue"),
      },
    ],
  },

  {
    path: "/",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  if (to.path.startsWith("/admin") && !token) {
    return "/login";
  }

  if (to.path === "/login" && token) {
    return "/admin";
  }
});

export default router;
