# Captures every route of the live site pizzeriagiardino.ch (4 locales) as evidence for the redesign proposal:
#
#   content/raw/live/<lang>/<slug>.html   the page as served (GET only)
#   content/raw/live/<lang>/<slug>.txt    readable text: title, meta description, main text, sidebar, footer,
#                                         images, embeds and links of that page
#   content/raw/live/index.json           every route with its status, final URL, title and SHA-256
#
# Usage: python3 -I scripts/capture-live.py [--cache DIR]
#   --cache DIR   a folder of pages saved by the audit crawl of 01.11.2026 (files named like de_allgemein_anreise.html);
#                 pages found there are reused, everything else is fetched politely (GET, 1 request per second).
# Redirecting routes (the old "Leukerbad Therme" menu item, the /de/allgemein and /…/meta parents, the bare domain)
# are requested without following the redirect and recorded with their status and Location header.
import hashlib, html, json, os, re, sys, time, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "content", "raw", "live")
HOST = "https://pizzeriagiardino.ch"
UA = "giardino-design-proposal-audit/1.0 (read-only content audit for an unofficial redesign proposal; GET only)"
CRAWL_DATE = "2026-11-01"

# (lang, slug used for the file, path on the live site, kind)
PAGES = {
    "de": ["", "essen-geniessen", "kids", "gastgeber", "reservation", "partnerhotels", "impressum", "datenschutz",
           "allgemein/jobs", "allgemein/anreise", "allgemein/rundgang", "allgemein/impressionen", "allgemein/presse",
           "allgemein/kontakt"],
    "en": ["", "eat-enjoy", "kids", "host", "bookings", "partner-hotels", "imprint", "meta/jobs", "meta/arrival",
           "meta/virtual-tour", "meta/press", "meta/contact"],
    "fr": ["", "manger-et-savourer", "enfants", "hotes", "reservation", "hotel-partner", "empreinte", "meta/emplois",
           "meta/arrivee", "meta/tour-virtuel", "meta/presse", "meta/contact"],
    "it": ["", "mangia-e-divertiti", "kids", "la-casa", "prenotazione", "partner-albergos", "impronta", "meta/lavoro",
           "meta/come-arrivare", "meta/tour-virtuale", "meta/stampa", "meta/contatto"],
}
REDIRECTS = {
    "de": ["allgemein", "allgemein/leukerbad-therme"],
    "en": ["meta", "meta/leukerbad-therme"],
    "fr": ["meta", "meta/leukerbad-therme"],
    "it": ["meta", "meta/leukerbad-therme"],
}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


_last = [0.0]


def polite():
    wait = 1.0 - (time.time() - _last[0])
    if wait > 0:
        time.sleep(wait)
    _last[0] = time.time()


def get(url, follow=True):
    polite()
    opener = urllib.request.build_opener() if follow else urllib.request.build_opener(NoRedirect)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "de-CH,de;q=0.9"})
    try:
        with opener.open(req, timeout=30) as r:
            return r.status, r.geturl(), dict(r.headers), r.read()
    except urllib.error.HTTPError as e:
        return e.code, url, dict(e.headers or {}), e.read() if hasattr(e, "read") else b""


def cache_name(lang, path):
    return f"{lang}{'_' + path.replace('/', '_') if path else ''}.html"


def slug_of(path):
    return path.replace("/", "_") if path else "home"


def clean(fragment):
    fragment = re.sub(r"<script.*?</script>", lambda m: " [script " + (re.search(r'src="([^"]+)"', m.group(0)) or [None, "inline"])[1][:100] + "] ", fragment, flags=re.S)
    fragment = re.sub(r"<style.*?</style>", " ", fragment, flags=re.S)
    fragment = re.sub(r"<!--.*?-->", " ", fragment, flags=re.S)
    fragment = re.sub(r"<img[^>]*?(?:alt=\"([^\"]*)\")?[^>]*?src=\"([^\"]+)\"[^>]*>", lambda m: f" [image {html.unescape(m.group(2))[:120]}] ", fragment, flags=re.S)
    fragment = re.sub(r"<(br|/p|/h\d|/li|/div|/tr|/dt|/dd)[^>]*>", "\n", fragment, flags=re.I)
    fragment = re.sub(r"<a\s[^>]*href=\"([^\"]+)\"[^>]*>(.*?)</a>", lambda m: f"{m.group(2)} <{html.unescape(m.group(1))}>", fragment, flags=re.S)
    fragment = re.sub(r"<[^>]+>", " ", fragment)
    fragment = html.unescape(fragment).replace("\xa0", " ")
    lines = [" ".join(l.split()) for l in fragment.split("\n")]
    return "\n".join(l for l in lines if l)


