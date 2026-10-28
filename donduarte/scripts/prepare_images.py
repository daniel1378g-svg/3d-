"""Turns the restaurant's own images (media/original) into web images (public/images, public/brand).

Usage: python3 -I scripts/prepare_images.py
"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
src = root / "media" / "original"
img = root / "public" / "images"
brand = root / "public" / "brand"
img.mkdir(parents=True, exist_ok=True)
brand.mkdir(parents=True, exist_ok=True)

def webp(path, name, width, quality=80):
    im = Image.open(path).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(img / f"{name}.webp", "WEBP", quality=quality, method=6)
    return im.size

sizes = {}
# The eight photos of the home page category blocks.
for file, name in [("terrre_et_mer-1.jpg", "cat-specialites"), ("francesihna-1.jpg", "cat-francesinha"), ("Pizza_jambon_fromage-1.jpg", "cat-pizzas"),
                   ("spaghetti_bolognese-1.jpg", "cat-pates"), ("poulpe-1.jpg", "cat-poissons"), ("carne_de_porco_alentejana-1.jpg", "cat-viandes"),
                   ("vins.jpeg", "cat-vins"), ("desserts.jpeg", "cat-desserts"), ("food-11.jpg", "bg-food"), ("restaurant_interieur-e1617739079412.jpeg", "bg-salle")]:
    sizes[name] = webp(src / "site" / file, name, 960)
for f in sorted((src / "pdf-desserts-2024").glob("*.jpg")):
    room = f.stem in ("salle-1", "salle-2", "table-longue", "terrasse")
    sizes[f.stem] = webp(f, f.stem if room else f"dessert-{f.stem}", 1280 if room else 720)
for f in sorted((src / "pdf-menu-2024").glob("*.jpg")):
    sizes[f.stem] = webp(f, f"plat-{f.stem}", 720)

# Logo: white ground → alpha ("colour to alpha"), so it sits cleanly on any tile or colour.
logo = Image.open(src / "site" / "logo-1.png").convert("RGB")
px = logo.load()
out = Image.new("RGBA", logo.size)
po = out.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b = px[x, y]
        a = 1 - min(r, g, b) / 255
        if a < 0.02:
            po[x, y] = (0, 0, 0, 0)
            continue
        un = lambda c: max(0, min(255, round((c - (1 - a) * 255) / a)))
        po[x, y] = (un(r), un(g), un(b), round(a * 255))
out = out.crop(out.getbbox())
out.save(brand / "logo.png", optimize=True)
out.save(brand / "logo.webp", "WEBP", quality=90, method=6)
sizes["logo"] = out.size

# Favicon: the logo's crown on an azulejo-blue tile.
crown = out.crop((0, 0, out.width, round(out.height * 0.42)))
crown = crown.crop(crown.getbbox())
for size in (32, 180, 512):
    tile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    from PIL import ImageDraw
    d = ImageDraw.Draw(tile)
    d.rounded_rectangle((0, 0, size - 1, size - 1), radius=round(size * 0.18), fill=(247, 242, 232, 255), outline=(29, 78, 158, 255), width=max(2, size // 16))
    w = round(size * 0.78)
    c = crown.resize((w, round(crown.height * w / crown.width)), Image.LANCZOS)
    tile.alpha_composite(c, ((size - c.width) // 2, (size - c.height) // 2))
    tile.save(brand / f"favicon-{size}.png", optimize=True)

Image.open(src / "site" / "Capture-1024x404.png").convert("RGB").save(brand / "og-image.jpg", "JPEG", quality=85)
for k, v in sizes.items():
    print(k, v)
