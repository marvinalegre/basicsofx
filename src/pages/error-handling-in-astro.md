---
layout: ../layouts/MarkdownLayout.astro
title: Error Handling in Astro
---

# Basics of Error Handling in Astro

## 1. What Is Error Handling?

Error handling means detecting and responding to errors instead of letting your application crash unexpectedly.

Common errors:

- Invalid user input
- Failed API requests
- Missing data
- Database errors
- Server-side exceptions
- Missing pages

---

## 2. `try...catch`

Use JavaScript's `try...catch` to handle errors.

```ts
try {
  const data = await fetchData();
} catch (error) {
  console.error(error);
}
```

Example in an Astro page:

```astro
---
let data

try {
  const response = await fetch("https://example.com/api")
  data = await response.json()
} catch (error) {
  console.error(error)
}
---

{data ? <p>{data.name}</p> : <p>Failed to load data.</p>}
```

---

## 3. Throwing Errors

Use `throw` when something goes wrong.

```ts
if (!user) {
  throw new Error("User not found");
}
```

The error can then be caught by a higher-level handler.

---

## 4. API Route Errors

Astro API routes can return an appropriate HTTP status.

```ts
export async function GET() {
  try {
    const data = await getData();

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

Common status codes:

| Code  | Meaning               |
| ----- | --------------------- |
| `400` | Bad Request           |
| `401` | Unauthorized          |
| `403` | Forbidden             |
| `404` | Not Found             |
| `500` | Internal Server Error |

---

## 5. Handling `fetch()` Errors

`fetch()` does **not** throw for HTTP errors such as `404` or `500`.

Check `response.ok`:

```ts
const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

const data = await response.json();
```

---

## 6. Custom 404 Page

Create:

```text
src/pages/404.astro
```

Example:

```astro
---
const title = "Page Not Found"
---

<html>
  <head>
    <title>{title}</title>
  </head>

  <body>
    <h1>404</h1>
    <p>The page does not exist.</p>
    <a href="/">Go home</a>
  </body>
</html>
```

Astro uses this page when a route does not exist.

---

## 7. Error Pages

For unexpected server errors, Astro can use an error page depending on the rendering/deployment setup.

A common approach is to create an error UI that displays a safe message:

```astro
<h1>Something went wrong</h1>
<p>Please try again later.</p>
```

Do **not** expose sensitive error details to users.

Bad:

```text
Database connection failed:
postgres://user:password@server/db
```

Better:

```text
Something went wrong. Please try again later.
```

Log the detailed error on the server instead.

---

## 8. Logging Errors

Use `console.error()`:

```ts
try {
  await saveUser(user);
} catch (error) {
  console.error("Failed to save user:", error);
}
```

During development, detailed logs are useful.

In production, avoid logging:

- Passwords
- Authentication tokens
- API keys
- Sensitive personal data

---

## 9. Error Handling in Functions

Keep error handling close to operations that can fail.

```ts
async function getUser(id: string) {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}
```

Then handle it where appropriate:

```ts
try {
  const user = await getUser("123");
} catch (error) {
  console.error(error);
}
```

This keeps the function simple and lets the caller decide how to handle the error.

---

## 10. Don't Swallow Errors

Avoid:

```ts
try {
  await doSomething();
} catch {}
```

The error disappears completely.

Better:

```ts
try {
  await doSomething();
} catch (error) {
  console.error(error);
}
```

Or rethrow it:

```ts
try {
  await doSomething();
} catch (error) {
  console.error(error);
  throw error;
}
```

---

## 11. A Simple Pattern

A good basic pattern:

```ts
try {
  // operation that can fail
  const result = await doSomething();

  // use result
} catch (error) {
  // log error
  console.error(error);

  // return safe response
}
```

For an API:

```ts
export async function GET() {
  try {
    const data = await getData();

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

---

## 12. Key Ideas

- Use `try...catch` for operations that can throw.
- Check `response.ok` after `fetch()`.
- Use appropriate HTTP status codes.
- Return friendly errors to users.
- Log detailed errors on the server.
- Never expose secrets in error messages.
- Don't silently swallow errors.
- Use `404.astro` for custom 404 pages.
- Let errors propagate when the current layer cannot handle them.

## Mental Model

```text
Something fails
      ↓
Does this layer know how to handle it?
      ↓
   ┌──┴──┐
  yes    no
   ↓      ↓
handle   throw
   ↓      ↓
response higher layer
```
