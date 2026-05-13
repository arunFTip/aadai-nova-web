# Frontend ACL

---

# ACL Architecture

Frontend ACL protects:

- routes
- menus
- buttons
- actions

---

# Auth Store

Located in:

```text
src/stores/auth.js
```

Provides:

```javascript
permissions;
hasPermission(permission);
```

---

# Route Protection

Routes use:

```javascript
meta.permission;
```

Example:

```javascript
meta: {
  permission: "user.view";
}
```

---

# Menu Protection

Sidebar menu items contain:

```javascript
permission: "user.view";
```

Menus are filtered dynamically.

---

# Button Protection

Example:

```vue
v-if="auth.hasPermission('user.create')"
```

---

# Forbidden Handling

Unauthorized access redirects to:

```text
/403
```

```

```
