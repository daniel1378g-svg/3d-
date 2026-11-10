"""Furniture and fixture prototypes.  Each builder returns a Kit in local coordinates:
+Z up, the front of the object faces -Y, X is the width.  Wall-backed items have their back at y = 0;
free-standing items (tables, chairs, bins on wheels) are centred on the origin."""
import math
from .kit import Kit, T, RX, RY, RZ


def ellipse(a, b, n=20, cx=0.0, cy=0.0):
    return [(cx + a * math.cos(2 * math.pi * i / n), cy + b * math.sin(2 * math.pi * i / n)) for i in range(n)]


def rrect(w, d, r, seg=3, cx=0.0, cy=0.0):
    return Kit().rounded_rect(w, d, r, seg, cx, cy)


def top_with_wells(k, x0, y0, x1, y1, z0, z1, wells, mat, mat_in, depth, bottom=None):
    """slab with rectangular wells (basins, bain-marie pans): the slab is cut on a grid around the wells."""
    xs = sorted({x0, x1} | {v for w in wells for v in (w[0], w[2])}); ys = sorted({y0, y1} | {v for w in wells for v in (w[1], w[3])})
    for i in range(len(xs) - 1):
        for j in range(len(ys) - 1):
            cx, cy = (xs[i] + xs[i + 1]) / 2, (ys[j] + ys[j + 1]) / 2
            if any(w[0] < cx < w[2] and w[1] < cy < w[3] for w in wells): continue
            k.box((xs[i], ys[j], z0), (xs[i + 1], ys[j + 1], z1), mat)
    for (a, b, c, d) in wells:
        zb = z1 - depth
        k.quad([(a, b, z1), (c, b, z1), (c, b, zb), (a, b, zb)], mat_in); k.quad([(c, d, z1), (a, d, z1), (a, d, zb), (c, d, zb)], mat_in)
        k.quad([(a, d, z1), (a, b, z1), (a, b, zb), (a, d, zb)], mat_in); k.quad([(c, b, z1), (c, d, z1), (c, d, zb), (c, b, zb)], mat_in)
        k.quad([(a, b, zb), (c, b, zb), (c, d, zb), (a, d, zb)], bottom or mat_in)


def tap(k, x, y, z, reach=0.16, h=0.26, mat='chrome'):
    k.cyl((x, y, z), 0.022, 0.03, mat, seg=10)
    k.tube([(x, y, z + 0.02), (x, y, z + h), (x, y - 0.04, z + h + 0.04), (x, y - reach, z + h + 0.04), (x, y - reach - 0.02, z + h)], 0.011, mat, seg=8)
    k.tube([(x + 0.03, y, z + 0.05), (x + 0.09, y, z + 0.09)], 0.007, mat, seg=6)


def caster(k, x, y, r=0.05):
    k.cyl((x - 0.012, y, r), r, 0.024, 'rubber_black', seg=10, axis='x', low=True)
    k.box((x - 0.018, y - 0.02, r), (x + 0.018, y + 0.02, 2 * r + 0.03), 'steel', low=True)


# ------------------------------------------------------------------------------------------- canteen
def table_180():
    k = Kit()
    k.box((-0.9, -0.4, 0.715), (0.9, 0.4, 0.742), 'oak', bevel=0.003, grain='x')
    for sx in (-1, 1):
        for sy in (-1, 1):
            k.box((sx * 0.83 - 0.02, sy * 0.33 - 0.02, 0), (sx * 0.83 + 0.02, sy * 0.33 + 0.02, 0.715), 'alu_dark')
    for sy in (-1, 1): k.box((-0.81, sy * 0.33 - 0.01, 0.655), (0.81, sy * 0.33 + 0.01, 0.715), 'alu_dark', low=True)
    for sx in (-1, 1): k.box((sx * 0.83 - 0.01, -0.31, 0.655), (sx * 0.83 + 0.01, 0.31, 0.715), 'alu_dark', low=True)
    return k


def chair():
    k = Kit()
    k.prism(rrect(0.42, 0.40, 0.06, 3, 0, -0.005), 0.438, 0.452, 'oak', bevel=0.004)
    k.prism(rrect(0.40, 0.22, 0.05, 3), -0.006, 0.006, 'oak', M=T(0, 0.215, 0.74) @ RX(80))
    r = 0.0095
    for sx in (-1, 1):
        x = sx * 0.185
        k.tube([(x, -0.205, 0), (x, -0.18, 0.43), (x, 0.17, 0.43), (x, 0.235, 0.86)], r, 'alu_dark', seg=6)
        k.tube([(x, 0.245, 0), (x, 0.165, 0.43)], r, 'alu_dark', seg=6)
    k.tube([(-0.185, -0.17, 0.43), (0.185, -0.17, 0.43)], r, 'alu_dark', seg=6, low=True)
    k.tube([(-0.185, 0.16, 0.43), (0.185, 0.16, 0.43)], r, 'alu_dark', seg=6, low=True)
    return k


def bin_pedal(lid='plastic_grey'):
    def b():
        k = Kit()
        k.prism(rrect(0.40, 0.38, 0.05, 3, 0, -0.21), 0.02, 0.62, 'steel', smooth_sides=False)
        k.prism(rrect(0.42, 0.40, 0.055, 3, 0, -0.21), 0.62, 0.665, lid, bevel=0.012)
        k.box((-0.09, -0.435, 0.02), (0.09, -0.395, 0.045), 'rubber_black', low=True)
        k.box((-0.13, -0.403, 0.30), (0.13, -0.401, 0.48), lid, low=True)
        return k
    return b


