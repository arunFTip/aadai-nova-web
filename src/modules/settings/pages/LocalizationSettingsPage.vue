<template>
  <BasePageContainer>
    <BasePageHeader
      title="Localization Settings"
      subtitle="Manage timezone, date, time, number, and currency formats."
    />

    <div class="space-y-6">
      <SettingsSectionCard
        title="Regional Settings"
        description="Configure locale and timezone preferences."
      >
        <BaseSelect
          v-model="form.timezone"
          label="Timezone"
          :options="timezones"
        />

        <BaseSelect
          v-model="form.currency"
          label="Currency"
          :options="currencies"
        />

        <BaseSelect
          v-model="form.number_locale"
          label="Number Locale"
          :options="locales"
        />
      </SettingsSectionCard>

      <SettingsSectionCard
        title="Date & Time"
        description="Configure date and time display formats."
      >
        <BaseSelect
          v-model="form.date_format"
          label="Date Format"
          :options="[
            {
              label: 'DD/MM/YYYY',
              value: 'DD/MM/YYYY',
            },
            {
              label: 'MM/DD/YYYY',
              value: 'MM/DD/YYYY',
            },
            {
              label: 'YYYY-MM-DD',
              value: 'YYYY-MM-DD',
            },
            {
              label: 'DD MMM YYYY',
              value: 'DD MMM YYYY',
            },
          ]"
        />
        <BaseSelect
          v-model="form.time_format"
          label="Time Format"
          :options="[
            {
              label: '12 Hour',
              value: '12h',
            },
            {
              label: '24 Hour',
              value: '24h',
            },
          ]"
        />
      </SettingsSectionCard>

      <SettingsSectionCard
        title="Preview"
        description="Preview how values will appear across the application."
      >
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <p class="text-sm font-medium">Date & Time</p>

            <p class="mt-1 text-[var(--color-muted)]">
              {{
                formatDateTime(new Date(), {
                  timezone: form.timezone,
                  locale: form.number_locale,
                  timeFormat: form.time_format,
                  dateFormat: form.date_format,
                })
              }}
            </p>
          </div>

          <div>
            <p class="text-sm font-medium">Currency</p>

            <p class="mt-1 text-[var(--color-muted)]">
              {{
                formatCurrency(123456.78, {
                  currency: form.currency,
                  locale: form.number_locale,
                })
              }}
            </p>
          </div>

          <div>
            <p class="text-sm font-medium">Number</p>

            <p class="mt-1 text-[var(--color-muted)]">
              {{
                formatNumber(123456789, {
                  locale: form.number_locale,
                })
              }}
            </p>
          </div>

          <div>
            <p class="text-sm font-medium">Percentage</p>

            <p class="mt-1 text-[var(--color-muted)]">
              {{ formatPercentage(24.56) }}
            </p>
          </div>
        </div>
      </SettingsSectionCard>

      <div class="flex justify-end">
        <BaseButton :loading="saving" @click="submit">
          Save Settings
        </BaseButton>
      </div>
    </div>
  </BasePageContainer>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";

import BasePageHeader from "../../../components/ui/BasePageHeader.vue";
import BaseSelect from "../../../components/ui/BaseSelect.vue";

import SettingsSectionCard from "../components/SettingsSectionCard.vue";

import BaseButton from "../../../components/ui/BaseButton.vue";

import { useToast } from "../../../composables/useToast";

import { saveLocalizationSettings } from "../api/settingsApi";
import { setPreference } from "../../../stores/preferenceStore";
import timezones from "../../../constants/timezones";
import currencies from "../../../constants/currencies";
import locales from "../../../constants/locales";
import {
  formatDateTime,
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "../../../utils/format";

import {
  getPreference,
  loadPreferences,
} from "../../../stores/preferenceStore";
import BasePageContainer from "../../../components/ui/BasePageContainer.vue";
import { fetchTenantSettings } from "../api/tenantSettingsApi";

const form = reactive({
  timezone: "Asia/Kolkata",
  currency: "INR",
  number_locale: "en-IN",
  date_format: "DD/MM/YYYY",
  time_format: "12h",
});

const timezones = [
  {
    label: "India Standard Time",
    value: "Asia/Kolkata",
  },
];

const currencies = [
  {
    label: "Indian Rupee (INR)",
    value: "INR",
  },
];

const locales = [
  {
    label: "English (India)",
    value: "en-IN",
  },
];

const saving = ref(false);

const toast = useToast();

async function submit() {
  saving.value = true;

  try {
    await saveLocalizationSettings(form);
    setPreference("format.timezone", form.timezone);
    setPreference("format.currency", form.currency);
    setPreference("format.number_locale", form.number_locale);
    setPreference("format.currency_locale", form.currency_locale);
    setPreference("format.date_format", form.date_format);
    setPreference("format.time_format", form.time_format);

    toast.success("Localization settings saved successfully");
  } catch (e) {
    toast.error("Unable to save localization settings");

    console.error(e);
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  const settings = await fetchTenantSettings();

  form.timezone = settings["format.timezone"] || "Asia/Kolkata";
  form.currency = settings["format.currency"] || "INR";
  form.number_locale = settings["format.number_locale"] || "en-IN";
  form.date_format = settings["format.date_format"] || "DD/MM/YYYY";
  form.time_format = settings["format.time_format"] || "12h";
});
</script>
