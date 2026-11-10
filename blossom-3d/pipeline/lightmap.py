"""Lightmap UVs.

Every mesh datablock (prototype) gets a second UV layer 'LM': its faces are split into box-projection islands
(connected faces sharing a dominant normal axis), projected flat, and packed into one rectangle per prototype.
Every object then receives a rectangle in an atlas; the object's final lightmap UV is  uv * scale + offset.
Texel density is searched so each atlas is as full as possible.
"""
import math
import numpy as np
import bpy, bmesh

PAD = 2            # texels of padding around every island (dilated after the bake)


class Skyline:
    """bottom-left skyline rectangle packer."""
    def __init__(self, w, h=None):
        self.w, self.h = w, h
        self.sky = [(0, 0, w)]          # (x, y, width)
        self.top = 0

    def place(self, w, h):
        best = None
        sky = self.sky
        for i, (x, y, sw) in enumerate(sky):
            if x + w > self.w: break
            # height needed to rest on segments i..j
            yy = y; rem = w; j = i
            while rem > 0 and j < len(sky):
                yy = max(yy, sky[j][1]); rem -= sky[j][2]; j += 1
            if rem > 0: continue
            if self.h is not None and yy + h > self.h: continue
            if best is None or yy < best[0] or (yy == best[0] and x < best[1]): best = (yy, x, i)
        if best is None: return None
        yy, x, i = best
        # update skyline
        new = (x, yy + h, w)
        out = sky[:i]; out.append(new)
        end = x + w
        for (sx, sy, sw) in sky[i:]:
            if sx + sw <= end: continue
            if sx < end: out.append((end, sy, sx + sw - end))
            else: out.append((sx, sy, sw))
        # merge neighbours at the same height
        merged = [out[0]]
        for s in out[1:]:
            if s[1] == merged[-1][1]: merged[-1] = (merged[-1][0], s[1], merged[-1][2] + s[2])
            else: merged.append(s)
        self.sky = merged
        self.top = max(self.top, yy + h)
        return x, yy


def islands_of(me):
    """box-projection islands of a mesh: list of dicts(loops, uv (n,2) metres from the island's corner, w, h, dens)."""
    bm = bmesh.new(); bm.from_mesh(me)
    bm.faces.ensure_lookup_table()
    dl = bm.faces.layers.float.get('dens'); ll = bm.faces.layers.int.get('lowres')
    lab = []; dens = []
    for f in bm.faces:
        n = f.normal
        a = max(range(3), key=lambda i: abs(n[i]) + (0.002 if i == 2 else (0.001 if i == 0 else 0)))
        lab.append(a * 2 + (1 if n[a] < 0 else 0))
        d = 1.0
        if dl is not None and f[dl] > 0: d = f[dl]
        elif ll is not None and f[ll]: d = 0.5
        dens.append(d)
    parent = list(range(len(bm.faces)))
    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]; i = parent[i]
        return i
    for e in bm.edges:
        fs = e.link_faces
        for a in range(1, len(fs)):
            i, j = fs[0].index, fs[a].index
            if lab[i] == lab[j] and dens[i] == dens[j]:
                ri, rj = find(i), find(j)
                if ri != rj: parent[ri] = rj
    groups = {}
    for f in bm.faces: groups.setdefault(find(f.index), []).append(f)
    out = []
    for root, faces in groups.items():
        a = lab[root] // 2
        ax = [(1, 2), (0, 2), (0, 1)][a]
        loops = []; uv = []
        for f in faces:
            for l in f.loops:
                loops.append(l.index); uv.append((l.vert.co[ax[0]], l.vert.co[ax[1]]))
        uv = np.array(uv, np.float64)
        mn = uv.min(0); sz = uv.max(0) - mn
        out.append(dict(loops=np.array(loops), uv=uv - mn, w=float(sz[0]), h=float(sz[1]), dens=dens[root]))
    bm.free()
    return out


