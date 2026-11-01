#!/usr/bin/env bash
# Renders every page of the four menu PDFs at 300 dpi for visual verification of the transcription:
#   content/raw/pdf/<menu>/p-NN.png
# The PDFs are the restaurant's own files (local copies kept only under content/raw/pdf/, never in dist/).
# The renders are reproducible and gitignored (≈ 100 MB). Requires poppler-utils (pdftoppm).
# Usage: bash scripts/render-pdfs.sh [dpi]
set -euo pipefail
cd "$(dirname "$0")/.."
DPI="${1:-300}"
declare -A MENUS=(
  [speisekarte]="Speisekarte-Menu.pdf"
  [getraenkekarte]="Getraenkekarte.pdf"
  [kids]="Speisekarte-Kids.pdf"
  [dessertkarte]="Dessertkarte.pdf"
)
for slug in speisekarte getraenkekarte kids dessertkarte; do
  pdf="content/raw/pdf/${MENUS[$slug]}"
  out="content/raw/pdf/$slug"
  [ -f "$pdf" ] || { echo "missing $pdf" >&2; exit 1; }
  rm -rf "$out" && mkdir -p "$out"
  pdftoppm -r "$DPI" -png "$pdf" "$out/tmp"
  for f in "$out"/tmp-*.png; do
    n="${f##*-}"; n="${n%.png}"
    mv "$f" "$(printf '%s/p-%02d.png' "$out" "$((10#$n))")"
  done
  pages=$(ls "$out" | wc -l)
  echo "$slug: $pages pages → $out ($(du -sh "$out" | cut -f1))"
done
