"""Cut dishes out of the restaurant's own photos (rembg, isnet-general-use). Args: src_dir out_dir id..."""
import sys
from pathlib import Path
from rembg import remove, new_session
from PIL import Image
src, out, ids = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3:]
session = new_session("isnet-general-use")
for pid in ids:
    im = Image.open(src / f"{pid}-1440.webp").convert("RGB")
    cut = remove(im, session=session, alpha_matting=False)
    cut = cut.crop(cut.getbbox())
    cut.save(out / f"{pid}.png")
    print(pid, cut.size)
