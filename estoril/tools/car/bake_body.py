"""Offline bake of the hero-car body: hero-car-mesh.json (ce-mesh/1) -> hero-car-body.json + .bin (ce-mesh/2).

    python3 tools/car/bake_body.py            (from estoril/; needs numpy and Pillow with WebP)

The source mesh is one scanned/generated shell (55,485 triangles, position + uv only) with one texture atlas.
This script does the expensive, deterministic work once, so the page only uploads buffers:

  1. drops 3 loose debris shells (32 triangles near the wheel arches);
  2. creased normals: positions are welded at 0.1 mm, every edge whose dihedral angle exceeds CREASE_DEG (or
     that is open, non-manifold or inconsistently wound) is sharp, and each vertex gets one normal per fan of
     faces connected through smooth edges (corner-angle weights, slivers down-weighted). Unlike a per-face
     "neighbours within the crease angle" average, every face of a fan shares the same normal, so smooth
     regions have no shading cracks and creases stay crisp;
  3. material groups (paint, trim, glass, lights): every triangle is classified from 15 texture samples plus
     position/orientation boxes, isolated labels are voted away across smooth edges, and the index buffer is
     sorted by class (one draw range per material);
  4. writes an indexed vertex buffer (a vertex is split only where the uv or the fan differs);
  5. ambient occlusion from depth maps rendered in 160 directions: into the R channel of an ORM texture
     (G roughness and B metalness copied from the source metal-roughness map), and onto the ground around
     the car (body plus four tyre cylinders, 384 directions) as the car's contact-shadow footprint.

Output (site/assets/models): hero-car-body.json (descriptor), hero-car-body.bin
  position float32 x3 | uv uint16 x2 normalised | normal int16 x3 normalised | index uint16
hero-car-orm.webp (1024^2, replaces hero-car-mr.webp at runtime) and hero-car-shadow.webp (ground occlusion).
The ce-mesh/1 source and its textures stay untouched for the published reference build.
"""
import json
import os
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
MODELS = os.path.normpath(os.path.join(HERE, '../../site/assets/models'))
SOURCE = os.path.join(MODELS, 'hero-car-mesh.json')
OUT_JSON = os.path.join(MODELS, 'hero-car-body.json')
OUT_BIN = os.path.join(MODELS, 'hero-car-body.bin')
OUT_ORM = os.path.join(MODELS, 'hero-car-orm.webp')
OUT_FOOTPRINT = os.path.join(MODELS, 'hero-car-shadow.webp')

#: Faces meeting at more than this dihedral angle keep separate normals (degrees).
CREASE_DEG = float(os.environ.get("CREASE_DEG", 42))
#: Bilateral face-normal filter: iterations and normal-similarity sigma (degrees).
FILTER_ITERATIONS = int(os.environ.get('FILTER_ITERATIONS', 6))
FILTER_SIGMA_R_DEG = float(os.environ.get('FILTER_SIGMA_R_DEG', 18))
#: Position weld tolerance for topology (metres).
WELD = 1e-4
#: Loose shells with fewer triangles than this are dropped.
MIN_SHELL_TRIS = 100


def log(*a):
    print(*a, file=sys.stderr)


class UnionFind:
    """Vectorised connected components: label propagation over index pairs until stable."""

    @staticmethod
    def labels(n, a, b):
        lab = np.arange(n)
        while True:
            m = np.minimum(lab[a], lab[b])
            new = lab.copy()
            np.minimum.at(new, a, m)
            np.minimum.at(new, b, m)
            new = new[new]  # pointer jumping
            if np.array_equal(new, lab):
                return lab
            lab = new


def load_source():
    d = json.load(open(SOURCE))
    P = np.array(d['position'], np.float64).reshape(-1, 3)
    UV = np.array(d['uv'], np.float64).reshape(-1, 2)
    I = np.array(d['index'], np.int64).reshape(-1, 3)
    return d, P, UV, I


def weld_positions(P):
    q = np.round(P / WELD).astype(np.int64)
    _, weld = np.unique(q, axis=0, return_inverse=True)
    return weld.ravel()


