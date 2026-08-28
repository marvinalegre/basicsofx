---
layout: ../layouts/MarkdownLayout.astro
title: Basics of x
---

# Basics of x

<input
  id="search"
  type="search"
  placeholder="Search..."
/>

<div id="results"></div>

<hr />

- [Astro](/astro)
- [at](/at)
- [Browser APIs](/browser-apis)
- [Building a Web Application Template](/building-a-web-app-template)
- [Chart.js](/chartjs)
- [Cloudflare KV](/cloudflare-kv)
- [curl](/curl)
- [Error Handling in Astro](/error-handling-in-astro)
- [git switch](/git-switch)
- [jq](/jq)
- [Linux](/linux)
- [Markdown](/markdown)
- [Node.js](/nodejs)
- [pass](/pass)
- [Postman](/postman)
- [rg](/rg)
- [sed](/sed)
- [Selective Error Handling](/selective-error-handling)
- [Service Workers](/service-workers)
- [SQLite Full-Text Search (FTS)](/sqlite-full-text-search)
- [systemd](/systemd)
- [Temporal Javascript](/temporal-js)
- [tsconfig.json](/tsconfig)
- [VitePress](/vitepress)
- [Vitest](/vitest)
- [Zod](/zod)
- [xargs](/xargs)

<hr />

[source code](https://github.com/marvinalegre/basicsofx)

<script>
  const input = document.querySelector("#search");
  const results = document.querySelector("#results");

  let timer;

  input.addEventListener("input", () => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const q = input.value.trim();

      if (!q) {
        results.innerHTML = "";
        return;
      }

      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}`
      );

      const articles = await res.json();


      if (articles.length == 0) {
        results.innerHTML = '<p>No result found</p>'
      } else {
      results.innerHTML = articles.map(article => `
        <article>
          <a href="/${article.slug}">
            ${article.title}
          </a>
          <p>${article.snippet}</p>
        </article>
      `).join("")
      }
    }, 300);
  });
</script>
