---
layout: ../layouts/MarkdownLayout.astro
title: Service Workers
---

# Basics of Service Workers

## What Is a Service Worker?

A **service worker** is a JavaScript file that runs separately from a web page.

It can:

- Intercept network requests
- Cache files
- Serve cached files when offline
- Handle background tasks
- Enable parts of a website to work offline
- Support Progressive Web Apps (PWAs)

```text
Browser
   │
   ▼
Service Worker
   │
   ├── Cache
   │
   └── Network
```

---

## Registering a Service Worker

In your webpage:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

This tells the browser to register `/sw.js`.

---

## Basic Service Worker

```js
self.addEventListener("install", () => {
  console.log("Service worker installed");
});

self.addEventListener("activate", () => {
  console.log("Service worker activated");
});

self.addEventListener("fetch", (event) => {
  console.log("Request:", event.request.url);
});
```

There are three important events:

| Event      | Purpose                    |
| ---------- | -------------------------- |
| `install`  | Initial setup              |
| `activate` | Cleanup / becoming active  |
| `fetch`    | Intercept network requests |

---

## Service Worker Lifecycle

```text
register()
    │
    ▼
 install
    │
    ▼
 waiting
    │
    ▼
 activate
    │
    ▼
 controlling pages
```

A service worker does **not** immediately control the page that registered it.

Usually, a reload is needed after the first installation.

---

## Caching Files

The Cache API can store resources:

```js
const CACHE_NAME = "v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", "/index.html", "/style.css", "/app.js"]);
    }),
  );
});
```

Now those files can be available offline.

---

## Serving Cached Files

A simple cache-first strategy:

```js
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    }),
  );
});
```

Behavior:

```text
Request
   │
   ▼
Cache?
 ┌─┴─┐
Yes  No
 │    │
 ▼    ▼
Cache Network
      │
      ▼
   Response
```

---

## Offline Fallback

You can provide a special offline page:

```js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.add("/offline.html");
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match("/offline.html");
    }),
  );
});
```

If the network fails, `/offline.html` is returned.

---

## Updating a Cache

Use cache versions:

```js
const CACHE_NAME = "v2";
```

Then delete old caches:

```js
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
});
```

---

## Service Worker Scope

A service worker controls URLs under its scope.

For example:

```text
/sw.js
```

normally controls:

```text
/
├── index.html
├── about.html
└── app/
    └── page.html
```

But:

```text
/sw.js
```

does not normally control something outside its scope.

---

## HTTPS Requirement

Service workers generally require a **secure context**.

That means:

```text
https://example.com
```

works.

For development:

```text
http://localhost:3000
```

is also allowed.

---

## Service Workers Are Not Web Workers

Both run JavaScript outside the normal page execution context, but they have different purposes.

### Web Worker

Used for background computation:

```text
Page
 │
 └── Web Worker
       └── heavy computation
```

### Service Worker

Used for network/resource control:

```text
Page
 │
 └── Service Worker
       ├── Cache
       ├── Network
       └── Offline
```

---

## Common Cache Strategies

### Cache First

```text
Cache → Network
```

Good for:

- Static assets
- Images
- Fonts
- Offline applications

### Network First

```text
Network → Cache
```

Good for:

- Frequently changing content
- News
- API responses

### Stale While Revalidate

```text
Cache → return immediately
Network → update cache
```

Good for:

- Content that can be slightly stale
- Websites where speed matters

---

## Service Workers and PWAs

A service worker is one of the major pieces of a **Progressive Web App**.

A PWA commonly includes:

```text
Website
├── HTTPS
├── Service Worker
├── Web App Manifest
└── Cached resources
```

The service worker is what makes reliable offline behavior possible.

---

## Service Worker Limitations

Service workers:

- Cannot directly manipulate the DOM
- Have their own execution context
- Can be terminated by the browser
- Cannot assume they run continuously
- Have browser-specific storage limits
- Must follow service-worker security restrictions

The page and service worker communicate using APIs such as:

```js
navigator.serviceWorker.controller;
```

and:

```js
postMessage();
```

---

## Minimal Offline Website

A basic structure:

```text
my-site/
├── index.html
├── offline.html
├── style.css
├── app.js
└── sw.js
```

`index.html`:

```html
<script>
  navigator.serviceWorker.register("/sw.js");
</script>
```

`sw.js`:

```js
const CACHE = "site-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/offline.html",
          "/style.css",
          "/app.js",
        ]),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
```

Now previously cached resources can be loaded without a network connection.

---

## Key Idea

A service worker sits between your website and the network:

```text
             ┌─────────┐
             │ Website │
             └────┬────┘
                  │
                  ▼
          ┌───────────────┐
          │Service Worker │
          └───────┬───────┘
                  │
             ┌────┴────┐
             ▼         ▼
          Cache     Network
```

**The main reason to use one is control over network requests and offline behavior.**
