"""content/assets.json + media/originals → optimized derivatives:
  public/images/<id>-<w>.webp   480 / 960 / 1600 px (never upscaled), EXIF orientation applied, alpha kept
  src/data/images.json          id → width, height, widths, alpha, 16 px blurred placeholder, category
  public/brand/                 the Manna logo (trimmed) as WebP/PNG and favicons
  public/video/<id>.mp4|.webm   the two shop clips, muted, 720 px, plus a WebP poster
Only assets with "public": true are processed. Originals come from `npm run fetch`.

Run: python3 -I scripts/prepare_images.py
"""
import base64, io, json, shutil, subprocess
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
INV = json.loads((ROOT / "content/assets.json").read_text(encoding="utf-8"))["assets"]
OUT = ROOT / "public/images"; OUT.mkdir(parents=True, exist_ok=True)
VID = ROOT / "public/video"; VID.mkdir(parents=True, exist_ok=True)
BRAND = ROOT / "public/brand"; BRAND.mkdir(parents=True, exist_ok=True)
WIDTHS = [480, 960, 1600]

manifest = {}
for a in INV:
    if not a["public"] or a["category"] in ("video",) or a["id"] == "logo":
        continue
    src = ROOT / a["file"]
    im = ImageOps.exif_transpose(Image.open(src))
    alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if alpha else "RGB")
    if alpha and im.getextrema()[3][0] == 255:
        im = im.convert("RGB"); alpha = False
    w, h = im.size
    widths = sorted({min(w, x) for x in WIDTHS})
    for x in widths:
        im.resize((x, round(h * x / w)), Image.LANCZOS).save(OUT / f"{a['id']}-{x}.webp", "WEBP", quality=82 if not alpha else 86, method=6)
    tiny = im.convert("RGB").resize((16, max(1, round(16 * h / w))), Image.LANCZOS)
    buf = io.BytesIO(); tiny.save(buf, "WEBP", quality=40)
    manifest[a["id"]] = {"w": w, "h": h, "widths": widths, "alpha": alpha, "category": a["category"],
                         "blur": "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()}
    print(f"{a['id']:28} {w}x{h} → {widths}")

data = ROOT / "src/data"; data.mkdir(parents=True, exist_ok=True)
(data / "images.json").write_text(json.dumps(manifest, indent=1), encoding="utf-8")
print(len(manifest), "images")

# logo: the transparent "Manna açaiteria" artwork, trimmed, plus favicons on a cream disc
logo = Image.open(ROOT / "media/originals/logo.png").convert("RGBA")
logo = logo.crop(logo.getbbox())
for w in (320, 640):
    l = logo.copy(); l.thumbnail((w, w * 2), Image.LANCZOS)
    l.save(BRAND / f"logo-{w}.webp", "WEBP", quality=90, method=6)
logo.copy().resize((640, round(640 * logo.height / logo.width)), Image.LANCZOS).save(BRAND / "logo.png", optimize=True)
print("logo", logo.size)
for s in (32, 180, 512):
    c = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    from PIL import ImageDraw
    ImageDraw.Draw(c).ellipse((0, 0, s - 1, s - 1), fill=(255, 247, 237, 255))
    l = logo.copy(); l.thumbnail((int(s * 0.82), int(s * 0.82)), Image.LANCZOS)
    c.alpha_composite(l, ((s - l.width) // 2, (s - l.height) // 2))
    c.save(BRAND / f"favicon-{s}.png", optimize=True)

# clips: muted, ≤ 720 px, H.264 + VP9, poster
if shutil.which("ffmpeg"):
    for a in INV:
        if a["category"] != "video" or not a["public"]:
            continue
        src = ROOT / a["file"]
        base = VID / a["id"]
        vf = "scale='min(640,iw)':-2,fps=30"
        cut = ["-t", "14"] if a["id"] == "clip-acai-becher" else []  # the layering part of the 35 s clip
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), *cut, "-an", "-vf", vf, "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p", "-crf", "30", "-preset", "slow", "-movflags", "+faststart", f"{base}.mp4"], check=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), *cut, "-an", "-vf", vf, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "42", "-row-mt", "1", f"{base}.webm"], check=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "1.2", "-i", str(src), "-frames:v", "1", "-vf", "scale='min(720,iw)':-2", str(base) + "-poster.png"], check=True)
        Image.open(f"{base}-poster.png").save(f"{base}-poster.webp", "WEBP", quality=78)
        Path(f"{base}-poster.png").unlink()
        print(a["id"], (Path(f"{base}.mp4").stat().st_size // 1024), "KB mp4,", (Path(f"{base}.webm").stat().st_size // 1024), "KB webm")
