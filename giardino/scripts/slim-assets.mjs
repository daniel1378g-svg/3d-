// content/assets.json is the full photo inventory (sources, checksums, rights, usage). The app only needs the alt
// texts and a few fields, so it imports src/data/photos.json, written from it here (`npm run build` runs this first).
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const { assets } = JSON.parse(readFileSync(join(root, "content/assets.json"), "utf8"));
const slim = assets.map(({ id, alt, category, year, people }) => ({ id, alt, category, year, people: people ?? null }));
writeFileSync(join(root, "src/data/photos.json"), JSON.stringify({ assets: slim }) + "\n");
console.log(`src/data/photos.json: ${slim.length} photographs`);
