import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

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
        meta: {
          permission: "user.view",
        },
      },
      {
        path: "users/create",
        name: "admin.users.create",
        component: () =>
          import("../modules/user-management/pages/UserCreatePage.vue"),
      },
      {
        path: "users/:id/edit",
        name: "admin.users.edit",
        component: () =>
          import("../modules/user-management/pages/UserEditPage.vue"),
      },
      {
        path: "activity-logs",
        name: "admin.activity-logs",
        component: () =>
          import("../modules/activity-logs/pages/ActivityLogListPage.vue"),
        meta: {
          permission: "activity-log.view",
        },
      },
      {
        path: "roles",
        name: "admin.roles",
        component: () =>
          import("../modules/role-management/pages/RoleListPage.vue"),
        meta: {
          permission: "admin.view",
        },
      },
      {
        path: "roles/create",
        name: "admin.roles.create",
        component: () =>
          import("../modules/role-management/pages/RoleCreatePage.vue"),
        meta: {
          permission: "admin.create",
        },
      },

      {
        path: "roles/:id/edit",
        name: "admin.roles.edit",
        component: () =>
          import("../modules/role-management/pages/RoleEditPage.vue"),
        meta: {
          permission: "admin.update",
        },
      },
    ],
  },

  {
    path: "/403",
    name: "forbidden",
    component: () => import("../modules/errors/pages/ForbiddenPage.vue"),
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

router.beforeEach(async (to) => {
  const token = localStorage.getItem("token");

  if (to.path.startsWith("/admin") && !token) {
    return "/login";
  }

  const auth = useAuthStore();

  if (token && !auth.user) {
    try {
      await auth.fetchUser();
    } catch {
      auth.logout();
      return "/login";
    }
  }

  if (to.meta.permission) {
    const allowed = auth.hasPermission(to.meta.permission);

    if (!allowed) {
      return "/403";
    }
  }

  if (to.path === "/login" && token) {
    return "/403";
  }
});

export default router;
