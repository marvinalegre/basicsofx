SELECT
  articles.slug,
  articles.title,
  snippet (articles_fts, 1, '<b>', '</b>', '...', 20) AS snippet
FROM
  articles_fts
  JOIN articles ON articles.id = articles_fts.rowid
WHERE
  articles_fts MATCH 'zod'
ORDER BY
  rank;
