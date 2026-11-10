"""Places furniture and fixtures in every room, at the positions drawn on the plan (plan coordinates, metres)."""
import math, random
import bpy
from . import plan, bl, props as P
from .kit import Kit, T, RZ, RX, place, proto, FRONT

COLLIDERS = []        # plan rectangles of bespoke fittings that block walking


class PK:
    """a Kit addressed in plan coordinates, for one-off fittings built in place"""
    def __init__(self, room):
        self.k = Kit(); self.room = room

    def box(self, x0, y0, z0, x1, y1, z1, mat, bevel=0.0, low=False, grain=None, collide=None):
        self.k.box(plan.W(x0, y0, z0), plan.W(x1, y1, z1), mat, bevel=bevel, low=low, grain=grain)
        lo, hi = min(z0, z1), max(z0, z1)
        w, d = abs(x1 - x0), abs(y1 - y0)
        if collide or (collide is None and lo < 1.2 and hi > 0.35 and max(w, d) > 0.2 and w * d > 0.002):
            COLLIDERS.append((min(x0, x1), min(y0, y1), max(x0, x1), max(y0, y1)))

    def cyl(self, x, y, z, r, h, mat, seg=14, low=False, r2=None):
        self.k.cyl(plan.W(x, y, z), r, h, mat, seg=seg, low=low, r2=r2)

    def tube(self, pts, r, mat, seg=8, low=False):
        self.k.tube([plan.W(*p) for p in pts], r, mat, seg=seg, low=low)

    def lathe(self, x, y, z, prof, mat, seg=16, low=False):
        self.k.lathe(prof, mat, seg=seg, M=T(*plan.W(x, y, z)), low=low)

    def quad(self, pts, mat, uvs=None, low=False):
        return self.k.quad([plan.W(*p) for p in pts], mat, uvs=uvs, low=low)

    def panel(self, x0, y0, x1, y1, z0, z1, mat, t=0.013, collide=True):
        """thin vertical panel from (x0, y0) to (x1, y1) (any direction)"""
        L = math.hypot(x1 - x0, y1 - y0)
        a = math.degrees(math.atan2(-(y1 - y0), x1 - x0))          # world angle (y flipped)
        M = T(*plan.W(x0, y0, 0)) @ RZ(a)
        self.k.box((0, -t / 2, z0), (L, t / 2, z1), mat, M=M)
        if collide:
            pad = 0.02
            COLLIDERS.append((min(x0, x1) - pad, min(y0, y1) - pad, max(x0, x1) + pad, max(y0, y1) + pad))

    def done(self, name=None):
        if not len(self.k.bm.faces): return None
        nm = name or ('F_' + self.room)
        ob = bpy.data.objects.new(nm, self.k.mesh(nm))
        bl.collection('FURN').objects.link(ob); ob['room'] = self.room; ob['kind'] = 'fit'
        return ob


def put(name, builder, x, y, front='S', z=0.0, room=None, rot=None, **kw):
    return place(proto(name, builder), x, y, front, z=z, room=room, rot=rot, **kw)


def drains(pts):
    for (x, y) in pts: put('drain', P.drain, x, y, nocollide=1)


# ============================================================================================== canteen
TABLE_X = (16.38, 18.40, 20.43, 22.47, 24.50)
TABLE_Y = (25.75, 28.69, 31.62, 34.56)


def canteen():
    rnd = random.Random(41)
    for cx in TABLE_X:
        for cy in TABLE_Y:
            put('table_180', P.table_180, cx, cy, rot=90, room='REF')
            for sx, front in ((-1, 'E'), (1, 'W')):
                for dy in (-0.42, 0.41):
                    pull = rnd.choice((0.0, 0.0, 0.03, 0.08, 0.16))
                    put('chair', P.chair, cx + sx * (0.56 + pull) + rnd.uniform(-0.01, 0.01), cy + dy + rnd.uniform(-0.03, 0.03),
                        rot=FRONT[front] + rnd.uniform(-6, 6) * (2.5 if pull > 0.1 else 1), room='REF')
    for x, lid in zip((15.78, 16.52, 17.26, 17.99, 18.73), ('plastic_blue', 'plastic_yellow', 'plastic_green', 'plastic_brown', 'plastic_grey')):
        put('bin_' + lid, P.bin_pedal(lid), x, 21.42, 'S', room='REF')
    put('clock', P.clock, 22.0, 21.404, 'S', z=2.45, room='REF', nocollide=1)
    put('planter_t', P.planter(True), 25.55, 21.78, room='REF')
    put('planter_t', P.planter(True), 25.6, 35.3, rot=40, room='REF')
    put('planter_s', P.planter(False), 20.1, 21.72, rot=15, room='REF')
    put('planter_s', P.planter(False), 13.5, 34.75, rot=70, room='REF')


