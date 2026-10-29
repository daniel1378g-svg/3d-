"""Images for the site, from the restaurant's own files in media/:
  media/originals/*         → public/images/<id>.webp (1600 px) + <id>-sm.webp (640 px), ids from content/photos.list.json
  media/cutouts-src/*.png   → public/cutouts/<id>.webp (transparent, for the flyers)
  logo                      → public/brand/ (logo, favicons, share image)
Writes src/data/image-sizes.json."""
import json
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

root = Path(__file__).resolve().parent.parent
orig, pub = root / "media" / "originals", root / "public"
for d in ("images", "cutouts", "brand"):
    (pub / d).mkdir(parents=True, exist_ok=True)
sizes = {}
for p in json.loads((root / "content" / "photos.list.json").read_text()):
    im = ImageOps.exif_transpose(Image.open(orig / p["file"])).convert("RGB")
    big = im.copy(); big.thumbnail((1600, 1600), Image.LANCZOS)
    big.save(pub / "images" / f"{p['id']}.webp", "WEBP", quality=78, method=6)
    sm = im.copy(); sm.thumbnail((800, 800), Image.LANCZOS)
    sm.save(pub / "images" / f"{p['id']}-sm.webp", "WEBP", quality=74, method=6)
    sizes[p["id"]] = [big.width, big.height]

CUTS = {"burger": "PHOTO-2022-11-07-11-42-322-1-1920w", "bacalhau": "image00004-2304w", "polvo": "image00005-2304w", "steak": "image00001-1920w", "platte": "image00008-1920w", "gebaeck": "image00003-1920w"}
for out, src in CUTS.items():
    f = root / "media" / "cutouts-src" / f"{src}.png"
    if not f.exists():
        continue
    im = Image.open(f).convert("RGBA")
    a = im.getchannel("A").point(lambda v: 0 if v < 90 else min(255, int((v - 90) * 255 / 130)))
    a = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(a)
    im = im.crop(a.getbbox())
    im.thumbnail((700, 700), Image.LANCZOS)
    im.save(pub / "cutouts" / f"{out}.webp", "WEBP", quality=80, method=6)
    sizes["cutouts/" + out] = [im.width, im.height]

# the logo: a grey script "Oceano" on transparent. Kept as is (on light), and in white for dark grounds.
logo = Image.open(orig / "logo_525-1920w.png").convert("RGBA")
logo = logo.crop(logo.getchannel("A").getbbox())
logo.save(pub / "brand" / "logo.png", optimize=True)
white = Image.new("RGBA", logo.size, (255, 255, 255, 255)); white.putalpha(logo.getchannel("A")); white.save(pub / "brand" / "logo-white.png", optimize=True)
ink = Image.new("RGBA", logo.size, (27, 27, 27, 255)); ink.putalpha(logo.getchannel("A")); ink.save(pub / "brand" / "logo-ink.png", optimize=True)
sizes["brand/logo"] = [logo.width, logo.height]
# the mark: the capital O of the logo, for the chip and the favicon
o = logo.crop((0, 0, int(logo.width * 0.3), logo.height)); o = o.crop(o.getchannel("A").getbbox())
for s in (32, 180, 512):
    tile = Image.new("RGBA", (s, s), (27, 27, 27, 255))
    m = Image.new("RGBA", o.size, (223, 206, 155, 255)); m.putalpha(o.getchannel("A"))
    m.thumbnail((int(s * 0.7), int(s * 0.7)), Image.LANCZOS)
    tile.alpha_composite(m, ((s - m.width) // 2, (s - m.height) // 2))
    tile.save(pub / "brand" / f"favicon-{s}.png", optimize=True)
mark = Image.new("RGBA", o.size, (223, 206, 155, 255)); mark.putalpha(o.getchannel("A")); mark.thumbnail((240, 240), Image.LANCZOS)
mark.save(pub / "brand" / "mark.webp", "WEBP", quality=92)
sizes["brand/mark"] = [mark.width, mark.height]
og = ImageOps.fit(Image.open(orig / "image00002-2304w.jpeg").convert("RGB"), (1200, 630), Image.LANCZOS)
shade = Image.new("RGBA", og.size, (27, 27, 27, 110)); og = Image.alpha_composite(og.convert("RGBA"), shade)
lg = white.copy(); lg.thumbnail((640, 200), Image.LANCZOS); og.alpha_composite(lg, ((1200 - lg.width) // 2, (630 - lg.height) // 2))
og.convert("RGB").save(pub / "brand" / "og-image.jpg", quality=84)
(root / "src" / "data").mkdir(exist_ok=True)
(root / "src" / "data" / "image-sizes.json").write_text(json.dumps(sizes, indent=1))
print(len(sizes), "entries; logo", logo.size, "mark", mark.size)