def planter(tall=True):
    def b():
        k = Kit()
        h = 0.62 if tall else 0.4
        k.lathe([(0.0, 0.0), (0.17, 0.0), (0.21, h), (0.195, h), (0.185, h - 0.04), (0.0, h - 0.04)], 'plant_pot', seg=16)
        k.lathe([(0.0, h - 0.035), (0.186, h - 0.035)], 'soil', seg=16, low=True)
        import random
        rnd = random.Random(7 if tall else 9)
        n = 15 if tall else 11
        for i in range(n):        # upright sword leaves (sansevieria)
            a = rnd.uniform(0, 2 * math.pi); rad = rnd.uniform(0.0, 0.12); lean = rnd.uniform(4, 16); L = rnd.uniform(0.55, 1.0) * (1.0 if tall else 0.7); w = rnd.uniform(0.045, 0.07)
            M = T(rad * math.cos(a), rad * math.sin(a), h - 0.04) @ RZ(math.degrees(a) + rnd.uniform(-40, 40)) @ RX(lean)
            pts = [(-w / 2, 0, 0), (w / 2, 0, 0), (w * 0.55, 0.012, L * 0.55), (0.0, 0.0, L), (-w * 0.55, -0.012, L * 0.55)]
            f = k.quad(pts, 'plant_leaf', M=M, low=True)
        return k
    return b


# ------------------------------------------------------------------------------------------- stainless kitchen
def counter_unit(w, d=0.6, doors=2, upstand=True, h=0.9):
    def b():
        k = Kit()
        k.box((-w / 2, -d, h - 0.04), (w / 2, 0, h), 'steel', bevel=0.003, grain='x')
        if upstand: k.box((-w / 2, -0.015, h), (w / 2, 0, h + 0.1), 'steel', low=True)
        k.box((-w / 2 + 0.01, -d + 0.03, 0.15), (w / 2 - 0.01, -0.01, h - 0.04), 'steel', grain='x')
        for sx in (-1, 1):
            for sy in (-d + 0.07, -0.06): k.cyl((sx * (w / 2 - 0.05), sy, 0), 0.02, 0.15, 'steel', seg=8, low=True)
        n = max(1, doors); dw = (w - 0.02) / n
        for i in range(n):
            x0 = -w / 2 + 0.01 + i * dw
            k.box((x0 + 0.004, -d + 0.016, 0.165), (x0 + dw - 0.004, -d + 0.03, h - 0.055), 'steel', bevel=0.002, grain='z')
            hx = x0 + dw - 0.05 if i % 2 == 0 else x0 + 0.05
            k.tube([(hx, -d + 0.016, 0.50), (hx, -d - 0.015, 0.50), (hx, -d - 0.015, 0.68), (hx, -d + 0.016, 0.68)], 0.006, 'chrome', seg=6, low=True)
        return k
    return b


def sink_unit(w=1.2, d=0.6, bowl_left=True):
    def b():
        k = Kit()
        h = 0.9
        bx0 = (-w / 2 + 0.08) if bowl_left else (w / 2 - 0.08 - 0.45)
        well = (bx0, -d + 0.1, bx0 + 0.45, -0.1)
        top_with_wells(k, -w / 2, -d, w / 2, 0, h - 0.04, h, [well], 'steel', 'steel', 0.22)
        k.box((-w / 2, -0.015, h), (w / 2, 0, h + 0.1), 'steel', low=True)
        k.box((-w / 2 + 0.01, -d + 0.03, 0.15), (w / 2 - 0.01, -0.01, h - 0.27), 'steel')
        k.box((-w / 2 + 0.01, -d + 0.03, h - 0.27), (w / 2 - 0.01, -d + 0.045, h - 0.04), 'steel', low=True)
        for sx in (-1, 1):
            for sy in (-d + 0.07, -0.06): k.cyl((sx * (w / 2 - 0.05), sy, 0), 0.02, 0.15, 'steel', seg=8, low=True)
        dx0 = (bx0 + 0.5) if bowl_left else (-w / 2 + 0.06)
        for i in range(9):      # drainer ribs
            y = -d + 0.12 + i * (d - 0.24) / 8
            k.box((dx0, y - 0.006, h), (dx0 + w - 0.45 - 0.2, y + 0.006, h + 0.006), 'steel', low=True)
        tap(k, bx0 + 0.225, -0.05, h, reach=0.2, h=0.3)
        for i in range(2):
            x0 = -w / 2 + 0.014 + i * (w - 0.02) / 2
            k.box((x0, -d + 0.016, 0.165), (x0 + (w - 0.02) / 2 - 0.008, -d + 0.03, h - 0.285), 'steel', bevel=0.002)
        return k
    return b


def work_table(w, d=0.6, h=0.9, shelf=True):
    def b():
        k = Kit()
        k.box((-w / 2, -d, h - 0.04), (w / 2, 0, h), 'steel', bevel=0.003, grain='x')
        for sx in (-1, 1):
            for sy in (-d + 0.04, -0.04): k.cyl((sx * (w / 2 - 0.04), sy, 0), 0.02, h - 0.04, 'steel', seg=8)
        if shelf: k.box((-w / 2 + 0.03, -d + 0.03, 0.18), (w / 2 - 0.03, -0.03, 0.205), 'steel', low=True)
        return k
    return b


def fridge(w=0.72, d=0.6, h=2.0):
    def b():
        k = Kit()
        k.box((-w / 2, -d + 0.03, 0.12), (w / 2, 0, h), 'steel', bevel=0.004, grain='z')
        k.box((-w / 2 + 0.006, -d, 0.14), (w / 2 - 0.006, -d + 0.035, h - 0.22), 'steel', bevel=0.004, grain='z')
        k.box((-w / 2 + 0.006, -d + 0.01, h - 0.2), (w / 2 - 0.006, -d + 0.035, h - 0.01), 'steel_dark', low=True)
        k.box((-w / 2 + 0.1, -d + 0.005, h - 0.14), (-w / 2 + 0.25, -d + 0.012, h - 0.08), 'plastic_dark', low=True)
        k.tube([(w / 2 - 0.07, -d, 0.9), (w / 2 - 0.07, -d - 0.045, 0.9), (w / 2 - 0.07, -d - 0.045, 1.5), (w / 2 - 0.07, -d, 1.5)], 0.009, 'chrome', seg=6)
        for sx in (-1, 1):
            for sy in (-d + 0.08, -0.06): k.cyl((sx * (w / 2 - 0.06), sy, 0), 0.025, 0.12, 'steel', seg=8, low=True)
        return k
    return b


