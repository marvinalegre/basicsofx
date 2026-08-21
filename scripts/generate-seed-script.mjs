import removeMd from "remove-markdown";
import fs from "node:fs";

const astro = fs.readFileSync("../src/pages/astro.md");
console.log(removeMd(astro.toString()));
