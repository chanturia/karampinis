import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative, dirname } from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { licences, services, licenceFile, serviceFile } from "../content/pages.mjs";

const root = resolve("site");
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else files.push(file);
  }
}
await walk(root);
const documents = new Map();
for (const file of files.filter((file) => file.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${file}: duplicate HTML IDs`);
  assert.match(html, /<html lang="el">/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${file}: one main heading`);
  assert.match(html, /aria-current="page"/);
  assert(!/\{module|Lorem ipsum|undefined|NaN/.test(html), `${file}: placeholder or broken template`);
  documents.set(file, { html, ids });
}
const expected = ["index.html", "school.html", "diplomata.html", "services.html", "test-driver.html", "contact.html",
  ...licences.map((item) => licenceFile(item.key)), ...services.map((item) => serviceFile(item.key))];
assert.equal(documents.size, 24, "Six main pages and eighteen submenu pages");
for (const name of expected) assert(documents.has(resolve(root,name)), `Missing menu page ${name}`);

for (const [file, {html,ids}] of documents) {
  const mainNav = html.match(/<nav id="main-nav"[\s\S]*?<\/nav>/)[0];
  for (const name of expected) assert(mainNav.includes(`href="${name}"`), `${file}: menu missing ${name}`);
  for (const match of html.matchAll(/<(?:img|link|script|a|use)\b[^>]*>/g)) {
    const tag = match[0];
    if (tag.startsWith("<img")) {
      assert.match(tag, /\balt="[^"]+"/, `${file}: image needs descriptive alternative text`);
      assert.match(tag, /\bwidth="\d+"/);
      assert.match(tag, /\bheight="\d+"/);
    }
    const refs = [...tag.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
    const srcset = tag.match(/\bsrcset="([^"]+)"/);
    if (srcset) refs.push(...srcset[1].split(",").map((s) => s.trim().split(/\s/)[0]));
    for (const ref of refs) {
      if (/^(https?:|tel:|mailto:)/.test(ref)) continue;
      assert(!ref.startsWith("/"), `${file}: root-relative path breaks project Pages: ${ref}`);
      const [path, anchor] = ref.split("#");
      const target = path ? resolve(dirname(file), decodeURIComponent(path.split("?")[0])) : file;
      assert(target.startsWith(root), `${file}: path outside site`);
      assert((await stat(target)).isFile(), `${file}: missing file ${ref}`);
      if (anchor) {
        const targetIds = target === file ? ids : documents.get(target)?.ids;
        assert(targetIds?.includes(anchor), `${file}: missing anchor ${ref}`);
      }
    }
  }
}
for (const css of files.filter((file) => file.endsWith(".css"))) {
  const text = await readFile(css, "utf8");
  for (const match of text.matchAll(/url\(['"]?([^)'\"]+)['"]?\)/g)) {
    if (match[1].startsWith("#")) continue;
    assert((await stat(resolve(dirname(css), match[1]))).isFile(), `Missing CSS asset ${match[1]}`);
  }
}
console.log(`PASS: ${documents.size} Greek pages, complete menus, headings, unique IDs, links/anchors, image alternatives, and ${files.length} static files.`);

const base = process.argv[2];
if (base) {
  const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
  for (const file of files) {
    const name = relative(root, file).replaceAll("\\", "/");
    const url = new URL(name, base.endsWith("/") ? base : base + "/");
    url.searchParams.set("verify", Date.now().toString());
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, `${name}: HTTP ${response.status}`);
    // Pages checks out Git's bytes; Windows working files may use CRLF.
    const committed = execFileSync("git", ["show", `HEAD:site/${name}`]);
    assert.equal(hash(Buffer.from(await response.arrayBuffer())), hash(committed), `${name}: deployed bytes differ`);
  }
  console.log(`PASS: ${files.length} deployed files return HTTP 200 and match committed source SHA-256 hashes.`);
}