def oven_on_stand():
    k = Kit()
    w, d = 0.5, 0.55
    for sx in (-1, 1):
        for sy in (-d + 0.04, -0.04): k.box((sx * (w / 2 - 0.02) - 0.015, sy - 0.015, 0), (sx * (w / 2 - 0.02) + 0.015, sy + 0.015, 0.86), 'steel')
    k.box((-w / 2, -d, 0.86), (w / 2, 0, 0.9), 'steel', bevel=0.003)
    k.box((-w / 2 + 0.03, -d + 0.03, 0.3), (w / 2 - 0.03, -0.03, 0.32), 'steel', low=True)
    k.box((-w / 2 + 0.02, -d + 0.04, 0.9), (w / 2 - 0.02, -0.03, 1.36), 'steel', bevel=0.004)
    k.box((-w / 2 + 0.05, -d + 0.03, 0.96), (w / 2 - 0.14, -d + 0.042, 1.32), 'plastic_dark', low=True)
    k.tube([(-w / 2 + 0.07, -d + 0.03, 1.3), (-w / 2 + 0.07, -d - 0.005, 1.3), (w / 2 - 0.16, -d - 0.005, 1.3), (w / 2 - 0.16, -d + 0.03, 1.3)], 0.007, 'chrome', seg=6, low=True)
    for i in range(3): k.cyl((w / 2 - 0.08, -d + 0.04, 1.02 + i * 0.1), 0.018, 0.012, 'plastic_dark', seg=10, axis='y', M=T(0, -0.012, 0), low=True)
    return k


def pot_station():
    k = counter_unit(0.53, 0.6, doors=1)()
    k.cyl((0, -0.3, 0.9), 0.2, 0.012, 'plastic_dark', seg=20, low=True)
    k.lathe([(0.0, 0.912), (0.17, 0.912), (0.175, 1.17), (0.185, 1.18), (0.185, 1.19), (0.0, 1.21)], 'steel', seg=20, M=T(0, -0.3, 0))
    for sx in (-1, 1): k.tube([(sx * 0.175, -0.3, 1.12), (sx * 0.215, -0.3, 1.12)], 0.008, 'plastic_dark', seg=6, low=True)
    k.cyl((0, -0.3, 1.205), 0.02, 0.025, 'plastic_dark', seg=8, low=True)
    return k


def handwash(mat='steel'):
    def b():
        k = Kit()
        w, d, z = 0.42, 0.36, 0.84
        top_with_wells(k, -w / 2, -d, w / 2, 0, z - 0.02, z, [(-w / 2 + 0.04, -d + 0.05, w / 2 - 0.04, -0.07)], mat, mat, 0.14)
        k.box((-w / 2, -d, z - 0.2), (w / 2, -d + 0.015, z - 0.02), mat)
        k.box((-w / 2, -d, z - 0.2), (-w / 2 + 0.015, 0, z - 0.02), mat); k.box((w / 2 - 0.015, -d, z - 0.2), (w / 2, 0, z - 0.02), mat)
        k.box((-w / 2, -0.012, z), (w / 2, 0, z + 0.14), mat, low=True)
        tap(k, 0, -0.04, z, reach=0.13, h=0.2)
        k.box((-0.1, -d - 0.01, z - 0.45), (0.1, -d + 0.005, z - 0.22), mat, low=True)             # knee panel
        k.tube([(0, -0.03, z - 0.2), (0, -0.03, 0.42), (0, 0.0, 0.42)], 0.016, 'chrome', seg=6, low=True)     # trap
        # soap + paper above
        k.box((-0.17, -0.09, 1.2), (-0.07, 0, 1.42), 'plastic_white', bevel=0.006)
        k.box((0.03, -0.11, 1.18), (0.3, 0, 1.5), 'plastic_white', bevel=0.006)
        return k
    return b


def bin_round(r=0.2, h=0.58, mat='steel'):
    def b():
        k = Kit()
        k.lathe([(0.0, 0.0), (r * 0.92, 0.0), (r, 0.02), (r, h), (r * 0.92, h + 0.01), (r * 0.9, h - 0.05), (0.0, h - 0.05)], mat, seg=18)
        k.lathe([(0, h - 0.045), (r * 0.9, h - 0.045)], 'plastic_dark', seg=18, low=True)
        return k
    return b


def shelf_unit(w, d, h=1.8, tiers=4, mat='steel'):
    def b():
        k = Kit()
        for sx in (-1, 1):
            for sy in (-d + 0.015, -0.015): k.cyl((sx * (w / 2 - 0.015), sy, 0), 0.012, h, 'chrome', seg=6)
        for i in range(tiers):
            z = 0.18 + i * (h - 0.25) / (tiers - 1)
            k.box((-w / 2, -d, z), (w / 2, 0, z + 0.022), mat, low=(i == 0))
        return k
    return b


def crates(k, w, d, z, n, seed=3, mats=('plastic_grey', 'plastic_white', 'plastic_blue')):
    import random
    rnd = random.Random(seed)
    x = -w / 2 + 0.03
    while x < w / 2 - 0.25 and n > 0:
        cw = rnd.choice((0.3, 0.38)); ch = rnd.choice((0.16, 0.22, 0.28))
        k.box((x, -d + 0.03, z), (x + cw, -0.04, z + ch), rnd.choice(mats), bevel=0.006)
        x += cw + rnd.uniform(0.03, 0.09); n -= 1


