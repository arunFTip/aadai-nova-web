export default [
  {
    label: "Dashboard",
    icon: "🏠",
    to: "/admin",
    permission: "admin.view",
  },
  {
    label: "Users",
    icon: "👥",
    to: "/admin/users",
    permission: "user.view",
  },
  {
    label: "Activity Logs",
    icon: "📜",
    to: "/admin/activity-logs",
    permission: "activity-log.view",
  },
  {
    label: "Roles",
    icon: "🛡️",
    to: "/admin/roles",
    permission: "admin.view",
  },
  {
    label: "Settings",
    icon: "⚙️",
    to: "/admin/settings",
    permission: "settings.view",
  },
];
