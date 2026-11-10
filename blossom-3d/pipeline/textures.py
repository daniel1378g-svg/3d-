"""Procedural, tileable material textures (numpy + Pillow).   python3 -m pipeline.textures

Albedo values are kept physically plausible (no pure white / black), and textures meant to be tinted by a
material colour are near-neutral.  A few tiled finishes also get a normal map for the joints.
"""
import os
import numpy as np
from PIL import Image

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'textures')
rng = np.random.default_rng(20261)


def fbm(n, beta=2.0, ax=1.0, ay=1.0, seed=None):
    """periodic fractal noise in 0..1 with a 1/f^beta spectrum; ax, ay stretch it (anisotropy)."""
    r = np.random.default_rng(seed) if seed is not None else rng
    fx = np.fft.fftfreq(n)[None, :] * ax; fy = np.fft.fftfreq(n)[:, None] * ay
    f = np.sqrt(fx * fx + fy * fy); f[0, 0] = 1
    spec = (r.normal(size=(n, n)) + 1j * r.normal(size=(n, n))) / f ** (beta / 2)
    spec[0, 0] = 0
    x = np.fft.ifft2(spec).real
    x = (x - x.min()) / (x.max() - x.min())
    return x


def srgb(h):
    h = h.lstrip('#'); return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], np.float32) / 255.0


def save(name, img, q=90):
    os.makedirs(OUT, exist_ok=True)
    a = np.clip(img * 255.0 + 0.5, 0, 255).astype(np.uint8)
    Image.fromarray(a).save(os.path.join(OUT, name + '.jpg'), quality=q, subsampling=0)


def normal_from_height(h, strength):
    dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) * strength; dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) * strength
    n = np.dstack([-dx, dy, np.ones_like(h)]); n /= np.linalg.norm(n, axis=2, keepdims=True)
    return n * 0.5 + 0.5


def tiles(n, nx, ny, joint_px, base, joint, var=0.03, cloud=0.03, speck=0.012, bevel_px=2.0, offset=False, seed=1):
    """rectangular tiles: returns (albedo, height) ; per-tile tone variation, soft clouding, fine speckle."""
    r = np.random.default_rng(seed)
    y, x = np.mgrid[0:n, 0:n].astype(np.float32)
    tw, th = n / nx, n / ny
    row = np.floor(y / th)
    xo = (x + (row % 2) * tw * 0.5) % n if offset else x
    col = np.floor(xo / tw)
    u = xo - col * tw; v = y - row * th
    d = np.minimum(np.minimum(u, tw - u), np.minimum(v, th - v))          # distance to the tile edge
    tone = r.normal(0, var, size=(ny, nx)).astype(np.float32)[row.astype(int) % ny, col.astype(int) % nx]
    cl = (fbm(n, 2.4, seed=seed + 11) - 0.5) * 2 * cloud
    sp = (fbm(n, 0.4, seed=seed + 23) - 0.5) * 2 * speck
    lum = 1.0 + tone + cl + sp
    alb = base[None, None, :] * lum[..., None]
    jm = np.clip((joint_px / 2 + 0.6 - d) / 1.2, 0, 1)                    # 1 in the joint
    alb = alb * (1 - jm[..., None]) + joint[None, None, :] * jm[..., None]
    h = np.clip(d / (joint_px / 2 + bevel_px), 0, 1)
    h = h * h * (3 - 2 * h)
    return alb, h


