"""Turns the captured live pages (content/raw/live/*.html, not in git) into structured German content:
content/articles.de.json — one entry per long-form page, as a list of blocks (h1/h2/h3/p/ul/img/quote).

Inline links are dropped (their text stays), <strong> becomes **…**. Run: python3 -I scripts/extract_articles.py <capture dir>
"""
import html, json, re, sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "content/raw/live"

PAGES = {
    "churrasco": "www_boinabrasa_ch_ch_churrasco.html",
    "about": "www_boinabrasa_ch_ch_steakhouse_der_besonderen_art.html",
    "picanha": "www_boinabrasa_ch_ch_blog_picanha.html",
    "maminha": "www_boinabrasa_ch_ch_blog_maminha_churrasco.html",
    "linguica": "www_boinabrasa_ch_ch_blog_linguica_churrasco.html",
    "caipirinha": "www_boinabrasa_ch_ch_blog_original_caipirinha_brasilien.html",
    "gerichte": "www_boinabrasa_ch_ch_blog_brasilianische_gerichte.html",
    "gaucho": "www_boinabrasa_ch_ch_blog_gaucho_grill.html",
    "dolcebrigadeiro": "www_boinabrasa_ch_ch_dolcebrigadeiro.html",
    "impressum": "www_boinabrasa_ch_ch_impressum.html",
    "agb": "www_boinabrasa_ch_ch_agb.html",
    "datenschutz": "www_boinabrasa_ch_ch_datenschutz.html",
    "impressum_en": "www_boinabrasa_ch_en_imprint.html",
    "agb_en": "www_boinabrasa_ch_en_terms_and_conditions.html",
    "datenschutz_en": "www_boinabrasa_ch_en_privacy_policy.html",
}

BLOCK = {"h1", "h2", "h3", "h4", "p", "li", "blockquote", "td", "th"}


class Walker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth = 0          # depth inside the article container
        self.inside = False
        self.blocks = []
        self.cur = None         # (tag, [text parts])
        self.list = None
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get("class", "") or ""
        if not self.inside:
            if "com-content-article" in cls.split() or "item-page" in cls.split() or "blog-item" in cls:
                self.inside = True
                self.depth = 1
            return
        if tag in ("script", "style", "form", "button", "nav"):
            self.skip += 1
        if tag not in ("br", "img", "meta", "hr", "input", "link"):
            self.depth += 1
        if self.skip:
            return
        if tag == "img" and a.get("src"):
            self.flush()
            self.blocks.append({"t": "img", "src": a["src"].split("#")[0], "alt": a.get("alt", "")})
        elif tag in ("ul", "ol"):
            self.flush()
            self.list = {"t": "ul", "items": []}
        elif tag in BLOCK:
            self.flush()
            self.cur = (tag, [])
        elif tag == "br" and self.cur:
            self.cur[1].append("\n")
        elif tag in ("strong", "b") and self.cur:
            self.cur[1].append("**")

    def handle_endtag(self, tag):
        if not self.inside:
            return
        if tag in ("strong", "b") and self.cur and not self.skip:
            self.cur[1].append("**")
        if tag in BLOCK and not self.skip:
            self.flush()
        if tag in ("ul", "ol") and self.list is not None and not self.skip:
            self.flush()
            if self.list["items"]:
                self.blocks.append(self.list)
            self.list = None
        if tag in ("script", "style", "form", "button", "nav") and self.skip:
            self.skip -= 1
        self.depth -= 1
        if self.depth <= 0:
            self.flush()
            self.inside = False

    def handle_data(self, data):
        if self.inside and not self.skip and self.cur is not None:
            self.cur[1].append(data)

    def flush(self):
        if not self.cur:
            return
        tag, parts = self.cur
        self.cur = None
        text = "".join(parts).replace("\xa0", " ")
        text = re.sub(r"\*\*\s*\*\*", "", text)
        text = re.sub(r"[ \t]+", " ", text)
        text = re.sub(r" *\n *", "\n", text).strip()
        text = re.sub(r"\*\*(\s*)\*\*", r"\1", text).strip()
        if not text or text in ("**", "****"):
            return
        if tag == "li" and self.list is not None:
            self.list["items"].append(text)
            return
        t = {"td": "p", "th": "p", "blockquote": "quote", "h4": "h3", "li": "p"}.get(tag, tag)
        self.blocks.append({"t": t, "text": text})


out = {}
for key, name in PAGES.items():
    f = SRC / name
    if not f.exists():
        print("missing", name)
        continue
    w = Walker()
    w.feed(f.read_text(encoding="utf-8"))
    w.flush()
    blocks = [b for b in w.blocks if not (b["t"] == "p" and b["text"] in ("Weiterlesen", "Mehr erfahren"))]
    out[key] = blocks
    words = sum(len((b.get("text") or " ".join(b.get("items", []))).split()) for b in blocks)
    print(f"{key:16} {len(blocks):3} blocks {words:5} words  first: {blocks[0]['text'][:60] if blocks and 'text' in blocks[0] else blocks[:1]}")

(ROOT / "content").mkdir(exist_ok=True)
(ROOT / "content/raw/articles.extracted.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
