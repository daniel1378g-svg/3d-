"""Small modelling kit on top of bmesh: boxes, cylinders, tubes, lathes and prisms with a material per face
and box-projected texture UVs in metres.  A `Kit` builds one mesh datablock (a prototype) in local coordinates.

Local frame convention for furniture: +Z up, the *front* of the object faces -Y, X is the width.

Element lists are kept in creation order (never Python sets), so two runs of the pipeline produce the same
meshes face for face: the lightmap UVs of a rebuild then still match an earlier bake.
"""
import math
import bpy, bmesh
from mathutils import Vector, Matrix
from . import bl


def T(x=0, y=0, z=0): return Matrix.Translation((x, y, z))
def RZ(deg): return Matrix.Rotation(math.radians(deg), 4, 'Z')
def RX(deg): return Matrix.Rotation(math.radians(deg), 4, 'X')
def RY(deg): return Matrix.Rotation(math.radians(deg), 4, 'Y')


class Kit:
    def __init__(self):
        self.bm = bmesh.new()
        self.uv = self.bm.loops.layers.uv.new('UVMap')
        self.mats = []
        self.M = Matrix.Identity(4)       # current transform applied to new primitives
        self.lowres = self.bm.faces.layers.int.new('lowres')   # 1 = may get coarser lightmap texels

    # -- internals
    def _mi(self, mat):
        if mat not in self.mats: self.mats.append(mat)
        return self.mats.index(mat)

    def _finish(self, verts, faces, mat, M=None, smooth=False, grain=None, low=False):
        M = self.M @ M if M is not None else self.M
        for v in verts: v.co = M @ v.co
        mi = self._mi(mat) if isinstance(mat, str) else None
        for f in faces:
            if mi is not None: f.material_index = mi
            f.smooth = smooth
            if low: f[self.lowres] = 1
        self.bm.normal_update()
        for f in faces: self._boxuv(f, grain)
        return faces

    def _boxuv(self, f, grain=None):
        n = f.normal
        a = max(range(3), key=lambda i: abs(n[i]) + (0.001 if i == 2 else 0))
        ax = [(1, 2), (0, 2), (0, 1)][a]
        if grain is not None and 'xyz'.index(grain) == ax[1]: ax = (ax[1], ax[0])
        for l in f.loops:
            l[self.uv].uv = (l.vert.co[ax[0]], l.vert.co[ax[1]])

    # -- primitives
    def box(self, a, b, mat, bevel=0.0, M=None, grain=None, low=False):
        """axis-aligned box between corners a and b (before the transform)."""
        a, b = Vector(a), Vector(b)
        lo = Vector((min(a.x, b.x), min(a.y, b.y), min(a.z, b.z))); hi = Vector((max(a.x, b.x), max(a.y, b.y), max(a.z, b.z)))
        r = bmesh.ops.create_cube(self.bm, size=1.0)
        verts = r['verts']
        size = hi - lo; c = (lo + hi) / 2
        for v in verts: v.co = Vector((v.co.x * size.x + c.x, v.co.y * size.y + c.y, v.co.z * size.z + c.z))
        faces = list(dict.fromkeys(f for v in verts for f in v.link_faces))
        if bevel > 0 and min(size) > bevel * 2.2:
            edges = list(dict.fromkeys(e for v in verts for e in v.link_edges))
            rr = bmesh.ops.bevel(self.bm, geom=edges, offset=bevel, segments=1, affect='EDGES', profile=0.5)
            faces = list(dict.fromkeys([f for v in rr['verts'] for f in v.link_faces] + [f for f in faces if f.is_valid]))
            verts = list(dict.fromkeys(v for f in faces for v in f.verts))
        return self._finish(verts, faces, mat, M, grain=grain, low=low)

    def cyl(self, base, r, h, mat, seg=16, r2=None, cap=True, M=None, smooth=True, axis='z', low=False):
        """cylinder / cone standing on `base` (centre of the bottom disc), along +axis."""
        rr = bmesh.ops.create_cone(self.bm, cap_ends=cap, cap_tris=False, segments=seg, radius1=r, radius2=r if r2 is None else r2, depth=h)
        verts = rr['verts']
        for v in verts: v.co.z += h / 2
        R = Matrix.Identity(4)
        if axis == 'x': R = RY(90)
        elif axis == 'y': R = RX(-90)
        MM = T(*base) @ R
        faces = list(dict.fromkeys(f for v in verts for f in v.link_faces))
        out = self._finish(verts, faces, mat, (M @ MM) if M is not None else MM, smooth=smooth, low=low)
        for f in out:
            if len(f.verts) > 4: f.smooth = False
        return out

    def tube(self, pts, r, mat, seg=8, closed=False, M=None, low=False):
        """round tube along a polyline (mitred corners)."""
        pts = [Vector(p) for p in pts]
        n = len(pts); rings = []
        up0 = None
        for i, p in enumerate(pts):
            if closed: d0 = (p - pts[i - 1]).normalized(); d1 = (pts[(i + 1) % n] - p).normalized()
            else:
                d0 = (p - pts[i - 1]).normalized() if i > 0 else (pts[1] - p).normalized()
                d1 = (pts[i + 1] - p).normalized() if i < n - 1 else d0
            t = (d0 + d1)
            t = t.normalized() if t.length > 1e-6 else d1
            if up0 is None:
                up0 = Vector((0, 0, 1)) if abs(t.z) < 0.9 else Vector((1, 0, 0))
            u = (up0 - t * up0.dot(t)).normalized(); w = t.cross(u)
            up0 = u
            k = 1.0 / max(0.35, math.cos(math.acos(max(-1, min(1, d0.dot(d1)))) / 2))     # mitre stretch
            rings.append([self.bm.verts.new(p + (u * math.cos(a) + w * math.sin(a)) * r * (k if 0 < i < n - 1 or closed else 1))
                          for a in (2 * math.pi * s / seg for s in range(seg))])
        faces = []
        for i in range(n - (0 if closed else 1)):
            A, B = rings[i], rings[(i + 1) % n]
            for s in range(seg):
                faces.append(self.bm.faces.new((A[s], A[(s + 1) % seg], B[(s + 1) % seg], B[s])))
        if not closed:
            faces.append(self.bm.faces.new(rings[0][::-1])); faces.append(self.bm.faces.new(rings[-1]))
        verts = [v for ring in rings for v in ring]
        out = self._finish(verts, faces, mat, M, smooth=True, low=low)
        for f in out:
            if len(f.verts) > 4: f.smooth = False
        return out

    def lathe(self, prof, mat, seg=24, M=None, smooth=True, low=False):
        """revolve a profile [(radius, z), ...] around Z. Points with radius 0 close the surface."""
        rings = []
        for (r, z) in prof:
            if r <= 1e-6: rings.append([self.bm.verts.new((0, 0, z))])
            else: rings.append([self.bm.verts.new((r * math.cos(2 * math.pi * s / seg), r * math.sin(2 * math.pi * s / seg), z)) for s in range(seg)])
        faces = []
        for A, B in zip(rings, rings[1:]):
            for s in range(seg):
                if len(A) == 1 and len(B) == 1: continue
                if len(A) == 1: faces.append(self.bm.faces.new((A[0], B[(s + 1) % seg], B[s])))
                elif len(B) == 1: faces.append(self.bm.faces.new((A[s], A[(s + 1) % seg], B[0])))
                else: faces.append(self.bm.faces.new((A[s], A[(s + 1) % seg], B[(s + 1) % seg], B[s])))
        verts = [v for ring in rings for v in ring]
        bmesh.ops.recalc_face_normals(self.bm, faces=faces)
        return self._finish(verts, faces, mat, M, smooth=smooth, low=low)

    def prism(self, poly, z0, z1, mat, M=None, smooth_sides=False, cap=(True, True), low=False, bevel=0.0):
        """extrude a convex-ish polygon [(x,y),...] (counter-clockwise) from z0 to z1."""
        n = len(poly)
        A = [self.bm.verts.new((x, y, z0)) for x, y in poly]; B = [self.bm.verts.new((x, y, z1)) for x, y in poly]
        faces = []; sides = []
        for i in range(n):
            f = self.bm.faces.new((A[i], A[(i + 1) % n], B[(i + 1) % n], B[i])); sides.append(f)
        if cap[0]: faces.append(self.bm.faces.new(A[::-1]))
        if cap[1]: faces.append(self.bm.faces.new(B))
        verts = A + B
        if bevel > 0 and cap[1]:
            top = [e for e in faces[-1].edges]
            rr = bmesh.ops.bevel(self.bm, geom=top, offset=bevel, segments=1, affect='EDGES', profile=0.5)
            allf = list(dict.fromkeys([f for v in rr['verts'] for f in v.link_faces] + [f for f in faces + sides if f.is_valid]))
            verts = list(dict.fromkeys(v for f in allf for v in f.verts)); out = self._finish(verts, allf, mat, M, low=low)
            return out
        out = self._finish(verts, faces + sides, mat, M, low=low)
        if smooth_sides:
            for f in sides: f.smooth = True
        return out

    def quad(self, pts, mat, uvs=None, M=None, low=False):
        vs = [self.bm.verts.new(p) for p in pts]
        f = self.bm.faces.new(vs)
        self._finish(vs, [f], mat, M, low=low)
        if uvs is not None:
            for l, uv in zip(f.loops, uvs): l[self.uv].uv = uv
        return f

    def add(self, other, M=None):
        """merge another Kit's geometry (optionally transformed)."""
        me = other.mesh('_tmp')
        off = len(self.bm.verts)
        tmp = bmesh.new(); tmp.from_mesh(me)
        uvl = tmp.loops.layers.uv.active
        low = tmp.faces.layers.int.get('lowres')
        MM = self.M @ M if M is not None else self.M
        vmap = {v: self.bm.verts.new(MM @ v.co) for v in tmp.verts}
        flip = MM.determinant() < 0
        for f in tmp.faces:
            vs = [vmap[v] for v in f.verts]
            nf = self.bm.faces.new(vs[::-1] if flip else vs)
            nf.material_index = self._mi(other.mats[f.material_index]) if other.mats else 0
            nf.smooth = f.smooth
            if low is not None: nf[self.lowres] = f[low]
            src = list(f.loops)[::-1] if flip else list(f.loops)
            for l, sl in zip(nf.loops, src): l[self.uv].uv = sl[uvl].uv
        tmp.free(); bpy.data.meshes.remove(me)

    def rounded_rect(self, w, d, r, seg=4, cx=0.0, cy=0.0):
        """helper: CCW outline of a rounded rectangle centred on (cx, cy)."""
        pts = []
        for (sx, sy, a0) in ((1, 1, 0), (-1, 1, 90), (-1, -1, 180), (1, -1, 270)):
            ox, oy = cx + sx * (w / 2 - r), cy + sy * (d / 2 - r)
            for k in range(seg + 1):
                a = math.radians(a0 + 90 * k / seg)
                pts.append((ox + r * math.cos(a), oy + r * math.sin(a)))
        return pts

    # -- output
    def mesh(self, name):
        bmesh.ops.remove_doubles(self.bm, verts=self.bm.verts, dist=1e-5)
        me = bpy.data.meshes.new(name)
        self.bm.to_mesh(me)
        for m in self.mats: me.materials.append(bl.material(m))
        try: me.set_sharp_from_angle(angle=math.radians(42))
        except Exception: pass
        me.update()
        return me

    def tris(self):
        return sum(len(f.verts) - 2 for f in self.bm.faces)


_protos = {}


def proto(name, builder):
    """cache a prototype mesh: `builder` is a function returning a Kit."""
    if name not in _protos:
        k = builder()
        _protos[name] = k.mesh('P_' + name)
        _protos[name]['tris'] = k.tris()
    return _protos[name]


def reset():
    _protos.clear()


FRONT = {'S': 0.0, 'E': 90.0, 'N': 180.0, 'W': -90.0}


def place(mesh, x, y, front='S', z=0.0, room=None, kind='furn', coll='FURN', name=None, rot=None, **props):
    """instance a prototype at plan position (x, y); `front` = plan direction its front faces (or rot = degrees)."""
    from . import plan
    ob = bpy.data.objects.new(name or mesh.name.replace('P_', ''), mesh)
    ob.location = plan.W(x, y, z)
    ob.rotation_euler = (0, 0, math.radians(FRONT[front] if rot is None else rot))
    bl.collection(coll).objects.link(ob)
    r = room or plan.room_at(x, y)
    ob['room'] = (r.get('parent', r['id']) if isinstance(r, dict) else r) if r else 'EXT'
    ob['kind'] = kind
    for k, v in props.items(): ob[k] = v
    return ob
