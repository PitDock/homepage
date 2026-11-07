# /news/11 ラジオ出演のお知らせ デザイン仕様（デザイン工程の成果物）

作成: 2026-11-07 / 担当: web-designer / 次工程: homepage-builder
入力: `docs/news11-radio-content.md`（文言・リンク・テーブルの中身はすべてこれに従う）
参照: `app/news/10/page.tsx`、`app/news/newsArticle.module.css`、`app/news/4/page.tsx`、`app/components/sub/sub.module.css`、`docs/subpages-design-spec.md` §1・§6.5・§6.7・§8.8

---

## 0. 方針

- **/news/10 と同じ組み方にする。** 新しく作るのは Spotify 埋め込みプレイヤーの枠（`.player`）だけ。色・角丸・影・フォントは足さない。
- 理由: お知らせ詳細はどの記事も同じ形をしているほうが、読む人が迷わない。ラジオ出演も「事実を短く知らせる記事」なので、特別な見せ方は要らない。外部プレイヤーは Spotify 側のデザインで完結しているため、PitDock 側で枠線や背景を重ねない（二重の枠になり、うるさく見える）。
- 決定事項の反映
  - 番組名は「社長！あなたの〇〇教えてください。」（〇 は漢数字のゼロ U+3007）。コピー時に白丸「○」(U+25CB) が混ざらないよう注意する（§6 の受け入れ条件で grep する）。
  - テーブルは「配信日」だけ。「放送日」の行は作らない。
  - 画像（番組ロゴ・収録写真）は使わない。news4 の `pressFigures` は使わない。
  - ナビゲーター名は本文（`.body` の段落）に出さない。

---

## 1. ページ構成（上から順）

| # | ブロック | 使うもの | 中身 |
|---|---|---|---|
| 1 | ヒーロー | `PageHero`（`titleSize="long"`、`en` なし、`lead` なし） | パンくず: ホーム（`/`）> News（`/news`）> 金沢シーサイドFM出演 / タイトル: content §3 |
| 2 | 本文の枠 | `section.s.section > div.s.inner > article.ns.article` | /news/10 と同じ |
| 3 | 日付 | `p.ns.meta` | 2026年11月4日 |
| 4 | 本文 | `div.ns.body` に `<p>` 4つ | content §4 の P1〜P4 |
| 5 | 見出し「エピソードを聴く」 | `h2.ns.changeTableHeading` + Pマーク | /news/10「主な変更点」と同じ形 |
| 6 | 埋め込みプレイヤー | **新規** `div.ns.player > iframe.ns.playerFrame` | §3 |
| 7 | 見出し「番組情報」 | `h2.ns.changeTableHeading` + Pマーク | 同上 |
| 8 | 番組情報テーブル | `dl.s.dataTable.ns.changeTable` / 各行 `div.s.dataRow > dt.s.dataLabel + dd.s.dataValue` | content §6 の 9行（下記） |
| 9 | リンク | `ul.ns.linkList > li > a.s.textLink` | content §7 の 5本 |

- 本文 → プレイヤー → 番組情報 → リンクの順は content §5 の意図（読んだらそのまま聴ける）どおり。
- CtaBand は置かない（/news/10・/news/4 にもない。相談への導線はリンク「無料相談はこちら」で足りる）。

### 1.1 見出し

- 2つの h2 とも /news/10 の JSX をそのまま使う。
  ```tsx
  <h2 className={ns.changeTableHeading}>
    <img src="/brand/p-mark.svg" alt="" className={ns.pMark} width={36} height={30} />
    <span>エピソードを聴く</span>
  </h2>
  ```
- 値（既存のまま）: 20px / 1.5 / 700 / ink、gap 6px、上 60px・下 24px、Pマーク 30×25（`alt=""` で装飾扱い）。
- クラス名 `changeTableHeading` は「表の見出し」の名前だが、今回は名前を変えずに流用する（/news/10 に触らずに済むため）。名前の整理は今回の範囲外。
- 「エピソードを聴く」の見出しを付ける理由: プレイヤーが見出しなしで本文の下に来ると、本文の一部なのか広告なのか分かりにくい。またスクリーンリーダーで h2 から直接プレイヤーへ移動できる。

### 1.2 番組情報テーブル

- 構造は /news/10 の `dl` と同じ。ラベル列は `changeTable` の 160px（≤767px は 1列で縦積み、既存の CSS のまま）。
- 行（content §6 の順。値はテキストのみ、リンクにしない）

