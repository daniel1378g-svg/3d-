#!/bin/sh
# The two font families as self-hosted WOFF2, one file per style with latin + latin-ext (BRIEF §6: ≤ 4 files, ≤ 250 KB).
# Sources: the variable TTFs of google/fonts (SIL Open Font License, licences in media/fonts/), downloaded once to
# media/fonts/. Needs fonttools + brotli (pip install fonttools brotli).
set -e
cd "$(dirname "$0")/.."
SRC=media/fonts
mkdir -p "$SRC" public/fonts
get() { [ -f "$SRC/$2" ] || curl -sSfL -o "$SRC/$2" "https://raw.githubusercontent.com/google/fonts/main/ofl/$1"; }
get "cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf" "CormorantGaramond[wght].ttf"
get "cormorantgaramond/CormorantGaramond-Italic%5Bwght%5D.ttf" "CormorantGaramond-Italic[wght].ttf"
get "manrope/Manrope%5Bwght%5D.ttf" "Manrope[wght].ttf"
get "cormorantgaramond/OFL.txt" "OFL-CormorantGaramond.txt"
get "manrope/OFL.txt" "OFL-Manrope.txt"
# Google Fonts' latin + latin-ext ranges, plus arrows
U="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+FEFF,U+FFFD,U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"
sub() { pyftsubset "$SRC/$1" --unicodes="$U" --layout-features='*' --no-hinting --flavor=woff2 --output-file="public/fonts/$2.woff2"; }
sub "CormorantGaramond[wght].ttf" cormorant-garamond-roman
sub "CormorantGaramond-Italic[wght].ttf" cormorant-garamond-italic
sub "Manrope[wght].ttf" manrope
ls -l public/fonts
