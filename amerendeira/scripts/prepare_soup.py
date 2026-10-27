"""Prepare the supplied caldo verde video for the scroll-driven bowl in the menus section.

Input : media/original/caldo-verde-carvao.mov (1248×704, 24 fps, 193 frames, charcoal backdrop).
        The bowl is empty until 0.9 s, the soup pours from 1.1 s to ~5.5 s and the bowl is full
        and still from ~5.8 s.
Output: public/videos/caldo/sheet_00.webp …  frames 21–144 (empty bowl → full bowl, 124 frames),
                                             four per sheet (2×2), so the whole pour fits in 31
                                             files (the Artifact preview has a file budget)
        public/videos/caldo/manifest.json    frame range, crop, sheet layout
        public/videos/poster/caldo-{empty,full}.{webp,jpg}   first and last frame of the range
                                             (cover while loading, reduced motion, fallback)

The frames are cropped around the bowl (1000×704, centred on it, full height so the falling
stream keeps its framing). The charcoal backdrop is up to ~8 levels lighter and warmer than the
page (#191919), so as is the animation would read as a faint rectangle. Two corrections, on the
backdrop only:
  1. levelling: a smooth estimate of the backdrop (low-chroma, dark pixels of the empty-bowl frame)
     gives its excess over the page colour; it is subtracted from backdrop-like pixels only (low
     chroma and dark, weighted softly), so the bowl, the saucer, the soup and the stream keep
     their exact colours while the studio around them settles on the page colour, grain included;
  2. a soft fade of the outer band into the page colour, as a safety for what levelling leaves.
"""
import json
import shutil
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, zoom

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media/original/caldo-verde-carvao.mov"
OUT = ROOT / "public/videos/caldo"
POSTER = ROOT / "public/videos/poster"

FIRST, LAST = 21, 144              # empty bowl, just before the stream → full and still
CROP = (110, 0, 1000, 704)         # x, y, w, h: bowl and saucer span x 250–971, y 112–617
PAGE = np.array([25, 25, 25], np.float32)
FADE = {"left": 0.12, "right": 0.12, "top": 0.1, "bottom": 0.1}
COLS, ROWS = 2, 2


def smooth(t):
    t = np.clip(t, 0, 1)
    return t * t * (3 - 2 * t)


def chroma_lum(rgb):
    return rgb.max(2) - rgb.min(2), rgb.mean(2)


def backdrop_excess(rgb):
    """How much lighter than the page the backdrop is, per pixel and channel (smooth, >= 0)."""
    small = rgb[::8, ::8]
    chroma, lum = chroma_lum(small)
    m = ((chroma < 12) & (lum < 60)).astype(np.float32)
    d = gaussian_filter(m, 6, mode="nearest")
    est = np.stack([gaussian_filter(small[..., c] * m, 6, mode="nearest") for c in range(3)], -1) / np.maximum(d, 1e-6)[..., None]
    est = zoom(est, (rgb.shape[0] / small.shape[0], rgb.shape[1] / small.shape[1], 1), order=1)
    return np.maximum(est[: rgb.shape[0], : rgb.shape[1]] - PAGE, 0)


def backdrop_weight(rgb):
    """1 for plain backdrop (neutral and dark), 0 for anything with colour or light."""
    chroma, lum = chroma_lum(rgb)
    w = np.clip((16 - chroma) / 8, 0, 1) * np.clip((62 - lum) / 16, 0, 1)
    return gaussian_filter(w, 1.0)[..., None].astype(np.float32)


def fade_weight(w, h):
    """1 inside, 0 on the outer edge: how much of the original frame is kept."""
    x = np.arange(w) + 0.5
    y = np.arange(h) + 0.5
    mx = smooth(np.minimum(x / (FADE["left"] * w), (w - x) / (FADE["right"] * w)))
    my = smooth(np.minimum(y / (FADE["top"] * h), (h - y) / (FADE["bottom"] * h)))
    return (my[:, None] * mx[None, :])[..., None].astype(np.float32)


def main():
    shutil.rmtree(OUT, ignore_errors=True)
    OUT.mkdir(parents=True)
    for old in POSTER.glob("caldo-*"):
        old.unlink()
    x, y, w, h = CROP
    keep = fade_weight(w, h)
    per = COLS * ROWS
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["ffmpeg", "-v", "error", "-i", str(SRC), "-vf", f"crop={w}:{h}:{x}:{y}",
                        "-vsync", "0", f"{tmp}/%04d.png"], check=True)
        frames = sorted(Path(tmp).glob("*.png"))[FIRST:LAST + 1]
        n = len(frames)
        excess = backdrop_excess(np.asarray(Image.open(frames[0]).convert("RGB"), np.float32))
        sheets = -(-n // per)
        for s in range(sheets):
            sheet = Image.new("RGB", (COLS * w, ROWS * h), tuple(int(c) for c in PAGE))
            for k in range(per):
                i = s * per + k
                if i >= n:
                    break
                rgb = np.asarray(Image.open(frames[i]).convert("RGB"), np.float32)
                rgb = rgb - excess * backdrop_weight(rgb)
                out = Image.fromarray(np.clip(rgb * keep + PAGE * (1 - keep) + 0.5, 0, 255).astype(np.uint8))
                sheet.paste(out, ((k % COLS) * w, (k // COLS) * h))
                if i in (0, n - 1):
                    name = "caldo-empty" if i == 0 else "caldo-full"
                    out.save(POSTER / f"{name}.webp", quality=84, method=6)
                    out.save(POSTER / f"{name}.jpg", quality=86, optimize=True, progressive=True)
            sheet.save(OUT / f"sheet_{s:02d}.webp", quality=80, method=6)

    manifest = {
        "source": "media/original/caldo-verde-carvao.mov",
        "fps": 24, "frames": n, "sourceFrames": [FIRST, LAST],
        "crop": {"x": x, "y": y, "width": w, "height": h}, "fade": FADE,
        "sheets": {"count": sheets, "cols": COLS, "rows": ROWS, "path": "/videos/caldo/sheet_{ii}.webp"},
        "bytes": sum(p.stat().st_size for p in OUT.glob("*.webp")),
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=1))
    print(json.dumps({"frames": n, "sheets": sheets, "bytes": manifest["bytes"]}))


if __name__ == "__main__":
    main()
