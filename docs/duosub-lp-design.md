# Duosub LP リニューアル デザイン仕様

- 対象: `app/service/products/duosub/page.tsx`（URL: `/service/products/duosub`）＋ 同ディレクトリの `page.module.css`
- 作成日: 2026-10-07
- 入力: `docs/duosub-lp-content.md`（第3版・CEO確認済み）。コピーはすべて同ドキュメントのとおりに使い、本書では書き換えない
- 次工程: homepage-builder
- 本書で作成・取得した素材は「§9 素材一覧」にまとめた

---

## 0. デザインの考え方

### コンセプト: 「字幕の画面が、そのままページになる」

現行LPが「AIが作ったのがバレバレ」に見える原因は次の3つ。どこかのテンプレートにある部品（色付き丸アイコン＋3カラム特徴、浮遊カード、bounce）でできていること、アプリと無関係な配色（Tailwindの緑・グレー・青）、実画面が小さいこと。

リニューアルでは**装飾の部品をLPの外から持ってこず、Duosubの字幕画面にある要素だけでページを組む。**

| アプリ画面の要素 | LPでの使い方 |
|---|---|
| 黒に近い背景（`#0F120F` / `#070707`） | ページの背景。セクションごとに2色を交互に使う |
| 字幕の行を区切る細い水平線 | ステップ、料金の項目、FAQを区切る線。カードの枠や影の代わりに使う |
| 行の上にある時刻表示（`0:00:12`） | セクションのアイブロウを時刻の形にする（`00:01` など、Inter・等幅数字）。字幕アプリらしい、ほかで見ないディテール |
| 再生中の行を上下から挟む緑の2本線 | 強調はこの「線」でする。色を塗った面は使わない |
| 英語の行と日本語の行の2段組 | H1の改行（1行目は白、2行目の「2行字幕」だけ緑）で「2行」をくり返し見せる |

緑（`#4BD254`）は「ここを見てほしい」の印だけに使い、面を塗らない。グラデーション、影、アイコンライブラリは使わない。そのぶん実画面（動画・スクショ）を大きく見せる。

### このLPでやらないこと（申し送りの再確認）

Tailwindデフォルト色（`#22c55e`・`gray-*`・`#3b82f6`・`#111827` など）、多色アイコン背景、lucide等の汎用アイコン、自作SVGアイコン群、bounce／pulse等の繰り返しアニメーション、大きいドロップシャドウ、グラデーション（背景・文字・ボタンすべて）、「おすすめ」バッジ、取り消し線の価格、チェックマークの羅列、浮遊カード、絵文字、配信サービスの名前・ロゴ・画面、自作ストアボタン、「！」。

---

## 1. カラートークン

### 1.1 定義（`page.module.css` の `.root` に置く。グローバルの `:root` には入れない）

PitDock本体（`globals.css`）のトークンとは混ぜない。接頭辞を `--ds-` にして、このLPの中だけで使う。

```css
.root {
  /* ===== 背景（アプリ定義色が起点: lib/constants.dart:152-160） ===== */
  --ds-bg:           #0F120F; /* アプリの背景。FV・画面の見方以外の奇数セクション */
  --ds-bg-deep:      #070707; /* アプリの暗い背景。交互セクション・最終CTA・フッター */
  --ds-surface:      #171A17; /* 料金カード・タブの土台。--ds-bg を少し明るくした派生色 */
  --ds-surface-2:    #1F1F1F; /* アプリの明るい背景。ホバー時など、もう一段上の面 */

  /* ===== 線 ===== */
  --ds-line:         #2C2E2C; /* 白12%相当。区切り線・カードの枠 */
  --ds-line-strong:  #5C5E5C; /* 白32%相当。端末シェルの外枠、フォーカスしていない入力枠など */

  /* ===== 文字 ===== */
  --ds-text:         #E7E7E7; /* 白90%相当。見出し・本文 */
  --ds-text-sub:     #CFD0CF; /* 白80%相当。リード・本文の補助 */
  --ds-text-muted:   #9B9B9B; /* アプリのグレー文字。注記・アイブロウ・時刻 */

  /* ===== メイン（CEO確定 D-1: ロゴタイプの緑） ===== */
  --ds-green:        #4BD254;
  --ds-green-hover:  #6BDC72; /* リンクのホバーのみ */
  --ds-on-green:     #0F120F; /* 緑の上に置く文字（番号マーカー・アクティブタブ） */

  /* ===== アプリ画面を描くときだけ使う緑 ===== */
  --ds-green-app:    #06C168; /* PiP図解の点線枠・再生中の行の線・「…」。LPの部品には使わない */

  /* ===== アクセント（1色） ===== */
  --ds-accent:       #F2E14C; /* 字幕の黄色。「無料」に関わる事実だけに使う（§1.3） */

  /* ===== 角丸 ===== */
  --ds-radius-sm:    8px;   /* 番号マーカー以外の小要素・料金ラベル */
  --ds-radius-md:    12px;  /* タブの土台・動画の枠 */
  --ds-radius-lg:    20px;  /* 料金カード */
  --ds-radius-phone: 44px;  /* 端末シェル（外側） */

  background: var(--ds-bg);
  color: var(--ds-text);
}
```

### 1.2 コントラスト（WCAG 2.x 相対輝度で計算）

| 前景 | `--ds-bg` #0F120F | `--ds-bg-deep` #070707 | `--ds-surface-2` #1F1F1F | 判定 |
|---|---|---|---|---|
| `--ds-text` #E7E7E7 | 15.25 | 16.29 | 13.33 | AAA |
| `--ds-text-sub` #CFD0CF | 12.19 | 13.02 | 10.66 | AAA |
| `--ds-text-muted` #9B9B9B | 6.78 | 7.25 | 5.93 | AA（13px の注記でも可） |
| `--ds-green` #4BD254 | 9.56 | 10.21 | 8.36 | AAA。文字色に使ってよい |
| `--ds-accent` #F2E14C | 14.05 | 15.01 | 12.28 | AAA |
| `--ds-on-green` #0F120F on `--ds-green` | 9.56 | — | — | AAA |

- **白文字を緑の上に置かない**（白 on `#4BD254` は 1.97 で不合格）。緑の面に載せる文字は必ず `--ds-on-green`
- `--ds-line` は 1.38:1 で、装飾の区切り線にだけ使う。情報を持つ境界（タブの枠、フォーカス）は `--ds-line-strong`（2.88:1）以上か緑を使う
- `#808080` 未満のグレーは文字に使わない（`#7A7A7A` で 4.39:1 となり AA 未満）

### 1.3 色の使い分けルール

| 色 | 使う場所（これ以外では使わない） |
|---|---|
| `--ds-green` #4BD254 | H1の「2行字幕」、アイブロウの短い線、セクション2の注釈番号と引き出し線、PiP図解のラベル線、使い方のアクティブタブ、各タブのステップ3の上下の線、FAQの開閉マーク、フォーカスリング、テキストリンク |
| `--ds-green-app` #06C168 | PiP図解の中（アプリ画面を再現する部分）だけ |
| `--ds-accent` #F2E14C | 「無料」に関わる事実の3か所だけ: FVのCTA直下「無料で始められます」、料金カードの「初回登録の方は、最初の1か月無料」ラベル、料金の小見出し「0円」の「無料」プラン名。黄色を見たら無料の話、と覚えられるようにする |

**2つの緑が並ぶ問題（申し送りの確認事項）:** スクショ・動画の中の緑は `#06C168`（やや青み）、LPの緑は `#4BD254`（やや黄み）で、両者のコントラスト比は 1.20 とほぼ同じ明るさ。OGPのドラフトで並べて確認したところ、別の色には見えず「同じブランドの緑」として馴染んだ。ただし**スクショのすぐ横の線は `#4BD254`、スクショの中の線は `#06C168`** となって、同じ太さの線が並ぶと色の差がわずかに見える。そのため、セクション2の引き出し線は1.5px、スクショ内の線は2pxと太さを変え、別の要素だと分かるようにする。

---

## 2. タイポグラフィ

### 2.1 フォント

サイト全体で読み込み済みの **Noto Sans JP（400/500/700/900）＋ Inter（400/600/700）** をそのまま使う（`app/layout.tsx:64`）。追加のフォント読み込みはしない。

- 和文: Noto Sans JP
- 数字・時刻・英字ラベル: Inter（`font-variant-numeric: tabular-nums`）
- **見出しには `font-feature-settings: "palt" 1` を必ず付ける。** 和文の約物と仮名の字間が詰まり、「、」「。」で間延びしない。デザインされた見出しに見えるかどうかは、ほぼこれで決まる
- 本文には `palt` を付けない（読みやすさを優先して等幅のまま）

### 2.2 スケール

| 役割 | クラス名 | モバイル（〜767px） | デスクトップ（1024px〜） | weight | line-height | letter-spacing | 色 |
|---|---|---|---|---|---|---|---|
| H1 | `.h1` | 34px | 56px（`clamp(34px, 4.4vw + 12px, 56px)`） | 700 | 1.3 | -0.01em | `--ds-text` |
| H2 | `.h2` | 26px | 40px（`clamp(26px, 2.6vw + 14px, 40px)`） | 700 | 1.4 | -0.005em | `--ds-text` |
| H3（タブ内の小見出し） | `.h3` | 20px | 24px | 700 | 1.5 | 0 | `--ds-text` |
| ステップ見出し | `.stepTitle` | 17px | 18px | 700 | 1.5 | 0 | `--ds-text` |
| リード | `.lead` | 16px | 18px | 400 | 1.85 | 0.02em | `--ds-text-sub` |
| 本文 | `.body` | 15px | 16px | 400 | 1.85 | 0.02em | `--ds-text-sub` |
| 注記 | `.note` | 13px | 13px | 400 | 1.7 | 0.02em | `--ds-text-muted` |
| アイブロウ | `.eyebrow` | 12px Inter | 12px Inter | 600 | 1 | 0.08em | `--ds-text-muted` |
| 価格の数字 | `.priceNum` | 44px Inter | 52px Inter | 700 | 1 | -0.02em | `--ds-text` |

- H1・H2は `palt` 付き、`text-wrap: balance`
- 和文の改行位置を崩さないため、H1・H2・リードは**文節ごとに `<span className={s.nb}>` で包む**（`.nb { display: inline-block; }`）。例: `<span class="nb">いつもの</span><span class="nb">海外ドラマを、</span>`。これで「ドラ／マ」のような泣き別れを防ぐ
- 「！」は使わない（コピーに含まれていないことを確認済み）

