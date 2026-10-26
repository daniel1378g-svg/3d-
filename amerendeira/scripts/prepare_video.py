"""Prepare the supplied pão com chouriço video for the scroll-driven hero.

Input : media/original/pao-com-chourico.mp4 (1920×1080, 24 fps, 193 frames, H.264 with a
        single keyframe, AAC audio)
Output: public/videos/...
  sequence/{desktop,mobile}/f_000.webp  every frame of the clip on a clean white backdrop
  sequence/manifest.json                frame count, fps, sizes
  poster/cover-*.{avif,webp,jpg}        first frame (intro, hero LCP, static fallback)
  poster/final-*.{avif,webp,jpg}        last frame (conclusion, reduced-motion fallback)
  pao-com-chourico-720p.mp4             silent H.264, keyframe every 4 frames (inline player)
  ../images/cutouts/pao-com-chourico.webp  clean cut-out of the baked loaf (chroma key)

The clip was shot on a neutral studio grey with a vignette. Each frame is relit to white: the
backdrop is estimated away from the bread (normalised convolution, smoothed over time so it never
flickers), and every pixel is divided by it. The bread, which is coloured, keeps most of its
original exposure; the backdrop becomes pure white while the contact shadow and the steam stay as
they were filmed, only lighter. The frame then meets the white page with no edge at all.
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import binary_closing, binary_dilation, binary_fill_holes, binary_opening, gaussian_filter, label

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media/original/pao-com-chourico.mp4"
OUT = ROOT / "public/videos"
SEQ = OUT / "sequence"
POSTER = OUT / "poster"
CUT = ROOT / "public/images/cutouts"

SIZES = {"desktop": 1920, "mobile": 1280}
BG_W = 240                         # working width of the backdrop estimate
BREAD_GAIN = 0.2                   # share of the backdrop correction applied to the bread


def smooth(t):
    t = np.clip(t, 0, 1)
    return t * t * (3 - 2 * t)


def backdrop(rgb: np.ndarray) -> np.ndarray:
    """Studio backdrop of a frame at BG_W, estimated from pixels well away from the bread."""
    h, w, _ = rgb.shape
    small = np.asarray(Image.fromarray(rgb).resize((BG_W, round(BG_W * h / w)), Image.BOX), np.float32)
    chroma = small.max(2) - small.min(2)
    obj = binary_opening(chroma > 16, iterations=1)
    m = (~binary_dilation(obj, iterations=10)).astype(np.float32)  # bread, shadow and steam out
    out = None
    for s in (40, 20, 10):
        d = gaussian_filter(m, s, mode="nearest")
        n = np.stack([gaussian_filter(small[..., c] * m, s, mode="nearest") for c in range(3)], -1)
        est = n / np.maximum(d, 1e-6)[..., None]
        if out is None:
            out = est
            continue
        k = np.clip(d / 0.5, 0, 1)[..., None]
        out = k * est + (1 - k) * out
    return out


def upscale(a: np.ndarray, w: int, h: int) -> np.ndarray:
    return np.stack([np.asarray(Image.fromarray(a[..., c].astype(np.float32), "F").resize((w, h), Image.BICUBIC))
                     for c in range(a.shape[2])], -1)


def whiten(rgb: np.ndarray, bg_small: np.ndarray) -> np.ndarray:
    h, w, _ = rgb.shape
    k = w / bg_small.shape[1]
    # Smooth fields are computed at the backdrop's working size, then scaled up.
    bg_small = gaussian_filter(bg_small, (6 / k, 6 / k, 0))
    gain_small = 255.0 / np.maximum(bg_small, 1)
    # Coloured pixels (the bread) take a gentle, smooth share of the correction, so its colours
    # and shading stay as filmed; neutral pixels (backdrop, shadow, steam) take all of it.
    gentle_small = 1 + (gaussian_filter(gain_small, (60 / k, 60 / k, 0)) - 1) * BREAD_GAIN
    gain = upscale(gain_small, w, h)
    gentle = upscale(gentle_small, w, h)
    f = rgb.astype(np.float32)
    chroma = gaussian_filter(f.max(2) - f.min(2), 1.0)
    wgt = smooth((chroma - 10) / 24)[..., None]
    out = f * (gain * (1 - wgt) + gentle * wgt)
    # Snap the near-white backdrop to pure white so it meets the page invisibly. Above the loaf,
    # where the vignette is darkest and the steam rises, neutral greys are lifted further: the
    # steam stays as a faint veil instead of grey smudges.
    neutral = 1 - smooth((chroma - 6) / 10)
    top = 1 - smooth((np.arange(h, dtype=np.float32) / h - 0.3) / 0.25)
    lift = np.maximum(np.clip((out.min(2) - 238) / 10, 0, 1),
                      np.clip((out.min(2) - 185) / 45, 0, 1) * neutral * top[:, None])[..., None]
    out = out * (1 - lift) + 255 * lift
    return np.clip(out, 0, 255).astype(np.uint8)


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
    (SEQ / "plates.webp").unlink(missing_ok=True)
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

    w0, h0 = int(probe["width"]), int(probe["height"])

    def frames():
        proc = subprocess.Popen(["ffmpeg", "-v", "error", "-i", str(SRC), "-vsync", "0", "-f", "rawvideo",
                                 "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
        size = w0 * h0 * 3
        while True:
            buf = proc.stdout.read(size)
            if len(buf) < size:
                break
            yield np.frombuffer(buf, np.uint8).reshape(h0, w0, 3)
        proc.wait()

    # Pass 1: backdrop of every frame, smoothed over time (the camera drifts slowly).
    bgs = np.stack([backdrop(rgb) for rgb in frames()])
    n = len(bgs)
    bgs = gaussian_filter(bgs, (3, 0, 0, 0), mode="nearest")

    # Pass 2: white frames, posters, cut-out and the silent inline video.
    enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{w0}x{h0}",
                            "-r", str(fps), "-i", "-", "-an", "-vf", "scale=1280:-2", "-c:v", "libx264",
                            "-preset", "slow", "-crf", "22", "-g", "4", "-keyint_min", "4", "-sc_threshold", "0",
                            "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUT / "pao-com-chourico-720p.mp4")],
                           stdin=subprocess.PIPE)
    for i, rgb in enumerate(frames()):
        white = whiten(rgb, bgs[i])
        enc.stdin.write(white.tobytes())
        im = Image.fromarray(white)
        for key, w in SIZES.items():
            r = im if w == w0 else im.resize((w, round(w * 9 / 16)), Image.LANCZOS)
            r.save(SEQ / key / f"f_{i:03d}.webp", quality=80 if key == "desktop" else 78, method=5)
        if i == 0:
            save_set(im, POSTER / "cover", [1920, 1280, 960])
        if i == n - 1:
            save_set(im, POSTER / "final", [1920, 1280, 960])
        if i == round(4.2 * fps):
            cut = cutout(np.array(rgb))
            cut.save(ROOT / "media/derived/pao-com-chourico.png", optimize=True)
            cut.resize((cut.width // 2, cut.height // 2), Image.LANCZOS).save(
                CUT / "pao-com-chourico-960.webp", quality=86, alpha_quality=90, method=6)
            cut.save(CUT / "pao-com-chourico.webp", quality=86, alpha_quality=90, method=6)
        if i % 24 == 0:
            print(f"frame {i}/{n}", flush=True)
    enc.stdin.close()
    enc.wait()

    manifest = {
        "source": "media/original/pao-com-chourico.mp4",
        "fps": fps, "frames": n, "duration": n / fps,
        "segment": {"start": 0, "end": n / fps, "note": "clip inteiro; mapeamento por troços em src/lib/videoTimeline.ts"},
        "sizes": {k: {"width": w, "height": round(w * 9 / 16), "path": f"/videos/sequence/{k}/f_{{i}}.webp"} for k, w in SIZES.items()},
        "background": "#ffffff",
        "bytes": {k: sum(p.stat().st_size for p in (SEQ / k).glob("*.webp")) for k in SIZES},
    }
    (SEQ / "manifest.json").write_text(json.dumps(manifest, indent=1))
    print(json.dumps(manifest["bytes"]))


if __name__ == "__main__":
    main()
