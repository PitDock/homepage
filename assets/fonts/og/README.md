# OGP画像用フォント

`lib/og/fonts.ts` がビルド時に読み込み、`next/og` の `ImageResponse` で OGP 画像を描くのに使う。
ブラウザには配信しないので `public/` ではなくここに置いている。仕様は `docs/ogp-image-design-spec.md` §6。

## ファイル

| ファイル | 内容 | サイズ |
|---|---|---|
| `ZenKakuGothicNew-Bold.subset.ttf` | Zen Kaku Gothic New Bold（700）を `charset.txt` の文字にサブセット化したもの | 2193032 bytes |
| `ZenKakuGothicNew-Regular.subset.ttf` | Zen Kaku Gothic New Regular（400）を同上 | 2238540 bytes |
| `SpaceGrotesk-Bold.ttf` | Space Grotesk Bold（700）静的TTF。欧文のみなのでサブセットにしていない | 116056 bytes |
| `SpaceGrotesk-Regular.ttf` | Space Grotesk Regular（400）静的TTF。同上 | 114428 bytes |
| `charset.txt` | サブセットに含めた文字の一覧（Shift_JIS / cp932 で表せる全文字 + ASCII、7,420字）。ビルド時の文字チェックにも使う | — |
| `OFL-ZenKakuGothicNew.txt` | Zen Kaku Gothic New のライセンス全文（SIL Open Font License 1.1） | — |
| `OFL-SpaceGrotesk.txt` | Space Grotesk のライセンス全文（SIL Open Font License 1.1） | — |

## 入手元・バージョン

| フォント | 入手元 | バージョン |
|---|---|---|
| Zen Kaku Gothic New | `github.com/google/fonts` の `ofl/zenkakugothicnew/`（コミット `86aced91de05cd4f96a06838124cca45be337b2b`） | Version 1.002 |
| Space Grotesk | `github.com/floriankarsten/space-grotesk` の `fonts/ttf/static/`（コミット `03507d024a01282884232081fc6011c09ff4e849`） | Version 2.000 |

取得元のコミットは `scripts/og-fonts/subset.sh` に固定している。

## ライセンス（Reserved Font Name の確認結果）

- どちらも SIL Open Font License 1.1。リポジトリに同梱する（再配布にあたる）ため、ライセンス全文を同じフォルダに置いている。
- サブセット化は OFL 上の「改変」にあたる。2026-11-07 に OFL.txt の冒頭を確認したところ、**どちらにも Reserved Font Name の宣言はない**（著作権表示の行に "with Reserved Font Name" がない）。そのためフォント内部の名前はそのままにしている。
  - Zen Kaku Gothic New: `Copyright 2022 The Zen Kaku Gothic Project Authors (https://github.com/googlefonts/zen-kakugothic)`
  - Space Grotesk: `Copyright 2020 The Space Grotesk Project Authors (https://github.com/floriankarsten/space-grotesk)`
- `subset.sh` は、取得した OFL.txt の冒頭に Reserved Font Name の宣言があれば止まる。その場合は改変版に同じ名前を使えないので、フォント内部の名前を変える必要がある。
- 生成した PNG 画像にライセンス表記は不要（OFL は画像などの制作物を制限しない）。

## サブセットの作り方

必要なもの: python3、curl、fonttools（`pip install fonttools`）

```sh
python3 scripts/og-fonts/build-charset.py   # charset.txt を作り直す（範囲を変えないなら不要）
bash scripts/og-fonts/subset.sh             # フォントを取得してサブセットを作る
```

`pyftsubset` が PATH にない場合は `PYFTSUBSET=/path/to/pyftsubset bash scripts/og-fonts/subset.sh` で場所を指定する。

## 文字が足りずにビルドが失敗したとき

OGP 画像に入れる文字が `charset.txt` にないと、`next build` が「サブセットに含まれない文字があります」というエラーで止まる（□ になった画像が公開されるのを防ぐため）。

1. エラーメッセージに出た文字を `charset.txt` の末尾（改行の前）に書き足す（`build-charset.py` を実行すると足した文字が消えるので注意。範囲を恒久的に広げるなら `build-charset.py` 側を直す）。
2. `bash scripts/og-fonts/subset.sh` を実行する。
3. `npm run build` で確認し、フォントと `charset.txt` をコミットする。
