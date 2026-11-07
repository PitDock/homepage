#!/usr/bin/env python3
"""OGP画像用フォントのサブセット範囲（charset.txt）を作る。

範囲は Shift_JIS（Windows-31J / cp932）で表せる全文字 + ASCII。
cp932 の2バイト領域を順にデコードし、デコードできた文字をすべて集める。
charset.txt はビルド時の文字チェック（lib/og/fonts.ts）にも使う。

使い方: python3 scripts/og-fonts/build-charset.py
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "assets" / "fonts" / "og" / "charset.txt"

LEAD_BYTES = list(range(0x81, 0xA0)) + list(range(0xE0, 0xFD))
TRAIL_BYTES = list(range(0x40, 0x7F)) + list(range(0x80, 0xFD))


def collect() -> list[str]:
    chars: set[str] = {chr(c) for c in range(0x20, 0x7F)}
    for lead in LEAD_BYTES:
        for trail in TRAIL_BYTES:
            try:
                ch = bytes([lead, trail]).decode("cp932")
            except UnicodeDecodeError:
                continue
            if len(ch) == 1 and ch.isprintable():
                chars.add(ch)
    return sorted(chars)


def main() -> int:
    chars = collect()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    # 改行で終わる1行のテキスト。チェック側は改行を無視する
    OUTPUT.write_text("".join(chars) + "\n", encoding="utf-8")
    print(f"wrote {len(chars)} chars to {OUTPUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