def dishwasher():
    k = Kit()
    w, d = 0.66, 0.75
    k.box((-w / 2, -d, 0.12), (w / 2, 0, 0.86), 'steel', bevel=0.004)
    k.box((-w / 2 + 0.02, -d + 0.02, 0.86), (w / 2 - 0.02, -0.02, 0.9), 'steel_dark', low=True)
    k.box((-w / 2 - 0.01, -d - 0.01, 0.9), (w / 2 + 0.01, 0, 1.52), 'steel', bevel=0.006)         # hood
    k.tube([(-w / 2 - 0.01, -d * 0.55, 1.12), (-w / 2 - 0.06, -d - 0.06, 1.2), (w / 2 + 0.06, -d - 0.06, 1.2), (w / 2 + 0.01, -d * 0.55, 1.12)], 0.012, 'chrome', seg=6)
    k.box((-0.2, -d - 0.004, 0.66), (0.2, -d + 0.002, 0.8), 'plastic_dark', low=True)
    k.box((-0.16, -d - 0.008, 0.71), (-0.06, -d - 0.003, 0.76), 'sign_green', low=True)
    for sx in (-1, 1):
        for sy in (-d + 0.07, -0.07): k.cyl((sx * (w / 2 - 0.06), sy, 0), 0.025, 0.12, 'steel', seg=8, low=True)
    k.tube([(w / 2 - 0.1, -0.06, 1.52), (w / 2 - 0.1, -0.06, 2.0)], 0.03, 'steel', seg=8, low=True)       # steam flue
    return k


def prerinse_table(w=1.5):
    k = Kit()
    h, d = 0.9, 0.6
    well = (w / 2 - 0.55, -d + 0.08, w / 2 - 0.1, -0.1)
    top_with_wells(k, -w / 2, -d, w / 2, 0, h - 0.04, h, [well], 'steel', 'steel', 0.25)
    k.box((-w / 2, -0.015, h), (w / 2, 0, h + 0.25), 'steel', low=True)
    for sx in (-1, 1):
        for sy in (-d + 0.04, -0.04): k.cyl((sx * (w / 2 - 0.04), sy, 0), 0.02, h - 0.04, 'steel', seg=8)
    k.box((-w / 2 + 0.03, -d + 0.03, 0.18), (w / 2 - 0.03, -0.03, 0.205), 'steel', low=True)
    x = w / 2 - 0.32       # pre-rinse spray on a tall spring arm
    k.cyl((x, -0.06, h), 0.02, 0.05, 'chrome', seg=8)
    k.tube([(x, -0.06, h + 0.04), (x, -0.06, h + 0.95), (x, -0.16, h + 1.02), (x, -0.3, h + 0.95), (x, -0.33, h + 0.62)], 0.012, 'chrome', seg=8)
    k.cyl((x, -0.33, h + 0.5), 0.022, 0.13, 'plastic_dark', seg=8, low=True)
    # a rack waiting on the table
    k.box((-w / 2 + 0.12, -d + 0.06, h), (-w / 2 + 0.62, -0.06, h + 0.11), 'plastic_grey', bevel=0.008)
    return k


def trolley_iso():
    k = Kit()
    w, d, h = 0.52, 0.82, 1.22
    k.prism(rrect(w, d, 0.04, 2), 0.14, h, 'plastic_blue', smooth_sides=False, bevel=0.015)
    k.box((-w / 2 + 0.03, -d / 2 - 0.006, 0.2), (w / 2 - 0.03, -d / 2, h - 0.06), 'plastic_blue', bevel=0.01)
    for z in (0.45, 0.95):
        k.box((w / 2 - 0.1, -d / 2 - 0.02, z), (w / 2 - 0.04, -d / 2 - 0.004, z + 0.09), 'steel', low=True)
    for sy in (-1, 1): k.tube([(-w / 2, sy * (d / 2 - 0.05), 0.95), (-w / 2 - 0.05, sy * (d / 2 - 0.05), 0.95), (-w / 2 - 0.05, sy * (d / 2 - 0.05), 1.1), (-w / 2, sy * (d / 2 - 0.05), 1.1)], 0.011, 'steel', seg=6, low=True)
    k.tube([(-0.2, d / 2, 1.05), (-0.2, d / 2 + 0.07, 1.05), (0.2, d / 2 + 0.07, 1.05), (0.2, d / 2, 1.05)], 0.012, 'steel', seg=6)
    for sx in (-1, 1):
        for sy in (-1, 1): caster(k, sx * (w / 2 - 0.07), sy * (d / 2 - 0.09))
    return k


def wheelie_bin(lid='plastic_grey', body='plastic_grey'):
    def b():
        k = Kit()
        k.prism(rrect(0.46, 0.5, 0.04, 2, 0, -0.01), 0.08, 0.2, body, smooth_sides=False)
        k.prism(rrect(0.52, 0.54, 0.05, 2, 0, 0.0), 0.2, 0.92, body, smooth_sides=False)
        k.prism(rrect(0.55, 0.58, 0.05, 2, 0, 0.0), 0.92, 0.975, lid, bevel=0.015)
        k.tube([(-0.2, 0.3, 0.93), (-0.2, 0.345, 0.95), (0.2, 0.345, 0.95), (0.2, 0.3, 0.93)], 0.013, lid, seg=6, low=True)
        for sx in (-1, 1): k.cyl((sx * 0.25 - 0.02, 0.2, 0.1), 0.1, 0.04, 'rubber_black', seg=12, axis='x', low=True)
        return k
    return b