### 2.3 アイブロウ（セクション番号）

各セクションのH2の上に、字幕の時刻表示に似せた番号を置く。

```
[緑の線 16×2px] 00:01  画面の見方
```

- 構造: `<p class="eyebrow"><span class="eyebrowBar" aria-hidden="true"></span><span class="eyebrowTime">00:01</span>画面の見方</p>`
- `.eyebrowBar`: 幅16px・高さ2px・`--ds-green`・右余白10px・`vertical-align: middle`
- `.eyebrowTime`: Inter 600・`tabular-nums`・`--ds-text`・右余白10px
- 続く和文ラベルはNoto Sans JP 500 12px `--ds-text-muted`、`letter-spacing: 0.08em`
- 割り当て: 00:01 画面の見方／00:02 使い方／00:03 料金／00:04 よくある質問。FVと最終CTAには付けない
- アイブロウのラベルはH2の言い換えにならない語にしている。ただしコピーの追加にあたるため、不要ならラベルを消して番号だけにしてよい（§11 確認事項 Q-5）

---

## 3. レイアウトの基本

| 項目 | 値 |
|---|---|
| ブレークポイント | Mobile 〜767px／Tablet 768–1023px／Desktop 1024px〜（サイト共通に合わせる） |
| コンテナ | `max-width: 1120px; margin: 0 auto; padding: 0 20px`（Tablet 32px／Desktop 40px） |
| 本文カラムの最大幅 | 680px（リード・FAQ・料金の補足） |
| セクションの上下余白 | Mobile 72px／Tablet 96px／Desktop 120px |
| H2ブロック → 本体 | Mobile 40px／Desktop 56px |
| アイブロウ → H2 | 16px |
| H2 → リード | 16px（Desktop 20px） |
| 背景の交互 | FV `--ds-bg` → 画面の見方 `--ds-bg-deep` → 使い方 `--ds-bg` → 料金 `--ds-bg-deep` → FAQ `--ds-bg` → 最終CTA `--ds-bg-deep` → フッター `--ds-bg-deep`（上に1px `--ds-line`） |
| 見出しの揃え | FVはモバイル中央・デスクトップ左揃え。その他のセクションのH2ブロックは中央揃え |

セクションの境目は背景色の切り替えだけで表し、線や波形の区切りは入れない。

---

## 4. 共通コンポーネント

### 4.1 ストアバッジ（`StoreBadges`）

Apple／Google公式の日本語バッジ。このLPのCTAはこれだけ。

| | App Store | Google Play |
|---|---|---|
| ファイル | `/images/products/Duosub/badge-appstore-ja.svg` | `/images/products/Duosub/badge-googleplay-ja-trimmed.png` |
| 原寸 | 108.85×40（SVG） | 646×192（公式PNG 646×250 の上下の透明余白29pxずつだけを切り取ったもの。図柄は無加工） |
| alt | `App Storeからダウンロード` | `Google Play で手に入れよう` |
| リンク | `https://apps.apple.com/jp/app/id6507464076` | `https://play.google.com/store/apps/details?id=com.gows.duosub&hl=ja` |

- **高さを揃える。** 標準 48px（App Store 幅130.6px／Google Play 幅161.5px）。ヘッダーと固定バーは 40px（Appleの画面上の最小高さ40pxを守る）
- 並べるときの間隔: 12px（高さ48pxの1/4。Googleの余白規定「バッジの高さの1/4以上」）。周囲にも12px以上の余白を確保する
- `display: flex; flex-wrap: wrap; gap: 12px;`。320px幅の端末では2段に折り返してよい（375px以上なら1行に収まる: 130.6＋12＋161.5＝304px）
- 揃え: FVはモバイル中央・デスクトップ左、その他は中央
- ホバー: `opacity: 0.85`（150ms）。拡大・影・色の変化はつけない（バッジの改変にあたるため）
- フォーカス: `outline: 2px solid var(--ds-green); outline-offset: 4px; border-radius: 10px;`
- リンクは `target="_blank" rel="noopener noreferrer"`。`<a>` の中に視覚的に隠した「（新しいタブで開きます）」を入れる
- `next/image` を使う場合、SVGは `unoptimized` を付ける。`<img>` で直接書いてもよい
- 元の公式PNG（余白付き）も `badge-googleplay-ja.png` として保存してある。トリミングをしたくない場合はこちらを使い、表示高さを `48 × 250 / 192 = 62.5px`、上下マージンを `-7.25px` にして本体の高さを揃える

### 4.2 端末シェル（`PhoneShell`）: FVのヒーロー動画用

ヒーロー動画は画面録画で、端末の外枠がない。スクショ（セクション2）は端末フレーム付きなので、FVも同じ見た目に揃えるためCSSで外枠を作る。

```css
.phone {
  position: relative;
  width: 100%;
  aspect-ratio: 720 / 1280;     /* 中身の比率。外枠の padding は box-sizing で外に足す */
  box-sizing: content-box;
  padding: 10px;
  border: 1.5px solid var(--ds-line-strong);
  border-radius: var(--ds-radius-phone);   /* 44px */
  background: #000;
}
.phone video,
.phone img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 34px;
  background: #000;
}
```

影・光彩・傾きはつけない（スクショの端末フレームと同じく線だけで描く）。

### 4.3 動画の一時停止ボタン（`VideoToggle`）

自動再生でループする動画は5秒を超えるため、WCAG 2.2.2 により止める手段が必要。

- 位置: `.phone` の右下、`right: 20px; bottom: 20px;`
- サイズ: 44×44px、`border-radius: 50%`
- 見た目: `background: rgba(7,7,7,0.72); border: 1px solid var(--ds-line-strong);`
- 中の記号はCSSかインラインSVGで描く単純な形（アイコンライブラリは使わない）
  - 再生中: 一時停止の2本線（各 4×14px、間隔4px、`--ds-text`）
  - 停止中: 右向き三角（14×16px、`--ds-text`）
- `aria-label`: 再生中「動画を一時停止」／停止中「動画を再生」。`aria-pressed` は使わず、ラベルを切り替える
- フォーカス: 緑2pxのアウトライン、offset 3px

### 4.4 番号マーカー（`Marker`）

セクション2の注釈番号とモバイルの注釈リストで使う。

- 22×22px、`border-radius: 50%`、`background: var(--ds-green)`、`color: var(--ds-on-green)`
- Inter 700 12px、中央揃え、`tabular-nums`
- 画像の上に置くときは `transform: translate(-50%, -50%)`、外周に `box-shadow: 0 0 0 3px #070707`（背景色と同じ色のリング。影ではなく縁取りとして使う）

### 4.5 区切り線リスト（`RuleList`）

ステップ・料金の項目・FAQで共通に使う、字幕の行のような区切り方。

```css
.ruleList > li {
  padding: 16px 0;
  border-top: 1px solid var(--ds-line);
}
.ruleList > li:last-child {
  border-bottom: 1px solid var(--ds-line);
}
```

カードの枠・背景・影でまとめず、水平線で区切る。

### 4.6 テキストリンク

本文中のリンクはFAQの中だけで使う想定。`color: var(--ds-green); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px;`、ホバーで `--ds-green-hover`。

### 4.7 フォーカス（全体）

`:focus-visible { outline: 2px solid var(--ds-green); outline-offset: 3px; }`。`outline: none` だけで消すことはしない。

---

## 5. ヘッダー

| | モバイル | デスクトップ |
|---|---|---|
| 高さ | 56px | 72px |
| 左 | Duosubロゴ 高さ24px | ロゴ 高さ28px |
| 右 | なし | ストアバッジ 高さ40px（§4.1） |
| 背景 | `--ds-bg`（FVと同じ色。境界線なし） | 同左 |
| 固定 | しない（`position: static`） | しない |

- ロゴは新しく作った透過版 **`/images/products/Duosub/duosub-logo.png`**（901×250、透過PNG）を使う。元の `Duosub_logo.png` は背景が `#000` で塗られており、`#0F120F` の上に置くと黒い箱が見えるため使わない
- `alt="Duosub"`、`priority`
- ロゴは `<a href="/service/products/duosub">` にしない（LPの中で自分自身へのリンクは不要）。`<div>` のままでよい

---

## 6. セクション別仕様

### 6.1 セクション1: ファーストビュー

**モバイル（縦積み・中央揃え）**

```
[ヘッダー 56px]
  ↓ 24px
H1        いつもの海外ドラマを、
          2行字幕で。            ← 「2行字幕」だけ --ds-green
  ↓ 16px
サブ      英語と日本語の字幕を同時に表示。意味を追いながら、耳は英語に慣れていく。
  ↓ 12px
対応表記  映画・ドラマ・YouTube ／ iPhone・Android
  ↓ 24px
[App Store][Google Play]  ← 48px
  ↓ 10px
注記      無料で始められます   ← --ds-accent
  ↓ 40px
[端末シェル＋ヒーロー動画]  ← 幅 min(80vw, 320px)、中央
  ↓ 72px
```

**デスクトップ（1024px〜）**

- `display: grid; grid-template-columns: 1fr 360px; column-gap: 80px; align-items: center;`
- 左: H1〜注記（左揃え）。右: 端末シェル（幅360px → 中身の高さ 640px）
- 上余白 48px、下余白 120px
- Tablet（768–1023px）はモバイルと同じ縦積みで、端末シェルの幅を 340px にする

**要素の詳細**

| 要素 | 仕様 |
|---|---|
| H1 | §2.2の `.h1`。`<h1><span class="nb">いつもの</span><span class="nb">海外ドラマを、</span><br/><span class="nb"><em class="h1Em">2行字幕</em>で。</span></h1>`。`.h1Em { font-style: normal; color: var(--ds-green); }`。2行目は必ず改行させる（英語の行と日本語の行の2段組を見出しでも見せるため） |
| サブ | `.lead`。モバイル16px／デスクトップ18px。最大幅 30em |
| 対応表記 | Inter＋Noto 13px 500、`--ds-text-muted`、`letter-spacing: 0.04em`。区切りの「／」の前後は全角スペースではなく `margin: 0 0.5em` |
| ストアバッジ | §4.1、48px |
| 注記「無料で始められます」 | 13px 500、`--ds-accent` |
| 動画 | §6.1.1 |

#### 6.1.1 ヒーロー動画

