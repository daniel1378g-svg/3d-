# Pixel diff between two capture sets: python3 tools/diff.py dir prefixA prefixB
import sys, glob, os
import numpy as np
from PIL import Image
d, a, b = sys.argv[1:4]
for fa in sorted(glob.glob(f'{d}/{a}t*.png')):
    fb = fa.replace('/' + a, '/' + b)
    if not os.path.exists(fb): continue
    x = np.asarray(Image.open(fa).convert('RGB')).astype(int); y = np.asarray(Image.open(fb).convert('RGB')).astype(int)
    df = np.abs(x - y).max(axis=2)
    print(os.path.basename(fa)[len(a):], 'max', df.max(), 'mean %.4f' % df.mean(), 'px>8', int((df > 8).sum()))
