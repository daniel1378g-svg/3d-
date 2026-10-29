"""Reads the saved copies of the live WordPress pages (content/raw) and writes the carte and the wine
list as JSON, verbatim: names, prices, descriptions and wine details exactly as the live site has them.

Usage: python3 -I scripts/extract_content.py
"""
import html
import json
import re
import unicodedata
from pathlib import Path

root = Path(__file__).resolve().parent.parent
raw = root / "content" / "raw"


def clean(s):
    s = html.unescape(re.sub(r"<[^>]+>", " ", s))
    return re.sub(r"[ \t\r\n\xa0]+", " ", s).strip()


def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


# ---------------------------------------------------------------- la carte
page = (raw / "cusine-gastronomique-portugaise-geneve.html").read_text(encoding="utf-8")
block = page[page.index('<div class="menu-section">'):]
block = block[: block.index("</div>\n\t\t</div>\n\t</div>")]
parts = re.split(r"<h[34]>", block)[1:]
SECTION_IDS = ["entradas", "pratos", "sur-commande", "sobremesas"]
sections = []
for n, part in enumerate(parts):
    heading_html, body = part.split("</h", 1)
    heading = clean(re.sub(r"<br\s*/?>", " ", heading_html))
    sub = re.search(r"<h5>(.*?)</h5>", body, re.S)
    items = []
    for m in re.finditer(r'<div class="menu-description">\s*<div class="menu-item"><span>(.*?)</span>(?:<span class="menu-price">(.*?)</span>)?</div>(.*?)</div>', body, re.S):
        live_name, price, desc = clean(m.group(1)), m.group(2), clean(m.group(3))
        item = {"id": slug(live_name), "name": live_name, "live": live_name, "price": clean(price) if price else None, "desc": {"fr": desc}}
        # The live carte puts two French words inside the name: they become a translatable unit / prefix.
        if live_name.endswith(" la boule"):
            item["name"] = live_name[: -len(" la boule")]
            item["priceUnit"] = "scoop"
        if live_name.endswith(" dès"):
            item["name"] = live_name[: -len(" dès")]
            item["pricePrefix"] = "from"
        item["id"] = slug(item["name"])
        items.append(item)
    sec = {"id": SECTION_IDS[n], "live": heading, "items": items}
    if "/" in heading and n != 2:
        pt, fr = [x.strip() for x in heading.split("/", 1)]
        sec["pt"], sec["fr"] = pt, fr
    if sub:
        sec["sub"] = clean(sub.group(1))
    if n == 2:
        sec["onOrder"] = True
        for it in items:
            it["onOrder"] = True
    sections.append(sec)
# reading order on the live page: Entradas, Pratos, Sur commande, Sobremesas
carte = {"source": "https://www.leportugais.ch/cusine-gastronomique-portugaise-geneve/", "sections": sections}

# ---------------------------------------------------------------- les vins
page = (raw / "restaurant-de-poisson-geneve.html").read_text(encoding="utf-8")
start = page.index("Région Douro")
end = page.index("milesime")
seg = page[page.rfind("<h2", 0, start): page.index("</p>", end) + 4]
paras = [clean(p.replace("<br />", "\n").replace("<br/>", "\n")) if False else p for p in re.findall(r"<p>(.*?)</p>", seg, re.S)]
lines = []
for p in paras:
    txt = html.unescape(re.sub(r"<(?!br)[^>]+>", "", p))
    txt = txt.replace("\xa0", " ")
    chunks = [re.sub(r"\s+", " ", c).strip() for c in re.split(r"<br\s*/?>", txt)]
    chunks = [c for c in chunks if c]
    if chunks:
        lines.append(chunks)

COLOURS = {"Vinhos Tintos": "tinto", "Vinhos Rosados": "rosado", "Vinhos Brancos": "branco"}
colours = [{"id": "tinto", "live": None, "regions": []}]
footnote = None
pending_name = None
abv_re = re.compile(r"\s*[–\-—]?\s*(\d+(?:[.,]\d+)?\s*%)\s*$")
for chunks in lines:
    first = chunks[0]
    if first.startswith("Région "):
        region_live = first
        colours[-1]["regions"].append({"id": slug(first[7:]), "live": first, "name": first[7:], "wines": []})
        continue
    if any(first.startswith(k) for k in COLOURS):
        cid = COLOURS[next(k for k in COLOURS if first.startswith(k))]
        if cid == "tinto":
            colours[0]["live"] = first
        else:
            colours.append({"id": cid, "live": first, "regions": []})
        continue
    if "milesime" in first:
        footnote = first
        continue
    # a wine: "Name Year /Producer/ [extra]" then "details – 14%" (sometimes on one line or split in two paragraphs)
    text = " ¶ ".join(chunks)
    if pending_name:
        text = pending_name + " ¶ " + text
        pending_name = None
    if not abv_re.search(text):
        pending_name = text
        continue
    live = text.replace(" ¶ ", "\n")
    m = re.match(r"^(.*?)\s*/\s*(.*?)\s*/\s*(.*)$", text, re.S)
    name, producer, rest = m.group(1).strip(), m.group(2).strip(), m.group(3)
    # text after the producer on the name line is a short note (INOX, La coupe, …); the next line holds the details
    extra = ""
    if "¶" in rest:
        extra, rest = [x.strip() for x in rest.split("¶", 1)]
        rest = rest.replace("¶", " ")
    abv = abv_re.search(rest).group(1)
    details = abv_re.sub("", rest).strip(" –-—")
    details = re.sub(r"\s+", " ", details)
    wine = {"id": "", "name": name, "producer": producer, "details": details, "abv": abv, "live": live}
    if extra:
        wine["extra"] = extra
    # French notes inside the name become translatable notes; the name itself stays as written
    for fr_note, key in (("(culture biodynamique)", "biodynamic"), ("(mousseux)", "sparkling")):
        if fr_note in name:
            wine["name"] = re.sub(r"\s+", " ", name.replace(fr_note, " ")).strip()
            wine.setdefault("notes", []).append(key)
    colours[-1]["regions"][-1]["wines"].append(wine)

for c in colours:
    for r in c["regions"]:
        r["id"] = f'{c["id"]}-{r["id"]}'
        for w in r["wines"]:
            w["id"] = f'{r["id"]}-{slug(w["name"])}'
vins = {"source": "https://www.leportugais.ch/restaurant-de-poisson-geneve/", "colours": colours, "footnote": footnote}

(root / "content" / "carte.live.json").write_text(json.dumps(carte, ensure_ascii=False, indent=1))
(root / "content" / "vins.live.json").write_text(json.dumps(vins, ensure_ascii=False, indent=1))
print("carte:", [(s["id"], len(s["items"])) for s in sections], sum(len(s["items"]) for s in sections))
print("vins:", [(c["id"], [(r["name"], len(r["wines"])) for r in c["regions"]]) for c in colours])
print("vins total:", sum(len(r["wines"]) for c in colours for r in c["regions"]), "regional groups:", sum(len(c["regions"]) for c in colours))