def layout_proto(isl, density):
    """pack a prototype's islands at `density` texels/metre -> (pw, ph, positions)."""
    sizes = []
    for it in isl:
        d = density * it['dens']
        sizes.append((max(1, math.ceil(it['w'] * d)) + 2 * PAD, max(1, math.ceil(it['h'] * d)) + 2 * PAD))
    if len(sizes) == 1: return sizes[0][0], sizes[0][1], [(0, 0)]
    area = sum(w * h for w, h in sizes)
    width = max(max(w for w, h in sizes), int(math.sqrt(area) * 1.08))
    order = sorted(range(len(sizes)), key=lambda i: (-sizes[i][1], -sizes[i][0]))
    sk = Skyline(width); pos = [None] * len(sizes)
    for i in order: pos[i] = sk.place(*sizes[i])
    pw = max(p[0] + s[0] for p, s in zip(pos, sizes))
    return pw, sk.top, pos


def assign(groups, sizes, verbose=True):
    """groups: {atlas index: [objects]}, sizes: {atlas index: pixel size}.
    Writes the 'LM' layer of every mesh (normalised to its own rectangle) and ob['lm'] = (sx, sy, ox, oy), ob['lmi']."""
    cache = {}
    result = {}
    for gi, objs in groups.items():
        size = sizes[gi]
        meshes = {}
        for ob in objs: meshes.setdefault(ob.data.name, ob.data)
        for name, me in meshes.items():
            if name not in cache: cache[name] = islands_of(me)
        scale = {ob.name: float(ob.get('lm_scale', 1.0)) for ob in objs}
        # objects sharing a mesh may still ask for different densities: layout key = (mesh, scale)
        def try_density(D):
            lay = {}
            rects = []
            for ob in objs:
                key = (ob.data.name, scale[ob.name])
                if key not in lay: lay[key] = layout_proto(cache[ob.data.name], D * scale[ob.name])
                pw, ph, _ = lay[key]
                rects.append((pw, ph, ob))
            order = sorted(range(len(rects)), key=lambda i: (-rects[i][1], -rects[i][0]))
            sk = Skyline(size, size); pos = [None] * len(rects)
            for i in order:
                p = sk.place(rects[i][0], rects[i][1])
                if p is None: return None
                pos[i] = p
            return lay, rects, pos
        # search the largest density that fits
        total = sum(sum(it['w'] * it['h'] * it['dens'] ** 2 for it in cache[ob.data.name]) * scale[ob.name] ** 2 for ob in objs)
        D = math.sqrt(size * size * 0.80 / max(total, 1e-6))
        res = None
        for _ in range(60):
            res = try_density(D)
            if res is not None: break
            D *= 0.965
        if res is None: raise RuntimeError('lightmap atlas %d does not fit' % gi)
        lay, rects, pos = res
        used = sum(r[0] * r[1] for r in rects) / (size * size)
        if verbose: print(f'  atlas {gi}: {len(objs)} objects, {len(meshes)} meshes, {D:.1f} texels/m, fill {used * 100:.0f}%')
        # write proto UVs (one layout per mesh: the first scale seen wins; meshes are not shared across scales in practice)
        done = set()
        for (pw, ph, ob), (px, py) in zip(rects, pos):
            me = ob.data
            if me.name not in done:
                done.add(me.name)
                key = (me.name, scale[ob.name]); _, _, ipos = lay[key]
                D2 = D * scale[ob.name]
                uv = np.zeros((len(me.loops), 2), np.float32)
                for it, (ix, iy) in zip(cache[me.name], ipos):
                    d = D2 * it['dens']
                    uv[it['loops'], 0] = (ix + PAD + it['uv'][:, 0] * d) / pw
                    uv[it['loops'], 1] = (iy + PAD + it['uv'][:, 1] * d) / ph
                layer = me.uv_layers.get('LM') or me.uv_layers.new(name='LM')
                layer.data.foreach_set('uv', uv.ravel())
            ob['lm'] = (pw / size, ph / size, px / size, py / size)
            ob['lmi'] = gi
        result[gi] = dict(density=D, fill=used)
    return result
