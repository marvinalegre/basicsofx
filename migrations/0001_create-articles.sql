-- Migration number: 0001 	 2026-08-21T07:43:59.180Z
CREATE TABLE articles (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

CREATE VIRTUAL TABLE articles_fts USING fts5 (
  title,
  content,
  content = 'articles',
  content_rowid = 'id'
);
