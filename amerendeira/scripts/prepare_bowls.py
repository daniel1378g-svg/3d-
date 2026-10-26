"""Cut out the two overhead bowls (media/generated/*.png) into transparent WebP files.

The bowl itself is opaque; the soft shadow it casts on the white studio background is kept as
semi-transparent black, so it darkens whatever colour the page puts behind it.
Usage: python3 scripts/prepare_bowls.py
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media/generated"
OUT = ROOT / "public/images/bowls"
BOWLS = ["taca-caldo-verde", "taca-arroz-doce"]
SIZES = [360, 720]


def background(rgb):
    """Smooth estimate of the studio background: a quadratic surface fitted to the border."""
    h, w, _ = rgb.shape
    yy, xx = np.mgrid[0:h, 0:w] / max(h, w)
    border = np.zeros((h, w), bool)
    m = int(0.06 * h)
    border[:m], border[-m:], border[:, :m], border[:, -m:] = True, True, True, True
    terms = [np.ones_like(xx), xx, yy, xx * yy, xx**2, yy**2]
    a = np.stack([t[border] for t in terms], 1)
    bg = np.empty_like(rgb)
    for c in range(3):
        coef, *_ = np.linalg.lstsq(a, rgb[..., c][border], rcond=None)
        bg[..., c] = sum(k * t for k, t in zip(coef, terms))
    return bg


def cut(name):
    rgb = np.asarray(Image.open(SRC / f"{name}.png").convert("RGB"), np.float32) / 255
    bg = background(rgb)
    lum = rgb @ [0.2126, 0.7152, 0.0722]
    bg_lum = bg @ [0.2126, 0.7152, 0.0722]
    sat = rgb.max(2) - rgb.min(2)

    # The bowl: strongly coloured (terracotta, soup, rice), holes filled, largest blob. The contact
    # shadow is dark and slightly warm (saturation up to ~0.13), so it stays out of the opaque cut.
    obj = sat > 0.16
    obj = ndimage.binary_opening(obj, iterations=2)
    lab, n = ndimage.label(obj)
    obj = lab == (np.bincount(lab.ravel())[1:].argmax() + 1)
    obj = ndimage.binary_fill_holes(obj)
    obj = ndimage.binary_erosion(obj, iterations=1)
    soft = ndimage.gaussian_filter(obj.astype(np.float32), 0.8)

    # The shadow: how much darker than the background each pixel around the bowl is.
    shadow = np.clip((bg_lum - lum) / np.maximum(bg_lum, 1e-3) * 1.15, 0, 0.55)
    shadow = ndimage.gaussian_filter(shadow, 1.2)
    # Only the shadow near the bowl; the faint vignette of the backdrop further out is dropped.
    reach = 0.09 * max(rgb.shape[:2])
    shadow *= np.clip(1 - ndimage.distance_transform_edt(~obj) / reach, 0, 1) ** 1.5

    alpha = soft + (1 - soft) * shadow
    color = np.where(soft[..., None] > 0, rgb * soft[..., None] / np.maximum(alpha[..., None], 1e-4), 0)
    rgba = np.dstack([np.clip(color, 0, 1), alpha])

    ys, xs = np.nonzero(alpha > 0.02)
    pad = 6
    box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad, rgb.shape[1]), min(ys.max() + pad, rgb.shape[0]))
    img = Image.fromarray((rgba * 255 + 0.5).astype(np.uint8), "RGBA").crop(box)
    side = max(img.size)
    square = Image.new("RGBA", (side, side))
    square.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
    OUT.mkdir(parents=True, exist_ok=True)
    for s in SIZES:
        square.resize((s, s), Image.LANCZOS).save(OUT / f"{name}-{s}.webp", quality=86, method=6)
    print(name, square.size)


for b in BOWLS:
    cut(b)