def text_of(url, final, s):
    t = re.search(r"<title>(.*?)</title>", s, re.S)
    d = re.search(r'<meta name="description" content="([^"]*)"', s)
    body = s.find("<body")
    i = s.find('<div id="content"')
    j = s.find('<div id="portlets_wrap"')
    k = s.find('<div id="footer"')
    parts = [
        f"URL: {url}",
        f"FINAL: {final}",
        f"TITLE: {html.unescape(t.group(1).strip()) if t else ''}",
        f"DESCRIPTION: {html.unescape(d.group(1)) if d else ''}",
        "",
        "== HEADER (navigation, badges) ==",
        clean(s[body:i]) if body > 0 and i > 0 else "",
        "",
        "== MAIN ==",
        clean(s[i:j if j > 0 else k]) if i > 0 else "",
        "",
        "== SIDEBAR ==",
        clean(s[j:k]) if j > 0 else "",
        "",
        "== FOOTER ==",
        clean(s[k:]) if k > 0 else "",
        "",
        "== PHOTOS (data/Ressources) ==",
        "\n".join(sorted(set(re.findall(r"data/Ressources/([^&\"'\s]+?\.(?:jpe?g|png|gif|webp))", s, re.I)))),
        "",
        "== EMBEDS ==",
        "\n".join([f"iframe {u}" for u in re.findall(r"<iframe[^>]*src=\"([^\"]+)\"", s)]
                  + [f"video {u}" for u in sorted(set(re.findall(r"(data/Ressources/[^\"']+\.mp4)", s)))]
                  + [f"script {u}" for u in re.findall(r"<script[^>]*src=\"(https?://[^\"]+)\"", s) if "pizzeriagiardino.ch" not in u]),
        "",
        "== EXTERNAL LINKS ==",
        "\n".join(sorted(set(html.unescape(u) for u in re.findall(r"<a\s[^>]*href=\"(https?://[^\"]+)\"", s) if "pizzeriagiardino.ch" not in u))),
    ]
    return "\n".join(parts).rstrip() + "\n"


def main():
    cache = None
    if "--cache" in sys.argv:
        cache = sys.argv[sys.argv.index("--cache") + 1]
    index = []
    for lang, paths in PAGES.items():
        os.makedirs(os.path.join(OUT, lang), exist_ok=True)
        for path in paths:
            url = f"{HOST}/{lang}{'/' + path if path else ''}"
            name = cache_name(lang, path)
            src = os.path.join(cache, name) if cache else None
            if src and os.path.exists(src):
                body = open(src, "rb").read()
                status, final, origin = 200, url, f"audit crawl {CRAWL_DATE} (cached)"
            else:
                status, final, _, body = get(url)
                origin = f"fetched {time.strftime('%Y-%m-%d')}"
            s = body.decode("utf-8", errors="replace")
            slug = slug_of(path)
            open(os.path.join(OUT, lang, slug + ".html"), "wb").write(body)
            open(os.path.join(OUT, lang, slug + ".txt"), "w", encoding="utf-8").write(text_of(url, final, s))
            t = re.search(r"<title>(.*?)</title>", s, re.S)
            index.append({"lang": lang, "slug": slug, "url": url, "status": status, "final": final, "origin": origin,
                          "title": html.unescape(t.group(1).strip()) if t else "", "bytes": len(body),
                          "sha256": hashlib.sha256(body).hexdigest(), "files": [f"{lang}/{slug}.html", f"{lang}/{slug}.txt"]})
            print(f"{status} {url}  ({origin})")
    for lang, paths in REDIRECTS.items():
        for path in paths:
            url = f"{HOST}/{lang}/{path}"
            status, final, headers, body = get(url, follow=False)
            location = headers.get("Location") or headers.get("location") or ""
            slug = slug_of(path)
            note = (f"URL: {url}\nSTATUS: {status}\nLOCATION: {location}\n"
                    f"NOTE: requested {time.strftime('%Y-%m-%d')} without following the redirect (GET).\n")
            if status in (200,) and body:
                open(os.path.join(OUT, lang, slug + ".html"), "wb").write(body)
            open(os.path.join(OUT, lang, slug + ".txt"), "w", encoding="utf-8").write(note)
            index.append({"lang": lang, "slug": slug, "url": url, "status": status, "location": location,
                          "origin": f"fetched {time.strftime('%Y-%m-%d')}", "files": [f"{lang}/{slug}.txt"]})
            print(f"{status} {url} -> {location}")
    status, final, headers, _ = get(HOST + "/", follow=False)
    index.append({"lang": None, "slug": "root", "url": HOST + "/", "status": status,
                  "location": headers.get("Location") or headers.get("location") or "", "origin": f"fetched {time.strftime('%Y-%m-%d')}", "files": []})
    print(f"{status} {HOST}/ -> {index[-1]['location']}")
    json.dump({"note": "Read-only capture of pizzeriagiardino.ch (GET only). Pages marked 'cached' come from the audit crawl of 01.11.2026; "
                       "redirect routes were requested without following the redirect.",
               "routes": index}, open(os.path.join(OUT, "index.json"), "w"), ensure_ascii=False, indent=1)
    print(f"{len(index)} routes → content/raw/live/")


if __name__ == "__main__":
    main()
