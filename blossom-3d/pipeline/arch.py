"""Architecture mesher: walls, lintels, sills, floors and ceilings from the plan rectangles.

Everything is axis-aligned, so the model is built on one global grid (every wall face, opening edge and
height level is a grid line). Faces are emitted one per grid cell: all vertices lie on the grid, adjacent
faces always share full edges, and there are no T-junctions that could crack or split lightmap islands.

Output (pure Python / numpy, no Blender): a list of `Part` records, one per room, each a quad soup with
  material per face, texture UVs in metres, and lightmap islands (planar, in metres, origin at the island's
  own bounding box) to be packed later.
"""
from collections import defaultdict, deque
import numpy as np
from . import plan

EXTRA_SOLIDS = [
    # (rect, z0, z1): door heads where there is no wall to cut an opening into
    ((13.03, 28.849, 13.112, 29.991), 2.10, plan.H_WALL),     # tray-return gate, north
    ((13.03, 34.307, 13.112, 35.733), 2.10, plan.H_WALL),     # tray-return gate, south
    ((29.087, 27.36, 29.238, 29.991), 2.40, plan.H_WALL),     # downstand beam at the junction with the existing corridor
]


class Part:
    def __init__(self, name):
        self.name = name
        self.verts = []            # [(x,y,z)] world
        self.vmap = {}
        self.faces = []            # [(i0,i1,i2,i3)]
        self.mats = []             # material name per face
        self.uv0 = []              # per face: 4 x (u,v)
        self.lm = []               # per face: 4 x (u,v) metres inside its island
        self.island = []           # island index per face (index into self.islands)
        self.islands = []          # [(w,h, density_class)]

    def v(self, p):
        k = (round(p[0], 4), round(p[1], 4), round(p[2], 4))
        i = self.vmap.get(k)
        if i is None:
            i = self.vmap[k] = len(self.verts)
            self.verts.append(k)
        return i

    def quad(self, pts, mat, uv0, lm, island):
        self.faces.append(tuple(self.v(p) for p in pts))
        self.mats.append(mat); self.uv0.append(uv0); self.lm.append(lm); self.island.append(island)


def _grid():
    xs, ys = set(), set()
    zs = {0.0, plan.H_WALL, plan.H_LOW, 2.10}
    solids = []
    for r in plan.WALLS:
        solids.append((r, 0.0, plan.wall_height(r)))
    for o in plan.OPENINGS:
        r = o['rect']
        if o['sill'] > 0: solids.append((r, 0.0, o['sill']))
        if o['head'] < plan.H_WALL: solids.append((r, o['head'], plan.H_WALL))
        # centre line across the thickness: floor finishes change under the door leaf
        if o['axis'] == 'x': ys.add(round((r[1] + r[3]) / 2, 3))
        else: xs.add(round((r[0] + r[2]) / 2, 3))
    solids += EXTRA_SOLIDS
    for (r, z0, z1) in solids:
        xs.update((r[0], r[2])); ys.update((r[1], r[3])); zs.update((z0, z1))
    for room in plan.ROOMS:
        for r in room['rects']:
            xs.update((r[0], r[2])); ys.update((r[1], r[3]))
        zs.add(room['ceil'])
    def tidy(vals):
        vals = sorted(vals); out = [vals[0]]
        for v in vals[1:]:
            if v - out[-1] > 1.5e-3: out.append(v)
        return np.array(out)
    xs, ys, zs = tidy(xs), tidy(ys), tidy(zs)
    # limit the largest cell so floors/ceilings get some tessellation for vertex-level culling/precision
    def split(a, maxd):
        out = [a[0]]
        for v in a[1:]:
            n = int(np.ceil((v - out[-1]) / maxd))
            for k in range(1, n + 1): out.append(out[-1] + (v - out[-1]) / (n - k + 1))
        return np.array(out)
    xs, ys = split(xs, 2.5), split(ys, 2.5)
    return xs, ys, zs, solids


def _idx(a, v):
    return int(np.argmin(np.abs(a - v)))


