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

- [astro](/astro)
- [at](/at)
- [error handling in astro](/error-handling-in-astro)
- [linux](/linux)
- [Selective Error Handling](/selective-error-handling)
- [sqlite full-text search (fts)](/sqlite-full-text-search)
- [systemd](/systemd)
- [zod](/zod)

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

      results.innerHTML = articles.map(article => `
        <article>
          <a href="/${article.slug}">
            ${article.title}
          </a>
          <p>${article.snippet}</p>
        </article>
      `).join("") + "<hr />"
    }, 150);
  });
</script>
