export default [
  {
    label: "Dashboard",
    path: "/admin",
    permission: "admin.view",
  },
  {
    label: "Users",
    path: "/admin/users",
    permission: "user.view",
  },
  {
    label: "Activity Logs",
    path: "/admin/activity-logs",
    permission: "activity-log.view",
  },
  {
    label: "Roles",
    path: "/admin/roles",
    permission: "admin.view",
  },
  {
    label: "Settings",
    icon: "⚙️",
    to: "/admin/settings",
    permission: "settings.view",
  },
];
