import { saveUserPreference } from "../../user-preferences/api/userPreferenceApi";
import client from "../../../api/client";

export async function fetchTenantSettings() {
  const response = await client.get("/settings/tenant");

  return response.data.data.settings;
}

export async function saveTenantSetting(key, value, type = "json") {
  const response = await client.post("/settings/tenant", {
    key,
    value,
    type,
  });

  return response.data.data.setting;
}

export async function saveLocalizationSettings(form) {
  await Promise.all([
    saveTenantSetting("format.timezone", form.timezone),
    saveTenantSetting("format.currency", form.currency),
    saveTenantSetting("format.number_locale", form.number_locale),
    saveTenantSetting("format.currency_locale", form.currency_locale),
    saveTenantSetting("format.date_format", form.date_format),
    saveTenantSetting("format.time_format", form.time_format),
  ]);
}
