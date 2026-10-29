"""Images for the site, from the restaurant's own files in media/originals (downloaded from daolafoes.ch):
  photos                     → public/images/<id>.webp (≤1600 px) + <id>-sm.webp (≤800 px)
  green-screen dish pictures → public/cutouts/<id>.webp (the flat green #A3B444 keyed out) + public/images/<id>.webp on cream
  logo                       → public/brand/ (logo, white/ink variants, mark, favicons, share image)
Writes src/data/image-sizes.json."""
import json
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

root = Path(__file__).resolve().parent.parent
orig, pub = root / "media" / "originals", root / "public"
for d in ("images", "cutouts", "brand"):
    (pub / d).mkdir(parents=True, exist_ok=True)
sizes = {}
CREAM = (253, 249, 246)

def key_green(im: Image.Image) -> Image.Image:
    """Keys out the flat green background (#A3B444): alpha from the colour distance, soft edge, own alpha kept."""
    import numpy as np
    im = im.convert("RGBA")
    a = np.asarray(im).astype(int)
    d = np.abs(a[..., 0] - 163) + np.abs(a[..., 1] - 180) + np.abs(a[..., 2] - 68)
    keyed = np.clip((d - 40) * 255 / 70, 0, 255).astype("uint8")
    alpha = Image.fromarray(np.minimum(keyed, a[..., 3].astype("uint8")))
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    r, g, b, _ = im.split()
    res = Image.merge("RGBA", (r, g, b, alpha))
    return res.crop(alpha.getbbox() or (0, 0) + im.size)

for p in json.loads((root / "content" / "photos.list.json").read_text()):
    src = orig / p["file"]
    im = ImageOps.exif_transpose(Image.open(src))
    if p.get("green"):
        cut = key_green(im)
        cut.thumbnail((900, 900), Image.LANCZOS)
        cut.save(pub / "cutouts" / f"{p['id']}.webp", "WEBP", quality=82, method=6)
        sizes["cutouts/" + p["id"]] = [cut.width, cut.height]
        # the same picture on cream, square-ish, for cards and the gallery grid
        pad = int(max(cut.size) * 0.12)
        card = Image.new("RGBA", (cut.width + 2 * pad, cut.height + 2 * pad), CREAM + (255,))
        card.alpha_composite(cut, (pad, pad))
        im = card.convert("RGB")
    else:
        im = im.convert("RGB")
    big = im.copy(); big.thumbnail((1600, 1600), Image.LANCZOS)
    big.save(pub / "images" / f"{p['id']}.webp", "WEBP", quality=80, method=6)
    sm = im.copy(); sm.thumbnail((800, 800), Image.LANCZOS)
    sm.save(pub / "images" / f"{p['id']}-sm.webp", "WEBP", quality=74, method=6)
    sizes[p["id"]] = [big.width, big.height]

# the logo: orange script "Casa Dão Lafões, Leitão à Bairrada" with a drawn suckling pig, on transparent
logo = Image.open(orig / "header_img-logo.png").convert("RGBA")
logo = logo.crop(logo.getchannel("A").getbbox())
logo.save(pub / "brand" / "logo.png", optimize=True)
white = Image.new("RGBA", logo.size, (255, 255, 255, 255)); white.putalpha(logo.getchannel("A")); white.save(pub / "brand" / "logo-white.png", optimize=True)
ink = Image.new("RGBA", logo.size, (81, 53, 40, 255)); ink.putalpha(logo.getchannel("A")); ink.save(pub / "brand" / "logo-ink.png", optimize=True)
sizes["brand/logo"] = [logo.width, logo.height]
# the mark: the drawn pig, cut from the whole-pig cut-out silhouette (the logo's pig overlaps the letters)
pig = Image.open(pub / "cutouts" / "t-leitao-inteiro.webp").convert("RGBA")
for s in (32, 180, 512):
    tile = Image.new("RGBA", (s, s), (81, 53, 40, 255))
    m = Image.new("RGBA", pig.size, (224, 69, 5, 255)); m.putalpha(pig.getchannel("A"))
    m.thumbnail((int(s * 0.82), int(s * 0.82)), Image.LANCZOS)
    tile.alpha_composite(m, ((s - m.width) // 2, (s - m.height) // 2))
    tile.save(pub / "brand" / f"favicon-{s}.png", optimize=True)
mark = Image.new("RGBA", pig.size, (253, 249, 246, 255)); mark.putalpha(pig.getchannel("A")); mark.thumbnail((240, 240), Image.LANCZOS)
mark.save(pub / "brand" / "mark.webp", "WEBP", quality=92)
sizes["brand/mark"] = [mark.width, mark.height]
og = ImageOps.fit(Image.open(orig / "slideshow_img-home.jpg").convert("RGB"), (1200, 630), Image.LANCZOS)
shade = Image.new("RGBA", og.size, (43, 26, 18, 120)); og = Image.alpha_composite(og.convert("RGBA"), shade)
lg = white.copy(); lg.thumbnail((640, 330), Image.LANCZOS); og.alpha_composite(lg, ((1200 - lg.width) // 2, (630 - lg.height) // 2))
og.convert("RGB").save(pub / "brand" / "og-image.jpg", quality=84)
(root / "src" / "data").mkdir(exist_ok=True)
(root / "src" / "data" / "image-sizes.json").write_text(json.dumps(sizes, indent=1))
print(len(sizes), "entries; logo", logo.size, "mark", mark.size)