| 項目 | 仕様 |
|---|---|
| ファイル | **`/images/products/Duosub/hero-loop.mp4`**（本工程で作成。720×1280・H.264・約1.0Mbps・31.5秒・**音声トラックなし**・3.9MB） |
| 元ファイルとの違い | 元の `Duosubヒーロー動画.mp4`（34.7秒・6.5MB・音声あり）の **31.5秒以降を切り落とした**。31.8秒付近から最後まで「無料ダウンロードはプロフィールから」というSNS投稿用の締めのテロップが出ており、LPでは意味が通らないため（§11 Q-1でCEO確認） |
| ポスター | **`/images/products/Duosub/hero-poster.webp`**（720×1280、31KB）。動画の21.0秒のフレーム。英語＋日本語の2行字幕が表示され、再生中の行が緑の枠で囲まれた場面。冒頭のフレーム（画面がぼかされている）は使わない |
| 属性 | `muted autoPlay loop playsInline preload="auto" poster=...`、`disablePictureInPicture`、`controls` は付けない |
| 読み込み | ポスターをLCPにする。`<link rel="preload" as="image" href="/images/products/Duosub/hero-poster.webp" fetchPriority="high">` を出す。`<source>` は `useEffect` でマウント後に差し込み、初回描画を動画のダウンロードで遅らせない |
| reduced motion | `prefers-reduced-motion: reduce` のときは `autoPlay` を付けず、ポスターだけを見せる。§4.3のボタンは「動画を再生」の状態で表示し、押せば再生できる |
| 一時停止 | §4.3のボタンを右下に置く |
| alt | `<video aria-label="Duosubで動画を再生中の画面。英語字幕の下に日本語字幕が同時に表示されている">` |
| WebM | 本工程の環境ではVP9でエンコードできなかったため作っていない。用意する場合は `<source type="video/webm">` を先に置く（任意） |

### 6.2 セクション2: 画面の見方

背景 `--ds-bg-deep`。

**H2ブロック（中央揃え）**
- アイブロウ `00:01 画面の見方`
- H2「上に英語、下に日本語。」
- リード2行（`.lead`）: 1行目と2行目の間は `<br/>`。モバイルでも2行のまま

**スクショと注釈**

画像: `/images/products/Duosub/app-screenshot.png`（1378×2674、透過）。`next/image`、`sizes="(min-width: 1024px) 360px, min(80vw, 320px)"`、alt「Duosubの字幕画面。上に動画、下に英語と日本語の字幕が行ごとに並び、再生中の行が緑の線で挟まれている」。

注釈の位置（画像の箱に対する％。モバイル・デスクトップ共通の座標）:

| # | 注釈テキスト | アンカー x | アンカー y | 指している場所 | デスクトップでの配置 |
|---|---|---|---|---|---|
| 1 | 英語の字幕 | 6% | 40.2% | 1行目の英語「EVERY PERSON, PLACE…」の行頭の左（端末のベゼル上） | 左側 |
| 2 | 日本語の字幕（機械翻訳） | 6% | 45.2% | 1行目の日本語「私たちが知っている…」の行頭の左 | 左側 |
| 3 | いま流れているセリフ。動画に合わせて進む | 94% | 52.4% | 再生中の行の上の緑の線の右端 | 右側 |
| 4 | タップでAIの和訳と、単語ごとの意味 | 94% | 61.6% | 再生中の行の右端の「…」の右（ベゼル上） | 右側 |

- コンテンツ仕様の例示は「EVERY MEMORY WE MAKE.」の行だったが、その行は③④（緑の線と「…」）と縦に近すぎるので、①②は1行目を指すようにした。どちらも同じ見た目の英語／日本語の行なので、伝わる内容は変わらない
- 座標は画像を目視で計測した値。実装後に実画面で±1%の範囲で微調整してよい

**モバイル（〜1023px）**

```
[スクショ 幅 min(80vw, 320px)、中央]
  └ 画像の上に番号マーカー①〜④（§4.4）をアンカー位置に置く
  ↓ 28px
<ol> 番号付きリスト（左揃え、最大幅 400px、中央に寄せる）
  ①  英語の字幕
  ②  日本語の字幕（機械翻訳）
  ③  いま流れているセリフ。動画に合わせて進む
  ④  タップでAIの和訳と、単語ごとの意味
  ↓ 24px
補足行（中央）  英語だけの字幕モードも選べます。
```

- リスト: 各 `li` は `display: grid; grid-template-columns: 22px 1fr; gap: 12px; align-items: start;`、行間 14px、15px `--ds-text`
- 引き出し線はモバイルでは描かない（線が細かくなりすぎるため。申し送りの代替案を採用）

**デスクトップ（1024px〜）**

```
| 注釈①② (240px, 右揃え) | ― 線 ―● | スクショ 360px | ●― 線 ― | 注釈③④ (240px, 左揃え) |
```

- 番号マーカーは使わず、アンカーに直径6pxの緑の点、そこから水平に1.5pxの緑の線を引き、線の先にラベルを置く
- ラベル: 番号（Inter 600 13px `--ds-green`、右余白8px）＋本文（15px 500 `--ds-text`、最大幅 220px、2行まで）
- 線の長さ: アンカーから画像の外へ、ラベルとの間に16pxの余白を残す長さ

**実装方法（ソースは1つの `<ol>`）**

注釈は1つの `<ol>` で書き、モバイルではリスト、デスクトップでは各 `li` を画像の上に絶対配置する。読み上げの順番がどちらでも同じになる。

```tsx
const ANNOTATIONS = [
  { n: 1, text: "英語の字幕", x: 6, y: 40.2, side: "left" },
  { n: 2, text: "日本語の字幕（機械翻訳）", x: 6, y: 45.2, side: "left" },
  { n: 3, text: "いま流れているセリフ。動画に合わせて進む", x: 94, y: 52.4, side: "right" },
  { n: 4, text: "タップでAIの和訳と、単語ごとの意味", x: 94, y: 61.6, side: "right" },
] as const;
// li に style={{ "--x": `${x}%`, "--y": `${y}%` }} と data-side を渡す
```

```css
/* 画像の上の番号マーカー（モバイル） */
.shotWrap { position: relative; }
.shotMarker { position: absolute; left: var(--x); top: var(--y); transform: translate(-50%, -50%); }

@media (min-width: 1024px) {
  .shotMarker { display: none; }
  .annoList { position: absolute; inset: 0; margin: 0; padding: 0; list-style: none; }
  .annoList li { position: absolute; top: var(--y); transform: translateY(-50%); display: flex; align-items: center; }
  .annoList li[data-side="left"]  { right: calc(100% - var(--x)); flex-direction: row-reverse; } /* 線は右端がアンカー */
  .annoList li[data-side="right"] { left: var(--x); }
  .annoDot  { width: 6px; height: 6px; border-radius: 50%; background: var(--ds-green); flex: none; }
  .annoLine { width: 62px; height: 1.5px; background: var(--ds-green); flex: none; }
  .annoText { padding: 0 16px; max-width: 220px; }
  /* 線の長さ 62px = アンカーから画像の端まで（360px × 6% ≒ 22px）＋ 画像の外に 40px。
     アンカーは左右とも端から6%なので、左右で同じ長さになる。li の中身の順番は [dot][line][text] */
}
```

- 補足行「英語だけの字幕モードも選べます。」: 14px `--ds-text-muted`、中央、画像の下 40px

### 6.3 セクション3: 使い方

背景 `--ds-bg`。

**H2ブロック（中央揃え）**: アイブロウ `00:02 使い方`／H2「動画はいつものアプリで。字幕はDuosubで。」（`。` の後で改行してよい。モバイルは2行になる）／リード（`.lead`）

**タブ（`role="tablist"`）**

| 項目 | 仕様 |
|---|---|
| 配置 | H2ブロックの下 40px。モバイルは横幅いっぱい、デスクトップは幅 440px で中央 |
| 土台 | `background: var(--ds-surface); border: 1px solid var(--ds-line-strong); border-radius: var(--ds-radius-md); padding: 4px; display: grid; grid-template-columns: 1fr 1fr;` |
| タブ | 高さ 48px、`border-radius: 9px`、15px 700、`--ds-text-sub`。ラベルは「映画・ドラマ」「YouTube」 |
| アクティブ | `background: var(--ds-green); color: var(--ds-on-green);` |
| ホバー（非アクティブ） | `color: var(--ds-text); background: var(--ds-surface-2);` |
| 切替の動き | パネルを `opacity` 0→1、150ms。高さのアニメーションはしない。reduced motion では切替の動きなし |
| ARIA | `role="tab"`・`aria-selected`・`aria-controls`、パネルは `role="tabpanel"`・`aria-labelledby`・`tabIndex={0}`。左右の矢印キーで移動し、Home／End で端へ。非アクティブのタブは `tabIndex={-1}` |
| 初期 | 「映画・ドラマ」 |
| パネルの上余白 | タブの下 48px（デスクトップ 64px） |

#### タブA: 映画・ドラマ

**構成（モバイル）**

```
H3      動画アプリを小窓にして、字幕の上に重ねる。
  ↓ 12px
PiPの説明（.body、2文）
  ↓ 28px
[PiP図解 SVG  幅100%、最大 400px、中央]
  ↓ 40px
ステップ 1〜3（RuleList）
  ↓ 16px
補足（.note） スマホを横にすると、動画を左、字幕を右に並べて見られます。
  ↓ 8px
注記（.note） PiPに対応した動画アプリと一緒に使えます。Duosubは特定の動画配信サービスと提携しているわけではありません。
  ↓ 40px
動画ブロック（見出し＋動画）
```

**構成（デスクトップ）**: 2段に分ける。

1. 1段目（中央・最大幅 680px）: H3（中央）→ PiPの説明（中央）→ PiP図解（幅 420px、中央）。図解をこのLPで一番大きい図として、1段を使って見せる
2. 2段目（上余白 72px）: `grid-template-columns: 1fr 300px; column-gap: 64px; align-items: start;`。左にステップ・補足・注記、右に動画ブロック（申し送りの「デスクトップではステップの横」に従う）

**ステップ（`<ol class="ruleList steps">`）**

各 `li`:
```
STEP 1                              ← Inter 600 12px tabular、--ds-text-muted、letter-spacing .08em（字幕行の時刻表示の位置）
字幕を取得する                        ← .stepTitle
Duosubで作品名を検索。日本語の…       ← .body
```
- `li` の padding 20px 0。番号の丸は使わない（区切り線と「STEP 1」の時刻風ラベルで十分。丸数字を並べるとテンプレート感が出る）
- 3つ目のステップ「セリフに合う行をタップ」の `li` だけ、上下の線を `--ds-green-app` ではなく **`--ds-green` 2px** にする。アプリの「再生中の行を緑の線で挟む」見た目を、Duosubで一番大事な操作（行のタップで同期）に重ねる。強調はここ1か所だけ

