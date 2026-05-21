import { reactive } from "vue";

import { fetchUserPreferences } from "../modules/user-preferences/api/userPreferenceApi";
import { fetchThemeSettings } from "../modules/settings/api/themeSettingsApi";
import { applyThemeSettings } from "../utils/applyThemeSettings";

const SESSION_CACHE_KEY = "aadai-nova-bootstrap";
const SESSION_CACHE_TTL_MS = 5 * 60 * 1000;
const HOT_DATA_KEY = "preferenceStore";

const state = reactive({
  loaded: false,
  themeLoaded: false,
  preferences: {},
});

let preferencesPromise = null;
let themePromise = null;
let bootstrapPromise = null;

function markPromisesFulfilled() {
  if (state.loaded) {
    preferencesPromise = Promise.resolve();
  }

  if (state.themeLoaded) {
    themePromise = Promise.resolve();
  }

  if (state.loaded && state.themeLoaded) {
    bootstrapPromise = Promise.resolve();
  }
}

function restoreFromSessionCache() {
  if (!import.meta.env.DEV) {
    return false;
  }

  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_KEY);

    if (!raw) {
      return false;
    }

    const cached = JSON.parse(raw);

    if (!cached?.at || Date.now() - cached.at > SESSION_CACHE_TTL_MS) {
      sessionStorage.removeItem(SESSION_CACHE_KEY);
      return false;
    }

    if (!cached.loaded || !cached.themeLoaded) {
      return false;
    }

    state.preferences = cached.preferences ?? {};
    state.loaded = true;
    state.themeLoaded = true;
    markPromisesFulfilled();

    return true;
  } catch {
    sessionStorage.removeItem(SESSION_CACHE_KEY);
    return false;
  }
}

function persistToSessionCache() {
  if (!import.meta.env.DEV || !state.loaded || !state.themeLoaded) {
    return;
  }

  sessionStorage.setItem(
    SESSION_CACHE_KEY,
    JSON.stringify({
      at: Date.now(),
      loaded: state.loaded,
      themeLoaded: state.themeLoaded,
      preferences: state.preferences,
    }),
  );
}

function restoreFromHotData() {
  if (!import.meta.hot?.data[HOT_DATA_KEY]) {
    return false;
  }

  const cached = import.meta.hot.data[HOT_DATA_KEY];

  state.preferences = cached.preferences ?? {};
  state.loaded = Boolean(cached.loaded);
  state.themeLoaded = Boolean(cached.themeLoaded);
  markPromisesFulfilled();

  return state.loaded && state.themeLoaded;
}

function persistForHot() {
  if (!import.meta.hot) {
    return;
  }

  import.meta.hot.data[HOT_DATA_KEY] = {
    loaded: state.loaded,
    themeLoaded: state.themeLoaded,
    preferences: { ...state.preferences },
  };
}

if (import.meta.hot) {
  import.meta.hot.dispose((data) => {
    data[HOT_DATA_KEY] = {
      loaded: state.loaded,
      themeLoaded: state.themeLoaded,
      preferences: { ...state.preferences },
    };
  });
}

if (!restoreFromHotData()) {
  restoreFromSessionCache();
}

export async function loadPreferences() {
  if (state.loaded) {
    return;
  }

  if (!preferencesPromise) {
    preferencesPromise = (async () => {
      try {
        state.preferences = await fetchUserPreferences();
        state.loaded = true;
        persistForHot();
        persistToSessionCache();
      } catch (e) {
        preferencesPromise = null;
        console.error("Unable to load preferences", e);
      }
    })();
  }

  return preferencesPromise;
}

export async function loadThemeSettings() {
  if (state.themeLoaded) {
    return;
  }

  if (!themePromise) {
    themePromise = (async () => {
      try {
        const settings = await fetchThemeSettings();
        applyThemeSettings(settings);
        state.themeLoaded = true;
        persistForHot();
        persistToSessionCache();
      } catch (e) {
        themePromise = null;
        console.error("Unable to load theme settings", e);
      }
    })();
  }

  return themePromise;
}

export async function loadAppBootstrap() {
  if (state.loaded && state.themeLoaded) {
    return;
  }

  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      await loadPreferences();
      await loadThemeSettings();
      persistForHot();
      persistToSessionCache();
    })();
  }

  return bootstrapPromise;
}

export function getPreference(key, fallback = null) {
  return state.preferences?.[key] ?? fallback;
}

export function setPreference(key, value) {
  state.preferences[key] = value;

  persistForHot();
  persistToSessionCache();
}

export function usePreferenceStore() {
  return state;
}

export function getAllPreferences() {
  return state.preferences;
}

export function clearBootstrapCache() {
  sessionStorage.removeItem(SESSION_CACHE_KEY);
  state.loaded = false;
  state.themeLoaded = false;
  state.preferences = {};
  preferencesPromise = null;
  themePromise = null;
  bootstrapPromise = null;
}
