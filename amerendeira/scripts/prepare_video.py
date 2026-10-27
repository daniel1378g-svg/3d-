"""Prepare the supplied pão com chouriço video for the scroll-driven hero.

Input : media/original/pao-com-chourico-carvao.mov (1248×704, 24 fps, 193 frames, charcoal
        backdrop). The previous light-grey clip (pao-com-chourico.mp4) is kept for reference.
Output: public/videos/...
  sequence/{desktop,mobile}/f_000.webp  every frame of the clip, alpha-feathered edges
  sequence/plates.webp                  per-frame background plate sprite (bread removed)
  sequence/manifest.json                frame count, fps, layout, plate geometry
  poster/cover-*.{avif,webp,jpg}        first frame (intro, hero LCP, static fallback)
  poster/final-*.{avif,webp,jpg}        last frame (conclusion, reduced-motion still)
  poster/final-surround.webp            the last frame's background, 25 % wider on every side
                                        and fading into the page colour: with reduced motion
                                        (no plate canvas) it sits under the still, so the still
                                        has no visible edge

The clip is cropped to 16:9 (1248×702, one row off the top and bottom) so the frames keep the
window's proportions. The backdrop is a neutral charcoal, so the "plate" is the frame with the
bread removed (normalised convolution over low-chroma pixels). The page extends that real
background beyond the frame edges, so the frame has no visible border.
"""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import gaussian_filter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media/original/pao-com-chourico-carvao.mov"
OUT = ROOT / "public/videos"
SEQ = OUT / "sequence"
POSTER = OUT / "poster"

SIZES = {"desktop": 1248, "mobile": 960}
CROP = "crop=1248:702:0:1"           # 1248×704 → 16:9
POSTERS = [1280, 960]              # names used by the page (1280 is the frame, slightly enlarged)
FEATHER = {"left": 0.02, "right": 0.02, "top": 0.09, "bottom": 0.06}
PLATE_W, PLATE_H = 128, 72         # background tile per frame
CHROMA_BG = 14                     # max(rgb) - min(rgb) below this is studio background


def smooth(t):
    t = np.clip(t, 0, 1)
    return t * t * (3 - 2 * t)


def feather_mask(w, h):
    x = np.arange(w) + 0.5
    y = np.arange(h) + 0.5
    mx = smooth(np.minimum(x / (FEATHER["left"] * w), (w - x) / (FEATHER["right"] * w)))
    my = smooth(np.minimum(y / (FEATHER["top"] * h), (h - y) / (FEATHER["bottom"] * h)))
    return (my[:, None] * mx[None, :] * 255).round().astype(np.uint8)


def background_plate(rgb: np.ndarray) -> np.ndarray:
    """Frame with the bread replaced by the surrounding background, at PLATE size."""
    small = np.asarray(Image.fromarray(rgb).resize((PLATE_W * 2, PLATE_H * 2), Image.BOX), np.float32)
    chroma = small.max(2) - small.min(2)
    m = (chroma < CHROMA_BG).astype(np.float32)
    out = None
    for s in (24, 12, 6, 3, 1.5):
        d = gaussian_filter(m, s, mode="nearest")
        n = np.stack([gaussian_filter(small[..., c] * m, s, mode="nearest") for c in range(3)], -1)
        est = n / np.maximum(d, 1e-6)[..., None]
        if out is None:
            out = est
            continue
        w = np.clip(d / 0.3, 0, 1)[..., None]
        out = w * est + (1 - w) * out
    keep = m[..., None] > 0.5
    out = np.where(keep, small, out)
    # The page continues the plate from its outermost rows/columns, but those rows sit under the
    # frame's feathered edge and are darker (vignette). Clamp the outer band to the values where
    # the frame becomes fully opaque, so the continuation starts exactly where the eye sees it.
    hh, ww = out.shape[:2]
    top = int(round(FEATHER["top"] * hh))
    bot = hh - 1 - int(round(FEATHER["bottom"] * hh))
    left = int(round(FEATHER["left"] * ww))
    right = ww - 1 - int(round(FEATHER["right"] * ww))
    out[:top] = out[top]
    out[bot + 1:] = out[bot]
    out[:, :left] = out[:, left:left + 1]
    out[:, right + 1:] = out[:, right:right + 1]
    img = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    tile = np.asarray(img.resize((PLATE_W, PLATE_H), Image.BOX), np.float32)
    # The page stretches the outer rows/columns outwards, so smooth them along the edge to avoid
    # streaks (vertical smoothing on the side columns, horizontal on the top/bottom rows).
    band = 3
    tile[:, :band] = gaussian_filter(tile[:, :band], (2.2, 0, 0), mode="nearest")
    tile[:, -band:] = gaussian_filter(tile[:, -band:], (2.2, 0, 0), mode="nearest")
    tile[:band] = gaussian_filter(tile[:band], (0, 2.2, 0), mode="nearest")
    tile[-band:] = gaussian_filter(tile[-band:], (0, 2.2, 0), mode="nearest")
    return np.clip(tile, 0, 255).astype(np.uint8)


