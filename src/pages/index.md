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
- [Error Handling in Astro](/error-handling-in-astro)
- [Linux](/linux)
- [Selective Error Handling](/selective-error-handling)
- [SQLite Full-Text Search (FTS)](/sqlite-full-text-search)
- [systemd](/systemd)
- [Zod](/zod)

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
