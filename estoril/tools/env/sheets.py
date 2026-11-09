# Before/after comparison sheets for the environment work: the base build (left) and the new
# build (right) side by side, scaled, optionally with a 1:1 detail crop of both underneath,
# saved as JPEG (quality 82, shrunk until under 450 KB).
#
# python3 tools/env/sheets.py <capture dir> <out dir> name[:x0,y0,w,h] ...
#   <capture dir> holds b-<name>.png (before) and a-<name>.png (after); ':x0,y0,w,h' adds the crop.
import io
import os
import sys
from PIL import Image, ImageDraw, ImageFont

LIMIT = 450 * 1024
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 18)
except Exception:
    font = ImageFont.load_default()


def sheet(name, crop, scale):
    a = Image.open(f'{src}/b-{name}.png').convert('RGB')
    b = Image.open(f'{src}/a-{name}.png').convert('RGB')
    w, h = int(a.width * scale), int(a.height * scale)
    rows = [(a.resize((w, h), Image.LANCZOS), b.resize((w, h), Image.LANCZOS))]
    if crop:
        x0, y0, cw, ch = crop
        rows.append((a.crop((x0, y0, x0 + cw, y0 + ch)), b.crop((x0, y0, x0 + cw, y0 + ch))))
    label = 28
    width = max(2 * r[0].width + 8 for r in rows)
    height = sum(r[0].height + label for r in rows)
    img = Image.new('RGB', (width, height), (18, 18, 18))
    d = ImageDraw.Draw(img)
    y = 0
    for k, (left, right) in enumerate(rows):
        tag = '' if k == 0 else ' (1:1 detail)'
        d.text((8, y + 4), 'before: base build' + tag, fill=(235, 235, 235), font=font)
        d.text((left.width + 16, y + 4), 'after: environment rework' + tag, fill=(235, 235, 235), font=font)
        img.paste(left, (0, y + label))
        img.paste(right, (left.width + 8, y + label))
        y += left.height + label
    return img


for spec in sys.argv[3:]:
    name, _, c = spec.partition(':')
    crop = tuple(int(v) for v in c.split(',')) if c else None
    scale = 0.6667 if Image.open(f'{src}/b-{name}.png').width > 1000 else 1.0
    while True:
        data = io.BytesIO()
        sheet(name, crop, scale).save(data, 'JPEG', quality=82, optimize=True)
        if data.tell() < LIMIT or scale < 0.3:
            break
        scale *= 0.9
    path = f'{out}/{name}.jpg'
    with open(path, 'wb') as f:
        f.write(data.getvalue())
    print(path, f'{data.tell() // 1024} KB', f'scale {scale:.2f}')
