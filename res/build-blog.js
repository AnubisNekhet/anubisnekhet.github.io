import fs from "fs";

const BLOG_DIR = "../blog";
const HOME_FILE = "../blog/home/index.html";

const folders = fs
  .readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== "home")
  .map((entry) => entry.name)
  .sort();

const generated = folders
  .map((name) => `    <li><a href="../${name}/">${name}</a></li>`)
  .join("\n");

let html = fs.readFileSync(HOME_FILE, "utf8");

html = html.replace(
  /<!-- BLOG_LIST_START -->[\s\S]*<!-- BLOG_LIST_END -->/,
  `<!-- BLOG_LIST_START -->
${generated}
<!-- BLOG_LIST_END -->`,
);

fs.writeFileSync(HOME_FILE, html);

console.log("Updated blog list.");
