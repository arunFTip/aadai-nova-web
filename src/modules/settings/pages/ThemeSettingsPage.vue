<template>
  <BasePageContainer>
    <BasePageHeader
      title="Theme Settings"
      subtitle="Customize layout, navigation, colors, and appearance."
    />
    <div class="space-y-6">
      <SettingsSectionCard
        title="Layout"
        description="Control application width and display mode."
      >
        <BaseFormGrid>
          <div
            class="grid grid-cols-1 gap-4 md:grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          >
            <BaseOptionCard
              title="Full Width"
              description="Stretch content across the viewport."
              :active="form.layout_width === 'full'"
              @click="form.layout_width = 'full'"
            >
              <template #preview>
                <div
                  class="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2"
                >
                  <div class="h-3 rounded bg-[var(--color-primary)]" />
                  <div class="mt-2 h-16 rounded bg-[var(--color-bg)]" />
                </div>
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Boxed"
              description="Constrain content width inside container."
              :active="form.layout_width === 'boxed'"
              @click="form.layout_width = 'boxed'"
            >
              <template #preview>
                <div
                  class="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                >
                  <div
                    class="mx-auto max-w-[220px] rounded border border-dashed border-[var(--color-border)] p-2"
                  >
                    <div class="h-3 rounded bg-[var(--color-primary)]" />
                    <div class="mt-2 h-12 rounded bg-[var(--color-bg)]" />
                  </div>
                </div>
              </template>
            </BaseOptionCard>
          </div>

          <div
            class="grid grid-cols-1 gap-4 md:grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          >
            <BaseOptionCard
              title="Light Mode"
              description="Bright interface optimized for daytime usage."
              :active="form.theme_mode === 'light'"
              @click="form.theme_mode = 'light'"
            >
              <template #preview>
                <div class="rounded-lg border border-gray-200 bg-white p-3">
                  <div class="flex gap-2">
                    <div class="w-16 rounded bg-gray-100 p-2">
                      <div class="h-2 rounded bg-gray-300" />
                      <div class="mt-2 h-2 rounded bg-gray-200" />
                    </div>

                    <div class="flex-1 rounded bg-gray-50 p-2">
                      <div class="h-3 rounded bg-blue-500" />
                      <div class="mt-3 h-10 rounded bg-white shadow-sm" />
                    </div>
                  </div>
                </div>
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Dark Mode"
              description="Dark interface optimized for low-light environments."
              :active="form.theme_mode === 'dark'"
              @click="form.theme_mode = 'dark'"
            >
              <template #preview>
                <div
                  class="rounded-lg border border-slate-700 bg-slate-900 p-3"
                >
                  <div class="flex gap-2">
                    <div class="w-16 rounded bg-slate-800 p-2">
                      <div class="h-2 rounded bg-slate-500" />
                      <div class="mt-2 h-2 rounded bg-slate-600" />
                    </div>

                    <div class="flex-1 rounded bg-slate-800 p-2">
                      <div class="h-3 rounded bg-emerald-500" />
                      <div class="mt-3 h-10 rounded bg-slate-700" />
                    </div>
                  </div>
                </div>
              </template>
            </BaseOptionCard>
          </div>
        </BaseFormGrid>
      </SettingsSectionCard>
    </div>
    <div class="space-y-6">
      <SettingsSectionCard
        title="Navigation"
        description="Control sidebar style and navigation direction."
      >
        <BaseFormGrid :columns="3">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <BaseOptionCard
              title="Expanded"
              description="Show icons and labels."
              :active="form.sidebar_mode === 'expanded'"
              @click="form.sidebar_mode = 'expanded'"
            />

            <BaseOptionCard
              title="Collapsed"
              description="Compact sidebar layout."
              :active="form.sidebar_mode === 'collapsed'"
              @click="form.sidebar_mode = 'collapsed'"
            />

            <BaseOptionCard
              title="Icon Only"
              description="Show only navigation icons."
              :active="form.sidebar_mode === 'icon'"
              @click="form.sidebar_mode = 'icon'"
            />
          </div>

          <div
            class="grid grid-cols-1 gap-4 md:grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          >
            <BaseOptionCard
              title="Vertical"
              description="Use left sidebar navigation."
              :active="form.sidebar_orientation === 'vertical'"
              @click="form.sidebar_orientation = 'vertical'"
            />

            <BaseOptionCard
              title="Horizontal"
              description="Use top horizontal navigation."
              :active="form.sidebar_orientation === 'horizontal'"
              @click="form.sidebar_orientation = 'horizontal'"
            />
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:grid-cols-5"
          >
            <BaseOptionCard
              title="Dark"
              :active="form.sidebar_color === 'dark'"
              @click="form.sidebar_color = 'dark'"
            >
              <template #preview>
                <div class="flex h-12 overflow-hidden rounded-lg">
                  <div class="w-1/3 bg-slate-900" />
                  <div class="flex-1 bg-slate-100" />
                </div>
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Light"
              :active="form.sidebar_color === 'light'"
              @click="form.sidebar_color = 'light'"
            >
              <template #preview>
                <div
                  class="flex h-12 overflow-hidden rounded-lg border border-gray-200"
                >
                  <div class="w-1/3 bg-white" />
                  <div class="flex-1 bg-gray-100" />
                </div>
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Green"
              :active="form.sidebar_color === 'green'"
              @click="form.sidebar_color = 'green'"
            >
              <template #preview>
                <div class="flex h-12 overflow-hidden rounded-lg">
                  <div class="w-1/3 bg-emerald-700" />
                  <div class="flex-1 bg-emerald-50" />
                </div>
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Blue"
              :active="form.sidebar_color === 'blue'"
              @click="form.sidebar_color = 'blue'"
            >
              <template #preview>
                <div class="flex h-12 overflow-hidden rounded-lg">
                  <div class="w-1/3 bg-blue-700" />
                  <div class="flex-1 bg-blue-50" />
                </div>
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Slate"
              :active="form.sidebar_color === 'slate'"
              @click="form.sidebar_color = 'slate'"
            >
              <template #preview>
                <div class="flex h-12 overflow-hidden rounded-lg">
                  <div class="w-1/3 bg-slate-700" />
                  <div class="flex-1 bg-slate-100" />
                </div>
              </template>
            </BaseOptionCard>
          </div>
        </BaseFormGrid>
      </SettingsSectionCard>
    </div>
    <div class="space-y-6">
      <SettingsSectionCard
        title="Header"
        description="Control header color and scroll behavior."
      >
        <BaseFormGrid>
          <div
            class="grid grid-cols-1 gap-4 md:grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          >
            <BaseOptionCard
              title="Scrollable"
              description="Header scrolls with page content."
              :active="form.header_position === 'scrollable'"
              @click="form.header_position = 'scrollable'"
            />

            <BaseOptionCard
              title="Fixed"
              description="Header stays visible while scrolling."
              :active="form.header_position === 'fixed'"
              @click="form.header_position = 'fixed'"
            />
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:grid-cols-5"
          >
            <BaseOptionCard
              title="Light"
              :active="form.header_color === 'light'"
              @click="form.header_color = 'light'"
            >
              <template #preview>
                <div class="h-12 rounded-lg border border-gray-200 bg-white" />
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Dark"
              :active="form.header_color === 'dark'"
              @click="form.header_color = 'dark'"
            >
              <template #preview>
                <div class="h-12 rounded-lg bg-slate-900" />
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Green"
              :active="form.header_color === 'green'"
              @click="form.header_color = 'green'"
            >
              <template #preview>
                <div class="h-12 rounded-lg bg-emerald-700" />
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Blue"
              :active="form.header_color === 'blue'"
              @click="form.header_color = 'blue'"
            >
              <template #preview>
                <div class="h-12 rounded-lg bg-blue-700" />
              </template>
            </BaseOptionCard>

            <BaseOptionCard
              title="Slate"
              :active="form.header_color === 'slate'"
              @click="form.header_color = 'slate'"
            >
              <template #preview>
                <div class="h-12 rounded-lg bg-slate-700" />
              </template>
            </BaseOptionCard>
          </div>
        </BaseFormGrid>
      </SettingsSectionCard>
    </div>
    <div class="space-y-6">
      <SettingsSectionCard
        title="Skin"
        description="Choose the primary color used across the application."
      >
        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:grid-cols-5"
        >
          <BaseOptionCard
            title="Green"
            :active="form.skin === 'green'"
            @click="form.skin = 'green'"
          >
            <template #preview>
              <div class="h-12 rounded-lg bg-emerald-600" />
            </template>
          </BaseOptionCard>

          <BaseOptionCard
            title="Blue"
            :active="form.skin === 'blue'"
            @click="form.skin = 'blue'"
          >
            <template #preview>
              <div class="h-12 rounded-lg bg-blue-600" />
            </template>
          </BaseOptionCard>

          <BaseOptionCard
            title="Sky"
            :active="form.skin === 'sky'"
            @click="form.skin = 'sky'"
          >
            <template #preview>
              <div class="h-12 rounded-lg bg-sky-500" />
            </template>
          </BaseOptionCard>

          <BaseOptionCard
            title="Yellow"
            :active="form.skin === 'yellow'"
            @click="form.skin = 'yellow'"
          >
            <template #preview>
              <div class="h-12 rounded-lg bg-yellow-500" />
            </template>
          </BaseOptionCard>

          <BaseOptionCard
            title="Slate"
            :active="form.skin === 'slate'"
            @click="form.skin = 'slate'"
          >
            <template #preview>
              <div class="h-12 rounded-lg bg-slate-600" />
            </template>
          </BaseOptionCard>
        </div>
      </SettingsSectionCard>
    </div>
    <div class="flex justify-end">
      <BaseButton :loading="saving" @click="submit"> Save Theme </BaseButton>
    </div>
    <BaseButton color="secondary" variant="outline" @click="resetTheme">
      Reset
    </BaseButton>
    <p class="text-sm text-[var(--color-muted)]">
      Changes preview immediately. Click Save Theme to persist them.
    </p>
  </BasePageContainer>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";

