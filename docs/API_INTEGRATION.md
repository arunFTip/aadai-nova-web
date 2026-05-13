# API Integration

---

# Axios Client

Located in:

```text
src/api/client.js
```

---

# Features

- base URL
- auth token interceptor
- loading interceptor
- error handling

---

# Authentication

Token stored in:

```text
localStorage
```

Authorization header:

```text
Bearer TOKEN
```

---

# API Pattern

Each module contains:

```text
api/*.js
```

Example:

```javascript
fetchUsers();
createUser();
updateUser();
```

```

```

API Pattern:
import client from '../../../api/client'

ACL Pattern:
auth.hasPermission('user.view')
