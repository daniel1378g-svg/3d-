"""Turns the restaurant's own images (media/original) into WebP for the site (public/images, public/brand).

Usage: python3 -I scripts/prepare_images.py
"""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
src, img, brand = root / "media" / "original", root / "public" / "images", root / "public" / "brand"
img.mkdir(parents=True, exist_ok=True)
brand.mkdir(parents=True, exist_ok=True)

sizes = {}
for f in sorted(src.glob("*.jp*g")):
    im = Image.open(f).convert("RGB")
    name = f.stem
    big = im if im.width <= 1600 else im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    big.save(img / f"{name}.webp", "WEBP", quality=80, method=6)
    # a small copy for the gallery wall, the cursor photo and the hero's rising dishes
    sm = im.resize((480, round(im.height * 480 / im.width)), Image.LANCZOS) if im.width > 480 else im
    sm.save(img / f"{name}-sm.webp", "WEBP", quality=74, method=6)
    sizes[name] = [big.width, big.height]

logo = Image.open(src / "cropped-Logo_bordeau-1.png").convert("RGBA")  # 512 px, the largest copy
logo = logo.crop(logo.getbbox())
logo.save(brand / "logo.png", optimize=True)
logo.save(brand / "logo.webp", "WEBP", quality=92, method=6)
for s in (32, 180, 512):
    logo.resize((s, s), Image.LANCZOS).save(brand / f"favicon-{s}.png", optimize=True)
# social preview: the logo on linen beside the dining room
og = Image.new("RGB", (1200, 630), (245, 238, 228))
room = Image.open(src / "salle-miroir-chandelier-1900.jpg").convert("RGB").resize((700, 467), Image.LANCZOS)
og.paste(room.crop((0, 0, 600, 467)).resize((600, 630)), (600, 0))
og.paste(logo.resize((440, 440), Image.LANCZOS), (80, 95), logo.resize((440, 440), Image.LANCZOS))
og.save(brand / "og-image.jpg", "JPEG", quality=86)
(root / "src" / "data").mkdir(parents=True, exist_ok=True)
(root / "src" / "data" / "image-sizes.json").write_text(json.dumps(sizes, indent=1))
print(len(sizes), "photos; logo", logo.size)
