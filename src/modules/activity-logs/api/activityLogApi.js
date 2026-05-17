import client from "../../../api/client";

export async function fetchActivityLogs(page = 1, filters = {}) {
  const response = await client.get("/activity-logs", {
    params: {
      page,
      model: filters.model,
      action: filters.action,
      user: filters.user,
      date_filter: filters.date_filter,
      from: filters.from,
      to: filters.to,
    },
  });

  return response.data.data;
}
