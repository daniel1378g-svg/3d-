"""Wall signage: door plates, pictograms, exit signs and the canteen menu board, drawn into one texture atlas."""
import os
import bpy
from PIL import Image, ImageDraw, ImageFont
from . import plan, bl
from .kit import Kit

AW, AH = 2048, 1024
FONT = '/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
FONT_B = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
INK = (236, 238, 238)
PLATE = (52, 57, 62)

PLATES = [      # key, lines, background
    ('ref', ['REFEITÓRIO'], PLATE), ('balf', ['BALNEÁRIO', 'FEMININO'], PLATE), ('balm', ['BALNEÁRIO', 'MASCULINO'], PLATE),
    ('tec', ['ÁREA TÉCNICA'], PLATE), ('ismc', ['I.S. MOBILIDADE', 'CONDICIONADA'], PLATE), ('copa', ['COPA', 'ACESSO RESERVADO'], PLATE),
    ('vest', ['VESTIÁRIO'], PLATE), ('trans', ['SALA DE TRANSIÇÃO'], PLATE), ('prod', ['PRODUÇÃO'], PLATE),
    ('edp', ['EDP', 'ACESSO RESERVADO'], PLATE), ('tray', ['DEVOLUÇÃO', 'DE TABULEIROS'], PLATE), ('title', ['REFEITÓRIO', 'E BALNEÁRIOS'], PLATE),
    ('wash', ['LAVE AS MÃOS'], (30, 92, 160)), ('clean', ['ZONA LIMPA'], (30, 92, 160)), ('exit', ['SAÍDA'], (24, 134, 78)), ('staff', ['SERVIÇO'], PLATE),
]


def _font(path, size):
    try: return ImageFont.truetype(path, size)
    except Exception: return ImageFont.load_default()


