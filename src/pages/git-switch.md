---
layout: ../layouts/MarkdownLayout.astro
title: git switch
---

# Basics of `git switch`

`git switch` is used to **change branches** in Git.

## Switch to an existing branch

```bash
git switch main
```

This changes your current branch to `main`.

## Create and switch to a new branch

```bash
git switch -c feature
```

This creates a new branch named `feature` and switches to it.

Equivalent older command:

```bash
git checkout -b feature
```

## List branches

```bash
git branch
```

The current branch is marked with `*`.

## Switch back to the previous branch

```bash
git switch -
```

Example:

```bash
git switch main
git switch feature
git switch -
```

The last command switches back to `main`.

## Switch to a remote branch

If the remote branch already exists:

```bash
git switch feature
```

Git can automatically create a local tracking branch when the remote branch is unambiguous.

You can also explicitly create it:

```bash
git switch -c feature origin/feature
```

## Create a branch without switching

`git switch` is primarily for switching, but `-c` creates **and switches**.

To create a branch without switching, use:

```bash
git branch feature
```

## Switch to a specific commit

`git switch --detach <commit>`

````

This puts Git into **detached HEAD** state.

For example:

```bash
git switch --detach abc123
````

You are no longer on a branch.

## Common commands

```bash
git switch main
git switch feature
git switch -c feature
git switch -
git switch --detach <commit>
```

### `switch` vs `checkout`

`git switch` was introduced to make branch operations clearer.

Use:

```bash
git switch feature
```

instead of the older:

```bash
git checkout feature
```

For restoring files, Git provides a separate command:

```bash
git restore file.js
```

So modern Git separates these operations:

- `git switch` → change branches
- `git restore` → restore files
- `git branch` → create, delete, and inspect branches