def face_geometry(P, I):
    a, b, c = P[I[:, 0]], P[I[:, 1]], P[I[:, 2]]
    cr = np.cross(b - a, c - a)
    dbl = np.linalg.norm(cr, axis=1)
    n = cr / np.maximum(dbl, 1e-20)[:, None]
    # corner angles
    def ang(u, v):
        cu = np.einsum('ij,ij->i', u, v) / np.maximum(np.linalg.norm(u, axis=1) * np.linalg.norm(v, axis=1), 1e-20)
        return np.arccos(np.clip(cu, -1, 1))
    angles = np.stack([ang(b - a, c - a), ang(c - b, a - b), ang(a - c, b - c)], 1)
    e2 = ((b - a) ** 2).sum(1) + ((c - b) ** 2).sum(1) + ((a - c) ** 2).sum(1)
    quality = np.clip(2 * np.sqrt(3) * dbl / np.maximum(e2, 1e-20), 0, 1)  # 1 equilateral, 0 sliver
    return n, dbl / 2, angles, quality


def edge_table(WI):
    """Directed half-edges (face, k) from corner k to k+1, grouped by undirected welded edge."""
    T = len(WI)
    src = WI.ravel()  # corner (t, k) -> vertex
    dst = WI[:, [1, 2, 0]].ravel()
    lo, hi = np.minimum(src, dst), np.maximum(src, dst)
    key = lo * (WI.max() + 1) + hi
    order = np.argsort(key, kind='stable')
    ks = key[order]
    starts = np.r_[0, np.flatnonzero(np.diff(ks)) + 1]
    counts = np.diff(np.r_[starts, len(ks)])
    return src, dst, order, starts, counts


def drop_debris(P, UV, I):
    weld = weld_positions(P)
    WI = weld[I]
    lab = UnionFind.labels(weld.max() + 1, np.r_[WI[:, 0], WI[:, 1]], np.r_[WI[:, 1], WI[:, 2]])
    shell = lab[WI[:, 0]]
    ids, inv, cnt = np.unique(shell, return_inverse=True, return_counts=True)
    keep = cnt[inv] >= MIN_SHELL_TRIS
    log('shells %d, dropped %d triangles in %d small shells' % (len(ids), (~keep).sum(), (cnt < MIN_SHELL_TRIS).sum()))
    return I[keep]


def filter_face_normals(P, I, n, area, iterations, sigma_r_deg):
    """Bilateral filtering of the face normals (Zheng et al. 2011, "Bilateral normal filtering for mesh
    denoising"): each face normal becomes the area-, distance- and normal-similarity-weighted mean of the
    faces around its three vertices. Small, noisy angles between neighbours (the scan's dents and ripples)
    are averaged out; large ones (real creases, > ~2 sigma_r) barely mix."""
    T = len(I)
    weld = weld_positions(P)
    WI = weld[I]
    cent = P[I].mean(1)
    # faces around each vertex -> all (face, neighbour face) pairs sharing a vertex
    vf_v = WI.ravel()
    vf_f = np.repeat(np.arange(T), 3)
    order = np.argsort(vf_v, kind='stable')
    vs, fs = vf_v[order], vf_f[order]
    starts = np.r_[0, np.flatnonzero(np.diff(vs)) + 1]
    counts = np.diff(np.r_[starts, len(vs)])
    pa, pb = [], []
    for c in np.unique(counts):
        s = starts[counts == c]
        block = fs[s[:, None] + np.arange(c)[None, :]]  # (k, c)
        pa.append(np.repeat(block, c, axis=1).ravel())
        pb.append(np.tile(block, (1, c)).ravel())
    key = np.unique(np.concatenate(pa) * T + np.concatenate(pb))
    fa, fb = key // T, key % T
    edge_len = np.mean(np.linalg.norm(P[I[:, 0]] - P[I[:, 1]], axis=1))
    sigma_s = 2.0 * edge_len
    ws = area[fb] * np.exp(-((cent[fa] - cent[fb]) ** 2).sum(1) / (2 * sigma_s ** 2))
    sr2 = 2 * (2 * np.sin(np.radians(sigma_r_deg) / 2)) ** 2  # chord length of sigma_r
    m = n.copy()
    for _ in range(iterations):
        w = ws * np.exp(-((m[fa] - m[fb]) ** 2).sum(1) / sr2)
        acc = np.zeros_like(m)
        np.add.at(acc, fa, w[:, None] * m[fb])
        m = acc / np.maximum(np.linalg.norm(acc, axis=1, keepdims=True), 1e-20)
    moved = np.degrees(np.arccos(np.clip((m * n).sum(1), -1, 1)))
    log('normal filter: %d pairs, sigma_s %.3f m, sigma_r %.0f deg, %d iterations; face normals moved by median %.1f, '
        '90th pct %.1f deg' % (len(fa), sigma_s, sigma_r_deg, iterations, np.median(moved), np.percentile(moved, 90)))
    return m


