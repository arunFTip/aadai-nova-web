import client from "../../../api/client";

export async function fetchUsers() {
  const response = await client.get("/users");

  return response.data.data.users;
}

export async function createUser(payload) {
  const response = await client.post("/auth/register", payload);

  return response.data.data.user;
}
