export function badgeType(value) {
  const normalized = String(value).toLowerCase().trim();

  switch (normalized) {
    case "active":
    case "approved":
    case "paid":
    case "created":
    case "success":
      return "success";

    case "inactive":
    case "deleted":
    case "rejected":
    case "failed":
      return "danger";

    case "pending":
    case "draft":
    case "updated":
      return "warning";

    case "info":
      return "info";

    default:
      return "default";
  }
}
