import client from "../../../api/client";

export async function fetchTenantPolicies() {
  const response = await client.get("/settings/policies");

  return response.data.data.policies;
}

export async function saveTenantPolicy(
  key,
  value,
  type = "json",
  isEnforced = true,
) {
  const response = await client.post("/settings/policies", {
    key,
    value,
    type,
    is_enforced: isEnforced,
  });

  return response.data.data.policy;
}
