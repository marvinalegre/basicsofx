---
layout: ../layouts/MarkdownLayout.astro
title: SQLite FTS
---

# Basics of SQLite Full-Text Search (FTS)

## What Is Full-Text Search?

Normal SQL search:

```sql
SELECT *
FROM posts
WHERE content LIKE '%sqlite%';
```

Full-text search is designed specifically for searching large amounts of text.

SQLite provides this through **FTS5**.

---

## Create an FTS5 Table

```sql
CREATE VIRTUAL TABLE posts_fts
USING fts5(title, content);
```

Insert data:

```sql
INSERT INTO posts_fts(title, content)
VALUES
  ('SQLite Basics', 'SQLite is a small embedded database.'),
  ('FTS5', 'SQLite provides full-text search.'),
  ('JavaScript', 'JavaScript can work with SQLite.');
```

---

## Search

Use `MATCH`:

```sql
SELECT *
FROM posts_fts
WHERE posts_fts MATCH 'SQLite';
```

Multiple words:

```sql
SELECT *
FROM posts_fts
WHERE posts_fts MATCH 'SQLite database';
```

This searches for documents containing the terms.

---

## Search a Specific Column

```sql
SELECT *
FROM posts_fts
WHERE title MATCH 'SQLite';
```

Or:

```sql
SELECT *
FROM posts_fts
WHERE content MATCH 'database';
```

---

## Prefix Search

Use `*`:

```sql
SELECT *
FROM posts_fts
WHERE posts_fts MATCH 'java*';
```

Matches words such as:

```text
java
javascript
javafx
```

---

## Exact Phrases

Use quotes:

```sql
SELECT *
FROM posts_fts
WHERE posts_fts MATCH '"full text search"';
```

Searches for the phrase:

```text
full text search
```

---

## Boolean Search

### AND

```sql
SELECT *
FROM posts_fts
WHERE posts_fts MATCH 'sqlite AND database';
```

Both terms must match.

### OR

```sql
SELECT *
FROM posts_fts
WHERE posts_fts MATCH 'sqlite OR postgres';
```

Either term can match.

### NOT

```sql
SELECT *
FROM posts_fts
WHERE posts_fts MATCH 'sqlite NOT mysql';
```

Matches `sqlite` but excludes `mysql`.

---

## Ranking Results

FTS5 provides `bm25()` for relevance ranking.

```sql
SELECT
  title,
  content,
  bm25(posts_fts) AS score
FROM posts_fts
WHERE posts_fts MATCH 'sqlite'
ORDER BY score;
```

Lower `bm25()` scores are more relevant.

---

## Highlight Matches

Useful for search results:

```sql
SELECT
  highlight(posts_fts, 1, '<b>', '</b>') AS result
FROM posts_fts
WHERE posts_fts MATCH 'sqlite';
```

`1` means the second column (`content`).

---

## FTS With a Normal Table

Usually you have a real table:

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  title TEXT,
  content TEXT
);
```

And an FTS table:

```sql
CREATE VIRTUAL TABLE posts_fts
USING fts5(
  title,
  content,
  content='posts',
  content_rowid='id'
);
```

Now FTS indexes the content from `posts`.

---

## Keep the Index Updated

If you use an external-content FTS table, changes to the original table must be reflected in the FTS index.

For example:

```sql
INSERT INTO posts(title, content)
VALUES ('SQLite', 'SQLite is awesome.');
```

Then update FTS:

```sql
INSERT INTO posts_fts(rowid, title, content)
VALUES (last_insert_rowid(), 'SQLite', 'SQLite is awesome.');
```

For automatic synchronization, SQLite triggers can be used.

---

## FTS5 vs `LIKE`

### `LIKE`

```sql
WHERE content LIKE '%sqlite%'
```

Good for:

- Small tables
- Simple substring searches
- Exact text matching

### FTS5

```sql
WHERE posts_fts MATCH 'sqlite'
```

Good for:

- Large text collections
- Search boxes
- Relevance ranking
- Tokenized word searches
- Phrase searches
- Prefix searches

---

## Simple Search Example

```sql
CREATE VIRTUAL TABLE docs
USING fts5(title, body);

INSERT INTO docs(title, body)
VALUES
  ('SQLite', 'SQLite is an embedded database.'),
  ('PostgreSQL', 'PostgreSQL is a powerful database.'),
  ('JavaScript', 'JavaScript is commonly used for web development.');

SELECT
  title,
  body,
  bm25(docs) AS score
FROM docs
WHERE docs MATCH 'database'
ORDER BY score;
```

---

## Remember

```text
LIKE       → simple text matching
FTS5       → real full-text search
MATCH      → perform an FTS search
bm25()     → rank results
highlight() → highlight matches
*          → prefix search
"..."      → phrase search
AND/OR/NOT → combine terms
```

**FTS5 is SQLite's built-in search engine for text.**
