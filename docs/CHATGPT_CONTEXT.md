# ChatGPT Continuation Context

Aadai Nova Web is a Vue 3 enterprise admin frontend.

---

# Current Stack

- Vue 3
- Vite
- Pinia
- Vue Router
- Tailwind CSS
- Axios
- Vue Sonner

---

# Current Features

- auth flow
- ACL-aware frontend
- user CRUD UI
- role management UI
- activity logs UI
- reusable UI system

---

# Important Rules

## ACL

Protect:

- routes
- menus
- buttons
- actions

---

# Component Style

Use:

```vue
<script setup>
```

---

# Architecture

Frontend is modular.

Each module contains:

```text
api/
pages/
components/
```

---

# API Calls

Use module API files.

Avoid direct Axios calls in components.

```

```

## Reusable UI Components

Located in:

src/components/ui

Current reusable components:

- BaseButton
- BaseCard
- BaseInput
- BaseTextarea
- BaseSelect
- BaseSearchInput
- BaseBadge
- BaseTable
- BaseTableSkeleton
- BasePagination
- BaseEmptyState
- BasePageHeader
- BaseSection
- BaseFormSection
- BaseFormActions
- BaseStatCard
- BaseActivityTimeline

Reusable filter system:

src/components/filters

- AdvancedFilterBar
- DateRangeFilter

Composable utilities:

src/composables

- useToast
- useFormErrors

## Recent Backend Features

### User Status Management

- Users support active/inactive status
- Inactive users cannot login
- Existing sessions for inactive users are automatically rejected

### Dashboard APIs

- Admin dashboard statistics endpoint added
- Supports:
  - total_users
  - active_users
  - inactive_users
  - total_roles
  - recent_activities

### Activity Logging

- Role CRUD actions logged
- User CRUD actions logged
- Activity logs support:
  - model filter
  - action filter
  - user filter
  - advanced date filters

### Date Filtering

Reusable DateFilter helper added.

Supported values:

- today
- yesterday
- last_7_days
- last_30_days
- last_90_days
- this_month
- last_month
- this_year
- last_year
- custom

### Audit Improvements

Activity logs include:

- performed_by
- record_label
- old values
- new values