**PiP図解**: §7

**動画ブロック**

| 項目 | 仕様 |
|---|---|
| 見出し | 「実際の操作を見る（約1分45秒）」15px 700 `--ds-text`、動画の上 12px。`<h4>` ではなく `<p>`（見出しの階層を増やさない） |
| ファイル | `/images/products/Duosub使い方_映画・ドラマ.mp4`（1080×1920、1分44秒、音声あり） |
| ポスター | **`/images/products/Duosub/howto-poster.webp`**（720×1280、55KB）。動画の7.0秒のフレーム「▶What's『Duosub』?」の場面。「！」も効果の断定も含まない（申し送りの推奨案1） |
| 枠 | `border-radius: var(--ds-radius-md); overflow: hidden; border: 1px solid var(--ds-line);`。端末シェルは使わない（動画の中に端末の絵が入っているため二重になる） |
| サイズ | モバイル 幅 min(100%, 320px) 中央／デスクトップ 300px |
| 属性 | `controls preload="metadata" playsInline poster=...`、自動再生しない |
| 開始位置 | `src` に `#t=4.5` を付け、冒頭のタイトル画面（0〜4.5秒、既存サムネと同じ「英語が身につく！」の画面）を飛ばして再生を始める（申し送りの案3を併用） |
| 字幕・説明 | 動画の下に注記は足さない |

**注意: この動画には配信サービスのアイコンが映っている。** 13〜21秒付近と45秒付近（「STEP4：ホーム画面」）に、実在する配信サービス5社のアプリアイコンが映り、23〜40秒付近（STEP1〜3）には特定の配信アプリの画面が映っている。コンテンツ方針（B-9: 配信サービス名は例示も含めて出さない）と矛盾するため、§11 Q-2 でCEOに確認する。LP側のデザインでは隠せない。

#### タブB: YouTube

**構成（モバイル）**

```
H3      Duosubの中で、そのまま再生。
  ↓ 12px
リード（.body） 通学中に、好きな海外YouTuberの動画を。字幕は動画に合わせて自動で流れます。
  ↓ 28px
[スクショ切り抜き 幅 min(80vw, 320px)、中央]
  ↓ 40px
ステップ 1〜3（RuleList、STEP 1 ラベルはタブAと同じ）
  ↓ 16px
注記（.note） 英語字幕（自動生成を含む）が付いている動画で使えます。
```

**デスクトップ**: H3・リードは中央（最大幅 680px）。その下に `grid-template-columns: 1fr 320px; column-gap: 64px; align-items: start;` で左にステップと注記、右に切り抜き画像。タブAの2段目と同じ格子なので、タブを切り替えても左右の位置が変わらない。

**切り抜き画像**: **`/images/products/Duosub/app-screenshot-youtube.png`**（1378×1960、透過。本工程で作成）。`app-screenshot.png` の上から1960pxまで。上部のYouTubeプレイヤー（中に「EVERY MEMORY WE MAKE.」の字幕）と、緑の線に挟まれた再生中の行「EVERY MEMORY WE MAKE.／私たちが作るすべての思い出。」までが入る。下端は端末の途中で水平に切れる（フェードはしない。グラデーション禁止のため）。alt「DuosubでYouTubeを再生中の画面。動画の中の字幕と、下の再生中の行が同じセリフになっている」。

ステップ3の `li` は、タブAと同じく上下の線を `--ds-green` 2px にする（行のタップで動画がそのシーンに戻る、が同じ操作のため）。

### 6.4 セクション4: 料金

背景 `--ds-bg-deep`。

**H2ブロック（中央）**: アイブロウ `00:03 料金`／H2「料金」／リード（2文。モバイルでは2文目の前で改行）

**カード2枚**

- 配置: モバイル縦積み（gap 16px）、768px以上で `grid-template-columns: 1fr 1fr; gap: 24px; max-width: 880px; margin: 0 auto;`
- 2枚の見た目は同じにする（背景・枠・角丸・余白すべて同一。片方だけ色を変えない、浮かせない）

```css
.planCard {
  background: var(--ds-surface);
  border: 1px solid var(--ds-line);
  border-radius: var(--ds-radius-lg);  /* 20px */
  padding: 28px 24px;                   /* Desktop 36px 32px */
  display: flex; flex-direction: column;
}
```

**カードの中身（上から）**

| 要素 | 無料 | チケット無制限プラン |
|---|---|---|
| プラン名 | 「無料」16px 700 **`--ds-accent`** | 「チケット無制限プラン」16px 700 `--ds-text` |
| 価格（名前の下 12px） | `<span class="priceNum">0</span><span class="priceUnit">円</span>` | `<span class="pricePrefix">月額</span><span class="priceNum">300</span><span class="priceUnit">円（税込）</span>` |
| ラベル（価格の下 12px） | なし | 「初回登録の方は、最初の1か月無料」 |
| 項目（上 24px） | RuleList 5項目 | RuleList 2項目 |
| 補足（上 20px、`margin-top: auto` で下に寄せる） | `.note` | `.note` |

- `.priceUnit` / `.pricePrefix`: 16px 500 `--ds-text-sub`、数字とのベースライン揃え（`display: inline-flex; align-items: baseline; gap: 4px`）
- ラベル: `display: inline-block; font-size: 13px; font-weight: 700; color: var(--ds-accent); border: 1px solid rgba(242,225,76,0.45); border-radius: var(--ds-radius-sm); padding: 4px 10px;`。塗りは使わない。「おすすめ」型のバッジに見せないため、角丸は8pxでピル型にしない
- 項目（RuleList）: 15px `--ds-text`、padding 12px 0。チェックマーク・アイコンは付けない
- 無料カードの2つ目「字幕1本の取得に使うチケット」は、中を2段にする:
  ```
  字幕1本の取得に使うチケット
  英語のみ  1枚      英語＋日本語  3枚       ← 13px --ds-text-muted のラベル＋ Inter 600 15px --ds-text の数字
  映画・ドラマもYouTubeも同じ                ← .note
  ```
- 無料カードの補足のうち「無料でも、勝手に流れる広告はありません。」の一文だけ `--ds-text-sub` にして、ほかの注記（`--ds-text-muted`）より一段明るくする。警戒を解く一番の事実なので、読み飛ばされないようにする（太字・色は使わない）
- 2枚のカードの高さは揃える（grid のデフォルト `stretch`）

**CTA**: カードの下 40px にストアバッジ（48px、中央）

### 6.5 セクション5: よくある質問

背景 `--ds-bg`。

- アイブロウ `00:04 よくある質問`／H2「よくある質問」
- H2の下に**AIO向けの定義文**を置く（コンテンツ仕様§4の置き場所候補のうち「FAQの冒頭」を採用）: 「Duosubは、映画・ドラマ・YouTubeを英語字幕と日本語字幕の2行で同時に表示できる、iPhone・Android向けの英語学習アプリです。」15px `--ds-text-sub`、中央、最大幅 640px。FVは対応表記を短いまま保つため、定義文はこちらに置く
- 質問はQ1〜Q8の**8問すべて**を載せる（任意のQ6〜Q8も、検索クエリに近い疑問で回答も短いため）
- アコーディオンは既存の `FaqAccordion`（PitDock本体のデザイン）ではなく、このLP専用に `<details>` / `<summary>` で作る

```
.faqList   max-width: 760px; margin: 40px auto 0; border-top: 1px solid var(--ds-line);
.faqItem   border-bottom: 1px solid var(--ds-line);
summary    display: grid; grid-template-columns: 1fr 20px; gap: 16px; align-items: center;
           padding: 20px 0; min-height: 44px; cursor: pointer; list-style: none;
           16px 700 --ds-text（Desktop 17px）、palt
           ::-webkit-details-marker { display: none; }
開閉マーク  20×20px の箱に、CSSで描いた 12×1.5px の横棒と縦棒（--ds-green）。開いたら縦棒を transform: scaleY(0)。150ms。reduced motion では即時
回答       padding: 0 36px 24px 0; 15px --ds-text-sub、line-height 1.9
```

- 質問の頭に「Q.」は付けない（区切り線とウェイト差で質問だと分かる）
- 初期状態: Q1だけ `open`
- Q5の回答にある「設定」→［自分の名前］→「サブスクリプション」のような操作手順は、そのままの文章で載せる（矢印記号「→」は本文のまま）

### 6.6 セクション6: 最終CTA

背景 `--ds-bg-deep`、上下余白 Mobile 96px／Desktop 144px、中央揃え。

```
[アプリアイコン 64×64、角丸 14px]   /images/products/Duosub/duosub-icon.webp、alt=""（装飾。直後に見出しがあるため）
  ↓ 24px
H2   今夜の1話から、2行字幕で。      ← .h2。「2行字幕」だけ --ds-green
  ↓ 16px
サブ 累計ダウンロード数 約5,000（2026年10月時点・iOS／Android合計）。iPhone・Androidで使えます。   ← .note、中央
  ↓ 32px
[ストアバッジ 48px]
```

ボタン・矢印・装飾・背景の模様は置かない。

### 6.7 フッター

既存の `LpProductFooter` を流用し、コンテンツ仕様のとおりタグラインとリンクを変える。そのうえで、配色を合わせるために次の変更が必要。

1. **`variant="duosub"` を追加する。** 既存の `default` は `#22c55e`（Tailwindの緑）と `#111827`／`#9ca3af`／`#6b7280`／`#d1d5db`（Tailwindのグレー）でできているため、このLPでは使えない。ほかのLP（Gentle Diary 等）が `default` を使っている可能性があるので、`default` は変えずに新しいvariantを足す
   ```css
   .footerDuosub {
     --lp-accent: #4BD254;
     --lp-accent-rgb: 75, 210, 84;
     background: #070707;
     border-top: 1px solid #2C2E2C;   /* 3pxの緑の帯はやめる */
   }
   /* default でハードコードされているグレーを上書きする */
   .footerDuosub .lpFooterTagline,
   .footerDuosub .lpFooterLink        { color: #CFD0CF; }
   .footerDuosub .lpFooterCopy,
   .footerDuosub .lpFooterNote        { color: #9B9B9B; }
   ```
   （実際のセレクタ名はモジュール内のクラスに合わせること。目的は「Tailwindのグレーが1つも残らないこと」）
