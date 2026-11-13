// Fetches Overlay's own photographs and the customer reviews shown on overlay.pt, and prepares them for the site.
//
//   node tools/overlay-content.mjs            photographs and reviews
//   node tools/overlay-content.mjs --photos   photographs only        --reviews   reviews only
//
// Output (NOT in the repository, see .gitignore): content/overlay/img/*.webp and content/overlay/content.json.
// The photographs belong to Overlay and the reviews to the customers who wrote them, so they stay out of this
// public repository; the build reads them from content/overlay/ and stops with a message when they are missing.
//
// Photographs: the pictures below were picked by hand from the service galleries on overlay.pt. Left out on purpose:
// stock pictures, pictures with a readable number plate and pictures where a member of staff can be recognised.
// Reviews: the Google reviews the widget on overlay.pt's home page shows (it only lists 4 and 5 stars with text).
// They are copied word for word, in their original language; those of at least MIN_CHARS characters, newest first.
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const cache = join(root, '.cache/overlay');
const out = join(root, 'content/overlay');
const UPLOADS = 'https://overlay.pt/wp-content/uploads/';
const args = process.argv.slice(2);
const only = args.includes('--photos') ? 'photos' : args.includes('--reviews') ? 'reviews' : null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(cache, { recursive: true });
mkdirSync(join(out, 'img'), { recursive: true });

// The opening story: five 16:9 stills (2048 × 1158). crop = the window cut from the source, as fractions of its
// size: x and y of the top left corner and w, the width (the height follows from 16:9).
const STORY = [
  { name: 'ov_hero', src: '2025/09/IMG_9087.webp', crop: { x: 0, y: 0.267, w: 1 } },
  { name: 'ov_detail', src: '2025/09/IMG_9097.webp', crop: { x: 0, y: 0.208, w: 1 } },
  { name: 'ov_wrap', src: '2025/09/IMG_9023.webp', crop: { x: 0, y: 0.233, w: 1 } },
  { name: 'ov_ppf', src: '2024/11/7ppf.webp', crop: { x: 0.14, y: 0.082, w: 0.86 } },
  { name: 'ov_moto', src: '2025/09/IMG_9088.webp', crop: { x: 0, y: 0.086, w: 1 } },
];
// The gallery, by service (the ids match the services in src/brands/overlay.js).
const GALLERY = {
  carwrap: ['2025/09/IMG_9025.webp', '2025/09/IMG_9022.webp', '2024/11/A7R2469-2.webp', '2024/09/Ferrari-Overlay.webp', '2025/09/IMG_9033-scaled.webp', '2025/09/IMG_9039-scaled.webp', '2025/07/1000x600_IMG_8049.webp', '2025/07/1000x600_IMG_8027.webp', '2024/11/472538935_18476713051034956_6049199465519581793_n.webp', '2025/09/IMG_9048-scaled.webp'],
  ppf: ['2025/07/1000x600_IMG_8043.webp', '2025/07/1000x600_IMG_8034.webp', '2025/07/1000x600_IMG_8047.webp', '2025/07/1000x600_IMG_8038.webp', '2024/11/PAINT-PROTECTION-FILM-1024x678-1.webp', '2024/11/8ppf-1024x683-1.webp'],
  tint: ['2024/11/2-2.webp', '2024/11/474753794_9312347768785991_7244898284609641927_n-2.webp', '2024/11/Bimmer-Estate-Atack-1-of-7-1.webp', '2024/11/1peliculas-880x1348-1.webp'],
  detail: ['2025/07/1000x600_IMG_8048.webp', '2025/09/IMG_9095.webp', '2025/09/IMG_9099.webp', '2025/07/1000x600_IMG_8046.webp', '2025/09/IMG_9115-scaled.webp', '2025/09/IMG_9128-scaled.webp'],
  motowrap: ['2024/11/A7R5151.webp', '2024/11/472445726_18477261703034956_1695630442659471382_n.webp', '2024/11/IMG_0497-copy.webp', '2025/09/IMG_9092.webp'],
  boatwrap: ['2024/11/IMG_9711.webp', '2024/11/PPM_6712-1024x769-1.jpg', '2024/11/PPM_6697-880x1399-1.jpg', '2024/11/boat-wrap-1.webp'],
  fleet: ['2025/07/1000x600_IMG_8030.webp', '2025/07/1000x600_IMG_8033.webp', '2025/07/1000x600_IMG_8037.webp', '2025/09/IMG_9138.webp', '2025/09/IMG_9143.webp'],
};
const MIN_CHARS = 80, MAX_REVIEWS = 12;

