import { saveUserPreference } from "../../user-preferences/api/userPreferenceApi";

export async function saveLocalizationSettings(form) {
  await Promise.all([
    saveUserPreference("format.timezone", form.timezone),
    saveUserPreference("format.currency", form.currency),
    saveUserPreference("format.number_locale", form.number_locale),
    saveUserPreference("format.currency_locale", form.number_locale),
    saveUserPreference("format.date_format", form.date_format),
    saveUserPreference("format.time_format", form.time_format),
  ]);
}
