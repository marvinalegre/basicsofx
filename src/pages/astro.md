---
layout: ../layouts/MarkdownLayout.astro
title: Astro
---

# Basics of Astro

## What Is Astro?

Astro is a web framework for building fast websites.

Main idea:

- HTML first
- Minimal JavaScript
- Components when needed
- Supports React, Vue, Svelte, etc.
- Great for content-heavy sites

## Create a Project

```bash
pnpm create astro@latest
cd my-site
pnpm install
pnpm dev
```

Default dev server:

```text
http://localhost:4321
```

## Project Structure

```text
my-site/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
└── package.json
```

## Pages

Files in `src/pages/` become routes.

```text
src/pages/
├── index.astro
├── about.astro
└── blog/
    └── hello.astro
```

Routes:

```text
/
/about
/blog/hello
```

## Astro Components

Astro components use `.astro` files.

```astro
---
const name = "Marvin";
---

<h1>Hello {name}</h1>
```

The `---` section is the frontmatter. It runs on the server/build side by default.

## Components

`src/components/Header.astro`:

```astro
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
```

Use it:

```astro
---
import Header from "../components/Header.astro";
---

<Header />

<h1>Home</h1>
```

## Props

```astro
---
const { title } = Astro.props;
---

<h1>{title}</h1>
```

Use it:

```astro
<Card title="Hello" />
```

## Layouts

Layouts let you reuse page structure.

```astro
---
const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

Use it:

```astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout title="Home">
  <h1>Hello</h1>
</Layout>
```

`<slot />` is where the page content goes.

## CSS

```astro
<style>
  h1 {
    color: red;
  }
</style>

<h1>Hello</h1>
```

Astro scopes component styles by default.

## JavaScript

Astro does not send component JavaScript to the browser by default.

Browser-side JavaScript:

```astro
<button id="button">Click me</button>

<script>
  document.querySelector("#button")?.addEventListener("click", () => {
    alert("Hello");
  });
</script>
```

## UI Frameworks

Astro can use React, Vue, Svelte, and other UI frameworks.

For example:

```bash
pnpm astro add react
```

Then:

```astro
---
import Counter from "../components/Counter.jsx";
---

<Counter client:load />
```

## Client Directives

They control when framework components become interactive.

```astro
<Component client:load />
```

Load immediately.

```astro
<Component client:idle />
```

Load when the browser is idle.

```astro
<Component client:visible />
```

Load when the component becomes visible.

```astro
<Component client:only="react" />
```

Render only on the client.

## Dynamic Routes

Create:

```text
src/pages/blog/[slug].astro
```

```astro
---
const { slug } = Astro.params;
---

<h1>{slug}</h1>
```

For `/blog/hello`:

```text
slug = "hello"
```

## Rendering Lists

```astro
---
const posts = [
  { title: "First", slug: "first" },
  { title: "Second", slug: "second" },
];
---

{posts.map((post) => (
  <a href={`/blog/${post.slug}`}>
    {post.title}
  </a>
))}
```

## API Endpoints

Create:

```text
src/pages/api/hello.ts
```

```ts
export function GET() {
  return new Response(JSON.stringify({ message: "Hello" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
```

The endpoint is available at:

```text
/api/hello
```

## Static Assets

Put static files in `public/`:

```text
public/logo.png
```

Use them with:

```astro
<img src="/logo.png" alt="Logo" />
```

## Environment Variables

```env
PUBLIC_API_URL=https://example.com
SECRET_KEY=secret
```

Public variables use the `PUBLIC_` prefix:

```astro
---
const apiUrl = import.meta.env.PUBLIC_API_URL;
---
```

Keep secrets server-side.

## Build Commands

```bash
pnpm dev
pnpm build
pnpm preview
```

## The Big Idea

Default Astro:

```text
Astro component
      ↓
    HTML
      ↓
   browser
```

Interactive component:

```text
Astro
  ↓
React / Vue / Svelte
  ↓
HTML + JavaScript
```

Astro tries to ship **HTML by default** and **JavaScript only when needed**.

## Learn Next

1. Pages and routing
2. Components
3. Props
4. Layouts
5. Content collections
6. Dynamic routes
7. API endpoints
8. Server-side rendering
9. Client directives
10. Deployment
