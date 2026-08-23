---
layout: ../layouts/MarkdownLayout.astro
title: Node.js
---

# Basics of Node.js

Node.js is a JavaScript runtime that lets you run JavaScript outside the browser.

## Installation

Check that Node.js is installed:

```bash
node --version
```

Run JavaScript:

```bash
node
```

Or execute a file:

```bash
node index.js
```

## A Simple Program

```js
console.log("Hello, Node.js!");
```

Save as `index.js` and run:

```bash
node index.js
```

## Modules

Node.js uses modules to organize code.

### CommonJS

```js
const fs = require("node:fs");
```

### ES Modules

With `"type": "module"` in `package.json`:

```js
import fs from "node:fs";
```

## Built-in Modules

Node.js provides many built-in modules.

```js
import path from "node:path";
import fs from "node:fs";
```

Some common modules:

- `fs` — filesystem
- `path` — filesystem paths
- `http` — HTTP servers
- `url` — URL handling
- `os` — operating system information
- `crypto` — cryptography
- `events` — event emitters
- `child_process` — spawn processes

## Reading Files

```js
import { readFile } from "node:fs/promises";

const content = await readFile("hello.txt", "utf8");

console.log(content);
```

## Writing Files

```js
import { writeFile } from "node:fs/promises";

await writeFile("hello.txt", "Hello!");
```

## Command-Line Arguments

```js
console.log(process.argv);
```

Run:

```bash
node index.js hello world
```

Arguments are available in `process.argv`.

## Environment Variables

```js
console.log(process.env.NODE_ENV);
```

Set one from the shell:

```bash
NODE_ENV=production node index.js
```

## `package.json`

Create a Node.js project:

```bash
npm init
```

Or:

```bash
pnpm init
```

A basic `package.json`:

```json
{
  "name": "my-project",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  }
}
```

Run a script:

```bash
pnpm start
```

## Installing Packages

Install a package:

```bash
pnpm add lodash
```

Install a development dependency:

```bash
pnpm add -D typescript
```

Import it:

```js
import _ from "lodash";
```

## HTTP Server

Node.js can create HTTP servers without external packages.

```js
import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.end("Hello!");
});

server.listen(3000);
```

Start it:

```bash
node index.js
```

Then visit:

```text
http://localhost:3000
```

## Asynchronous Code

Node.js APIs commonly use promises.

```js
const result = await someAsyncFunction();
```

You can also use `.then()`:

```js
someAsyncFunction()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Useful Globals

Some commonly used Node.js globals:

```js
console.log(process);
console.log(process.cwd());
console.log(process.argv);
console.log(process.env);
```

`globalThis` is the global object:

```js
console.log(globalThis);
```

## Useful Commands

```bash
node file.js
node --watch file.js
node --help
node --version
```

`--watch` automatically restarts the program when files change:

```bash
node --watch index.js
```

## Node.js vs Browser JavaScript

Browser JavaScript provides APIs such as:

```js
document;
window;
localStorage;
fetch;
```

Node.js provides APIs such as:

```js
process;
fs;
path;
Buffer;
```

`fetch()` is also available in modern Node.js.

## Typical Project

```text
my-project/
├── package.json
├── index.js
└── node_modules/
```

A common workflow:

```bash
pnpm init
pnpm add some-package
node index.js
```
