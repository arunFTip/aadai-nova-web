import { getPreference } from "../stores/preferenceStore";

export function formatLabel(value) {
  if (!value) {
    return "-";
  }

  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatDate(value, options = {}) {
  if (!value) {
    return "-";
  }

  return formatDateTime(value, {
    ...options,
    hideTime: true,
  });
}

export function formatDateTime(value, options = {}) {
  if (!value) {
    return "-";
  }

  const locale =
    options.locale || getPreference("format.number_locale", "en-IN");

  const timezone =
    options.timezone || getPreference("format.timezone", "Asia/Kolkata");

  const timeFormat =
    options.timeFormat || getPreference("format.time_format", "12h");

  const dateFormat =
    options.dateFormat || getPreference("format.date_format", "DD/MM/YYYY");

  const hour12 = timeFormat === "12h";

  const date = new Date(value);

  let formattedDate = "";

  switch (dateFormat) {
    case "MM/DD/YYYY":
      formattedDate = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }).format(date);
      break;

    case "YYYY-MM-DD":
      formattedDate = new Intl.DateTimeFormat("sv-SE", {
        timeZone: timezone,
      }).format(date);
      break;

    case "DD MMM YYYY":
      formattedDate = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
      break;

    default:
      formattedDate = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
  }

  const formattedTime = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12,
  }).format(date);

  if (options.hideTime) {
    return formattedDate;
  }

  return `${formattedDate} ${formattedTime}`;
}

export function formatTime(value, options = {}) {
  if (!value) {
    return "-";
  }

  const locale =
    options.locale || getPreference("format.number_locale", "en-IN");

  const timezone =
    options.timezone || getPreference("format.timezone", "Asia/Kolkata");

  const timeFormat =
    options.timeFormat || getPreference("format.time_format", "12h");

  const hour12 = timeFormat === "12h";

  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12,
  }).format(new Date(value));
}

export function formatCurrency(value, options = {}) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const currency = options.currency || getPreference("format.currency", "INR");

  const locale =
    options.locale || getPreference("format.currency_locale", "en-IN");

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatNumber(value, options = {}) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const locale =
    options.locale || getPreference("format.number_locale", "en-IN");

  return new Intl.NumberFormat(locale).format(value);
}

export function formatPercentage(value, decimals = 2) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return `${Number(value).toFixed(decimals)}%`;
}
export function formatFileSize(bytes) {
  if (bytes === null || bytes === undefined || bytes === "") {
    return "-";
  }

  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function emptyValue(value, fallback = "-") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return value;
}
