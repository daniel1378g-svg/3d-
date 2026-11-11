#!/usr/bin/env bash
# Publishes the built game to the gh-pages branch (GitHub Pages), without touching the working tree.
#   npm run publish:pages      ->  https://<owner>.github.io/<repo>/prague-exam/
# Only the prague-exam/ folder on the branch is replaced; everything else published there
# (other projects, the root page, .nojekyll) is kept as it is.
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
repo="$(git -C "$here" rev-parse --show-toplevel)"
site="$here/dist/site"
[ -f "$site/index.html" ] || { echo "dist/site is missing: run npm run build first" >&2; exit 1; }
index="$(mktemp -u)"
trap 'rm -f "$index"' EXIT
export GIT_INDEX_FILE="$index"

parent=()
if git -C "$repo" fetch -q origin gh-pages 2>/dev/null; then
  base="$(git -C "$repo" rev-parse FETCH_HEAD)"
  git -C "$repo" read-tree "$base"                       # start from what is published now
  git -C "$repo" rm -r -q --cached --ignore-unmatch prague-exam
  parent=(-p "$base")
else
  blob="$(printf '' | git -C "$repo" hash-object -w --stdin)"
  git -C "$repo" update-index --add --cacheinfo 100644,"$blob",.nojekyll
fi

while IFS= read -r -d '' file; do
  blob="$(git -C "$repo" hash-object -w "$file")"
  git -C "$repo" update-index --add --cacheinfo 100644,"$blob","prague-exam/${file#"$site"/}"
done < <(find "$site" -type f -print0)

src="$(git -C "$repo" rev-parse --short HEAD)"
tree="$(git -C "$repo" write-tree)"
commit="$(git -C "$repo" commit-tree "$tree" "${parent[@]}" -m "Prague Exam Drive: built game (source $src)")"
git -C "$repo" push origin "$commit":refs/heads/gh-pages
echo "published $commit"
