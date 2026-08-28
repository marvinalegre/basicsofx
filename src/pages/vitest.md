---
layout: ../layouts/MarkdownLayout.astro
title: Vitest
---

# Basics of Vitest

## What is Vitest?

[Vitest](https://vitest.dev/) is a JavaScript/TypeScript testing framework.

It is commonly used with Vite projects and provides:

- Unit testing
- Integration testing
- Assertions
- Mocking
- Spies
- Test coverage
- Watch mode

## Installation

```bash
pnpm add -D vitest
```

Add a test script to `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run tests:

```bash
pnpm test
```

Run once:

```bash
pnpm vitest run
```

## Basic Test

Create `math.test.ts`:

```ts
import { describe, expect, it } from "vitest";

function add(a: number, b: number) {
  return a + b;
}

describe("add", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

Run:

```bash
pnpm vitest
```

## `it` and `test`

They are equivalent:

```ts
it("adds numbers", () => {
  expect(1 + 1).toBe(2);
});
```

```ts
test("adds numbers", () => {
  expect(1 + 1).toBe(2);
});
```

## `describe`

Groups related tests:

```ts
describe("math", () => {
  it("adds", () => {
    expect(1 + 2).toBe(3);
  });

  it("multiplies", () => {
    expect(2 * 3).toBe(6);
  });
});
```

## Assertions

Vitest uses `expect()`.

### Equality

```ts
expect(2 + 2).toBe(4);
```

```ts
expect({ name: "Marvin" }).toEqual({ name: "Marvin" });
```

### Truthiness

```ts
expect(true).toBeTruthy();
expect(false).toBeFalsy();
```

### Null / undefined

```ts
expect(null).toBeNull();
expect(undefined).toBeUndefined();
```

### Numbers

```ts
expect(10).toBeGreaterThan(5);
expect(10).toBeLessThan(20);
```

### Strings

```ts
expect("hello world").toContain("world");
```

### Arrays

```ts
expect([1, 2, 3]).toContain(2);
```

## Testing Errors

```ts
function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}
```

Test it:

```ts
it("throws when dividing by zero", () => {
  expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
});
```

## Async Tests

Vitest supports promises:

```ts
it("gets a user", async () => {
  const user = await getUser();

  expect(user.name).toBe("Marvin");
});
```

You can also return the promise:

```ts
it("gets a user", () => {
  return getUser().then((user) => {
    expect(user.name).toBe("Marvin");
  });
});
```

## Setup and Teardown

### `beforeEach`

Runs before every test:

```ts
beforeEach(() => {
  // setup
});
```

### `afterEach`

Runs after every test:

```ts
afterEach(() => {
  // cleanup
});
```

### `beforeAll`

Runs once before all tests:

```ts
beforeAll(() => {
  // setup
});
```

### `afterAll`

Runs once after all tests:

```ts
afterAll(() => {
  // cleanup
});
```

Example:

```ts
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("users", () => {
  beforeEach(() => {
    // setup
  });

  afterEach(() => {
    // cleanup
  });

  it("creates a user", () => {
    // test
  });
});
```

## Mock Functions

Use `vi.fn()`:

```ts
import { expect, it, vi } from "vitest";

it("calls the function", () => {
  const fn = vi.fn();

  fn();

  expect(fn).toHaveBeenCalled();
});
```

Check arguments:

```ts
const fn = vi.fn();

fn("hello");

expect(fn).toHaveBeenCalledWith("hello");
```

## Mock Return Values

```ts
const fn = vi.fn();

fn.mockReturnValue(42);

expect(fn()).toBe(42);
```

Async:

```ts
const fn = vi.fn();

fn.mockResolvedValue("hello");

expect(await fn()).toBe("hello");
```

## Spying

Use `vi.spyOn()`:

```ts
const user = {
  greet() {
    return "hello";
  },
};

const spy = vi.spyOn(user, "greet");

user.greet();

expect(spy).toHaveBeenCalled();
```

Restore the original function:

```ts
spy.mockRestore();
```

## Mocking Modules

```ts
import { vi } from "vitest";

vi.mock("./database");
```

Example:

```ts
vi.mock("./database", () => ({
  getUser: vi.fn(() => ({
    id: 1,
    name: "Marvin",
  })),
}));
```

## Skipping Tests

Skip a test:

```ts
it.skip("not implemented", () => {
  // ...
});
```

Skip a group:

```ts
describe.skip("unfinished tests", () => {
  // ...
});
```

## Only Run Specific Tests

```ts
it.only("run this test", () => {
  // ...
});
```

Use `.only` temporarily while developing.

## Test Files

Common naming conventions:

```text
src/
├── math.ts
├── math.test.ts
├── user.ts
└── user.test.ts
```

Vitest also recognizes names such as:

```text
*.test.ts
*.spec.ts
*.test.js
*.spec.js
```

## Watch Mode

```bash
pnpm vitest
```

Vitest normally watches files during development.

Run once without watch mode:

```bash
pnpm vitest run
```

## Test Coverage

Install the coverage package:

```bash
pnpm add -D @vitest/coverage-v8
```

Run:

```bash
pnpm vitest --coverage
```

Coverage shows how much of your code is exercised by tests.

## Vitest Configuration

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
});
```

With `globals: true`, you can use:

```ts
describe("math", () => {
  it("adds", () => {
    expect(1 + 1).toBe(2);
  });
});
```

without importing the test functions.

Without globals:

```ts
import { describe, expect, it } from "vitest";
```

## Useful Commands

```bash
# Start watch mode
pnpm vitest

# Run once
pnpm vitest run

# Run a specific file
pnpm vitest math.test.ts

# Run tests matching a name
pnpm vitest -t "adds"

# Coverage
pnpm vitest --coverage

# UI
pnpm vitest --ui
```

## Fundamental Vitest API

The most important things to learn first:

| API               | Purpose                     |
| ----------------- | --------------------------- |
| `describe()`      | Group tests                 |
| `it()` / `test()` | Define a test               |
| `expect()`        | Make assertions             |
| `beforeEach()`    | Run setup before each test  |
| `afterEach()`     | Run cleanup after each test |
| `beforeAll()`     | Run setup once              |
| `afterAll()`      | Run cleanup once            |
| `vi.fn()`         | Create mock functions       |
| `vi.spyOn()`      | Spy on functions            |
| `vi.mock()`       | Mock modules                |

## Minimal Example

```ts
import { describe, expect, it } from "vitest";
import { add } from "./math";

describe("add", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("handles negative numbers", () => {
    expect(add(-2, 3)).toBe(1);
  });
});
```

Run it:

```bash
pnpm vitest
```

The basic workflow is:

```text
write code
   ↓
write test
   ↓
run Vitest
   ↓
assert expected behavior
   ↓
fix code
   ↓
repeat
```
