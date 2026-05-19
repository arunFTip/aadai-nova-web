export const adminMenu = [
  {
    title: "Main",
    collapsible: false,
    open: true,
    items: [
      {
        label: "Dashboard",
        icon: "🏠",
        to: "/admin",
        permission: "admin.view",
      },
    ],
  },

  {
    title: "Administration",
    collapsible: true,
    open: true,
    items: [
      {
        label: "Users",
        icon: "👥",
        to: "/admin/users",
        permission: "user.view",
      },

      {
        label: "Roles",
        icon: "🛡️",
        to: "/admin/roles",
        permission: "admin.view",
      },

      {
        label: "Activity Logs",
        icon: "📜",
        to: "/admin/activity-logs",
        permission: "activity-log.view",
      },
    ],
  },

  {
    title: "System",
    collapsible: true,
    open: true,
    items: [
      {
        label: "Settings",
        icon: "⚙️",
        to: "/admin/settings",
        permission: "settings.view",
      },
    ],
  },
];
