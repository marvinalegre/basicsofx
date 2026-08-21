import removeMd from "remove-markdown";
import { glob } from "glob";
import fs from "node:fs";

const sql = ["DELETE FROM articles;"];
const files = await glob("src/pages/*.md");
const slugs = files
  .map((f) => {
    return f.split("/")[2].split(".")[0];
  })
  .filter((name) => name !== "index");

for (const s of slugs) {
  let content = removeMd(fs.readFileSync(`src/pages/${s}.md`).toString());
  content = content.split("\n").slice(2).join("\n");
  const title = content.split("\n")[0];
  const esc = (str) => str.replaceAll("'", "''");

  sql.push(
    `INSERT INTO articles (title, slug, content)
     VALUES ('${esc(title)}', '${esc(s)}', '${esc(content)}');`,
  );
}

sql.push(
  `INSERT INTO articles_fts(articles_fts)
   VALUES('rebuild');`,
);

fs.writeFileSync("scripts/seed-d1.sql", sql.join("\n"));
