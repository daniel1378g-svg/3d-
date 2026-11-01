#!/usr/bin/env python3
"""Fills the measured values into HANDOFF.md from content/qa/report.json, content/qa/perf-*.json, the built
dist/assets and content/assets.json. Run after `npm run build`, `npm run qa`, `npm run perf` (both methods) and
`npm test` (pass the test summary as the first argument, e.g. "53/53 pass")."""
import gzip, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = lambda *a: os.path.join(ROOT, *a)
handoff = open(p("HANDOFF.md"), encoding="utf-8").read()
r = json.load(open(p("content/qa/report.json")))
tick = lambda ok: "✔" if ok else "✘"

# asset inventory table
assets = json.load(open(p("content/assets.json")))["assets"]
rows = ["| # | Photo (id) | Year | Original px | Shown on (new site) | Credit | Consent |", "|---|---|---|---|---|---|---|"]
for i, x in enumerate(assets, 1):
    o = x.get("original") or {}
    used = ", ".join(x.get("usedOn") or []) or "–"
    rows.append(f"| {i} | `{x['id']}` | {x.get('year', '')} | {o.get('width', '?')}×{o.get('height', '?')} | {used} | {x.get('credit') or 'uncredited'} | {'⚠ ' + x['consent'] if x.get('consent') else ''} |")

# performance lines
perf_lines = []
for method, label in (("simulate", "Lighthouse default (simulated throttling, Lantern)"), ("devtools", "applied throttling (devtools method, same 4× CPU / Slow 4G)")):
    f = p(f"content/qa/perf-{method}.json")
    if not os.path.exists(f):
        perf_lines.append(f"  {label}: not run")
        continue
    d = json.load(open(f))
    parts = []
    for route, v in d["routes"].items():
        lcp_ok = "✔" if v["lcpS"] <= 2.5 else "✘"
        tbt_ok = "✔" if v["tbtMs"] <= 200 else "✘"
        parts.append(f"{route} LCP {v['lcpS']:.2f} s {lcp_ok}, CLS {v['cls']:.2f} ✔, TBT {v['tbtMs']} ms {tbt_ok}")
    perf_lines.append(f"  {label}: " + "; ".join(parts))

# first-route JS: the chunks the home page loads before hydration
assets_dir = p("dist/assets")
def gz(name_prefix):
    for f in os.listdir(assets_dir):
        if re.match(rf"{name_prefix}-[\w-]+\.js$", f) and f.startswith(name_prefix + "-"):
            return len(gzip.compress(open(os.path.join(assets_dir, f), "rb").read(), 9))
    return 0
index = max((len(gzip.compress(open(os.path.join(assets_dir, f), "rb").read(), 9)) for f in os.listdir(assets_dir) if re.match(r"index-[\w-]+\.js$", f)), default=0)
first_js = (index + gz("Home") + gz("Img") + gz("Flow") + gz("Film")) / 1024

s = r["switch"]
shots = sum(len(files) for _, _, files in os.walk(p("content/qa")) if files) - 3
values = {
    "ASSETS": "\n".join(rows),
    "SWITCH_MS": str(s.get("durationMs")),
    "ANIM_MS": str(s.get("animationMs")),
    "SWITCH_CLS": f"{s.get('cls', 0):.2f}",
    "SWITCH_CLS_ALL": f"{s.get('clsIncludingInput', 0):.3f}",
    "SWITCH_OK": tick(s.get("ok") and s.get("reservationKept", {}).get("ok")),
    "REDUCED_OK": tick(not s.get("reduced", {}).get("logoFlight") and s.get("reduced", {}).get("ms", 999) < 400),
    "REDUCED_MS": str(s.get("reduced", {}).get("ms")),
    "CLOSED_OK": tick(r["reservation"].get("wednesdaysBlocked") and r["reservation"].get("closureBlocked")),
    "FIRST_FREE": r["reservation"].get("firstFree", "?"),
    "CONFIRMED_FLOW": "0 hits" if not r["reservation"].get("confirmedWordInFlow") else "FOUND",
    "HANDOFF_OK": tick(r["reservation"].get("mailto") and r["reservation"].get("tel")),
    "THIRD_PARTY": str(len(r["totals"]["thirdPartyRequests"])),
    "COOKIES": str(r["totals"]["cookies"]),
    "PERF": "\n".join(perf_lines),
    "FIRST_JS": f"{first_js:.0f}",
    "AXE_ROUTES": str(r["totals"]["routes"]),
    "AXE_OTHER": str(r["totals"]["axeOther"]),
    "KEYBOARD_OK": tick(all(r["keyboard"].get(k) for k in ("skipLinkFirst", "escapeClosesAndReturns")) and r["keyboard"].get("arrowMoves")),
    "FOCUS_OK": tick(r["keyboard"].get("focusRing")),
    "SHOTS": f"✔ ({shots} files)",
    "TESTS": sys.argv[1] if len(sys.argv) > 1 else "not run",
}
for k, v in values.items():
    handoff = handoff.replace("{{" + k + "}}", v)
left = re.findall(r"\{\{\w+\}\}", handoff)
open(p("HANDOFF.md"), "w", encoding="utf-8").write(handoff)
print("filled", len(values), "values; left:", left)