def tray_trolley():
    k = Kit()
    w, d, h = 0.53, 0.65, 1.62
    for sx in (-1, 1):
        for sy in (-1, 1): k.box((sx * (w / 2 - 0.012) - 0.012, sy * (d / 2 - 0.012) - 0.012, 0.12), (sx * (w / 2 - 0.012) + 0.012, sy * (d / 2 - 0.012) + 0.012, h), 'steel')
    for z in (0.14, h - 0.024):
        for sy in (-1, 1): k.box((-w / 2, sy * (d / 2 - 0.012) - 0.012, z), (w / 2, sy * (d / 2 - 0.012) + 0.012, z + 0.024), 'steel', low=True)
        for sx in (-1, 1): k.box((sx * (w / 2 - 0.012) - 0.012, -d / 2, z), (sx * (w / 2 - 0.012) + 0.012, d / 2, z + 0.024), 'steel', low=True)
    for i in range(10):
        z = 0.3 + i * 0.125
        for sx in (-1, 1): k.box((sx * (w / 2 - 0.03) - 0.012, -d / 2 + 0.02, z), (sx * (w / 2 - 0.03) + 0.012, d / 2 - 0.02, z + 0.004), 'steel', low=True)
        if i in (0, 1, 2, 4, 5, 7):
            k.box((-w / 2 + 0.035, -d / 2 + 0.04, z + 0.004), (w / 2 - 0.035, d / 2 - 0.04, z + 0.022), 'plastic_grey' if i % 2 else 'plastic_brown', low=True)
    for sx in (-1, 1):
        for sy in (-1, 1): caster(k, sx * (w / 2 - 0.04), sy * (d / 2 - 0.05))
    return k


def cleaning_cart():
    k = Kit()
    k.box((-0.22, -0.3, 0.16), (0.22, 0.3, 0.2), 'plastic_grey')
    k.prism(rrect(0.36, 0.3, 0.03, 2, 0, -0.12), 0.2, 0.5, 'plastic_yellow', smooth_sides=False)
    k.prism(rrect(0.34, 0.22, 0.03, 2, 0, 0.17), 0.2, 0.42, 'plastic_blue', smooth_sides=False)
    k.tube([(-0.2, 0.3, 0.2), (-0.2, 0.33, 0.95), (0.2, 0.33, 0.95), (0.2, 0.3, 0.2)], 0.012, 'steel', seg=6)
    k.tube([(0.1, -0.16, 0.3), (0.16, -0.2, 1.45)], 0.012, 'plastic_white', seg=6)
    for sx in (-1, 1):
        for sy in (-1, 1): caster(k, sx * 0.19, sy * 0.26, 0.04)
    return k


def fire_cabinet():
    k = Kit()
    k.box((-0.5, -0.24, 0.55), (0.5, 0, 1.45), 'plastic_red', bevel=0.006)
    k.box((-0.4, -0.246, 0.72), (0.12, -0.24, 1.28), 'glass')
    k.lathe([(0.0, 0.0), (0.2, 0.0), (0.2, 0.06), (0.0, 0.06)], 'plastic_red', seg=16, M=T(-0.14, -0.2, 1.0) @ RX(90), low=True)
    k.cyl((0.3, -0.26, 0.6), 0.06, 0.42, 'plastic_red', seg=12)
    k.cyl((0.3, -0.26, 1.02), 0.022, 0.06, 'plastic_dark', seg=8, low=True)
    return k


def drain():
    k = Kit()
    k.box((-0.08, -0.08, 0.0), (0.08, 0.08, 0.004), 'steel', low=True)
    for i in range(5): k.box((-0.06, -0.06 + i * 0.027, 0.004), (0.06, -0.048 + i * 0.027, 0.0055), 'steel_dark', low=True)
    return k


# ------------------------------------------------------------------------------------------- changing rooms
def locker(w=0.298, d=0.38, h=1.80, door='hpl_grey', num=None):
    def b():
        k = Kit()
        base = 0.12
        k.box((-w / 2, -d + 0.02, base), (w / 2, 0, base + h), 'hpl_grey')
        k.box((-w / 2 + 0.004, -d, base + 0.006), (w / 2 - 0.004, -d + 0.02, base + h - 0.006), door, bevel=0.002)
        for z in (base + 0.1, base + h - 0.16):
            for i in range(3): k.box((-0.07, -d - 0.001, z + i * 0.022), (0.07, -d + 0.002, z + i * 0.022 + 0.008), 'plastic_dark', low=True)
        k.cyl((w / 2 - 0.035, -d, base + h * 0.52), 0.013, 0.012, 'chrome', seg=10, axis='y', M=T(0, -0.012, 0), low=True)
        k.box((-0.035, -d - 0.002, base + h - 0.26), (0.035, -d, base + h - 0.215), 'paper', low=True)
        k.box((-w / 2 + 0.01, -d + 0.03, 0.0), (w / 2 - 0.01, -0.02, base), 'plastic_dark', low=True)
        # sloped top keeps the tops clear
        k.quad([(-w / 2, -d + 0.02, base + h), (w / 2, -d + 0.02, base + h), (w / 2, 0, base + h + 0.14), (-w / 2, 0, base + h + 0.14)], 'hpl_grey')
        k.quad([(-w / 2, -d + 0.02, base + h), (-w / 2, 0, base + h + 0.14), (-w / 2, 0, base + h)], 'hpl_grey', low=True)
        k.quad([(w / 2, -d + 0.02, base + h), (w / 2, 0, base + h), (w / 2, 0, base + h + 0.14)], 'hpl_grey', low=True)
        return k
    return b


def locker_end(d=0.38, h=1.80):
    """side panel closing the sloped top at the end of a bank"""
    k = Kit()
    base = 0.12
    k.quad([(0, -d + 0.02, base + h), (0, 0, base + h), (0, 0, base + h + 0.14)], 'hpl_grey')
    return k


