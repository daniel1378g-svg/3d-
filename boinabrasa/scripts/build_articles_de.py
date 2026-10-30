"""content/raw/articles.extracted.json → content/articles.de.json: the German long texts with title, date, cover image
and blocks (h2/h3/p/ul/img/quote). Bold markers are tidied, images point at public/images ids.
Run after scripts/extract_articles.py: python3 -I scripts/build_articles_de.py
"""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
raw = json.loads((ROOT / "content/raw/articles.extracted.json").read_text(encoding="utf-8"))
images = json.loads((ROOT / "src/data/images.json").read_text(encoding="utf-8"))

DATES = {"picanha": "2021-10-08", "maminha": "2021-11-08", "linguica": "2022-03-21", "caipirinha": "2022-02-16", "gerichte": "2022-02-11", "gaucho": "2021-09-20"}
COVER = {"picanha": "picanha_wissen", "maminha": "maminha_wissen", "linguica": "brasiliansiche_wurst_wissen", "caipirinha": "caipirinha_wissen", "gerichte": "brasiliansiche_gerichte_tisch", "gaucho": "gaucho_grill_wissen", "churrasco": "churrasco_grill", "about": "restaurant", "dolcebrigadeiro": "header-dolcebrigadeiro"}

def img_id(src):
    name = src.split("/")[-1].rsplit(".", 1)[0]
    for cand in (name, name.lower(), "header-" + name.replace("boinabrasa_", "")):
        if cand in images: return cand
    return None

def tidy(t):
    t = re.sub(r"\*\*(\s+)", r"\1**", t)            # "** Picanha" → " **Picanha"
    t = re.sub(r"(\S)(\s+)\*\*(?=\s|$|[.,;:!?)])", r"\1**\2", t)  # "Picanha **" → "Picanha** "
    t = re.sub(r"\*\*\*\*", "", t)
    t = re.sub(r"\*\*(\s*)\*\*", r"\1", t)
    t = re.sub(r"\s+([.,;:!?])", r"\1", t) if False else t
    return re.sub(r"[ \t]{2,}", " ", t).strip()

out = {}
for key in ["churrasco", "about", "picanha", "maminha", "linguica", "caipirinha", "gerichte", "gaucho", "dolcebrigadeiro"]:
    blocks = raw[key]
    title = tidy(blocks[0]["text"]) if blocks and blocks[0]["t"] == "h1" else ""
    body = []
    for b in blocks[1:]:
        if b["t"] == "img":
            i = img_id(b["src"])
            if i: body.append({"t": "img", "id": i})
            continue
        if b["t"] == "ul":
            body.append({"t": "ul", "items": [tidy(x) for x in b["items"]]})
            continue
        txt = tidy(b["text"])
        if not txt or txt.lower() in ("mehr erfahren auf dolcebrigadeiro.ch",): continue
        body.append({"t": b["t"], "text": txt})
    entry = {"title": title, "cover": COVER.get(key), "blocks": body}
    if key in DATES: entry["date"] = DATES[key]
    out[key] = entry
    print(key, len(body), "blocks", title[:60])

(ROOT / "content/articles.de.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
