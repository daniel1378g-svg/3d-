"""Downloads the full-size originals listed in content/assets.json from manna-acai.ch into media/ (they are not kept in
git). Read-only: plain GET requests for the published files.

Run: python3 -I scripts/fetch_originals.py
"""
import json, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
for a in json.loads((ROOT / "content/assets.json").read_text(encoding="utf-8"))["assets"]:
    dst = ROOT / a["file"]
    if dst.exists():
        continue
    dst.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["curl", "-sSLf", "-o", str(dst), a["source"]], check=True)
    print("fetched", a["id"])
