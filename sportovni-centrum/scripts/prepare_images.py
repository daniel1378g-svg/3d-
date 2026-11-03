"""Prepare web delivery files from the untouched source originals.

source/originals/ keeps every asset exactly as downloaded from www.sportovni-centrum.cz.
This script copies them to public/ under the same paths (so the original files stay
available) and writes responsive WebP/AVIF variants of the photographs next to them.
Photos are never upscaled: the largest variant is the original width (930 px).

Run with:  python3 -I scripts/prepare_images.py
"""
from pathlib import Path
import json
import shutil

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source" / "originals"
OUT = ROOT / "public"
PHOTO_WIDTHS = (480, 720, 930)

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
    with Image.open(path) as im:
        w, h = im.size
        entry = {"width": w, "height": h, "variants": []}
        if rel.startswith("images/prolinacky/") and path.suffix.lower() == ".jpg":
            rgb = im.convert("RGB")
            for target in PHOTO_WIDTHS:
                tw = min(target, w)
                th = round(h * tw / w)
                resized = rgb if tw == w else rgb.resize((tw, th), Image.LANCZOS)
                for fmt, ext, kw in (("WEBP", "webp", {"quality": 82, "method": 6}),
                                     ("AVIF", "avif", {"quality": 60})):
                    vrel = f"{rel.rsplit('.', 1)[0]}-{tw}.{ext}"
                    resized.save(OUT / vrel, fmt, **kw)
                    entry["variants"].append({"src": vrel, "width": tw, "height": th, "type": f"image/{ext}"})
        manifest[rel] = entry

(ROOT / "content" / "images.json").write_text(json.dumps(manifest, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"{len(manifest)} assets → public/, manifest content/images.json")
