"""Background removal for the dish cut-outs (flyers), from the restaurant's own photos only."""
from pathlib import Path
from rembg import remove, new_session
from PIL import Image

root = Path(__file__).resolve().parent.parent / "media"
session = new_session("u2net")
for name in ["IMG-20230320-WA0013", "IMG-20230320-WA0009", "IMG-20230320-WA0012", "IMG-20230320-WA0008", "IMG-20230320-WA0007", "IMG-20230320-WA0014"]:
    out = root / "cutouts-src" / f"{name}.png"
    if out.exists():
        continue
    remove(Image.open(root / "originals" / f"{name}.jpg"), session=session).save(out)
    print("cut", name)
