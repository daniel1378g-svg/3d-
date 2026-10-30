"""media/originals → public/images/<id>-<w>.webp (480 / 960 / 1600 px, never upscaled) and src/data/images.json
(id → width, height, available widths, a 16 px blurred placeholder as a data URL). Transparent PNG cut-outs keep
their alpha. Also writes the restaurant clip as a small MP4 + poster (needs ffmpeg).

Run: python3 -I scripts/prepare_images.py
"""
import base64, io, json, re, subprocess, shutil
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media/originals"
OUT = ROOT / "public/images"
OUT.mkdir(parents=True, exist_ok=True)
WIDTHS = [480, 960, 1600]

def ident(name: str) -> str | None:
    stem = Path(name).stem
    if name.startswith("site__images_content_"): return stem.replace("site__images_content_", "")
    if name.startswith("site__images_modules_"): return stem.replace("site__images_modules_", "").lower()
    if name.startswith("site__images_headers_"): return "header-" + stem.replace("site__images_headers_", "").replace("boinabrasa_", "")
    if name.startswith("site__images_teaser_"): return "cutout-" + stem.replace("site__images_teaser_", "")
    if name.startswith("coupons__vouchers_"): return "voucher-" + stem.replace("coupons__vouchers_", "")
    m = re.match(r"churrascocatering__wp-content_uploads_\d{4}_\d{2}_(Impression(?:en-\d+)?|KT_172521_DS7I2371-scaled|ca_churrasco_standard)", stem)
    if m:
        return {"Impression": "catering-impression", "KT_172521_DS7I2371-scaled": "catering-hall", "ca_churrasco_standard": "catering-grill"}.get(m.group(1), "catering-" + m.group(1).lower())
    if name == "site__images_gmap.png": return "map"
    if name == "site__silvester_2026.png": return "silvester-2026"
    if name == "site__templates_boinabrasa_img_introvideo_wallpaper.png": return "intro-wallpaper"
    if name == "dielsdorf__images_boinabrasa_reservation_tische.png": return "reservation-tables"
    return None

manifest = {}
for f in sorted(SRC.iterdir()):
    if f.suffix.lower() not in (".jpg", ".jpeg", ".png"): continue
    key = ident(f.name)
    if not key: continue
    im = Image.open(f)
    im = ImageOps.exif_transpose(im)
    alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if alpha else "RGB")
    if alpha and im.getextrema()[3][0] == 255:  # opaque PNG: drop the channel
        im = im.convert("RGB"); alpha = False
    w, h = im.size
    widths = sorted({min(w, x) for x in WIDTHS})
    for x in widths:
        y = round(h * x / w)
        im.resize((x, y), Image.LANCZOS).save(OUT / f"{key}-{x}.webp", "WEBP", quality=80 if not alpha else 85, method=6)
    tiny = im.resize((16, max(1, round(16 * h / w))), Image.LANCZOS)
    buf = io.BytesIO(); tiny.save(buf, "WEBP", quality=40)
    manifest[key] = {"w": w, "h": h, "widths": widths, "alpha": alpha, "blur": "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()}
    print(f"{key:34} {w}x{h} → {widths}")

data = ROOT / "src/data"; data.mkdir(parents=True, exist_ok=True)
(data / "images.json").write_text(json.dumps(manifest, indent=1), encoding="utf-8")
print(len(manifest), "images")

# The restaurant's own clip (webclip.mp4, 1280x720, 20 s): a 960 px H.264 without sound, plus its poster.
clip = SRC / "site__templates_boinabrasa_img_webclip.mp4"
if clip.exists() and shutil.which("ffmpeg"):
    vid = ROOT / "public/video"; vid.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(clip), "-an", "-vf", "scale=960:-2,fps=30", "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p", "-crf", "27", "-preset", "slow", "-movflags", "+faststart", str(vid / "rodizio-960.mp4")], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "0.6", "-i", str(clip), "-frames:v", "1", "-vf", "scale=960:-2", str(vid / "rodizio-poster.jpg")], check=True)
    Image.open(vid / "rodizio-poster.jpg").save(vid / "rodizio-poster.webp", "WEBP", quality=78)
    (vid / "rodizio-poster.jpg").unlink()
    print("video", (vid / "rodizio-960.mp4").stat().st_size // 1024, "KB")
