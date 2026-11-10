"""Doors, frames, windows and skirtings generated from plan.OPENINGS."""
import math
import bpy
from mathutils import Vector
from . import plan, bl
from .kit import Kit, T, RZ, place, proto

LEAF_T = 0.04


# ------------------------------------------------------------------------------------ door leaves
def lever(k, x, z, side, toward=-1):
    """lever handle on one face (side = +1/-1 along Y), pointing along X towards the hinge."""
    y = side * (LEAF_T / 2)
    k.cyl((x, y if side > 0 else y - 0.008, z), 0.026, 0.008, 'chrome', seg=12, axis='y')
    k.tube([(x, y + side * 0.004, z), (x, y + side * 0.05, z), (x + toward * 0.115, y + side * 0.05, z)], 0.009, 'chrome', seg=8)


def leaf(w, h, style):
    k = Kit()
    t = LEAF_T / 2
    body = {'int': 'door_oak', 'kit': 'door_int', 'wet': 'door_wet', 'clean': 'door_int', 'tech': 'steel_dark', 'ext': 'door_ext',
            'glazed': 'door_oak', 'entrance': 'alu_dark'}[style]
    x0, x1, z0, z1 = 0.004, w, 0.008, h
    if style in ('glazed', 'entrance'):
        st = 0.11 if style == 'glazed' else 0.07          # stile width
        rail_b = 0.22 if style == 'glazed' else 0.10
        k.box((x0, -t, z0), (x0 + st, t, z1), body, bevel=0.003, grain='z')
        k.box((x1 - st, -t, z0), (x1, t, z1), body, bevel=0.003, grain='z')
        k.box((x0 + st, -t, z0), (x1 - st, t, z0 + rail_b), body, grain='x')
        k.box((x0 + st, -t, z1 - st), (x1 - st, t, z1), body, grain='x')
        if style == 'glazed':
            k.box((x0 + st, -t, 1.0), (x1 - st, t, 1.0 + 0.09), body, grain='x')
        k.box((x0 + st, -0.004, z0 + rail_b), (x1 - st, 0.004, z1 - st), 'glass')
        # pull handles
        for s in (1, -1):
            xh = x1 - st / 2
            k.tube([(xh, s * t, 0.85), (xh, s * (t + 0.055), 0.85), (xh, s * (t + 0.055), 1.35), (xh, s * t, 1.35)], 0.012, 'chrome', seg=8)
    else:
        vision = style in ('kit', 'clean', 'ext')
        if vision:
            vx0, vx1 = (w * 0.5 - 0.11, w * 0.5 + 0.11) if style != 'ext' else (w * 0.5 - 0.2, w * 0.5 + 0.2)
            vz0, vz1 = (1.25, 1.75) if style != 'ext' else (1.1, 1.8)
            k.box((x0, -t, z0), (vx0, t, z1), body, grain='z')
            k.box((vx1, -t, z0), (x1, t, z1), body, grain='z')
            k.box((vx0, -t, z0), (vx1, t, vz0), body, grain='z')
            k.box((vx0, -t, vz1), (vx1, t, z1), body, grain='z')
            k.box((vx0, -0.004, vz0), (vx1, 0.004, vz1), 'glass')
            for s in (1, -1):       # glazing bead
                for (a, b) in (((vx0 - 0.012, vz0 - 0.012), (vx1 + 0.012, vz0)), ((vx0 - 0.012, vz1), (vx1 + 0.012, vz1 + 0.012)),
                               ((vx0 - 0.012, vz0), (vx0, vz1)), ((vx1, vz0), (vx1 + 0.012, vz1))):
                    k.box((a[0], s * t, a[1]), (b[0], s * (t + 0.004), b[1]), 'steel' if style != 'ext' else 'alu_dark', low=True)
        else:
            k.box((x0, -t, z0), (x1, t, z1), body, bevel=0.002, grain='z')
        if style in ('kit', 'clean'):
            for s in (1, -1):
                k.box((x0 + 0.02, s * t, z0 + 0.01), (x1 - 0.02, s * (t + 0.0015), z0 + 0.26), 'steel', low=True)       # kick plate
        if style == 'tech':
            for i in range(6):      # louvre
                k.box((0.18, -t - 0.004, 0.25 + i * 0.045), (w - 0.18, t + 0.004, 0.25 + i * 0.045 + 0.02), 'steel', low=True)
        if style == 'wet':
            k.box((x0, -t - 0.001, z0), (x1, t + 0.001, z0 + 0.12), 'steel', low=True)
        for s in (1, -1):
            lever(k, w - 0.07, 1.03, s)
            k.box((w - 0.085, s * t, 0.93), (w - 0.055, s * (t + 0.003), 0.96), 'chrome', low=True)       # cylinder rose
        # hinges (visible barrels on the hinge edge)
        for hz in (0.25, h * 0.5, h - 0.25):
            k.cyl((0.0, 0, hz - 0.05), 0.008, 0.1, 'chrome', seg=8)
    return k


