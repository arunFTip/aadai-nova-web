<template>
  <BasePageContainer>
    <BasePageHeader
      title="Theme Settings"
      subtitle="Customize layout, sidebar, header, and skin colors."
    />

    <SettingsSectionCard
      title="Layout"
      description="Control the main application layout."
    >
      <BaseFormGrid :columns="3">
        <BaseSelect
          v-model="form.layout_width"
          label="Layout Width"
          :options="[
            { label: 'Full Width', value: 'full' },
            { label: 'Boxed', value: 'boxed' },
          ]"
        />

        <BaseSelect
          v-model="form.sidebar_mode"
          label="Sidebar Mode"
          :options="[
            { label: 'Expanded', value: 'expanded' },
            { label: 'Collapsed', value: 'collapsed' },
            { label: 'Icon Only', value: 'icon' },
          ]"
        />

        <BaseSelect
          v-model="form.header_position"
          label="Header Position"
          :options="[
            { label: 'Scrollable', value: 'scrollable' },
            { label: 'Fixed', value: 'fixed' },
          ]"
        />

        <BaseSelect
          v-model="form.sidebar_orientation"
          label="Sidebar Orientation"
          :options="[
            { label: 'Vertical', value: 'vertical' },
            { label: 'Horizontal', value: 'horizontal' },
          ]"
        />
      </BaseFormGrid>
    </SettingsSectionCard>

    <SettingsSectionCard
      title="Appearance"
      description="Control colors and display mode."
    >
      <BaseFormGrid :columns="3">
        <BaseSelect
          v-model="form.theme_mode"
          label="Theme Mode"
          :options="[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ]"
        />

        <BaseSelect v-model="form.skin" label="Skin" :options="skinOptions" />

        <BaseSelect
          v-model="form.sidebar_color"
          label="Sidebar Color"
          :options="colorOptions"
        />

        <BaseSelect
          v-model="form.header_color"
          label="Header Color"
          :options="colorOptions"
        />
      </BaseFormGrid>
    </SettingsSectionCard>

    <div class="flex justify-end">
      <BaseButton :loading="saving" @click="submit"> Save Theme </BaseButton>
    </div>
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
import { saveThemeSettings } from "../api/themeSettingsApi";
import { useToast } from "../../../composables/useToast";

import {
  loadPreferences,
  getPreference,
  setPreference,
} from "../../../stores/preferenceStore";

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

const skinOptions = [
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Sky", value: "sky" },
  { label: "Yellow", value: "yellow" },
  { label: "Slate", value: "slate" },
];

const colorOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Slate", value: "slate" },
];

const toast = useToast();

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

async function submit() {
  saving.value = true;

  try {
    await saveThemeSettings(form);

    setPreference("theme.layout_width", form.layout_width);
    setPreference("theme.sidebar_mode", form.sidebar_mode);
    setPreference("theme.header_position", form.header_position);
    setPreference("theme.mode", form.theme_mode);
    setPreference("theme.skin", form.skin);
    setPreference("theme.sidebar_color", form.sidebar_color);
    setPreference("theme.header_color", form.header_color);
    setPreference("theme.sidebar_orientation", form.sidebar_orientation);

    toast.success("Theme settings updated successfully");
  } catch (e) {
    console.error(e);

    toast.error("Unable to save theme settings");
  } finally {
    saving.value = false;
  }
}
</script>
