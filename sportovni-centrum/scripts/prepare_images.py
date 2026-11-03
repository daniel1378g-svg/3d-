"""Prepare web delivery files from the untouched source originals.

source/originals/ keeps every asset exactly as downloaded from www.sportovni-centrum.cz.
This script copies them to public/ under the same paths (so the original files stay
available) and writes responsive AVIF/WebP variants of the photographs next to them.

- Photographs = JPEG/PNG files at least 600 px wide (logos and icons are left alone).
- Photos are never upscaled; the largest variant is the original width.
- EXIF orientation is applied before measuring and resizing.
- A WebP/AVIF variant is only kept when it is smaller than the original file.

Run with:  python3 -I scripts/prepare_images.py
"""
from pathlib import Path
import json
import shutil

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source" / "originals"
OUT = ROOT / "public"
PHOTO_WIDTHS = (480, 720, 930)
MIN_PHOTO_WIDTH = 600
FORMATS = (("AVIF", "avif", {"quality": 60}), ("WEBP", "webp", {"quality": 74, "method": 6}))

manifest = {}
for path in sorted(SRC.rglob("*")):
    if not path.is_file():
        continue
    rel = path.relative_to(SRC).as_posix()
    dest = OUT / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, dest)
    if path.suffix.lower() == ".ico":
        manifest[rel] = {"width": 16, "height": 16, "variants": []}
        continue
    with Image.open(path) as raw:
        im = ImageOps.exif_transpose(raw)
        w, h = im.size
        entry = {"width": w, "height": h, "variants": []}
        is_photo = path.suffix.lower() in (".jpg", ".jpeg", ".png") and w >= MIN_PHOTO_WIDTH
        if is_photo:
            rgb = im.convert("RGB")
            original_size = path.stat().st_size
            for tw in sorted({min(t, w) for t in PHOTO_WIDTHS}):
                th = round(h * tw / w)
                resized = rgb if tw == w else rgb.resize((tw, th), Image.LANCZOS)
                for fmt, ext, kw in FORMATS:
                    vrel = f"{rel.rsplit('.', 1)[0]}-{tw}.{ext}"
                    resized.save(OUT / vrel, fmt, **kw)
                    size = (OUT / vrel).stat().st_size
                    if tw == w and size >= original_size:  # full-size variant must beat the original
                        (OUT / vrel).unlink()
                        print(f"  skipped {vrel}: {size} B ≥ original {original_size} B")
                        continue
                    entry["variants"].append({"src": vrel, "width": tw, "height": th, "type": f"image/{ext}", "bytes": size})
        manifest[rel] = entry

(ROOT / "content" / "images.json").write_text(json.dumps(manifest, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"{len(manifest)} assets → public/, manifest content/images.json")
