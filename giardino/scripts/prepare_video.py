# The restaurant's own film (giardino_video_full_length.mp4, 2560×1440, 120 s, on the current home page)
#   → public/video/giardino-film-720.mp4   the whole film, 1280×720, H.264 + AAC, for the player (with sound)
#   → public/video/giardino-loop-720.mp4   a silent 18 s montage of shots without recognisable faces (kitchen,
#                                          pizza, plating, aerials, the evening sign), for the ambient band
#   → posters as WebP
import os, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "media/originals/1756717407-giardino_video_full_length.mp4")
OUT = os.path.join(ROOT, "public/video")
os.makedirs(OUT, exist_ok=True)
if not os.path.exists(SRC):
    sys.exit("missing original film – run `npm run fetch`")

def run(args):
    print(" ".join(args[:6]), "…")
    subprocess.run(args, check=True)

film = os.path.join(OUT, "giardino-film-720.mp4")
if not os.path.exists(film):
    run(["ffmpeg", "-v", "error", "-y", "-i", SRC, "-vf", "scale=1280:-2:flags=lanczos", "-c:v", "libx264", "-preset", "slow", "-crf", "26",
         "-profile:v", "high", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-ac", "1", "-movflags", "+faststart", film])

# (start, end) in seconds
CUTS = [(44.0, 46.0), (46.5, 48.6), (12.0, 14.0), (19.0, 20.6), (51.4, 53.6), (90.4, 93.0), (32.0, 34.0), (42.0, 44.0), (110.0, 112.6)]
loop = os.path.join(OUT, "giardino-loop-720.mp4")
if not os.path.exists(loop):
    # one clip at a time (input seeking keeps memory low), then joined with the concat demuxer
    tmp = os.path.join(ROOT, ".cache/loop")
    os.makedirs(tmp, exist_ok=True)
    listing = []
    for i, (a, b) in enumerate(CUTS):
        clip = os.path.join(tmp, f"clip{i}.mp4")
        run(["ffmpeg", "-v", "error", "-y", "-ss", str(a), "-i", SRC, "-t", f"{b - a:.2f}", "-an", "-vf", "scale=1280:720:flags=lanczos,setsar=1,fps=25",
             "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-profile:v", "high", "-pix_fmt", "yuv420p", "-g", "50", clip])
        listing.append(f"file '{clip}'")
    open(os.path.join(tmp, "list.txt"), "w").write("\n".join(listing) + "\n")
    run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", os.path.join(tmp, "list.txt"), "-c", "copy", "-movflags", "+faststart", loop])

for name, t in [("giardino-film-poster", 46.8), ("giardino-loop-poster", 44.2)]:
    dest = os.path.join(OUT, name + ".webp")
    if not os.path.exists(dest):
        run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", SRC, "-frames:v", "1", "-vf", "scale=1280:-2:flags=lanczos", "-c:v", "libwebp", "-quality", "78", dest])

for f in sorted(os.listdir(OUT)):
    print(f"{f:32s} {os.path.getsize(os.path.join(OUT, f)) / 1e6:6.2f} MB")