def bench(L, d=0.36, slats=3, back=False):
    def b():
        k = Kit()
        sw = (d - 0.02 * (slats - 1)) / slats
        for i in range(slats):
            y = -d / 2 + i * (sw + 0.02)
            k.box((-L / 2, y, 0.42), (L / 2, y + sw, 0.448), 'oak', bevel=0.004, grain='x')
        n = max(2, int(round(L / 1.1)) + 1)
        for i in range(n):
            x = -L / 2 + 0.12 + i * (L - 0.24) / (n - 1)
            k.box((x - 0.015, -d / 2 + 0.02, 0), (x + 0.015, -d / 2 + 0.05, 0.42), 'alu_dark', low=True)
            k.box((x - 0.015, d / 2 - 0.05, 0), (x + 0.015, d / 2 - 0.02, 0.42), 'alu_dark', low=True)
            k.box((x - 0.015, -d / 2 + 0.02, 0.39), (x + 0.015, d / 2 - 0.02, 0.42), 'alu_dark', low=True)
        return k
    return b


def toilet(accessible=False):
    def b():
        k = Kit()
        sh = 0.46 if accessible else 0.41
        k.box((-0.19, -0.17, sh - 0.02), (0.19, 0, sh + 0.36), 'ceramic', bevel=0.02)          # cistern
        k.cyl((0, -0.085, sh + 0.36), 0.03, 0.006, 'chrome', seg=10, low=True)
        k.prism(ellipse(0.13, 0.19, 16, 0, -0.34), 0.0, sh - 0.14, 'ceramic', smooth_sides=True, cap=(False, False))
        k.box((-0.1, -0.2, 0.0), (0.1, -0.02, sh - 0.02), 'ceramic')
        k.prism(ellipse(0.185, 0.25, 18, 0, -0.42), sh - 0.14, sh - 0.01, 'ceramic', smooth_sides=True)
        k.prism(ellipse(0.19, 0.255, 18, 0, -0.42), sh - 0.01, sh + 0.025, 'plastic_white', smooth_sides=True, bevel=0.008)
        return k
    return b


def urinal():
    k = Kit()
    pts = [(-0.18, 0.0)] + [(0.18 * math.cos(math.pi + math.pi * i / 10), -0.02 + 0.30 * math.sin(math.pi + math.pi * i / 10)) for i in range(11)] + [(0.18, 0.0)]
    k.prism(pts, 0.5, 1.06, 'ceramic', smooth_sides=True)
    k.prism([(x * 0.6, y * 0.6) for x, y in pts], 0.4, 0.5, 'ceramic', smooth_sides=True)
    k.tube([(0, -0.03, 1.06), (0, -0.03, 1.22)], 0.012, 'chrome', seg=6)
    k.cyl((0, -0.03, 1.2), 0.03, 0.05, 'chrome', seg=10, axis='y', M=T(0, -0.05, 0), low=True)
    return k


def wall_basin():
    k = Kit()
    w, d, z = 0.45, 0.38, 0.85
    top_with_wells(k, -w / 2, -d, w / 2, 0, z - 0.05, z, [(-w / 2 + 0.05, -d + 0.05, w / 2 - 0.05, -0.09)], 'ceramic', 'ceramic', 0.11)
    k.prism(rrect(w - 0.04, d - 0.04, 0.05, 2, 0, -d / 2), z - 0.16, z - 0.05, 'ceramic', smooth_sides=False, cap=(True, False))
    tap(k, 0, -0.045, z, reach=0.12, h=0.12)
    k.tube([(0, -0.1, z - 0.16), (0, -0.1, 0.5), (0, 0.0, 0.5)], 0.016, 'chrome', seg=6, low=True)
    return k


def mirror_panel(w, h):
    def b():
        k = Kit()
        k.box((-w / 2, -0.012, 0), (w / 2, 0, h), 'alu_dark', low=True)
        k.quad([(-w / 2 + 0.012, -0.0125, 0.012), (w / 2 - 0.012, -0.0125, 0.012), (w / 2 - 0.012, -0.0125, h - 0.012), (-w / 2 + 0.012, -0.0125, h - 0.012)], 'mirror')
        return k
    return b


def dispenser(kind='soap'):
    def b():
        k = Kit()
        if kind == 'soap': k.box((-0.05, -0.1, 0), (0.05, 0, 0.2), 'plastic_white', bevel=0.008); k.box((-0.02, -0.105, 0.0), (0.02, -0.07, 0.03), 'plastic_grey', low=True)
        elif kind == 'paper': k.box((-0.14, -0.11, 0), (0.14, 0, 0.36), 'plastic_white', bevel=0.008); k.box((-0.1, -0.09, -0.03), (0.1, -0.03, 0.0), 'paper', low=True)
        elif kind == 'dryer': k.box((-0.13, -0.16, 0), (0.13, 0, 0.3), 'plastic_white', bevel=0.02); k.box((-0.07, -0.13, -0.02), (0.07, -0.05, 0.0), 'chrome', low=True)
        elif kind == 'roll': k.box((-0.13, -0.12, 0), (0.13, 0, 0.27), 'plastic_white', bevel=0.02)
        elif kind == 'gel': k.box((-0.055, -0.09, 0), (0.055, 0, 0.24), 'plastic_white', bevel=0.008); k.box((-0.05, -0.15, -0.16), (0.05, -0.02, -0.15), 'plastic_grey', low=True); k.tube([(0, -0.01, 0.0), (0, -0.01, -0.15)], 0.006, 'chrome', seg=6, low=True)
        return k
    return b