2. **`appStoreUrl` / `googlePlayUrl` を渡さない。** フッターのストアボタンは自作ボタン＋汎用アイコン（`IconDownload`）で、このLPの禁止事項にあたる。すぐ上の最終CTAに公式バッジがあるので、フッターには置かない（どちらのpropも未指定ならボタン列は描画されない実装になっている）
3. SNSアイコン（X／Instagram／YouTube）は各社のロゴなので汎用アイコンにはあたらない。現行どおり
4. アイコンは `iconSrc="/images/products/Duosub/duosub-icon.webp"` に直す（現行の `/images/products/duosub-icon.webp` は旧パス）

### 6.8 モバイルの固定ストアバー（採用）

コンテンツ仕様の補足提案を採用する。LPのゴールがストア遷移で、FVのバッジを過ぎたあと最終CTAまでの距離が長いため。

| 項目 | 仕様 |
|---|---|
| 対象 | 〜767px のみ |
| 位置 | `position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;` |
| 見た目 | `background: rgba(15,18,15,0.94); backdrop-filter: blur(12px); border-top: 1px solid var(--ds-line);` `padding: 10px 16px calc(10px + env(safe-area-inset-bottom));` |
| 中身 | ストアバッジ 高さ40px、中央、gap 12px。文言は足さない |
| 表示条件 | ページ内のどのバッジ列（FV・料金・最終CTA）も画面に入っていないときだけ表示。`IntersectionObserver` で3つのバッジ列を監視する |
| 出入り | `transform: translateY(100%)` ↔ `0`、200ms ease-out。reduced motion では `display` の切替だけ |
| 非表示中 | `visibility: hidden` と `aria-hidden="true"`（フォーカスが当たらないように） |
| 重なり対策 | 最終CTAのバッジ列が見えている間は非表示になるので、ページ末尾（最終CTA・フッター）には重ならない。FAQなど途中のセクションでは最下部の約60pxがバーに隠れるが、スクロールで読めるため余白の追加はしない |

---

## 7. PiP図解

このLPで一番重要なビジュアル。**リファレンスSVG: `docs/duosub-pip-diagram.svg`**（本工程で作成。座標・色・文言はこのファイルが正）。

### 7.1 構成（4要素＋ラベル）

| 要素 | 仕様（viewBox 0 0 520 760） |
|---|---|
| スマホ外形 | `rect x10 y10 w330 h740 rx52`、塗り `#070707`、線 `--ds-line-strong` 2px。画面 `rect x22 y22 w306 h716 rx42` `#000`。ノッチ `rect x125 y22 w100 h22 rx11` |
| PiPの設置枠 | `rect x38 y66 w274 h154 rx14`（16:9）、塗りなし、線 `--ds-green-app` 2px、`stroke-dasharray="7 6"`。アプリ（`picture_in_picture_placeholder.dart`）と同じ「緑の点線・角丸」 |
| 動画アプリの小窓 | `rect x44 y72 w262 h142 rx10`、塗り `#2C302C`。**点線枠の内側に6px余らせて重ねる**（ぴったり同じ大きさだと点線が隠れて、「枠に重ねる」ことが伝わらないため）。中央に再生の三角（`#E7E7E7` 85%）、下にシークバー（全体 `#E7E7E7` 25%、再生済み 70%）。実在のサービスの画面・ロゴは描かない |
| 字幕の行×3 | スクショの行と同じ並び: 時計の印（線で描いた円＋針）と時刻（Inter 13、`--ds-text-muted`）→ 英語の行（14〜15、`--ds-text`、大文字）→ 日本語の行（13〜14、`--ds-text-sub`）→ 右端の「…」（`--ds-green-app`）。2行目が再生中で、上下を `--ds-green-app` 2px の線で挟む。文はスクショと同じ「EVERY MEMORY WE MAKE.／私たちが作るすべての思い出。」ほか |
| ラベル | 「動画アプリ／PiPの小窓」→小窓を指す。「Duosub／2行の字幕」→再生中の行を指す。直径8pxの点＋1.5pxの水平線（`--ds-green`）。矢印は使わない。主ラベル 22 700 `--ds-text`、副ラベル 17 `--ds-text-muted` |

### 7.2 実装

- **TSXにインライン化する**（`<img>` で読み込まない）。理由: ①色をCSS変数（`--ds-*`）で管理できる、②文字がフォント（Noto Sans JP / Inter）で描かれ、ページと揃う、③軽い
- `role="img"`、`<title>`／`<desc>` は `aria-labelledby` でつなぐ（リファレンスSVGのとおり）。`<title>`「ピクチャーインピクチャーの使い方の図」、`<desc>`「スマホのDuosub画面の上部にある緑の点線の枠に、動画アプリの小窓を重ねる。その下に英語と日本語の字幕が流れる。」
- `useId()` でIDの重複を防ぐ
- 表示幅: モバイル 100%（最大 400px）、デスクトップ 420px。`width: 100%; height: auto;`
- モバイル（幅343px時）の縮尺は約0.66倍で、主ラベルが約14.5px、副ラベルが約11px。副ラベルが小さいので、**〜767pxでは副ラベルの `<text>` に `font-size: 19` を上書き**して12.5px相当にする（`@media` でSVG内の `.pipSubLabel` に指定）
- アニメーションはつけない（「小窓が枠に入る」動きは使い方動画が見せる）

### 7.3 「あれば良くなるもの」について

実機でPiP窓を点線枠に重ねたキャプチャがあれば図解より説得力が出る（コンテンツ仕様§6）。用意できた場合は、図解はそのまま残し、動画ブロックの代わりにではなく図解の横（デスクトップ）／下（モバイル）に並べる。今回は依頼しない。

---

## 8. 動画の扱い（まとめ）

| | ヒーロー動画 | 使い方動画 |
|---|---|---|
| ファイル | `/images/products/Duosub/hero-loop.mp4` | `/images/products/Duosub使い方_映画・ドラマ.mp4`（現状のまま） |
| ポスター | `/images/products/Duosub/hero-poster.webp`（21.0秒） | `/images/products/Duosub/howto-poster.webp`（7.0秒） |
| 再生 | muted・autoplay・loop・playsInline、controlsなし | controls・自動再生なし・`preload="metadata"`・`#t=4.5` から |
| 音声 | トラックを削除済み | あり（ユーザーが再生したときだけ鳴る） |
| 一時停止 | 自作ボタン（§4.3） | ブラウザ標準のcontrols |
| reduced motion | 自動再生しない。ポスターを表示 | 影響なし（自動再生しないため） |
| 使わないもの | 元の `Duosub/Duosubヒーロー動画.mp4`（LPからは参照しない。削除するかはCEO判断） | 既存サムネ `Duosub使い方_映画・ドラマ_サムネ.jpg` |

---

## 9. 素材一覧（本工程で作成・取得したもの）

すべて `public/images/products/Duosub/` 配下。

| ファイル | 内容 | 作り方 |
|---|---|---|
| `badge-appstore-ja.svg` | App Store 公式日本語バッジ（黒、108.85×40） | Apple Marketing Tools（`https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/ja-jp`）から取得。無加工 |
| `badge-googleplay-ja.png` | Google Play 公式日本語バッジ（646×250、上下に透明余白あり） | `https://play.google.com/intl/en_us/badges/static/images/badges/ja_badge_web_generic.png` から取得。無加工 |
| `badge-googleplay-ja-trimmed.png` | 上記の上下の透明余白（各29px）だけを切り取ったもの（646×192） | 図柄・色・縁は無加工。高さ揃え用 |
| `duosub-logo.png` | Duosubロゴの透過版（901×250） | `Duosub_logo.png` の黒背景を透過に変換し、余白を詰めた。色は元のまま |
| `hero-loop.mp4` | ヒーロー動画のLP用（31.5秒、音声なし、720×1280、約1.0Mbps、3.9MB） | 元動画の0〜31.5秒を再エンコード |
| `hero-poster.webp` | ヒーロー動画のポスター（21.0秒のフレーム、720×1280、31KB） | フレーム書き出し |
| `howto-poster.webp` | 使い方動画のポスター（7.0秒のフレーム、720×1280、55KB） | フレーム書き出し |
| `app-screenshot-youtube.png` | YouTubeタブ用の切り抜き（1378×1960、透過） | `app-screenshot.png` の上部を切り抜き |
| `ogp.png` | OGP画像（1200×630、286KB） | §10 |

参照のみ（docs配下）: `docs/duosub-pip-diagram.svg`（PiP図解のリファレンス）

**ストアバッジの利用条件（実装・運用時の注意）**
- Apple: バッジの色・形・文言を変えない。周囲に余白を取る。画面上の高さは40px以上。アプリの他のボタンより目立たせすぎない（今回はほかのボタンがないので問題なし）
- Google: バッジを改変しない。周囲にバッジの高さの1/4以上の余白。並べるときはApp Storeのバッジと同じ高さにする。Webで使う場合、ページのどこかに「Google Play および Google Play ロゴは Google LLC の商標です。」の表記が推奨されている（§11 Q-6）

---

## 10. OGP画像

**`/images/products/Duosub/ogp.png`（1200×630、PNG、286KB）を作成した。** コンテンツ仕様§6の仕様どおり。

| 項目 | 実際の値 |
|---|---|
| 背景 | `#0F120F` 単色 |
| ロゴ | 透過版 `duosub-logo.png`、高さ48px、左80px・上124px |
| H1 | 「いつもの海外ドラマを、／2行字幕で。」Noto Sans JP Bold 58px、字間 -0.02em。白90%（`#E7E7E7`）、「2行字幕」だけ `#4BD254`（アクセントはこの1か所） |
| サブ | 「英語と日本語の字幕を同時に表示」Noto Sans JP Regular 25px、`#9B9B9B` |
| 右側 | `app-screenshot.png` を0.31倍（幅427px）、右端から56px、上44px。上部の動画枠と、緑の線に挟まれた「EVERY MEMORY WE MAKE.／私たちが作るすべての思い出。」まで見え、下は画像の外に切れる |
| 安全領域 | 文字とロゴは外周から80px以上内側（文字の範囲は x80〜664、y124〜448） |
| 載せていないもの | 「！」、ダウンロード数、価格、ストアバッジ、配信サービス名、作品名 |

実装: `createPageMetadata` の `image: "/images/products/Duosub/ogp.png"`、`imageAlt: "英語字幕と日本語字幕が同時に表示されたDuosubのアプリ画面"`。

---

## 11. CEOへの確認事項

