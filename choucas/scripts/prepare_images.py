"""Turns the restaurant's own images (media/original, downloaded from choucas.ch) into WebP for the site.

media/original/g<cid>/   the gallery photos, one folder per live gallery category (cid = live category id)
media/original/content/  the photos used on the live pages
media/original/brand/    logos and award badges

Usage: python3 -I scripts/prepare_images.py
"""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
src, img, brand = root / "media" / "original", root / "public" / "images", root / "public" / "brand"
img.mkdir(parents=True, exist_ok=True)
brand.mkdir(parents=True, exist_ok=True)

# Nine near-duplicate or low-value shots are left out to keep the preview at 40 gallery photos.
SKIP = {"dsc01691", "dsc01694", "dsc01699", "dsc01700", "dsc01716", "dsc01724", "pict0007", "pict0017", "pict0027"}

def slug(stem: str) -> str:
    return stem.lower().replace("_", "-").strip("-")

sizes = {}
files = sorted(src.glob("g*/*.jp*g")) + sorted(src.glob("content/*.jp*g"))
for f in files:
    if f.stem in SKIP or f.stem.endswith("Grey"):
        continue
    name = slug(f.stem)
    im = Image.open(f).convert("RGB")
    big = im if im.width <= 1600 else im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    big.save(img / f"{name}.webp", "WEBP", quality=80, method=6)
    sm = im.resize((520, round(im.height * 520 / im.width)), Image.LANCZOS) if im.width > 520 else im
    sm.save(img / f"{name}-sm.webp", "WEBP", quality=74, method=6)
    sizes[name] = [big.width, big.height]

for f in sorted((src / "brand").glob("*")):
    im = Image.open(f).convert("RGBA")
    im = im.crop(im.getbbox())
    im.save(brand / f"{slug(f.stem)}.webp", "WEBP", quality=92, method=6)
    im.save(brand / f"{slug(f.stem)}.png", optimize=True)
    sizes["brand/" + slug(f.stem)] = [im.width, im.height]

# Favicons: the orange hexagon with the chough, cut from the main logo.
logo = Image.open(src / "brand" / "ConnectionLogoNeu.png").convert("RGBA")
mark = logo.crop((0, 0, 104, 122))
mark = mark.crop(mark.getbbox())
side = max(mark.size)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2))
sq.save(brand / "mark.png")
sq.save(brand / "mark.webp", "WEBP", quality=92)
for s in (32, 180, 512):
    sq.resize((s, s), Image.LANCZOS).save(brand / f"favicon-{s}.png", optimize=True)
# Social preview: the logo on snow beside the pizzeria photo.
og = Image.new("RGB", (1200, 630), (247, 244, 238))
room = Image.open(src / "g3" / "_a3x7690.jpg").convert("RGB")
room = room.resize((round(room.width * 630 / room.height), 630), Image.LANCZOS)
og.paste(room.crop((0, 0, 560, 630)), (640, 0))
l2 = logo.resize((560, round(logo.height * 560 / logo.width)), Image.LANCZOS)
og.paste(l2, (40, (630 - l2.height) // 2), l2)
og.save(brand / "og-image.jpg", "JPEG", quality=86)

(root / "src" / "data").mkdir(parents=True, exist_ok=True)
(root / "src" / "data" / "image-sizes.json").write_text(json.dumps(sizes, indent=1))
print(len(sizes), "images")
