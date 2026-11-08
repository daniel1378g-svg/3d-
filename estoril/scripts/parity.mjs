// Render-parity check: captures the journey at fixed positions and compares with reference PNGs.
// node scripts/parity.mjs --base http://127.0.0.1:PORT/ --ref DIR [--out DIR] [--tol 2]
// Reference PNGs are named t<pos>-<w>x<h>.png (as written by scripts/capture.mjs with an empty prefix).
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync } from 'node:fs';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://127.0.0.1:8080/');
const ref = arg('ref');
const out = arg('out', '/tmp/parity-' + process.pid);
const tol = +arg('tol', '2');
mkdirSync(out, { recursive: true });
const sets = new Map();
for (const f of readdirSync(ref)) {
  const m = f.match(/^t([\d.]+)-(\d+x\d+)\.png$/);
  if (m) (sets.get(m[2]) || sets.set(m[2], []).get(m[2])).push(m[1]);
}
const here = new URL('.', import.meta.url).pathname;
for (const [size, ts] of sets) {
  execFileSync('node', [here + 'capture.mjs', '--base', base, '--t', ts.join(','), '--size', size, '--out', out, '--hideui', '1'], { stdio: 'inherit' });
}
const res = execFileSync('python3', ['-c', `
import sys, glob, os
import numpy as np
from PIL import Image
ref, out, tol = sys.argv[1], sys.argv[2], int(sys.argv[3])
worst = 0
for fr in sorted(glob.glob(ref + '/t*.png')):
    fo = os.path.join(out, os.path.basename(fr))
    a = np.asarray(Image.open(fr).convert('RGB')).astype(int); b = np.asarray(Image.open(fo).convert('RGB')).astype(int)
    d = np.abs(a - b).max(axis=2); worst = max(worst, int(d.max()))
    print('%-28s max %3d  mean %.4f  px>8 %d' % (os.path.basename(fr), d.max(), d.mean(), (d > 8).sum()))
print('PARITY', 'OK' if worst <= tol else 'FAIL', 'worst', worst)
`, ref, out, String(tol)]).toString();
console.log(res);
