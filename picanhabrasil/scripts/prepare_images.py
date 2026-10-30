"""media/originals → public/images/<id>-<w>.webp (480 / 960 / 1600 px, never upscaled) and src/data/images.json
(id → width, height, available widths, alpha, a 16 px blurred placeholder). The file name is the id.
Also writes the logo and favicons to public/brand.

Run: python3 -I scripts/prepare_images.py
"""
import base64, io, json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media/originals"
OUT = ROOT / "public/images"
OUT.mkdir(parents=True, exist_ok=True)
WIDTHS = [480, 960, 1600]

manifest = {}
for f in sorted(SRC.iterdir()):
    if f.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp") or f.stem == "logo": continue
    key = f.stem
    im = ImageOps.exif_transpose(Image.open(f))
    alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if alpha else "RGB")
    if alpha and im.getextrema()[3][0] == 255:
        im = im.convert("RGB"); alpha = False
    if alpha:  # trim transparent margins so cut-outs sit tight in their boxes
        im = im.crop(im.getbbox())
    w, h = im.size
    widths = sorted({min(w, x) for x in WIDTHS})
    for x in widths:
        im.resize((x, round(h * x / w)), Image.LANCZOS).save(OUT / f"{key}-{x}.webp", "WEBP", quality=85 if alpha else 80, method=6)
    tiny = im.resize((16, max(1, round(16 * h / w))), Image.LANCZOS)
    buf = io.BytesIO(); tiny.save(buf, "WEBP", quality=40)
    manifest[key] = {"w": w, "h": h, "widths": widths, "alpha": alpha, "blur": "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()}
    print(f"{key:28} {w}x{h} → {widths}")

data = ROOT / "src/data"; data.mkdir(parents=True, exist_ok=True)
(data / "images.json").write_text(json.dumps(manifest, indent=1), encoding="utf-8")
print(len(manifest), "images")

brand = ROOT / "public/brand"; brand.mkdir(parents=True, exist_ok=True)
logo = Image.open(SRC / "logo.png").convert("RGBA")
logo = logo.crop(logo.getbbox())
logo.save(brand / "logo.png", optimize=True)
logo.save(brand / "logo.webp", "WEBP", quality=90, method=6)
for s in (32, 180, 512):
    c = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    l = logo.copy(); l.thumbnail((s, s), Image.LANCZOS)
    c.alpha_composite(l, ((s - l.width) // 2, (s - l.height) // 2))
    c.save(brand / f"favicon-{s}.png", optimize=True)
print("logo", logo.size)
