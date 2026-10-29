"""La carte and les vins from the saved live pages (content/raw/*.txt) into content/menu.json and content/wines.json.
Names, descriptions, prices and notes are kept exactly as the live site writes them."""
import json, re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
PRICE = re.compile(r"^(\d+\.\d{2})(?: / (.+))?$")
SECTIONS = [
    ("entrees", "Entrées :", "Entrées"),
    ("specialites", "Spécialités de la maison :", "Spécialités de la maison"),
    ("viandes", "Viandes :", "Viandes"),
    ("poissons", "Poissons -Fruits de mer - Crustacés", "Poissons - Fruits de mer - Crustacés"),
    ("pates", "Pâtes", "Pâtes"),
    ("fondues", "Fondues", "Fondues"),
    ("enfants", "Menus enfants", "Menus enfants"),
    ("commande", "Sur commande pour minimum 10 personnes", "Sur commande pour minimum 10 personnes"),
    ("desserts", "Desserts", "Desserts"),
    ("coupes", "Coupes de glaces", "Coupes de glaces"),
    ("boules", "Boules de glaces", "Boules de glaces"),
]
lines = (root / "content/raw/la-carte.txt").read_text().splitlines()
start = lines.index("Entrées :")
end = next(i for i, x in enumerate(lines) if x.startswith("Notre adresse"))
body = lines[start:end]

sections, cur, i = [], None, 0
heads = {h: (k, t) for k, h, t in SECTIONS}
while i < len(body):
    x = body[i]
    if x in heads and not (i + 1 < len(body) and PRICE.match(body[i + 1])):
        k, t = heads[x]
        cur = {"id": k, "title": t, "notes": [], "items": []}
        sections.append(cur)
        i += 1
        continue
    if x.startswith("[img"):
        # a picture is followed by its caption, unless the next line is already a heading or a dish
        nxt = body[i + 1] if i + 1 < len(body) else ""
        i += 2 if nxt and not nxt.startswith("[") and nxt not in heads and not (i + 2 < len(body) and PRICE.match(body[i + 2])) else 1
        continue
    if x.startswith("["):
        i += 1
        continue
    if i + 1 < len(body) and PRICE.match(body[i + 1]):
        m = PRICE.match(body[i + 1])
        item = {"name": x, "price": m.group(1), "unit": m.group(2) or "", "desc": ""}
        if cur["id"] == "fondues":
            item["group"] = "Fondue au fromage"
        cur["items"].append(item)
        i += 2
        # a description follows unless the next line is another dish, a heading or a picture
        if i < len(body) and not body[i].startswith("[") and body[i] not in heads and not (i + 1 < len(body) and PRICE.match(body[i + 1])) and not body[i].startswith("*Tous"):
            item["desc"] = body[i]
            i += 1
        continue
    if x.startswith("*Tous") or x in ("Fondue au fromage", "Grand choix de plats portugais de l’entrée au dessert"):
        i += 1
        continue
    if cur is not None and (x.startswith("Accompagnements") or x.startswith("Origine")):
        note = x
        if x.endswith(":") and i + 1 < len(body):
            note = f"{x} {body[i + 1]}"
            i += 1
        cur["notes"].append(note)
    i += 1

# "Délai d'attente : 30 min." sits at the end of three descriptions on the live page
for s in sections:
    for it in s["items"]:
        if "Délai d'attente : 30 min." in it["desc"]:
            it["desc"] = it["desc"].replace(" Délai d'attente : 30 min.", "").strip()
            it["wait"] = "Délai d'attente : 30 min."

sections = [s for s in sections if s["items"]]  # "Boules de glaces" also captions the last picture
total = sum(len(s["items"]) for s in sections)
(root / "content/menu.json").write_text(json.dumps({"source": "https://entreamigos.ch/la-carte/", "pricesNote": "*Tous nos prix sont en CHF et incluent la TVA", "sections": sections}, ensure_ascii=False, indent=1))
print(len(sections), "sections,", total, "lines:", [(s["id"], len(s["items"])) for s in sections])

# les vins
w = (root / "content/raw/nos-vins.txt").read_text().splitlines()
ws = w.index("Rosés Pétillants", w.index("Blancs Portugais"))
we = w.index("Les vins portugais")
wine_sections, cur, region = [], None, None
names = {"Rosés Pétillants": ("rose", "Rosés Pétillants"), "Vinho Verde": ("verde", "Vinho Verde"), "Rouges Portugais": ("rouge", "Rouges Portugais"), "Blancs Portugais": ("blanc", "Blancs Portugais")}
i = ws
while i < we:
    x = w[i]
    if x in names and not (i + 1 < we and PRICE.match(w[i + 1])):
        cur = {"id": names[x][0], "title": names[x][1], "wines": []}
        wine_sections.append(cur); region = None
    elif x.endswith(" 75cl"):
        region = x.replace(" 75cl", "")
    elif i + 1 < we and PRICE.match(w[i + 1]):
        cur["wines"].append({"name": x, "price": w[i + 1], **({"region": region, "size": "75cl"} if region else {})})
        i += 1
    i += 1
(root / "content/wines.json").write_text(json.dumps({"source": "https://entreamigos.ch/nos-vins/", "sections": wine_sections}, ensure_ascii=False, indent=1))
print(len(wine_sections), "wine sections,", sum(len(s["wines"]) for s in wine_sections), "wines")
