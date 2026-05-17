import client from "../../../api/client";

export async function fetchUserPreferences() {
  const response = await client.get("/user-preferences");

  return response.data.data.preferences;
}

export async function saveUserPreference(key, value, type = "json") {
  const response = await client.post("/user-preferences", {
    key,
    value,
    type,
  });

  return response.data.data.preference;
}
