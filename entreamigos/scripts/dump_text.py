"""Visible text and images of a saved live page, in document order (for copying texts verbatim)."""
import sys, re, html
from html.parser import HTMLParser

class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip = 0; self.out = []; self.buf = []
    def flush(self):
        t = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        if t: self.out.append(t)
        self.buf = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "noscript", "svg"): self.skip += 1
        if tag in ("p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "br", "section", "td", "tr", "span", "a"): self.flush()
        if tag == "img" and not self.skip:
            src = a.get("data-src") or a.get("src") or ""
            self.flush(); self.out.append(f"[img {src} alt={a.get('alt','')!r}]")
        if tag == "a" and a.get("href", "").startswith(("http", "tel", "mailto")) and not self.skip:
            self.out.append(f"[link {a['href']}]")
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg"): self.skip = max(0, self.skip - 1)
        if tag in ("p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "section", "td", "a", "span"): self.flush()
    def handle_data(self, d):
        if not self.skip: self.buf.append(d)

p = P(); p.feed(open(sys.argv[1], encoding="utf-8").read()); p.flush()
prev = None
for line in p.out:
    if line != prev: print(html.unescape(line))
    prev = line
