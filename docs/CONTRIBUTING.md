# Contributing

---

# Frontend Standards

- Use Composition API
- Use <script setup>
- Use reusable UI components
- Avoid duplicated UI
- Use modular structure

---

# Component Rules

Prefer:

```text
BaseButton
BaseInput
BaseTable
```

Avoid raw duplicated UI.

---

# Module Rules

Each module should contain:

```text
api/
pages/
components/
```

---

# API Rules

Do not call Axios directly inside components.

Use:

```text
module/api/
```

functions.

---

# Pull Request Checklist

- [ ] Responsive checked
- [ ] ACL checked
- [ ] Loading handled
- [ ] Error handling added
- [ ] Toast messages added

```

```
