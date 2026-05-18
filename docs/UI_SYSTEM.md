# UI System

---

# Reusable Components

Located in:

```text
src/components/ui/
```

---

# Current Components

## BaseButton

Supports:

- variants
- loading states
- disabled states

---

## BaseInput

Reusable form input.

---

## BaseCard

Reusable card layout.

---

## BaseTable

Reusable table system.

Supports:

- dynamic columns
- slots
- actions

---

## BasePagination

Reusable pagination system.

---

## ConfirmDialog

Reusable confirmation modal.

---

## GlobalLoader

Application-wide loading overlay.

---

# UI Principles

- Reusable
- Responsive
- Minimal duplication
- Enterprise-friendly
- Consistent spacing
- Tailwind-based

```

```

# Completed

- BaseButton
- BaseInput
- BaseCard
- BaseTable
- BasePagination
- ConfirmDialog
- GlobalLoader

# Features

- button variants
- reusable modal system
- reusable pagination
- reusable tables

# Nova UI System

## Goals

- Reusable enterprise UI
- Theme-token driven styling
- Dark theme support
- Consistent spacing/layout
- Scalable ERP architecture

## Theme Tokens

Global theme variables:

- --color-primary
- --color-bg
- --color-card
- --color-border
- --color-text
- --color-muted
- --color-success-bg
- --color-success-text
- --color-danger-bg
- --color-danger-text
- --color-warning-bg
- --color-warning-text
- --color-info-bg
- --color-info-text

## Reusable Components

### Layout

- BasePageHeader
- BaseSection
- BaseCard

### Forms

- BaseInput
- BaseTextarea
- BaseSelect
- BaseSearchInput
- BaseFormSection
- BaseFormActions

### Data Display

- BaseTable
- BasePagination
- BaseBadge
- BaseStatCard
- BaseActivityTimeline

### States

- BaseEmptyState
- BaseSkeleton
- BaseTableSkeleton

## Composables

- useToast
- useFormErrors

## Formatting Utilities

Located in:

src/utils/format.js

Current helpers:

- formatLabel
- formatDate
- formatTime
- formatDateTime
- formatCurrency
- formatNumber
- formatPercentage
- formatFileSize
- emptyValue

Formatting is preference-aware where applicable.

Supported preferences:

- format.timezone
- format.date_format
- format.time_format
- format.number_locale
- format.currency
- format.currency_locale

### Page Layout

- BasePageContainer
- BasePageHeader
- BasePageActions
- BaseSection

### Modals

- BaseModal
- BaseConfirmModal
- BaseInfoModal

### Table Actions

- BaseRefreshButton
- BaseCreateButton
- BaseViewButton
- BaseColumnCustomizer

### Page Composition Pattern

Standard page structure:

```vue
<BasePageContainer>
    <BasePageToolbar>
        <BasePageHeader
            title="Page Title"
            subtitle="Page description."
        />

        <BasePageActions>
            <!-- page action buttons -->
        </BasePageActions>
    </BasePageToolbar>

    <!-- filters -->

    <!-- content/table/form -->
</BasePageContainer>

### Table Actions - BaseRefreshButton - BaseCreateButton - BaseViewButton -
BaseColumnCustomizer
```
