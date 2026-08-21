// import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

// export const GET: APIRoute = async ({ request, _locals }) => {
export const GET = async ({ request, _locals }) => {
  const url = new URL(request.url);
  const q = escapeFts5(url.searchParams.get("q")?.trim());

  if (!q) {
    return Response.json([]);
  }

  const db = env.DB;

  const { results } = await db
    .prepare(
      `
      SELECT
        articles.slug,
        articles.title,
        snippet (articles_fts, 1, '<b>', '</b>', '...', 20) AS snippet
      FROM
        articles_fts
      JOIN articles ON articles.id = articles_fts.rowid
      WHERE
        articles_fts MATCH ?
      ORDER BY
        rank;
      `,
    )
    .bind(q)
    .all();

  return Response.json(results);
};

function escapeFts5(input) {
  return `"${input.replaceAll('"', '""')}"`;
}
