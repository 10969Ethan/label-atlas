#!/usr/bin/env bash
# 把 GitHub 版的前端檔案覆蓋到 chatgpt.site 專案的網站根目錄。
# 用法：bash sync-to-chatgpt-site.sh <網站根目錄，放 index.html 的那一層>
# 只會覆蓋或新增下列檔案，不會刪除網站上的其他檔案，也不會碰伺服器 /api 程式。
set -euo pipefail
DEST="${1:-.}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
curl -fsSL https://codeload.github.com/10969Ethan/label-atlas/tar.gz/refs/heads/main | tar -xz -C "$TMP"
SRC="$TMP/label-atlas-main"

for f in index.html designers.json; do
  cp "$SRC/$f" "$DEST/$f"
done
for d in designers care data assets/designers assets/care assets/time-machine assets/designers-universe; do
  mkdir -p "$DEST/$d"
  cp -R "$SRC/$d/." "$DEST/$d/"
done

echo "同步完成：$(find "$DEST/designers" "$DEST/care" "$DEST/data" "$DEST/assets/designers" "$DEST/assets/care" "$DEST/assets/time-machine" "$DEST/assets/designers-universe" -type f | wc -l) 個檔案 + index.html、designers.json"
