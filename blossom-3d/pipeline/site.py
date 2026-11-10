"""Outside: ground, roof slab, entrance canopy and the existing neighbouring volumes shown hatched on the plan."""
import bpy
from . import plan
from .furnish import PK

ROOFS = [
    (4.284, 21.251, 26.238, 35.885), (22.841, 16.046, 27.62, 18.553), (27.37, 14.916, 30.315, 17.174), (22.841, 18.553, 30.315, 21.251),
    (26.238, 21.251, 30.315, 29.991), (26.238, 29.991, 29.238, 35.885), (30.207, 10.569, 48.304, 27.36), (29.238, 27.36, 36.5, 30.139),
]


def build(info=None):
    g = PK('EXT')
    g.box(-8, -2, -0.06, 62, 49, -0.03, 'ground_gravel', collide=False)
    for r in ((15.5, 13.0, 22.84, 21.25), (22.84, 13.0, 30.2, 14.9), (2.2, 19.6, 4.284, 37.6), (2.2, 35.885, 26.24, 37.6), (15.5, 19.4, 22.84, 21.25)):
        g.box(r[0], r[1], -0.03, r[2], r[3], -0.015, 'ground_paving', collide=False)
    g.box(4.284, 13.0, -0.03, 15.5, 21.251, -0.018, 'ground_grass', collide=False)
    g.box(-8, 37.6, -0.03, 31.9, 49, -0.018, 'ground_grass', collide=False)
    ob = g.done('F_GROUND'); ob['lm_scale'] = 0.07; ob['room'] = 'EXT'
    r = PK('ROOF')
    for q in ROOFS: r.box(q[0] - 0.04, q[1] - 0.04, plan.H_WALL, q[2] + 0.04, q[3] + 0.04, plan.H_WALL + 0.14, 'roof', collide=False)
    ob = r.done('F_ROOF'); ob['lm_scale'] = 0.06; ob['room'] = 'ROOF'
    n = PK('EXT')
    for b in plan.EXIST_BLOCKS:
        q = b['rect']; n.box(q[0], q[1], -0.02, q[2], q[3], 4.4, 'exist_wall', collide=True)
    n.box(36.5, 27.36, -0.02, 48.304, 30.139, plan.H_WALL + 0.14, 'exist_wall', collide=True)
    # canopy over the main entrance
    n.box(21.55, 18.75, 2.74, 22.841, 21.05, 2.82, 'alu_dark', collide=False)
    n.box(21.55, 18.75, 2.82, 22.841, 21.05, 2.84, 'roof', collide=False)
    for y in (18.82, 20.98): n.tube([(21.62, y, 0.0), (21.62, y, 2.74)], 0.03, 'alu_dark')
    ob = n.done('F_SITE'); ob['lm_scale'] = 0.25; ob['room'] = 'EXT'
