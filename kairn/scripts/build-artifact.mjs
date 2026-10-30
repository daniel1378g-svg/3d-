// Builds a self-contained preview of kairn/index.html for a claude.ai Artifact.
// The Artifact sandbox blocks images and video from other hosts, so the plate and
// the loop are inlined as data: URIs. Google Fonts are allowed there and stay linked.
//
//   node kairn/scripts/build-artifact.mjs <media-dir> <out.html>
//
// <media-dir> must hold plate.jpg and loop.mp4 (the files linked in index.html).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [mediaDir, out] = process.argv.slice(2);
if (!mediaDir || !out) {
  console.error("usage: node build-artifact.mjs <media-dir> <out.html>");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let html = readFileSync(join(root, "index.html"), "utf8");
const dataUri = (file, type) => `data:${type};base64,${readFileSync(join(mediaDir, file)).toString("base64")}`;

const BASE = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";
const media = {
  "18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg": dataUri("plate.jpg", "image/jpeg"),
  "823d013d-bf03-4967-b08f-63c3752df435.mp4": dataUri("loop.mp4", "video/mp4"),
};

// The Artifact host supplies the document skeleton and allows no media preloads.
html = html
  .replace(/<!doctype html>\s*/i, "")
  .replace(/<\/?html[^>]*>\s*/g, "")
  .replace(/<\/?head>\s*/g, "")
  .replace(/<\/?body>\s*/g, "")
  .replace(/<meta charset[^>]*>\s*/, "")
  .replace(/<meta name="viewport"[^>]*>\s*/, "")
  .replace(/<link rel="preconnect" href="https:\/\/d2ol7[^>]*>\s*/, "")
  .replace(/<link rel="preload" as="image"[^>]*>\s*/, "");

for (const [file, uri] of Object.entries(media)) html = html.split(BASE + file).join(uri);
if (html.includes(BASE)) throw new Error("an external media URL was left in the page");

writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1048576).toFixed(1)} MB)`);