def _door_frame(k, o, alu=False):
    """lining + architraves around an opening, built in plan coordinates (converted on output)."""
    x0, y0, x1, y1 = o['rect']; head = o['head']
    mat = 'alu_dark' if alu else 'frame_white'
    cas, lin, proud = (0.035, 0.03, 0.006) if alu else (0.055, 0.022, 0.012)
    def pbox(ax0, ay0, az0, ax1, ay1, az1):
        a = plan.W(ax0, ay0, az0); b = plan.W(ax1, ay1, az1)
        k.box(a, b, mat, bevel=0.002)
    if o['axis'] == 'y':
        pbox(x0 - proud, y0 - cas, 0, x1 + proud, y0 + lin, head)
        pbox(x0 - proud, y1 - lin, 0, x1 + proud, y1 + cas, head)
        pbox(x0 - proud, y0 - cas, head - lin, x1 + proud, y1 + cas, head + cas)
    else:
        pbox(x0 - cas, y0 - proud, 0, x0 + lin, y1 + proud, head)
        pbox(x1 - lin, y0 - proud, 0, x1 + cas, y1 + proud, head)
        pbox(x0 - cas, y0 - proud, head - lin, x1 + cas, y1 + proud, head + cas)


SWING_N = {'W': Vector((-1, 0)), 'E': Vector((1, 0)), 'N': Vector((0, 1)), 'S': Vector((0, -1))}     # world XY
CLOSED_DIR = {'N': Vector((0, -1)), 'S': Vector((0, 1)), 'W': Vector((1, 0)), 'E': Vector((-1, 0))}  # from the hinge end, world XY


def _leaf_object(o, hinge, w_leaf, style, suffix=''):
    x0, y0, x1, y1 = o['rect']
    inset = 0.028
    sw = o['swing']
    face_off = 0.03
    if o['axis'] == 'y':
        hx = (x0 + face_off) if sw == 'W' else (x1 - face_off)
        hy = (y0 + inset) if hinge == 'N' else (y1 - inset)
    else:
        hy = (y0 + face_off) if sw == 'N' else (y1 - face_off)
        hx = (x0 + inset) if hinge == 'W' else (x1 - inset)
    d = CLOSED_DIR[hinge]; n = SWING_N[sw]
    sign = 1.0 if (d.x * n.y - d.y * n.x) > 0 else -1.0
    h = o['head'] - 0.03 if style != 'entrance' else 2.12
    name = f"leaf_{style}_{round(w_leaf * 1000)}_{round(h * 1000)}"
    me = proto(name, lambda: leaf(w_leaf, h, style))
    ob = place(me, hx, hy, rot=math.degrees(math.atan2(d.y, d.x)), kind='door', coll='DOORS', name='DOOR_' + o['id'] + suffix)
    if not o.get('locked'):
        ob['door'] = 'swing'
        ob['door_open'] = sign * (86.0 if style not in ('entrance',) else 84.0)
        ob['door_id'] = o['id']
    return ob


