import { reactive } from "vue";

import { fetchUserPreferences } from "../modules/user-preferences/api/userPreferenceApi";

const state = reactive({
  loaded: false,
  preferences: {},
});

export async function loadPreferences() {
  if (state.loaded) {
    return;
  }

  try {
    state.preferences = await fetchUserPreferences();

    state.loaded = true;
  } catch (e) {
    console.error("Unable to load preferences", e);
  }
}

export function getPreference(key, fallback = null) {
  return state.preferences?.[key] ?? fallback;
}

export function setPreference(key, value) {
  state.preferences[key] = value;
}

export function usePreferenceStore() {
  return state;
}

export function getAllPreferences() {
  return state.preferences;
}