def shower_set():
    k = Kit()
    k.tube([(0, -0.02, 1.05), (0, -0.02, 2.02), (0, -0.3, 2.05)], 0.011, 'chrome', seg=8)
    k.lathe([(0.0, 0.0), (0.1, 0.0), (0.1, 0.012), (0.03, 0.03), (0.0, 0.03)], 'chrome', seg=14, M=T(0, -0.3, 2.01))
    k.cyl((0, 0, 1.1), 0.045, 0.03, 'chrome', seg=12, axis='y', M=T(0, -0.03, 0))
    k.tube([(0, -0.03, 1.1), (0, -0.075, 1.1), (0.05, -0.075, 1.1)], 0.008, 'chrome', seg=6, low=True)
    k.box((-0.2, -0.09, 1.25), (-0.06, 0, 1.262), 'chrome', low=True)       # soap shelf
    k.box((0.16, -0.035, 1.7), (0.19, 0, 1.73), 'chrome', low=True)         # hook
    return k


def grab_bar(L=0.75, fold=True):
    def b():
        k = Kit()
        if fold:
            k.box((-0.05, -0.02, 0.6), (0.05, 0, 0.84), 'steel')
            k.tube([(-0.04, -0.02, 0.8), (-0.04, -L, 0.8), (0.04, -L, 0.8), (0.04, -0.02, 0.8)], 0.016, 'steel', seg=8)
            k.tube([(0, -L, 0.8), (0, -L + 0.04, 0.62), (0, -0.02, 0.62)], 0.012, 'steel', seg=6, low=True)
        else:
            k.tube([(-L / 2, 0, 0.8), (-L / 2, -0.07, 0.8), (L / 2, -0.07, 0.8), (L / 2, 0, 0.8)], 0.016, 'steel', seg=8)
        return k
    return b


def stepover_bench(L=1.96):
    k = Kit()
    k.box((-L / 2, -0.2, 0.44), (L / 2, 0.2, 0.48), 'steel', bevel=0.004, grain='x')
    k.box((-L / 2 + 0.02, -0.03, 0.0), (L / 2 - 0.02, 0.03, 0.44), 'steel')
    for sx in (-1, 1): k.box((sx * (L / 2 - 0.02) - 0.02, -0.18, 0.0), (sx * (L / 2 - 0.02) + 0.02, 0.18, 0.44), 'steel')
    return k


def cabinet_tall(w=0.9, d=0.4, h=1.95):
    def b():
        k = Kit()
        k.box((-w / 2, -d + 0.02, 0.1), (w / 2, 0, h), 'laminate_white')
        k.box((-w / 2 + 0.02, -d + 0.04, 0.0), (w / 2 - 0.02, -0.02, 0.1), 'steel', low=True)
        dw = w / 2
        for i in range(2):
            x0 = -w / 2 + i * dw
            k.box((x0 + 0.003, -d, 0.104), (x0 + dw - 0.003, -d + 0.02, h - 0.004), 'laminate_white', bevel=0.002)
            hx = x0 + dw - 0.04 if i == 0 else x0 + 0.04
            k.tube([(hx, -d, 0.95), (hx, -d - 0.03, 0.95), (hx, -d - 0.03, 1.15), (hx, -d, 1.15)], 0.006, 'chrome', seg=6, low=True)
        k.quad([(-w / 2, -d + 0.02, h), (w / 2, -d + 0.02, h), (w / 2, 0, h + 0.15), (-w / 2, 0, h + 0.15)], 'laminate_white')
        k.quad([(-w / 2, -d + 0.02, h), (-w / 2, 0, h + 0.15), (-w / 2, 0, h)], 'laminate_white', low=True)
        k.quad([(w / 2, -d + 0.02, h), (w / 2, 0, h), (w / 2, 0, h + 0.15)], 'laminate_white', low=True)
        return k
    return b


def wash_trough(w=0.95, d=0.5):
    k = Kit()
    z = 0.86
    top_with_wells(k, -w / 2, -d, w / 2, 0, z - 0.03, z, [(-w / 2 + 0.04, -d + 0.05, w / 2 - 0.04, -0.09)], 'steel', 'steel', 0.2)
    k.box((-w / 2, -d, z - 0.26), (w / 2, -d + 0.015, z - 0.03), 'steel', grain='x')
    for sx in (-1, 1): k.box((sx * w / 2 - (0.015 if sx > 0 else 0), -d, z - 0.26), (sx * w / 2 + (0.015 if sx < 0 else 0), 0, z - 0.03), 'steel')
    k.box((-w / 2, -0.012, z), (w / 2, 0, z + 0.3), 'steel', grain='x')
    for sx in (-1, 1):
        k.box((sx * (w / 2 - 0.05) - 0.02, -d + 0.03, 0), (sx * (w / 2 - 0.05) + 0.02, -d + 0.07, z - 0.26), 'steel')
        tap(k, sx * 0.22, -0.05, z, reach=0.14, h=0.16)
    for sx in (-1, 1): k.box((sx * 0.22 - 0.07, -d - 0.012, z - 0.5), (sx * 0.22 + 0.07, -d + 0.004, z - 0.3), 'steel', low=True)       # knee valves
    return k


def coat_rail(L=1.6, hooks=8):
    def b():
        k = Kit()
        k.box((-L / 2, -0.018, 0), (L / 2, 0, 0.09), 'oak', bevel=0.004, grain='x')
        for i in range(hooks):
            x = -L / 2 + (i + 0.5) * L / hooks
            k.tube([(x, -0.018, 0.05), (x, -0.07, 0.05), (x, -0.085, 0.075)], 0.006, 'chrome', seg=6, low=True)
        return k
    return b


