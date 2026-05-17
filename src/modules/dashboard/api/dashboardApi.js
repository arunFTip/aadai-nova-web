import client from "../../../api/client";

export async function fetchDashboardStats() {
  const response = await client.get("/dashboard/stats");

  return response.data.data;
}
