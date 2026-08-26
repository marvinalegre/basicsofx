---
layout: ../layouts/MarkdownLayout.astro
title: rg
---

# Basics of `rg`

`rg` is **ripgrep**, a fast command-line tool for searching text inside files and directories.

## Basic search

```bash
rg "pattern"
```

Search recursively from the current directory.

```bash
rg "hello"
```

Search for `hello` in files below the current directory.

## Search a specific directory

```bash
rg "pattern" src/
```

## Search a specific file

```bash
rg "pattern" file.txt
```

## Case-insensitive search

```bash
rg -i "pattern"
```

```bash
rg -i "hello"
```

Matches:

```text
hello
Hello
HELLO
```

## Match whole words

```bash
rg -w "word"
```

Matches `word` but not:

```text
words
password
wording
```

## Show line numbers

```bash
rg -n "pattern"
```

`-n` is usually enabled by default when output goes to the terminal.

## Show only filenames

```bash
rg -l "pattern"
```

Useful for finding which files contain a match.

## Show files without matches

```bash
rg -L "pattern"
```

## Count matches

```bash
rg -c "pattern"
```

Example:

```bash
rg -c "TODO" src/
```

## Search specific file types

```bash
rg "pattern" -t js
```

```bash
rg "pattern" -t ts
```

```bash
rg "pattern" -t py
```

List supported types:

```bash
rg --type-list
```

## Search by file extension

```bash
rg "pattern" -g "*.ts"
```

```bash
rg "pattern" -g "*.css"
```

## Exclude files

```bash
rg "pattern" -g '!*.min.js'
```

Exclude a directory:

```bash
rg "pattern" -g '!node_modules'
```

## Search hidden files

By default, `rg` skips hidden files.

```bash
rg --hidden "pattern"
```

## Search hidden files and ignored files

```bash
rg --no-ignore "pattern"
```

Combine them:

```bash
rg --hidden --no-ignore "pattern"
```

## Search only the current directory

```bash
rg --max-depth 1 "pattern"
```

## Search with regular expressions

`rg` supports regular expressions.

```bash
rg "foo|bar"
```

```bash
rg "user_[0-9]+"
```

Literal search:

```bash
rg -F "foo.bar"
```

`-F` disables regex interpretation.

## Search for exact text

```bash
rg -F "foo.bar"
```

Useful when the search contains regex characters such as:

```text
.
*
+
?
[
]
(
)
```

## Invert matches

Find lines that **don't** match:

```bash
rg -v "pattern"
```

## Context around matches

Show lines before a match:

```bash
rg -B 2 "pattern"
```

Show lines after a match:

```bash
rg -A 2 "pattern"
```

Show both:

```bash
rg -C 2 "pattern"
```

## Search filenames

```bash
rg --files
```

List files known to `rg`.

Filter them:

```bash
rg --files | rg '\.ts$'
```

## Search Git-tracked files

`rg` automatically respects `.gitignore`.

```bash
rg "pattern"
```

To ignore Git's ignore rules:

```bash
rg --no-ignore "pattern"
```

## Search from the parent directory

```bash
rg "pattern" ..
```

## Search multiple directories

```bash
rg "pattern" src/ tests/
```

## Replace text

`rg` itself does **not** modify files.

A common workflow is:

```bash
rg "old" .
```

Then use another tool for replacement, such as `sed` or `perl`.

For example:

```bash
rg -l "old" . | xargs sed -i 's/old/new/g'
```

Be careful with bulk replacements.

## Useful options

| Option          | Meaning                     |
| --------------- | --------------------------- |
| `-i`            | Case-insensitive            |
| `-w`            | Whole-word match            |
| `-F`            | Fixed string, no regex      |
| `-v`            | Invert match                |
| `-l`            | Show matching filenames     |
| `-L`            | Show non-matching filenames |
| `-c`            | Count matches per file      |
| `-n`            | Show line numbers           |
| `-A N`          | Show N lines after          |
| `-B N`          | Show N lines before         |
| `-C N`          | Show N lines of context     |
| `-g`            | Glob filter                 |
| `-t`            | File type filter            |
| `--hidden`      | Include hidden files        |
| `--no-ignore`   | Don't respect ignore files  |
| `--files`       | List searchable files       |
| `--max-depth N` | Limit directory depth       |

## Common recipes

Find TODOs:

```bash
rg "TODO"
```

Find a function:

```bash
rg "function foo"
```

Find imports:

```bash
rg "^import "
```

Search TypeScript files:

```bash
rg "useState" -t ts -t tsx
```

Find files containing a string:

```bash
rg -l "DATABASE_URL"
```

Search case-insensitively:

```bash
rg -i "error"
```

Search an exact string:

```bash
rg -F "foo.bar()"
```

Search including hidden files:

```bash
rg --hidden "pattern"
```

List all files:

```bash
rg --files
```

## `rg` vs `grep`

Traditional:

```bash
grep -R "pattern" .
```

With `rg`:

```bash
rg "pattern"
```

`rg` is generally faster and has convenient defaults for modern projects, including recursive searching and respecting `.gitignore`.

## The essentials

```bash
rg "pattern"              # search
rg -i "pattern"           # case-insensitive
rg -F "text"              # literal text
rg -w "word"              # whole word
rg -l "pattern"           # filenames only
rg -c "pattern"           # count
rg -t ts "pattern"        # file type
rg -g "*.ts" "pattern"    # glob
rg --hidden "pattern"     # include hidden files
rg --no-ignore "pattern"  # include ignored files
rg --files                # list files
rg -C 2 "pattern"         # surrounding context
```
