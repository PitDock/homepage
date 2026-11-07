#!/usr/bin/env bash
# OGP画像用フォント（assets/fonts/og/）を作り直す。
#
# - Zen Kaku Gothic New（Regular / Bold）: 配布物を取得し、charset.txt の文字だけにサブセット化する
# - Space Grotesk（Regular / Bold）: 配布元の静的TTFをそのままコピーする（欧文のみなのでサブセットにしない）
#
# 必要なもの: python3, curl, fonttools（pip install fonttools）
# 使い方: bash scripts/og-fonts/subset.sh
#   charset.txt を変えたいときは、先に build-charset.py を実行するか charset.txt に文字を足してから実行する。
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
OUT="$ROOT/assets/fonts/og"
CHARSET="$OUT/charset.txt"

# 取得元はコミットを固定する（バージョンを変えるときはここと README.md を更新する）
GF_COMMIT="86aced91de05cd4f96a06838124cca45be337b2b"
SG_COMMIT="03507d024a01282884232081fc6011c09ff4e849"
ZEN_BASE="https://raw.githubusercontent.com/google/fonts/$GF_COMMIT/ofl/zenkakugothicnew"
SG_BASE="https://raw.githubusercontent.com/floriankarsten/space-grotesk/$SG_COMMIT"

PYFTSUBSET="${PYFTSUBSET:-pyftsubset}"
if ! command -v "$PYFTSUBSET" >/dev/null 2>&1; then
  echo "pyftsubset が見つかりません。pip install fonttools を実行してください" >&2
  exit 1
fi
if [ ! -s "$CHARSET" ]; then
  echo "$CHARSET がありません。先に python3 scripts/og-fonts/build-charset.py を実行してください" >&2
  exit 1
fi

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

fetch() {
  curl -fsSL -o "$2" "$1"
}

fetch "$ZEN_BASE/ZenKakuGothicNew-Bold.ttf" "$WORK/ZenKakuGothicNew-Bold.ttf"
fetch "$ZEN_BASE/ZenKakuGothicNew-Regular.ttf" "$WORK/ZenKakuGothicNew-Regular.ttf"
fetch "$ZEN_BASE/OFL.txt" "$OUT/OFL-ZenKakuGothicNew.txt"
fetch "$SG_BASE/fonts/ttf/static/SpaceGrotesk-Bold.ttf" "$OUT/SpaceGrotesk-Bold.ttf"
fetch "$SG_BASE/fonts/ttf/static/SpaceGrotesk-Regular.ttf" "$OUT/SpaceGrotesk-Regular.ttf"
fetch "$SG_BASE/OFL.txt" "$OUT/OFL-SpaceGrotesk.txt"

# OFL の冒頭に Reserved Font Name の宣言があると、改変版（サブセット）に同じ名前を使えない
if head -n 3 "$OUT/OFL-ZenKakuGothicNew.txt" | grep -qi "reserved font name"; then
  echo "Zen Kaku Gothic New の OFL に Reserved Font Name の宣言があります。フォント名の変更が必要です（README.md 参照）" >&2
  exit 1
fi

for weight in Bold Regular; do
  "$PYFTSUBSET" "$WORK/ZenKakuGothicNew-$weight.ttf" \
    --text-file="$CHARSET" \
    --layout-features='*' \
    --no-hinting \
    --output-file="$OUT/ZenKakuGothicNew-$weight.subset.ttf"
done

ls -l "$OUT"
