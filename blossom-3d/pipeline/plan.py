"""Surveyed plan data for "Refeitório e Balneários" (planta geral, piso 0, versão 5, esc. 1/100).

All coordinates are in metres in the *plan frame*: x to the right and y downwards, origin at the
top-left corner of the drawing sheet, exactly as measured on the vector PDF (1 m = 28.3465 pt).
`data/walls_survey.json` holds the wall rectangles extracted from the hatched walls of the drawing;
everything else here (openings, rooms, heights, finishes) was read off the drawing by hand.

World frame used by Blender:  X = x - OX,  Y = OY - y,  Z up.   (three.js: X, Y up, Z = y - OY)
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
OX, OY = 26.0, 23.0

H_WALL = 3.30        # top of full-height walls (above the highest ceiling)
H_DOOR = 2.10        # door head
H_LOW = 2.10         # shower dividers
SILL, WHEAD = 0.95, 2.45   # canteen windows


def W(x, y, z=0.0):
    """plan -> Blender world"""
    return (x - OX, OY - y, z)


# ----------------------------------------------------------------------------------------- walls
def _load_walls():
    rects = [tuple(r) for r in json.load(open(os.path.join(HERE, '..', 'data', 'walls_survey.json')))['rects']]
    drop = [
        (4.535, 26.743, 4.576, 26.979), (4.535, 27.794, 4.576, 27.889),      # hatch slivers
        (27.339, 18.14, 27.37, 18.553),
        (30.462, 15.071, 30.553, 15.16), (30.462, 20.923, 30.553, 21.023),
        (48.055, 10.817, 48.304, 27.36),                                      # re-added below, split at the door
        (33.708, 24.122, 34.85, 24.222),                                      # re-added below, split by height
    ]
    def same(a, b): return all(abs(p - q) < 2e-3 for p, q in zip(a, b))
    out = []
    for r in rects:
        if any(same(r, d) for d in drop): continue
        if same(r, (24.735, 18.302, 27.339, 18.553)): r = (24.735, 18.302, 27.37, 18.553)
        out.append(r)
    out += [
        (4.431, 21.404, 4.535, 21.476), (4.431, 22.479, 4.535, 22.601),      # square up the staff-door jambs
        (13.112, 34.197, 13.68, 34.307),                                      # south return of the tray-return screen wall
        (28.097, 17.022, 28.98, 17.174),                                      # pocket of the sliding door (I.S. MC)
        (48.055, 10.817, 48.304, 18.97), (48.055, 19.87, 48.304, 27.36),      # existing east wall, door to production
        (33.708, 24.122, 34.7, 24.222), (34.7, 24.122, 34.85, 24.222),
        # existing corridor (outside the intervention limit, modelled as a short stub)
        (29.238, 29.991, 36.5, 30.139),
        (36.35, 27.36, 36.5, 27.875), (36.35, 29.475, 36.5, 29.991),
    ]
    return out


WALLS = _load_walls()

# shower-cubicle dividers stop at 2.10 m
_LOW = [
    (30.462, 11.722, 31.465, 11.822), (30.462, 12.722, 31.465, 12.823), (30.462, 13.722, 31.465, 13.822),
    (33.777, 11.722, 34.7, 11.822), (33.777, 12.722, 34.7, 12.823), (33.777, 13.722, 34.7, 13.822),
    (30.462, 24.122, 31.465, 24.222), (30.462, 25.122, 31.465, 25.222), (30.462, 26.122, 31.465, 26.222),
    (33.708, 24.122, 34.7, 24.222), (33.708, 25.122, 34.7, 25.222), (33.708, 26.122, 34.7, 26.222),
]


def wall_height(r):
    for l in _LOW:
        if all(abs(p - q) < 2e-3 for p, q in zip(r, l)): return H_LOW
    return H_WALL


# -------------------------------------------------------------------------------------- openings
# Each opening is a gap between wall ends: rect = (x0, y0, x1, y1) spanning the wall thickness.
# kind: door | double | slide | window | pass (open, with lintel) | hatch (serving counter)
# hinge: 'N','S','E','W' = which end of the gap carries the hinge;  swing: side the leaf opens to.
# Doors that lead out of the modelled area are `locked` (drawn closed, not walkable).
OPENINGS = [
    # --- kitchen / staff wing
    dict(id='D01', kind='door', rect=(4.284, 21.476, 4.535, 22.479), hinge='S', swing='E', style='ext', label='Entrada de serviço'),
    dict(id='D02', kind='door', rect=(5.999, 22.601, 7.15, 22.862), hinge='E', swing='S', style='int'),
    dict(id='D03', kind='door', rect=(8.384, 25.544, 8.534, 26.492), hinge='N', swing='W', style='kit'),
    dict(id='D06', kind='door', rect=(4.284, 27.94, 4.535, 29.091), hinge='S', swing='W', style='ext', label='Descarga alimentar'),
    dict(id='D07', kind='door', rect=(8.384, 27.889, 8.534, 28.849), hinge='N', swing='W', style='kit'),
    dict(id='D08', kind='door', rect=(9.927, 29.68, 10.075, 30.603), hinge='S', swing='E', style='kit'),
    dict(id='D09', kind='door', rect=(11.573, 28.964, 11.723, 29.917), hinge='N', swing='E', style='kit'),
    dict(id='D10', kind='door', rect=(11.573, 31.335, 11.723, 32.292), hinge='S', swing='E', style='kit'),
    dict(id='D11', kind='door', rect=(11.573, 34.378, 11.723, 35.336), hinge='S', swing='E', style='kit'),
    dict(id='D12', kind='door', rect=(7.77, 33.647, 7.921, 34.595), hinge='S', swing='W', style='kit'),
    dict(id='D13', kind='double', rect=(4.284, 31.974, 4.535, 34.378), swing='W', style='ext', label='Saída de resíduos'),
    dict(id='D14', kind='door', rect=(13.763, 22.601, 14.762, 22.74), hinge='E', swing='N', style='int'),
    # --- canteen
    dict(id='D15', kind='double', rect=(26.089, 21.918, 26.238, 23.702), swing='W', style='glazed'),
    dict(id='HATCH', kind='hatch', rect=(12.37, 23.567, 13.112, 28.698)),
    dict(id='W1', kind='window', rect=(13.68, 35.733, 15.282, 35.885)),
    dict(id='W2', kind='window', rect=(17.031, 35.733, 18.631, 35.885)),
    dict(id='W3', kind='window', rect=(20.735, 35.733, 22.335, 35.885)),
    dict(id='W4', kind='window', rect=(24.083, 35.733, 25.684, 35.885)),
    # --- circulation
    dict(id='D16', kind='double', rect=(22.841, 19.003, 23.093, 20.803), swing='W', style='entrance', head=2.60, label='Entrada principal'),
    dict(id='D17', kind='door', rect=(23.736, 18.302, 24.735, 18.553), hinge='W', swing='S', style='tech'),
    dict(id='D18', kind='slide', rect=(28.98, 17.022, 29.866, 17.174), slide='W', style='int'),
    dict(id='D28', kind='door', rect=(26.336, 29.991, 27.339, 30.139), hinge='W', swing='S', style='tech', locked=True, label='EDP'),
    dict(id='D31', kind='double', rect=(36.35, 27.875, 36.5, 29.475), swing='E', style='int', locked=True),
    # --- changing rooms
    dict(id='D19', kind='door', rect=(30.315, 17.706, 30.462, 18.724), hinge='S', swing='E', style='int'),
    dict(id='D20', kind='door', rect=(30.315, 19.224, 30.462, 20.218), hinge='N', swing='E', style='int'),
    dict(id='D21', kind='door', rect=(34.7, 13.822, 34.85, 14.916), hinge='S', swing='W', style='wet'),
    dict(id='D22', kind='door', rect=(34.7, 23.021, 34.85, 24.122), hinge='N', swing='W', style='wet'),
    dict(id='X1', kind='pass', rect=(44.333, 13.657, 44.483, 15.659)),      # step-over bench, women
    dict(id='X2', kind='pass', rect=(44.333, 22.267, 44.483, 24.27)),       # step-over bench, men
    dict(id='D25', kind='door', rect=(46.088, 17.706, 46.988, 17.856), hinge='W', swing='N', style='clean'),
    dict(id='D26', kind='door', rect=(46.088, 20.068, 46.988, 20.218), hinge='W', swing='S', style='clean'),
    dict(id='D27', kind='door', rect=(48.055, 18.97, 48.304, 19.87), hinge='N', swing='E', style='clean', locked=True, label='Produção'),
]
for o in OPENINGS:
    o.setdefault('head', H_DOOR)
    o.setdefault('sill', 0.0)
    if o['kind'] == 'window': o['sill'], o['head'] = SILL, WHEAD
    if o['kind'] == 'hatch': o['sill'], o['head'] = 0.0, 2.10
    x0, y0, x1, y1 = o['rect']
    o['axis'] = 'x' if (x1 - x0) > (y1 - y0) else 'y'      # direction the opening runs along
    o['width'] = max(x1 - x0, y1 - y0)

# ----------------------------------------------------------------------------------------- rooms
# rects are clear interior rectangles; the first room whose rect contains a point wins (sub-zones first).
# wall: (finish below 2.10 m, finish above);  ceil: ceiling height;  ceiling: ceiling finish
T = 'tile'
ROOMS = [
    dict(id='BALF_SH', name='Duches', parent='BALF', rects=[(30.462, 10.817, 34.7, 14.916)], floor='floor_wet', wall=('tile_wet', 'tile_wet'), ceil=2.80, ceiling='ceil_plain'),
    dict(id='BALM_SH', name='Duches', parent='BALM', rects=[(30.462, 23.021, 34.7, 27.14)], floor='floor_wet', wall=('tile_wet', 'tile_wet'), ceil=2.80, ceiling='ceil_plain'),
    dict(id='BALF', name='Balneário Feminino', area='111,25 m²', note='53 lugares', rects=[(30.462, 10.817, 44.333, 18.868)], floor='floor_bal', wall=('tile_bal', 'paint_white'), ceil=2.80, ceiling='ceil_plain'),
    dict(id='BALM', name='Balneário Masculino', area='111,25 m²', note='53 lugares', rects=[(30.462, 19.069, 44.333, 27.14)], floor='floor_bal', wall=('tile_bal', 'paint_white'), ceil=2.80, ceiling='ceil_plain'),
    dict(id='TRF', name='Sala Transição – Fem.', area='24,30 m²', rects=[(44.483, 10.817, 48.055, 17.706)], floor='floor_clean', wall=('panel_clean', 'panel_clean'), ceil=2.80, ceiling='ceil_clean'),
    dict(id='ANTE', name='Ante-Câmara Entrada', area='7,90 m²', rects=[(44.483, 17.856, 48.055, 20.068)], floor='floor_clean', wall=('panel_clean', 'panel_clean'), ceil=2.80, ceiling='ceil_clean'),
    dict(id='TRM', name='Sala Transição – Mas.', area='24,65 m²', rects=[(44.483, 20.218, 48.055, 27.14)], floor='floor_clean', wall=('panel_clean', 'panel_clean'), ceil=2.80, ceiling='ceil_clean'),
    dict(id='ISMC', name='I.S. Mobilidade Condicionada', area='5,00 m²', rects=[(27.62, 15.16, 30.315, 17.022)], floor='floor_bal', wall=('tile_bal', 'paint_white'), ceil=2.60, ceiling='ceil_plain'),
    dict(id='TEC', name='Área Técnica', area='8,60 m²', rects=[(23.093, 16.296, 27.37, 18.302)], floor='floor_concrete', wall=('paint_tech', 'paint_tech'), ceil=3.10, ceiling='ceil_plain'),
    dict(id='CIRC', name='Zona de Circulação', area='75,15 m²', rects=[(23.093, 18.553, 30.315, 21.251), (27.62, 17.174, 30.315, 18.553), (26.238, 21.251, 30.315, 27.36), (26.238, 27.36, 29.238, 29.991)], floor='floor_main', wall=('paint_white', 'paint_white'), ceil=3.00, ceiling='ceil_grid'),
    dict(id='EXC', name='Corredor Existente', rects=[(29.238, 27.36, 36.35, 29.991)], floor='floor_exist', wall=('paint_exist', 'paint_exist'), ceil=2.70, ceiling='ceil_grid'),
    dict(id='EDP', name='EDP', rects=[(26.238, 30.139, 29.087, 35.733)], floor='floor_concrete', wall=('paint_tech', 'paint_tech'), ceil=3.00, ceiling='ceil_plain', closed=True),
    dict(id='CORR', name='Circulação', area='15,90 m²', rects=[(4.535, 21.404, 15.062, 22.601)], floor='floor_kitchen', wall=('paint_white', 'paint_white'), ceil=2.60, ceiling='ceil_grid'),
    dict(id='VEST', name='Vestiário', area='18,45 m²', rects=[(4.535, 22.862, 8.384, 26.593)], floor='floor_bal', wall=('tile_bal', 'paint_white'), ceil=2.60, ceiling='ceil_plain'),
    dict(id='WC1', name='I.S.', parent='VEST', rects=[(4.535, 26.593, 6.505, 27.642)], floor='floor_bal', wall=('tile_bal', 'paint_white'), ceil=2.60, ceiling='ceil_plain'),
    dict(id='WC2', name='I.S.', parent='VEST', rects=[(6.505, 26.593, 8.384, 27.642)], floor='floor_bal', wall=('tile_bal', 'paint_white'), ceil=2.60, ceiling='ceil_plain'),
    dict(id='DESC', name='Área de Descarga Alimentar', area='11,40 m²', rects=[(4.535, 27.794, 8.384, 30.748)], floor='floor_kitchen', wall=('tile_kit', 'tile_kit'), ceil=2.80, ceiling='ceil_clean'),
    dict(id='LIMPOS', name='Zona de Limpos', area='29,55 m²', rects=[(8.534, 22.862, 12.37, 28.698), (12.37, 23.567, 13.112, 28.698), (10.075, 28.698, 11.573, 30.748), (8.534, 28.698, 9.927, 30.896), (9.927, 29.68, 10.075, 30.603)], floor='floor_kitchen', wall=('tile_kit', 'tile_kit'), ceil=2.80, ceiling='ceil_clean'),
    dict(id='SUJOS', name='Zona de Sujos', area='15,90 m²', rects=[(4.535, 30.896, 11.573, 33.395), (4.535, 33.395, 7.77, 35.733)], floor='floor_kitchen', wall=('tile_kit', 'tile_kit'), ceil=2.80, ceiling='ceil_clean'),
    dict(id='LIMPEZA', name='Área de Limpeza', area='15,90 m²', rects=[(7.921, 33.546, 11.573, 35.733)], floor='floor_kitchen', wall=('tile_kit', 'tile_kit'), ceil=2.80, ceiling='ceil_clean'),
    dict(id='TRAY', name='Devolução de tabuleiros', rects=[(11.723, 28.849, 13.112, 35.733), (13.112, 30.103, 13.57, 34.197)], floor='floor_kitchen', wall=('tile_kit', 'tile_kit'), ceil=2.80, ceiling='ceil_clean'),
    dict(id='REF', name='Refeitório', area='182,45 m²', note='80 lugares', rects=[(15.21, 21.404, 26.089, 22.74), (13.112, 22.74, 26.089, 29.991), (13.68, 29.991, 26.089, 34.307), (13.112, 34.307, 26.089, 35.733)], floor='floor_main', wall=('paint_white', 'paint_white'), ceil=3.20, ceiling='ceil_grid'),
]
ROOM = {r['id']: r for r in ROOMS}

# footprint of the whole building (for roof / ground), and of the existing neighbours shown hatched on the plan
EXIST_BLOCKS = [
    dict(name='Escritórios Blossom', rect=(31.9, 30.139, 51.2, 35.9)),
    dict(name='Produção (existente)', rect=(48.304, 18.75, 51.2, 30.139)),
]


# wall faces painted in the accent colour: rectangles around the probe point just in front of the face
ACCENTS = [(13.112, 22.74, 13.26, 28.86), (13.68, 29.98, 13.82, 34.32)]


def room_at(x, y, eps=0.0):
    for r in ROOMS:
        for (x0, y0, x1, y1) in r['rects']:
            if x0 - eps <= x <= x1 + eps and y0 - eps <= y <= y1 + eps:
                return r
    return None


# ------------------------------------------------------------------- viewpoints and the guided visit
# room -> (stand x, y, look-at x, y)
VIEWPOINTS = {
    'EXT': (20.4, 18.3, 23.0, 19.9), 'CIRC': (24.4, 19.9, 30.0, 19.9), 'REF': (24.8, 22.8, 16.0, 31.0),
    'BALF': (43.5, 16.0, 36.5, 17.2), 'BALM': (43.5, 21.9, 36.5, 20.7), 'TRF': (46.3, 14.9, 46.3, 11.0), 'TRM': (46.3, 23.0, 46.3, 27.0),
    'ANTE': (45.2, 18.95, 48.0, 18.95), 'ISMC': (29.4, 16.6, 28.0, 15.6), 'TEC': (24.3, 17.8, 26.5, 16.6),
    'CORR': (13.5, 22.0, 5.0, 22.0), 'VEST': (7.6, 25.9, 5.2, 23.4), 'DESC': (7.8, 28.3, 5.2, 30.2), 'LIMPOS': (9.2, 27.6, 12.4, 24.2),
    'SUJOS': (5.2, 31.6, 10.5, 33.0), 'LIMPEZA': (11.0, 34.9, 8.4, 34.0), 'TRAY': (12.5, 35.0, 12.8, 30.0), 'EXC': (30.5, 28.7, 36.0, 28.7),
}

# (x, y[, dict(room=caption trigger, pause=seconds, look=(x, y))])
TOUR = [
    (20.6, 19.9, dict(room='EXT')), (24.4, 19.9, dict(room='CIRC')), (25.8, 19.9), (27.3, 21.3), (27.3, 22.81), (26.16, 22.81),
    (24.4, 22.81, dict(room='REF', pause=2.5, look=(17.0, 30.0))), (21.0, 23.4), (16.4, 23.4), (14.5, 24.0),
    (14.4, 26.2, dict(pause=2.5, look=(12.8, 26.2))), (14.4, 28.6), (14.6, 30.15), (17.0, 30.15),
    (20.35, 30.15, dict(pause=2.0, look=(20.35, 36.0))), (25.65, 30.15), (25.65, 26.0), (25.6, 23.3), (25.4, 22.81), (26.16, 22.81), (27.4, 22.81),
    (28.7, 21.4), (29.2, 18.9), (29.5, 18.215), (30.39, 18.215), (31.6, 18.1, dict(room='BALF')), (33.6, 18.0), (34.85, 17.3), (35.05, 16.2),
    (36.6, 15.8, dict(pause=2.0, look=(39.5, 17.6))), (40.0, 15.75), (43.4, 15.7), (43.4, 13.8), (39.5, 13.5, dict(pause=2.0, look=(39.5, 15.0))),
    (36.1, 14.1), (34.775, 14.37), (33.0, 14.0, dict(pause=2.0, look=(31.0, 12.0))), (34.775, 14.37), (36.3, 13.8), (42.9, 14.0), (43.5, 14.66),
    (44.41, 14.66), (45.5, 14.66, dict(room='TRF', pause=2.0, look=(47.6, 12.4))), (46.7, 15.2), (47.45, 15.93), (47.3, 16.9), (46.54, 17.25), (46.54, 17.78),
    (46.5, 18.95, dict(room='ANTE')), (46.54, 20.14), (46.6, 20.75), (47.45, 21.05), (47.45, 22.0), (46.4, 23.27, dict(room='TRM')), (45.3, 23.27),
    (44.41, 23.27), (43.4, 23.3, dict(room='BALM')), (43.2, 24.4), (39.5, 24.4, dict(pause=2.0, look=(39.5, 26.6))), (36.5, 24.0), (35.75, 22.94),
    (36.3, 22.1), (35.2, 21.9), (34.9, 20.85), (33.5, 19.9), (31.4, 19.72), (30.39, 19.72), (29.2, 19.8, dict(room='CIRC')), (28.2, 21.2),
    (27.3, 22.81), (26.16, 22.81), (25.2, 22.7, dict(room='REF')), (21.0, 23.4), (16.0, 23.4), (14.26, 23.3), (14.26, 22.67), (14.1, 22.0, dict(room='CORR')),
    (7.4, 22.0), (6.575, 22.05), (6.575, 22.73), (6.6, 24.3, dict(room='VEST', pause=2.0, look=(5.0, 24.0))), (7.5, 26.02), (8.459, 26.02),
    (9.6, 26.0, dict(room='LIMPOS', pause=2.0, look=(12.3, 25.6))), (10.6, 27.3), (10.9, 28.9), (10.85, 29.9), (10.0, 30.14), (9.2, 30.25), (9.2, 30.9),
    (9.2, 31.9, dict(room='SUJOS', pause=2.0, look=(8.0, 33.0))), (10.9, 31.85), (11.648, 31.81), (12.4, 31.8, dict(room='TRAY')), (12.4, 29.7), (13.15, 29.42),
    (14.2, 29.45, dict(room='REF')), (14.6, 30.15), (18.3, 30.15, dict(pause=1.0, look=(22.0, 33.0))),
]
STEPOVERS = [o['rect'] for o in OPENINGS if o['id'] in ('X1', 'X2')]
NORTH_DEG = 30.0      # the plan's "up" points this many degrees east of north (north arrow on the sheet)
