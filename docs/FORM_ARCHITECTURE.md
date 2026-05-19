# Form Architecture ## Goals Nova forms should be: - reusable - scalable - validation-friendly - API-friendly - consistent across modules ## Current Base Components - BaseInput - BaseTextarea - BaseSelect - BaseCheckbox - BaseButton ## Page Composition Preferred structure: `vue <BasePageContainer> <BasePageToolbar> <BasePageHeader /> <BasePageActions /> </BasePageToolbar> <BaseFormSection> <!-- fields --> </BaseFormSection> </BasePageContainer> ` ## Planned Improvements - BaseFormGrid - BaseFieldWrapper - BaseErrorMessage - BaseFileUpload - BaseDatePicker - BaseAsyncSelect - BaseMultiSelect - BaseFormActions - validation abstraction - dirty state detection - unsaved changes warning ## Form Principles - Keep API logic outside components - Keep validation centralized - Avoid duplicated field layouts - Prefer reusable form sections - Keep forms tenant-aware in future

//TODO: make it formate above content

## User Role Form Rule

User create:

- Role is optional
- If selected, role assignment is saved after user creation

User edit:

- Role is required
- Role assignment is updated through the user role update endpoint

Role assignment should not be duplicated inside the user registration action.

## Validation Pattern

Frontend validation handling uses:

- setErrors()
- clearErrors()
- first()
- has()

Preferred usage:

```vue
<BaseInput v-model="form.name" label="Name" :error="first('name')" />
```

## API Error Handling

Global API errors are handled in:

src/api/client.js

Rules:

- 401: logout / redirect
- 403: permission error toast
- 422: field errors handled by forms
- 500: server error toast

Forms should catch 422 responses and call:

setErrors(e.response.data.errors)

Do not show duplicate validation toast messages for field-level validation.

## Field Component Rule

Base form controls should use:

BaseFieldWrapper

for:

- label
- hint
- validation error
- spacing

Current field components:

- BaseInput
- BaseTextarea
- BaseSelect
- BaseCheckbox

Avoid duplicating labels/errors inside pages.

### BaseFormGrid Examples

Two columns:

```vue
<BaseFormGrid>
    <BaseInput />
    <BaseInput />
</BaseFormGrid>
```

Three columns:

```vue
<BaseFormGrid :columns="3">
    <BaseInput />
    <BaseInput />
    <BaseInput />
</BaseFormGrid>
```

Four columns:

```vue
<BaseFormGrid :columns="4">
    ...
</BaseFormGrid>
```

## Form Actions

Use:

BaseFormActions

for all create/edit form footers.

Avoid custom save/cancel footer blocks unless a form has special workflow actions.

## Standard Create/Edit Page Structure

Preferred structure:

```vue
<BasePageContainer>
    <BasePageHeader />

    <BaseFormCard @submit="submit">
        <BaseFormSection>
            <BaseFormGrid>
                <!-- fields -->
            </BaseFormGrid>
        </BaseFormSection>

        <BaseFormActions />
    </BaseFormCard>
</BasePageContainer>
```

Benefits:

- consistent spacing
- reusable layouts
- predictable UX
- easier maintenance
- scalable ERP page architecture

## Permission UI Planning

Current permission UI uses:

BasePermissionGrid

Future improvements planned:

- permission descriptions
- module-based grouping
- select all per module
- collapsible permission groups
- search/filter permissions
- role templates
- tenant/module-aware permissions
- permission dependency handling

Goal:

Keep permission management scalable as ERP modules grow.

## Common Vue Setup Reminder

When using reusable UI components:

- import all components explicitly
- verify form wrappers are correctly nested

Example:

```javascript
import BaseFormCard from "../../../components/ui/BaseFormCard.vue";
```
