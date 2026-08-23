---
layout: ../layouts/MarkdownLayout.astro
title: tsconfig.json
---

# Basics of `tsconfig.json`

`tsconfig.json` is the configuration file for the TypeScript compiler (`tsc`).

It tells TypeScript how to compile your project and how strictly to check your code.

## Create a `tsconfig.json`

```bash
tsc --init
```

A minimal configuration might look like:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "strict": true
  }
}
```

## `compilerOptions`

Most TypeScript configuration happens inside `compilerOptions`.

### `target`

Controls the JavaScript version TypeScript outputs.

```json
{
  "compilerOptions": {
    "target": "ES2022"
  }
}
```

Common values:

```text
ES2019
ES2020
ES2022
ESNext
```

For modern Node.js applications, a recent target is usually appropriate.

### `module`

Controls the JavaScript module system.

```json
{
  "compilerOptions": {
    "module": "NodeNext"
  }
}
```

Common options include:

```text
CommonJS
NodeNext
ESNext
```

For modern Node.js projects, `NodeNext` is often a good choice.

### `strict`

Enables TypeScript's strict type-checking features.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

It is generally recommended for new projects.

For example:

```ts
function greet(name: string) {
  return `Hello, ${name}`;
}

greet(null);
```

With strict checking enabled, TypeScript reports the invalid `null` argument.

## `rootDir`

Specifies where your TypeScript source code lives.

```json
{
  "compilerOptions": {
    "rootDir": "./src"
  }
}
```

Example:

```text
project/
├── src/
│   ├── index.ts
│   └── math.ts
└── tsconfig.json
```

## `outDir`

Specifies where compiled JavaScript should be placed.

```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

For example:

```text
src/index.ts
    ↓
dist/index.js
```

## `include`

Specifies files that TypeScript should include.

```json
{
  "include": ["src/**/*.ts"]
}
```

You can also use:

```json
{
  "include": ["src"]
}
```

## `exclude`

Specifies files that should not be included.

```json
{
  "exclude": ["node_modules", "dist"]
}
```

## `noEmit`

Prevents TypeScript from generating JavaScript.

```json
{
  "compilerOptions": {
    "noEmit": true
  }
}
```

This is useful when TypeScript is only being used for type checking.

```bash
tsc
```

Type errors are reported, but no files are generated.

## `sourceMap`

Generates source maps.

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

Source maps allow debuggers to associate generated JavaScript with the original TypeScript.

## `esModuleInterop`

Improves compatibility between CommonJS and ES modules.

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

This is commonly enabled in Node.js projects.

## `types`

Controls which type declaration packages are included.

```json
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```

For example, this allows TypeScript to understand Node.js APIs such as:

```ts
process.env;
```

## `lib`

Specifies which built-in JavaScript APIs TypeScript knows about.

```json
{
  "compilerOptions": {
    "lib": ["ES2022", "DOM"]
  }
}
```

`DOM` provides types for browser APIs such as:

```ts
document;
window;
fetch;
```

## `paths`

Defines aliases for imports.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

This can allow:

```ts
import { foo } from "@/foo";
```

instead of:

```ts
import { foo } from "../../foo";
```

The runtime or bundler may also need to be configured to understand these aliases.

## `extends`

Allows one configuration to inherit from another.

```json
{
  "extends": "./tsconfig.base.json"
}
```

This is useful when multiple projects share configuration.

## A Typical Node.js Configuration

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## Compile the Project

Run:

```bash
tsc
```

TypeScript reads `tsconfig.json` automatically.

You can also specify it explicitly:

```bash
tsc -p tsconfig.json
```

## Type Check Without Emitting

```bash
tsc --noEmit
```

This is useful in CI or during development.

## Important Options

| Option            | Purpose                            |
| ----------------- | ---------------------------------- |
| `target`          | JavaScript version to output       |
| `module`          | Module system                      |
| `strict`          | Strict type checking               |
| `rootDir`         | Source directory                   |
| `outDir`          | Output directory                   |
| `include`         | Files to compile                   |
| `exclude`         | Files to ignore                    |
| `noEmit`          | Don't generate JavaScript          |
| `sourceMap`       | Generate source maps               |
| `esModuleInterop` | Improve CommonJS/ESM compatibility |
| `lib`             | Available built-in API types       |
| `types`           | Included type packages             |
| `paths`           | Import aliases                     |
| `extends`         | Inherit another configuration      |

## Mental Model

Think of `tsconfig.json` as answering three questions:

```text
What should TypeScript understand?
        ↓
    lib / types

How should TypeScript check the code?
        ↓
    strict / compiler options

What JavaScript should TypeScript produce?
        ↓
    target / module / outDir
```

For most projects, start with a simple configuration and add options only when you need them.
