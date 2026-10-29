"""Turns the restaurant's own images into WebP for the site.

  media/originals/gallery/*.jpg  → public/images/<name>.webp (1200 px) and <name>-sm.webp (640 px)
  media/originals/press/*.jpg    → public/press/<id>.webp
  media/originals/blog/*.jpg     → public/blog/<name>.webp
  media/cutouts-src/*.png        → public/cutouts/<id>.webp (background removed with rembg/isnet from the
                                    restaurant's photos; here the alpha is cleaned and each cut is cropped)
  media/originals/brand/logo     → public/brand/logo.webp, favicons, og-image

Usage: python3 -I scripts/prepare_images.py
"""
import json
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

root = Path(__file__).resolve().parent.parent
orig = root / "media" / "originals"
pub = root / "public"
for d in ("images", "press", "blog", "cutouts", "brand"):
    (pub / d).mkdir(parents=True, exist_ok=True)

sizes = {}
for f in sorted((orig / "gallery").glob("*.jpg")):
    im = Image.open(f).convert("RGB")
    name = f.stem.rstrip("-")
    im.save(pub / "images" / f"{name}.webp", "WEBP", quality=80, method=6)
    w = 640 if im.width >= im.height else 420
    im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(pub / "images" / f"{name}-sm.webp", "WEBP", quality=74, method=6)
    sizes[name] = [im.width, im.height]

PRESS = {
    "2016_02_article-tdg.jpg": "tribune-de-geneve",
    "2016_02_hebdo-exo0012-1.jpg": "article-portugais",
    "2016_02_hebdo-exo0013-1.jpg": "fines-gueules",
    "2016_02_hebdo-exo0002.jpg": "gault-millau",
    "2016_02_hebdo-exo-1.jpg": "adresses-exotiques",
}
for src, out in PRESS.items():
    im = Image.open(orig / "press" / src).convert("RGB")
    if im.width > 1400:
        im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
    im.save(pub / "press" / f"{out}.webp", "WEBP", quality=78, method=6)
    sizes["press/" + out] = [im.width, im.height]
    # the clipping wall shows the top of each scan at 4:3: a small crop of just that
    top = im.crop((0, 0, im.width, min(im.height, round(im.width * 3 / 4))))
    top.resize((480, round(top.height * 480 / top.width)), Image.LANCZOS).save(pub / "press" / f"{out}-sm.webp", "WEBP", quality=74, method=6)

for src, out in {"lusitania_flyer.jpg": "lusitania-flyer", "specialites-portugaise-geneve-2.jpg": "antonina-fernando"}.items():
    im = Image.open(orig / "blog" / src).convert("RGB")
    if im.width > 1200:
        im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
    im.save(pub / "blog" / f"{out}.webp", "WEBP", quality=80, method=6)
    sizes["blog/" + out] = [im.width, im.height]

# cut-outs: (source, crop box in source pixels or None, id, alpha floor, feather the crop edges)
CUTS = [
    ("restaurant-de-poisson-geneve", None, "peixes", 110, False),
    ("poisson-arrivage-journalier-geneve", (40, 90, 1200, 600), "mariscos", 110, True),
    ("poisson-arrivage-journalier-geneve", (560, 190, 1040, 450), "tomates", 110, True),
    ("restaurant-specialites-de-la-mer-geneve", (0, 0, 1200, 420), "polvo", 110, False),
    ("specialites-fruits-de-mer-plainpalais", None, "travessa", 40, False),
    ("plats-du-jour-plainpalais", (0, 0, 520, 620), "batatas", 110, False),
    ("restaurant-plats-du-jour-plainpalais-1", None, "feijao", 110, False),
]
for src, box, out, floor, feather in CUTS:
    im = Image.open(root / "media" / "cutouts-src" / f"{src}.png").convert("RGBA")
    if box:
        im = im.crop(box)
    a = im.getchannel("A")
    # drop the soft haze rembg leaves on reflections and out-of-focus edges, keep a soft 1 px edge
    a = a.point(lambda v, f=floor: 0 if v < f else min(255, int((v - f) * 255 / max(1, 220 - f))))
    a = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    if feather:
        # where the crop cuts through the platter, fade out on an ellipse instead of a straight edge
        m = Image.new("L", im.size, 0)
        ImageDraw.Draw(m).ellipse((im.width * 0.04, im.height * 0.04, im.width * 0.96, im.height * 0.96), fill=255)
        m = m.filter(ImageFilter.GaussianBlur(min(im.size) * 0.07))
        a = Image.fromarray(np.minimum(np.array(a), np.array(m)))
    im.putalpha(a)
    im = im.crop(im.getbbox())
    if im.width > 900:
        im = im.resize((900, round(im.height * 900 / im.width)), Image.LANCZOS)
    im.save(pub / "cutouts" / f"{out}.webp", "WEBP", quality=82, method=6)
    sizes["cutouts/" + out] = [im.width, im.height]

logo = Image.open(orig / "brand" / "logo-le-portugais.png").convert("RGBA")
logo = logo.crop(logo.getbbox())
logo.save(pub / "brand" / "logo.webp", "WEBP", quality=92, method=6)
logo.save(pub / "brand" / "logo.png", optimize=True)
sizes["brand/logo"] = list(logo.size)
# the mark alone (the red band with the cockerel), for small sizes and the cork coaster
mark = logo.crop((0, 0, logo.width, int(logo.height * 0.56)))
mark = mark.crop(mark.getbbox())
mark.save(pub / "brand" / "mark.webp", "WEBP", quality=92, method=6)
sizes["brand/mark"] = list(mark.size)
for s in (32, 180, 512):
    sq = Image.new("RGBA", (max(mark.size),) * 2, (243, 237, 226, 255))
    sq.alpha_composite(mark, ((sq.width - mark.width) // 2, (sq.height - mark.height) // 2))
    sq.resize((s, s), Image.LANCZOS).save(pub / "brand" / f"favicon-{s}.png", optimize=True)
og = Image.new("RGB", (1200, 630), (243, 237, 226))
room = Image.open(orig / "gallery" / "gastronomie-portugaise-geneve-.jpg").convert("RGB")
room = room.resize((round(room.width * 630 / room.height), 630), Image.LANCZOS)
og.paste(room.crop((room.width - 620, 0, room.width, 630)), (580, 0))
lg = logo.resize((round(logo.width * 470 / logo.height), 470), Image.LANCZOS)
og.paste(lg, (290 - lg.width // 2, 80), lg)
og.save(pub / "brand" / "og-image.jpg", "JPEG", quality=86)

(root / "src" / "data").mkdir(parents=True, exist_ok=True)
(root / "src" / "data" / "image-sizes.json").write_text(json.dumps(sizes, indent=1))
print(len([k for k in sizes if "/" not in k]), "photos;", len(PRESS), "press scans;", len(CUTS), "cut-outs; logo", logo.size)