def surround(tile: np.ndarray) -> Image.Image:
    """Background plate extended by 25 % on each side, fading into the page colour outwards."""
    a = np.asarray(Image.fromarray(tile).resize((640, 360), Image.BICUBIC), np.float32)
    px, py = 160, 90
    ext = np.pad(a, ((py, py), (px, px), (0, 0)), mode="edge")
    hh, ww = ext.shape[:2]
    y = np.arange(hh) + 0.5
    x = np.arange(ww) + 0.5
    wy = smooth(1 + np.minimum(np.minimum(y - py, hh - py - y), 0) / py)
    wx = smooth(1 + np.minimum(np.minimum(x - px, ww - px - x), 0) / px)
    w = (wy[:, None] * wx[None, :])[..., None]
    page = np.array([25, 25, 25], np.float32)
    ext = gaussian_filter(ext * w + page * (1 - w), (4, 4, 0))
    return Image.fromarray(np.clip(ext + 0.5, 0, 255).astype(np.uint8))


def save_set(img: Image.Image, base: Path, widths):
    for w in widths:
        r = img if img.width == w else img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)
        r.save(f"{base}-{w}.avif", quality=60, speed=4)
        r.save(f"{base}-{w}.webp", quality=82, method=6)
        r.save(f"{base}-{w}.jpg", quality=84, optimize=True, progressive=True)


def main():
    if not SRC.exists():
        sys.exit(f"missing {SRC}")
    for d in (SEQ / "desktop", SEQ / "mobile"):
        shutil.rmtree(d, ignore_errors=True)
        d.mkdir(parents=True)
    POSTER.mkdir(parents=True, exist_ok=True)
    for old in [*POSTER.glob("cover-*"), *POSTER.glob("final-*")]:
        old.unlink()  # the caldo verde posters in the same folder are left alone

    probe = json.loads(subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v", "-count_frames", "-show_entries",
         "stream=width,height,r_frame_rate,nb_read_frames,duration", "-of", "json", str(SRC)],
        capture_output=True, check=True, text=True).stdout)["streams"][0]
    num, den = map(int, probe["r_frame_rate"].split("/"))
    fps = num / den

    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["ffmpeg", "-v", "error", "-i", str(SRC), "-vf", CROP, "-vsync", "0", f"{tmp}/%04d.png"], check=True)
        frames = sorted(Path(tmp).glob("*.png"))
        n = len(frames)
        cols = 16
        rows = -(-n // cols)
        sprite = Image.new("RGB", (cols * PLATE_W, rows * PLATE_H))
        masks = {k: feather_mask(w, round(w * 9 / 16)) for k, w in SIZES.items()}
        for i, fp in enumerate(frames):
            im = Image.open(fp).convert("RGB")
            rgb = np.asarray(im)
            for key, w in SIZES.items():
                h = round(w * 9 / 16)
                r = im.resize((w, h), Image.LANCZOS)
                rgba = Image.fromarray(np.dstack([np.asarray(r), masks[key]]), "RGBA")
                rgba.save(SEQ / key / f"f_{i:03d}.webp", quality=74 if key == "desktop" else 72,
                          alpha_quality=70, method=5)
            sprite.paste(Image.fromarray(background_plate(rgb)), ((i % cols) * PLATE_W, (i // cols) * PLATE_H))
            if i == 0:
                save_set(im, POSTER / "cover", POSTERS)
            if i == n - 1:
                save_set(im, POSTER / "final", POSTERS)
                surround(background_plate(rgb)).save(POSTER / "final-surround.webp", quality=86, method=6)
            if i % 24 == 0:
                print(f"frame {i}/{n}", flush=True)
        sprite.save(SEQ / "plates.webp", quality=88, method=6)

    manifest = {
        "source": "media/original/pao-com-chourico-carvao.mov", "crop": CROP,
        "fps": fps, "frames": n, "duration": n / fps,
        "segment": {"start": 0, "end": n / fps, "note": "clip inteiro; mapeamento por troços em src/lib/videoTimeline.ts"},
        "sizes": {k: {"width": w, "height": round(w * 9 / 16), "path": f"/videos/sequence/{k}/f_{{i}}.webp"} for k, w in SIZES.items()},
        "feather": FEATHER,
        "plates": {"path": "/videos/sequence/plates.webp", "tile": [PLATE_W, PLATE_H], "cols": cols},
        "bytes": {k: sum(p.stat().st_size for p in (SEQ / k).glob("*.webp")) for k in SIZES},
    }
    (SEQ / "manifest.json").write_text(json.dumps(manifest, indent=1))
    print(json.dumps(manifest["bytes"]))


if __name__ == "__main__":
    main()