def creased_normals(P, I, crease_deg, extra_sharp=None, filtered=None):
    """Per-corner normals (T x 3 x 3) and per-corner fan ids (T x 3).

    extra_sharp(face_a, face_b) -> bool array: additional sharp edges (e.g. material boundaries).
    filtered: optional denoised face normals used for the crease test and the averages."""
    T = len(I)
    weld = weld_positions(P)
    WI = weld[I]
    n, area, angles, quality = face_geometry(P, I)
    if filtered is not None:
        n = filtered
    src, dst, order, starts, counts = edge_table(WI)
    face = order // 3
    k = order % 3
    s_src, s_dst = src[order], dst[order]
    # manifold edges: exactly two half-edges
    m2 = counts == 2
    i0 = starts[m2]
    i1 = i0 + 1
    f0, f1 = face[i0], face[i1]
    opposite = (s_src[i0] == s_dst[i1]) & (s_dst[i0] == s_src[i1])
    cosang = np.einsum('ij,ij->i', n[f0], n[f1])
    smooth = opposite & (cosang >= np.cos(np.radians(crease_deg)))
    if extra_sharp is not None:
        smooth &= ~extra_sharp(f0, f1)
    log('edges: %d manifold, %d smooth, %d sharp (crease %.0f deg), %d open/non-manifold' % (
        m2.sum(), smooth.sum(), (~smooth).sum(), crease_deg, (~m2).sum()))
    # union corners across smooth edges: at both endpoints
    c0, c1 = [], []
    for (fa, ka, fb, kb) in [(f0, k[i0], f1, k[i1])]:
        fa, ka, fb, kb = fa[smooth], ka[smooth], fb[smooth], kb[smooth]
        # half-edge (fa, ka) runs corner ka -> ka+1; (fb, kb) runs kb -> kb+1 in the opposite direction
        c0 += [fa * 3 + ka, fa * 3 + (ka + 1) % 3]
        c1 += [fb * 3 + (kb + 1) % 3, fb * 3 + kb]
    fan = UnionFind.labels(T * 3, np.concatenate(c0), np.concatenate(c1)).reshape(T, 3)
    w = angles * (0.05 + 0.95 * quality[:, None])  # corner-angle weights, slivers down-weighted
    acc = np.zeros((T * 3, 3))
    np.add.at(acc, fan.ravel(), (w[:, :, None] * n[:, None, :]).reshape(-1, 3))
    fn = acc / np.maximum(np.linalg.norm(acc, axis=1, keepdims=True), 1e-20)
    normals = fn[fan.ravel()].reshape(T, 3, 3)
    # any degenerate fan (zero sum) falls back to its face normal
    bad = np.linalg.norm(acc[fan.ravel()], axis=1).reshape(T, 3) < 1e-12
    normals[bad] = np.repeat(n[:, None, :], 3, 1)[bad]
    return normals, fan


# --- material classification -------------------------------------------------------------------------------

#: Group order in the index buffer and material index at runtime (hero-car.js BODY_MATERIALS).
CLASSES = ['paint', 'trim', 'glass', 'lights']
PAINT, TRIM, GLASS, LIGHTS = range(4)


