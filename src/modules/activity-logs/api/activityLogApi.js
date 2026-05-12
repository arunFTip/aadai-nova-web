import client from "../../../api/client";

export async function fetchActivityLogs(page = 1) {
  const response = await client.get("/activity-logs", {
    params: {
      page,
    },
  });

  return response.data.data;
}
