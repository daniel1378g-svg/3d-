"""Bakes the tileable room textures and the dusk view through the window.

Run with:  python3 scripts/bake_textures.py
Outputs into public/textures/. Requires numpy and Pillow.
"""
import numpy as np
from PIL import Image, ImageFilter
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'textures'
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(11)


def tile_noise(n, sigma):
    """Tileable gaussian-filtered noise, normalised to unit std."""
    f = np.fft.fft2(rng.standard_normal((n, n)))
    fy = np.fft.fftfreq(n)[:, None]
    fx = np.fft.fftfreq(n)[None, :]
    f *= np.exp(-(fx ** 2 + fy ** 2) / (2 * sigma ** 2))
    out = np.real(np.fft.ifft2(f))
    return out / (out.std() + 1e-9)


def save(arr, name, q=88):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(OUT / name, quality=q)


# ── Charcoal lime plaster: trowel clouds plus fine grain (greyscale, tinted in the material)
N = 1024
plaster = 200 + tile_noise(N, 0.004) * 10 + tile_noise(N, 0.02) * 5 + tile_noise(N, 0.25) * 4
save(plaster, 'plaster.jpg')

# ── Travertine: warm beige, horizontal veining and small pores
N = 1024
y = np.linspace(0, 1, N, endpoint=False)[:, None]
warp = tile_noise(N, 0.004) * 0.009
bands = np.sin((y + warp) * np.pi * 2 * 9) * 0.5 + np.sin((y + warp * 1.7) * np.pi * 2 * 23) * 0.25
base = np.stack([np.full((N, N), 214.0), np.full((N, N), 196.0), np.full((N, N), 168.0)], -1)
shade = bands * 16 + tile_noise(N, 0.01) * 4 + tile_noise(N, 0.12) * 2.5
trav = base + shade[..., None] * np.array([1.0, 0.95, 0.85])
pores = tile_noise(N, 0.18)
pmask = (pores > 2.4) * np.clip((pores - 2.4) * 2, 0, 1)
pmask = np.array(Image.fromarray((pmask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))) / 255.0
trav = trav * (1 - pmask[..., None] * 0.45)
save(trav, 'travertine.jpg')

# ── Floor slab: travertine with a darker joint on two edges (one slab per repeat)
slab = trav.copy()
j = 5
slab[:j, :, :] *= 0.55
slab[:, :j, :] *= 0.55
save(slab, 'floor.jpg')

# ── Dusk over a Swiss lake: sky gradient, two alpine ridges with last light on the snow,
#    a few village lights and the lake reflecting the sky.
W, H = 2048, 1024
yy = np.linspace(0, 1, H)[:, None]
xx = np.linspace(0, 1, W)[None, :]
top = np.array([22, 28, 52]); mid = np.array([74, 72, 112]); low = np.array([226, 150, 110])
y3 = yy[..., None]
sky = np.where(y3 < 0.42,
               top + (mid - top) * (y3 / 0.42) ** 1.4,
               mid + (low - mid) * np.clip((y3 - 0.42) / 0.2, 0, 1) ** 1.2)
sky = np.broadcast_to(sky, (H, W, 3)).astype(np.float64).copy()
# soft glow where the sun has set
glow = np.exp(-(((xx - 0.68) / 0.22) ** 2 + ((yy - 0.6) / 0.12) ** 2))
sky += glow[..., None] * np.array([60, 30, 10])


def ridge(base_h, amp, rough=0.56, seed=0):
    """Jagged alpine skyline by 1D midpoint displacement (tileable ends not needed)."""
    r = np.random.default_rng(seed)
    n = 2 ** 11 + 1
    h = np.zeros(n)
    step, scale = n - 1, amp
    h[0], h[-1] = r.uniform(-amp, amp) * 0.3, r.uniform(-amp, amp) * 0.3
    while step > 1:
        half = step // 2
        for i in range(half, n - 1, step):
            h[i] = (h[i - half] + h[i + half]) / 2 + r.uniform(-scale, scale)
        scale *= rough
        step = half
    h = np.interp(np.linspace(0, n - 1, W), np.arange(n), h)
    return base_h - h / H


far = ridge(0.585, 150, 0.58, seed=5)
near = ridge(0.665, 55, 0.5, seed=9)
horizon = 0.70
hy = int(horizon * H)
img = sky.copy()
snow_noise = tile_noise(256, 0.05)
for x in range(W):
    fy = int(np.clip(far[x], 0, 1) * H)
    ny = int(np.clip(near[x], 0, 1) * H)
    if fy < hy:
        rows = np.arange(fy, hy)
        depth = (rows - fy) / max(1, hy - fy)
        rock = np.array([62, 66, 100]) * (1 - depth[:, None] * 0.25)
        # snow on the upper slopes, catching the afterglow
        line = 0.622 + 0.01 * np.sin(x * 0.0045) + 0.006 * np.sin(x * 0.019 + 1.3)
        snowy = ((rows / H) < line) & ((rows - fy) < 40)
        snow_col = np.array([168, 160, 190]) - depth[:, None] * 30
        col = np.where(snowy[:, None], snow_col, rock)
        # haze toward the horizon
        haze = np.clip(depth, 0, 1)[:, None] * 0.35
        img[fy:hy, x] = col * (1 - haze) + sky[fy:hy, x] * haze
    if ny < hy:
        img[ny:hy, x] = np.array([28, 30, 48])
# lake: mirrored sky, darker and slightly rippled
lake_h = H - hy
rows = np.clip(hy - 1 - (np.arange(lake_h) * 1.6).astype(int), 0, hy - 1)
refl = img[rows].copy()  # mirror of sky and mountains
refl = np.array(Image.fromarray(np.clip(refl, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3))).astype(np.float64)
depth = np.linspace(0, 1, lake_h)[:, None, None]
img[hy:] = refl * (0.55 - depth * 0.25) + np.array([10, 12, 22]) * (0.5 + depth)
img[hy:hy + 2] = img[hy - 3:hy - 1] * 0.8
# village lights along the near shore
for _ in range(70):
    lx = int(rng.uniform(0.05, 0.95) * W)
    ly = int(horizon * H - rng.uniform(2, 34))
    r = rng.uniform(1.0, 2.2)
    yy2, xx2 = np.ogrid[-4:5, -4:5]
    spot = np.exp(-(xx2 ** 2 + yy2 ** 2) / (r ** 2))
    y0, x0 = max(0, ly - 4), max(0, lx - 4)
    img[y0:y0 + 9, x0:x0 + 9] += spot[: img[y0:y0 + 9, x0:x0 + 9].shape[0], : img[y0:y0 + 9, x0:x0 + 9].shape[1], None] * np.array([255, 190, 120])
img = np.array(Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)))
save(img, 'dusk-view.jpg', 86)

print('textures written to', OUT)