def serving_line():
    """self-service counter in the hatch between servery and canteen (x 12.37-13.112, y 23.567-28.698)."""
    k = PK('REF')
    xk, xc = 12.46, 13.112          # kitchen edge / customer face of the counter body
    y0, y1 = 23.70, 28.57
    H = 0.90
    # carcass, plinth, customer-side cladding
    k.box(xk + 0.04, y0, 0.12, xc - 0.03, y1, H - 0.04, 'steel', grain='y')
    k.box(xk + 0.08, y0 + 0.02, 0.0, xc - 0.06, y1 - 0.02, 0.12, 'plastic_dark', low=True, collide=False)
    k.box(xc - 0.03, y0, 0.12, xc + 0.012, y1, H - 0.05, 'oak', grain='z', collide=False)
    # neutral worktops (three units), bain-marie with 4 pans, cold well
    def top(ya, yb, wells=(), depth=0.1, inner='steel', bottom=None):
        xs0, xs1 = xk - plan.OX, xc + 0.03 - plan.OX
        ya_w, yb_w = plan.OY - yb, plan.OY - ya
        ww = [(a - plan.OX, plan.OY - d, c - plan.OX, plan.OY - b) for (a, b, c, d) in wells]
        P.top_with_wells(k.k, xs0, ya_w, xs1, yb_w, H - 0.04, H, ww, 'steel', inner, depth, bottom)
    top(y0, 25.43)
    pans = [(12.56, yy - 0.155, 13.06, yy + 0.155) for yy in (25.63, 26.0, 26.37, 26.74)]
    top(25.43, 26.93, pans, depth=0.07)
    for (a, b, c, d), food in zip(pans, ('food_rice', 'food_stew', 'food_veg', 'food_pasta')):
        k.box(a + 0.012, b + 0.012, H - 0.075, c - 0.012, d - 0.012, H - 0.03, food, low=True, collide=False)
        k.tube([(a + 0.1, b + 0.06, H - 0.03), (a + 0.3, d - 0.05, H + 0.07)], 0.006, 'chrome', seg=6, low=True)       # serving spoon
    top(26.93, y1, [(12.58, 27.05, 13.04, 28.45)], depth=0.12, inner='steel', bottom='plastic_dark')
    rnd = random.Random(5)
    for i in range(7):      # bowls and plates in the cold well
        bx, by = 12.69 + (i % 2) * 0.23, 27.2 + (i // 2) * 0.36 + rnd.uniform(-0.03, 0.03)
        k.lathe(bx, by, H - 0.118, [(0.0, 0.0), (0.05, 0.0), (0.085, 0.045), (0.08, 0.045), (0.05, 0.008), (0.0, 0.008)], 'ceramic', seg=12, low=True)
        k.lathe(bx, by, H - 0.118, [(0.0, 0.03), (0.07, 0.035)], rnd.choice(('food_veg', 'food_rice', 'plastic_red', 'food_pasta')), seg=10, low=True)
    # sneeze guard over the food
    for yy in (25.45, 26.52, 27.59, 28.55):
        k.tube([(12.93, yy, H), (12.93, yy, 1.42)], 0.011, 'chrome', seg=8)
    k.quad([(13.10, 25.45, 1.02), (13.10, 28.55, 1.02), (12.94, 28.55, 1.38), (12.94, 25.45, 1.38)], 'glass')
    k.box(12.62, 25.43, 1.40, 12.96, 28.57, 1.412, 'steel', collide=False)
    # tray stack, cutlery, plates
    for i in range(14): k.box(12.62, 23.80, H + i * 0.012, 12.98, 24.26, H + i * 0.012 + 0.009, 'plastic_brown' if i % 5 else 'plastic_grey', low=True, collide=False)
    for j in range(3): k.box(12.60 + j * 0.15, 24.42, H, 12.73 + j * 0.15, 24.74, H + 0.11, 'steel', bevel=0.004, collide=False)
    for j in range(2):
        k.lathe(12.74 + j * 0.25, 25.12, H, [(0.0, 0.0), (0.115, 0.0), (0.12, 0.012 * 16), (0.0, 0.012 * 16)], 'ceramic', seg=16)
    # tray slide: three rails on brackets
    for xr in (13.20, 13.30, 13.40):
        k.tube([(xr, y0, 0.86), (xr, y1, 0.86)], 0.015, 'steel', seg=8)
    for yy in (y0 + 0.08, 24.9, 26.1, 27.3, y1 - 0.08):
        k.box(xc, yy - 0.015, 0.825, 13.42, yy + 0.015, 0.845, 'steel', low=True, collide=False)
    COLLIDERS.append((xc, y0, 13.43, y1))
    # folded shutters at both ends of the hatch (the zig-zag on the plan)
    for (ya, yb) in ((23.567, 23.69), (28.575, 28.698)):
        for i in range(5): k.box(12.60 + i * 0.1, ya, H, 12.69 + i * 0.1, yb, 2.10, 'steel_dark', low=True, collide=False)
    k.done('F_SERV')


def tray_return():
    k = PK('TRAY')
    for y in (30.53, 31.20, 31.86, 32.52, 33.18, 33.84):
        put('tray_trolley', P.tray_trolley, 13.23, y, rot=90, room='TRAY')
    # the two gates, drawn folded back against the wall on the plan
    for (ya, yb) in ((28.86, 28.9), (35.68, 35.72)):
        k.box(11.86, ya, 0.04, 13.06, yb, 2.04, 'hpl_grey', collide=False)
        k.box(11.90, ya - 0.004, 0.05, 13.02, yb + 0.004, 0.3, 'steel', low=True, collide=False)
        k.tube([(12.05, (ya + yb) / 2, 0.95), (12.05, (ya + yb) / 2 + (0.05 if ya < 30 else -0.05), 0.95), (12.05, (ya + yb) / 2 + (0.05 if ya < 30 else -0.05), 1.25), (12.05, (ya + yb) / 2, 1.25)], 0.01, 'chrome', seg=6, low=True)
    k.done()


# ============================================================================================== kitchen wing
def kitchen():
    # --- clean zone
    put('fridge', P.fridge(), 9.51, 22.862, 'S')
    put('sink_120', P.sink_unit(1.2), 10.57, 22.862, 'S')
    put('oven', P.oven_on_stand, 11.45, 22.862, 'S')
    put('pot', P.pot_station, 12.065, 22.862, 'S')
    put('handwash', P.handwash(), 8.534, 25.15, 'E')
    put('bin_round', P.bin_round(), 8.80, 24.62)
    def shelf_full():
        k = P.shelf_unit(0.8, 0.26, 1.8, 4)()
        for i, z in enumerate((0.2, 0.72, 1.24)): P.crates(k, 0.8, 0.26, z, 3, seed=i)
        return k
    put('shelf_dry', shelf_full, 10.075, 28.15, 'E')
    def pass_table():
        k = P.work_table(1.385, 0.52)()
        for x in (-0.45, 0.1): k.box((x, -0.47, 0.9), (x + 0.5, -0.05, 1.0), 'plastic_grey', bevel=0.008)
        return k
    put('pass_table', pass_table, 9.231, 29.5, 'N')
    drains([(10.63, 24.55), (10.63, 27.7)])
    # --- dishwashing
    put('prerinse', P.prerinse_table, 6.825, 33.395, 'N')
    put('dishwasher', P.dishwasher, 8.0, 33.395, 'N')
    put('table_067', P.work_table(0.67), 8.735, 33.395, 'N')
    put('sink_115', P.sink_unit(1.15), 9.675, 33.395, 'N')
    put('counter_070', P.counter_unit(0.7), 10.63, 33.395, 'N')
    put('bin_round', P.bin_round(), 11.27, 33.08)
    put('handwash', P.handwash(), 10.225, 30.896, 'S')
    put('bin_round', P.bin_round(), 11.03, 31.17)
    put('table_low', P.work_table(0.7, 0.5, 0.75), 4.95, 30.896, 'S')
    drains([(6.43, 31.6), (10.78, 31.6), (6.43, 34.7)])
    for x, lid in zip((4.92, 5.57, 6.22, 6.87, 7.44), ('plastic_grey', 'plastic_grey', 'plastic_yellow', 'plastic_blue', 'plastic_green')):
        put('wheelie_' + lid, P.wheelie_bin(lid, 'plastic_dark' if lid == 'plastic_grey' else lid), x, 35.36, 'N')
    # --- cleaning store
    def clean_shelf():
        k = P.shelf_unit(1.6, 0.4, 1.8, 4)()
        rnd = random.Random(3)
        for z in (0.2, 0.72, 1.24, 1.76):
            x = -0.72
            while x < 0.62:
                r = rnd.choice((0.04, 0.05, 0.07)); h = rnd.uniform(0.18, 0.3)
                k.cyl((x + r, -0.2 + rnd.uniform(-0.08, 0.08), z + 0.02), r, h, rnd.choice(('plastic_blue', 'plastic_white', 'plastic_yellow', 'plastic_green', 'plastic_red')), seg=10, low=True)
                x += 2 * r + rnd.uniform(0.02, 0.1)
        return k
    put('clean_shelf', clean_shelf, 10.4, 35.733, 'N')
    put('handwash', P.handwash(), 8.55, 35.733, 'N')
    put('cleaning_cart', P.cleaning_cart, 9.25, 34.25, rot=20)
    drains([(9.25, 34.9)])
    # --- food delivery
    put('table_120', P.work_table(1.2), 6.26, 30.748, 'N')
    put('table_145', P.work_table(1.45), 7.63, 30.748, 'N')
    put('trolley_iso', P.trolley_iso, 7.40, 29.66, rot=0)
    put('trolley_iso', P.trolley_iso, 8.01, 29.66, rot=0)
    put('fire_cabinet', P.fire_cabinet, 4.535, 30.22, 'E')
    drains([(6.43, 29.05)])


def staff_room():
    k = PK('VEST')
    for y in (23.26, 23.87, 24.47):
        put('wall_basin', P.wall_basin, 4.535, y, 'E')
        put('mirror_s', P.mirror_panel(0.42, 0.6), 4.535, y, 'E', z=1.12, nocollide=1)
        put('soap', P.dispenser('soap'), 4.535, y + 0.3, 'E', z=1.0, nocollide=1)
    put('paper', P.dispenser('paper'), 5.72, 22.862, 'S', z=1.15, nocollide=1)
    put('bin_round', P.bin_round(), 5.42, 23.12)
    # screen between wash basins and lockers
    k.panel(4.535, 24.87, 6.0, 24.87, 0.15, 2.0, 'hpl_grey')
    k.cyl(6.0, 24.87, 0.0, 0.016, 2.02, 'steel', seg=8)
    k.cyl(5.2, 24.87, 0.0, 0.012, 0.15, 'steel', seg=6, low=True)
    for i in range(3): put('locker_w', P.locker(0.44, 0.5, 1.8, 'hpl_blue'), 4.535, 25.35 + i * 0.445, 'E')
    put('bench_134', P.bench(1.335, 0.28, 2), 5.19, 25.795, rot=90)
    for i in range(6): put('locker_w', P.locker(0.44, 0.5, 1.8, 'hpl_blue'), 8.384, 23.082 + i * 0.44, 'W')
    put('bench_264', P.bench(2.64, 0.28, 2), 7.73, 24.18, rot=90)
    drains([(5.97, 24.95)])
    # WC cubicle front and division
    y = 26.668
    for (a, b) in ((5.605, 5.75), (6.36, 6.65), (7.26, 7.404)): k.panel(a, y, b, y, 0.0, 2.1, 'hpl_grey')
    k.panel(6.505, y, 6.505, 27.642, 0.15, 2.1, 'hpl_grey')
    k.box(5.605, y - 0.02, 2.1, 7.404, y + 0.02, 2.14, 'steel', collide=False)
    def wc_door(hx, ang):       # leaf 0.61 hinged at hx, swinging south
        L = 0.608
        k.panel(hx, y, hx + math.cos(math.radians(ang)) * L * (-1 if hx < 6.5 else 1), y + math.sin(math.radians(ang)) * L, 0.12, 2.06, 'door_wet', t=0.02)
    wc_door(6.36, 18); wc_door(6.65, 72)
    put('toilet', P.toilet(), 4.535, 27.14, 'E')
    put('toilet', P.toilet(), 8.384, 27.14, 'W')
    def mini_basin():
        kk = Kit()
        P.top_with_wells(kk, -0.16, -0.2, 0.16, 0, 0.78, 0.84, [(-0.12, -0.17, 0.12, -0.05)], 'ceramic', 'ceramic', 0.07)
        kk.box((-0.14, -0.18, 0.7), (0.14, -0.01, 0.78), 'ceramic')
        P.tap(kk, 0.0, -0.03, 0.84, reach=0.08, h=0.08)
        return kk
    put('mini_basin', mini_basin, 5.35, 27.642, 'N'); put('mini_basin', mini_basin, 7.69, 27.642, 'N')
    put('bin_small', P.bin_round(0.09, 0.28, 'plastic_white'), 4.66, 26.86); put('bin_small', P.bin_round(0.09, 0.28, 'plastic_white'), 8.26, 26.86)
    put('roll', P.dispenser('roll'), 4.95, 27.642, 'N', z=0.75, nocollide=1); put('roll', P.dispenser('roll'), 8.0, 27.642, 'N', z=0.75, nocollide=1)
    k.done()


# ============================================================================================== changing rooms
WC_X = (36.92, 37.79, 38.66, 39.53, 40.40, 41.27, 42.13)
BASIN_X = (37.66, 38.42, 39.19, 39.96, 40.74, 41.51)


def changing_room(tag):
    fem = tag == 'F'
    room = 'BALF' if fem else 'BALM'
    k = PK(room)
    A, B = ('hpl_green', 'hpl_grey') if fem else ('hpl_blue', 'hpl_grey')
    lk = {A: ('locker_' + A, P.locker(door=A)), B: ('locker_' + B, P.locker(door=B))}
    pat = [A, A, B, A, B, B, A, A, B, A, A, B, A, B, A, A]
    def bank(n, x0, y0, dx, dy, front, start=0):
        for i in range(n):
            name, bld = lk[pat[(i + start) % len(pat)]]
            put(name, bld, x0 + dx * i, y0 + dy * i, front, room=room)
    # alcove: 13 lockers along the shower-zone wall + bench
    ya = 15.071 if fem else 22.862
    bank(13, 30.462 + 0.149, ya, 0.298, 0, 'S' if fem else 'N')
    put('bench_387', P.bench(3.87), 32.4, 15.64 if fem else 22.30, room=room)
    # three rows across the hall (8 + 16 + 16)
    ys = (16.468 if fem else 19.069) + 0.15
    yc = (17.668 if fem else 20.269)
    bank(8, 35.79, ys, 0, 0.30, 'E', 3); put('bench_240', P.bench(2.4), 36.36, yc, rot=90, room=room)
    for xc in (38.69, 41.59):
        bank(8, xc, ys, 0, 0.30, 'W', 5); bank(8, xc, ys, 0, 0.30, 'E', 1)
        put('bench_240', P.bench(2.4), xc - 0.38 - 0.19, yc, rot=90, room=room); put('bench_240', P.bench(2.4), xc + 0.38 + 0.19, yc, rot=90, room=room)
        # close the free end of the back-to-back bank
        ye = (16.468 if fem else 21.469)
        k.box(xc - 0.38, ye - (0.016 if fem else 0), 0.0, xc + 0.38, ye + (0 if fem else 0.016), 2.06, 'hpl_grey', collide=False)
    # WC cubicles
    yw, yf = (10.817, 12.26) if fem else (27.14, 25.72)
    s = 1 if fem else -1                       # +1: cubicles open towards plan south
    for i, x in enumerate(WC_X):
        k.panel(x, yw, x, yf, 0.15, 2.0, 'hpl_grey')
        k.cyl(x, yf - s * 0.05, 0.0, 0.014, 0.15, 'steel', seg=6, low=True)
    k.box(WC_X[0] - 0.02, yf - 0.02, 2.0, WC_X[-1] + 0.02, yf + 0.02, 2.045, 'steel', collide=False)
    angles = (68, 0, 24, 0, 78, 0)
    for i in range(6):
        xa, xb = WC_X[i], WC_X[i + 1]
        k.panel(xa, yf, xa + 0.08, yf, 0.15, 2.0, 'hpl_grey'); k.panel(xb - 0.08, yf, xb, yf, 0.15, 2.0, 'hpl_grey')
        left = i < 4
        hx = xa + 0.08 if left else xb - 0.08
        L = (xb - xa) - 0.16
        a = math.radians(angles[i])
        ex = hx + (1 if left else -1) * math.cos(a) * L; ey = yf + s * math.sin(a) * L
        k.panel(hx, yf, ex, ey, 0.15, 1.98, 'door_wet', t=0.018, collide=angles[i] < 40)
        mx, my = hx + (ex - hx) * 0.9, yf + (ey - yf) * 0.9
        k.cyl(mx, my + s * 0.012, 1.0, 0.02, 0.012, 'chrome', seg=8, low=True)
        put('toilet', P.toilet(), (xa + xb) / 2, yw, 'S' if fem else 'N', room=room)
        k.box(xa + 0.012, yw + s * 0.55, 0.72, xa + 0.13, yw + s * 0.80, 0.99, 'plastic_white', bevel=0.02, low=True, collide=False)      # paper
    # wash basins: counter with six bowls, mirror, soap, paper
    yv = 14.916 if fem else 23.021
    def vanity():
        kk = Kit()
        x0, x1 = 37.05 - 39.585, 42.12 - 39.585
        wells = [(bx - 39.585 - 0.24, -0.43, bx - 39.585 + 0.24, -0.11) for bx in BASIN_X]
        P.top_with_wells(kk, x0, -0.5, x1, 0, 0.82, 0.86, wells, 'laminate_white', 'ceramic', 0.13)
        kk.box((x0, -0.5, 0.66), (x1, -0.485, 0.82), 'laminate_white', grain='x')
        for xs in (x0, (x0 + x1) / 2 - 0.01, x1 - 0.02): kk.box((xs, -0.47, 0.0), (xs + 0.02, 0, 0.82), 'laminate_white')
        for bx in BASIN_X:
            xx = bx - 39.585
            kk.cyl((xx, -0.06, 0.86), 0.02, 0.1, 'chrome', seg=10)
            kk.tube([(xx, -0.06, 0.95), (xx, -0.17, 0.99)], 0.012, 'chrome', seg=8)
            kk.tube([(xx, -0.27, 0.73), (xx, -0.27, 0.45), (xx, 0.0, 0.45)], 0.016, 'chrome', seg=6, low=True)
        kk.box((x0, -0.012, 0.86), (x1, 0, 0.96), 'laminate_white', low=True)
        return kk
    put('vanity', vanity, 39.585, yv, 'N' if fem else 'S', room=room)
    put('mirror_big', P.mirror_panel(4.2, 0.95), 39.585, yv, 'N' if fem else 'S', z=1.02, room=room, nocollide=1, mirror=1)
    for bx in (BASIN_X[0] + 0.385, BASIN_X[2] + 0.385, BASIN_X[4] + 0.385):
        put('soap', P.dispenser('soap'), bx, yv, 'N' if fem else 'S', z=1.06, room=room, nocollide=1)
    for bx in (37.24, 41.93):
        put('paper', P.dispenser('paper'), bx, yv, 'N' if fem else 'S', z=1.2, room=room, nocollide=1)
        put('bin_round', P.bin_round(0.16, 0.5), bx - 0.35 * (1 if bx < 39 else -1), yv - s * 0.25, room=room)
    # showers: 4 on the outer wall, 3 opposite
    if fem: yws, ye = (11.27, 12.27, 13.27, 14.37), (11.27, 12.27, 13.27)
    else: yws, ye = (23.57, 24.67, 25.67, 26.68), (24.67, 25.67, 26.68)
    for y in yws: put('shower', P.shower_set, 30.462, y, 'E', room=room, nocollide=1); put('drain', P.drain, 30.98, y, room=room, nocollide=1)
    for y in ye: put('shower', P.shower_set, 34.7, y, 'W', room=room, nocollide=1); put('drain', P.drain, 34.2, y, room=room, nocollide=1)
    drains([(32.6, 12.8 if fem else 25.2)])
    # shower doors: hinged on the divider end, 0.83 m leaf, some left open
    if fem: hw, he, d = (11.70, 12.70, 13.70, 14.89), (11.70, 12.70, 13.70), -1
    else: hw, he, d = (23.06, 24.25, 25.25, 26.25), (24.25, 25.25, 26.25), 1
    L = 0.83
    for (hx, hys, side, angs) in ((31.475, hw, 1, (0, 74, 0, 16)), (33.735, he, -1, (80, 0, 0))):
        for hy, ang in zip(hys, angs):
            a = math.radians(ang)
            ex = hx + side * math.sin(a) * L; ey = hy + d * math.cos(a) * L
            k.panel(hx, hy, ex, ey, 0.15, 1.98, 'door_wet', t=0.018, collide=ang < 40)
            k.cyl(hx, hy, 0.0, 0.014, 2.0, 'steel', seg=6)
            k.cyl(hx + (ex - hx) * 0.92 + side * 0.012, hy + (ey - hy) * 0.92, 1.0, 0.02, 0.012, 'chrome', seg=8, low=True)
    # fixed infill beside the door of the longer end cubicle
    if fem: k.panel(31.475, 13.822, 31.475, 14.06, 0.15, 1.98, 'door_wet', t=0.018)
    else: k.panel(31.475, 23.021, 31.475, 23.06, 0.15, 1.98, 'door_wet', t=0.018); k.panel(31.475, 23.89, 31.475, 24.122, 0.15, 1.98, 'door_wet', t=0.018)
    if not fem:
        for y in (25.63, 26.25, 26.87): put('urinal', P.urinal, 34.85, y, 'E', room=room, nocollide=1)
        for y in (25.32, 25.94, 26.56): k.box(34.85, y - 0.0065, 0.5, 35.17, y + 0.0065, 1.4, 'hpl_grey', collide=False)
        COLLIDERS.append((34.85, 25.3, 35.17, 27.05))
    # hygiene step-over bench in the opening to the transition room, floor line on the clean side
    yb = 14.658 if fem else 23.268
    put('stepover', P.stepover_bench, 44.408, yb, rot=90, room=room, nocollide=1)
    k.box(44.66, yb - 1.0, 0.0, 44.71, yb + 1.0, 0.003, 'sign_blue', low=True, collide=False)
    k.done()


def transition(tag):
    fem = tag == 'F'
    room = 'TRF' if fem else 'TRM'
    k = PK(room)
    if fem:
        west = [10.817 + 0.45 + 0.9 * i for i in range(3)]; east = [10.817 + 0.45 + 0.9 * i for i in range(5)]
        ywall, front, ys = 10.817, 'S', 16.86
    else:
        west = [27.14 - 0.45 - 0.9 * i for i in range(3)]; east = [27.14 - 0.45 - 0.9 * i for i in range(5)]
        ywall, front, ys = 27.14, 'N', 21.07
    for y in west: put('cabinet_tall', P.cabinet_tall(), 44.483, y, 'E', room=room)
    for y in east: put('cabinet_tall', P.cabinet_tall(), 48.055, y, 'W', room=room)
    put('coat_rail', P.coat_rail(), 46.27, ywall, front, z=1.6, room=room, nocollide=1)
    put('boot_rack', P.boot_rack(), 45.75, ywall, front, room=room)
    put('boot_rack', P.boot_rack(), 46.75, ywall, front, room=room)
    put('wash_trough', P.wash_trough, 44.483, ys, 'E', room=room)
    put('paper', P.dispenser('paper'), 44.483, ys - 0.72 * (1 if fem else -1), 'E', z=1.2, room=room, nocollide=1)
    put('soap', P.dispenser('soap'), 44.483, ys, 'E', z=1.22, room=room, nocollide=1)
    put('bin_round', P.bin_round(0.16, 0.5), 44.75, ys - 0.75 * (1 if fem else -1), room=room)
    put('gel', P.dispenser('gel'), 47.4, 17.706 if fem else 20.218, 'N' if fem else 'S', z=1.12, room=room, nocollide=1)
    k.done()


def small_rooms():
    # --- accessible WC
    put('toilet_acc', P.toilet(True), 27.62, 16.15, 'E')
    put('grab_fold', P.grab_bar(0.75, True), 27.62, 15.78, 'E', nocollide=1)
    put('grab_fold', P.grab_bar(0.75, True), 27.62, 16.52, 'E', nocollide=1)
    put('wall_basin', P.wall_basin, 29.9, 15.16, 'S')
    put('mirror_s', P.mirror_panel(0.42, 0.6), 29.9, 15.16, 'S', z=1.05, nocollide=1)
    put('soap', P.dispenser('soap'), 29.5, 15.16, 'S', z=1.0, nocollide=1)
    put('paper', P.dispenser('paper'), 30.315, 15.8, 'W', z=1.1, nocollide=1)
    put('bin_small', P.bin_round(0.12, 0.4, 'plastic_white'), 30.12, 16.75)
    put('grab_fix', P.grab_bar(0.6, False), 28.9, 15.16, 'S', nocollide=1)
    # --- plant room
    k = PK('TEC')
    for x in (24.07, 25.51, 26.93): put('heat_pump', P.heat_pump, x, 17.05, 'S', room='TEC')
    k.tube([(23.4, 16.43, 2.45), (27.25, 16.43, 2.45), (27.25, 16.43, 0.5)], 0.03, 'insulation', seg=8)
    k.tube([(23.25, 16.38, 2.6), (27.3, 16.38, 2.6)], 0.016, 'copper', seg=8)
    k.tube([(23.25, 16.38, 2.6), (23.25, 16.38, 0.3)], 0.016, 'copper', seg=8)
    k.lathe(23.3, 17.9, 0.9, [(0.0, 0.0), (0.12, 0.02), (0.15, 0.1), (0.15, 0.4), (0.12, 0.48), (0.0, 0.5)], 'plastic_red', seg=14)
    put('elec_panel', P.elec_panel, 27.37, 17.75, 'W', z=0.9, room='TEC', nocollide=1)
    k.done()
    # --- entrance airlock
    put('gel', P.dispenser('gel'), 45.0, 17.856, 'S', z=1.12, room='ANTE', nocollide=1)
    put('mat_small', P.mat(1.2, 0.8), 47.3, 18.95, rot=90, room='ANTE', nocollide=1)


def circulation():
    put('mat_entry', P.mat(1.8, 1.2), 23.85, 19.9, rot=90, room='CIRC', nocollide=1)
    put('planter_t', P.planter(True), 23.42, 18.86, room='CIRC'); put('planter_t', P.planter(True), 23.42, 20.95, rot=120, room='CIRC')
    put('bench_200', P.bench(2.0, 0.38), 26.1, 18.553 + 0.2, room='CIRC')
    put('notice', P.notice_board, 24.7, 21.251, 'N', z=0.95, room='CIRC', nocollide=1)
    put('clock', P.clock, 30.315, 18.97, 'W', z=2.45, room='CIRC', nocollide=1)
    put('extinguisher', P.extinguisher, 26.238, 24.3, 'E', room='CIRC', nocollide=1)
    put('extinguisher', P.extinguisher, 15.062, 22.3, 'W', room='CORR', nocollide=1)
    put('planter_s', P.planter(False), 29.95, 26.95, rot=200, room='CIRC')
    put('notice', P.notice_board, 9.5, 21.404, 'S', z=0.95, room='CORR', nocollide=1)


def build(info=None):
    COLLIDERS.clear()
    canteen(); serving_line(); tray_return(); kitchen(); staff_room()
    changing_room('F'); changing_room('M'); transition('F'); transition('M')
    small_rooms(); circulation()
    from . import site, signs
    site.build(info)
    signs.build(info)
