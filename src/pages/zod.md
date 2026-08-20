---
layout: ../layouts/MarkdownLayout.astro
title: Zod
---

# Basics of Zod

## What is Zod?

**Zod** is a TypeScript-first schema validation library.

You define what data should look like:

```js
import { z } from "zod";

const User = z.object({
  name: z.string(),
  age: z.number(),
});
```

Then validate data:

```js
const result = User.safeParse(data);
```

---

## Basic Types

```js
z.string();
z.number();
z.boolean();
z.bigint();
z.date();
z.undefined();
z.null();
```

Example:

```js
const name = z.string();

name.parse("Marvin"); // "Marvin"
name.parse(123); // throws
```

---

## Objects

```js
const User = z.object({
  username: z.string(),
  age: z.number(),
  active: z.boolean(),
});
```

```js
User.parse({
  username: "marvin",
  age: 25,
  active: true,
});
```

---

## Optional Fields

```js
const User = z.object({
  username: z.string(),
  bio: z.string().optional(),
});
```

`bio` can be missing.

---

## Nullable Fields

```js
const User = z.object({
  bio: z.string().nullable(),
});
```

`bio` must exist, but can be `null`.

---

## Arrays

```js
const Tags = z.array(z.string());
```

```js
Tags.parse(["js", "typescript", "zod"]);
```

---

## Enums

```js
const Role = z.enum(["user", "admin"]);
```

```js
Role.parse("admin"); // "admin"
```

---

## Constraints

```js
const Password = z.string().min(8).max(100);
```

```js
const Age = z.number().int().min(18).max(120);
```

---

## Parsing

### `parse()`

Throws if invalid:

```js
const user = User.parse(data);
```

Good when invalid input should immediately become an exception.

### `safeParse()`

Doesn't throw:

```js
const result = User.safeParse(data);

if (!result.success) {
  console.log(result.error);
} else {
  console.log(result.data);
}
```

Useful for HTTP request validation.

---

## Transform

You can transform validated data:

```js
const Email = z
  .string()
  .email()
  .transform((email) => email.toLowerCase());
```

```js
Email.parse("USER@EXAMPLE.COM");
// "user@example.com"
```

---

## Infer TypeScript Types

Zod can generate a TypeScript type from a schema:

```ts
const User = z.object({
  name: z.string(),
  age: z.number(),
});

type User = z.infer<typeof User>;
```

Equivalent to:

```ts
type User = {
  name: string;
  age: number;
};
```

**Schema = runtime validation**

**`z.infer` = compile-time type**

---

## Common HTTP Pattern

For a POST endpoint:

```ts
const Signup = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const result = Signup.safeParse(await c.req.json());

if (!result.success) {
  return c.json({ error: "Invalid input" }, 400);
}

const data = result.data;
```

Now `data` is validated.

---

## Useful Methods

```js
.optional()
.nullable()
.array()
.min()
.max()
.length()
.email()
.url()
.uuid()
.int()
.regex()
.refine()
.transform()
```

---

## Mental Model

```text
Untrusted data
      ↓
    Zod
      ↓
validated data
      ↓
   application
```

For web applications:

```text
HTTP request
     ↓
JSON
     ↓
Zod schema
     ↓
validation
     ↓
database / business logic
```

**Main rule:** validate data at the boundary before trusting it.
