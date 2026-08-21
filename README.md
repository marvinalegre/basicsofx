# Basics of x

A collection of short, practical guidesd covering the basics of various things.

## Topics

- [Astro](https://astro.build)
- [SQLite FTS5](https://sqlite.org/fts5.html)
- [systemd](https://systemd.io/)
- And more

## Structure

```text
src/
├── pages/
│   ├── index.md
│   ├── astro.md
│   ├── cloudflare-workers.md
│   ├── sqlite.md
│   └── systemd.md
│
└── styles/
    └── global.css
```

Each topic is written as a Markdown file.

```md
---
title: SQLite
---

# SQLite

SQLite is a small, self-contained SQL database...
```

## Search

The site uses **SQLite FTS5** for full-text search.

```text
Markdown
   ↓
D1
   ↓
SQLite FTS5
   ↓
/api/search
   ↓
Search bar
```

Search results return matching topics without requiring every article to be loaded into the browser.

## Build

Install dependencies:

```bash
pnpm install
```

Build the site:

```bash
pnpm build
```

The build:

1. Builds the Astro site.
2. Generates the search data.
3. Seeds the D1 database.
4. Builds the FTS5 index.

## Development

```bash
pnpm dev
```

## Deployment

The site is deployed to **Cloudflare Workers**.

```bash
pnpm build
pnpm deploy
```

D1 is used as the search database while Astro generates the static pages.

## Goals

- Simple
- Fast
- Lightweight
- Easy to read
- Minimal JavaScript
- Works well on slow connections
- Searchable
- Mostly Markdown
