---
layout: ../layouts/MarkdownLayout.astro
title: sed
---

# Basics of `sed`

`sed` = **stream editor**.

It reads text line-by-line, applies commands, and writes the result.

## Basic syntax

```sh
sed 'command' file
```

Example:

```sh
sed 's/foo/bar/' file.txt
```

By default, `sed` does not modify the original file.

## Print lines

```sh
sed -n '1p' file.txt
```

Print line 1.

```sh
sed -n '1,5p' file.txt
```

Print lines 1–5.

```sh
sed -n '10,$p' file.txt
```

Print line 10 through the end.

`-n` disables automatic printing.

Without `-n`, `p` can cause duplicate output:

```sh
sed '1p' file.txt
```

## Delete lines

```sh
sed '1d' file.txt
```

Delete line 1.

```sh
sed '1,5d' file.txt
```

Delete lines 1–5.

```sh
sed '/foo/d' file.txt
```

Delete lines containing `foo`.

```sh
sed '/^#/d' file.txt
```

Delete lines beginning with #.

## Substitute text

The most common sed command is `s`:

```sh
sed 's/old/new/' file.txt
```

Replace the first `old` on each line.

### Replace all occurrences

```sh
sed 's/old/new/g' file.txt
```

`g` = global replacement on each line.

### Case-insensitive replacement

```sh
sed 's/foo/bar/gi' file.txt
```

`i` = case-insensitive.

## Different delimiters

`/` is conventional, but you can use other characters:

```sh
sed 's|/old/path|/new/path|g' file.txt
```

This is useful when replacing paths.

```sh
sed 's#foo#bar#g' file.txt
```

## Regular expressions

```sh
sed 's/[0-9]/X/g' file.txt
```

Replace every digit.

```sh
sed 's/^/# /' file.txt
```

Add `# ` to the beginning of every line.

```sh
sed 's/$/;/' file.txt
```

Add `;` to the end of every line.

```sh
sed 's/[[:space:]]\+$//' file.txt
```

Remove trailing whitespace.

## Addressing specific lines

Commands can be restricted to particular lines.

### Line number

```sh
sed '5s/foo/bar/' file.txt
```

Only replace on line 5.

### Range

```sh
sed '5,10s/foo/bar/g' file.txt
```

Replace on lines 5–10.

### Pattern

```sh
sed '/foo/s/bar/baz/' file.txt
```

Only modify lines containing `foo`.

### Range between patterns

```sh
sed '/BEGIN/,/END/d' file.txt
```

Delete from `BEGIN` through `END`.

Multiple commands

Use `-e`:

```sh
sed -e 's/foo/bar/g' -e '/^#/d' file.txt
```

Or separate commands with `;`:

```sh
sed 's/foo/bar/g; /^#/d' file.txt
```

For more complex scripts:

```sh
sed -f script.sed file.txt
```

## In-place editing

```sh
sed -i 's/foo/bar/g' file.txt
```

This modifies file.txt.

## Create a backup

```sh
sed -i.bak 's/foo/bar/g' file.txt
```

Creates:

```
file.txt
file.txt.bak
```

## macOS vs Linux

GNU/Linux:

```sh
sed -i 's/foo/bar/g' file.txt
```

macOS:

```sh
sed -i '' 's/foo/bar/g' file.txt
```

## Multiple files

```sh
sed -i 's/foo/bar/g' file1.txt file2.txt file3.txt
```

Using a glob:

```sh
sed -i 's/foo/bar/g' *.txt
```

Using `find`:

```sh
find . -name '*.txt' -exec sed -i 's/foo/bar/g' {} +
```

## Print without modifying

A useful pattern:

```sh
sed -n 's/foo/bar/p' file.txt
```

Replace `foo` with `bar` and print only lines where a replacement occurred.

## Extract lines

```sh
sed -n '/BEGIN/,/END/p' file.txt
```

Print everything from `BEGIN` through `END`.

```sh
sed -n '/error/p' log.txt
```

Print lines containing `error`.

## Remove blank lines

```sh
sed '/^$/d' file.txt
```

Remove completely empty lines.

More robust:

```sh
sed '/^[[:space:]]*$/d' file.txt
```

Remove empty or whitespace-only lines.

## Comment lines

Add comments:

```sh
sed 's/^/# /' file.txt
```

Remove a leading comment:

```sh
sed 's/^# //' file.txt
```

## Capture groups

Use `\(...\)` with basic regular expressions:

```sh
sed 's/\([0-9]\+\)-\([0-9]\+\)/\2-\1/' file.txt
```

Modern GNU `sed` can use extended regex with `-E`:

```sh
sed -E 's/([0-9]+)-([0-9]+)/\2-\1/' file.txt
```

`&` means "the entire matched text":

```sh
sed 's/foo/[&]/' file.txt
```

```
foo bar
```

becomes:

```
[foo] bar
```

## `sed` with pipes

`sed` works especially well in pipelines:

```sh
cat file.txt | sed 's/foo/bar/g'
```

But `cat` is usually unnecessary:

```sh
sed 's/foo/bar/g' file.txt
```

Example:

```sh
ps aux | sed -n '1,5p'
```

## Common commands

| Command   | Meaning                      |
| --------- | ---------------------------- |
| `s/a/b/`  | substitute first a with b    |
| `s/a/b/g` | substitute all               |
| `d`       | delete                       |
| `p`       | print                        |
| `q`       | quit                         |
| `-n`      | disable automatic printing   |
| `-i`      | edit file in place           |
| `-E`      | extended regular expressions |
| `-e`      | specify a command            |
| `-f`      | read commands from a file    |

## Most useful patterns

```sh
# Replace text

sed 's/foo/bar/g' file

# Replace in-place

sed -i 's/foo/bar/g' file

# Print specific lines

sed -n '10,20p' file

# Delete specific lines

sed '10,20d' file

# Delete matching lines

sed '/pattern/d' file

# Print matching lines

sed -n '/pattern/p' file

# Add text to beginning

sed 's/^/prefix/' file

# Add text to end

sed 's/$/suffix/' file

# Remove blank lines

sed '/^$/d' file

# Extract a section

sed -n '/BEGIN/,/END/p' file

# Delete a section

sed '/BEGIN/,/END/d' file
```

## Mental model

Think:

```
input
↓
sed reads one line
↓
check address/pattern
↓
run command
↓
output modified line
↓
next line
```

The core things to learn are:

```
sed
├── addresses → which lines?
├── s → replace text
├── d → delete
├── p → print
├── regex → what to match?
└── -i → modify the file
```

If you know addresses + regex + `s` + `d` + `p`, you already know most everyday `sed`.
