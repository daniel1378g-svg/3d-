"""Prepare the supplied pão com chouriço video for the scroll-driven hero.

Input : media/original/pao-com-chourico.mp4 (1920×1080, 24 fps, 193 frames, H.264 with a
        single keyframe, AAC audio)
Output: public/videos/...
  sequence/{desktop,mobile}/f_000.webp  every frame of the clip, alpha-feathered edges
  sequence/plates.webp                  per-frame background plate sprite (bread removed)
  sequence/manifest.json                frame count, fps, layout, plate geometry
  poster/cover-*.{avif,webp,jpg}        first frame (intro, hero LCP, static fallback)
  poster/final-*.{avif,webp,jpg}        last frame (conclusion, reduced-motion fallback)
  pao-com-chourico-720p.mp4             silent H.264, keyframe every 4 frames (inline player)
  ../images/cutouts/pao-com-chourico.webp  clean cut-out of the baked loaf (chroma key)

The background of the clip is a neutral studio grey, so the "plate" is the frame with the
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
from scipy.ndimage import binary_closing, binary_fill_holes, binary_opening, gaussian_filter, label

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media/original/pao-com-chourico.mp4"
OUT = ROOT / "public/videos"
SEQ = OUT / "sequence"
POSTER = OUT / "poster"
CUT = ROOT / "public/images/cutouts"

SIZES = {"desktop": 1280, "mobile": 960}
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


def cutout(rgb: np.ndarray) -> Image.Image:
    """Chroma-key the loaf from the neutral backdrop; drop the neutral shadow and steam."""
    f = rgb.astype(np.float32)
    chroma = f.max(2) - f.min(2)
    # Crust edge chroma >= 58, contact shadow 13-36, studio backdrop < 14.
    core = chroma > 42
    core = binary_closing(core, iterations=6)
    core = binary_fill_holes(core)
    lab, n = label(core)
    if n > 1:
        sizes = np.bincount(lab.ravel())
        sizes[0] = 0
        core = lab == sizes.argmax()
    # Near the base, the warm contact shadow can still pass the chroma test as a thin strip.
    # A morphological opening restricted to the bottom band removes it without touching the
    # cuts and crust flaps above.
    ys_core = np.where(core.any(1))[0]
    band = int(ys_core.max() - 0.14 * (ys_core.max() - ys_core.min()))
    yy, xx = np.mgrid[-9:10, -9:10]
    disk = (xx * xx + yy * yy) <= 81
    opened = binary_opening(core, structure=disk)
    core[band:] = opened[band:]
    soft =gaussian_filter(core.astype(np.float32), 1.6)
    edge = smooth((chroma - 12) / 24)
    alpha = np.clip(np.minimum(soft * 1.25, np.maximum(edge, (soft > 0.97))), 0, 1)
    alpha = np.where(core, np.maximum(alpha, gaussian_filter(core.astype(np.float32), 0.8)), alpha)
    ys, xs = np.where(alpha > 0.02)
    pad = 12
    box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad, f.shape[1]), min(ys.max() + pad, f.shape[0]))
    rgba = np.dstack([rgb, (alpha * 255).astype(np.uint8)])
    return Image.fromarray(rgba, "RGBA").crop(box)


def save_set(img: Image.Image, base: Path, widths):
    for w in widths:
        r = img if img.width == w else img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)
        r.save(f"{base}-{w}.avif", quality=60, speed=4)
        r.save(f"{base}-{w}.webp", quality=82, method=6)
        r.save(f"{base}-{w}.jpg", quality=84, optimize=True, progressive=True)


def main():
    if not SRC.exists():
        sys.exit(f"missing {SRC}")
    for d in (SEQ / "desktop", SEQ / "mobile", POSTER, CUT):
        if d.exists() and d != CUT:
            shutil.rmtree(d)
        d.mkdir(parents=True, exist_ok=True)

    probe = json.loads(subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v", "-count_frames", "-show_entries",
         "stream=width,height,r_frame_rate,nb_read_frames,duration", "-of", "json", str(SRC)],
        capture_output=True, check=True, text=True).stdout)["streams"][0]
    num, den = map(int, probe["r_frame_rate"].split("/"))
    fps = num / den

    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["ffmpeg", "-v", "error", "-i", str(SRC), "-vsync", "0", f"{tmp}/%04d.png"], check=True)
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
                save_set(im, POSTER / "cover", [1920, 1280, 960])
                Image.fromarray(background_plate(rgb)).save(POSTER / "cover-plate.png")
            if i == n - 1:
                save_set(im, POSTER / "final", [1920, 1280, 960])
            if i == round(4.2 * fps):
                cut = cutout(rgb)
                cut.save(ROOT / "media/derived/pao-com-chourico.png", optimize=True)
                cut.resize((cut.width // 2, cut.height // 2), Image.LANCZOS).save(
                    CUT / "pao-com-chourico-960.webp", quality=86, alpha_quality=90, method=6)
                cut.save(CUT / "pao-com-chourico.webp", quality=86, alpha_quality=90, method=6)
            if i % 24 == 0:
                print(f"frame {i}/{n}", flush=True)
        sprite.save(SEQ / "plates.webp", quality=88, method=6)

    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(SRC), "-an", "-vf", "scale=1280:-2",
                    "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-g", "4", "-keyint_min", "4",
                    "-sc_threshold", "0", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                    str(OUT / "pao-com-chourico-720p.mp4")], check=True)

    manifest = {
        "source": "media/original/pao-com-chourico.mp4",
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
