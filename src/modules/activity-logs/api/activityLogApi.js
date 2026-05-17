import client from "../../../api/client";

export async function fetchActivityLogs(page = 1, filters = {}, perPage = 10) {
  const response = await client.get("/activity-logs", {
    params: {
      page,
      per_page: perPage,
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
