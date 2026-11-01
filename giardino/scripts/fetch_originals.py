# Downloads the originals listed in content/assets.json (plus logo, template olive, favicon and film) into
# media/originals. They are not kept in git (≈ 240 MB); `npm run images` and `npm run video` build the web copies.
import json, os, sys, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST = os.path.join(ROOT, "media/originals")
os.makedirs(DEST, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130 Safari/537.36"}
EXTRA = {
    "logo.png": "https://pizzeriagiardino.ch/templates/pizzeriagiardino/img/logo.png",
    "logo-myls-700.png": "https://a.mktgcdn.com/p/1iV83zQ3cwDM-lsvEQCh7nED2rFZqYUMznJAKEi3X2g/700x700.png",
    "template-olive.png": "https://pizzeriagiardino.ch/templates/pizzeriagiardino/img/olive.png",
    "site-favicon.ico": "https://pizzeriagiardino.ch/favicon.ico",
    "site-apple-touch-icon.png": "https://pizzeriagiardino.ch/apple-touch-icon.png",
    "1756717407-giardino_video_full_length.mp4": "https://pizzeriagiardino.ch/data/Ressources/1756717407-giardino_video_full_length.mp4",
}
assets = json.load(open(os.path.join(ROOT, "content/assets.json"), encoding="utf-8"))["assets"]
todo = [(a["file"], a["source"]) for a in assets] + list(EXTRA.items())
for name, url in todo:
    path = os.path.join(DEST, name)
    if os.path.exists(path):
        continue
    print("↓", name)
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=300) as r, open(path, "wb") as f:
        f.write(r.read())
print(len(todo), "files in media/originals")
