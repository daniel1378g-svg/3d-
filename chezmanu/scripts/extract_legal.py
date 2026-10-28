"""Writes content/legal.json from the saved text of the live legal pages (content/raw/privacy.txt and
mentions-legales.txt): the French text verbatim, as a list of blocks with their kind. The translations in
src/legal.ts follow the same order. Left out, and listed in the README: the lone «/» line in section 9 of the
privacy policy and the «© 2024 Réalisé par localsearch.ch» credit of the old site.

Usage: python3 -I scripts/extract_legal.py
"""
import json, re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
raw = root / "content" / "raw"

lines = (raw / "privacy.txt").read_text(encoding="utf8").splitlines()
start = lines.index("1. Introduction")
end = lines.index("Version 1.0.0")
body = lines[start : end + 1]

H3 = {"Sous-traitants des données", "Partenaires contractuels", "Transmission aux autorités"}

blocks = []
i = 0
while i < len(body):
    t = body[i].strip()
    if t == "/":
        i += 1
        continue
    if re.match(r"^\d+\. ", t):
        blocks.append({"k": "h2", "t": t})
    elif t in H3:
        blocks.append({"k": "h3", "t": t})
    elif t == "Chez Manu":
        blocks.append({"k": "addr", "t": "\n".join(body[i : i + 4])})
        i += 4
        continue
    elif t.startswith("les Données") or t.endswith(";") or t.endswith("en particulier") or (t.endswith(".") and blocks and blocks[-1]["k"] in ("li", "li2") and len(t) < 260 and not t.startswith(("Les ", "Nous ", "Dans "))):
        kind = "li"
        if blocks and blocks[-1]["t"].endswith("en particulier") or (blocks and blocks[-1]["k"] == "li2"):
            kind = "li2"
        blocks.append({"k": kind, "t": t})
    else:
        blocks.append({"k": "p", "t": t})
    i += 1

notice = [
    {"k": "h2", "t": "Contact"},
    {"k": "dt", "t": "Nom d’entreprise :"}, {"k": "dd", "t": "Chez Manu"},
    {"k": "dt", "t": "Adresse :"}, {"k": "dd", "t": "Rue du Maupas 30, Lausanne, Vaud 1004, Switzerland"},
    {"k": "dt", "t": "Téléphone :"}, {"k": "dd", "t": "021 646 38 35"},
    {"k": "dt", "t": "E-mail :"}, {"k": "dd", "t": "chezmanu2007@gmail.com"},
    {"k": "h2", "t": "Informations juridiques"},
]
nl = (raw / "mentions-legales.txt").read_text(encoding="utf8").splitlines()
notice.append({"k": "p", "t": next(l for l in nl if l.startswith("Ce site Internet utilise des cookies."))})
notice.append({"k": "link", "t": "Vers l'entrée Chez Manu sur local.ch", "href": "localCh"})
notice.append({"k": "link", "t": "Vers l'entrée Chez Manu sur search.ch", "href": "searchCh"})

out = {"_note": "French text of the live legal pages, verbatim; built by scripts/extract_legal.py.", "privacy": blocks, "notice": notice}
(root / "content" / "legal.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf8")
for n, b in enumerate(blocks):
    print(n, b["k"], b["t"][:70])
print(len(blocks), "privacy blocks,", len(notice), "notice blocks")
