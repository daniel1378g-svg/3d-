"""Turns the shop's own photos and logo (media/original, downloaded at -1920w from the live site's Duda CDN)
into web files, and writes src/data/images.json (sizes, widths, blurred placeholders).

  public/images/<name>-<w>.avif|webp   480, 960 and 1600 px, never wider than the original
  public/brand/logo.webp|png           the logo with its white background keyed out (600 px, as published)
  public/brand/heart-*.png             favicons: the logo's heart on a flour disc
  public/brand/og-image.jpg            the live site's own social preview image (Chez-Manu-logo-1920w.jpg)

Usage: python3 -I scripts/prepare_images.py
"""
import base64, io, json
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

root = Path(__file__).resolve().parent.parent
pub = root / "public"
orig = root / "media" / "original"
for d in ("images", "brand"):
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
    im = ImageOps.exif_transpose(Image.open(orig / p["file"]))
    if im.mode in ("RGBA", "LA", "P"):
        # A few PNGs carry an alpha channel; flatten it onto flour so no edge turns black.
        rgba = im.convert("RGBA")
        flat = Image.new("RGB", rgba.size, (251, 246, 236))
        flat.paste(rgba, mask=rgba.split()[3])
        im = flat
    else:
        im = im.convert("RGB")
    widths = sorted({w for w in WIDTHS if w < im.width} | {min(im.width, WIDTHS[-1])})
    for w in widths:
        r = im if w == im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(pub / "images" / f"{p['name']}-{w}.webp", "WEBP", quality=80, method=6)
        r.save(pub / "images" / f"{p['name']}-{w}.avif", "AVIF", quality=58, speed=4)
    meta[p["id"]] = {"name": p["name"], "w": im.width, "h": im.height, "widths": widths, "lqip": lqip(im)}
    print(p["id"], widths)

# The logo is published only as a 600 px PNG on a white ground; key the white out so it sits on any light
# colour (the heart's cream highlights become slightly translucent, which reads the same on flour).
logo = Image.open(orig / "Chez-Manu-logo.png").convert("RGBA")
px = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = px[x, y]
        lo = min(r, g, b)
        if lo > 200 and max(r, g, b) - lo < 40:
            px[x, y] = (r, g, b, int(a * max(0, 255 - lo) / 55))
bbox = logo.getbbox()
logo = logo.crop(bbox)
logo.save(pub / "brand" / "logo.webp", "WEBP", quality=92, method=6)
logo.save(pub / "brand" / "logo.png", optimize=True)
half = logo.resize((logo.width // 2, logo.height // 2), Image.LANCZOS)
half.save(pub / "brand" / "logo-300.webp", "WEBP", quality=92, method=6)
print("logo", logo.size)

# Favicons: the heart from the middle of the logo, on a flour disc.
heart = logo.crop((198, 102, 362, 248))
heart.thumbnail((150, 150))
for s in (32, 180, 512):
    disc = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    ImageDraw.Draw(disc).ellipse((0, 0, 255, 255), fill=(251, 246, 236, 255))
    h = heart.resize((int(heart.width * 1.25), int(heart.height * 1.25)), Image.LANCZOS)
    disc.alpha_composite(h, ((256 - h.width) // 2, (256 - h.height) // 2 + 6))
    disc.resize((s, s), Image.LANCZOS).save(pub / "brand" / f"heart-{s}.png", optimize=True)

# Link preview: the live site's own og:image, unchanged.
Image.open(orig / "Chez-Manu-logo.jpg").convert("RGB").save(pub / "brand" / "og-image.jpg", quality=90)

(root / "src" / "data").mkdir(exist_ok=True)
(root / "src" / "data" / "images.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1))
print(len(meta), "photos")
