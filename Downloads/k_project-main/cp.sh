#!/usr/bin/env bash
set -euo pipefail

echo "1) Finding server-only files under frontend/src..."
# list files that import server-only libs
files=$(grep -RIl --include="*.ts" --include="*.js" -e "bcrypt\|bcryptjs\|jsonwebtoken\|jwt\|mysql2\|mysql\|mariadb" frontend/src 2>/dev/null || true)

if [ -z "$files" ]; then
  echo "No server-only files found under frontend/src. Nothing to move."
  exit 0
fi

echo "Found files:"
printf '%s\n' "$files"

echo
echo "2) Preparing backend destination folders and moving files (preserving path)..."

for f in $files; do
  # compute relative path and destination path
  rel="${f#frontend/src/}"            # e.g. config/index.ts
  dest="backend/src/$rel"            # e.g. backend/src/config/index.ts

  # ensure destination dir exists
  mkdir -p "$(dirname "$dest")"

  echo "Moving: $f  ->  $dest"
  mv "$f" "$dest"

  # stage the moved file
  git add "$dest"

  # if the file was tracked at the old path, remove it from index
  if git ls-files --error-unmatch "$f" >/dev/null 2>&1; then
    git rm --cached "$f" >/dev/null || true
  fi
done

echo
echo "3) Show git status (what will be committed):"
git status --short

echo
read -p "Press ENTER to commit these changes (or CTRL-C to abort)..." unused || true

git commit -m "Move server-only files from frontend/src to backend/src (preserve structure)"

echo
echo "4) Quick scan to ensure frontend no longer contains server libs:"
grep -R --line-number "bcrypt\|bcryptjs\|jsonwebtoken\|jwt\|mysql2\|mysql\|mariadb" frontend/src || echo "no server libs found in frontend/src"

echo
echo "Done. Files were moved and committed. Next steps in message."

