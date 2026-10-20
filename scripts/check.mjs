import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative, dirname } from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

const root = resolve("site");
const html = await readFile(resolve(root, "index.html"), "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(ids.length, new Set(ids).size, "Duplicate HTML IDs");
assert.match(html, /<html lang="el">/);
assert.match(html, /name="robots" content="noindex, nofollow"/);
assert.equal([...html.matchAll(/<h1\b/g)].length, 1, "One main heading");

for (const match of html.matchAll(/<(?:img|link|script|a|use)\b[^>]*>/g)) {
  const tag = match[0];
  if (tag.startsWith("<img")) {
    assert.match(tag, /\balt="[^"]+"/, "Images need descriptive alternative text");
    assert.match(tag, /\bwidth="\d+"/);
    assert.match(tag, /\bheight="\d+"/);
  }
  const refs = [...tag.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  const srcset = tag.match(/\bsrcset="([^"]+)"/);
  if (srcset) refs.push(...srcset[1].split(",").map((s) => s.trim().split(/\s/)[0]));
  for (const ref of refs) {
    if (/^(https?:|tel:)/.test(ref)) continue;
    if (ref.startsWith("#")) assert(ids.includes(ref.slice(1)), `Missing anchor ${ref}`);
    else {
      assert(!ref.startsWith("/"), `Root-relative path breaks project Pages: ${ref}`);
      assert((await stat(resolve(root, ref))).isFile(), `Missing file ${ref}`);
    }
  }
}
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else files.push(file);
  }
}
await walk(root);
for (const css of files.filter((file) => file.endsWith(".css"))) {
  const text = await readFile(css, "utf8");
  for (const match of text.matchAll(/url\(['"]?([^)'"]+)['"]?\)/g)) {
    assert((await stat(resolve(dirname(css), match[1]))).isFile(), `Missing CSS asset ${match[1]}`);
  }
}
console.log(`PASS: Greek document, headings, unique IDs, internal links, image alternatives, and ${files.length} static files.`);

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