| dt | dd |
|---|---|
| 番組名 | 社長！あなたの〇〇教えてください。 |
| 放送局 | 金沢シーサイドFM |
| エピソード | PitDock株式会社 |
| テーマ | 技術と経営をつなぎ、企業の未来を切り拓くITコンサルティングに迫る！ |
| ゲスト | 代表取締役 小山望海 |
| ナビゲーター | 藍田隆希 |
| 配信日 | 2026年11月4日 |
| 再生時間 | 約16分 |
| 配信 | Spotify |

- 「テーマ」の値は長いので PC でも折り返すが、`dataValue` の 16px / 1.8 / 700 のままでよい（/news/10 の「ナビゲーション」行も同じくらいの長さで折り返している）。
- ナビゲーターの行は content §6 にあるので残す（決定事項は「本文に出さない」なので、表の行は対象外と解釈した。§7 Q1 で確認）。

### 1.3 リンク

- content §7 の順と文言のまま。外部の 2本（Spotify・金沢シーサイドFM）は `target="_blank" rel="noopener noreferrer"`。
- 外部リンクのアイコンは付けない（/news/4 の外部リンクにも付けていない。付けるならサイト全体の話になる）。
- 1本目「Spotifyで番組を聴く」は、プレイヤーが表示されないときの代わりも兼ねる（§3.4）。

---

## 2. 余白のまとめ（PC / ≤767px 共通、既存の値）

| 区間 | 値 | 出どころ |
|---|---|---|
| 日付の下の線 → 本文 | 32px | `.meta` |
| 本文 → 見出し「エピソードを聴く」 | 60px | `.changeTableHeading` margin-top |
| 見出し → プレイヤー | 24px | `.changeTableHeading` margin-bottom |
| プレイヤー → 見出し「番組情報」 | 60px | 同上 margin-top（`.player` には margin を付けない） |
| 見出し → テーブル | 24px | 同上 |
| テーブル → リンク | 40px | `.linkList` margin-top |
| リンクどうし | 12px | `.linkList` gap |

---

## 3. 埋め込みプレイヤー（新規）

### 3.1 JSX

```tsx
const SPOTIFY_EMBED_URL =
  "https://creators.spotify.com/pod/profile/3d3v64l385g/embed/episodes/PitDock-e3qtnbn";

<div className={ns.player}>
  <iframe
    className={ns.playerFrame}
    src={SPOTIFY_EMBED_URL}
    title="「社長！あなたの〇〇教えてください。」エピソード「PitDock株式会社」の音声プレイヤー"
    width="100%"
    height="102"
    loading="lazy"
    scrolling="no"
  />
</div>
```

- `title`: content §5 の文言のまま。スクリーンリーダーが iframe に入る前に何のプレイヤーかを読み上げるため必須。
- `loading="lazy"`: プレイヤーは本文の下にあり、最初の画面には入らないことが多い。外部の読み込みを後回しにして、記事の表示を速くする。
- `height="102"`: Spotify for Creators の埋め込みコードが指定している高さ（102px）。プレイヤーの中身はこの高さに合わせて作られているので、変えない。
- `scrolling="no"`: Spotify for Creators の公式の埋め込みコードと同じ。高さがわずかにずれたときにスクロールバーが出るのを防ぐ。
- `frameBorder` は使わず、CSS の `border: 0` で消す。
- `allow` と `sandbox` は付けない（公式の埋め込みコードに無い。`sandbox` を付けると再生できなくなるおそれがある）。
- 自動再生はしない（URL に autoplay 系のパラメータを付けない）。

### 3.2 CSS（`app/news/newsArticle.module.css` に追加）

```css
/* Spotify 埋め込みプレイヤー（/news/11、docs/news11-radio-design.md §3） */
.player {
  width: 100%;
  max-width: 640px;
}

.playerFrame {
  display: block;
  width: 100%;
  height: 102px;
  border: 0;
  border-radius: 0;
}
```

- `@media` の追加は不要（PC も SP も同じ指定で、幅だけ親に合わせて縮む）。

### 3.3 サイズ・形の理由

