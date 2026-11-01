# Originals (media/originals, from `npm run fetch`) → public/images/<id>-<w>.{avif,webp} and src/data/images.json.
#
#   widths 480 / 960 / 1440 / 2400 (BRIEF §6), never wider than the original (the 1600 px sets stop at 1440 plus
#   their own width); the hero also gets 1600 w, with the AVIF quality searched so that file stays ≤ 180 KB (LCP)
#   one shared, gentle colour grade for all sets (a soft S-curve and a little warmth) – no AI upscaling, no fill
#   AVIF (quality 55) + WebP (quality 78), sRGB, no metadata; aspect ratio kept (crops happen in CSS with a focal point)
#   images.json: width, height, dominant colour, a 16 px blurred placeholder and the focal point per image
#
# Also prepares the logo (public/brand): the restaurant's 300 px PNG as published, and a 700 px transparent version
# made from the 700 × 700 logo of the restaurant's own business listing (white turned into transparency, colours
# untouched), plus favicons.
import base64, io, json, os, sys
from PIL import Image, ImageCms, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "media/originals")
OUT = os.path.join(ROOT, "public/images")
BRAND = os.path.join(ROOT, "public/brand")
os.makedirs(OUT, exist_ok=True)
os.makedirs(BRAND, exist_ok=True)
SRGB = ImageCms.createProfile("sRGB")

def to_srgb(im):
    icc = im.info.get("icc_profile")
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            if "sRGB" not in (ImageCms.getProfileDescription(src) or ""):
                im = ImageCms.profileToProfile(im, src, SRGB, outputMode="RGB")
        except Exception:
            pass
    return im.convert("RGB")

# the shared grade: identical for every photograph
_CURVE = [max(0, min(255, round(255 * (x / 255 + 0.035 * __import__("math").sin(2 * __import__("math").pi * x / 255) * -1)))) for x in range(256)]
_LUT = [min(255, round(v * 1.012)) for v in _CURVE] + _CURVE + [round(v * 0.985) for v in _CURVE]
def grade(im):
    return im.point(_LUT)

def dominant(im):
    small = im.resize((32, 32), Image.LANCZOS).quantize(colors=6, method=Image.Quantize.MEDIANCUT)
    pal = small.getpalette()
    counts = sorted(small.getcolors(), reverse=True)
    r, g, b = pal[counts[0][1] * 3: counts[0][1] * 3 + 3]
    return f"#{r:02x}{g:02x}{b:02x}"

def lqip(im):
    t = im.copy()
    t.thumbnail((16, 16), Image.LANCZOS)
    buf = io.BytesIO()
    t.save(buf, "WEBP", quality=40, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()

assets = json.load(open(os.path.join(ROOT, "content/assets.json"), encoding="utf-8"))["assets"]
data = {}
total = 0
for a in assets:
    path = os.path.join(SRC, a["file"])
    if not os.path.exists(path):
        sys.exit(f"missing {path} – run `npm run fetch` first")
    im = to_srgb(Image.open(path))
    if a["id"] != "family-destination":
        im = grade(im)
    W, H = im.size
    widths = [w for w in (480, 960, 1440, 2400) if w <= W]
    if W < 2400 and W not in widths:
        widths.append(W)
    if a.get("hero") and W >= 1600:
        widths.append(1600)
    widths = sorted(set(widths))
    srcset = []
    for w in widths:
        h = round(H * w / W)
        r = None
        for ext in ("avif", "webp"):
            dest = os.path.join(OUT, f"{a['id']}-{w}.{ext}")
            if not os.path.exists(dest):
                if r is None:
                    r = im.resize((w, h), Image.LANCZOS)
                    if w < W:
                        r = r.filter(ImageFilter.UnsharpMask(radius=0.6, percent=40, threshold=2))
                if ext == "webp":
                    r.save(dest, "WEBP", quality=78 if w <= 1600 else 74, method=6)
                elif a.get("hero") and w in (960, 1440, 1600):
                    # LCP candidates (the home hero: 960 w on phones, 1440/1600 w on larger screens): the best quality
                    # within 80 KB at 960 w and 180 KB above
                    limit = 80_000 if w == 960 else 180_000
                    for q in (60, 55, 50, 46, 42, 38, 34, 30):
                        r.save(dest, "AVIF", quality=q, speed=4)
                        if os.path.getsize(dest) <= limit:
                            break
                else:
                    r.save(dest, "AVIF", quality=55 if w <= 1600 else 50, speed=6)
            total += os.path.getsize(dest)
        srcset.append(w)
    data[a["id"]] = {"w": W, "h": H, "color": dominant(im), "lqip": lqip(im), "widths": srcset, "focus": a.get("focus", "50% 50%"), "category": a["category"], "year": a["year"]}
    print(f"{a['id']:24s} {W}x{H} → {srcset}")

os.makedirs(os.path.join(ROOT, "src/data"), exist_ok=True)
json.dump(data, open(os.path.join(ROOT, "src/data/images.json"), "w"), indent=0)
print(f"{len(data)} images, {total / 1e6:.1f} MB of AVIF + WebP")

# ---- logo -------------------------------------------------------------------------------------------------------
logo_src = os.path.join(SRC, "logo.png")
myls = os.path.join(SRC, "logo-myls-700.png")
if os.path.exists(logo_src):
    Image.open(logo_src).save(os.path.join(BRAND, "logo-300.png"), optimize=True)
if os.path.exists(myls):
    im = Image.open(myls).convert("RGB")
    # white → transparent ("colour to alpha"): alpha = how far the pixel is from white; colour un-premultiplied
    px = im.load()
    W, H = im.size
    out = Image.new("RGBA", (W, H))
    po = out.load()
    for y in range(H):
        for x in range(W):
            r, g, b = px[x, y]
            a = max(255 - r, 255 - g, 255 - b)
            if a == 0:
                po[x, y] = (0, 0, 0, 0)
                continue
            af = a / 255
            un = lambda c: max(0, min(255, round((c - 255 * (1 - af)) / af)))
            po[x, y] = (un(r), un(g), un(b), a)
    bbox = out.getbbox()
    out = out.crop((0, bbox[1], W, bbox[3]))
    out.save(os.path.join(BRAND, "logo-700.png"), optimize=True)
    out.save(os.path.join(BRAND, "logo-700.webp"), "WEBP", quality=92, method=6)
    half = out.resize((350, round(out.height * 350 / out.width)), Image.LANCZOS)
    half.save(os.path.join(BRAND, "logo-350.webp"), "WEBP", quality=92, method=6)
    print("logo", out.size)
