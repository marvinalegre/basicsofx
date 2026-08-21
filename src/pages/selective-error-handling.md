---
layout: ../layouts/MarkdownLayout.astro
title: Selective Error Handling
---

# Basics of Selective Error Handling

## 1. What Is Selective Error Handling?

Selective error handling means:

> **Handle errors you know how to handle, and let unexpected errors propagate.**

Instead of catching everything:

```js
try {
  await doSomething();
} catch (error) {
  console.error(error);
}
```

you distinguish between different kinds of errors.

```text
Expected error
      ↓
Handle it

Unexpected error
      ↓
Let it propagate
```

---

## 2. Why Not Catch Everything?

This is dangerous:

```js
try {
  const data = await getUser();
  const result = await process(data);
  await save(result);
} catch (error) {
  return "Something went wrong";
}
```

You don't know what failed.

It could be:

- User doesn't exist
- Database is unavailable
- Programming bug
- Invalid data
- Network failure

Treating all of these the same makes debugging harder.

---

## 3. Handle Known Errors

Create specific error types:

```js
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}
```

Throw it:

```js
if (!user) {
  throw new NotFoundError("User not found");
}
```

Then selectively handle it:

```js
try {
  const user = await getUser(id);
} catch (error) {
  if (error instanceof NotFoundError) {
    return null;
  }

  throw error;
}
```

The important part:

```js
throw error;
```

Unknown errors continue upward.

---

## 4. Example

```js
try {
  const user = await getUser(id);

  return user;
} catch (error) {
  if (error instanceof NotFoundError) {
    return null;
  }

  throw error;
}
```

Behavior:

```text
NotFoundError
    ↓
return null

DatabaseError
    ↓
throw

ProgrammingError
    ↓
throw
```

---

## 5. HTTP Errors

Selective handling is especially useful with `fetch()`.

```js
const res = await fetch("/api/users");

if (res.status === 404) {
  // Expected
  return [];
}

if (!res.ok) {
  throw new Error(`Request failed: ${res.status}`);
}

const data = await res.json();
```

Here:

```text
404
 ↓
Handle normally

500
 ↓
Throw

Network failure
 ↓
fetch() throws
```

---

## 6. Multiple Known Errors

You can handle several specific cases:

```js
try {
  const res = await fetch("/api/user");

  if (res.status === 404) {
    return null;
  }

  if (res.status === 401) {
    throw new UnauthorizedError();
  }

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return await res.json();
} catch (error) {
  if (error instanceof UnauthorizedError) {
    return redirect("/login");
  }

  throw error;
}
```

---

## 7. Don't Check Error Strings

Avoid:

```js
catch (error) {
  if (error.message === "User not found") {
    // ...
  }
}
```

Error messages are meant for humans and can change.

Prefer:

```js
if (error instanceof NotFoundError) {
  // ...
}
```

---

## 8. Custom Error Classes

A common structure:

```js
class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = "AppError";
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}
```

Now you can distinguish errors:

```js
try {
  await operation();
} catch (error) {
  if (error instanceof NotFoundError) {
    // handle
  } else if (error instanceof UnauthorizedError) {
    // handle
  } else {
    throw error;
  }
}
```

---

## 9. Selective Handling in Astro

For an Astro API route:

```ts
export async function GET() {
  try {
    const user = await getUser();
    return Response.json(user);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    console.error(error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

The API handles:

```text
NotFoundError → 404
```

while unexpected errors become:

```text
Unknown error → 500
```

---

## 10. An Important Pattern

A good general structure:

```js
try {
  // operation
} catch (error) {
  if (error instanceof KnownError) {
    // handle known error
  }

  throw error;
}
```

Or, at the application's outer boundary:

```js
try {
  // application code
} catch (error) {
  if (error instanceof KnownError) {
    // convert to appropriate response
  } else {
    // log unexpected error
    console.error(error);

    // generic 500 response
  }
}
```

---

## 11. Error Handling Layers

Think of errors moving upward:

```text
Database
   ↓
Service
   ↓
API route
   ↓
HTTP response
```

Each layer should handle errors it understands.

### Database layer

Knows:

```text
DatabaseError
```

### Service layer

Knows:

```text
UserNotFoundError
PermissionError
```

### API layer

Converts them into:

```text
404
403
500
```

---

## 12. Don't Handle Errors Too Early

Bad:

```js
async function getUser(id) {
  try {
    return await db.getUser(id);
  } catch (error) {
    return null;
  }
}
```

Now the caller can't distinguish:

```text
User doesn't exist
```

from:

```text
Database crashed
```

Better:

```js
async function getUser(id) {
  return await db.getUser(id);
}
```

Let the error propagate.

The API layer can decide how to respond.

---

## 13. `finally`

Use `finally` for cleanup that should happen regardless of success or failure:

```js
try {
  await operation();
} catch (error) {
  console.error(error);
  throw error;
} finally {
  cleanup();
}
```

Flow:

```text
success ─────┐
             ↓
          finally
             ↑
error ───────┘
```

---

## 14. The Core Rule

```text
┌─────────────────────────┐
│ Did I expect this error?│
└────────────┬────────────┘
             │
       ┌─────┴─────┐
       │           │
      YES          NO
       │           │
       ↓           ↓
   Handle it     Throw it
```

### Remember

- Catch errors you can meaningfully handle.
- Don't swallow unexpected errors.
- Prefer custom error classes over error-message matching.
- Let lower-level errors propagate to the layer that understands them.
- Convert known application errors into appropriate HTTP responses.
- Log unexpected server errors.
- Return generic messages to users.
