"""Prepares the restaurant's own images for the site (npm run images).

  media/source/1.webp … 7.webp   the seven gallery photos, downloaded from picapau.ch at full size
  media/source/oiseau.png        the logo (the bird), 1254 × 1254 with transparency
  media/cutouts/*.png            background removed with rembg (isnet-general-use), see --cutouts

Writes public/media/photos/<name>-<width>.webp, public/media/cutouts/<name>.webp, the logo in
public/brand/ and src/content/image-sizes.json (intrinsic sizes, so every image reserves its space).

  python3 scripts/prepare_images.py              photos, logo, favicons, cut-outs from media/cutouts
  python3 scripts/prepare_images.py --cutouts    also re-runs rembg first (needs `pip install rembg[cpu]`)
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media" / "source"
CUT_SRC = ROOT / "media" / "cutouts"
PUB = ROOT / "public"

# Live file number → name used on the new site (what each photo shows).
PHOTOS = {
    1: "gambas-ao-alho",
    2: "polvo-a-lagareiro",
    3: "peixe-grelhado",
    4: "pica-pau-companhia",
    5: "polvo-batatas",
    6: "bacalhau-a-braga",
    7: "salgados-presunto",
}
# Only the photos whose dish separates cleanly from its background.
CUTOUTS = {2: "polvo-a-lagareiro", 4: "pica-pau-companhia", 6: "bacalhau-a-braga", 7: "salgados-presunto"}
WIDTHS = (640, 960, 1200)  # <name>-640.webp, <name>-960.webp and <name>-lg.webp (the original size, at most 1200 px)


def photos(sizes):
    out = PUB / "media" / "photos"
    out.mkdir(parents=True, exist_ok=True)
    for number, name in PHOTOS.items():
        im = Image.open(SRC / f"{number}.webp").convert("RGB")
        sizes[f"photos/{name}"] = [im.width, im.height]
        for w in WIDTHS:
            target = im if w >= im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)  # never upscaled
            target.save(out / f"{name}-{'lg' if w == WIDTHS[-1] else w}.webp", "WEBP", quality=76, method=6)
        # a 24 px colour field shown while the photo loads
        sizes[f"photos/{name}:tone"] = "#%02x%02x%02x" % im.resize((1, 1), Image.LANCZOS).getpixel((0, 0))


def run_rembg():
    from rembg import new_session, remove

    CUT_SRC.mkdir(parents=True, exist_ok=True)
    session = new_session("isnet-general-use")
    for number, name in CUTOUTS.items():
        remove(Image.open(SRC / f"{number}.webp").convert("RGB"), session=session).save(CUT_SRC / f"{name}.png")


def largest_shape(alpha):
    """Mask of the biggest connected opaque shape (the plate or board), found on a 1/4-size grid."""
    import numpy as np

    small = alpha.resize((alpha.width // 4, alpha.height // 4), Image.BILINEAR)
    solid = np.array(small) > 128
    h, w = solid.shape
    label = np.zeros((h, w), dtype=np.int32)
    best, best_size, current = 0, 0, 0
    for y0, x0 in zip(*np.nonzero(solid)):
        if label[y0, x0]:
            continue
        current += 1
        stack, size = [(y0, x0)], 0
        label[y0, x0] = current
        while stack:
            y, x = stack.pop()
            size += 1
            for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= ny < h and 0 <= nx < w and solid[ny, nx] and not label[ny, nx]:
                    label[ny, nx] = current
                    stack.append((ny, nx))
        if size > best_size:
            best, best_size = current, size
    keep = Image.fromarray(((label == best) * 255).astype("uint8")).resize(alpha.size, Image.BILINEAR)
    return keep.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(2))


def cutouts(sizes):
    from PIL import ImageChops

    out = PUB / "media" / "cutouts"
    out.mkdir(parents=True, exist_ok=True)
    for name in CUTOUTS.values():
        im = Image.open(CUT_SRC / f"{name}.png").convert("RGBA")
        r, g, b, a = im.split()
        # drop the faint shadow rembg leaves under plates and any smear apart from the dish,
        # then soften the edge by half a pixel
        a = a.point(lambda v: 0 if v < 48 else min(255, int((v - 48) * 255 / 160)))
        a = ImageChops.multiply(a, largest_shape(a))
        a = a.filter(ImageFilter.GaussianBlur(0.6))
        im = Image.merge("RGBA", (r, g, b, a))
        im = im.crop(im.getbbox())
        im.thumbnail((900, 900), Image.LANCZOS)
        im.save(out / f"{name}.webp", "WEBP", quality=82, method=6)
        sizes[f"cutouts/{name}"] = [im.width, im.height]


def logo(sizes):
    brand = PUB / "brand"
    brand.mkdir(parents=True, exist_ok=True)
    im = Image.open(SRC / "oiseau.png").convert("RGBA")
    # the file carries a strip of stray half-transparent pixels along its bottom edge: keep the bird only
    bird = im.crop((0, 0, im.width, 1100))
    alpha = bird.split()[3].point(lambda v: 255 if v > 20 else 0)
    box = alpha.getbbox()
    bird = bird.crop(box)
    pad = round(max(bird.size) * 0.04)
    canvas = Image.new("RGBA", (bird.width + 2 * pad, bird.height + 2 * pad), (0, 0, 0, 0))
    canvas.paste(bird, (pad, pad))
    sizes["brand/oiseau"] = [canvas.width, canvas.height]
    for w in (160, 480, 960):
        t = canvas.resize((w, round(canvas.height * w / canvas.width)), Image.LANCZOS)
        t.save(brand / f"oiseau-{w}.webp", "WEBP", quality=88, method=6)
    canvas.resize((512, round(canvas.height * 512 / canvas.width)), Image.LANCZOS).save(brand / "oiseau-512.png", optimize=True)
    # favicons: the bird on tile blue
    for size, name in ((32, "favicon-32.png"), (180, "favicon-180.png"), (512, "icon-512.png")):
        tile = Image.new("RGBA", (size, size), (31, 78, 153, 255))
        b = canvas.copy()
        b.thumbnail((round(size * 0.84), round(size * 0.84)), Image.LANCZOS)
        tile.alpha_composite(b, ((size - b.width) // 2, (size - b.height) // 2))
        tile.convert("RGB").save(brand / name, optimize=True)


def main():
    if "--cutouts" in sys.argv:
        run_rembg()
    sizes = {}
    photos(sizes)
    cutouts(sizes)
    logo(sizes)
    target = ROOT / "src" / "content" / "image-sizes.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(sizes, indent=1) + "\n")
    print(f"{len(PHOTOS)} photos, {len(CUTOUTS)} cut-outs, logo + favicons → public/")


if __name__ == "__main__":
    main()
