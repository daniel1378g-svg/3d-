"""Download, verify and optimise the photographs and brand files of amerendeira.pt.

Originals are kept byte-for-byte in public/images/originals and public/brand.
Optimised copies (AVIF + WebP, several widths) go to public/images/optimized.
The semi-transparent 1-8 px border that Webflow left on some PNG exports is
cropped from the optimised copies only.

Outputs:
  src/data/images.generated.json   data used by the <Photo> component
  docs/asset-manifest.json / .md   the asset manifest
"""
import base64
import io
import json
import shutil
import subprocess
import sys
import urllib.parse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = json.loads((ROOT / "scripts/assets.source.json").read_text())
CACHE = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / ".cache/downloads"
ORIG = ROOT / "public/images/originals"
OPT = ROOT / "public/images/optimized"
BRAND = ROOT / "public/brand"
WIDTHS = [480, 800, 1200, 1600, 1920]

for d in (CACHE, ORIG, OPT, BRAND, ROOT / "docs", ROOT / "src/data"):
    d.mkdir(parents=True, exist_ok=True)


def fetch(file_name: str) -> tuple[Path, str]:
    """Return the cached download of a CDN file, downloading it if needed."""
    url = SRC["cdn"] + file_name
    local = CACHE / urllib.parse.unquote(file_name)
    if not local.exists() or local.stat().st_size == 0:
        subprocess.run(["curl", "-sSfL", "-o", str(local), url], check=True)
    return local, url


def opaque_box(im: Image.Image) -> tuple[int, int, int, int]:
    """Largest inset box whose border rows/columns are fully opaque."""
    if im.mode != "RGBA":
        return (0, 0, im.width, im.height)
    a = im.getchannel("A")
    l, t, r, b = 0, 0, im.width, im.height

    def opaque(box):
        return a.crop(box).getextrema()[0] >= 250

    # Peel one edge at a time, only looking inside the current box, so a
    # transparent column does not make every row look transparent.
    changed = True
    while changed and (r - l) > 32 and (b - t) > 32:
        changed = False
        if not opaque((l, t, r, t + 1)):
            t += 1; changed = True
        if not opaque((l, b - 1, r, b)):
            b -= 1; changed = True
        if not opaque((l, t, l + 1, b)):
            l += 1; changed = True
        if not opaque((r - 1, t, r, b)):
            r -= 1; changed = True
    if l > 16 or t > 16 or im.width - r > 16 or im.height - b > 16:
        raise SystemExit(f"transparency is not just a border: {(l, t, r, b)}")
    return (l, t, r, b)


manifest = {"surveyed": SRC["surveyed"], "brand": [], "photos": [], "duplicates": SRC["duplicates"], "excluded": []}
generated = {}

for b in SRC["brand"]:
    path, url = fetch(b["file"])
    dest = ROOT / "public" / b["local"]
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(path, dest)
    raw = dest.read_bytes()
    if dest.suffix == ".svg":
        ok = raw.lstrip().startswith(b"<?xml") or raw.lstrip().startswith(b"<svg")
        dims = "vetorial"
    else:
        with Image.open(dest) as im:
            im.verify()
        with Image.open(dest) as im:
            dims = f"{im.width}×{im.height}"
        ok = True
    manifest["brand"].append({**b, "source": url, "dims": dims, "bytes": len(raw),
                              "status": "descarregado e verificado" if ok else "FALHOU"})

for p in SRC["photos"]:
    path, url = fetch(p["file"])
    ext = Path(urllib.parse.unquote(p["file"])).suffix.lower().replace(".jpeg", ".jpg")
    orig_dest = ORIG / f"{p['local']}{ext}"
    shutil.copyfile(path, orig_dest)
    with Image.open(orig_dest) as im:
        im.verify()
    im = Image.open(orig_dest)
    im.load()
    ow, oh = im.size
    box = opaque_box(im)
    cropped = im.crop(box).convert("RGB")
    cw, ch = cropped.size
    widths = sorted({w for w in WIDTHS if w < cw} | {cw})
    for w in widths:
        h = round(ch * w / cw)
        r = cropped if w == cw else cropped.resize((w, h), Image.LANCZOS)
        r.save(OPT / f"{p['local']}-{w}.avif", quality=58, speed=4)
        r.save(OPT / f"{p['local']}-{w}.webp", quality=80, method=6)
    tiny = cropped.resize((24, max(1, round(24 * ch / cw))), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, "WEBP", quality=40)
    lqip = "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()
    generated[p["id"]] = {"base": f"/images/optimized/{p['local']}", "width": cw, "height": ch,
                          "widths": widths, "alt": p["alt"], "lqip": lqip}
    note = "" if box == (0, 0, ow, oh) else f"versões otimizadas recortadas {box} para remover a borda semitransparente"
    manifest["photos"].append({**p, "source": url, "original": f"public/images/originals/{orig_dest.name}",
                               "dims": f"{ow}×{oh}", "bytes": orig_dest.stat().st_size,
                               "optimized": f"public/images/optimized/{p['local']}-{{{','.join(map(str, widths))}}}.{{avif,webp}}",
                               "status": "descarregado e verificado (abre como imagem válida)", "note": note})

for e in SRC["excluded"]:
    path, url = fetch(e["file"])
    with Image.open(path) as im:
        im.verify()
    manifest["excluded"].append({**e, "source": url, "status": "descarregado, verificado e excluído"})

(ROOT / "src/data/images.generated.json").write_text(json.dumps(generated, ensure_ascii=False, indent=1))
(ROOT / "docs/asset-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2))

md = ["# Manifesto de assets — A Merendeira", "",
      f"Levantamento: {SRC['surveyed']}.", "",
      "Os originais são guardados sem alterações. As versões otimizadas (AVIF e WebP) são geradas por "
      "`npm run assets` a partir deles.", "",
      "## Marca", "", "| Origem | Ficheiro local | Dimensões | Conteúdo | Secção original | Uso no novo site | Estado |",
      "| --- | --- | --- | --- | --- | --- | --- |"]
for b in manifest["brand"]:
    md.append(f"| [{b['file']}]({b['source']}) | `public/{b['local']}` | {b['dims']} | {b['description']} | {b['section']} | {b['use']} | {b['status']} |")
md += ["", "## Fotografias", "", "| Origem | Ficheiro local (original) | Dimensões | Conteúdo | Secção original | Uso no novo site | Estado / notas |",
       "| --- | --- | --- | --- | --- | --- | --- |"]
for p in manifest["photos"]:
    md.append(f"| [{urllib.parse.unquote(p['file'])}]({p['source']}) | `{p['original']}` | {p['dims']} | {p['description']} | {p['section']} | {p['use']} | {p['status']}{'; ' + p['note'] if p['note'] else ''} |")
md += ["", "Versões otimizadas: `public/images/optimized/<nome>-<largura>.{avif,webp}`.", "",
       "## Duplicados", ""]
for d in manifest["duplicates"]:
    md.append(f"- `{d['file']}` = `{d['sameAs']}`. {d['note']}")
md += ["", "## Ficheiros encontrados e excluídos", ""]
for e in manifest["excluded"]:
    md.append(f"- [{urllib.parse.unquote(e['file'])}]({e['source']}) ({e['dims']}): {e['reason']} — {e['status']}.")
(ROOT / "docs/asset-manifest.md").write_text("\n".join(md) + "\n")
print(f"brand {len(manifest['brand'])}, photos {len(manifest['photos'])}, excluded {len(manifest['excluded'])}")
