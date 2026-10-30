// Builds a preview of spaceedu/index.html for a claude.ai Artifact.
// The Artifact sandbox blocks media from other hosts. The nine assets (~59 MB) are too big
// to inline, so the page points at relative media/ paths and the files are published
// alongside it (Artifact `files`: media/earth.mp4 -> <media-dir>/earth.mp4, and so on).
//
//   node spaceedu/scripts/build-artifact.mjs <out.html>
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [out] = process.argv.slice(2);
if (!out) {
  console.error("usage: node build-artifact.mjs <out.html>");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let html = readFileSync(join(root, "index.html"), "utf8");

const BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";
export const MEDIA = {
  "hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4": "earth.mp4",
  "hf_20260827_202422_b211cd74-013b-4dd3-bfd0-64491d8696fa.mp4": "venus.mp4",
  "hf_20260827_202422_51eae59a-2459-4c84-907c-cc5edfe5fea7.mp4": "mars.mp4",
  "hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png": "earth-still.png",
  "hf_20260827_202133_cf55d1d8-7b59-4a64-80da-d72052ae974e.png": "venus-still.png",
  "hf_20260827_202133_0ba6de7c-285d-43dc-b7ab-8c54c73707cb.png": "mars-still.png",
  "hf_20260827_202005_3346cc4d-ec3b-44ab-825c-b18e49f5021a.png": "earth-cut.png",
  "hf_20260827_202012_640b239a-d08a-4200-adb2-741bbe129ac8.png": "venus-cut.png",
  "hf_20260827_202018_3d559490-f613-4ed7-a3bb-3b7e9fc90fb8.png": "mars-cut.png",
};

// The Artifact host supplies the document skeleton.
html = html
  .replace(/<!doctype html>\s*/i, "")
  .replace(/<\/?html[^>]*>\s*/g, "")
  .replace(/<\/?head>\s*/g, "")
  .replace(/<\/?body>\s*/g, "")
  .replace(/<meta charset[^>]*>\s*/, "")
  .replace(/<meta name="viewport"[^>]*>\s*/, "");

// In script the URLs are built as BASE + name; point BASE itself at media/ and map each name.
html = html.split(`var BASE = '${BASE}';`).join("var BASE = 'media/';");
for (const [remote, local] of Object.entries(MEDIA)) {
  html = html.split(BASE + remote).join("media/" + local);
  html = html.split(`'${remote}'`).join(`'${local}'`);
}
if (html.includes(BASE) || Object.keys(MEDIA).some((k) => html.includes(k))) {
  throw new Error("an external media URL was left in the page");
}

writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`);
