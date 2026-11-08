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
  3. writes an indexed vertex buffer (a vertex is split only where the uv or the fan differs).

Output (site/assets/models): hero-car-body.json (descriptor) and hero-car-body.bin
  position float32 x3 | uv uint16 x2 normalised | normal int16 x3 normalised | index uint16
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


def main():
    src, P, UV, I = load_source()
    I = drop_debris(P, UV, I)
    n, area, _, _ = face_geometry(P, I)
    filtered = filter_face_normals(P, I, n, area, FILTER_ITERATIONS, FILTER_SIGMA_R_DEG) if FILTER_ITERATIONS else None
    normals, fan = creased_normals(P, I, CREASE_DEG, filtered=filtered)
    pos, uv, nrm, index = build_vertices(P, UV, I, normals, fan)
    groups = [{'name': 'body', 'start': 0, 'count': int(index.size)}]
    extra = {'textures': {'map': src['material']['map'], 'normalMap': src['material']['normalMap'],
                          'metalRoughMap': src['material']['metalRoughMap']}}
    write_outputs(pos, uv, nrm, index, groups, extra)


if __name__ == '__main__':
    main()