| # | 確認事項 | 背景 | 本書の仮置き |
|---|---|---|---|
| Q-1 | ヒーロー動画の末尾（31.8秒〜）を切ってよいか | 元の動画は最後の約3秒で「無料ダウンロードはプロフィールから」と表示する。SNS投稿用の締めで、LPでは「プロフィール」が何を指すのか分からない | 31.5秒で切った `hero-loop.mp4` を作成し、仕様はこれを使う前提で書いた。不可なら元動画に戻す |
| Q-2 | 使い方動画に映っている配信サービスのアイコンと画面をどうするか | 13〜21秒付近と45秒付近に実在の配信サービス5社のアプリアイコン（名前入り）、23〜40秒付近に特定の配信アプリの画面が映る。コンテンツ方針 B-9「配信サービス名は例示も含めて出さない」とLP内で矛盾する。また、それぞれのロゴを無断でLPに載せることになる | 現状の動画をそのまま載せる仕様にした（差し替え不可の回答 C-2 があるため）。選択肢: (a) このまま載せる、(b) 使い方動画をLPから外し、PiP図解とステップだけにする、(c) 該当部分にぼかしを入れた版を作る（動画編集が必要） |
| Q-3 | 動画内の文言のトーン | 使い方動画の最後（98秒〜）に「ネイティブの英語力を楽しく身につけましょう」、ヒーロー動画（27〜31秒）に「好きな作品で英語学習」がある。前者は効果の断定に近い。CEO回答で「動画内の文言はLPのコピーではない」とされているため対象外として扱った | 対応なし（確認のみ） |
| Q-4 | 元のヒーロー動画ファイルの扱い | `Duosub/Duosubヒーロー動画.mp4`（6.5MB）はLPから参照しなくなる | 残したまま。削除はCEO判断 |
| Q-5 | セクション番号のラベル（00:01 画面の見方 など） | アイブロウの和文ラベルはコンテンツ仕様にない語の追加にあたる | 入れる。不要なら番号だけにする |
| Q-6 | Google Playの商標表記 | Googleのバッジガイドラインは、Webで使う場合に「Google Play および Google Play ロゴは Google LLC の商標です。」の表記を推奨している | 入れていない。入れる場合はフッターのコピーライトの上に11px `--ds-text-muted` で1行 |

---

## 12. homepage-builder への実装メモ

### 12.1 ファイル構成（推奨）

```
app/service/products/duosub/
  page.tsx                 … サーバーコンポーネント。メタデータ・JSON-LD・各セクション
  page.module.css          … 全面書き換え（現行のクラスはすべて廃止）
  _components/
    HeroVideo.tsx          … "use client"。遅延 source 差し込み、reduced motion、一時停止ボタン
    HowToTabs.tsx          … "use client"。ARIAタブ
    PipDiagram.tsx         … インラインSVG（サーバーで可）
    StoreBadges.tsx        … size: 48 | 40
    StickyStoreBar.tsx     … "use client"。IntersectionObserver
```

FAQは `<details>` なのでクライアントコンポーネント不要。

### 12.2 削除するもの

- `page.tsx` の自作SVGアイコン9種（`IconDownload` ほか）、`problemCards`、`contentTags`、数値帯・お悩み・解決バンド・特徴3カラム・浮遊カード・旧料金・旧ダウンロード帯のマークアップ
- `page.module.css` の既存クラスすべて（`textGreen600` 等、Tailwind色のハードコードを含む）
- `SCREENSHOT_PATH = "/images/products/app-screenshot.png"`（削除済みファイルへの参照。正しくは `/images/products/Duosub/app-screenshot.png`）
- `VIDEO_POSTER`（旧サムネ）、`FOOTER_ICON_URL` の旧パス

### 12.3 メタデータ・構造化データ

- title・description・OG・keywords はコンテンツ仕様§4のとおり。OG画像は `/images/products/Duosub/ogp.png`
- `softwareApplicationJsonLd` の `offers.description` を「無料（チケット制）。チケット無制限プランは月額300円（税込）、初回登録の方は最初の1か月無料。」に。`image` は `/images/products/Duosub/duosub-icon.webp` を推奨
- FAQPage: 既存の `faqPageJsonLd()` は引数を取らずサイト共通FAQを出す実装なので、**引数で質問と回答の配列を受け取れるようにする**か、このページ用の関数を足す。8問すべてを入れる。表示と同じ文言にすること
- 累計ダウンロード数・aggregateRating は入れない

### 12.4 画像の扱い

- `app-screenshot.png`（1.8MB）と `app-screenshot-youtube.png`（1.9MB）は `next/image` で読み込み、`sizes` を指定して自動で縮小・WebP化させる（`quality={85}`。字幕の文字がつぶれないよう80未満にしない）
- セクション2・3のスクショは `loading="lazy"`（既定）。FVだけ `priority`
- ポスター（`.webp`）は `<video poster>` に直接指定（`next/image` は通らない）

### 12.5 確認してほしいこと（実装後）

1. 375px・390px・430px幅でFVの並び、バッジが1行に収まること、320px幅で折り返しても崩れないこと
2. セクション2の番号マーカーが字幕の文字に重なっていないこと（座標の微調整は±1%まで）
3. タブのキーボード操作（Tab で入ってから ←→、Home／End）
4. `prefers-reduced-motion: reduce` でヒーロー動画が止まり、ポスターと「動画を再生」ボタンが出ること
5. 固定ストアバーが、FV・料金・最終CTAのバッジが見えている間は出ないこと
6. Lighthouse のアクセシビリティでコントラストの指摘が出ないこと（Tailwindのグレーがフッターに残っていると出る）
7. ページ内に `#22c55e`・`#3b82f6`・`#111827`・`#9ca3af`・`#6b7280`・`#d1d5db` が残っていないこと（grepで確認）
8. 配信サービス名が文字として1つも出ていないこと（コンテンツ仕様の禁止表現チェックと同じ）

---
---

# 改訂案（第2版）: 2026-10-07 実装後のCEOフィードバック対応

- ステータス: **改訂案（CEOの選択待ち）。** 承認されるまで第1版（§0〜§12）が正。コードは未変更
- 対象のフィードバック
  1. 「背景が黒だと少しAIっぽいから背景色を変えて」
  2. 「各ストアのボタンは何かしらの方法で常に表示されるようにしたい」
- 実装済みコード（`app/service/products/duosub/page.tsx`・`page.module.css`・`_components/*`、`app/components/LpProductFooter.module.css` の `.footerDuosub`）を確認したうえで書いている
- 変えないもの: メインカラー `#4BD254`、コピー、セクション構成、タイポグラフィ（§2）、Tailwindデフォルト色・グラデーション・大きい影・汎用アイコン・bounce/pulseの禁止

---

## R1. 背景配色の変更

### R1.1 前提: 明るい背景にすると何が変わるか

| 影響 | 内容 | 対応 |
|---|---|---|
| 緑は文字に使えなくなる | `#4BD254` は白系の背景に対して約1.8:1で、文字（4.5:1）にも、意味を持つ線や枠（3:1）にも足りない | 緑 `#4BD254` は**面（塗り）と装飾の線**に使い、その上の文字は濃い色にする。文字・リンク・意味を持つ線には、同じ色相を暗くした **`--ds-green-ink`** を使う |
| 黄色のアクセントも文字に使えない | `#F2E14C` は白系の背景に対して約1.2:1 | 文字色ではなく、**文字の下半分に敷く蛍光ペンのマーカー**にする（下記 R1.5） |
| アプリ画面を描く部分の色が反転してしまう | 実装済みの `PipDiagram` は、スマホの中の字幕の文字を `--ds-text`／`--ds-text-sub`／`--ds-text-muted` で塗っている。ページのトークンを明るい背景用に変えると、黒い画面の上の文字が暗くなって読めなくなる | アプリ画面専用のトークン **`--ds-app-*`** を新設し、ページの配色と切り離す（R1.6） |
| 黒いアプリ画面が浮かないか | スクショ（端末フレーム付き）とヒーロー動画を3案の背景に置いて確認した。どの案でも黒い端末が「製品写真」のように見え、黒背景の時よりむしろ画面が引き立つ。透過PNGのフレームの縁も白系の背景で問題なく見えた | 端末の外枠を持たないヒーロー動画は、§4.2の `.phone`（黒の内側余白10px）がそのままベゼルになるので構造の変更は不要 |

### R1.2 案A: 生成り（推奨）

暖かいオフホワイト。黒い端末と緑のロゴがいちばん素直に映える。白（`#FFFFFF`）ではなく少し黄みのある生成りにするのは、「SaaSのテンプレートの白」に見せないため。

| トークン | 値 | 用途 |
|---|---|---|
| `--ds-bg` | `#F7F5EF` | 基本の背景（FV・使い方・FAQ） |
| `--ds-bg-alt` | `#EEEBE2` | 交互の背景（画面の見方・料金・フッター）。第1版の `--ds-bg-deep` を置き換える |
| `--ds-surface` | `#FFFFFF` | 料金カード・タブの土台 |
| `--ds-surface-2` | `#F1EEE6` | ホバー |
| `--ds-line` | `#DCD8CD` | 区切り線（装飾） |
| `--ds-line-strong` | `#85817A` | タブの枠など、意味を持つ境界 |
| `--ds-text` | `#1A1C19` | 見出し・本文（わずかに緑みのある黒） |
| `--ds-text-sub` | `#3F443D` | リード・本文の補助 |
| `--ds-text-muted` | `#5F635B` | 注記・アイブロウ・時刻 |
| `--ds-green` | `#4BD254` | 面・マーカー・装飾の線（変更なし） |
| `--ds-green-ink` | `#1B7228` | 緑の文字・リンク・引き出し線・フォーカスリング・開閉マーク |
| `--ds-on-green` | `#0F120F` | 緑の面に載せる文字 |
| `--ds-accent` | `#F2E14C` | 「無料」の事実に敷くマーカー（塗りのみ） |
| `--ds-cta-bg` | `#4BD254` | 最終CTAセクションの背景（R1.4） |

コントラスト（WCAG 2.x）:

| 前景 | `#F7F5EF` | `#EEEBE2` | `#FFFFFF` | 判定 |
|---|---|---|---|---|
| `--ds-text` #1A1C19 | 15.74 | 14.39 | 17.16 | AAA |
| `--ds-text-sub` #3F443D | 9.15 | 8.37 | 9.97 | AAA |
| `--ds-text-muted` #5F635B | 5.63 | 5.15 | 6.14 | AA |
| `--ds-green-ink` #1B7228 | 約5.5 | 約5.1 | 6.03 | AA |
| `--ds-line-strong` #85817A（非テキスト） | 3.55 | 3.25 | 3.88 | 3:1以上 |
| `--ds-green` #4BD254（参考） | 1.81 | 1.65 | 1.97 | 文字・意味を持つ線には不可 |
| `--ds-text` on `--ds-green` | 8.70（緑の面の上） | | | AAA |
| `--ds-text` on `--ds-accent` | 12.79（マーカーの上） | | | AAA |

