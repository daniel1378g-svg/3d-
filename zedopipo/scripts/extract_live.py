"""Reads the saved live pages of zedopipo.ch and writes the menu, in page order, to content/raw/menu.json.

Usage: python3 -I scripts/extract_live.py <dir with menu.html>
"""
import html, json, re, sys
from pathlib import Path

src = Path(sys.argv[1])
out = Path(__file__).resolve().parent.parent / "content" / "raw"
out.mkdir(parents=True, exist_ok=True)
text = lambda f: re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", f))).strip()

doc = (src / "menu.html").read_text(encoding="utf8")
parts = re.split(r'<h3 class="text-center weekly-title[^"]*">', doc)[1:]
sections = []
for part in parts:
    title = text(part[: part.index("</h3>")])
    items = []
    for block in re.findall(r'<div class="menu-details">(.*?)</div>\s*</div>\s*</div>', part, re.S):
        name = text(re.search(r"<h4>(.*?)</h4>", block, re.S).group(1))
        price = text(re.search(r'<span class="price">(.*?)</span>', block, re.S).group(1))
        desc = re.search(r"<div class=\"menu-description\">(.*)", block, re.S)
        items.append({"name": name, "price": price, "desc": text(desc.group(1)) if desc else ""})
    images = re.findall(r'<img[^>]+src="(https://zedopipo\.ch/wp-content/uploads/[^"]+)"', part.split("<h3")[0])
    sections.append({"title": title, "items": items, "images": images})
(out / "menu.json").write_text(json.dumps(sections, ensure_ascii=False, indent=1), encoding="utf8")
for s in sections:
    print(f'{s["title"]}: {len(s["items"])} items, {len(s["images"])} images')
print("total", sum(len(s["items"]) for s in sections))
