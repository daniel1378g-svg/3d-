"""Turns the restaurant's own photos (media/original), the supplied ones (media/supplied) and the depth maps
(media/depth) into web files, and writes src/data/images.json (sizes, widths, blurred placeholders).

  public/images/<name>-<w>.avif|webp   480, 960 and 1600 px, never wider than the original
  public/depth/<name>.webp             depth map, 384 px
  public/masks/<name>.webp             R = steam, G = gloss, from the ellipses in content/photos.json
  public/brand/*                       logos and icons

Usage: python3 -I scripts/prepare_images.py
"""
import base64, io, json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageOps

root = Path(__file__).resolve().parent.parent
pub = root / "public"
for d in ("images", "depth", "masks", "brand"):
    (pub / d).mkdir(parents=True, exist_ok=True)

photos = json.loads((root / "content" / "photos.json").read_text())["photos"]
WIDTHS = (480, 960, 1600)
meta = {}

def lqip(im):
    small = im.copy()
    small.thumbnail((24, 24))
    buf = io.BytesIO()
    small.save(buf, "WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()

for p in photos:
    src = root / "media" / ("original" if p["source"] == "own" else "supplied") / p["file"]
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    cap = min(im.width, p.get("maxWidth", 10_000))
    widths = sorted({w for w in WIDTHS if w < cap} | {min(cap, WIDTHS[-1])})
    for w in widths:
        r = im if w == im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(pub / "images" / f"{p['name']}-{w}.webp", "WEBP", quality=80, method=6)
        r.save(pub / "images" / f"{p['name']}-{w}.avif", "AVIF", quality=58, speed=4)
    entry = {"w": im.width, "h": im.height, "widths": widths, "lqip": lqip(im)}
    if p.get("square"):
        sq = Image.open(root / "media" / "original" / p["square"]).convert("RGB")
        sq.thumbnail((800, 800))
        sq.save(pub / "images" / f"{p['name']}-sq.webp", "WEBP", quality=80, method=6)
        sq.save(pub / "images" / f"{p['name']}-sq.avif", "AVIF", quality=58, speed=4)
        entry["square"] = True

    depth = Image.open(root / "media" / "depth" / f"{p['name']}.png").convert("L")
    depth.thumbnail((384, 384))
    depth.save(pub / "depth" / f"{p['name']}.webp", "WEBP", quality=88)
    entry["depth"] = True

    living = p.get("living")
    if living:
        size = (256, max(1, round(256 * im.height / im.width)))
        layers = []
        for key in ("steam", "gloss"):
            m = Image.new("L", size, 0)
            d = ImageDraw.Draw(m)
            for cx, cy, rx, ry in living.get(key, []):
                d.ellipse([(cx - rx) * size[0], (cy - ry) * size[1], (cx + rx) * size[0], (cy + ry) * size[1]], fill=255)
            layers.append(m.filter(ImageFilter.GaussianBlur(size[0] * 0.06)))
        Image.merge("RGB", (layers[0], layers[1], Image.new("L", size, 0))).save(pub / "masks" / f"{p['name']}.webp", "WEBP", quality=90)
        entry["living"] = {"shimmer": bool(living.get("shimmer"))}
    meta[p["name"]] = entry
    print(p["name"], widths)

# Brand files. The logo is only published as a 600 px PNG; it is never redrawn.
orig = root / "media" / "original"
logo = Image.open(orig / "oliveira-logo-210310-web-ba.png").convert("RGBA")
logo.save(pub / "brand" / "logo.webp", "WEBP", quality=90, method=6)
logo.save(pub / "brand" / "logo.png", optimize=True)
dark = Image.open(orig / "oliveira-logo-210224-inv..png").convert("RGBA")
dark.save(pub / "brand" / "logo-dark.webp", "WEBP", quality=90, method=6)
Image.open(orig / "oliveira-logo-text-white-02.png").convert("RGBA").save(pub / "brand" / "wordmark-white.webp", "WEBP", quality=90)
ring = Image.open(orig / "oliveira-favicon.png").convert("RGBA")
# The favicon sits on a white square; key the white out so the ring works on any background.
px = ring.load()
for y in range(ring.height):
    for x in range(ring.width):
        r, g, b_, a = px[x, y]
        whiteness = min(r, g, b_)
        if whiteness > 200 and max(r, g, b_) - whiteness < 30:
            px[x, y] = (r, g, b_, int(a * max(0, 255 - whiteness) / 55))
for s in (32, 180, 512):
    ring.resize((s, s), Image.LANCZOS).save(pub / "brand" / f"ring-{s}.png", optimize=True)
ring.resize((256, 256), Image.LANCZOS).save(pub / "brand" / "ring.webp", "WEBP", quality=90)
# The tree alone, between the "RESTAURANTE" arc and the OLIVEIRA lettering.
tree = logo.crop((88, 104, 508, 462))
for box in ((0, 0, 34, 30), (382, 0, 420, 30)):  # tips of the arc's first and last letters
    tree.paste((0, 0, 0, 0), box)
tree.save(pub / "brand" / "tree.webp", "WEBP", quality=90)
# Link preview: the caldo verde, cropped to 1200 × 630.
og = Image.open(orig / "oliveira-caldo-verde-003.jpg").convert("RGB")
og = ImageOps.fit(og, (1200, 630), Image.LANCZOS)
og.save(pub / "brand" / "og-image.jpg", quality=84)

(root / "src" / "data").mkdir(exist_ok=True)
(root / "src" / "data" / "images.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1))
print(len(meta), "photos")
