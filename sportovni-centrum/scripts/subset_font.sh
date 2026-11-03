#!/bin/sh
# Subsets the Archivo variable font (wght 100–900, wdth 62–125 %) to Basic Latin, Latin-1 and
# Latin Extended-A (all Czech letters: á č ď é ě í ň ó ř š ť ú ů ý ž and capitals) plus
# typographic punctuation. Requires: pip install fonttools brotli
set -e
cd "$(dirname "$0")/.."
SRC=node_modules/@fontsource-variable/archivo/files
python3 -I -m fontTools.subset "$SRC/archivo-latin-ext-wdth-normal.woff2" \
  --unicodes="U+0100-017F" \
  --layout-features='kern,liga,calt,tnum,lnum,case' --flavor=woff2 --output-file=public/fonts/archivo-latin-ext.woff2
python3 -I -m fontTools.subset "$SRC/archivo-latin-wdth-normal.woff2" \
  --unicodes="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+20AC,U+2122,U+2190-2193,U+2212" \
  --layout-features='kern,liga,calt,tnum,lnum,case' --flavor=woff2 --output-file=public/fonts/archivo-latin.woff2
cp node_modules/@fontsource-variable/archivo/LICENSE public/fonts/Archivo-OFL.txt
ls -la public/fonts