import BaseButton from "../../../components/ui/BaseButton.vue";
import BaseFormGrid from "../../../components/ui/BaseFormGrid.vue";
import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BasePageContainer from "../../../components/ui/BasePageContainer.vue";
import BaseSelect from "../../../components/ui/BaseSelect.vue";

import SettingsSectionCard from "../components/SettingsSectionCard.vue";
import { fetchThemeSettings, saveThemeSettings } from "../api/themeSettingsApi";
import { useToast } from "../../../composables/useToast";
import {
  layoutWidthOptions,
  sidebarModeOptions,
  sidebarOrientationOptions,
  headerPositionOptions,
  themeModeOptions,
  skinOptions,
  colorOptions,
} from "../../../constants/themeOptions";

import { watchEffect, watch } from "vue";
import { applyThemeVariables } from "../../../utils/themeEngine";

import {
  loadPreferences,
  getPreference,
  setPreference,
} from "../../../stores/preferenceStore";
import BaseOptionCard from "../../../components/ui/BaseOptionCard.vue";

const saving = ref(false);

const form = reactive({
  layout_width: "full",
  sidebar_mode: "expanded",
  header_position: "scrollable",
  theme_mode: "light",
  skin: "green",
  sidebar_color: "dark",
  header_color: "light",
  sidebar_orientation: "vertical",
});

