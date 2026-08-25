---
layout: ../layouts/MarkdownLayout.astro
title: xargs
---

# Basics of `xargs`

`xargs` builds and executes commands using input it receives, usually from another command.

It is especially useful when you want to take a list of items and pass those items as arguments to another command.

## 1. Basic Syntax

```bash
command | xargs another-command
```

Example:

```bash
echo "a b c" | xargs echo
```

Equivalent to:

```bash
echo a b c
```

The input from `echo` becomes arguments to the command run by `xargs`.

---

## 2. Common Example

Suppose you have:

```bash
cat files.txt
```

containing:

```text
file1.txt
file2.txt
file3.txt
```

You can delete them with:

```bash
cat files.txt | xargs rm
```

This effectively runs:

```bash
rm file1.txt file2.txt file3.txt
```

> Be careful with commands such as `rm`. Always inspect the input before running destructive commands.

---

## 3. `-n` — Number of Arguments

`-n` controls how many input items are passed to each command invocation.

```bash
echo "a b c d" | xargs -n 2 echo
```

Output:

```text
a b
c d
```

Without `-n`, `xargs` tries to put as many arguments as possible into each command invocation.

---

## 4. `-I` — Replace a Placeholder

Use `-I` when you want to control where the input is placed.

```bash
echo "alice bob" | xargs -n 1 -I {} echo "Hello {}"
```

Output:

```text
Hello alice
Hello bob
```

`{}` is the placeholder.

For example:

```bash
echo "file1.txt file2.txt" | xargs -I {} cp {} backup/
```

This runs commands equivalent to:

```bash
cp file1.txt backup/
cp file2.txt backup/
```

---

## 5. `-0` — Handle Filenames Safely

Filenames can contain spaces, quotes, and other special characters.

For this reason, `find` is often combined with `-print0`:

```bash
find . -type f -print0 | xargs -0 rm
```

`find -print0` separates filenames with a null character instead of whitespace.

`xargs -0` understands this format.

This is the safer pattern when processing arbitrary filenames.

---

## 6. `find` + `xargs`

A common use:

```bash
find . -name "*.tmp" -print0 | xargs -0 rm
```

This finds `.tmp` files and passes them to `rm`.

However, for simple `find` operations, `find` can often execute the command itself:

```bash
find . -name "*.tmp" -exec rm {} +
```

So `xargs` is not always necessary.

---

## 7. `-p` — Ask Before Running

```bash
echo "a b c" | xargs -p rm
```

`xargs` asks for confirmation before executing the command.

Useful when testing potentially destructive commands.

---

## 8. `-t` — Show the Command

```bash
echo "a b c" | xargs -t echo
```

This prints the command before executing it.

Useful for seeing exactly what `xargs` is doing.

---

## 9. `-r` — Don't Run With Empty Input

On systems supporting GNU `xargs`:

```bash
xargs -r
```

prevents the command from being executed when there is no input.

For example:

```bash
grep "foo" file.txt | xargs -r echo
```

Without `-r`, behavior with empty input can result in the command being run with no arguments.

---

## 10. Parallel Execution

GNU `xargs` can run multiple commands in parallel using `-P`:

```bash
cat urls.txt | xargs -n 1 -P 4 curl
```

This allows up to 4 `curl` processes to run simultaneously.

Be careful with parallel execution when commands modify the same files or resources.

---

## 11. `xargs` vs a Shell Loop

Instead of:

```bash
cat files.txt | xargs -n 1 echo
```

you could use a shell loop:

```bash
while read -r file; do
    echo "$file"
done < files.txt
```

`xargs` is often shorter and can efficiently batch arguments or run commands in parallel.

A shell loop gives you more control over complicated logic.

---

## 12. Important Mental Model

Think of:

```bash
producer | xargs command
```

as:

```text
producer
   ↓
input items
   ↓
xargs
   ↓
command arguments
   ↓
command
```

For example:

```bash
printf '%s\n' a b c | xargs rm
```

conceptually becomes:

```bash
rm a b c
```

The important thing is:

> **`xargs` turns input into command-line arguments.**

---

## 13. Useful Patterns

### One item at a time

```bash
command | xargs -n 1 other-command
```

### Custom argument position

```bash
command | xargs -I {} other-command {} argument
```

### Safe handling of filenames

```bash
find . -type f -print0 | xargs -0 command
```

### Batch arguments

```bash
command | xargs -n 10 other-command
```

### Parallel execution

```bash
command | xargs -n 1 -P 4 other-command
```

### Preview commands

```bash
command | xargs -t other-command
```

---

## 14. The Most Important Options

| Option  | Purpose                               |
| ------- | ------------------------------------- |
| `-n N`  | Use at most `N` arguments per command |
| `-I {}` | Replace `{}` with each input item     |
| `-0`    | Use null-separated input              |
| `-p`    | Ask before executing                  |
| `-t`    | Print commands before executing       |
| `-r`    | Don't run with empty input            |
| `-P N`  | Run up to `N` commands in parallel    |

---

## 15. Key Takeaway

Start by remembering these three patterns:

```bash
command | xargs other-command
```

```bash
command | xargs -n 1 other-command
```

```bash
find . -print0 | xargs -0 other-command
```

`xargs` is mainly about **taking input and turning it into arguments for another command**.
