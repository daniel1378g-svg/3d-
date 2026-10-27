#!/bin/sh
# Web versions of the supplied caldo verde video (media/original/caldo-verde.mp4: 1920×1080,
# 24 fps, 193 frames, 8.04 s). The page plays it once, muted and inline (src/components/CaldoVerde.tsx).
#   public/videos/caldo-verde-{1280,1920}.mp4   H.264, no audio, fast start
#   public/videos/poster/caldo-{first,last}-{1280,1920}.{webp,jpg}   empty bowl / full bowl
set -e
cd "$(dirname "$0")/.."
SRC=media/original/caldo-verde.mp4
OUT=public/videos
for W in 1280 1920; do
  ffmpeg -v error -y -i "$SRC" -an -vf "scale=$W:-2" -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p \
    -movflags +faststart "$OUT/caldo-verde-$W.mp4"
  ffmpeg -v error -y -i "$SRC" -vf "select=eq(n\,0),scale=$W:-2" -frames:v 1 "$OUT/poster/caldo-first-$W.jpg"
  ffmpeg -v error -y -sseof -0.1 -i "$SRC" -vf "scale=$W:-2" -frames:v 1 -update 1 "$OUT/poster/caldo-last-$W.jpg"
  for K in first last; do
    python3 -I -c "from PIL import Image; import sys; Image.open(sys.argv[1]).save(sys.argv[2], quality=82, method=6)" \
      "$OUT/poster/caldo-$K-$W.jpg" "$OUT/poster/caldo-$K-$W.webp"
  done
done
ls -la "$OUT"/caldo-verde-*.mp4 "$OUT"/poster/caldo-*
