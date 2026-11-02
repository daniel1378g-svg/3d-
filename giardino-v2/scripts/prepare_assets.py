"""Prepares the site's images (run from giardino-v2/: python3 -I scripts/prepare_assets.py).

1. Photographs: the restaurant's own photos, already optimised by the earlier proposal (../giardino/public/images,
   AVIF + WebP at 480/960/1440/1600/2400 px, never enlarged beyond the original) are copied to public/images, and
   src/content/photos.json is written from ../giardino/content/assets.json (4-language alt text, category, focus,
   credit) with the widths that exist for each photo and its true aspect ratio.
   Left out: the three 2016 photos with identifiable children (consent to be reconfirmed by the owners) and the
   Family Destination graphic.
2. Logo: media/brand/logo-original.png is the official logo.png (300 x 153) from pizzeriagiardino.ch. It is never
   distorted. Derived files: a 2x copy for sharp display, a light version for dark grounds (the charcoal ink becomes
   cream, the sage script keeps its colour), the tree alone and the script lockup alone (both light), favicons.
"""
import json, os, re, shutil, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "..", "giardino")
EXCLUDE = {"pirate-kids", "pirate-climb", "pirate-slide", "family-destination"}
GROUP = {"food": "food", "ambience": "restaurant", "terrace": "restaurant", "hosts": "restaurant", "kids": "families"}

def photos():
    assets = json.load(open(os.path.join(SRC, "content", "assets.json"), encoding="utf-8"))["assets"]
    src_dir = os.path.join(SRC, "public", "images")
    out_dir = os.path.join(ROOT, "public", "images")
    os.makedirs(out_dir, exist_ok=True)
    have = {}
    for f in os.listdir(src_dir):
        m = re.match(r"(.+)-(\d+)\.(webp|avif)$", f)
        if m:
            have.setdefault(m.group(1), {}).setdefault(m.group(3), []).append(int(m.group(2)))
    out = []
    for a in assets:
        pid = a["id"]
        if pid in EXCLUDE or pid not in have:
            continue
        widths = sorted(set(have[pid].get("webp", [])) & set(have[pid].get("avif", [])))
        for w in widths:
            for fmt in ("webp", "avif"):
                name = f"{pid}-{w}.{fmt}"
                dst = os.path.join(out_dir, name)
                if not os.path.exists(dst):
                    shutil.copyfile(os.path.join(src_dir, name), dst)
        big = Image.open(os.path.join(src_dir, f"{pid}-{widths[-1]}.webp"))
        out.append({
            "id": pid,
            "w": big.width,
            "h": big.height,
            "widths": widths,
            "group": GROUP[a["category"]],
            "year": a["year"],
            "focus": a.get("focus") or "50% 50%",
            "alt": a["alt"],
            "credit": a.get("credit"),
            "people": a.get("people"),
        })
    with open(os.path.join(ROOT, "src", "content", "photos.json"), "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
    print(f"{len(out)} photos, {len(os.listdir(out_dir))} files in public/images")

def recolor_light(im):
    """Charcoal ink -> cream (#F3F2E1); the sage script keeps its colour. Alpha is untouched."""
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            sat = max(r, g, b) - min(r, g, b)
            lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255
            if lum < 0.5:  # tree, shadow, PIZZERIA: dark ink -> cream, darker ink stays a touch warmer
                t = min(1.0, lum / 0.5)
                c = (int(243 - 20 * t), int(242 - 22 * t), int(225 - 30 * t))
                px[x, y] = (*c, a)
            elif sat < 18:  # light neutral anti-aliasing -> cream
                px[x, y] = (243, 242, 225, a)
            else:  # the sage script and rule: keep
                pass
    return im

def logo():
    src = Image.open(os.path.join(ROOT, "media", "brand", "logo-original.png")).convert("RGBA")
    out = os.path.join(ROOT, "public", "brand")
    os.makedirs(out, exist_ok=True)
    W, H = src.size  # 300 x 153
    big = src.resize((W * 2, H * 2), Image.LANCZOS)
    big.save(os.path.join(out, "logo.png"), optimize=True)
    big.save(os.path.join(out, "logo.webp"), quality=92, method=6)
    light = recolor_light(big.copy())
    light.save(os.path.join(out, "logo-light.png"), optimize=True)
    light.save(os.path.join(out, "logo-light.webp"), quality=92, method=6)
    # the tree: rows above the script; the script lockup: the rest
    alpha = light.split()[3]
    tree_bottom = None
    rows = [sum(1 for x in range(light.width) if alpha.getpixel((x, y)) > 40) for y in range(light.height)]
    # first sparse row gap after the tree's ground shadow (the tree sits in the top ~52 %)
    for y in range(int(light.height * 0.40), int(light.height * 0.62)):
        if rows[y] < 6:
            tree_bottom = y
            break
    tree_bottom = tree_bottom or int(light.height * 0.53)
    # the tree stands in the middle third; the script's "G" rises to the left of it
    x0, x1 = int(light.width * 0.30), int(light.width * 0.72)
    tree = light.crop((x0, 0, x1, tree_bottom))
    tree = tree.crop(tree.getbbox())
    side = max(tree.size) + 12
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.paste(tree, ((side - tree.width) // 2, (side - tree.height) // 2))
    sq.save(os.path.join(out, "tree-light.png"), optimize=True)
    sq.save(os.path.join(out, "tree-light.webp"), quality=92, method=6)
    word = light.copy()
    clear = Image.new("RGBA", (x1 - x0, tree_bottom), (0, 0, 0, 0))
    word.paste(clear, (x0, 0))
    word = word.crop(word.getbbox())
    word.save(os.path.join(out, "wordmark-light.png"), optimize=True)
    word.save(os.path.join(out, "wordmark-light.webp"), quality=92, method=6)
    # favicons: the tree on the logo's dark green (#29381B)
    for size, name in ((32, "favicon-32.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        ic = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        disc = Image.new("RGBA", (size * 4, size * 4), (0, 0, 0, 0))
        from PIL import ImageDraw
        ImageDraw.Draw(disc).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=(41, 56, 27, 255))
        disc = disc.resize((size, size), Image.LANCZOS)
        ic.alpha_composite(disc)
        t = sq.copy()
        t.thumbnail((int(size * 0.72), int(size * 0.72)), Image.LANCZOS)
        ic.alpha_composite(t, ((size - t.width) // 2, (size - t.height) // 2))
        ic.save(os.path.join(out, name), optimize=True)
    print("logo:", big.size, "tree:", sq.size, "wordmark:", word.size, "tree cut at", tree_bottom)

if __name__ == "__main__":
    photos()
    logo()
