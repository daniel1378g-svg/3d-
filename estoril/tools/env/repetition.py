# Texture repetition in a top-down capture: the normalised autocorrelation of the image luminance
# (high-passed with a 31 px box blur, so lighting and broad patches do not count) at the lags of a
# world period, along screen x and y, against the mean over all lags from 20 px to half the image.
#
# python3 tools/env/repetition.py image.png --period-px 122 [--box x0,y0,x1,y1]
# A periodic texture of that period gives a clear peak (ratio well above 1); no repetition gives ~1.
import sys
import numpy as np
from PIL import Image


def arg(name, default=None):
    return sys.argv[sys.argv.index('--' + name) + 1] if '--' + name in sys.argv else default


img = Image.open(sys.argv[1]).convert('L')
box = arg('box')
if box:
    img = img.crop(tuple(int(v) for v in box.split(',')))
a = np.asarray(img, dtype=np.float64)
k = 31
pad = np.pad(a, k // 2, mode='reflect')
c = np.cumsum(np.cumsum(pad, 0), 1)
c = np.pad(c, ((1, 0), (1, 0)))
blur = (c[k:, k:] - c[:-k, k:] - c[k:, :-k] + c[:-k, :-k]) / (k * k)
h = a - blur[: a.shape[0], : a.shape[1]]
h -= h.mean()
f = np.fft.rfft2(h)
ac = np.fft.irfft2(f * np.conj(f), s=h.shape)
ac /= ac[0, 0]
period = float(arg('period-px'))
lag = int(round(period))
peak = max(ac[0, lag], ac[lag, 0], ac[0, -lag], ac[-lag, 0])
ref = np.mean(np.abs(np.concatenate([ac[0, 20 : h.shape[1] // 2], ac[20 : h.shape[0] // 2, 0]])))
print(f'{sys.argv[1]}: autocorrelation at {lag} px = {peak:.4f}, mean |ac| over other lags = {ref:.4f}, ratio = {peak / ref:.1f}')