### R1.3 案B: 淡いグリーン

ブランドの緑をごく薄く敷いたミント系。ページ全体が「Duosubの色」になり、ほかのアプリLPとの区別がいちばんつく。

| トークン | 値 |
|---|---|
| `--ds-bg` | `#EEF6EC` |
| `--ds-bg-alt` | `#E1EEDD` |
| `--ds-surface` | `#FFFFFF` |
| `--ds-surface-2` | `#E8F2E5` |
| `--ds-line` | `#CFE0CA` |
| `--ds-line-strong` | `#74876F` |
| `--ds-text` | `#142016` |
| `--ds-text-sub` | `#36453A` |
| `--ds-text-muted` | `#52604F` |
| `--ds-green` / `--ds-green-ink` / `--ds-on-green` / `--ds-accent` | `#4BD254` / `#1A7026` / `#0F120F` / `#F2E14C` |

コントラスト: `--ds-text` 15.25（bg）／14.00（alt）、`--ds-text-sub` 9.20／8.45、`--ds-text-muted` 6.05／5.56、`--ds-green-ink` 5.61／5.16、`--ds-line-strong` 3.50／3.21。すべてAA以上（非テキストは3:1以上）。

- 弱点: 背景が緑寄りのため、マーカーや面に使う `#4BD254` との差が小さく、強調が効きにくい（`#4BD254` vs `#EEF6EC` は1.79:1）。ページ全体がやや単調になる
- Tailwindの `green-50`（`#F0FDF4`）・`emerald-50`（`#ECFDF5`）とは別の色にしてある

### R1.4 案C: 緑の面＋白（カラーブロック）

FV・使い方・最終CTAを `#4BD254` のベタ面、残りを白系にする。ストアのスクショのような、元気で目立つアプリ広告の方向。

| トークン | 緑のセクション | 白のセクション |
|---|---|---|
| 背景 | `#4BD254` | `#F7F7F2` |
| 面（カード） | `#FFFFFF` | `#FFFFFF` |
| `--ds-text` | `#0F120F`（9.56） | `#0F120F`（17.55） |
| `--ds-text-sub` | `#1C2A1D`（7.61） | `#1C2A1D`（13.98） |
| `--ds-text-muted` | `#24432A`（5.57） | `#5F635B`（5.71） |
| 強調・マーカー | `#0F120F` の線（緑の上で緑は使えない） | `#4BD254` のマーカー |
| `--ds-line-strong` | `#0F120F` | `#85817A`（3.61） |

- 弱点: 緑のセクションでは、番号マーカー・アクティブタブ・マーカーなど「緑で示す」仕組みがすべて使えず、セクションごとに強調の色が入れ替わる（実装・保守が重い）。緑の面が広いと目が疲れ、黒い端末と緑の組み合わせが強すぎて「広告」感が出る

### R1.5 推奨: 案A（生成り）＋最終CTAだけ緑の面

**理由**
1. **黒い実画面がいちばん映える。** 第1版のコンセプト「実画面を大きく見せる」を保ったまま、黒背景をやめられる。生成りの上の黒い端末は製品写真の見え方になり、アプリ画面が「主役」として浮き立つ
2. **緑が効く。** 背景が無彩色寄りなので、`#4BD254` のマーカー・番号・アクティブタブが少ない面積でも目に入る。案Bは緑同士で強調が弱まり、案Cは強調の仕組みがセクションごとに崩れる
3. **「AIっぽさ」から離れる。** 黒背景＋ネオン調の緑は、生成されたLPに多い組み合わせ。生成りの紙のような地は、手で組んだ印刷物の印象に寄る
4. **ブランドの緑は最後に面で見せる。** 最終CTAのセクションだけ背景を `#4BD254` にする。ページの最後でロゴの色が面として現れ、黒いストアバッジが緑の上でいちばん目立つ（バッジ `#000` vs `#4BD254` は10.21:1）。緑の面はこの1か所だけ

**案Aでのセクション背景**

| セクション | 第1版 | 改訂案 |
|---|---|---|
| ヘッダー | `--ds-bg` | `--ds-bg`（R2で固定化） |
| 1 ファーストビュー | `--ds-bg` | `--ds-bg` #F7F5EF |
| 2 画面の見方 | `--ds-bg-deep` | `--ds-bg-alt` #EEEBE2 |
| 3 使い方 | `--ds-bg` | `--ds-bg` |
| 4 料金 | `--ds-bg-deep` | `--ds-bg-alt` |
| 5 FAQ | `--ds-bg` | `--ds-bg` |
| 6 最終CTA | `--ds-bg-deep` | **`--ds-cta-bg` #4BD254** |
| フッター | `#070707` | `--ds-bg-alt` #EEEBE2（上に1px `--ds-line`） |

**案Aでの要素ごとの変更（緑・黄の使い方の置き換え）**

| 要素 | 第1版 | 改訂案 |
|---|---|---|
| H1「2行字幕」・最終CTAのH2「2行字幕」 | 緑の文字 | **緑のマーカー**: 文字色は `--ds-text` のまま、`box-shadow: inset 0 -0.38em 0 var(--ds-green); box-decoration-break: clone; -webkit-box-decoration-break: clone; padding: 0 0.04em;`。最終CTA（緑の面）の上では強調なし（文字だけ） |
| 「無料」の事実3か所（FVの注記・料金ラベル・プラン名「無料」） | 黄色の文字／黄色の枠 | **黄色のマーカー**（上と同じ指定で色だけ `--ds-accent`）。料金ラベルの枠線は廃止 |
| アイブロウの短い線 | 緑 | 緑のまま（装飾） |
| 番号マーカー（セクション2） | 緑の丸＋濃い数字、外側に `#070707` のリング | 緑の丸＋濃い数字のまま。リングの色を `var(--ds-bg-alt)` に（**実装で `#070707` 直書きになっている箇所**） |
| 引き出し線と点（セクション2・PiP図解のラベル） | 緑 | `--ds-green-ink`（意味を持つ線のため3:1が必要） |
| アクティブタブ | 緑の面＋濃い文字 | 緑の面＋濃い文字のまま。面と土台の差が1.97:1で3:1に足りないため、`box-shadow: inset 0 0 0 1.5px var(--ds-green-ink)` で内側に濃い縁を足す（緑vs縁 3.06:1、縁vs白 6.03:1） |
| ステップ3の上下の線 | 緑2px | 緑2pxのまま（装飾。ステップは文字で識別できる） |
| FAQの開閉マーク・テキストリンク・フォーカスリング | 緑 | `--ds-green-ink` |
| 料金カード | `--ds-surface` #171A17＋枠 | `#FFFFFF`＋1px `--ds-line`（影なし） |
| ヒーロー動画の一時停止ボタン | 半透明の黒 | 変更なし（黒い動画の上に載るため） |
| 端末シェル `.phone` | 外枠 `--ds-line-strong` | 外枠を `#1A1C19` 1.5px に。内側の黒い余白10pxがベゼルになる |
| 固定ストアバー | `rgba(15,18,15,0.94)` 直書き | R2.3 |

### R1.6 アプリ画面専用トークン（全案共通・必須）

ページの配色を変えてもアプリ画面の再現部分（PiP図解のスマホの中）は黒のまま保つため、トークンを分ける。

```css
.root {
  /* アプリ画面の再現専用（lib/constants.dart の値。ページの配色と連動させない） */
  --ds-app-body:      #070707; /* 端末の外形 */
  --ds-app-screen:    #000000;
  --ds-app-text:      #E7E7E7;
  --ds-app-text-sub:  #CFD0CF;
  --ds-app-muted:     #9B9B9B;
  --ds-app-line:      #2C2E2C;
  --ds-app-green:     #06C168; /* 第1版の --ds-green-app を改名 */
  --ds-app-pip:       #2C302C; /* PiPの小窓の塗り */
}
```

`page.module.css` の `.pipBody`・`.pipNotch`・`.pipText`・`.pipTextSub`・`.pipMuted`・`.pipMutedFill`・`.pipMutedStroke`・`.pipLine`・`.pipInk`（PiP小窓の再生アイコンなど）を `--ds-app-*` に付け替える。**スマホの外側にあるラベル**（「動画アプリ」「Duosub」と副ラベル）だけはページ側の `--ds-text`／`--ds-text-muted`、線と点は `--ds-green-ink` を使う。**現在の実装（`PipDiagram.tsx` 96〜108行）では、外側ラベルが内側の文字と同じ `.pipText`／`.pipMuted` を共有している**ので、外側ラベル用のクラス（例: `.pipLabel`／`.pipLabelSub`）を新設して分けること。点と線（`.pipGreenFill`／`.pipGreenStroke`）は `--ds-green-ink` に変える。

### R1.7 OGP画像

**背景も案Aに合わせて変えることを推奨する。** LPを開いた人が、SNSで見た画像と同じ見た目に着地できるため。

- （旧キャッチのドラフト `docs/duosub-ogp-v2-draft.png` は、R5で新キャッチの本番画像に置き換えたため削除済み）
- 変更点: 背景 `#F7F5EF`、H1・サブの文字 `#1A1C19`／`#3F443D`、「2行字幕」は文字色ではなく緑のマーカー（文字の下40%に `#4BD254`）。ロゴ・スクショの配置と大きさは第1版と同じ
- 確認したこと: 緑のロゴは生成りの上でも十分見える（ロゴはコントラスト基準の対象外）。黒い端末が右半分で強いアイキャッチになる
- X（ダークモード）のタイムラインでは明るいOGPのほうがむしろ目立つ。LINEのトークでも同様
- 案B・Cを選んだ場合は、同じレイアウトで背景と文字色だけ差し替えて作り直す（案Cは背景 `#4BD254`、文字 `#0F120F`、マーカーなし）
- 注意: SNS側にOGPのキャッシュが残るため、差し替え直後はXのCard Validatorなどで再取得させる

---

## R2. ストアバッジの常時表示

### R2.1 方針

| 画面幅 | 常に見える場所 | 理由 |
|---|---|---|
| 768px以上（タブレット・デスクトップ） | **画面上部に固定したヘッダーの右側**に、高さ40pxのバッジ2つ | ヘッダーに十分な幅がある（ロゴ約101px＋バッジ約256px）。上部固定は本文の邪魔をしない |
| 767px以下（モバイル） | **画面下部の固定バーを常に表示**（ページを開いた瞬間から） | 375px幅ではロゴと40pxのバッジ2つ（計約354px）がヘッダーの内寸（335px）に収まらない。下部は親指が届く位置 |

