// Writes a depth map for every photo in content/photos.json with Depth Anything V2 Small (Apache-2.0),
// run locally through transformers.js. White = near. The maps drive the living-photo parallax and are
// committed, so the build doesn't need the model.
//   node scripts/depth-maps.mjs            only photos without a map
//   node scripts/depth-maps.mjs --force    all of them
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pipeline, RawImage } from "@huggingface/transformers";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, "media/depth");
mkdirSync(out, { recursive: true });
const { photos } = JSON.parse(readFileSync(join(root, "content/photos.json"), "utf8"));
const force = process.argv.includes("--force");

const estimate = await pipeline("depth-estimation", "onnx-community/depth-anything-v2-small", { dtype: "fp32" });
for (const p of photos) {
  const target = join(out, `${p.name}.png`);
  if (!force && existsSync(target)) continue;
  const src = join(root, "media", p.source === "own" ? "original" : "supplied", p.file);
  const image = await RawImage.read(src);
  const { depth } = await estimate(image);
  await depth.save(target);
  console.log(`${p.name}: ${depth.width}×${depth.height}`);
}
