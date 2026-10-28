"""Reads the saved live pages of donduarte.ch and writes every menu line, in page order, to content/raw/*.json.

Usage: python3 -I scripts/extract_live.py <dir with carte-plats.html, carte-vins.html, carte-desserts.html>
"""
import html, json, re, sys
from pathlib import Path

src = Path(sys.argv[1])
out = Path(__file__).resolve().parent.parent / "content" / "raw"
out.mkdir(parents=True, exist_ok=True)

def text(fragment):
    fragment = re.sub(r"<br\s*/?>", "\n", fragment)
    fragment = re.sub(r"<[^>]+>", "", fragment)
    return re.sub(r"[ \t ]+", " ", html.unescape(fragment)).strip()

for page in ("carte-plats", "carte-vins", "carte-desserts"):
    doc = (src / f"{page}.html").read_text(encoding="utf8")
    items = []
    for block in re.findall(r"<div class='fmp-food-item food-menu'>(.*?)<div class=\"fmp-footer\">", doc, re.S):
        title = text(re.search(r"<h3>(.*?)</h3>", block, re.S).group(1))
        price = re.search(r'<span class="price">(.*?)</span></div>', block, re.S)
        prices = re.findall(r"(\d+\.\d{2})", text(price.group(1))) if price else []
        body = re.search(r'<div class="fmp-body">(.*?)</div>', block, re.S)
        items.append({"i": len(items), "title": title, "prices": prices, "body": text(body.group(1)) if body else ""})
    (out / f"{page}.json").write_text(json.dumps(items, ensure_ascii=False, indent=1), encoding="utf8")
    print(page, len(items))
