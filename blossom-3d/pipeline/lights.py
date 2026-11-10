"""Ceiling luminaires: recessed 60x60 LED panels on the 0.6 m ceiling grid, round downlights in wet rooms,
spots over the serving line. The emissive faces light the Cycles bake; in the viewer they are drawn unlit."""
import math
import bpy
from . import plan, bl
from .kit import Kit, place, proto

# radiance of the emitters in the bake (scene-linear units; tuned so a white table top in the canteen bakes at ~1)
PANEL_L = 18.0
DOWN_L = 90.0
SPOT_L = 120.0
BATTEN_L = 60.0


def _panel():
    k = Kit()
    s = 0.2975
    k.quad([(-s + 0.012, -s + 0.012, -0.004), (-s + 0.012, s - 0.012, -0.004), (s - 0.012, s - 0.012, -0.004), (s - 0.012, -s + 0.012, -0.004)], 'led_panel')
    for (a, b) in (((-s, -s), (s, -s + 0.012)), ((-s, s - 0.012), (s, s)), ((-s, -s + 0.012), (-s + 0.012, s - 0.012)), ((s - 0.012, -s + 0.012), (s, s - 0.012))):
        k.quad([(a[0], a[1], -0.006), (a[0], b[1], -0.006), (b[0], b[1], -0.006), (b[0], a[1], -0.006)], 'frame_white', low=True)
    return k


def _down(r=0.085):
    k = Kit()
    n = 16
    k.quad([(r * math.cos(-2 * math.pi * i / n), r * math.sin(-2 * math.pi * i / n), -0.004) for i in range(n)], 'led_down')
    k.lathe([(r, -0.004), (r + 0.004, -0.008), (r + 0.022, -0.008), (r + 0.024, -0.001)], 'frame_white', seg=n, low=True)
    return k


def _batten():
    k = Kit()
    k.box((-0.6, -0.04, 0.0), (0.6, 0.04, 0.05), 'frame_white')
    k.quad([(-0.59, -0.035, -0.002), (-0.59, 0.035, -0.002), (0.59, 0.035, -0.002), (0.59, -0.035, -0.002)], 'led_panel')
    return k


def snap(v):   # centre of a 0.6 m ceiling tile
    return math.floor(v / 0.6) * 0.6 + 0.3


def grid(rect, nx, ny, snapped=True, margin=0.0):
    x0, y0, x1, y1 = rect
    pts = []
    for i in range(nx):
        for j in range(ny):
            x = x0 + (x1 - x0) * (i + 0.5) / nx; y = y0 + (y1 - y0) * (j + 0.5) / ny
            pts.append((snap(x), snap(y)) if snapped else (x, y))
    return pts


LAYOUT = [
    # room, kind, points
    ('REF', 'panel', [(x, y) for x in (15.3, 17.7, 20.1, 22.5, 24.9) for y in (22.5, 24.9, 27.3, 29.7, 32.1, 34.5)]),
    ('CIRC', 'panel', grid((23.093, 18.553, 30.315, 21.251), 3, 1) + [(28.5, y) for y in (22.5, 24.9, 27.3, 29.1)] + [(28.5, 17.7)]),
    ('EXC', 'panel', [(31.5, 28.5), (34.5, 28.5)]),
    ('CORR', 'panel', [(x, 21.9) for x in (6.3, 8.7, 11.1, 13.5)]),
    ('VEST', 'panel', [(5.7, 23.7), (5.7, 25.5), (7.5, 24.9)]),
    ('WC1', 'down', [(5.5, 27.2)]), ('WC2', 'down', [(7.45, 27.2)]),
    ('DESC', 'panel', [(5.7, 29.1), (7.5, 29.1)]),
    ('LIMPOS', 'panel', [(9.9, 24.3), (11.7, 24.3), (9.9, 26.1), (11.7, 26.1), (9.9, 27.9), (11.1, 29.7), (9.3, 29.7)]),
    ('SUJOS', 'panel', [(5.7, 32.1), (8.1, 32.1), (10.5, 32.1), (5.7, 34.5)]),
    ('LIMPEZA', 'panel', [(9.3, 34.5), (10.5, 34.5)]),
    ('TRAY', 'panel', [(12.3, 30.3), (12.3, 32.7), (12.3, 35.1)]),
    ('BALF', 'panel', grid((35.79, 15.071, 44.333, 18.868), 3, 2) + grid((34.85, 10.817, 44.333, 14.916), 3, 2) + [(31.5, 18.3), (33.9, 18.3), (31.5, 16.5), (33.9, 16.5)]),
    ('BALM', 'panel', grid((35.79, 19.069, 44.333, 22.862), 3, 2) + grid((34.85, 23.021, 44.333, 27.14), 3, 2) + [(31.5, 19.5), (33.9, 19.5), (31.5, 21.3), (33.9, 21.3)]),
    ('BALF', 'down', [(x, y) for x in (30.96, 32.6, 34.2) for y in (11.27, 12.27, 13.27, 14.37)]),
    ('BALM', 'down', [(x, y) for x in (30.96, 32.6, 34.2) for y in (23.57, 24.67, 25.67, 26.67)]),
    ('TRF', 'panel', [(46.5, 12.3), (46.5, 14.7), (46.5, 17.1)]),
    ('TRM', 'panel', [(46.5, 21.3), (46.5, 23.7), (46.5, 26.1)]),
    ('ANTE', 'panel', [(45.3, 18.9), (47.1, 18.9)]),
    ('ISMC', 'down', [(28.3, 16.1), (29.6, 16.1)]),
    ('TEC', 'batten', [(24.4, 17.3), (26.2, 17.3)]),
]


def build(info=None):
    out = []
    for room, kind, pts in LAYOUT:
        r = plan.ROOM[room]; z = r['ceil']
        for (x, y) in pts:
            if kind == 'panel':
                ob = place(proto('led_panel', _panel), x, y, z=z, room=room, kind='light', coll='LIGHTS')
            elif kind == 'down':
                ob = place(proto('led_down', _down), x, y, z=z, room=room, kind='light', coll='LIGHTS')
            else:
                ob = place(proto('led_batten', _batten), x, y, z=z - 0.35, room=room, kind='light', coll='LIGHTS')
            out.append(ob)
    # spots under the serving-line bulkhead
    for y in (24.2, 25.0, 25.8, 26.6, 27.4, 28.2):
        out.append(place(proto('led_spot', lambda: _down(0.045)), 12.82, y, z=2.10, room='REF', kind='light', coll='LIGHTS'))
    return out


def set_bake_emission():
    for name, L in (('led_panel', PANEL_L), ('led_down', DOWN_L)):
        m = bl.material(name)
        bsdf = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
        # light leaves the visible face only (the back would over-light the ceiling just above it)
        nt = m.node_tree
        geo = nt.nodes.new('ShaderNodeNewGeometry')
        mul = nt.nodes.new('ShaderNodeMath'); mul.operation = 'MULTIPLY_ADD'
        mul.inputs[1].default_value = -L; mul.inputs[2].default_value = L
        nt.links.new(geo.outputs['Backfacing'], mul.inputs[0])
        nt.links.new(mul.outputs['Value'], bsdf.inputs['Emission Strength'])
        # warm-neutral white, about 4000 K
        bsdf.inputs['Emission Color'].default_value = (1.0, 0.86, 0.70, 1.0) if name == 'led_panel' else (1.0, 0.84, 0.66, 1.0)
