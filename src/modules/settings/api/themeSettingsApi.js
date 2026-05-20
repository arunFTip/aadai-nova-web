import client from "../../../api/client";

export async function fetchThemeSettings() {
  const response = await client.get("/settings/theme");

  return response.data;
}

export async function saveThemeSettings(form) {
  const payload = {
    "theme.layout_width": form.layout_width,
    "theme.sidebar_mode": form.sidebar_mode,
    "theme.sidebar_orientation": form.sidebar_orientation,
    "theme.header_position": form.header_position,
    "theme.mode": form.theme_mode,
    "theme.skin": form.skin,
    "theme.sidebar_color": form.sidebar_color,
    "theme.header_color": form.header_color,
  };

  const response = await client.post("/settings/theme", payload);

  return response.data;
}
