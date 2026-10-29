"""Background removal for the flyers, from the restaurant's own photos only."""
from pathlib import Path
from rembg import remove, new_session
from PIL import Image
root = Path(__file__).resolve().parent.parent / "media"
session = new_session("u2net")
for name in ["PHOTO-2022-11-07-11-42-322-1-1920w", "image00004-2304w", "image00005-2304w", "image00001-1920w", "image00008-1920w", "image00003-1920w"]:
    out = root / "cutouts-src" / f"{name}.png"
    if out.exists(): continue
    src = next(root.glob(f"originals/{name}.*"))
    remove(Image.open(src), session=session).save(out); print("cut", name)