// const skinOptions = [
//   { label: "Green", value: "green" },
//   { label: "Blue", value: "blue" },
//   { label: "Sky", value: "sky" },
//   { label: "Yellow", value: "yellow" },
//   { label: "Slate", value: "slate" },
// ];

// const colorOptions = [
//   { label: "Light", value: "light" },
//   { label: "Dark", value: "dark" },
//   { label: "Green", value: "green" },
//   { label: "Blue", value: "blue" },
//   { label: "Slate", value: "slate" },
// ];

const toast = useToast();

watchEffect(() => {
  applyThemeVariables(theme.value);
});

onMounted(async () => {
  await loadPreferences();

  form.layout_width = getPreference("theme.layout_width", "full");
  form.sidebar_mode = getPreference("theme.sidebar_mode", "expanded");
  form.header_position = getPreference("theme.header_position", "scrollable");
  form.theme_mode = getPreference("theme.mode", "light");
  form.skin = getPreference("theme.skin", "green");
  form.sidebar_color = getPreference("theme.sidebar_color", "dark");
  form.header_color = getPreference("theme.header_color", "light");
  form.sidebar_orientation = getPreference(
    "theme.sidebar_orientation",
    "vertical",
  );
});

watch(
  form,
  (value) => {
    setPreference("theme.layout_width", value.layout_width);

    setPreference("theme.sidebar_mode", value.sidebar_mode);

    setPreference("theme.sidebar_orientation", value.sidebar_orientation);

    setPreference("theme.header_position", value.header_position);

    setPreference("theme.mode", value.theme_mode);

    setPreference("theme.skin", value.skin);

    setPreference("theme.sidebar_color", value.sidebar_color);

    setPreference("theme.header_color", value.header_color);
  },
  {
    deep: true,
  },
);

function resetTheme() {
  form.layout_width = "full";
  form.sidebar_mode = "expanded";
  form.sidebar_orientation = "vertical";
  form.header_position = "scrollable";
  form.theme_mode = "light";
  form.skin = "green";
  form.sidebar_color = "dark";
  form.header_color = "light";
}

onMounted(async () => {
  const settings = await fetchThemeSettings();

  form.layout_width = settings["theme.layout_width"] || "full";
  form.sidebar_mode = settings["theme.sidebar_mode"] || "expanded";
  form.sidebar_orientation =
    settings["theme.sidebar_orientation"] || "vertical";
  form.header_position = settings["theme.header_position"] || "scrollable";
  form.theme_mode = settings["theme.mode"] || "light";
  form.skin = settings["theme.skin"] || "green";
  form.sidebar_color = settings["theme.sidebar_color"] || "dark";
  form.header_color = settings["theme.header_color"] || "light";

  setPreference("theme.layout_width", form.layout_width);
  setPreference("theme.sidebar_mode", form.sidebar_mode);
  setPreference("theme.sidebar_orientation", form.sidebar_orientation);
  setPreference("theme.header_position", form.header_position);
  setPreference("theme.mode", form.theme_mode);
  setPreference("theme.skin", form.skin);
  setPreference("theme.sidebar_color", form.sidebar_color);
  setPreference("theme.header_color", form.header_color);
});

async function submit() {
  saving.value = true;

  try {
    await saveThemeSettings(form);

    setPreference("theme.layout_width", form.layout_width);
    setPreference("theme.sidebar_mode", form.sidebar_mode);
    setPreference("theme.sidebar_orientation", form.sidebar_orientation);
    setPreference("theme.header_position", form.header_position);
    setPreference("theme.mode", form.theme_mode);
    setPreference("theme.skin", form.skin);
    setPreference("theme.sidebar_color", form.sidebar_color);
    setPreference("theme.header_color", form.header_color);

    toast.success("Theme settings updated successfully");
  } catch (e) {
    console.error(e);

    toast.error("Unable to save theme settings");
  } finally {
    saving.value = false;
  }
}
</script>
