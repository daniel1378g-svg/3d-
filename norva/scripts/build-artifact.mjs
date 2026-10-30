// Builds a self-contained preview of norva/index.html for a claude.ai Artifact.
// The Artifact sandbox blocks media and fonts from other hosts and has no folder for
// the self-hosted font, so the clips, poster and font are inlined as data: URIs.
//
//   node norva/scripts/build-artifact.mjs <media-dir> <out.html>
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

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let html = readFileSync(join(root, "index.html"), "utf8");
const dataUri = (path, type) => `data:${type};base64,${readFileSync(path).toString("base64")}`;

const BASE = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";
const media = {
  "65fdef53-5686-4659-8761-52d61bf1a4f7.mp4": dataUri(join(mediaDir, "1080.mp4"), "video/mp4"),
  "9a30e5e9-9f03-4755-9bc1-7bcf1510aab3.mp4": dataUri(join(mediaDir, "720.mp4"), "video/mp4"),
  "33150b94-09f7-47da-a7c9-3ae76c2dd7eb.jpg": dataUri(join(mediaDir, "poster.jpg"), "image/jpeg"),
};

// The Artifact host supplies the document skeleton and allows no media or font preloads.
html = html
  .replace(/<!doctype html>\s*/i, "")
  .replace(/<\/?html[^>]*>\s*/g, "")
  .replace(/<\/?head>\s*/g, "")
  .replace(/<\/?body>\s*/g, "")
  .replace(/<meta charset[^>]*>\s*/, "")
  .replace(/<meta name="viewport"[^>]*>\s*/, "")
  .replace(/<link rel="preload"[^>]*>\s*/g, "")
  .replace(/<link rel="preconnect"[^>]*>\s*/g, "")
  .replace('url("fonts/inter-tight-latin.woff2")',
    `url("${dataUri(join(root, "fonts", "inter-tight-latin.woff2"), "font/woff2")}")`);

// The script builds clip URLs from BASE + file name; inline those as whole strings.
html = html.replace(/const BASE = "[^"]*";/, "");
for (const [file, uri] of Object.entries(media)) {
  html = html.replace(`BASE + "${file}"`, JSON.stringify(uri));
  html = html.split(BASE + file).join(uri);
}
if (html.includes(BASE) || html.includes("fonts/inter-tight")) {
  throw new Error("an external asset URL was left in the page");
}

writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1048576).toFixed(1)} MB)`);
