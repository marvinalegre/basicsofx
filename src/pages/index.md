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

<div id="article-list">

- [astro](/astro)
- [at](/at)
- [sqlite full-text search (fts)](/sqlite-full-text-search)
- [systemd](/systemd)
- [zod](/zod)

</div>

<hr />

[source code](https://github.com/marvinalegre/basicsofx)

<script>
  const input = document.querySelector("#search");
  const results = document.querySelector("#results");
  const list = document.querySelector("#article-list")

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
      `).join("");

      if (articles.length > 0) {
        list.hidden = true;
      } else {
        list.hidden = false;
      }
    }, 150);
  });
</script>