def build(info):
    frames = {}
    def fk(room):
        if room not in frames: frames[room] = Kit()
        return frames[room]
    doors = []
    for o in plan.OPENINGS:
        x0, y0, x1, y1 = o['rect']; cxm, cym = (x0 + x1) / 2, (y0 + y1) / 2
        kind = o['kind']
        # the frame is baked with the room on the swing side (any side for windows)
        probe = {'W': (x0 - 0.3, cym), 'E': (x1 + 0.3, cym), 'N': (cxm, y0 - 0.3), 'S': (cxm, y1 + 0.3)}
        r = None
        for s in ([o.get('swing')] if o.get('swing') else []) + ['N', 'S', 'E', 'W']:
            r = plan.room_at(*probe[s])
            if r is not None: break
        rn = r.get('parent', r['id']) if r else 'EXT'
        k = fk(rn)
        if kind in ('door', 'double', 'slide', 'pass'):
            style = o.get('style', 'int')
            alu = style in ('entrance', 'ext')
            _door_frame(k, o, alu=alu)
            w = o['width']
            if kind == 'door':
                doors.append(_leaf_object(o, o['hinge'], w - 0.056 - 0.004, style))
            elif kind == 'double':
                ends = ('N', 'S') if o['axis'] == 'y' else ('W', 'E')
                wl = (w - 0.056) / 2 - 0.003
                doors.append(_leaf_object(o, ends[0], wl, style, 'a'))
                doors.append(_leaf_object(o, ends[1], wl, style, 'b'))
                if style == 'entrance':     # fixed glazed transom above the doors
                    a = plan.W(x0 + 0.1, y0 + 0.035, 2.15); b = plan.W(x0 + 0.16, y1 - 0.035, 2.21)
                    k.box(a, b, 'alu_dark')
                    a = plan.W(x0 + 0.125, y0 + 0.035, 2.21); b = plan.W(x0 + 0.133, y1 - 0.035, o['head'] - 0.035)
                    k.box(a, b, 'glass')
            elif kind == 'slide':
                # leaf hangs on the room side of the wall (south face), slides west into the pocket
                wl = w + 0.06
                me = proto(f'leaf_slide_{round(wl * 1000)}', lambda: leaf(wl, o['head'] - 0.02, 'int'))
                ob = place(me, x0 - 0.03, y1 + 0.03, rot=0.0, kind='door', coll='DOORS', name='DOOR_' + o['id'])
                ob['door'] = 'slide'; ob['door_slide'] = -(w - 0.02); ob['door_id'] = o['id']
                doors.append(ob)
                a = plan.W(x0 - w - 0.1, y1 + 0.005, o['head'] + 0.01); b = plan.W(x1 + 0.08, y1 + 0.06, o['head'] + 0.07)
                k.box(a, b, 'steel')        # track cover
        elif kind == 'window':
            _window(k, o)
    for rn, k in frames.items():
        ob = bpy.data.objects.new('J_' + rn, k.mesh('J_' + rn))
        bl.collection('JOIN').objects.link(ob); ob['room'] = rn; ob['kind'] = 'join'
    _skirtings(info)
    return doors


def _window(k, o):
    x0, y0, x1, y1 = o['rect']; s, h = o['sill'], o['head']
    # axis 'x' windows on the south facade: frame sits towards the outside (y1)
    yf0, yf1 = y1 - 0.085, y1 - 0.02
    f = 0.05
    def pbox(ax0, ay0, az0, ax1, ay1, az1, mat='alu_dark', bev=0.0):
        k.box(plan.W(ax0, ay0, az0), plan.W(ax1, ay1, az1), mat, bevel=bev)
    pbox(x0, yf0, s, x0 + f, yf1, h); pbox(x1 - f, yf0, s, x1, yf1, h)
    pbox(x0 + f, yf0, s, x1 - f, yf1, s + f); pbox(x0 + f, yf0, h - f, x1 - f, yf1, h)
    xm = (x0 + x1) / 2
    pbox(xm - 0.035, yf0, s + f, xm + 0.035, yf1, h - f)
    for (a, b) in ((x0 + f, xm - 0.035), (xm + 0.035, x1 - f)):       # sashes
        g = 0.035
        pbox(a, yf0 + 0.01, s + f, a + g, yf1 - 0.01, h - f); pbox(b - g, yf0 + 0.01, s + f, b, yf1 - 0.01, h - f)
        pbox(a + g, yf0 + 0.01, s + f, b - g, yf1 - 0.01, s + f + g); pbox(a + g, yf0 + 0.01, h - f - g, b - g, yf1 - 0.01, h - f)
        pbox(a + g, (yf0 + yf1) / 2 - 0.004, s + f + g, b - g, (yf0 + yf1) / 2 + 0.004, h - f - g, 'glass')
    pbox(xm + 0.045, yf0 - 0.035, (s + h) / 2 - 0.06, xm + 0.06, yf0, (s + h) / 2 + 0.06, 'chrome')      # handle
    # inner sill board and outer sill
    pbox(x0 - 0.03, y0 - 0.035, s - 0.03, x1 + 0.03, yf0, s + 0.004, 'sill', 0.004)
    pbox(x0 - 0.02, yf1, s - 0.03, x1 + 0.02, y1 + 0.04, s - 0.005, 'alu_dark')


