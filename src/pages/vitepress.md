---
layout: ../layouts/MarkdownLayout.astro
title: VitePress
---

# Basics of VitePress

VitePress is a static site generator built on top of Vite and Vue. It is commonly used for documentation, blogs, and content-focused websites.

## Installation

Create a project:

```bash
pnpm create vitepress
```

Or install VitePress into an existing project:

```bash
pnpm add -D vitepress
```

## Project Structure

A basic VitePress project looks like:

```text
.
├── docs/
│   ├── .vitepress/
│   │   └── config.js
│   ├── index.md
│   └── guide.md
└── package.json
```

The `.vitepress` directory contains VitePress configuration.

## Start the Development Server

Add a script to `package.json`:

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs"
  }
}
```

Then run:

```bash
pnpm docs:dev
```

## Markdown

VitePress pages are written in Markdown:

```md
# Hello

This is a VitePress page.

## Section

Some content here.
```

Each Markdown file becomes a page.

For example:

```text
docs/guide.md
```

becomes:

```text
/guide
```

## Frontmatter

Pages can have YAML frontmatter:

```md
---
title: My Page
description: A simple VitePress page
---

# My Page
```

## Configuration

Create `.vitepress/config.js`:

```js
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "My Docs",
  description: "My documentation",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [{ text: "Introduction", link: "/guide" }],
      },
    ],
  },
});
```

## Navigation

`nav` controls the top navigation:

```js
nav: [
  { text: "Home", link: "/" },
  { text: "Guide", link: "/guide" },
];
```

## Sidebar

`sidebar` controls the sidebar:

```js
sidebar: [
  {
    text: "Guide",
    items: [
      { text: "Introduction", link: "/guide" },
      { text: "Installation", link: "/guide/installation" },
    ],
  },
];
```

## Code Blocks

Markdown code blocks are supported:

```js
const message = "Hello";
console.log(message);
```

VitePress also supports syntax highlighting:

```ts
const add = (a: number, b: number) => a + b;
```

## Vue Components

VitePress supports Vue components inside Markdown.

For example:

```md
<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<button @click="count++">
Count: {{ count }}
</button>
```

## Build

Build the documentation site:

```bash
pnpm vitepress build docs
```

The generated site is placed in:

```text
docs/.vitepress/dist/
```

## Preview

Preview the production build:

```bash
pnpm vitepress preview docs
```

## Why Use VitePress?

VitePress is useful when you want:

- Markdown-based documentation
- Fast development with Vite
- Vue components when needed
- Static HTML generation
- Built-in navigation and sidebar support
- Search integration
- A documentation-oriented theme

## Basic Workflow

```text
Markdown
   ↓
VitePress
   ↓
Vite
   ↓
Static HTML/CSS/JS
   ↓
Deploy
```

For a documentation site, most content can simply be written as Markdown while VitePress handles the site structure and build process.