**第1版からの変更:** 現在の固定バーは「ページ内のバッジが見えている間は非表示」だが、これをやめて**常に表示**する。`IntersectionObserver` による出し入れ、`aria-hidden`／`inert` の切り替え、出入りのアニメーションはすべて削除する。

### R2.2 デスクトップ・タブレット: 固定ヘッダー

```css
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(247, 245, 239, 0.92); /* 案Aの --ds-bg。案B/Cは各案の bg に合わせる */
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--ds-line);  /* 影は使わない */
}
@media (min-width: 768px) {
  .headerInner { height: 72px; }        /* タブレットもデスクトップと同じ高さに */
  .headerBadges { display: flex; }      /* 第1版は 1024px〜 だったのを 768px〜 に */
}
```

- バッジ: 高さ40px（Appleの最小高さ）。間隔12px、上下の余白16px（Googleの「高さの1/4＝10px以上」を満たす）
- **FV内のバッジ（48px）はデスクトップでは残す。** ヘッダーのバッジはサイズも位置も離れているため二重には見えない。コピーのすぐ下のCTAは押される場所なので消さない
- ページ内のアンカー移動で見出しがヘッダーに隠れないよう、各セクションに `scroll-margin-top: 88px`（768px以上）
- モバイルのヘッダーは固定しない（`position: static`、ロゴのみ）。上下の両方に固定要素があると、本文の表示領域が狭くなりすぎるため

### R2.3 モバイル: 下部固定バー（常時表示）

| 項目 | 仕様 |
|---|---|
| 対象 | 〜767px |
| 位置 | `position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;` |
| 背景 | `rgba(247, 245, 239, 0.94)`（案Aの `--ds-bg`）＋`backdrop-filter: blur(12px)`、上に1px `--ds-line`。影なし |
| 余白 | `padding: 10px 16px calc(10px + env(safe-area-inset-bottom));` |
| 中身 | ストアバッジ 高さ40px・間隔12px・中央。文言は足さない |
| 高さ | 60px＋セーフエリア（iPhoneのホームバー付きで約94px） |
| 表示 | **常に表示。** 出し入れの判定・アニメーションなし |
| 要素 | `<aside aria-label="アプリのダウンロード">`。DOMの位置はフッターの直後（読み上げ・Tab順の最後） |
| 320px幅 | 109＋12＋135＝256pxで、内寸288pxに1行で収まる |

**ページ内バッジとの重複の整理（モバイル）**

| 場所 | 改訂案 | 理由 |
|---|---|---|
| FV | **バッジ列を消す**（`@media (max-width: 767px) { .heroBadges { display: none; } }`）。注記「無料で始められます」は対応表記の直下に残す | ページを開いた最初の画面で、FVのバッジと下部バーのバッジが縦に並んで二重になるのを防ぐ。消えた分だけヒーロー動画が上がり、実画面がファーストビューに入りやすくなる |
| 料金 | 残す | 料金を読んだ直後に押せる位置。下部バーと同時に見えるが、離れているので許容する |
| 最終CTA | 残す | ページの締めとして必要。緑の面の上でいちばん目立つ |

### R2.4 コンテンツ・フッターと重ねない

- **ページの最下部にバーの高さぶんの余白を確保する（モバイルのみ）。** フッターの後に、フッターと同じ背景色のスペーサーを置く:
  ```css
  .barSpacer { display: none; }
  @media (max-width: 767px) {
    .barSpacer {
      display: block;
      height: calc(60px + env(safe-area-inset-bottom));
      background: var(--ds-bg-alt); /* フッターと同じ色。案Aでは #EEEBE2 */
    }
  }
  ```
  これで、最後までスクロールしたときにフッターのコピーライトやSNSアイコンがバーの下に隠れない
- **固定ヘッダー（768px以上）はレイアウトの流れの中にある**（`position: sticky`）ので、FVに余白を足す必要はない
- ヒーロー動画の一時停止ボタン（端末シェルの右下）は、スクロール中に下部バーと重なることがあるが、ページを動かせば押せるので対策しない
- `env(safe-area-inset-bottom)` は、viewportに `viewport-fit=cover` がないと0になる。**`app/layout.tsx` には現在 viewport の指定がない**ので、Duosubのページ（`page.tsx` または `layout.tsx`）で `export const viewport: Viewport = { viewportFit: "cover" }` を追加する（このページだけに効く）

### R2.5 ガイドラインの確認

| 項目 | 基準 | 改訂案 |
|---|---|---|
| App Store 最小高さ（画面表示） | 40px以上 | ヘッダー・下部バーとも40px、ページ内48px |
| Google Play の周囲の余白 | バッジの高さの1/4以上 | 40pxのとき10px以上 → 間隔12px、バーの上下余白10px、ヘッダーの上下余白16px |
| 2つのバッジの高さ | 揃える | すべての場所で同じ高さ |
| バッジの改変 | 不可 | 変更なし（ホバーは透明度のみ） |
| 背景 | 指定なし（判読できること） | 黒いバッジ on 生成り・緑ともに十分なコントラスト |

---

## R3. homepage-builder への変更点（承認後に実装）

| ファイル | 変更 |
|---|---|
| `page.module.css` `.root` | トークンを選ばれた案の値に置き換え。`--ds-bg-deep` → `--ds-bg-alt` に改名、`--ds-green-ink`・`--ds-cta-bg`・`--ds-app-*` を追加、`--ds-green-app` → `--ds-app-green` に改名 |
| `page.module.css` 直書きの色 | `box-shadow: 0 0 0 3px #070707`（番号マーカー）、`.stickyBar` の `rgba(15,18,15,0.94)`、`.phone`/`.phoneMedia` の `#000`（これは黒のままでよい）を見直す |
| `page.module.css` 強調 | `.h1Em` などの緑の文字 → マーカー（R1.5の表）。黄色の文字・枠 → マーカー |
| `page.module.css` PiP | R1.6のとおりアプリ専用トークンへ付け替え、外側ラベル用クラスを分ける |
| `page.module.css` ヘッダー | `position: sticky`、半透明背景、768px以上でバッジ表示、高さ72px |
| `page.module.css` 下部バー | 出し入れ用のクラス（`.stickyBarVisible`、reduced motion の分岐）を削除し、常時表示に。`.barSpacer` を追加。`.heroBadges` をモバイルで非表示 |
| `_components/StickyStoreBar.tsx` | `"use client"`・`IntersectionObserver`・`useState` を削除し、`<aside>` を返すだけのサーバーコンポーネントにする |
| `_components/StoreBadges.tsx` | `observe` プロパティと `data-ds-badges` は不要になるので削除 |
| `page.tsx` | `observe` の指定を削除。フッターの後に `.barSpacer` を追加 |
| `app/components/LpProductFooter.module.css` `.footerDuosub` | 背景 `#EEEBE2`、文字 `#3F443D`／`#5F635B`、リンクのホバー `#1B7228`、枠 `#DCD8CD`、SNSボタンの面 `#FFFFFF`（案Aの場合） |
| `public/images/products/Duosub/ogp.png` | 差し替え済み（R5）。コードの変更は不要 |

---

## R4. CEOへの確認事項（第2版）

| # | 確認事項 | 推奨 |
|---|---|---|
| R-Q1 | 背景を案A（生成り）／案B（淡いグリーン）／案C（緑の面＋白）のどれにするか | 案A |
| R-Q2 | 最終CTAのセクションだけ背景を緑（`#4BD254`）の面にしてよいか | する |
| R-Q3 | OGP画像も新しい背景に合わせて差し替えるか | 差し替える（ドラフト作成済み） |
| R-Q4 | モバイルではFVのストアバッジ列を消し、下部の固定バーに任せてよいか | 消す |
| R-Q5 | フッターも明るい背景（`#EEEBE2`）にしてよいか | する |

---

## R5. CEO決定（2026-10-07）

| 項目 | 決定 |
|---|---|
| 背景 | **案A（生成り `#F7F5EF`／交互 `#EEEBE2`）を採用** |
| 最終CTA | **緑のベタ面（`#4BD254`）を採用** |
| フッター | **現状のダーク（`.footerDuosub`: `#070707` 系）のまま。** R1.5の表のフッター行と、R3の `LpProductFooter.module.css` の行は適用しない。R2.4のモバイル用スペーサー `.barSpacer` の背景は、フッターに合わせて `#070707` にする |
| ストアバッジの常時表示 | **R2のとおり採用** |
| OGP画像 | **ページと同じ生成りの背景で作り直し、新しいキャッチに変更**（下記） |

### R5.1 新しいOGP画像（差し替え済み）

`public/images/products/Duosub/ogp.png`（1200×630、PNG、295KB）を上書きした。メタデータのパスは同じなので、コードの変更は不要。`og:image:alt`「英語字幕と日本語字幕が同時に表示されたDuosubのアプリ画面」もそのまま使える。

| 項目 | 値 |
|---|---|
| 背景 | `#F7F5EF` 単色 |
| ロゴ | 透過版 `duosub-logo.png`、高さ48px、左80px・上112px |
| 見出し（3行） | 「映画もドラマも／YouTubeも、／英語と日本語の字幕で。」Noto Sans JP Bold 58px、字間 -0.02em、`#1A1C19`。行の上端 y=200／280／360 |
| 強調 | 「英語と日本語の字幕」の下に `#4BD254` の塗りのマーカー（高さ22px＝文字の下側約40%、文字幅＋左右3px）。文字色は `#1A1C19` のまま（マーカーの上で8.70:1）。緑を文字色には使っていない |
| サブ | 「2つの字幕を同時に表示 ／ iPhone・Android」Noto Sans JP Regular 25px、`#3F443D`（区切りの「／」だけ `#85817A`）、y=456 |
| 右側 | `app-screenshot.png` を0.31倍（幅427px）、右端から56px・上44px。下は画像の外に切れる（第1版と同じ） |
| 安全領域 | 文字とロゴは x80〜668、y112〜481。外周から80px以上内側。見出しの右端とスクショの間は49px |
| 載せていないもの | 「！」、ダウンロード数、価格、ストアバッジ、配信サービスの名前・ロゴ、作品名 |

- OGPのキャッチはLPのH1（「いつもの海外ドラマを、2行字幕で。」）とは異なる。CEOの指定による
- 差し替え直後はSNS側にキャッシュが残るため、XのCard Validatorなどで再取得させること