def boot_rack(w=0.9):
    def b():
        k = Kit()
        for sx in (-1, 1): k.box((sx * (w / 2 - 0.012) - 0.012, -0.32, 0), (sx * (w / 2 - 0.012) + 0.012, 0, 0.75), 'steel')
        for z in (0.12, 0.42, 0.72): k.box((-w / 2, -0.32, z), (w / 2, 0, z + 0.015), 'steel', low=True)
        import random
        rnd = random.Random(5)
        for z in (0.135, 0.435):
            for i in range(3):
                x = -w / 2 + 0.1 + i * 0.27
                k.box((x, -0.29, z), (x + 0.1, -0.03, z + 0.07), 'plastic_white', bevel=0.01); k.box((x + 0.005, -0.12, z + 0.07), (x + 0.095, -0.03, z + 0.26), 'plastic_white', bevel=0.01)
                k.box((x + 0.11, -0.29, z), (x + 0.21, -0.03, z + 0.07), 'plastic_white', bevel=0.01); k.box((x + 0.115, -0.12, z + 0.07), (x + 0.205, -0.03, z + 0.26), 'plastic_white', bevel=0.01)
        return k
    return b


# ------------------------------------------------------------------------------------------- plant room / misc
def heat_pump():
    k = Kit()
    r = 0.36
    k.lathe([(0.0, 0.06), (r * 0.9, 0.06), (r, 0.1), (r, 1.5), (r * 0.985, 1.52), (r * 0.985, 1.56), (r, 1.58), (r, 1.98), (r * 0.9, 2.02), (0.0, 2.02)], 'tank_white', seg=24)
    k.lathe([(r + 0.002, 1.6), (r + 0.004, 1.6), (r + 0.004, 1.96), (r + 0.002, 1.96)], 'plastic_grey', seg=24, low=True)
    for i in range(3):
        a = math.radians(120 * i + 30); k.cyl((r * 0.8 * math.cos(a), r * 0.8 * math.sin(a), 0), 0.03, 0.06, 'plastic_dark', seg=8, low=True)
    k.box((-0.1, -r - 0.012, 1.0), (0.1, -r + 0.03, 1.22), 'plastic_dark', bevel=0.005)          # controller
    k.box((-0.07, -r - 0.014, 1.08), (0.07, -r - 0.011, 1.18), 'sign_blue', low=True)
    for (sx, mat) in ((-0.12, 'copper'), (0.12, 'copper'), (0.0, 'insulation')):
        k.tube([(sx, 0.12, 2.0), (sx, 0.12, 2.45), (sx, 0.62, 2.45)], 0.014 if mat == 'copper' else 0.03, mat, seg=8)
    k.cyl((0.18, 0.2, 0.45), 0.02, 0.1, 'copper', seg=8, axis='y', low=True)
    return k


def elec_panel(w=0.6, h=0.8):
    k = Kit()
    k.box((-w / 2, -0.2, 0), (w / 2, 0, h), 'plastic_grey', bevel=0.006)
    k.box((-w / 2 + 0.03, -0.206, 0.03), (w / 2 - 0.03, -0.2, h - 0.03), 'plastic_grey', bevel=0.003)
    k.box((w / 2 - 0.08, -0.215, h / 2 - 0.05), (w / 2 - 0.05, -0.206, h / 2 + 0.05), 'plastic_dark', low=True)
    k.box((-0.08, -0.208, h - 0.16), (0.08, -0.206, h - 0.08), 'plastic_yellow', low=True)
    return k


def clock():
    k = Kit()
    k.lathe([(0.0, 0.0), (0.17, 0.0), (0.17, 0.03), (0.155, 0.035), (0.155, 0.012), (0.0, 0.012)], 'plastic_dark', seg=24, M=RX(90))
    k.lathe([(0.0, 0.013), (0.154, 0.013)], 'paper', seg=24, M=RX(90), low=True)
    k.box((-0.006, -0.018, 0.0), (0.006, -0.015, 0.1), 'plastic_dark', low=True)
    k.box((0.0, -0.018, -0.006), (0.13, -0.015, 0.006), 'plastic_dark', low=True)
    return k


def extinguisher():
    k = Kit()
    k.lathe([(0.0, 0.0), (0.065, 0.0), (0.07, 0.02), (0.07, 0.4), (0.05, 0.46), (0.02, 0.48), (0.02, 0.52), (0.0, 0.52)], 'plastic_red', seg=14, M=T(0, -0.09, 0.08))
    k.box((-0.03, -0.15, 0.6), (0.03, -0.07, 0.63), 'plastic_dark', low=True)
    k.tube([(0.02, -0.09, 0.58), (0.09, -0.09, 0.5), (0.085, -0.09, 0.2)], 0.008, 'rubber_black', seg=6, low=True)
    k.box((-0.04, -0.02, 0.3), (0.04, 0, 0.5), 'steel', low=True)
    return k


def notice_board(w=1.2, h=0.9):
    k = Kit()
    k.box((-w / 2, -0.02, 0), (w / 2, 0, h), 'alu_dark')
    k.box((-w / 2 + 0.02, -0.024, 0.02), (w / 2 - 0.02, -0.02, h - 0.02), 'plastic_brown')
    import random
    rnd = random.Random(11)
    for i in range(7):
        x = rnd.uniform(-w / 2 + 0.08, w / 2 - 0.3); z = rnd.uniform(0.08, h - 0.38); a = rnd.choice((0.21, 0.148))
        k.box((x, -0.027, z), (x + a, -0.024, z + a * 1.414), rnd.choice(('paper', 'paper', 'plastic_yellow', 'hpl_blue')), low=True)
    return k


def mat(w=1.8, d=1.2):
    def b():
        k = Kit()
        k.box((-w / 2, -d / 2, 0), (w / 2, d / 2, 0.012), 'fabric_mat')
        k.box((-w / 2 - 0.02, -d / 2 - 0.02, 0), (w / 2 + 0.02, d / 2 + 0.02, 0.006), 'rubber_black', low=True)
        return k
    return b