SKIRT = {       # room -> (material, height, thickness)
    'REF': ('skirting', 0.08, 0.012), 'CIRC': ('skirting', 0.08, 0.012), 'CORR': ('skirting', 0.08, 0.012), 'EXC': ('skirting', 0.08, 0.012),
    'TRF': ('floor_clean', 0.10, 0.008), 'TRM': ('floor_clean', 0.10, 0.008), 'ANTE': ('floor_clean', 0.10, 0.008),
    'DESC': ('floor_kitchen', 0.10, 0.008), 'LIMPOS': ('floor_kitchen', 0.10, 0.008), 'SUJOS': ('floor_kitchen', 0.10, 0.008),
    'LIMPEZA': ('floor_kitchen', 0.10, 0.008), 'TRAY': ('floor_kitchen', 0.10, 0.008),
}


def _skirtings(info):
    """strips along the foot of every wall face that looks into a room listed in SKIRT."""
    xs, ys, zs, occ = info['xs'], info['ys'], info['zs'], info['occ']
    ny, nx = occ.shape[1], occ.shape[2]
    cx, cy = (xs[:-1] + xs[1:]) / 2, (ys[:-1] + ys[1:]) / 2
    runs = {}      # (room, axis, coord, sign) -> list of (a, b)
    def add(room, axis, coord, sign, a, b):
        runs.setdefault((room, axis, round(float(coord), 4), sign), []).append((float(a), float(b)))
    for j in range(ny):
        for i in range(nx):
            if not occ[0, j, i]: continue
            for (di, dj, axis, coord, sign, a, b, px, py) in (
                    (-1, 0, 'x', xs[i], -1, ys[j], ys[j + 1], xs[i] - 0.06, cy[j]), (1, 0, 'x', xs[i + 1], 1, ys[j], ys[j + 1], xs[i + 1] + 0.06, cy[j]),
                    (0, -1, 'y', ys[j], -1, xs[i], xs[i + 1], cx[i], ys[j] - 0.06), (0, 1, 'y', ys[j + 1], 1, xs[i], xs[i + 1], cx[i], ys[j + 1] + 0.06)):
                ii, jj = i + di, j + dj
                if 0 <= ii < nx and 0 <= jj < ny and occ[0, jj, ii]: continue
                r = plan.room_at(px, py)
                if r is None: continue
                rn = r.get('parent', r['id'])
                if rn in SKIRT: add(rn, axis, coord, sign, a, b)
    kits = {}
    for (rn, axis, coord, sign), segs in runs.items():
        mat, h, t = SKIRT[rn]
        segs.sort(); merged = [list(segs[0])]
        for a, b in segs[1:]:
            if a - merged[-1][1] < 1e-3: merged[-1][1] = max(merged[-1][1], b)
            else: merged.append([a, b])
        k = kits.setdefault(rn, Kit())
        for a, b in merged:
            if b - a < 0.03: continue
            if axis == 'x': p0, p1 = plan.W(coord, a, 0), plan.W(coord + sign * t, b, h)
            else: p0, p1 = plan.W(a, coord, 0), plan.W(b, coord + sign * t, h)
            k.box(p0, p1, mat, low=True)
    for rn, k in kits.items():
        ob = bpy.data.objects.new('K_' + rn, k.mesh('K_' + rn))
        bl.collection('JOIN').objects.link(ob); ob['room'] = rn; ob['kind'] = 'join'