def run():
    N = 1024
    # ---- plaster / paint: almost white, to be tinted
    p = 0.965 + (fbm(N, 2.2) - 0.5) * 0.03 + (fbm(N, 0.6) - 0.5) * 0.02
    save('plaster', np.dstack([p, p, p]), 88)
    # ---- canteen / circulation floor: 60 x 60 porcelain, warm light grey
    a, h = tiles(N, 2, 2, 2.6, srgb('#B7B2A8'), srgb('#8C877E'), var=0.02, cloud=0.05, speck=0.02, seed=3)
    save('floor_main', a); save('floor_main_n', normal_from_height(h, 2.2), 92)
    # ---- changing rooms: 30 x 30 anti-slip
    a, h = tiles(N, 4, 4, 3.0, srgb('#A29F99'), srgb('#77746E'), var=0.03, cloud=0.03, speck=0.035, seed=5)
    save('floor_bal', a); save('floor_bal_n', normal_from_height(h + (fbm(N, 0.3, seed=9) - 0.5) * 0.08, 2.5), 92)
    a, h = tiles(N, 4, 4, 3.0, srgb('#8F9395'), srgb('#6B6E70'), var=0.03, cloud=0.03, speck=0.04, seed=7)
    save('floor_wet', a); save('floor_wet_n', normal_from_height(h + (fbm(N, 0.3, seed=10) - 0.5) * 0.1, 2.5), 92)
    # ---- kitchen: seamless resin floor with flakes
    base = srgb('#A3A8A7')
    f1 = fbm(N, 0.2, seed=31); f2 = fbm(N, 0.2, seed=32); cl = (fbm(N, 2.6, seed=33) - 0.5) * 0.06
    k = np.ones((N, N, 3), np.float32) * base * (1 + cl[..., None])
    k = np.where((f1 > 0.80)[..., None], k * 1.22, k); k = np.where((f2 > 0.82)[..., None], k * 0.72, k)
    save('floor_kitchen', k)
    # ---- clean rooms: seamless vinyl, light blue-grey, faint marbling
    base = srgb('#B3BDC1')
    m = (fbm(N, 2.8, 1.0, 2.2, seed=41) - 0.5) * 0.07 + (fbm(N, 0.5, seed=42) - 0.5) * 0.02
    save('floor_clean', np.ones((N, N, 3), np.float32) * base * (1 + m[..., None]))
    # ---- wall tiles
    a, h = tiles(N, 2, 4, 2.2, srgb('#DCD8CE'), srgb('#BDB9AF'), var=0.012, cloud=0.02, speck=0.006, seed=51)        # 60 x 30 greige
    save('tile_bal', a); save('tile_bal_n', normal_from_height(h, 1.8), 92)
    a, h = tiles(N, 2, 4, 2.2, srgb('#D3D8D8'), srgb('#B2B7B7'), var=0.012, cloud=0.02, speck=0.006, seed=53)        # 60 x 30 cool
    save('tile_wet', a); save('tile_wet_n', normal_from_height(h, 1.8), 92)
    a, h = tiles(N, 4, 4, 3.4, srgb('#EEEDE8'), srgb('#C9C8C2'), var=0.008, cloud=0.012, speck=0.004, seed=55)       # 20 x 20 white (0.8 m repeat)
    save('tile_kit', a); save('tile_kit_n', normal_from_height(h, 1.8), 92)
    # ---- hygienic wall panel with a vertical joint every 1.2 m (2.4 m repeat)
    y, x = np.mgrid[0:N, 0:N].astype(np.float32)
    pj = np.minimum(x % (N / 2), (N / 2) - x % (N / 2))
    v = 0.985 - np.clip(1.6 - pj, 0, 1) * 0.22 + (fbm(N, 2.2, seed=61) - 0.5) * 0.012
    save('panel', np.dstack([v, v, v]), 90)
    # ---- suspended ceiling 60 x 60: fissured mineral tile in a white T-grid
    tile = N / 2
    u = x % tile; w = y % tile
    d = np.minimum(np.minimum(u, tile - u), np.minimum(w, tile - w))
    grid = d < 10                                              # 24 mm T section
    edge = (d >= 10) & (d < 13)
    fis = fbm(N, 0.0, 1.0, 5.0, seed=71)
    pin = fbm(N, 0.0, seed=72)
    c = 0.93 + (fbm(N, 2.0, seed=73) - 0.5) * 0.02
    c = np.where(fis > 0.985, c * 0.78, c); c = np.where(pin > 0.992, c * 0.72, c)
    c = np.where(grid, 0.955, c); c = np.where(edge, 0.80, c)
    save('ceil_grid', np.dstack([c, c, c * 0.99]), 92)
    c2 = 0.955 + (fbm(N, 2.0, seed=74) - 0.5) * 0.01
    c2 = np.where(d < 1.5, 0.80, c2)
    save('ceil_clean', np.dstack([c2, c2, c2]), 92)
    # ---- oak veneer / laminate, grain along U
    g1 = fbm(N, 1.6, 0.06, 1.0, seed=81); g2 = fbm(N, 0.9, 0.02, 1.6, seed=82); g3 = fbm(N, 2.6, 0.5, 0.5, seed=83)
    grain = 0.55 * g1 + 0.3 * g2 + 0.15 * g3
    grain = (grain - grain.min()) / (grain.max() - grain.min())
    light, dark = srgb('#D9BC92'), srgb('#B08A5C')
    oak = light[None, None, :] * (1 - grain[..., None]) + dark[None, None, :] * grain[..., None]
    oak *= (1 + (fbm(N, 3.0, 0.3, 1.0, seed=84) - 0.5)[..., None] * 0.08)
    save('oak', np.transpose(oak, (1, 0, 2)), 90)
    # ---- brushed stainless steel (albedo only; streaks along U)
    s = 0.80 + (fbm(N, 1.0, 0.015, 1.0, seed=91) - 0.5) * 0.10 + (fbm(N, 2.4, seed=92) - 0.5) * 0.03
    save('steel', np.transpose(np.dstack([s * 0.985, s * 0.995, s]), (1, 0, 2)), 90)
    # ---- concrete / screed
    cc = 0.80 + (fbm(N, 2.4, seed=101) - 0.5) * 0.22 + (fbm(N, 0.7, seed=102) - 0.5) * 0.08
    save('concrete', np.dstack([cc, cc * 0.995, cc * 0.985]), 88)
    # ---- exterior pavers 40 x 40 (2 m repeat) and grass
    a, h = tiles(N, 5, 5, 4.0, srgb('#B9B5AC'), srgb('#7F7B73'), var=0.045, cloud=0.05, speck=0.05, seed=111)
    save('paving', a, 88)
    gr = fbm(N, 1.4, seed=121); gg = fbm(N, 0.2, seed=122)
    grass = srgb('#6E8250')[None, None, :] * (0.8 + 0.4 * gr[..., None]) * (0.9 + 0.2 * gg[..., None])
    save('grass', grass, 88)
    for f in sorted(os.listdir(OUT)):
        print(f, os.path.getsize(os.path.join(OUT, f)) // 1024, 'kB')


if __name__ == '__main__':
    run()