def build():
    xs, ys, zs, solids = _grid()
    nx, ny, nz = len(xs) - 1, len(ys) - 1, len(zs) - 1
    cx, cy, cz = (xs[:-1] + xs[1:]) / 2, (ys[:-1] + ys[1:]) / 2, (zs[:-1] + zs[1:]) / 2
    occ = np.zeros((nz, ny, nx), bool)
    for (r, z0, z1) in solids:
        i0, i1 = _idx(xs, r[0]), _idx(xs, r[2]); j0, j1 = _idx(ys, r[1]), _idx(ys, r[3]); k0, k1 = _idx(zs, z0), _idx(zs, z1)
        occ[k0:k1, j0:j1, i0:i1] = True

    # ---- room map on the plan grid (cells under walls / in openings go to the nearest room)
    room_ids = [r['id'] for r in plan.ROOMS]
    rmap = -np.ones((ny, nx), int)
    for j in range(ny):
        for i in range(nx):
            r = plan.room_at(cx[i], cy[j])
            if r is not None: rmap[j, i] = room_ids.index(r['id'])
    inroom = rmap >= 0
    near = rmap.copy()
    # breadth-first growth by distance, limited to 0.32 m
    dist = np.where(inroom, 0.0, np.inf)
    dq = deque((j, i) for j in range(ny) for i in range(nx) if inroom[j, i])
    while dq:
        j, i = dq.popleft()
        for dj, di in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            jj, ii = j + dj, i + di
            if 0 <= jj < ny and 0 <= ii < nx and not inroom[jj, ii]:
                step = (ys[jj + 1] - ys[jj]) if dj else (xs[ii + 1] - xs[ii])
                nd = dist[j, i] + step
                if nd < dist[jj, ii] - 1e-9 and nd <= 0.33:
                    dist[jj, ii] = nd; near[jj, ii] = near[j, i]; dq.append((jj, ii))

    parts = {}
    def part(name):
        if name not in parts: parts[name] = Part(name)
        return parts[name]

    def room_of_point(x, y):
        r = plan.room_at(x, y)
        return r

    # ---- wall faces: one quad per exposed cell face, grouped into planar islands per (plane, material, room)
    faces = []   # (axis, sign, plane_index, a, b, material, roomname)
    def side_material(x, y, zmid, zlo, zhi):
        r = room_of_point(x, y)
        if r is None: return 'ext_wall', 'EXT'
        root = r.get('parent', r['id'])
        if zlo >= r['ceil'] - 1e-6: return 'void', root          # above the ceiling: never seen
        return (r['wall'][0] if zmid < 2.10 else r['wall'][1]), root
    for k in range(nz):
        for j in range(ny):
            for i in range(nx):
                if not occ[k, j, i]: continue
                x0, x1, y0, y1, z0, z1 = xs[i], xs[i + 1], ys[j], ys[j + 1], zs[k], zs[k + 1]
                zm = (z0 + z1) / 2
                if i == 0 or not occ[k, j, i - 1]:
                    m, rn = side_material(x0 - 0.06, cy[j], zm, z0, z1); faces.append(('x', -1, i, j, k, m, rn))
                if i == nx - 1 or not occ[k, j, i + 1]:
                    m, rn = side_material(x1 + 0.06, cy[j], zm, z0, z1); faces.append(('x', +1, i + 1, j, k, m, rn))
                if j == 0 or not occ[k, j - 1, i]:
                    m, rn = side_material(cx[i], y0 - 0.06, zm, z0, z1); faces.append(('y', -1, j, i, k, m, rn))
                if j == ny - 1 or not occ[k, j + 1, i]:
                    m, rn = side_material(cx[i], y1 + 0.06, zm, z0, z1); faces.append(('y', +1, j + 1, i, k, m, rn))
                if k == nz - 1 or not occ[k + 1, j, i]:
                    r = room_of_point(cx[i], cy[j]); top = z1 >= plan.H_WALL - 1e-6
                    if top: m, rn = 'wall_cut', 'TOP'
                    elif abs(z1 - plan.SILL) < 1e-6: m, rn = 'sill', (r.get('parent', r['id']) if r else 'REF')
                    else:
                        rr = r or plan.ROOM[room_ids[near[j, i]]] if near[j, i] >= 0 else None
                        m, rn = ('tile_wet', rr.get('parent', rr['id'])) if rr else ('paint_white', 'EXT')
                    faces.append(('z', +1, k + 1, i, j, m, rn))
                if k > 0 and not occ[k - 1, j, i]:
                    rr = plan.ROOM[room_ids[near[j, i]]] if near[j, i] >= 0 else None
                    faces.append(('z', -1, k, i, j, 'paint_white', rr.get('parent', rr['id']) if rr else 'EXT'))

    groups = defaultdict(dict)
    for (ax, sg, p, a, b, m, rn) in faces:
        if m == 'void': continue
        groups[(ax, sg, p, m, rn)][(a, b)] = True
    DENS = {'ext_wall': 'lo', 'wall_cut': 'lo'}
    for (ax, sg, p, m, rn), cells in groups.items():
        prt = part(rn)
        seen = set()
        for start in list(cells):
            if start in seen: continue
            comp = []; dq = deque([start]); seen.add(start)
            while dq:
                c = dq.popleft(); comp.append(c)
                for d in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    n = (c[0] + d[0], c[1] + d[1])
                    if n in cells and n not in seen: seen.add(n); dq.append(n)
            # plane coordinates of this component
            if ax == 'x':   ua, va = ys, zs
            elif ax == 'y': ua, va = xs, zs
            else:           ua, va = xs, ys
            umin = min(ua[a] for a, b in comp); vmin = min(va[b] for a, b in comp)
            umax = max(ua[a + 1] for a, b in comp); vmax = max(va[b + 1] for a, b in comp)
            isl = len(prt.islands); prt.islands.append((umax - umin, vmax - vmin, DENS.get(m, 'hi')))
            for (a, b) in comp:
                u0, u1, v0, v1 = ua[a], ua[a + 1], va[b], va[b + 1]
                if ax == 'x':
                    X = xs[p]; pts = [(X, u0, v0), (X, u1, v0), (X, u1, v1), (X, u0, v1)]
                    flip = sg > 0
                elif ax == 'y':
                    Y = ys[p]; pts = [(u0, Y, v0), (u1, Y, v0), (u1, Y, v1), (u0, Y, v1)]
                    flip = sg < 0
                else:
                    Z = zs[p]; pts = [(u0, v0, Z), (u1, v0, Z), (u1, v1, Z), (u0, v1, Z)]
                    flip = sg > 0
                uv = [(u0, v0), (u1, v0), (u1, v1), (u0, v1)]
                lm = [(u0 - umin, v0 - vmin), (u1 - umin, v0 - vmin), (u1 - umin, v1 - vmin), (u0 - umin, v1 - vmin)]
                # to world (y flips) -> winding flips once more
                wpts = [plan.W(*q) for q in pts]
                if flip: wpts, uv, lm = wpts[::-1], uv[::-1], lm[::-1]
                prt.quad(wpts, m, uv, lm, isl)

    # ---- floors and ceilings per room
    for ri, room in enumerate(plan.ROOMS):
        if room.get('closed'): continue
        root = room.get('parent', room['id']); prt = part(root)
        cells = [(j, i) for j in range(ny) for i in range(nx) if near[j, i] == ri]
        if not cells: continue
        cset = set(cells); seen = set()
        for start in cells:
            if start in seen: continue
            comp = []; dq = deque([start]); seen.add(start)
            while dq:
                c = dq.popleft(); comp.append(c)
                for d in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    n = (c[0] + d[0], c[1] + d[1])
                    if n in cset and n not in seen: seen.add(n); dq.append(n)
            umin = min(xs[i] for j, i in comp); vmin = min(ys[j] for j, i in comp)
            umax = max(xs[i + 1] for j, i in comp); vmax = max(ys[j + 1] for j, i in comp)
            for kind in ('floor', 'ceil'):
                isl = len(prt.islands); prt.islands.append((umax - umin, vmax - vmin, 'hi' if kind == 'floor' else 'mid'))
                z = 0.0 if kind == 'floor' else room['ceil']
                m = room['floor'] if kind == 'floor' else room['ceiling']
                for (j, i) in comp:
                    if kind == 'ceil' and occ[_idx(zs, room['ceil']) - 1, j, i] and occ[min(_idx(zs, room['ceil']), nz - 1), j, i]:
                        continue    # buried inside a full-height wall
                    u0, u1, v0, v1 = xs[i], xs[i + 1], ys[j], ys[j + 1]
                    pts = [(u0, v0, z), (u1, v0, z), (u1, v1, z), (u0, v1, z)]
                    uv = [(u0, v0), (u1, v0), (u1, v1), (u0, v1)]
                    lm = [(u0 - umin, v0 - vmin), (u1 - umin, v0 - vmin), (u1 - umin, v1 - vmin), (u0 - umin, v1 - vmin)]
                    wpts = [plan.W(*q) for q in pts]
                    # after the y flip the listed order is clockwise seen from above: keep for ceilings, reverse for floors
                    if kind == 'floor': wpts, uv, lm = wpts[::-1], uv[::-1], lm[::-1]
                    prt.quad(wpts, m, uv, lm, isl)

    info = dict(xs=xs, ys=ys, zs=zs, occ=occ, near=near, room_ids=room_ids)
    return parts, info


if __name__ == '__main__':
    parts, info = build()
    tot = 0
    for n, p in parts.items():
        print(f'{n:8s} faces {len(p.faces):6d} verts {len(p.verts):6d} islands {len(p.islands):4d} mats {sorted(set(p.mats))}')
        tot += len(p.faces)
    print('total quads', tot, 'grid', len(info['xs']), len(info['ys']), len(info['zs']))
    area = defaultdict(float)
    for p in parts.values():
        for (w, h, d) in p.islands: area[d] += w * h
    print('island bbox area by density class', dict(area))
