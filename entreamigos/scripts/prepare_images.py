"""Images for the site, from the restaurant's own files in media/:
  media/originals/*            → public/images/<id>.webp (1200 px) + <id>-sm.webp (640 px)
  media/cutouts-src/*.png      → public/cutouts/<id>.webp (transparent, for the flyers)
  logo, fork symbol            → public/brand/ (logo, favicons, share image)
Writes src/data/image-sizes.json."""
import json
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

root = Path(__file__).resolve().parent.parent
orig, pub = root / "media" / "originals", root / "public"
for d in ("images", "cutouts", "brand", "wine"):
    (pub / d).mkdir(parents=True, exist_ok=True)
sizes = {}

PHOTOS = {
    "terrasse": "IMG-20230320-WA0026.jpg",
    "plats-table": "IMG-20230320-WA0003.jpg",  # WA0003-1 is the same file
    "vin-bouteille": "20230320_151440-scaled.jpg",
    "calamares": "IMG-20230320-WA0007.jpg",
    "bifanas": "IMG-20230320-WA0008.jpg",
    "rissoles-accras": "IMG-20230320-WA0009.jpg",
    "porc-grille": "IMG-20230320-WA0010.jpg",
    "secretos": "IMG-20230320-WA0011.jpg",
    "polvo": "IMG-20230320-WA0012.jpg",
    "poulet-grille": "IMG-20230320-WA0013.jpg",
    "bolognaise": "IMG-20230320-WA0014.jpg",
    "gateau-chocolat": "IMG-20230320-WA0015.jpg",
    "glaces-1": "dessert-avec-glace_1.jpg",
    "glaces-2": "dessert-avec-glace_2.jpg",
    "glaces-poster": "mise-a-jour-desserts.jpg",
    "leitao": "leitao.jpg",
}
for pid, src in PHOTOS.items():
    im = ImageOps.exif_transpose(Image.open(orig / src)).convert("RGB")
    big = im.copy(); big.thumbnail((1200, 1200), Image.LANCZOS)
    big.save(pub / "images" / f"{pid}.webp", "WEBP", quality=78, method=6)
    sm = im.copy(); sm.thumbnail((640, 640), Image.LANCZOS)
    sm.save(pub / "images" / f"{pid}-sm.webp", "WEBP", quality=74, method=6)
    sizes[pid] = [big.width, big.height]

# producers' bottle pictures and the regions map (villaferia.com), kept with their transparency
for pid, src, w in (("casal-gazela", "casal-gazella.png", 320), ("douro-planalto", "Douro-Planalto-vin-blanc-portugais.png", 300), ("carte-vins", "map-les-vins-portugais.png", 473)):
    im = Image.open(orig / src).convert("RGBA"); im.thumbnail((w, 2000), Image.LANCZOS)
    im.save(pub / "wine" / f"{pid}.webp", "WEBP", quality=82, method=6)
    sizes["wine/" + pid] = [im.width, im.height]

# cut-outs: drop the soft haze background removal leaves, keep a soft 1 px edge, crop to the dish
CUTS = {"poulet": "IMG-20230320-WA0013", "rissoles": "IMG-20230320-WA0009", "polvo": "IMG-20230320-WA0012", "bifanas": "IMG-20230320-WA0008", "calamares": "IMG-20230320-WA0007", "bolognaise": "IMG-20230320-WA0014"}
for out, src in CUTS.items():
    im = Image.open(root / "media" / "cutouts-src" / f"{src}.png").convert("RGBA")
    a = im.getchannel("A").point(lambda v: 0 if v < 90 else min(255, int((v - 90) * 255 / 130)))
    a = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(a)
    im = im.crop(a.getbbox())
    im.thumbnail((700, 700), Image.LANCZOS)
    im.save(pub / "cutouts" / f"{out}.webp", "WEBP", quality=80, method=6)
    sizes["cutouts/" + out] = [im.width, im.height]

# the logo is white on transparent: keep it white (it sits on the brand colour)
logo = Image.open(orig / "IMG_6243.png").convert("RGBA")
logo = logo.crop(logo.getchannel("A").getbbox())
l2 = logo.copy(); l2.thumbnail((900, 900), Image.LANCZOS); l2.save(pub / "brand" / "logo.webp", "WEBP", quality=90, method=6)
l2.save(pub / "brand" / "logo.png", optimize=True)
sizes["brand/logo"] = [l2.width, l2.height]
# an ink version for the cork coaster (multiplied onto the cork, so it must be dark)
ink = Image.new("RGBA", l2.size, (61, 6, 18, 255)); ink.putalpha(l2.getchannel("A"))
ink.save(pub / "brand" / "logo-ink.png", optimize=True)
fork = Image.open(orig / "sigle-fourchette-png.png").convert("RGBA")
fork = fork.crop(fork.getchannel("A").getbbox())
for s in (32, 180, 512):
    tile = Image.new("RGBA", (s, s), (106, 7, 25, 255))
    f = fork.copy(); f.thumbnail((int(s * 0.72), int(s * 0.72)), Image.LANCZOS)
    tile.alpha_composite(f, ((s - f.width) // 2, (s - f.height) // 2))
    tile.save(pub / "brand" / f"favicon-{s}.png", optimize=True)
fm = fork.copy(); fm.thumbnail((240, 240), Image.LANCZOS); fm.save(pub / "brand" / "fork.webp", "WEBP", quality=90)
# share image: the terrace with the logo
og = ImageOps.fit(Image.open(orig / "IMG-20230320-WA0026.jpg").convert("RGB"), (1200, 630), Image.LANCZOS, centering=(0.5, 0.55))
shade = Image.new("RGBA", og.size, (61, 6, 18, 120)); og = Image.alpha_composite(og.convert("RGBA"), shade)
lg = logo.copy(); lg.thumbnail((640, 300), Image.LANCZOS); og.alpha_composite(lg, ((1200 - lg.width) // 2, (630 - lg.height) // 2))
og.convert("RGB").save(pub / "brand" / "og-image.jpg", quality=84)

(root / "src" / "data").mkdir(exist_ok=True)
(root / "src" / "data" / "image-sizes.json").write_text(json.dumps(sizes, indent=1))
print(len(PHOTOS), "photos;", 3, "wine images;", len(CUTS), "cut-outs; logo", l2.size)
