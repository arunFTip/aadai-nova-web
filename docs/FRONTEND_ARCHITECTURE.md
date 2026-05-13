# Frontend Architecture

---

# Architecture Philosophy

Aadai Nova Web follows:

- Modular frontend architecture
- Reusable UI system
- ACL-aware rendering
- Enterprise admin patterns
- API-first frontend integration

---

# Module Structure

Each module lives inside:

```text
src/modules/
```

Example:

```text
src/modules/user-management/
├── api/
├── pages/
├── components/
├── stores/
├── config/
```

---

# Layout Architecture

```text
src/layouts/
```

Current layouts:

- AdminLayout

---

# Routing Architecture

Using:

```text
Vue Router
```

Protected routes use:

```javascript
meta.permission;
```

---

# State Management

Using:

```text
Pinia
```

Global stores:

- auth
- loading

---

# UI Architecture

Reusable components live in:

```text
src/components/ui/
```

---

# API Integration

Using:

```text
Axios
```

Centralized in:

```text
src/api/client.js
```

```

```

# Authentication Flow

Backend:

- Sanctum token auth
- Login endpoint
- Register endpoint
- Authenticated user endpoint

Frontend:

- Pinia auth store
- Axios token interceptor
- Route guards
- Persistent login