/** The source picture, from the local cache or from overlay.pt (one at a time, with pauses: the site limits requests). */
async function source(path) {
  const file = join(cache, basename(path));
  if (existsSync(file)) return file;
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(UPLOADS + path, { headers: { accept: 'image/webp,image/*,*/*' } });
    if (res.ok) { writeFileSync(file, Buffer.from(await res.arrayBuffer())); await sleep(3500); return file; }
    if (res.status !== 429) throw new Error(`${res.status} for ${path}`);
    console.log(`overlay.pt asks to slow down, waiting ${60 * (attempt + 1)} s`);
    await sleep(60000 * (attempt + 1));
  }
  throw new Error(`could not fetch ${path}`);
}

async function photos() {
  const W = 2048, H = 1158;
  for (const shot of STORY) {
    const file = await source(shot.src);
    const meta = await sharp(file).rotate().metadata();
    const width = Math.round(meta.width * shot.crop.w), height = Math.min(meta.height, Math.round(width * H / W));
    const left = Math.round(meta.width * shot.crop.x), top = Math.min(meta.height - height, Math.round(meta.height * shot.crop.y));
    const cut = await sharp(file).rotate().extract({ left, top, width, height }).resize(W, H, { fit: 'fill', kernel: 'lanczos3' }).toBuffer();
    await sharp(cut).webp({ quality: 80 }).toFile(join(out, 'img', `${shot.name}.webp`));
    await sharp(cut).resize(1152, 651).webp({ quality: 76 }).toFile(join(out, 'img', `${shot.name}_m.webp`));
    // A plain depth map for the parallax: the floor in front is near, the back wall far, the subject in between.
    const dw = 256, dh = 145, depth = Buffer.alloc(dw * dh);
    for (let y = 0; y < dh; y++) for (let x = 0; x < dw; x++) {
      const v = y / (dh - 1), u = x / (dw - 1);
      const bump = Math.exp(-(((u - 0.5) / 0.34) ** 2 + ((v - 0.58) / 0.3) ** 2));
      depth[y * dw + x] = Math.round(255 * Math.min(1, 0.22 + 0.42 * v * v + 0.22 * bump));
    }
    await sharp(depth, { raw: { width: dw, height: dh, channels: 1 } }).blur(3).webp({ quality: 70 }).toFile(join(out, 'img', `${shot.name}_d.webp`));
    console.log('story', shot.name);
  }
  const gallery = [];
  for (const [group, list] of Object.entries(GALLERY)) {
    let n = 0;
    for (const path of list) {
      const file = await source(path);
      const name = `g-${group}-${String(++n).padStart(2, '0')}`;
      const full = await sharp(file).rotate().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(out, 'img', `${name}.webp`));
      const thumb = await sharp(file).rotate().resize(560, 900, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 70 }).toFile(join(out, 'img', `${name}_t.webp`));
      gallery.push({ group, file: name, w: full.width, h: full.height, tw: thumb.width, th: thumb.height });
    }
    console.log('gallery', group, n);
  }
  return gallery;
}

async function reviews() {
  const require = createRequire(import.meta.url);
  let chromium;
  try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'pt-PT' });
  let raw = null;
  page.on('response', async (r) => { if (/review-api\.fouita\.com\/data\/reviews\/fetch/.test(r.url())) { try { raw = Object.values(await r.json())[0]; } catch { /* not the answer we want */ } } });
  await page.goto('https://overlay.pt/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height && !raw; y += 600) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(300); }
  for (let n = 0; n < 20 && !raw; n++) await page.waitForTimeout(500);
  await browser.close();
  if (!raw) throw new Error('the reviews widget on overlay.pt did not answer');
  const english = /\b(the|and|with|was|they|their|great|will|have|team|highly|work)\b/gi, portuguese = /\b(que|com|uma|para|muito|trabalho|equipa|serviço|não|foi|pelo|recomendo|sempre)\b/gi;
  const items = raw.rev_reviews
    .filter((r) => r.rev_desc && r.rev_desc.trim().length >= MIN_CHARS)
    .slice(0, MAX_REVIEWS)
    .map((r) => ({ name: r.rev_user.rev_name.trim(), rating: r.rev_rating, text: r.rev_desc.trim(), lang: (r.rev_desc.match(english) || []).length > (r.rev_desc.match(portuguese) || []).length ? 'en' : 'pt' }));
  console.log('reviews', items.length, 'of', raw.rev_reviews.length, 'shown on overlay.pt · overall', raw.rev_general_rate, 'from', raw.rev_total_number);
  return { source: raw.rev_provider, rating: raw.rev_general_rate, count: raw.rev_total_number, placeId: raw.rev_address, items };
}

const file = join(out, 'content.json');
const content = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
if (only !== 'reviews') content.gallery = await photos();
if (only !== 'photos') content.reviews = await reviews();
content.fetched = new Date().toISOString().slice(0, 7);          // year and month the content was read from overlay.pt
writeFileSync(file, JSON.stringify(content, null, 1));
console.log('wrote', file);
