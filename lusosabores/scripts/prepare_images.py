"""Turns the restaurant's own images (downloaded from luso-sabores.ch) into WebP for the site.

  media/originals/<file>.jpg   → public/images/<id>.webp (1200 px) and <id>-sm.webp (640 px)
                                 the 35 menu tiles (content/menu.json) and the privatisation photo
  media/cutouts-src/*.png      → public/cutouts/<id>.webp (background removed with rembg/isnet-general-use
                                 from the restaurant's own photos; here the alpha is cleaned and cropped)
  media/originals/LOGO-...png  → public/brand/logo.webp|png, mark.webp, favicons, og-image.jpg

Stock photos the old site used as backgrounds (Unsplash, in media/stock) are never copied.
Usage: python3 -I scripts/prepare_images.py
"""
import json
from pathlib import Path
from PIL import Image, ImageFilter

root = Path(__file__).resolve().parent.parent
orig = root / "media" / "originals"
pub = root / "public"
for d in ("images", "cutouts", "brand"):
    (pub / d).mkdir(parents=True, exist_ok=True)

menu = json.loads((root / "content" / "menu.json").read_text())
FILES = {t["photo"]: t["source"].rsplit("/", 1)[1] for t in menu["tiles"]}
FILES["privatisation"] = "20210619_102545.jpg"

sizes = {}
for pid, name in FILES.items():
    im = Image.open(orig / name).convert("RGB")
    big = im.copy()
    big.thumbnail((1200, 1200), Image.LANCZOS)
    big.save(pub / "images" / f"{pid}.webp", "WEBP", quality=78, method=6)
    sm = im.copy()
    sm.thumbnail((640, 640), Image.LANCZOS)
    sm.save(pub / "images" / f"{pid}-sm.webp", "WEBP", quality=72, method=6)
    sizes[pid] = list(big.size)

# cut-outs: (source png, crop box as fractions of the source or None, id, alpha floor)
CUTS = [
    ("picanha", (0.0, 0.0, 0.72, 1.0), "picanha", 90),
    ("f_churrasco", None, "frango", 90),
    ("frango_churrasco", None, "frango-prato", 90),
    ("bacalhau_lagareiro", None, "bacalhau", 90),
    ("salmao_grelhado", None, "salmao", 90),
]
for src, box, out, floor in CUTS:
    im = Image.open(root / "media" / "cutouts-src" / f"{src}.png").convert("RGBA")
    if box:
        im = im.crop((round(box[0] * im.width), round(box[1] * im.height), round(box[2] * im.width), round(box[3] * im.height)))
    a = im.getchannel("A")
    # drop the soft haze left on reflections and out-of-focus edges, keep a soft 1 px edge
    a = a.point(lambda v, f=floor: 0 if v < f else min(255, int((v - f) * 255 / max(1, 220 - f))))
    a = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(a)
    im = im.crop(im.getbbox())
    if im.width > 900:
        im = im.resize((900, round(im.height * 900 / im.width)), Image.LANCZOS)
    im.save(pub / "cutouts" / f"{out}.webp", "WEBP", quality=82, method=6)
    sizes["cutouts/" + out] = list(im.size)

logo = Image.open(orig / "LOGO-LUSO-SABORES.png").convert("RGBA")
logo = logo.crop(logo.getbbox())
logo.save(pub / "brand" / "logo.webp", "WEBP", quality=92, method=6)
logo.save(pub / "brand" / "logo.png", optimize=True)
sizes["brand/logo"] = list(logo.size)
# the mark alone (the character), for small sizes
mark = logo.crop((0, 0, logo.width, int(logo.height * 0.6)))
mark = mark.crop(mark.getbbox())
mark.save(pub / "brand" / "mark.webp", "WEBP", quality=92, method=6)
mark.save(pub / "brand" / "mark.png", optimize=True)
sizes["brand/mark"] = list(mark.size)
CREAM = (255, 251, 232, 255)
for s in (32, 180, 512):
    sq = Image.new("RGBA", (max(mark.size) + 40,) * 2, CREAM)
    sq.alpha_composite(mark, ((sq.width - mark.width) // 2, (sq.height - mark.height) // 2))
    sq.resize((s, s), Image.LANCZOS).save(pub / "brand" / f"favicon-{s}.png", optimize=True)
og = Image.new("RGB", (1200, 630), CREAM[:3])
dish = Image.open(orig / "picanha.jpg").convert("RGB")
dish = dish.resize((round(dish.width * 630 / dish.height), 630), Image.LANCZOS)
og.paste(dish.crop((dish.width - 560, 0, dish.width, 630)), (640, 0))
lg = logo.resize((560, round(logo.height * 560 / logo.width)), Image.LANCZOS)
og.paste(lg, (40, (630 - lg.height) // 2), lg)
og.save(pub / "brand" / "og-image.jpg", "JPEG", quality=86)

(root / "src" / "data").mkdir(parents=True, exist_ok=True)
(root / "src" / "data" / "image-sizes.json").write_text(json.dumps(sizes, indent=1))
print(len(FILES), "photos;", len(CUTS), "cut-outs; logo", logo.size)
