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

## Sidebar Preferences

Sidebar behavior is preference-aware.

Current keys:

- theme.sidebar_mode
- theme.sidebar_sections

Supported sidebar modes:

- expanded
- collapsed
- icon

Sidebar sections are grouped and collapsible.
Active route sections auto-expand for better navigation context.

# UI System

## Layout System

## Sidebar System

## Theme System

## Form System

## Detail Pages

## Tables

## Empty States

## Permission UI

## Responsive Behavior

## Runtime Preferences

## Secondary Sidebar Planning

Future layout architecture supports:

- primary sidebar
- contextual secondary sidebar

Example:

Primary:

- Dashboard
- Users
- Roles
- Settings

Secondary (when Settings active):

- Theme
- Localization
- Branding
- Security
- Email

Benefits:

- cleaner navigation
- scalable ERP menus
- avoids overly deep sidebars
- better module organization
- enterprise-style UX

## Secondary Sidebar Planning

Secondary sidebar should eventually support:

- collapse/expand
- responsive drawer mode
- contextual module navigation
- module-specific quick actions
- search/filter
- pinned items

Examples:

Settings
HR
CRM
Inventory
Finance
Reports

Secondary sidebar is intended for contextual navigation inside large modules.

## Theme System

Theme settings are tenant-backed and runtime-applied.

Current supported settings:

- theme.layout_width
- theme.sidebar_mode
- theme.sidebar_orientation
- theme.header_position
- theme.mode
- theme.skin
- theme.sidebar_color
- theme.header_color

Theme flow:

Tenant Theme Settings API
↓
Frontend Runtime Store
↓
themeEngine.js
↓
CSS Variables
↓
Application UI

Theme colors should use CSS variables:

- --color-primary
- --color-primary-hover
- --color-primary-contrast
- --color-bg
- --color-surface
- --color-text
- --color-muted
- --color-border
- --sidebar-bg
- --sidebar-text
- --sidebar-muted
- --header-bg
- --header-text
- --header-border

Avoid hardcoded colors in layout-level components.

## Theme Settings Form

Theme Settings supports:

- live preview before save
- tenant-backed persistence
- reset to default
- layout width
- sidebar mode
- sidebar orientation
- theme mode
- skin
- sidebar color
- header color
- header position

Important UX rule:

Theme changes preview immediately, but must be saved to persist after refresh.