def srgb_to_linear(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def load_texture(name, linear=False):
    from PIL import Image
    a = np.asarray(Image.open(os.path.join(MODELS, name)).convert('RGB')).astype(np.float32) / 255
    return srgb_to_linear(a) if linear else a


def bilinear(img, uv):
    """Bilinear lookup with repeat wrapping; flipY = false, so v = 0 is the first row."""
    h, w = img.shape[:2]
    x = uv[..., 0] * w - 0.5
    y = uv[..., 1] * h - 0.5
    x0, y0 = np.floor(x).astype(int), np.floor(y).astype(int)
    fx, fy = (x - x0)[..., None], (y - y0)[..., None]
    x0, x1 = x0 % w, (x0 + 1) % w
    y0, y1 = y0 % h, (y0 + 1) % h
    return (img[y0, x0] * (1 - fx) * (1 - fy) + img[y0, x1] * fx * (1 - fy) + img[y1, x0] * (1 - fx) * fy
            + img[y1, x1] * fx * fy)


def sample_triangles(UV, I, base, mr, steps=4):
    """Texture statistics per triangle from a barycentric grid of samples (15 points for steps = 4)."""
    b = [(i / steps, j / steps) for i in range(steps + 1) for j in range(steps + 1 - i)]
    b = np.array([(u, v, 1 - u - v) for u, v in b])
    b = 0.9 * b + 0.1 / 3  # pull the samples inside the triangle (away from chart borders)
    uv = np.einsum('sk,tkc->tsc', b, UV[I])  # T x S x 2
    col = bilinear(base, uv)
    orm = bilinear(mr, uv)
    lum = col @ np.array([0.2126, 0.7152, 0.0722])
    sat = (col.max(-1) - col.min(-1)) / np.maximum(col.max(-1), 1e-4)
    red = (col[..., 0] > 0.15) & (col[..., 0] > 2.5 * col[..., 1]) & (sat > 0.5)
    rough, metal = orm[..., 1], orm[..., 2]
    gloss_white = (lum > 0.3) & (rough < 0.13) & (sat < 0.25)  # the paint
    lens = ((rough > 0.16) | red | (metal > 0.12)) & (lum > 0.02) & ~gloss_white  # lenses, reflectors, LEDs
    return {
        'col': col.mean(1), 'lum': lum.mean(1), 'rough': rough.mean(1), 'metal': metal.mean(1),
        'bright': ((lum > 0.2) | red).mean(1),  # fraction of paint-like samples (white or the red livery)
        'dark': (lum < 0.1).mean(1), 'red': red.mean(1), 'lens': lens.mean(1),
    }


def classify(P, I, n, s):
    """Material class per triangle from texture samples plus position/orientation boxes (car frame)."""
    x, y, z = P[I].mean(1).T
    az = np.abs(z)
    cls = np.where(s['bright'] >= 0.5, PAINT, TRIM)
    # lights: the headlight slots and the tail-light clusters (red lenses, light-grey reflectors), not the
    # glossy white paint around them
    head = (x > 1.55) & (y > 0.46) & (y < 0.68) & (az > 0.35)
    tail = ((x < -1.9) & (y > 0.82) & (y < 1.04) & (az > 0.4)) | ((x < -1.4) & (y > 0.9) & (y < 1.04) & (az > 0.8))
    rain = (x < -1.9) & (y > 0.36) & (y < 0.48) & (az < 0.2)
    cls[(head | tail) & (s['lens'] >= 0.6)] = LIGHTS
    cls[rain & (s['red'] > 0.3)] = LIGHTS
    # glass: the dark side windows (a thin double shell) and the glossy engine-cover window; not the mirrors
    mirror = (x > 0.2) & (x < 0.75) & (az > 0.85) & (y > 0.85) & (y < 1.12)
    side = (s['dark'] > 0.5) & (y > 0.88) & (az > 0.45) & (x > -1.05) & (x < 0.95) & (np.abs(n[:, 2]) > 0.35)
    deck = (s['dark'] > 0.5) & (x > -1.55) & (x < -0.55) & (az < 0.5) & (y > 0.9) & (s['rough'] < 0.15) & (n[:, 1] > 0.5)
    cls[(side | deck) & ~mirror] = GLASS
    return cls


def smooth_classes(P, I, cls, smooth_pairs, iterations=4):
    """Majority vote across smooth edges only: removes isolated misclassified triangles; class borders can
    still follow creases (sharp edges never vote)."""
    f0, f1 = smooth_pairs
    K = len(CLASSES)
    for _ in range(iterations):
        votes = np.zeros((len(I), K))
        np.add.at(votes, (f0, cls[f1]), 1)
        np.add.at(votes, (f1, cls[f0]), 1)
        best = votes.argmax(1)
        flip = (votes.max(1) >= 2) & (votes[np.arange(len(I)), cls] == 0) & (best != cls)
        if not flip.any():
            break
        cls = np.where(flip, best, cls)
    return cls


def smooth_edge_pairs(P, I, normals_used, crease_deg):
    weld = weld_positions(P)
    WI = weld[I]
    src, dst, order, starts, counts = edge_table(WI)
    face = order // 3
    m2 = counts == 2
    f0, f1 = face[starts[m2]], face[starts[m2] + 1]
    ok = (normals_used[f0] * normals_used[f1]).sum(1) >= np.cos(np.radians(crease_deg))
    return f0[ok], f1[ok]


def build_vertices(P, UV, I, normals, fan):
    """Indexed buffers: one vertex per (source vertex, fan)."""
    T = len(I)
    key = I.ravel().astype(np.int64) * (T * 3) + fan.ravel()
    uniq, first, inv = np.unique(key, return_index=True, return_inverse=True)
    src = I.ravel()[first]
    pos = P[src]
    uv = UV[src]
    nrm = normals.reshape(-1, 3)[first]
    index = inv.reshape(T, 3)
    return pos, uv, nrm, index


def write_outputs(pos, uv, nrm, index, groups, extra):
    N = len(pos)
    assert N < 65536, 'uint16 index'
    buf = bytearray()
    layout = {}

    def put(name, arr, dtype, size, normalized=False):
        nonlocal buf
        while len(buf) % 4:
            buf += b'\0'
        a = np.ascontiguousarray(arr, dtype=dtype)
        layout[name] = {'offset': len(buf), 'type': {np.float32: 'float32', np.uint16: 'uint16', np.int16: 'int16'}[dtype],
                        'size': size}
        if normalized:
            layout[name]['normalized'] = True
        buf += a.tobytes()

    put('position', pos, np.float32, 3)
    put('uv', np.round(np.clip(uv, 0, 1) * 65535), np.uint16, 2, True)
    put('normal', np.round(np.clip(nrm, -1, 1) * 32767), np.int16, 3, True)
    put('index', index.ravel(), np.uint16, 1)
    open(OUT_BIN, 'wb').write(bytes(buf))
    desc = {
        'format': 'ce-mesh/2',
        'name': 'body',
        'units': 'metres; +x forward, +y up, +z right',
        'generator': 'tools/car/bake_body.py from hero-car-mesh.json',
        'buffer': os.path.basename(OUT_BIN),
        'vertexCount': int(N),
        'indexCount': int(index.size),
        'attributes': {k: v for k, v in layout.items() if k != 'index'},
        'index': layout['index'],
        'groups': groups,
    }
    desc.update(extra)
    json.dump(desc, open(OUT_JSON, 'w'), indent=1)
    log('wrote %s (%d vertices, %d triangles, %d bytes)' % (os.path.basename(OUT_BIN), N, len(index), len(buf)))


# --- ambient occlusion -------------------------------------------------------------------------------------
#
# Depth-map ("shadow map") AO: the occluders are rasterised orthographically from AO_DIRECTIONS directions
# spread evenly over the sphere (Fibonacci), keeping the surface nearest to each direction per 1 cm cell. A
# point sees direction d unless that cell holds a surface in front of it (further along d) by more than a bias.
# Visibility is cosine-weighted over the point's hemisphere. Below the horizon the ground occludes too.

AO_DIRECTIONS = 160
AO_CELL = 0.01  # metres per depth-map cell
AO_BIAS = 0.012  # metres
AO_NORMAL_OFFSET = 0.012  # query points are pushed this far along their normal
GROUND_TRANSMISSION = 0.35  # visibility of directions below the horizon (the ground bounces a little light)
ORM_SIZE = 1024
#: Tyres as AO occluders for the ground footprint: closed cylinders at the wheel centres (hero-car.json).
TYRE_WIDTH = 0.34
TYRE_CENTRE_Z = 0.86
#: The road surface sits this far above the tyres' lowest point (tyre deflection, hero-car.js).
TYRE_DEFLECTION = 0.012
#: Footprint texture: ground area (metres, car frame, centred on the origin) and size in pixels.
FOOTPRINT_EXTENT = (6.4, 3.6)
FOOTPRINT_PIXELS = (320, 180)
FOOTPRINT_RANGE = 1.6
FOOTPRINT_DIRECTIONS = 384  # over the upper hemisphere  # occluders further than this along a ray do not darken the ground (metres)


def fibonacci_directions(n):
    i = np.arange(n) + 0.5
    phi = np.arccos(1 - 2 * i / n)
    theta = np.pi * (1 + 5 ** 0.5) * i
    return np.stack([np.cos(theta) * np.sin(phi), np.cos(phi), np.sin(theta) * np.sin(phi)], 1)


def rasterize(xy, I, width, height, max_tile=64):
    """Covered pixel centres of 2D triangles (pixel units). Returns (pixel index, triangle, barycentrics)."""
    a, b, c = xy[I[:, 0]], xy[I[:, 1]], xy[I[:, 2]]
    lo = np.floor(np.minimum(np.minimum(a, b), c) - 0.5).astype(int) + 1
    hi = np.floor(np.maximum(np.maximum(a, b), c) - 0.5).astype(int)
    size = np.maximum(hi - lo + 1, 0)
    span = size.max(1)
    out_p, out_t, out_b = [], [], []
    d = (b[:, 1] - c[:, 1]) * (a[:, 0] - c[:, 0]) + (c[:, 0] - b[:, 0]) * (a[:, 1] - c[:, 1])
    ok = np.abs(d) > 1e-12
    tile = 1
    while tile <= max(max_tile, int(span.max()) if len(span) else 1):
        sel = np.flatnonzero(ok & (span > tile // 2 if tile > 1 else span >= 0) & (span <= tile))
        if len(sel):
            oy, ox = np.mgrid[0:tile, 0:tile]
            px = lo[sel, 0, None] + ox.ravel()[None, :]
            py = lo[sel, 1, None] + oy.ravel()[None, :]
            inside = (px <= hi[sel, 0, None]) & (py <= hi[sel, 1, None])
            cx, cy = px + 0.5, py + 0.5
            ts = sel[:, None]
            l1 = ((b[ts, 1] - c[ts, 1]) * (cx - c[ts, 0]) + (c[ts, 0] - b[ts, 0]) * (cy - c[ts, 1])) / d[ts]
            l2 = ((c[ts, 1] - a[ts, 1]) * (cx - c[ts, 0]) + (a[ts, 0] - c[ts, 0]) * (cy - c[ts, 1])) / d[ts]
            l3 = 1 - l1 - l2
            eps = -1e-9
            inside &= (l1 >= eps) & (l2 >= eps) & (l3 >= eps) & (px >= 0) & (py >= 0) & (px < width) & (py < height)
            r, k = np.nonzero(inside)
            out_p.append(py[r, k] * width + px[r, k])
            out_t.append(sel[r])
            out_b.append(np.stack([l1[r, k], l2[r, k], l3[r, k]], 1))
        tile *= 2
    if not out_p:
        return np.zeros(0, int), np.zeros(0, int), np.zeros((0, 3))
    return np.concatenate(out_p), np.concatenate(out_t), np.concatenate(out_b)


def direction_frame(d):
    up = np.array([0.0, 1.0, 0.0]) if abs(d[1]) < 0.9 else np.array([1.0, 0.0, 0.0])
    u = np.cross(up, d)
    u /= np.linalg.norm(u)
    v = np.cross(d, u)
    return u, v


def depth_maps(P, I, dirs, cell=AO_CELL):
    """Per direction: (u, v, origin, width, height, depth) with depth = max over the cell of p . d."""
    maps = []
    for d in dirs:
        u, v = direction_frame(d)
        pu, pv, h = P @ u, P @ v, P @ d
        o = np.array([pu.min() - 2 * cell, pv.min() - 2 * cell])
        W = int(np.ceil((pu.max() - o[0]) / cell)) + 3
        H = int(np.ceil((pv.max() - o[1]) / cell)) + 3
        xy = np.stack([(pu - o[0]) / cell, (pv - o[1]) / cell], 1)
        pix, tri, bary = rasterize(xy, I, W, H)
        depth = np.full(W * H, -np.inf)
        np.maximum.at(depth, pix, (h[I[tri]] * bary).sum(1))
        maps.append((u, v, o, W, H, depth, cell))
    return maps


def visibility(points, normals, dirs, maps, ground_y=None, max_range=np.inf):
    """Cosine-weighted visible fraction of each point's hemisphere (1 = open sky)."""
    q = points + normals * AO_NORMAL_OFFSET
    acc = np.zeros(len(points))
    wsum = np.zeros(len(points))
    for d, (u, v, o, W, H, depth, cell) in zip(dirs, maps):
        w = np.maximum(normals @ d, 0)
        m = w > 0
        if not m.any():
            continue
        x = np.floor((q[m] @ u - o[0]) / cell).astype(int)
        y = np.floor((q[m] @ v - o[1]) / cell).astype(int)
        inb = (x >= 0) & (y >= 0) & (x < W) & (y < H)
        occ_h = np.full(m.sum(), -np.inf)
        occ_h[inb] = depth[y[inb] * W + x[inb]]
        ahead = occ_h - q[m] @ d
        vis = ~((ahead > AO_BIAS) & (ahead < max_range))
        vis = vis.astype(float)
        if ground_y is not None and d[1] < 0:
            vis *= GROUND_TRANSMISSION
        acc[m] += w[m] * vis
        wsum[m] += w[m]
    return acc / np.maximum(wsum, 1e-9)


def tyre_occluders(layout):
    """Closed 32-sided cylinders standing in for the four tyres (car frame, wheel centre at y = r)."""
    verts, tris = [], []
    k = 32
    for key in ('FL', 'FR', 'RL', 'RR'):
        x, r = layout[key]['x'], layout[key]['r']
        zc = (1 if key[1] == 'R' else -1) * TYRE_CENTRE_Z
        base = sum(len(v) for v in verts)
        a = np.arange(k) / k * 2 * np.pi
        ring = np.stack([x + r * np.cos(a), r + r * np.sin(a)], 1)
        v = np.concatenate([np.c_[ring, np.full(k, zc - TYRE_WIDTH / 2)], np.c_[ring, np.full(k, zc + TYRE_WIDTH / 2)],
                            [[x, r, zc - TYRE_WIDTH / 2], [x, r, zc + TYRE_WIDTH / 2]]])
        verts.append(v)
        for i in range(k):
            j = (i + 1) % k
            tris += [[base + i, base + j, base + k + i], [base + j, base + k + j, base + k + i],
                     [base + 2 * k, base + j, base + i], [base + 2 * k + 1, base + k + i, base + k + j]]
    return np.concatenate(verts), np.array(tris)


def dilate(values, known, iterations=24):
    """Fill unknown texels from known neighbours (gutters), so mip levels do not bleed other charts in."""
    v = np.where(known, values, 0.0)
    k = known.astype(float)
    for _ in range(iterations):
        s = np.zeros_like(v)
        c = np.zeros_like(v)
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                s += np.roll(np.roll(v * k, dy, 0), dx, 1)
                c += np.roll(np.roll(k, dy, 0), dx, 1)
        grow = (k == 0) & (c > 0)
        v = np.where(grow, s / np.maximum(c, 1e-9), v)
        k = np.where(grow, 1.0, k)
    return np.where(k > 0, v, 1.0)


def bake_orm(P, UV, I, corner_normals, mr, maps, dirs):
    """ORM texture (glTF packing): R ambient occlusion (baked here), G roughness and B metalness (source)."""
    N = ORM_SIZE
    pix, tri, bary = rasterize(UV * N, I, N, N)  # flipY false: row = v * N
    first = np.unique(pix, return_index=True)[1]
    pix, tri, bary = pix[first], tri[first], bary[first]
    pts = (P[I[tri]] * bary[:, :, None]).sum(1)
    nrm = (corner_normals[tri] * bary[:, :, None]).sum(1)
    nrm /= np.maximum(np.linalg.norm(nrm, axis=1, keepdims=True), 1e-9)
    ao = visibility(pts, nrm, dirs, maps, ground_y=0.0)
    img = np.zeros(N * N)
    known = np.zeros(N * N, bool)
    img[pix] = ao
    known[pix] = True
    ao_map = dilate(img.reshape(N, N), known.reshape(N, N))
    log('ORM: %d texels baked (%.1f %%), AO mean %.2f, 5th pct %.2f' % (
        len(pix), 100 * len(pix) / N / N, ao.mean(), np.percentile(ao, 5)))
    from PIL import Image
    src = np.asarray(Image.fromarray((mr * 255).astype(np.uint8)).resize((N, N), Image.LANCZOS)).astype(np.float32) / 255
    orm = np.stack([ao_map, src[..., 1], src[..., 2]], 2)
    return orm, ao


def bake_footprint(P, I, layout, dirs, maps_body):
    """Ground occlusion around the car (car frame, road at y = TYRE_DEFLECTION), body plus tyre occluders."""
    tv, tt = tyre_occluders(layout)
    allP = np.concatenate([P, tv])
    allI = np.concatenate([I, tt + len(P)])
    up = fibonacci_directions(2 * FOOTPRINT_DIRECTIONS)
    up = up[up[:, 1] > 0.02]
    maps = depth_maps(allP, allI, up, cell=0.02)
    (ex, ez), (nx, nz) = FOOTPRINT_EXTENT, FOOTPRINT_PIXELS
    xs = (np.arange(nx) + 0.5) / nx * ex - ex / 2
    zs = (np.arange(nz) + 0.5) / nz * ez - ez / 2
    gx, gz = np.meshgrid(xs, zs)
    pts = np.stack([gx.ravel(), np.full(gx.size, TYRE_DEFLECTION + 0.002), gz.ravel()], 1)
    nrm = np.tile([0.0, 1.0, 0.0], (len(pts), 1))
    vis = visibility(pts, nrm, up, maps, max_range=FOOTPRINT_RANGE)
    occ = (1 - vis).reshape(nz, nx)
    # a 5-tap binomial blur hides the steps between the discrete directions
    k = np.array([1, 4, 6, 4, 1], float) / 16
    for axis in (0, 1):
        occ = sum(w * np.roll(occ, s, axis) for w, s in zip(k, range(-2, 3)))
    # fade to zero over the outer 12 % so the decal never shows an edge
    fx = np.clip(np.minimum(gx + ex / 2, ex / 2 - gx) / (0.12 * ex / 2), 0, 1)
    fz = np.clip(np.minimum(gz + ez / 2, ez / 2 - gz) / (0.12 * ez / 2), 0, 1)
    occ *= (fx * fx * (3 - 2 * fx)) * (fz * fz * (3 - 2 * fz))
    log('footprint: %dx%d px over %.1f x %.1f m, max occlusion %.2f, under the doors %.2f' % (
        nx, nz, ex, ez, occ.max(), occ[nz // 2, nx // 2]))
    return occ


def main():
    src, P, UV, I = load_source()
    I = drop_debris(P, UV, I)
    n, area, _, _ = face_geometry(P, I)
    filtered = filter_face_normals(P, I, n, area, FILTER_ITERATIONS, FILTER_SIGMA_R_DEG) if FILTER_ITERATIONS else None
    # material groups: classify, clean up, then sort the triangles by class (stable)
    base = load_texture(src['material']['map'], linear=True)
    mr = load_texture(src['material']['metalRoughMap'])
    stats = sample_triangles(UV, I, base, mr)
    cls = classify(P, I, filtered if filtered is not None else n, stats)
    cls = smooth_classes(P, I, cls, smooth_edge_pairs(P, I, filtered if filtered is not None else n, CREASE_DEG))
    order = np.argsort(cls, kind='stable')
    I, cls = I[order], cls[order]
    if filtered is not None:
        filtered = filtered[order]
    for k, name in enumerate(CLASSES):
        sel = cls == k
        log('group %-6s %6d triangles, %6.2f m2' % (name, sel.sum(), area[order][sel].sum()))
    normals, fan = creased_normals(P, I, CREASE_DEG, filtered=filtered)
    pos, uv, nrm, index = build_vertices(P, UV, I, normals, fan)
    groups = []
    for k, name in enumerate(CLASSES):
        start = int(np.searchsorted(cls, k)) * 3
        count = int((cls == k).sum()) * 3
        groups.append({'name': name, 'start': start, 'count': count})
    # ambient occlusion: the body's ORM texture and the ground footprint
    from PIL import Image
    layout = json.load(open(os.path.join(MODELS, 'hero-car.json')))
    dirs = fibonacci_directions(AO_DIRECTIONS)
    maps = depth_maps(P, I, dirs)
    orm, ao = bake_orm(P, UV, I, normals, mr, maps, dirs)
    orm8 = np.clip(np.round(orm * 255), 0, 255).astype(np.uint8)
    Image.fromarray(orm8).save(OUT_ORM, 'WEBP', quality=80, method=6)
    back = np.asarray(Image.open(OUT_ORM).convert('RGB')).astype(int)
    err = np.abs(back - orm8.astype(int)).reshape(-1, 3)
    log('wrote %s (%d bytes); encode error per channel mean %s, 99th pct %s' % (
        os.path.basename(OUT_ORM), os.path.getsize(OUT_ORM), err.mean(0).round(2), np.percentile(err, 99, axis=0)))
    occ = bake_footprint(P, I, layout, dirs, maps)
    Image.fromarray(np.clip(np.round(occ * 255), 0, 255).astype(np.uint8), 'L').save(OUT_FOOTPRINT, 'WEBP', lossless=True)
    log('wrote %s (%d bytes)' % (os.path.basename(OUT_FOOTPRINT), os.path.getsize(OUT_FOOTPRINT)))
    extra = {
        'textures': {'map': src['material']['map'], 'normalMap': src['material']['normalMap'],
                     'ormMap': os.path.basename(OUT_ORM)},
        'footprint': {'map': os.path.basename(OUT_FOOTPRINT), 'size': list(FOOTPRINT_EXTENT),
                      'note': 'ground occlusion (alpha), car frame, centred on the origin, +x along the texture width'},
    }
    write_outputs(pos, uv, nrm, index, groups, extra)


if __name__ == '__main__':
    main()
