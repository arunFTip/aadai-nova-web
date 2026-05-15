import client from "../../../api/client";

export async function createUser(payload) {
  const response = await client.post("/auth/register", payload);

  return response.data.data.user;
}
export async function fetchUser(id) {
  const response = await client.get(`/users/${id}`);

  return response.data.data.user;
}
export async function updateUser(id, payload) {
  const response = await client.put(`/users/${id}`, payload);

  return response.data.data.user;
}
export async function deleteUser(id) {
  await client.delete(`/users/${id}`);
}
export async function fetchUsers(
  page = 1,
  search = "",
  perPage = 10,
  sortBy = "id",
  sortDirection = "desc",
) {
  const response = await client.get("/users", {
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

export async function updateUserRoles(id, roles) {
  const response = await client.put(`/users/${id}/roles`, {
    roles,
  });

  return response.data.data.user;
}
