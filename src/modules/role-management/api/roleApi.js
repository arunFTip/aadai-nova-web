import client from "../../../api/client";

export async function fetchRoles(
  page = 1,
  search = "",
  perPage = 10,
  sortBy = "id",
  sortDirection = "desc",
) {
  const response = await client.get("/roles", {
    params: {
      page,
      search,
      per_page: perPage,
      sort_by: sortBy,
      sort_direction: sortDirection,
    },
  });

  return response.data.data;
}

export async function fetchPermissions() {
  const response = await client.get("/permissions");

  return response.data.data.permissions;
}

export async function createRole(payload) {
  const response = await client.post("/roles", payload);

  return response.data.data.role;
}

export async function fetchRole(id) {
  const response = await client.get(`/roles/${id}`);

  return response.data.data.role;
}

export async function updateRole(id, payload) {
  const response = await client.put(`/roles/${id}`, payload);

  return response.data.data.role;
}

export async function deleteRole(id) {
  await client.delete(`/roles/${id}`);
}
