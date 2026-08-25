---
layout: ../layouts/MarkdownLayout.astro
title: jq
---

# Basics of `jq`

## What is jq?

`jq` is a command-line tool for processing **JSON**.

It lets you:

- Read JSON
- Extract values
- Filter data
- Transform JSON
- Combine fields
- Convert JSON into other formats

Think of it as **`sed`/`awk` for JSON**.

---

## Installation

### Debian / Ubuntu

```bash
sudo apt install jq
```

Check:

```bash
jq --version
```

---

## Basic Usage

Given:

```json
{
  "name": "Alice",
  "age": 25
}
```

Put it in `user.json`.

Pretty-print it:

```bash
jq . user.json
```

Or:

```bash
cat user.json | jq .
```

`jq .` means:

> Take the input JSON and output it unchanged, formatted nicely.

---

## Extracting Values

Use `.field`:

```bash
jq '.name' user.json
```

Output:

```text
"Alice"
```

```bash
jq '.age' user.json
```

Output:

```text
25
```

Multiple levels:

```json
{
  "user": {
    "name": "Alice"
  }
}
```

```bash
jq '.user.name' data.json
```

---

## Raw Strings

By default, jq outputs JSON strings with quotes:

```bash
jq '.name' user.json
```

```text
"Alice"
```

Use `-r` for raw output:

```bash
jq -r '.name' user.json
```

```text
Alice
```

This is especially useful in shell scripts.

---

## Arrays

Given:

```json
{
  "users": [
    {
      "name": "Alice",
      "age": 25
    },
    {
      "name": "Bob",
      "age": 30
    }
  ]
}
```

Get the array:

```bash
jq '.users' users.json
```

Get the first item:

```bash
jq '.users[0]' users.json
```

Get the first user's name:

```bash
jq '.users[0].name' users.json
```

Get all names:

```bash
jq '.users[].name' users.json
```

Output:

```text
"Alice"
"Bob"
```

---

## Array Indexing

```jq
.[0]
```

First element.

```jq
.[1]
```

Second element.

```jq
.[-1]
```

Last element.

Slices:

```jq
.[0:3]
```

First three elements.

---

## Iterating with `[]`

Given:

```json
["apple", "banana", "orange"]
```

```bash
jq '.[]' fruits.json
```

Produces each element separately:

```text
"apple"
"banana"
"orange"
```

This is one of the most important jq operations.

---

## Filtering

Given:

```json
[
  { "name": "Alice", "age": 25 },
  { "name": "Bob", "age": 17 },
  { "name": "Carol", "age": 30 }
]
```

Find users over 18:

```bash
jq '.[] | select(.age >= 18)' users.json
```

Get only their names:

```bash
jq '.[] | select(.age >= 18) | .name' users.json
```

Output:

```text
"Alice"
"Carol"
```

---

## The Pipe `|`

The pipe passes the result of one operation into another.

```jq
.users[] | .name
```

Read this as:

> Get `.users`, iterate over it, then get `.name` from each user.

Another example:

```jq
.users[] | select(.age >= 18) | .name
```

Read it as:

> Get users → iterate → keep adults → get their names.

---

## Creating Objects

You can construct new JSON objects:

```bash
jq '.[] | {name: .name, age: .age}' users.json
```

You can shorten repeated field names:

```jq
.[] | {name, age}
```

---

## Renaming Fields

```jq
.[] | {
  username: .name,
  years_old: .age
}
```

Result:

```json
{
  "username": "Alice",
  "years_old": 25
}
```

---

## Arrays of Values

Get just the names as an array:

```bash
jq '[.[] | .name]' users.json
```

Result:

```json
["Alice", "Bob", "Carol"]
```

The `[...]` collects the generated results into an array.

---

## Length

```jq
length
```

For an array:

```bash
jq 'length' users.json
```

For a string:

```jq
.name | length
```

---

## Sorting

Sort an array:

```jq
sort
```

Sort users by age:

```jq
sort_by(.age)
```

Descending:

```jq
sort_by(.age) | reverse
```

---

## Selecting Fields

Given:

```json
{
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com"
}
```

Select multiple fields:

```jq
{name, email}
```

Result:

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

## Default Values

Use `//`:

```jq
.username // "anonymous"
```

If `.username` is `null` or missing, `"anonymous"` is returned.

Example:

```bash
jq '.username // "anonymous"' user.json
```

---

## Conditionals

```jq
if .age >= 18 then "adult" else "minor" end
```

Example:

```bash
jq '.[] | {
  name,
  status: (if .age >= 18 then "adult" else "minor" end)
}' users.json
```

---

## String Interpolation

Use `\(...)`:

```jq
"Hello, \(.name)!"
```

Example:

```bash
jq '.[] | "User: \(.name), Age: \(.age)"' users.json
```

---

## Working with Command Output

A common use is processing JSON returned by another command:

```bash
some-command | jq '.name'
```

For example:

```bash
curl -s https://example.com/api/users | jq '.[].name'
```

`jq` is therefore very useful when working with APIs.

---

## Useful Options

### Pretty print

```bash
jq .
```

### Raw strings

```bash
jq -r '.name'
```

### Compact JSON

```bash
jq -c .
```

### Read from a file

```bash
jq '.users' users.json
```

### Read from stdin

```bash
cat users.json | jq '.users'
```

---

## Common Patterns

### Get all names

```jq
.[].name
```

### Filter and get a field

```jq
.[] | select(.active == true) | .name
```

### Count items

```jq
length
```

### Count filtered items

```jq
[.[] | select(.active == true)] | length
```

### Extract nested data

```jq
.users[].profile.email
```

### Create a smaller object

```jq
.[] | {id, name}
```

### Convert objects into strings

```jq
.[] | "\(.id): \(.name)"
```

---

## The jq Mental Model

The most important thing to understand is:

```text
JSON input
   ↓
jq filter
   ↓
JSON output
```

For example:

```jq
.users[]
```

means:

```text
input
  ↓
.users
  ↓
each element
```

And:

```jq
.users[] | select(.age >= 18) | .name
```

means:

```text
users
  ↓
each user
  ↓
keep adults
  ↓
get name
```

---

## jq Cheat Sheet

| Task           | Filter               |
| -------------- | -------------------- |
| Pretty print   | `.`                  |
| Field          | `.name`              |
| Nested field   | `.user.name`         |
| Array element  | `.[0]`               |
| Iterate array  | `.[]`                |
| Filter         | `select(...)`        |
| Pipe           | `\|`                 |
| Length         | `length`             |
| Sort           | `sort`               |
| Sort by field  | `sort_by(.age)`      |
| Default value  | `.name // "Unknown"` |
| Create object  | `{name, age}`        |
| Create array   | `[.[]]`              |
| Raw output     | `jq -r`              |
| Compact output | `jq -c`              |

## The Core 5 to Learn First

If you're just starting, focus on these:

```jq
.field
```

```jq
[]
```

```jq
|
```

```jq
select(...)
```

```jq
{field1, field2}
```

Once these make sense, most everyday `jq` commands become much easier to read.
