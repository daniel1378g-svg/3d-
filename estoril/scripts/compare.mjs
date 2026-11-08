// Before/after comparison sheets: the same journey positions rendered by the reference build
// (published 23 Oct 2026, served with `serve.mjs --reference`) and by the current build.
// node scripts/compare.mjs --before http://127.0.0.1:8090/ --after http://127.0.0.1:8080/ \
//   --views "close:0.05,aerial-rise:0.345,aerial:0.37,aerial-return:0.40" --size 1440x900 --out docs/comparisons
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const before = arg('before', 'http://127.0.0.1:8090/');
const after = arg('after', 'http://127.0.0.1:8080/');
const size = arg('size', '1440x900');
const out = arg('out', 'docs/comparisons');
const ui = arg('ui', '0');
const views = arg('views', 'close:0.05,aerial:0.37').split(',').map((v) => v.split(':'));
const tmp = `${out}/.raw`;
mkdirSync(tmp, { recursive: true });
const here = new URL('.', import.meta.url).pathname;
const ts = views.map((v) => v[1]).join(',');
for (const [tag, base] of [['before', before], ['after', after]]) {
  execFileSync('node', [here + 'capture.mjs', '--base', base, '--t', ts, '--size', size, '--out', tmp, '--prefix', tag + '-', '--hideui', ui === '1' ? '0' : '1'], { stdio: 'inherit' });
}
execFileSync('python3', ['-c', `
import sys, json
from PIL import Image, ImageDraw, ImageFont
tmp, out, size, views = sys.argv[1], sys.argv[2], sys.argv[3], json.loads(sys.argv[4])
try: font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 26)
except Exception: font = ImageFont.load_default()
for name, t in views:
    t = '%.3f' % float(t)
    a = Image.open(f'{tmp}/before-t{t}-{size}.png').convert('RGB'); b = Image.open(f'{tmp}/after-t{t}-{size}.png').convert('RGB')
    w, h = a.size; s = 0.5 if w > 1000 else 1
    a = a.resize((int(w*s), int(h*s)), Image.LANCZOS); b = b.resize((int(w*s), int(h*s)), Image.LANCZOS)
    W, H = a.size; sheet = Image.new('RGB', (W*2 + 12, H + 44), (20, 22, 25)); d = ImageDraw.Draw(sheet)
    sheet.paste(a, (0, 44)); sheet.paste(b, (W + 12, 44))
    d.text((10, 8), f'BEFORE (published 23 Oct) · {name} · progress {t}', fill=(235, 235, 230), font=font)
    d.text((W + 22, 8), f'AFTER · {name} · progress {t}', fill=(235, 235, 230), font=font)
    sheet.save(f'{out}/{name}-{size}.jpg', quality=88)
    print(f'{out}/{name}-{size}.jpg')
`, tmp, out, size, JSON.stringify(views)], { stdio: 'inherit' });
