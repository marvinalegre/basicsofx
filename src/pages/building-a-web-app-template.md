---
layout: ../layouts/MarkdownLayout.astro
title: Building a Web Application Template
---

# Basics of Building a Web Application Template

## What Is a Template?

A template is a starting project containing the common infrastructure you repeatedly need.

Instead of starting every project from an empty directory:

```text
Template
   ↓
New project
   ↓
Add application-specific code
```

The template should contain **stable, reusable infrastructure**, not application-specific features.

## What Belongs in a Template?

For a TypeScript web application:

```text
my-template/
├── src/
│   ├── routes/
│   ├── lib/
│   └── index.ts
├── public/
├── tests/
├── .gitignore
├── package.json
├── tsconfig.json
├── wrangler.jsonc
└── README.md
```

Common reusable pieces:

- TypeScript configuration
- build configuration
- deployment configuration
- routing structure
- error handling
- logging
- environment handling
- validation
- authentication
- database setup
- testing
- linting/formatting
- common UI components
- CSS baseline

Do not include something merely because it _might_ be useful.

## Infrastructure vs Application

A useful rule:

> The template provides the skeleton. The project provides the features.

For example:

```text
Template:
  authentication
  validation
  database setup
  error handling
  /login
  /signup

Application:
  /dashboard
  /projects
  /leaderboard
```

The template should avoid domain-specific concepts.

## Start With a Working Application

Do not begin by creating dozens of empty files.

First build a small working application:

```text
request
  ↓
router
  ↓
handler
  ↓
validation
  ↓
database
  ↓
response
```

Then identify what you repeatedly need and extract those parts into the template.

This gives you a template based on **proven code** rather than theoretical organization.

## Keep It Small

A template should make starting a project easier.

If you regularly delete half of the template when starting a project, the template is too large.

Prefer:

```text
small template
    +
application code
```

over:

```text
huge template
    -
things you don't need
```

## Use Sensible Defaults

A good template should work immediately:

```bash
pnpm install
pnpm dev
```

Use sensible defaults for:

- development
- TypeScript
- formatting
- testing
- local configuration
- environment variables

## Configuration vs Secrets

Templates should contain configuration **structure**, not secrets.

Good:

```env
DATABASE_URL=
SESSION_SECRET=
```

Commit:

```text
.env.example
```

Ignore:

```text
.env
```

Never put real credentials into the template repository.

## Establish Conventions

One major benefit of a template is consistency.

For example:

```text
src/
├── routes/
├── components/
├── lib/
├── db/
├── validation/
└── types/
```

Decide these conventions once instead of reconsidering them for every project.

## Keep Dependencies Intentional

Every dependency in the template becomes a dependency in every project created from it.

Therefore:

```text
dependency
    ↓
maintenance cost
    ↓
security/update burden
```

Only include dependencies that provide significant value.

## Project Initialization

Some values should change for every new project:

```text
project name
package name
database name
deployment name
README title
environment configuration
```

Initially, changing these manually is fine.

Later, you can build a generator:

```bash
create-my-app my-project
```

It can:

1. Copy the template.
2. Replace placeholders.
3. Install dependencies.
4. Initialize Git.
5. Create environment files.
6. Print next steps.

## Git Strategy

Keep the template as its own repository:

```text
web-template/
    ↓
project-a
project-b
project-c
```

The template is the **starting point** for projects, not necessarily something that should automatically control them afterward.

## Version the Template

Templates evolve:

```text
v1
v2
v3
```

A new project can use the newest version while existing projects remain stable.

This is especially useful when infrastructure changes significantly.

## What Not to Template

Avoid putting these into the base template:

- unfinished features
- experimental code
- project-specific business logic
- temporary hacks
- production data
- unnecessary dependencies
- secrets
- configuration needed by only one project

## Mental Model

Think of the template as your **personal application operating system**.

It provides:

```text
structure
+ conventions
+ infrastructure
+ tooling
+ security defaults
```

The actual project provides:

```text
business logic
+ domain models
+ pages
+ features
```

The goal is not to avoid writing code.

The goal is to avoid repeatedly writing the **same code**.
