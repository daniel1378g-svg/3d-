# Prepares the generated stills for the site.
#
#   assets/src/<name>.webp ->  public/img/<name>.webp      2048 px wide, desktop
#                              public/img/<name>_m.webp    1152 px wide, phones
#                              public/img/<name>_d.webp    512 px wide depth map (white = near)
#
# The depth maps drive the camera parallax in the WebGL stage. They come from Depth Anything V2
# (small), run with onnxruntime:
#   pip install onnxruntime pillow numpy
#   curl -L -o .cache/depth.onnx \
#     https://huggingface.co/onnx-community/depth-anything-v2-small/resolve/main/onnx/model.onnx
import os
import sys

import numpy as np
import onnxruntime as ort
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "assets", "src")
OUT = os.path.join(HERE, "..", "public", "img")
ARGS = [a for a in sys.argv[1:] if not a.startswith("--")]             # optional: path to the depth model
MODEL = ARGS[0] if ARGS else os.path.join(HERE, "..", ".cache", "depth.onnx")
os.makedirs(OUT, exist_ok=True)

session = ort.InferenceSession(MODEL)
MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32)
STD = np.array([0.229, 0.224, 0.225], dtype=np.float32)


def depth_of(im):
    w, h = 924, 518                                   # multiples of 14, close to 16:9
    x = np.asarray(im.resize((w, h), Image.BICUBIC), dtype=np.float32) / 255.0
    x = ((x - MEAN) / STD).transpose(2, 0, 1)[None]
    d = session.run(None, {"pixel_values": x})[0][0]
    d = (d - d.min()) / max(1e-6, d.max() - d.min())  # 1 = near
    out = Image.fromarray((d * 255).astype(np.uint8)).resize((512, 288), Image.BICUBIC)
    return out.filter(ImageFilter.GaussianBlur(1.2))  # soft edges tear less when displaced


for f in sorted(os.listdir(SRC)):
    if not f.endswith(".webp"):
        continue
    name = f[:-5]
    if os.path.exists(os.path.join(OUT, name + "_d.webp")) and "--force" not in sys.argv:
        continue
    im = Image.open(os.path.join(SRC, f)).convert("RGB")
    ratio = im.size[1] / im.size[0]
    im.resize((2048, round(2048 * ratio)), Image.LANCZOS).save(os.path.join(OUT, name + ".webp"), quality=84, method=6)
    im.resize((1152, round(1152 * ratio)), Image.LANCZOS).save(os.path.join(OUT, name + "_m.webp"), quality=80, method=6)
    depth_of(im).save(os.path.join(OUT, name + "_d.webp"), quality=85, method=6)
    print("prepared", name)
