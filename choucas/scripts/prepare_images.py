"""Turns the restaurant's own images (media/original, downloaded from choucas.ch) into responsive files.

media/original/g<cid>/   the gallery photos, one folder per live gallery category (cid = live category id)
media/original/content/  the photos used on the live pages
media/original/brand/    logos and award badges

For every photo: AVIF and WebP at 480, 960 and 1600 px wide, never wider than the source (nothing is
upscaled), with gentle sharpening after downscaling, plus a 24 px blurred placeholder inlined as base64
in src/data/images.json for the slide-in reveal.

Usage: python3 -I scripts/prepare_images.py
"""
import base64
import io
import json
from pathlib import Path
from PIL import Image, ImageFilter

root = Path(__file__).resolve().parent.parent
src, img, brand = root / "media" / "original", root / "public" / "images", root / "public" / "brand"
img.mkdir(parents=True, exist_ok=True)
brand.mkdir(parents=True, exist_ok=True)
for old in img.glob("*"):
    old.unlink()

# Nine near-duplicate or low-value shots are left out to keep the gallery at 40 photos.
SKIP = {"dsc01691", "dsc01694", "dsc01699", "dsc01700", "dsc01716", "dsc01724", "pict0007", "pict0017", "pict0027"}
WIDTHS = (480, 960, 1600)

def slug(stem: str) -> str:
    return stem.lower().replace("_", "-").strip("-")

meta = {}
files = sorted(src.glob("g*/*.jp*g")) + sorted(src.glob("content/*.jp*g"))
for f in files:
    if f.stem in SKIP or f.stem.endswith("Grey"):
        continue
    name = slug(f.stem)
    im = Image.open(f).convert("RGB")
    widths = sorted({w for w in WIDTHS if w < im.width} | {min(im.width, WIDTHS[-1])})
    for w in widths:
        out = im if w == im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        # downscaled copies get a light unsharp mask; the source size only a touch
        out = out.filter(ImageFilter.UnsharpMask(radius=0.8, percent=30 if w == im.width else 45, threshold=3))
        out.save(img / f"{name}-{w}.webp", "WEBP", quality=82, method=6)
        out.save(img / f"{name}-{w}.avif", "AVIF", quality=60, speed=4)
    ph = im.resize((24, max(1, round(im.height * 24 / im.width))), Image.LANCZOS)
    buf = io.BytesIO()
    ph.save(buf, "WEBP", quality=50)
    meta[name] = {"w": im.width, "h": im.height, "widths": widths, "ph": "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()}

sizes = {}
for f in sorted((src / "brand").glob("*")):
    im = Image.open(f).convert("RGBA")
    im = im.crop(im.getbbox())
    im.save(brand / f"{slug(f.stem)}.webp", "WEBP", quality=92, method=6)
    im.save(brand / f"{slug(f.stem)}.png", optimize=True)
    sizes[slug(f.stem)] = [im.width, im.height]

# Favicons: the orange hexagon with the chough, cut from the main logo (it ends where the orange ends).
logo = Image.open(src / "brand" / "ConnectionLogoNeu.png").convert("RGBA")
px = logo.load()
HEX_RIGHT = 1 + max(x for x in range(160) for y in range(logo.height) if px[x, y][3] > 40 and px[x, y][0] > 200 and px[x, y][1] < 160 and px[x, y][2] < 80)
mark = logo.crop((0, 0, HEX_RIGHT, 122))
mark = mark.crop(mark.getbbox())
side = max(mark.size)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2))
sq.save(brand / "mark.png")
sq.save(brand / "mark.webp", "WEBP", quality=92)
for s in (32, 180, 512):
    sq.resize((s, s), Image.LANCZOS).save(brand / f"favicon-{s}.png", optimize=True)
# Social preview: the logo on ivory beside the pizzeria photo.
og = Image.new("RGB", (1200, 630), (251, 247, 240))
room = Image.open(src / "g3" / "_a3x7690.jpg").convert("RGB")
room = room.resize((round(room.width * 630 / room.height), 630), Image.LANCZOS)
og.paste(room.crop((0, 0, 560, 630)), (640, 0))
l2 = logo.resize((560, round(logo.height * 560 / logo.width)), Image.LANCZOS)
og.paste(l2, (40, (630 - l2.height) // 2), l2)
og.save(brand / "og-image.jpg", "JPEG", quality=86)

(root / "src" / "data").mkdir(parents=True, exist_ok=True)
(root / "src" / "data" / "images.json").write_text(json.dumps(meta, indent=0))
(root / "src" / "data" / "brand-sizes.json").write_text(json.dumps(sizes, indent=1))
print(len(meta), "photos,", sum(len(m["widths"]) for m in meta.values()) * 2, "files")
