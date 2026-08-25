---
layout: ../layouts/MarkdownLayout.astro
title: Cloudflare KV
---

# Basics of Cloudflare KV

## What Is Cloudflare KV?

Cloudflare KV (Workers KV) is a **globally distributed key-value store** designed for Cloudflare Workers.

It stores data as:

```text
key → value
```

Example:

```text
username:marvin → "Marvin Alegre"
```

KV is useful when you need to **quickly read data from many locations around the world**.

---

## Basic Concepts

### Namespace

A namespace is a collection of KV entries.

Example:

```text
MY_KV
├── user:123
├── user:456
├── config:site
└── feature:dark-mode
```

A Worker accesses the namespace through a binding.

---

## Creating a KV Namespace

Create one with Wrangler:

```bash
npx wrangler kv namespace create MY_KV
```

Wrangler gives you configuration that can be added to your Worker configuration.

Example `wrangler.jsonc`:

```jsonc
{
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "your-namespace-id",
    },
  ],
}
```

The binding becomes available in your Worker code.

---

## Reading and Writing

```ts
const value = await env.MY_KV.get("key");
```

Write a value:

```ts
await env.MY_KV.put("key", "hello");
```

Delete a value:

```ts
await env.MY_KV.delete("key");
```

Check whether a key exists:

```ts
const value = await env.MY_KV.get("key");

if (value === null) {
  // key does not exist
}
```

---

## JSON Data

KV values are commonly stored as JSON.

```ts
await env.MY_KV.put(
  "user:123",
  JSON.stringify({
    name: "Marvin",
    role: "admin",
  }),
);
```

Read it:

```ts
const value = await env.MY_KV.get("user:123");

if (value) {
  const user = JSON.parse(value);
}
```

You can also use the JSON helpers:

```ts
await env.MY_KV.put("user:123", JSON.stringify(user));

const user = await env.MY_KV.get("user:123", "json");
```

---

## Expiration

You can make keys expire.

Using a TTL:

```ts
await env.MY_KV.put("session:123", "data", {
  expirationTtl: 3600,
});
```

The key expires after **3600 seconds**.

You can also specify an absolute expiration time:

```ts
await env.MY_KV.put("session:123", "data", {
  expiration: Math.floor(Date.now() / 1000) + 3600,
});
```

---

## Key Design

Use prefixes to organize keys.

Good:

```text
user:123
user:456
session:abc123
config:site
cache:homepage
```

This makes it easier to list related keys.

Avoid unnecessarily complicated keys:

```text
some:extremely:long:key:with:lots:of:unnecessary:information
```

---

## Listing Keys

You can list keys in a namespace:

```ts
const result = await env.MY_KV.list();
```

With a prefix:

```ts
const result = await env.MY_KV.list({
  prefix: "user:",
});
```

The result contains keys matching that prefix.

---

## KV Is Eventually Consistent

KV is designed primarily for **read-heavy workloads**.

A write may not become visible everywhere immediately.

Therefore, don't use KV when your application requires:

```text
write → immediately read the exact same value everywhere
```

For strongly consistent application data, use a database such as **D1** instead.

---

## KV vs D1

|                          | KV        | D1              |
| ------------------------ | --------- | --------------- |
| Data model               | Key-value | SQL             |
| Queries                  | Key-based | SQL             |
| Global reads             | Excellent | Different model |
| Relational data          | No        | Yes             |
| Complex queries          | No        | Yes             |
| Read-heavy caching       | Excellent | Less suitable   |
| Strong consistency needs | Not ideal | Better          |
| Simple configuration     | Excellent | Overkill        |

A useful rule:

> **KV is for key-value data. D1 is for relational application data.**

---

## Good Uses for KV

KV works well for:

- Configuration
- Feature flags
- Cached data
- Static metadata
- Rate-limit-related data where eventual consistency is acceptable
- Frequently read values
- User preferences
- Temporary data with expiration
- Generated content caches

Example:

```text
config:maintenance → "false"
feature:new-ui → "true"
cache:article:123 → "{...}"
```

---

## Bad Uses for KV

Avoid using KV as your primary database for:

- Financial transactions
- Orders
- Inventory
- Relational data
- Data requiring complex queries
- Data requiring strong transactional guarantees
- Frequently updated counters that must be exact

For example, don't rely on KV for:

```text
balance = balance + 10
```

when concurrent writes must be handled transactionally.

---

## KV and Caching

KV can be used as an application-level cache.

Example:

```ts
const key = `article:${id}`;

let article = await env.MY_KV.get(key, "json");

if (!article) {
  article = await loadArticleFromDatabase(id);

  await env.MY_KV.put(key, JSON.stringify(article), { expirationTtl: 3600 });
}
```

The basic pattern is:

```text
Request
   ↓
KV
   ↓
found? ── yes → return cached value
   │
   no
   ↓
Database
   ↓
store in KV
   ↓
return value
```

---

## KV Is Not a Traditional Database

Think of KV as:

```text
fast distributed storage
```

rather than:

```text
your application's main SQL database
```

It is especially useful when the application repeatedly asks:

```text
"Give me the value associated with this key."
```

It is not designed for:

```text
"Find all users who registered last month
and have more than three purchases."
```

That is a database query.

---

## Worker Example

```ts
import { Hono } from "hono";

type Bindings = {
  MY_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/config", async (c) => {
  const config = await c.env.MY_KV.get("config:site", "json");

  return c.json(config);
});

app.post("/config", async (c) => {
  const config = await c.req.json();

  await c.env.MY_KV.put("config:site", JSON.stringify(config));

  return c.json({ success: true });
});

export default app;
```

---

## Local Development

Wrangler can provide a local KV environment for development.

This allows you to test your Worker without modifying production KV data.

Your Worker continues to access it through:

```ts
env.MY_KV;
```

The application code doesn't need to know whether it is using the local or deployed namespace.

---

## Important Mental Model

Think of Cloudflare KV as:

```text
                    Cloudflare
                       │
              ┌────────┴────────┐
              │   KV Namespace  │
              └────────┬────────┘
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      key A          key B          key C
      value          value          value
```

Your Worker primarily performs:

```text
GET
PUT
DELETE
LIST
```

That's the core of KV.

---

## Rule of Thumb

Use **KV** when:

> "I have a value identified by a key, and I mostly need fast reads."

Use **D1** when:

> "I have structured application data that I need to query and relate."

Use **R2** when:

> "I need to store files or large objects."

Use **Durable Objects** when:

> "I need strongly consistent state associated with a particular object."

---

## Summary

```text
KV
├── key → value
├── globally distributed
├── excellent for reads
├── supports expiration
├── eventually consistent
├── not relational
└── not a replacement for D1
```

The most important thing to remember:

> **Cloudflare KV is a distributed key-value store, not your primary relational database.**
