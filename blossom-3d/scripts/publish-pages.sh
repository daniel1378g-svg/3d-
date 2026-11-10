#!/usr/bin/env bash
# Publishes the built walkthrough to the gh-pages branch (GitHub Pages), without touching the working tree.
#   npm run publish:pages      →  https://<owner>.github.io/<repo>/refeitorio-balnearios/
# The branch holds only the built site: refeitorio-balnearios/ (= dist/), a root redirect and .nojekyll.
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
repo="$(git -C "$here" rev-parse --show-toplevel)"
site="$(mktemp -d)"; index="$(mktemp -u)"
trap 'rm -rf "$site" "$index"' EXIT

mkdir -p "$site/refeitorio-balnearios"
cp -r "$here/dist/." "$site/refeitorio-balnearios/"
touch "$site/.nojekyll"
cat > "$site/index.html" <<'HTML'
<!doctype html>
<html lang="pt">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<meta http-equiv="refresh" content="0; url=refeitorio-balnearios/" />
<title>Refeitório e Balneários 3D</title>
</head>
<body>
<p><a href="refeitorio-balnearios/">Refeitório e Balneários · visita 3D</a></p>
</body>
</html>
HTML
printf 'Built site for GitHub Pages. The source is in `blossom-3d/` on the project branch; this branch holds only the\noutput of `npm run build` (folder `refeitorio-balnearios/`).\n' > "$site/README.md"

src="$(git -C "$repo" rev-parse --short HEAD)"
tree="$(GIT_INDEX_FILE="$index" git -C "$repo" --work-tree="$site" add -A . && GIT_INDEX_FILE="$index" git -C "$repo" write-tree)"
parent=(); if git -C "$repo" fetch -q origin gh-pages 2>/dev/null; then parent=(-p FETCH_HEAD); fi
commit="$(git -C "$repo" commit-tree "$tree" "${parent[@]}" -m "Refeitório e Balneários 3D: built walkthrough (source $src)")"
git -C "$repo" push origin "$commit":refs/heads/gh-pages
echo "published $commit"