def atlas(path):
    im = Image.new('RGB', (AW, AH), (40, 44, 48)); d = ImageDraw.Draw(im)
    cells = {}
    for i, (key, lines, bg) in enumerate(PLATES):
        x0, y0 = (i % 2) * 512, (i // 2) * 128
        d.rectangle([x0, y0, x0 + 511, y0 + 127], fill=bg)
        d.rectangle([x0 + 6, y0 + 6, x0 + 505, y0 + 121], outline=tuple(min(255, c + 34) for c in bg), width=2)
        size = 54 if len(lines) == 1 else 40
        f = _font(FONT, size)
        while max(d.textlength(t, font=f) for t in lines) > 470 and size > 20:
            size -= 2; f = _font(FONT, size)
        total = len(lines) * size * 1.12
        for j, t in enumerate(lines):
            w = d.textlength(t, font=f)
            d.text((x0 + 256 - w / 2, y0 + 64 - total / 2 + j * size * 1.12 - size * 0.08), t, font=f, fill=INK)
        cells[key] = (x0, y0, x0 + 512, y0 + 128)
    # pictograms 256 x 256 on the right half
    def picto(ix, iy, bg, draw):
        x0, y0 = 1024 + ix * 256, iy * 256
        d.rectangle([x0, y0, x0 + 255, y0 + 255], fill=bg); draw(x0, y0); return (x0, y0, x0 + 256, y0 + 256)
    def woman(x, y):
        d.ellipse([x + 104, y + 28, x + 152, y + 76], fill=INK); d.polygon([(x + 128, y + 84), (x + 78, y + 176), (x + 178, y + 176)], fill=INK)
        d.rectangle([x + 108, y + 176, x + 122, y + 230], fill=INK); d.rectangle([x + 134, y + 176, x + 148, y + 230], fill=INK)
    def man(x, y):
        d.ellipse([x + 104, y + 28, x + 152, y + 76], fill=INK); d.rounded_rectangle([x + 92, y + 84, x + 164, y + 168], 10, fill=INK)
        d.rectangle([x + 100, y + 168, x + 124, y + 230], fill=INK); d.rectangle([x + 132, y + 168, x + 156, y + 230], fill=INK)
    def access(x, y):
        d.ellipse([x + 96, y + 30, x + 136, y + 70], fill=INK)
        d.line([(x + 116, y + 76), (x + 122, y + 140), (x + 172, y + 140), (x + 190, y + 196)], fill=INK, width=18, joint='curve')
        d.arc([x + 62, y + 104, x + 166, y + 208], 100, 330, fill=INK, width=14)
    cells['woman'] = picto(0, 0, PLATE, woman); cells['man'] = picto(1, 0, PLATE, man); cells['access'] = picto(2, 0, (30, 92, 160), access)
    # menu board 768 x 512
    x0, y0 = 1024, 512
    d.rectangle([x0, y0, x0 + 767, y0 + 511], fill=(38, 42, 44))
    d.text((x0 + 48, y0 + 36), 'EMENTA DO DIA', font=_font(FONT_B, 62), fill=INK)
    d.line([(x0 + 48, y0 + 122), (x0 + 720, y0 + 122)], fill=(120, 150, 124), width=4)
    f = _font(FONT, 40)
    for j, (a, b) in enumerate((('Sopa', 'creme de legumes'), ('Prato', 'frango estufado com arroz'), ('Vegetariano', 'massa com legumes salteados'), ('Sobremesa', 'fruta da época'))):
        d.text((x0 + 48, y0 + 152 + j * 84), a, font=_font(FONT_B, 34), fill=(150, 184, 154)); d.text((x0 + 48, y0 + 190 + j * 84), b, font=f, fill=INK)
    cells['menu'] = (x0, y0, x0 + 768, y0 + 512)
    im.save(path, quality=92, subsampling=0)
    return cells


R = {'S': (1, 0), 'N': (-1, 0), 'E': (0, -1), 'W': (0, 1)}       # the viewer's right, plan frame
NRM = {'S': (0, 1), 'N': (0, -1), 'E': (1, 0), 'W': (-1, 0)}

SIGNS = [   # room, cell, x, y, z, width, height, facing
    ('CIRC', 'balf', 30.315, 17.38, 1.60, 0.44, 0.11, 'W'), ('CIRC', 'woman', 30.315, 17.38, 1.86, 0.2, 0.2, 'W'),
    ('CIRC', 'balm', 30.315, 20.56, 1.60, 0.44, 0.11, 'W'), ('CIRC', 'man', 30.315, 20.56, 1.86, 0.2, 0.2, 'W'),
    ('CIRC', 'ismc', 28.5, 17.174, 1.60, 0.44, 0.11, 'S'), ('CIRC', 'access', 28.5, 17.174, 1.86, 0.2, 0.2, 'S'),
    ('CIRC', 'tec', 25.2, 18.553, 1.60, 0.44, 0.11, 'S'), ('CIRC', 'ref', 26.238, 21.67, 1.60, 0.44, 0.11, 'E'),
    ('CIRC', 'exit', 23.093, 19.9, 2.78, 0.48, 0.12, 'E'), ('CIRC', 'edp', 27.9, 29.991, 1.60, 0.44, 0.11, 'N'),
    ('REF', 'exit', 26.089, 22.81, 2.30, 0.48, 0.12, 'W'), ('REF', 'menu', 13.112, 24.5, 2.62, 1.05, 0.70, 'E'),
    ('REF', 'tray', 13.68, 30.55, 1.70, 0.56, 0.14, 'E'), ('REF', 'copa', 14.925, 22.74, 1.62, 0.26, 0.065, 'S'),
    ('CORR', 'vest', 7.5, 22.601, 1.60, 0.44, 0.11, 'N'), ('CORR', 'exit', 4.535, 21.98, 2.28, 0.44, 0.11, 'E'),
    ('LIMPOS', 'wash', 8.534, 25.15, 1.72, 0.36, 0.09, 'E'), ('SUJOS', 'wash', 10.225, 30.896, 1.72, 0.36, 0.09, 'S'),
    ('TRF', 'wash', 44.483, 16.86, 1.75, 0.36, 0.09, 'E'), ('TRM', 'wash', 44.483, 21.07, 1.75, 0.36, 0.09, 'E'),
    ('TRF', 'clean', 44.483, 14.66, 2.32, 0.6, 0.15, 'E'), ('TRM', 'clean', 44.483, 23.27, 2.32, 0.6, 0.15, 'E'),
    ('BALF', 'trans', 44.333, 14.66, 2.32, 0.6, 0.15, 'W'), ('BALM', 'trans', 44.333, 23.27, 2.32, 0.6, 0.15, 'W'),
    ('BALF', 'exit', 30.462, 18.215, 2.30, 0.44, 0.11, 'E'), ('BALM', 'exit', 30.462, 19.72, 2.30, 0.44, 0.11, 'E'),
    ('ANTE', 'prod', 48.055, 20.0, 1.60, 0.4, 0.1, 'W'), ('EXT', 'title', 22.841, 18.55, 1.65, 0.9, 0.225, 'W'),
    ('EXT', 'staff', 4.284, 22.75, 1.65, 0.44, 0.11, 'W'),
]


def build(info=None):
    path = os.path.join(bl.TEX_DIR, 'signs.jpg')
    cells = atlas(path)
    kits = {}
    for (room, cell, x, y, z, w, h, face) in SIGNS:
        k = kits.setdefault(room, Kit())
        r, n = R[face], NRM[face]
        px0, py0, px1, py1 = cells[cell]
        u0, u1, v1, v0 = px0 / AW, px1 / AW, 1 - py0 / AH, 1 - py1 / AH
        cx, cy = x + n[0] * 0.005, y + n[1] * 0.005
        def P(sr, sz): return plan.W(cx + r[0] * sr * w / 2, cy + r[1] * sr * w / 2, z + sz * h / 2)
        k.quad([P(-1, -1), P(1, -1), P(1, 1), P(-1, 1)], 'signs', uvs=[(u0, v0), (u1, v0), (u1, v1), (u0, v1)])
        # a thin backing plate so the sign reads as an object
        bx0, by0 = cx - r[0] * w / 2 - n[0] * 0.004, cy - r[1] * w / 2 - n[1] * 0.004
        bx1, by1 = cx + r[0] * w / 2 - n[0] * 0.001, cy + r[1] * w / 2 - n[1] * 0.001
        k.box(plan.W(bx0, by0, z - h / 2 - 0.004), plan.W(bx1, by1, z + h / 2 + 0.004), 'alu_dark', low=True)
    for room, k in kits.items():
        ob = bpy.data.objects.new('G_' + room, k.mesh('G_' + room))
        bl.collection('FURN').objects.link(ob); ob['room'] = room; ob['kind'] = 'fit'