| 項目 | 値 | 理由 |
|---|---|---|
| 幅 | `100%`、最大 640px | 記事の枠は最大 1280px あり、いっぱいに伸ばすとシークバーだけが横に長くなって操作しにくい。640px は本文1行の半分程度で、左揃えの本文の流れの中に収まる。SP（375px 幅）では左右 24px を除いた 327px になる |
| 高さ | 102px 固定（全幅共通） | 埋め込み側の固定レイアウトに合わせる。縦横比で伸縮させると中身が切れるか余白が出る |
| 角丸 | 0（PitDock 側では付けない） | 下層ページは角丸なしのルール（subpages-design-spec §1.4）。プレイヤーの中身に角丸があっても、それは Spotify 側のデザインなので触らない |
| 枠線・背景・影 | なし | 外部プレイヤーは見た目が完結している。PitDock の罫線（dock-blue）で囲むと二重の枠になる |
| 左右の位置 | 左揃え | 本文・見出し・表がすべて左揃えのため |

### 3.4 読み込めなかったときの扱い

- iframe は別のドメインなので、読み込みに失敗したかどうかをページ側で確実に判定できない。JS で失敗を検知して差し替える仕組みは作らない。
- 代わりの手段は、リンクの 1本目「Spotifyで番組を聴く」（open.spotify.com）。プレイヤーが空白になっても、同じページの中で必ず聴きに行ける。
- プレイヤーの枠は高さ 102px のまま空く。背景色を付けないので、空いても白い余白に見えるだけで、壊れた印象は小さい。
- プレイヤーが無くても本文・テーブル・リンクで記事が成り立つ構成になっている（content §5）。将来プレイヤーを外す場合は、見出し「エピソードを聴く」と `.player` の2つを消すだけでよい。

---

## 4. メタデータ・一覧データ（デザインの範囲外、content のとおり）

- `metadata`: content §2 のとおり `createPageMetadata` で作る（/news/10 と同じ）。
- `lib/data/news.ts`: content §1 のエントリを追加。タグ「メディア掲載」は /news/4 などと同じ表示になる。
- OGP 画像は既存の共通のもの（`app/opengraph-image.tsx`）を使う。記事専用の画像は作らない（画像は使わない決定のため）。

---

## 5. アクセシビリティ

- 見出しは h1（PageHero）→ h2 ×2。h3 は使わない。
- Pマークは `alt=""`（装飾）。
- iframe に `title` を付ける（§3.1）。
- テーブルは `dl` / `dt` / `dd`（/news/10 と同じ）。
- 色は既存トークンのみ。新しい文字色はないので、コントラストは既存の確認済みの値のまま（ink 17:1、pit-blue 7.9:1、gray 6.3:1）。
- キーボード操作: Tab で iframe の中の再生ボタンに入れることを確認する（Spotify 側の作り次第。入れなくてもリンクで代わりになる）。

---

## 6. 受け入れ条件（homepage-builder 向け）

- [ ] `app/news/11/page.tsx` が /news/10 と同じ import（`SubPage` / `PageHero` / `sub.module.css` / `newsArticle.module.css`）で作られている
- [ ] `newsArticle.module.css` への追加は `.player` と `.playerFrame` だけで、既存のクラスの値が変わっていない（/news/10 の見た目が変わらない）
- [ ] 番組名の「〇〇」が U+3007 になっている（`grep -n "○" app/news/11/page.tsx lib/data/news.ts` で白丸が出てこない）
- [ ] テーブルに「放送日」の行がない。本文の段落にナビゲーター名がない
- [ ] iframe に `title` と `loading="lazy"` があり、自動再生しない
- [ ] 375px / 768px / 1024px / 1440px でプレイヤーが横にはみ出さず、横スクロールが出ない。PC では幅 640px で止まる
- [ ] 102px の高さでプレイヤーの中身が切れていない・スクロールバーが出ていない（目視。切れる場合は §7 Q3）
- [ ] 外部リンク 2本が新しいタブで開き、`rel="noopener noreferrer"` が付いている
- [ ] `npm run build` が通る

---

## 7. 確認事項（推測で決めていないもの）

| # | 内容 | 仮置き（回答がなければこれで実装） |
|---|---|---|
| Q1 | 決定事項「ナビゲーター名は本文に出さない」は、番組情報テーブルの「ナビゲーター」行も含めて出さない意味か | 本文の段落のみが対象。テーブルの行は content §6 どおり残す |
| Q2 | プレイヤーの直下に注記（13px / gray の `.note`）「プレーヤーが表示されない場合は、下の『Spotifyで番組を聴く』からお聴きいただけます。」を入れるか。文言が増えるので corporate-engagement-specialist / ユーザーの判断が必要 | 入れない（リンクで代わりになるため） |
| Q3 | Spotify for Creators のプレイヤーの実際の高さが 102px と合わない場合（中身が切れる・下に余白が出る） | 実測した高さに `height` 属性と `.playerFrame` の `height` を両方そろえて直す。ほかの値は変えない |
