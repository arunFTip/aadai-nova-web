# UI Component Inventory

## Layout Components

- BasePageContainer
- BasePageToolbar
- BasePageHeader
- BasePageActions
- BaseSection

## Form Components

- BaseFormCard
- BaseFormSection
- BaseFormGrid
- BaseFormActions
- BaseFieldWrapper

## Field Components

- BaseInput
- BaseTextarea
- BaseSelect
- BaseCheckbox

## Table Components

- BaseTable
- BaseColumnCustomizer
- BaseRefreshButton
- BaseCreateButton
- BaseViewButton

## Feedback Components

- BaseEmptyState
- BaseModal
- BaseConfirmModal
- BaseInfoModal

## Permission Components

- BasePermissionGrid

## Dashboard Components

- BaseStatCard

## Status Legend

- ✅ Stable
- 🟡 Improving
- 🔵 Planned

Example:

- BaseInput ✅
- BasePermissionGrid 🟡
- BaseDatePicker 🔵

## Layout Components

- BasePageContainer ✅
- BasePageToolbar ✅
- BasePageHeader ✅
- BasePageActions ✅
- BaseSection ✅

## Form Components

- BaseFormCard ✅
- BaseFormSection ✅
- BaseFormGrid 🟡
- BaseFormActions ✅
- BaseFieldWrapper ✅

## Field Components

- BaseInput ✅
- BaseTextarea ✅
- BaseSelect ✅
- BaseCheckbox ✅

## Table Components

- BaseTable 🟡
- BaseColumnCustomizer 🟡
- BaseRefreshButton ✅
- BaseCreateButton ✅
- BaseViewButton ✅

## Feedback Components

- BaseEmptyState ✅
- BaseModal 🟡
- BaseConfirmModal 🟡
- BaseInfoModal 🟡

## Permission Components

- BasePermissionGrid 🟡

## Dashboard Components

- BaseStatCard ✅

## Component Usage Rules

Before creating a new component:

1. Check if similar functionality already exists
2. Prefer extending existing base components
3. Keep naming consistent with Base\* convention
4. Keep business logic outside reusable UI components
5. Prefer composability over large monolithic components

Avoid:

- duplicate wrappers
- module-specific reusable components
- inconsistent naming
- repeated form/table layouts

## Component Lifecycle

Suggested lifecycle:

1. Create component
2. Reuse in at least 2-3 modules
3. Standardize props/events
4. Document usage patterns
5. Mark as stable ✅

Components should mature through reuse, not premature abstraction.

## Component Import Rule

All reusable UI components must be explicitly imported.

Example:

```javascript
import BaseFormCard from "../../../components/ui/BaseFormCard.vue";
```
