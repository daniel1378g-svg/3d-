// Builds a self-contained preview of freight/index.html for a claude.ai Artifact.
// The Artifact sandbox blocks media from other hosts, so the clips and poster are
// downloaded once and inlined as data: URIs.
//
//   node freight/scripts/build-artifact.mjs <media-dir> <out.html>
//
// <media-dir> must hold 1080.mp4, 720.mp4 and poster.jpg (the files linked in index.html).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [mediaDir, out] = process.argv.slice(2);
if (!mediaDir || !out) {
  console.error("usage: node build-artifact.mjs <media-dir> <out.html>");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
let html = readFileSync(join(here, "..", "index.html"), "utf8");
const dataUri = (file, type) => `data:${type};base64,${readFileSync(join(mediaDir, file)).toString("base64")}`;

const BASE = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";
const media = {
  "e02bb27f-80d8-445f-a03e-1b609dac4261.mp4": dataUri("1080.mp4", "video/mp4"),
  "e8eb434f-d097-4b1b-b9e6-c8b46fa43040.mp4": dataUri("720.mp4", "video/mp4"),
  "5e018553-cb8a-420a-819f-fcdfa08e5df0.jpg": dataUri("poster.jpg", "image/jpeg"),
};

// The Artifact host supplies the document skeleton and allows no media preconnects.
html = html
  .replace(/<!doctype html>\s*/i, "")
  .replace(/<\/?html[^>]*>\s*/g, "")
  .replace(/<\/?head>\s*/g, "")
  .replace(/<\/?body>\s*/g, "")
  .replace(/<meta charset[^>]*>\s*/, "")
  .replace(/<meta name="viewport"[^>]*>\s*/, "")
  .replace(/<link rel="preconnect" href="https:\/\/d2ol7[^>]*>\s*/, "")
  .replace(/<link rel="preload" as="image"[^>]*>\s*/, "")
  .replace(':root {', ':root {\n    color-scheme: dark;');

// The script builds clip URLs from BASE + file name; inline those as whole strings.
html = html.replace(/const BASE = "[^"]*";/, "");
for (const [file, uri] of Object.entries(media)) {
  html = html.replace(`BASE + "${file}"`, JSON.stringify(uri));
  html = html.split(BASE + file).join(uri);
}
if (html.includes(BASE)) throw new Error("an external media URL was left in the page");

writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1048576).toFixed(1)} MB)`);
