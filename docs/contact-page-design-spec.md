# 無料相談ページ（/contact）デザイン仕様

最終更新: 2026-09-21
対象: `app/contact/page.tsx` / `app/contact/contact.module.css` / `app/components/FaqAccordion.tsx`（改修）/ `app/globals.css`（トークン追加）/ `app/page.module.css`（共通型の追加）
入力: `docs/contact-page-content-plan.md`（§3 構成案・§8.1 決定事項D1〜D12・確定済み）
準拠: `.claude/skills/web-design-system/design-spec.md`（フルリニューアル版・2026-08-11 確定）

本ドキュメントはデザイン仕様策定フェーズの成果物であり、実装コードの変更は含まない。
homepage-builder がこのドキュメント単体で実装に着手できる粒度で記述する。

---

## 0. サマリー

### 0.1 重点4論点への結論

| # | 論点 | 結論 |
|---|---|---|
| 1 | ページ長への対処 / アンカーCTA | Hero主CTA `相談フォームへ進む ↓` → `#form`、副次 `相談の流れを見る` → `#flow`。**スクロール追従CTAはモバイル（≤767px）のみ採用**、デスクトップは不採用。加えて中間セクションの縦余白を112px→**96px に圧縮**（`--space-section-compact` 新設）。Nav固定分の `scroll-margin-top` が全サイトで未設定という既存不具合も本ページで是正する |
| 2 | ご相談テーマのUI | **ピル型トグルチップ**（6個・flex wrap・min-height 48px）。`data-checked` 属性駆動で `:has()` 依存を回避。「まだ決まっていない・まとめて相談したい」は**同列・同サイズのまま、未選択時のみボーダー/背景をわずかに強める**（`data-emphasis`）。選択後のスタイルは他と完全に同一 |
| 3 | 希望日時欄 | **フリーテキスト1項目**（`<textarea rows=3>`・任意・決定事項E1最終版）。日付ピッカー＋時刻セレクトの構造化UIは全廃。「来週の火・水・木の午後ならいつでも」のような希望を1行で書ける。プレースホルダーに具体例3つを置き、自由記述の「何を書けばよいか」負荷を打ち消す。**新規CSSゼロ**（既存 `.textarea` を流用）、**バリデーションゼロ**、「日程は後日メールで調整したい」チェックも廃止（§4.6.6） |
| 4 | 安心バッジ / お約束カード | バッジは**絵文字禁止・1.5pxストロークのインラインSVG＋薄ボーダーのピル**（5点・wrap）。お約束カードは標準カード型（radius 20px）で、**カラーグロー・トップバー・番号・カテゴリ色分けを一切付けない**。装飾を「線1本＋アクセント1色」に制限することが軽薄化を防ぐ分水嶺 |

### 0.2 実装規模の見立て

- **既存トークン・既存クラスで実現できる**: Hero骨格、フォームの入力要素・カード外枠・送信ボタン、流れのステップ表現（`/partner` の型を移植）、送信完了アイコン、スクロールreveal
- **新規CSSが必要**: 安心バッジ、テーマチップ、タイムライン、お約束カードのアイコンボックス、スクロール追従CTA、成功画面の拡張（※希望日時欄は既存 `.textarea` の流用で新規CSS不要）
- **共通ファイルへの追加が必要**: `globals.css` に4トークン、`page.module.css` に `.eyebrow`（デザインシステム§5.4で型定義済みだが未実装）
- **コンポーネント改修**: `FaqAccordion.tsx` に props を追加（後方互換で可能・詳細は §4.7）

---

## 1. 設計方針

### 1.1 このページのデザイン上の役割

現行 `/contact` は「フォームだけのページ」であり、デザイン上の判断材料がほぼ存在しない。
改善後は **8セクションのランディングページ**になるため、デザインの役割は次の3つに変わる。

1. **スクロールさせずに済む人を、スクロールさせない**（論点1）
   意思が固まっている人にとって追加セクションは純粋なノイズ。Hero内で1タップ／1クリックでフォームに到達できる導線を最優先で確保する。
2. **フォームの操作数を、見た目でも減らす**（論点2・3）
   実際の操作数を減らすだけでなく、「見た瞬間に軽そう」と分かる見た目にする。5枠並んだ日時欄が与えていた圧迫感を、2枠＋追加ボタンで解消する。
3. **信頼感を、装飾ではなく"制約"で作る**（論点4）
   BtoBの相談ページで装飾を足すほど軽薄に見える。カラーバリエーション・グロー・アイコンの多用を意図的に禁じ、情報の階層とタイポグラフィのみで整える。

### 1.2 トーン

トップページ・サービスページと同一のダークネイビー基調を維持する。
`/partner` のようなページ固有色（アンバー）は**導入しない**。`/contact` はサイトの最終着地点であり、ブランド中核色（ブルーファミリー）のみで構成することが信頼感に直結する。

### 1.3 装飾の上限（本ページ共通ルール・実装時の判断基準）

以下は「迷ったらやらない」の基準として明記する。

| やってよい | やらない |
|---|---|
| 1.5pxストロークの線画SVGアイコン（単色 `currentColor`） | 絵文字アイコン（OS依存で色が破綻し、Hero・お約束など信頼が要る箇所を軽薄にする最大要因） |
| `--gradient-accent` を、ページ内で最大3箇所まで（送信完了アイコン／Hero主CTA／送信ボタン） | カードごとのカラーグロー、カテゴリ色分け |
| ボーダー1色（`--color-border` / `--color-accent`）による面の区切り | `::before` のトップバー装飾（`.problemCard` 型）をカードに付けること |
| hover時の `translateY(-4px)` + border-color変化 | クリックできない情報カードへのhover演出（押せると誤認させる） |

---

## 2. デザイントークン

### 2.1 既存トークンで足りるもの（追加不要）

`app/globals.css` の既存 `:root` をそのまま使う。本ページで使用する主なもの:

```
背景    : --color-bg (#070B14) / --color-bg-secondary (#0C1220) / --color-surface (#121A2E)
アクセント: --color-accent (#4F8EF7) / --gradient-accent / --gradient-accent-onlight
テキスト : --color-text (#F4F7FF) / --color-text-sub (#B7C4E6) / --color-muted (#57628A)
ボーダー : --color-border (#223055) / --color-border-strong (#2E4166)
タグ    : --color-tag-bg / --color-tag-text
機能色   : --color-danger (#F87171)
角丸    : --radius-sm(8) / --radius-btn(10) / --radius-md(14) / --radius-lg(20) / --radius-xl(28) / --radius-pill
余白    : --space-section(112) / --space-section-mobile(72) / --space-card-pad(40) / --space-card-pad-mobile(28) / --space-card-gap(28)
```

### 2.2 新規に追加するトークン（`app/globals.css` の `:root` に追記）

```css
  /* ===== 補助テキスト用（WCAG AA適合・§2.3参照） ===== */
  --color-text-help: #8C9AC0;
    /* --color-muted(#57628A) は --color-bg 上で約3.27:1 しかなく AA(4.5:1) 未達。
       フォームのヘルパーテキスト・注記・プレースホルダーなど「読ませる補助文」には
       本トークン(約7.07:1)を使う。--color-muted はパンくず等の装飾用途に限定する */

  /* ===== 中間セクション用の圧縮スペーシング（§3.2参照） ===== */
  --space-section-compact:        96px;
  --space-section-compact-mobile: 64px;
    /* 8セクション構成のLPで --space-section(112px) をそのまま全セクションに適用すると
       ページ全長が過剰になる。説明系セクションのみ圧縮する用途 */

  /* ===== 固定要素のレイヤー ===== */
  --z-sticky-cta: 90;
    /* Nav(.nav) の z-index:100 より必ず下。モバイル追従CTAがNavメニューを覆わないため */
```

追加は以上4つのみ。ページ固有色は**追加しない**。

### 2.3 コントラスト検証（WCAG 2.1 相対輝度式で算出）

| 前景 | 背景 | 比 | 判定 |
|---|---|---|---|
| `--color-text` #F4F7FF | `--color-bg` #070B14 | 約19.0:1 | AAA |
| `--color-text-sub` #B7C4E6 | `--color-bg` | 約10.8:1 | AAA |
| `--color-text-help` #8C9AC0（新規） | `--color-bg` | 約 **7.07:1** | AAA（本文サイズでも可） |
| `--color-muted` #57628A | `--color-bg` | 約 **3.27:1** | **AA未達**。装飾・非必須テキストのみ |
| `--color-accent` #4F8EF7 | `--color-bg` | 約5.7:1 | AA |
| `--color-danger` #F87171 | `--color-bg` | 約7.4:1 | AAA |
| #FFFFFF | `--gradient-accent` の明端 #2B93D6 | 約3.36:1 | **AA未達**（既知・デザインシステム§12.6） |
| #FFFFFF | `--gradient-accent-onlight` の明端 #1B6FB0 | 4.5:1以上 | AA |

**運用ルール**:
- 既存の `.btnPrimary` / `.submitBtn`（`--gradient-accent`）は、デザインシステム§12.6で「ダーク背景上に単体で置かれるボタンは対象外・変更しない」と確定済みのため**本仕様でも変更しない**。
- **新規に追加する固定CTA（スクロール追従CTA）は `--gradient-accent-onlight` を使う**。小さく密度の高い固定バー内のテキストは可読性の要求が高く、新規要素なので既存決定と衝突しない。
- 現行 `.input::placeholder` は `--color-muted`（3.27:1）。**本ページでは `--color-text-help` に変更する**。他ページへの一括展開は本フェーズでは行わない（決定事項E4）。`/contact` での見え方を確認してから全体展開を判断する。

---

## 3. ページ全体構造

### 3.1 セクション一覧・ID・背景

| 順 | セクション | `id` | 背景 | 縦padding（PC / SP） |
|---|---|---|---|---|
| 1 | Page Hero | — | `.pageHero` 既存グラデ | 120px 0 80px / **128px** 0 56px |
| 2 | こんなことでもご相談ください | `themes` | `--color-bg` | 96 / 64 |
| 3 | 無料相談でお約束すること | `promise` | `--color-bg-secondary` ＋上下border | 96 / 64 |
| 4 | 30分で持ち帰れるもの | `takeaway` | `--color-bg` | 96 / 64 |
| 5 | お申し込みから相談までの流れ | `flow` | `--color-bg-secondary` ＋上下border | 96 / 64 |
| 6 | フォーム | `form` | `--color-bg` ＋ 微グロー（§4.6.1） | 112 / 72 |
| 7 | よくあるご質問 | `faq` | `--color-bg-secondary` ＋上border | 112 / 72 |
| 8 | Footer | — | 共通 | — |

**設計意図**:
- 背景の明暗を1セクションおきに交互させ、8セクションでも「同じ画面が続く」感覚を防ぐ。
- フォーム（§6）だけは `--color-bg`（最暗）に微グローを重ね、スクロールの**着地点**であることを視覚的に示す。ページ内で唯一の「面の演出」とする。
- FAQ（§7）を `--color-bg-secondary` にすることで、フォームとの間に明確な境界を作り、「フォームは終わった、ここからは補足」と読み取れるようにする。

### 3.2 縦余白の圧縮（論点1への対処その2）

説明系4セクション（§2〜§5）は `--space-section-compact`（96px / SP 64px）を使う。
フォーム・FAQ は `--space-section`（112px / SP 72px）を維持する。

```
圧縮前（全て112px）: 4セクション × 224px = 896px の余白
圧縮後（96px）    : 4セクション × 192px = 768px の余白
→ PCで約128px、SPで約64px の短縮。セクション追加による体感的な長さを相殺する
```

余白を削ることで情報が詰まって見えないよう、**カード内パディングは `--space-card-pad`（40px）を維持**する。削るのはセクション間、詰めるのはカード外側のみ。

### 3.3 アンカー到達位置の是正（既存不具合の修正を含む）

`html { scroll-behavior: smooth }` が globals.css に設定済みだが、Nav が `position: fixed / height: 72px（SP 64px）` のため、**アンカー先の見出しが Nav の下に隠れる**。
既存の `#entry`（/partner）・`#services`（トップ）も同じ状態だが、本ページはアンカーCTAが主導線になるため必ず是正する。

```css
/* contact.module.css */
.anchorTarget {
  scroll-margin-top: 96px;   /* Nav 72px + 余白 24px */
}
@media (max-width: 767px) {
  .anchorTarget { scroll-margin-top: 88px; }  /* Nav 64px + 余白 24px */
}
```

`#themes` `#promise` `#takeaway` `#flow` `#form` `#faq` の各 `<section>` に `.anchorTarget` を併記する。

**あわせて提案（本ページ外・任意）**: `globals.css` の `@media (prefers-reduced-motion: reduce)` に `html { scroll-behavior: auto; }` を追加する。スムーススクロールは前庭障害のトリガーになり得るため。

### 3.4 スクロールリビール

現行 `page.tsx` の IntersectionObserver（`s.reveal` → `s.revealed`）の仕組みをそのまま流用する。
本ページでは**セクション単位**で適用する（カード1枚ずつのスタッガーは行わない — 8セクションでカード数が多く、逐次アニメーションはページ全体を遅く感じさせるため）。

対象: §2〜§7 の各セクション内ラッパー要素。Hero は初期表示のため対象外（reveal を付けない）。

---

## 4. セクション別デザイン仕様

### 4.1 【1】Page Hero

#### 4.1.1 構造（上から順）

```
パンくず（.breadcrumb / 既存・position:absolute top:96px）
　↓
アイブロー（.eyebrow / 新規・共通型）        ... 無料相談（30分・オンライン・全国対応）
　↓ 16px
H1（.pageH1 / 既存）                        ... 「まだ何も決まっていない」から、どうぞ。
　↓ 20px（.pageH1 の margin-bottom）
リード文（.pageSubCopy / 既存）              ... 4行（構成案どおり・white-space: pre-line）
　↓ 32px
安心バッジ（.trustBadgeRow / 新規）          ... 5点・横wrap
　↓ 18px
返信SLA（.heroSla / 新規）                   ... お申し込みから翌営業日（土日祝を除く）までに〜
　↓ 32px
CTA行（.ctaRow / 既存 + .heroCtaRow）        ... [主] 相談フォームへ進む ↓ ／ [副] 相談の流れを見る
　↓ 14px
リスクリバーサル（.heroRiskReversal / 新規）  ... その場で契約を迫ることはありません。〜
```

左揃え。他の下層ページ（`/service/*`・`/company-info`）と同じ構成のため、サイト内の一貫性が保たれる。
中央揃えにはしない — 4行のリード文と5個のバッジを中央揃えにすると行頭が揃わず、読みにくくなるため。

#### 4.1.2 `.pageHero` の調整

```css
/* contact.module.css で上書き */
.contactHero {
  composes は使わず、page.module.css の .pageHero と併用して上書きする想定
  min-height: auto;        /* 既存 360px の固定下限を解除（内容量が既存ページより多いため不要） */
  padding: 120px 0 80px;
}
@media (max-width: 767px) {
  /* パンくずは position:absolute（モバイル top:84px・高さ約20px＝下端104px）。
     100pxだとH1と重なるため、下端から24pxのクリアランスを取って128pxとする。 */
  .contactHero { padding: 128px 0 56px; }
}
```

背景グラデーションは `.pageHero` の既存値をそのまま使う（変更しない）。

#### 4.1.3 アイブロー `.eyebrow`（新規・**page.module.css に共通型として追加**）

デザインシステム §5.4 で型定義されているが、コードベースに実装が存在しない（`.pageBadge` も未実装）。
`/contact` が初の実装となるため、**contact.module.css ではなく page.module.css に追加**し、他ページが後から流用できるようにする。

```css
/* app/page.module.css に新規追加 */
.eyebrow {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
  border: 1px solid rgba(79, 142, 247, 0.35);
  border-radius: var(--radius-pill);
  padding: 5px 16px;
  background: rgba(79, 142, 247, 0.06);
  margin-bottom: 16px;
  font-family: "Inter", sans-serif;
}

/* 和文アイブロー用の修飾（本ページで使用） */
.eyebrowJa {
  font-family: var(--font);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: none;
}
```

**`.eyebrowJa` を分ける理由**: §5.4 の型は `letter-spacing: 0.14em` + `uppercase` + Inter という欧文前提の設計。本ページのアイブローは「無料相談（30分・オンライン・全国対応）」という和文で、0.14em の字送りでは間延びし、`uppercase` は無効。和文バリアントを型として切り出す（デザインシステムへの追補事項・§12）。

#### 4.1.4 安心バッジ `.trustBadgeRow` / `.trustBadge`（新規・論点4）

**5点すべて掲載する**（相談無料／所要30分／オンライン（全国対応）／平日夜間・土日祝も対応／資料の準備は不要）。
構成案では「5点が多い場合は4点」とあるが、横wrapレイアウトなら5点でも破綻せず、「資料の準備は不要」は心理的ハードル低減の効果が最も高い項目のため残す。

```css
.trustBadgeRow {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
  max-width: 760px;       /* .pageSubCopy と行長を揃える */
}

.trustBadge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.025);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text-sub);
  white-space: nowrap;
}

.trustBadgeIcon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-accent);   /* SVGは stroke="currentColor" */
}
```

**アイコン仕様（重要・論点4の核心）**

| バッジ | アイコン（線画・16×16・stroke-width 1.5・`currentColor`） |
|---|---|
| 相談無料 | 円の中に斜線を引いた通貨記号（no-cost） または タグ型 |
| 所要30分 | 時計 |
| オンライン（全国対応） | ディスプレイ／ビデオカメラ |
| 平日夜間・土日祝も対応 | 月（moon） |
| 資料の準備は不要 | 書類＋斜線（document-off） |

- **絵文字は使用しない**。既存サイトには `.cardIcon` / `.trustIcon` / `.menuIcon` で絵文字を使っている箇所があるが、Heroの安心バッジは「信頼感」を担う要素であり、OS依存で色・太さが変わる絵文字は最も装飾過多に見えやすい。線画SVGに統一することで、5個並んでも色数が2色（accent + text-sub）に収まる。
- SVGは外部ライブラリを導入せず、`page.tsx` 内にインラインSVGコンポーネント（`function IconClock() { return <svg .../> }` 形式）として定義する。既存の `XLogo.tsx` / `InstagramLogo.tsx` と同じ実装パターン。
- `aria-hidden="true"` / `focusable="false"` を付与し、テキストのみをアクセシビリティツリーに残す。

**レスポンシブ**: PCで2行（3個＋2個程度）、SPでも同じく wrap。横スクロール（`overflow-x: auto`）は**採用しない** — 画面外に隠れた項目が見落とされ、バッジを置く意味が失われるため。

#### 4.1.5 返信SLA `.heroSla`（新規）

```css
.heroSla {
  margin-top: 18px;
  padding-left: 12px;
  border-left: 2px solid rgba(79, 142, 247, 0.5);
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--color-text-sub);
  max-width: 560px;
}
```

**設計意図**: バッジと同じピル形状にすると「バッジが6個」に見え、約束（SLA）としての重みが消える。
左の2px縦罫のみの最小装飾にすることで、「装飾ではなく、事実の明示」という性格を視覚的に与える。

#### 4.1.6 CTA `.heroCtaRow`

```css
.heroCtaRow {
  margin-top: 32px;
  gap: 14px;
}
```

- 主CTA: `<a href="#form" className={`${s.btnPrimary} ${cs.heroCtaMain}`}>相談フォームへ進む <span aria-hidden="true">↓</span></a>`
  - `.btnPrimary`（既存・`--gradient-accent`・padding 15px 34px・radius 10px）をそのまま使用。
  - `↓` は `<span aria-hidden="true">` で括り、スクリーンリーダーには読ませない。
- 副次CTA: `<a href="#flow" className={s.btnGhost}>相談の流れを見る</a>`（既存クラスそのまま）

```css
.heroCtaMain {
  /* 矢印の視覚的な間隔のみ調整 */
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
```

**モバイル**: CTA 2つを縦積みにし、主CTAを `width: 100%` にする。

```css
@media (max-width: 767px) {
  .heroCtaRow { flex-direction: column; align-items: stretch; }
  .heroCtaRow > a { text-align: center; }
}
```

#### 4.1.7 リスクリバーサル `.heroRiskReversal`（新規）

```css
.heroRiskReversal {
  margin-top: 14px;
  font-size: 12.5px;
  line-height: 1.75;
  color: var(--color-text-help);   /* 新規トークン・7.07:1 */
  max-width: 560px;
}
```

**「※本フォームからの営業は受け付けておりません。」はHeroから削除**し、フォーム送信ボタン下の注記3行目へ移動する（構成案どおり・§4.6.7）。

---

### 4.2 【2】こんなことでもご相談ください

#### 4.2.1 構造

```
セクションタイトル（.sectionTitle / 既存・中央）
セクションリード（.sectionSub / 既存・中央）
　↓
相談例グリッド（.themeExampleGrid / 新規）  ... 8枚
　↓ 48px
締めのハイライトボックス（.themeClosing / 新規）
```

#### 4.2.2 相談例カード `.themeExampleCard`

構成案は「カード or チップ形式」としているが、1項目が20〜30文字あるためチップ（1行想定）は破綻する。**コンパクトカード**を採用する。

```css
.themeExampleGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  list-style: none;
  max-width: 1440px;
  margin: 0 auto;
}

.themeExampleCard {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);       /* 14px。標準カード(20px)より小さくし「小さな情報単位」を示す */
  padding: 22px 24px;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--color-text-sub);
  /* hover なし（意図的） */
}

.themeExampleIcon {
  width: 16px;
  height: 16px;
  margin-top: 4px;
  flex-shrink: 0;
  color: var(--color-accent);   /* 吹き出し（message）アイコン・線画 */
}
```

**hover効果を付けない理由**: このカードはクリックできない情報表示。hoverで浮いたり枠色が変わると「押せる」と誤認され、押して何も起きない体験は信頼を削る。同じ理由で `cursor: pointer` も付けない。

**アイコン**: 全8枚とも同一の吹き出しアイコン。項目ごとにアイコンを変えると、意味のない8種類の記号が並び、まさに「装飾過多」になる。

**レスポンシブ**:
```
Desktop (≥1024px) : 4カラム
Tablet (768–1023) : 2カラム
Mobile (≤767px)   : 1カラム、padding 18px 20px、font-size 14px
```

#### 4.2.3 締めのハイライトボックス `.themeClosing`

構成案の「許可を与えるコピー」（他社と比較検討中／情報収集段階も歓迎／発注義務なし）は、本ページで**最も心理的効果の高い2行**。ページ内で唯一のハイライトボックスとして扱う。

```css
.themeClosing {
  max-width: 760px;
  margin: 48px auto 0;
  padding: 26px 32px;
  background: rgba(79, 142, 247, 0.05);
  border: 1px solid rgba(79, 142, 247, 0.22);
  border-radius: var(--radius-lg);
  text-align: center;
  font-size: 15px;
  line-height: 1.9;
  color: var(--color-text);          /* 本文より明るい。重要度を示す */
}
```

@media (max-width: 767px): `padding: 22px 20px; font-size: 14.5px; text-align: left;`
（モバイルで2行以上のセンタリングは行頭が揃わず読みにくいため左揃えに切り替える）

---

### 4.3 【3】無料相談でお約束すること（論点4）

#### 4.3.1 構造

```
セクションタイトル（.sectionTitle） ... 無料相談で、PitDockがやらないこと。
セクションリード（.sectionSub）
　↓
お約束カード ×3（.promiseGrid / .promiseCard）
　↓ 32px
NDA補足（.promiseNote）
```

#### 4.3.2 お約束カード `.promiseCard`

```css
.promiseGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-card-gap);       /* 28px */
  list-style: none;
  max-width: 1240px;
  margin: 0 auto;
}

.promiseCard {
  background: var(--color-surface);          /* #121A2E。--color-bg-secondary のセクション地から1段持ち上げる */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);           /* 20px・標準カード */
  padding: var(--space-card-pad);            /* 40px */
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.promiseCard:hover {
  border-color: var(--color-border-strong);
  transform: translateY(-4px);
  /* box-shadow は付けない（§1.3） */
}

.promiseIconBox {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);           /* 14px */
  background: rgba(79, 142, 247, 0.10);
  border: 1px solid rgba(79, 142, 247, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  flex-shrink: 0;
}
.promiseIconBox svg { width: 20px; height: 20px; }

.promiseH3 {
  font-size: 19px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text);
}

.promiseBody {
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-text-sub);
}
```

**アイコン（「やらないこと」の視覚表現）**

| カード | アイコン |
|---|---|
| 1. 売り込みはしません | メガホン＋斜線（megaphone-off） |
| 2. その場で契約を迫りません | 書類＋斜線 または 握手＋斜線ではなく「署名ペン＋斜線」 |
| 3. 資料の準備をお願いしません | フォルダ／書類の束＋斜線 |

- **3枚とも同一色（`--color-accent`）・同一形状のアイコンボックス**。カードごとに色を変えない。
- 「やらないこと」の記号として**斜線（slash）入りの線画**で統一する。大きな `×` マークは否定が強すぎ、ネガティブな印象を残すため使わない。斜線は控えめな否定として機能する。

**デザインの意図（軽薄に見せないための判断）**

| 判断 | 理由 |
|---|---|
| `box-shadow` によるカラーグローを付けない | グローはトップページのサービスカードで「カテゴリの差別化」に使っている言語。お約束3枚は差別化すべき対象ではなく、**3つで1つの約束**。同じ見た目であることが約束の一貫性を表す |
| 番号（01/02/03）を付けない | 番号は順序・手順を意味する。約束に順位はない。番号を付けると「流れセクション」と混同する |
| `.problemCard` 型のトップバー（3pxグラデ）を付けない | ページ内でカードの種類が4種（相談例／お約束／持ち帰り／FAQ）あり、全てに装飾を付けると識別が効かなくなる。装飾は「持ち帰り」の番号1箇所に集約する |
| セクション地を `--color-bg-secondary`、カードを `--color-surface` にする | ボーダー以外に**明度差**でカードを浮かせることで、装飾なしでもカードとして認識される |

**レスポンシブ**:
```
Desktop (≥1024px) : 3カラム・縦型（アイコン上／見出し／本文）
Tablet/Mobile (≤1023px) : 1カラム・横型に切替
```

```css
@media (max-width: 1023px) {
  .promiseGrid { grid-template-columns: 1fr; max-width: 720px; }
  .promiseCard {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 12px 20px;
    padding: 28px;
  }
  .promiseIconBox { grid-row: 1 / 3; }     /* アイコンを左に、見出し＋本文を右に */
}
@media (max-width: 767px) {
  .promiseCard { padding: var(--space-card-pad-mobile); }   /* 28px */
  .promiseH3 { font-size: 17px; }
  .promiseBody { font-size: 14.5px; }
}
```

**タブレットで3カラムを維持しない理由**: 768pxで3分割すると1カラム約220px。本文が80〜120文字あるため8〜10行になり、極端に縦長のカードが3本並ぶ。横型1カラムのほうが読みやすい。

#### 4.3.3 NDA補足 `.promiseNote`

```css
.promiseNote {
  max-width: 720px;
  margin: 32px auto 0;
  text-align: center;
  font-size: 13px;
  line-height: 1.8;
  color: var(--color-text-help);
}
```

---

### 4.4 【4】30分で、ここまで持ち帰れます

#### 4.4.1 構造

```
セクションタイトル（.sectionTitle）
セクションリード（.sectionSub）
　↓
持ち帰りカード ×4（.takeawayGrid / .takeawayCard）  ... 2×2
　↓ 64px
当日の進行タイムライン（.timelineWrap）
　↓ 40px
担当者の1行（.presenterNote）＋「PitDockについて →」リンク
```

#### 4.4.2 持ち帰りカード `.takeawayCard`

```css
.takeawayGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-card-gap);       /* 28px */
  list-style: none;
  max-width: 1080px;
  margin: 0 auto;
}

.takeawayCard {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-card-pad);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.takeawayCard:hover {
  border-color: var(--color-border-strong);
  transform: translateY(-4px);
}

/* 番号バッジ: 既存 .cardNum と同型（グラデーションボーダー） */
.takeawayNum {
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background:
    linear-gradient(var(--color-bg-secondary), var(--color-bg-secondary)) padding-box,
    var(--gradient-accent) border-box;
  border: 1.5px solid transparent;
  color: var(--color-accent);
  flex-shrink: 0;
}
```

**番号を付ける理由**（お約束カードでは付けなかったのと対照的）: 持ち帰る4つは「課題の輪郭 → 打ち手の選択肢 → 進める順番 → 費用と期間」という**思考の順序**を持つ。番号が内容を補強する。

見出し `.takeawayH3`（19px/600）・本文 `.takeawayBody`（15px/1.8/`--color-text-sub`）は `.promiseH3` / `.promiseBody` と同値。共通クラス化してもよい（実装者判断）。

**レスポンシブ**: `≤767px` で 1カラム・padding 28px。タブレットは2カラム維持（1カラム約340pxで本文40〜60文字なら3〜4行に収まる）。

#### 4.4.3 当日の進行タイムライン `.timelineWrap`（新規）

構成案では「オプション」だが、**採用を推奨**する。「30分で何をするか」が時間軸で見えることは、所要時間30分（決定事項D1）への納得感を支える最も直接的な材料になる。

**デスクトップ: 水平タイムライン（3ステップ）**

```css
.timelineWrap {
  max-width: 880px;
  margin: 64px auto 0;
  padding: 36px 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.015);
}

.timelineTitle {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 32px;
  letter-spacing: 0.02em;
}

.timelineTrack {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  position: relative;
}

/* 軸線: 3ステップのドット中心を通す横線 */
.timelineTrack::before {
  content: "";
  position: absolute;
  top: 5px;                    /* ドット(10px)の中心 */
  left: calc(16.666% );        /* 1列目中心 */
  right: calc(16.666%);        /* 3列目中心 */
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(79, 142, 247, 0.45) 0%,
    rgba(79, 142, 247, 0.2) 100%
  );
}

.timelineStep {
  position: relative;
  padding-top: 26px;
  text-align: center;
}

.timelineStep::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 4px var(--color-bg);   /* 軸線を切り抜いてドットを独立させる */
}

.timelineTime {
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--color-accent);
  margin-bottom: 8px;
}

.timelineBody {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-sub);
}
```

**モバイル（≤767px）: 垂直タイムライン**

```css
@media (max-width: 767px) {
  .timelineWrap { padding: 28px 20px; margin-top: 48px; }
  .timelineTrack {
    grid-template-columns: 1fr;
    gap: 24px;
    padding-left: 24px;
  }
  .timelineTrack::before {
    top: 5px;
    bottom: 12px;
    left: 4px;
    right: auto;
    width: 2px;
    height: auto;
    background: linear-gradient(to bottom, rgba(79,142,247,0.45), rgba(79,142,247,0.15));
  }
  .timelineStep { padding-top: 0; padding-left: 0; text-align: left; }
  .timelineStep::before { top: 6px; left: -24px; transform: none; }
}
```

コンテンツ（構成案どおり）:
```
0〜5分   / ご挨拶と、本日お聞きしたいことの確認
5〜20分  / 現在の状況・お困りごとのヒアリング
20〜30分 / 論点の整理と、進め方のご提案
```

セクションタイトル `.timelineTitle` は「当日の進行（目安）」とする（「目安」を入れることで、運用実態とのズレを許容する — 構成案の注記に対応）。

#### 4.4.4 担当者の1行 `.presenterNote`

決定事項D5により独立セクションは設けない。タイムラインの下に1行のみ。

```css
.presenterNote {
  max-width: 720px;
  margin: 40px auto 0;
  text-align: center;
  font-size: 14.5px;
  line-height: 1.8;
  color: var(--color-text-sub);
}
.presenterNoteLink {
  display: inline-block;
  margin-left: 10px;
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.presenterNoteLink:hover { opacity: 0.85; }
.presenterNoteLink:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 3px;
}
```

顔写真・肩書バッジ・カードは置かない（D5の「独立セクションを設けない」を、ビジュアル面でも徹底する）。
リンク先は `/company-info`（テキスト「PitDockについて →」）。

---

### 4.5 【5】お申し込みから相談までの流れ

`/partner` の `.partnerStepItem`（番号円＋縦コネクタ線）が既に完成度の高い型なので、**構造をそのまま移植し、色をブランドブルーに置き換える**。新規デザインを起こさない。

```css
.flowList {
  max-width: 720px;
  margin: 0 auto;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.flowItem {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 0 32px;
  padding-bottom: 44px;
  position: relative;
}

.flowItem:last-child { padding-bottom: 0; }

.flowItem:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 35px;                 /* 円(60px)の中心 - 線幅(2px)/2 = 30 - 1 → コンテナ基準で35 */
  top: 64px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(79, 142, 247, 0.5) 0%,
    rgba(79, 142, 247, 0.15) 60%,
    transparent 100%
  );
}

.flowNum {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background:
    linear-gradient(var(--color-bg-secondary), var(--color-bg-secondary)) padding-box,
    var(--gradient-accent) border-box;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  flex-shrink: 0;
}

.flowContent { padding-top: 12px; }

.flowH3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.35;
  margin-bottom: 10px;
}

.flowBody {
  font-size: 15px;
  line-height: 1.85;
  color: var(--color-text-sub);
}

.flowBody strong {
  color: var(--color-text);
  font-weight: 700;
}

/* Step04 用の強調ピル */
.flowPill {
  display: inline-block;
  margin-top: 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 5px 14px;
  border-radius: var(--radius-pill);
  background: rgba(79, 142, 247, 0.10);
  border: 1px solid rgba(79, 142, 247, 0.32);
  color: var(--color-accent);
}
```

**重要**: `.flowNum` の内側背景は `--color-bg-secondary`（セクション地・§3.1で §5 は secondary）。背景色を間違えるとグラデーションボーダーの内側が抜けて見えるので注意。

**コンテンツ上の強調指定**:
- Step 01 見出し「フォームを送信（所要1分）」— 「所要1分」がフォームの軽さを最初に伝える
- Step 02 本文「**翌営業日（土日祝を除く）までに**」を `<strong>` で囲む（決定事項D6の確約を視覚的に固定）
- Step 04 に `.flowPill`「追いかけのご連絡はしません」を配置（決定事項D3。BtoB相談で最も強い不安解消材料のため、1つだけピルで抜き出す）

**レスポンシブ（≤767px）**: `/partner` と同値。
```css
@media (max-width: 767px) {
  .flowItem { grid-template-columns: 56px 1fr; gap: 0 20px; padding-bottom: 36px; }
  .flowItem:not(:last-child)::after { left: 27px; top: 54px; }
  .flowNum { width: 48px; height: 48px; font-size: 15px; }
  .flowContent { padding-top: 8px; }
  .flowH3 { font-size: 17.5px; }
  .flowBody { font-size: 14.5px; }
}
```

---

### 4.6 【6】フォーム（論点2・3）

#### 4.6.1 セクション背景とフォームカード

```css
.formSection {
  padding: var(--space-section) 0;
  background: var(--color-bg);
  position: relative;
  overflow: hidden;
}

/* スクロールの着地点であることを示す微グロー（ページ内で唯一の面演出） */
.formSectionGlow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(43, 147, 214, 0.08) 0%, transparent 55%);
}

.formInner { position: relative; z-index: 1; }
```

フォームカード `.form` は**既存クラスをそのまま使用**（max-width 780px / `--color-bg-secondary` / border 1px / `--radius-xl` 28px / padding 56px）。変更なし。

#### 4.6.2 フォーム上部リード `.formLead`

フォームカードの**外・上**に置く（カード内に入れると入力欄と同じ面になり、読み飛ばされる）。

```css
.formLead {
  max-width: 780px;
  margin: 0 auto 32px;
  text-align: center;
  font-size: 15px;
  line-height: 1.9;
  color: var(--color-text-sub);
}
.formLead strong {
  color: var(--color-text);
  font-weight: 700;
}
```

「必須はお名前・メールアドレス・ご相談テーマの**3つだけ**です。」の「3つだけ」を `<strong>` にする。

#### 4.6.3 項目順とグリッド

| 順 | 項目 | 必須 | 幅 |
|---|---|---|---|
| 1 | お名前 | 必須 | 1/2（SP: full） |
| 2 | メールアドレス | 必須 | 1/2（SP: full） |
| 3 | ご相談のテーマ | 必須 | full |
| 4 | ご相談内容 | 任意 | full |
| 5 | 会社名・屋号 | 任意 | full |
| 6 | ご希望の日時 | 任意 | full |
| 7 | プライバシーポリシー同意 | 必須 | full |

既存 `.formGrid`（`grid-template-columns: 1fr 1fr` / gap 24px / SP 1カラム）をそのまま使用。
1行目に軽い項目（氏名・メール）を横並びで置くことで、**最初の1画面で「2つ埋めた」という進捗感**を作る。現行の「会社名/部署・役職名」が単独で先頭に来る構成（最も重い項目が最初）を是正する。

必須3項目と任意3項目の間に区切りを入れる。

```css
.formDivider {
  grid-column: 1 / -1;
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 12px 0 4px;
}
.formDividerLabel {
  grid-column: 1 / -1;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-text-help);
  letter-spacing: 0.04em;
  margin-top: -4px;
}
```

`.formDividerLabel` のテキスト: 「ここから下はすべて任意です」
**設計意図**: 「任意」バッジを各項目に付けるだけでは「まだ4項目もある」という圧迫感が残る。区切り線＋1行で「ここから先は飛ばしてよい」と宣言することで、必須3項目の後に**送信してよいと分かる**状態を作る。これがCVRに直結する。

#### 4.6.4 ラベル・必須/任意バッジ・ヘルパーテキスト

```css
/* .label は既存流用（14px / 600 / flex / gap 8px） */

/* 必須バッジ: 既存 .required を強化（必須が3つに絞られたため、目立たせても威圧感が出ない） */
.required {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-accent);                    /* 旧: --color-text-sub */
  background: rgba(79, 142, 247, 0.12);          /* 旧: 0.08 */
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid rgba(79, 142, 247, 0.35);    /* 旧: 0.25 */
  line-height: 1.6;
}

/* 任意ラベル（新規）: バッジにせず、地味な文字にする */
.optional {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-help);
  /* 背景・ボーダーなし */
}

/* ヘルパーテキスト（新規） */
.helpText {
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--color-text-help);      /* --color-muted は 3.27:1 で AA 未達のため使わない */
  margin-top: -2px;                    /* .fieldWrap の gap:8px を詰めてラベル寄りに */
}
```

**必須を強く／任意を弱く**する非対称なデザインにより、視線が必須3項目に集中する。
現行は必須バッジが `--color-text-sub`（グレー）で弱く、全項目が同じ重みに見えていた。

**プレースホルダー**:
```css
.input::placeholder,
.textarea::placeholder {
  color: var(--color-text-help);   /* 現行 --color-muted（3.27:1）から変更 */
}
```

#### 4.6.5 ご相談のテーマ — トグルチップ（論点2）

**マークアップ**

```
<fieldset className={cs.themeFieldset}>
  <legend className={cs.themeLegend}>
    ご相談のテーマ（あてはまるものすべて）<span className={cs.required}>必須</span>
  </legend>
  <div className={cs.themeChipGroup}>
    <label className={cs.themeChip} data-checked={checked} data-emphasis={opt.emphasis || undefined}>
      <input type="checkbox" className={cs.themeChipInput} checked={...} onChange={...} />
      <span className={cs.themeChipCheck} aria-hidden="true">（チェックSVG 14px）</span>
      <span className={cs.themeChipLabel}>{opt.label}</span>
    </label>
    ...×7
  </div>
  <p className={cs.helpText} id="themes-help">選択肢にないテーマでもご相談いただけます。迷ったら「まだ決まっていない」で構いません。</p>
  {errors.themes && <p className={cs.errorMsg} id="themes-error" role="alert">{errors.themes}</p>}
</fieldset>
```

- `<fieldset>` + `<legend>` を使う（スクリーンリーダーが各チェックボックスに「ご相談のテーマ」という文脈を付けて読む）。`<fieldset>` のブラウザ既定スタイルは `border: none; padding: 0; margin: 0; min-width: 0;` でリセットする。
- `aria-describedby="themes-help themes-error"` を fieldset に付与。
- **`data-checked` 属性で状態を CSS に渡す**。`:has(input:checked)` でも実現できるが、Reactで state を持っているため data属性のほうが確実（`:has()` の古いSafari非対応を回避）かつデバッグしやすい。

**CSS**

```css
.themeFieldset {
  grid-column: 1 / -1;
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.themeLegend {
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.themeChipGroup {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.themeChip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;                       /* タップターゲット 44px以上を確保 */
  padding: 11px 18px;
  border: 1.5px solid var(--color-border); /* 常時 1.5px。選択時に太さを変えず、幅のガタつきを防ぐ */
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.02);
  color: var(--color-text-sub);
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  /* transform は使わない（6個が一斉に動くとうるさい） */
}

.themeChipInput {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* チェックマーク枠（未選択時は空の丸枠） */
.themeChipCheck {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid var(--color-border-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.themeChipCheck svg { width: 11px; height: 11px; opacity: 0; transition: opacity 0.15s ease; }

/* hover */
.themeChip:hover {
  border-color: rgba(79, 142, 247, 0.5);
  background: rgba(79, 142, 247, 0.06);
  color: var(--color-text);
}

/* focus（キーボード操作時） */
.themeChip:focus-within {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* 選択済み */
.themeChip[data-checked="true"] {
  background: rgba(79, 142, 247, 0.16);
  border-color: var(--color-accent);
  color: var(--color-text);
  font-weight: 600;
}
.themeChip[data-checked="true"] .themeChipCheck {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}
.themeChip[data-checked="true"] .themeChipCheck svg { opacity: 1; }

/* 「まだ決まっていない・まとめて相談したい」の見つけやすさ（未選択時のみ） */
.themeChip[data-emphasis]:not([data-checked="true"]) {
  border-color: rgba(79, 142, 247, 0.42);
  background: rgba(79, 142, 247, 0.055);
  color: var(--color-text);
}

/* エラー時（1つも選択されていない） */
.themeChipGroup[data-invalid="true"] .themeChip:not([data-checked="true"]) {
  border-color: rgba(248, 113, 113, 0.5);
}
```

**選択肢と順序（構成案どおり・6個）**

```
1. DX推進・業務改善
2. AI・生成AIの活用（AX）
3. システム・アプリ開発
4. 技術顧問（外部CTO）
5. まだ決まっていない・まとめて相談したい   ← data-emphasis
6. その他
```

**「まだ決まっていない」の扱い — 設計判断（論点2）**

| 検討案 | 判断 |
|---|---|
| 別枠に分け、区切り線の下に置く | **不採用**。「その他扱い」「本命ではない選択肢」に見え、選びにくくなる。決定事項D12（テーマを限定しない）にも反する |
| 塗りつぶしボタンなど明確に目立つ装飾にする | **不採用**。誘導が露骨で、「そう答えさせたいのだな」と読まれる。また未選択なのに選択済みに見える |
| **同サイズ・同形状のまま、未選択時のみボーダー/背景をわずかに強める** | **採用**。5番目という視線が流れやすい位置にあっても発見でき、かつ「6つの選択肢のうちの1つ」という同列性が保たれる。選択後のスタイルは他と完全に同一になるため、選んだ後に「特別な選択肢を選んだ」感覚が残らない |

加えて、補助テキスト「迷ったら『まだ決まっていない』で構いません。」がチップ群の直下にあることで、言葉でも許可を与える。視覚的強調は最小限に留め、**許可はコピーで与える**という役割分担にする。

**レスポンシブ**: チップは内容幅で wrap するため追加指定は原則不要。
```css
@media (max-width: 767px) {
  .themeChip { font-size: 14px; padding: 11px 16px; }
  .themeChipGroup { gap: 8px; }
}
```
幅375pxで最長の「まだ決まっていない・まとめて相談したい」（19文字）は約290px。1行に収まり折り返さない。

#### 4.6.6 ご希望の日時 — フリーテキスト（論点3・決定事項E1 最終版）

> **決定事項E1（最終）: 希望日時はフリーテキスト1項目にする。**
> これまで検討した3案（①時間帯セレクト ②開始時刻の単一セレクト ③開始〜終了の2セレクト）は
> **すべて不採用**とし、日付ピッカーと時刻セレクトの構造化UIそのものを廃止する。
>
> **理由**
> 1. **このフォームは予約を確定させない。** 日程は翌営業日の返信メールで確定する運用であり、
>    送信時点で構造化データである必然性が薄い。
> 2. **構造化UIでは表現できない希望が多い。** 「来週の火・水・木の午後ならいつでも」「今週は難しいので再来週以降で」
>    といった形は、枠を3つ埋めても表現しきれない（③案でも3枠×3操作＝9操作を要し、なお不正確）。
>    フリーテキストなら1行で済む。
> 3. **任意項目に対してコストが過大だった。** ③案はモバイル3行スタック、終了セレクトの動的 `disabled`、
>    枠の追加／削除、バリデーション2種を必要とした。フォーム内で突出して複雑な部分が、
>    任意項目1つのために存在していた。
> 4. **バリデーションエラーが構造的にゼロになる。** 現行の「30分以上の幅」「日付と時刻の部分入力」に加え、
>    ③案で新設予定だった「終了≦開始」も不要になる。
>
> **唯一のリスクと対処**
> 自由記述は「何を書けばよいか」という負荷を生む。これは本改善で最大の問題として特定した
> 現行の必須「ご相談内容」欄と同じ失敗パターンである。ただし本項目は**任意**であり空欄で素通りできること、
> および**プレースホルダーに具体例を3つ置く**ことで実質的に解消する。
> プレースホルダーは飾りではなく、この項目の成否を決める要素として扱う。

**構造**

```
ご希望の日時 [任意]

┌──────────────────────────────────────┐
│ 例：来週の火・水・木の午後ならいつでも              │  ← プレースホルダー（3行）
│ 　　平日の19時以降を希望                        │
│ 　　9/25(木) の 10:00〜13:00 の間                │
└──────────────────────────────────────┘

空欄でも構いません。その場合は、こちらから候補日をいくつかご提案します。
平日夜間・土日祝のご相談にも対応しています（9:00〜21:00）。
```

**「日程は後日メールで調整したい」チェックボックスは廃止する。**
フリーテキストでは空欄がそのまま「おまかせ」を意味するため、専用のチェックボックスが不要になる。
その意味は補助テキスト1行目が担う。

**HTML / CSS**

既存の `.textarea` をそのまま流用する。**このセクションに新規CSSは不要。**

```html
<div class="fieldWrap" style="grid-column: 1 / -1">
  <label class="label" for="preferredDate">
    ご希望の日時 <span class="optionalTag">任意</span>
  </label>
  <textarea
    id="preferredDate"
    name="preferredDate"
    class="textarea"
    rows="3"
    placeholder="例：来週の火・水・木の午後ならいつでも&#10;　　平日の19時以降を希望&#10;　　9/25(木) の 10:00〜13:00 の間"
    aria-describedby="preferredDate-help"
  ></textarea>
  <p class="helpText" id="preferredDate-help">
    空欄でも構いません。その場合は、こちらから候補日をいくつかご提案します。<br />
    平日夜間・土日祝のご相談にも対応しています（9:00〜21:00）。
  </p>
</div>
```

- `rows="3"` は「ご相談内容」欄（`rows="5"`）より浅くし、**長文を求めていない**ことを形で示す。
- プレースホルダーの改行は JSX では `
` を含む文字列リテラルで渡す。
  `placeholder` の改行は Safari / iOS Safari では**表示されない**（1行に潰れる）ため、
  改行が失われても意味が通るよう、各例は「例：」で始まる独立した句にしてある。
  確実に3行で見せたい場合は、プレースホルダーを1行（`例：来週の火・水・木の午後ならいつでも`）に留め、
  残りの例を `.helpText` 側に移す。**実装時に実機で確認して判断すること**（§11-13）。
- プレースホルダーの色は `--color-text-help`（決定事項E4・§2.3）。

**補助テキスト `.helpText`**

```
空欄でも構いません。その場合は、こちらから候補日をいくつかご提案します。
平日夜間・土日祝のご相談にも対応しています（9:00〜21:00）。
```

1行目が「書かなくてよい」という許可、2行目が決定事項D9の「夜間・土日祝も対応」という強みの明示。
2行目は他のヘルパーより一段読ませたいため、`--color-text-help` ではなく `--color-text-sub` を使う。

**バリデーション**: **なし。** 任意の自由記述であり、文字数上限のみ（`maxLength={500}`）を設ける。

**レスポンシブ**: `.textarea` の既存仕様に従う。横並びが存在しないため、
375px幅での実幅計算・ラベル短縮・3行スタックといった対処はすべて不要になった。

**アクセシビリティ**: `<label for>` と `aria-describedby` のみ。
③案で必要だった `fieldset` / `legend` / `aria-controls` / セレクト間の依存関係の読み上げ対応は、すべて不要。

---

#### 4.6.7 同意チェック・送信ボタン・注記

**プライバシーポリシー同意**（`/partner` の `.partnerPrivacyCheck` と同仕様、色のみブルー）

```css
.privacyCheck {
  grid-column: 1 / -1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 8px;
  padding: 16px 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.015);
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--color-text-sub);
  cursor: pointer;
  min-height: 48px;
}
.privacyCheck input {
  width: 18px; height: 18px;
  accent-color: var(--color-accent);
  margin-top: 3px;
  flex-shrink: 0;
  cursor: pointer;
}
.privacyCheck a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.privacyCheck:has(input:focus-visible) {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
.privacyCheckError { border-color: rgba(248, 113, 113, 0.55); }
```

リンク先は `/privacy` と `/personal-info`（`target="_blank" rel="noopener noreferrer"` — `/partner` と同じ）。
`/partner` では囲み枠がないが、`/contact` では**必須項目であることを示すため薄い囲みを付ける**。チェックし忘れによる送信エラーが最も起きやすい項目のため。

**送信ボタン**

```css
.submitRow {
  grid-column: 1 / -1;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

/* .submitBtn は既存流用。padding のみ拡大 */
.submitBtn {
  padding: 18px 56px;        /* 旧 16px 56px */
  min-height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
@media (max-width: 767px) {
  .submitBtn { width: 100%; padding: 18px 24px; }
}
```

文言: **「無料相談を申し込む（30分）」**（現行「予約を送信する →」から変更）。矢印は付けない — 「申し込む」という動詞で完結させ、「次のページへ進む」という誤解を避ける。

**送信中の状態表示**（現行の opacity pulse を置き換え）

```css
.submitSpinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  .submitSpinner { animation: none; border-top-color: rgba(255,255,255,0.35); }
}
```

- `disabled` + `aria-busy="true"`、テキストは「送信中…」
- 既存の `.loading`（opacity pulse）は削除する。ボタン全体が明滅するのは「壊れているように見える」ため

**送信ボタン下の注記**

```css
.submitNote {
  max-width: 560px;
  text-align: center;
  font-size: 12.5px;
  line-height: 1.95;
  color: var(--color-text-help);
}
.submitNoteMuted {
  max-width: 560px;
  text-align: center;
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--color-muted);       /* 装飾的・非必須テキストなので --color-muted で可 */
  margin-top: 10px;
}
```

- `.submitNote` に2行（日程未確定である旨／無料である旨）
- `.submitNoteMuted` に2行（「※本フォームは、無料相談のお申し込み専用です。／ 営業・協業のご提案は、**お問い合わせフォーム**（`https://forms.gle/9EPiyGuYy5HdvDVZ8`・別タブ）よりご連絡ください。」）
  - **Heroから移動してきた文**（コンテンツ案 A-4 への対処）。当初は書き手の防御姿勢として視覚的な重みを最小にしていたが、**代表判断により囲み付きで強調する方針に変更**した。
  - **文面も「同業他社の営業お断り」から「営業は別フォームへ誘導」に変更**。営業の発信元が同業他社に限らないため、対象を限定した断り書きではなく、**すべての営業・協業提案を既存のお問い合わせフォームへ送る導線**として機能させる。断るのではなく行き先を示す形にすることで、相談者向けの文脈を壊さずに済む。
  - スタイル: `padding: 12px 16px` / `border: 1px solid var(--color-border)` / `border-radius: var(--radius-sm)` / `background: var(--color-surface)` / `font-size: 13px` / `font-weight: 500` / `color: var(--color-text-sub)`。モバイルは12.5px・左揃え。
  - リンクは `.submitNoteLink`（`--color-accent` + underline、`.presenterNoteLink` と同型）。外部リンクのため `target="_blank"` + `rel="noopener noreferrer"`。
  - **`--color-muted` は使わない**（`--color-bg` 上で3.30:1 = WCAG AA未達・§2.3）。`--color-text-sub` で9.9:1 を確保する。

**送信エラー**

```css
.submitError {
  grid-column: 1 / -1;
  margin-top: 16px;
  padding: 14px 18px;
  border: 1px solid rgba(248, 113, 113, 0.4);
  border-radius: var(--radius-sm);
  background: rgba(248, 113, 113, 0.07);
  color: var(--color-danger);
  font-size: 14px;
  line-height: 1.7;
  text-align: center;
}
```

現行は文字だけだったが、送信失敗は最も強いストップなので囲みを付ける。`role="alert"`。

#### 4.6.8 バリデーション表示仕様

| 項目 | ルール | エラーメッセージ |
|---|---|---|
| お名前 | 必須・trim後1文字以上 | 「お名前をご入力ください」 |
| メールアドレス | 必須・`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`（現行と同じ） | 未入力「メールアドレスをご入力ください」／形式「メールアドレスの形式をご確認ください」 |
| ご相談のテーマ | 必須・1つ以上選択 | 「あてはまるものを1つ以上お選びください」 |
| ご希望の日時 | **バリデーションなし**（任意の自由記述）。`maxLength={500}` のみ | — |
| プライバシー同意 | 必須 | 「プライバシーポリシーへの同意が必要です」 |

**廃止するエラー（現行から消える2件）**

| 現行のエラー | 廃止の理由 |
|---|---|
| 「希望日時は30分以上の幅で入力してください」 | 希望日時が**自由記述になり、時刻を構造として持たなくなった**ため |
| 「開始時刻を入力してください」／「終了時刻を入力してください」 | 同上。日時に関するバリデーションは**すべて消滅**する |
| 「終了時刻は開始時刻より後にしてください」 | 同上（現行にも存在するエラー） |

**表示ルール**
```css
.errorMsg {
  font-size: 13px;          /* 旧12px。現行は小さすぎて見落とされる */
  line-height: 1.6;
  color: var(--color-danger);
  margin-top: 4px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}
.errorMsgIcon { width: 14px; height: 14px; flex-shrink: 0; margin-top: 3px; }
```

- 現行「必須項目です」という機械的な文言を、**項目名を含む具体的な文言**に変える（スクリーンリーダー利用時、エラーだけ読み上げられても何の項目か分かるようにするため）
- 各 `<input>` に `aria-invalid={!!error}` `aria-describedby="{id}-error"` を付与
- エラー文には `role="alert"`（動的に出現するため）
- **初回は送信時に一括検証**（現行踏襲）。一度エラーになった項目のみ、以後 `onChange` / `onBlur` で即時再検証する（エラー状態のまま入力し続ける不安を解消）
- **送信ボタン押下でエラーがあった場合、最初のエラー項目にフォーカスを移動し `scrollIntoView({ block: "center" })`** する。フォームが長いため、エラーが画面外にあると「押しても何も起きない」体験になる
- フォーム冒頭に `<div role="alert" aria-live="assertive">` のサマリー（例:「3件の入力内容をご確認ください」）を出すことも有効（実装コスト次第・任意）

---

### 4.7 【7】よくあるご質問

#### 4.7.1 既存 `FaqAccordion` の再利用可否 — **改修すれば再利用可（推奨）**

現状の `app/components/FaqAccordion.tsx` は props を一切受け取らず、`lib/seo/faqs.ts` の `FAQ_GROUPS` を直接 import している。**このままでは `/contact` 専用の13問を渡せない。**

**推奨: 後方互換の props を追加する（既存呼び出し側の変更不要）**

```tsx
type FaqItemData = { q: string; a: string };
type FaqGroupData = { label: string; faqs: readonly FaqItemData[] };

type Props = {
  groups?: readonly FaqGroupData[];   // 既定: FAQ_GROUPS
  showTabs?: boolean;                 // 既定: true
};
```

- `/contact` 側: `<FaqAccordion groups={[{ label: "無料相談について", faqs: CONTACT_FAQS }]} showTabs={false} />`
- トップページ側: `<FaqAccordion />` のまま変更不要
- **CSS（`FaqAccordion.module.css`）は変更不要**。タブを出さないだけで、アコーディオン部分のスタイルはそのまま使える

FAQデータは `lib/seo/faqs.ts` に `CONTACT_FAQS` として追加する（`SITE_FAQS` / `FAQ_GROUPS` と同じファイルに置くことで、構造化データ化する場合に参照しやすい）。

**代替案（非推奨）**: contact.module.css に同等のアコーディオンCSSを新設して複製する。スタイルが二重管理になるため避ける。

#### 4.7.2 このページでの表示仕様

```css
.contactFaqWrap {
  max-width: 860px;          /* 既存 .faqWrap は720px。13問・回答が長いため広げる */
  margin: 0 auto;
}
```

- **タブは出さない**（13問を無理にカテゴリ分けすると、探す前に分類を読む手間が増える）
- **1問だけ開く**（現行の single-open 挙動のまま）。13問全部が開けると縦に極端に長くなる
- 初期状態は全て閉じる（現行どおり）
- `.answer` は `white-space: pre-line`（既存）。Q12 の `**強調**` 部分は Markdown が効かないため、`<strong>` を含む JSX にするか、強調なしのプレーンテキストにする（§11-4）

#### 4.7.3 既存 FaqAccordion のアクセシビリティ上の問題（改修時に併せて是正を推奨・任意）

| 問題 | 是正案 |
|---|---|
| FAQ項目ごとに `<dl>` を生成している（`{currentFaqs.map(... <dl>...)}`）。正しくは1つの `<dl>` に複数の `<dt>/<dd>` | `<dl>` をループ外に出す |
| 開閉ボタンに `aria-controls` がなく、`<dd>` に `id` がない | `aria-controls={`faq-a-${i}`}` / `<dd id={...}>` を付与 |
| `role="tabpanel"` に `aria-labelledby` がなく、`role="tab"` に `id` がない | タブを使う場合のみ付与（`/contact` では `showTabs={false}` のため影響なし） |
| `+` / `−` をテキストノードで出している | `aria-hidden="true"`（既に付与済み・問題なし） |

本件は `/contact` の実装をブロックしないため、余裕があれば対応する扱いでよい。

#### 4.7.4 構造化データについて

コンテンツ案 §5 のとおり、`app/layout.tsx` が `faqPageJsonLd()` を全ページに出力しているため、`/contact` 専用FAQをJSON-LD化すると同一ページに `FAQPage` が2つ存在する。
**デザイン仕様としては (a)「JSON-LD化せずHTMLのみで掲載」を前提に設計する**（構成案の推奨と一致）。判断が変わっても表示デザインには影響しない。

---

### 4.8 送信完了画面（§3.5）

#### 4.8.1 構造

```
✓ アイコン（.successIcon / 既存・72px・--gradient-accent）
　↓ 28px
見出し（.successH2）         ... お申し込みありがとうございます。
　↓ 16px
本文（.successText）         ... 翌営業日（土日祝を除く）までに、〜日程を確定させていただきます。
　↓ 36px
次のステップ（.successSteps）... 箇条書き3〜4項目・左揃え
　↓ 28px
締めの一文（.successClosing）... お話しできるのを楽しみにしています。
　↓ 36px
ボタン1つ（.successActions） ... [主] トップページに戻る（決定事項E2）
　↓ 40px
送信内容（<details> .submittedDetails）... 既定で閉じる
```

#### 4.8.2 CSS

```css
.successBox {
  max-width: 600px;          /* 旧540px */
  margin: 0 auto;
  text-align: center;
  padding: 72px 0 40px;
}
.successBox:focus { outline: none; }   /* プログラム的フォーカス用。§4.8.4 */

/* .successIcon / .successH2 / .successText は既存流用。successH2 のみ 26px に */
.successH2 { font-size: 26px; }

.successSteps {
  max-width: 460px;
  margin: 0 auto;
  text-align: left;
  list-style: none;
  padding: 24px 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-secondary);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.successStepItem {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-text-sub);
}
.successStepItem::before {
  content: "";
  position: absolute;
  left: 0;
  top: 9px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.successClosing {
  margin-top: 28px;
  font-size: 15px;
  color: var(--color-text);
}

.successActions {
  margin-top: 36px;
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

/* 送信内容（折りたたみ） */
.submittedDetails {
  max-width: 560px;
  margin: 40px auto 0;
  text-align: left;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.015);
}
.submittedSummary {
  padding: 14px 20px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-text-sub);
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
}
.submittedSummary::-webkit-details-marker { display: none; }
.submittedSummary::after {
  content: "";
  /* chevron SVG・開閉で rotate(180deg) */
  transition: transform 0.2s ease;
}
.submittedDetails[open] .submittedSummary::after { transform: rotate(180deg); }
.submittedBody { padding: 4px 20px 20px; }
```

`.submittedRow` / `.submittedLabel` / `.submittedValue` は既存流用（ただしモバイルの1カラム化も既存どおり）。

**送信内容を折りたたむ理由**: 完了画面で最も重要なのは「次に何が起きるか」と「次のアクション」。送信内容は成功の証跡として必要だが、常時展開すると2ボタンが画面外に押し出され、次の回遊が起きない。

**表示制御**: 未入力の任意項目（会社名・ご相談内容・希望日時）は**行ごと非表示**にする（構成案 §3.5 の指摘に対応）。テーマは選択したラベルを `、` 区切りで表示。

#### 4.8.3 次のステップのコピー（自動返信メール実装前後）

決定事項D11・§10.3 により、Resend実装完了までは「数分以内に、確認の自動返信メールをお送りします」の行を**出さない**。

```
フェーズ1・2（現時点で実装する版・3項目）:
  ・メールが届かない場合は、迷惑メールフォルダをご確認ください
  ・当日までにご準備いただくものはありません
  ・ご予定が変わった場合は、返信メールにそのままご返信ください

フェーズ3（Resend実装後・先頭に1行追加）:
  ・数分以内に、確認の自動返信メールをお送りします
```

実装上は配列の先頭要素をフラグで出し分けられる形にしておく（例: `const AUTO_REPLY_ENABLED = false;` の定数1つで切り替え）。

#### 4.8.4 完了画面への遷移時の挙動

現行はフォーム位置のまま完了画面に差し替わるため、**スクロール位置によっては完了メッセージが画面外**になる。

- `.successBox` に `tabIndex={-1}` `role="status"` `aria-live="polite"` を付与
- 成功時に `ref.current?.focus()` → `ref.current?.scrollIntoView({ block: "start", behavior: "smooth" })`
- スクロール追従CTA（§5）は `status === "success"` のとき非表示にする

#### 4.8.5 ボタンの遷移先（決定事項E2）

- 主要「トップページに戻る」: `.btnPrimary` → `/`

**当初案の「サービス内容を見る（`/service/dx-ax`）」＋「トップページに戻る」の2ボタン構成は不採用。**
遷移先をトップページとする判断を受け、2つのボタンが同じ遷移先になるため1つに集約する。
申込直後にサービスページへ誘導する必然性は高くなく、ボタンが1つのほうが完了画面として静かに収まる。

---

## 5. スクロール追従CTA（論点1）

### 5.1 採用判断

| 環境 | 判断 | 理由 |
|---|---|---|
| Desktop（≥768px） | **不採用** | (1) Nav に常時「無料相談する」CTAが表示されており、実質的な追従CTAが既に存在する (2) PCはスクロール量が体感的に短く、`End`キー・スクロールバーで移動できる (3) 固定バーは1600px幅のページ下部を常に占有し、余白設計を壊す |
| Mobile（≤767px） | **採用** | (1) モバイルNavではCTA（`.mobileCtaPrimary`）がハンバーガーメニュー内に隠れており、**常時見えるCTAが存在しない** (2) 8セクションのページをスクロールするコストがPCより大きい (3) 親指の可動域に主要アクションを置くのがモバイルの原則 |

### 5.2 仕様

```css
.stickyCta {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: var(--z-sticky-cta);             /* 90。Nav(100)より下 */
  padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
  background: rgba(7, 11, 20, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--color-border);
  transform: translateY(110%);
  transition: transform 0.25s ease;
}
.stickyCtaVisible { transform: translateY(0); }

.stickyCtaBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 52px;
  background: var(--gradient-accent-onlight);   /* §2.3: 白文字で AA を満たす方 */
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border-radius: var(--radius-btn);
  text-align: center;
}

.stickyCtaNote {
  margin-top: 6px;
  text-align: center;
  font-size: 11px;
  line-height: 1.5;
  color: var(--color-text-help);
}

/* Footer最下部がバーに隠れないためのスペーサー（共通Footerを触らずに解決する） */
.stickyCtaSpacer {
  height: calc(78px + env(safe-area-inset-bottom));
}

@media (min-width: 768px) {
  .stickyCta,
  .stickyCtaSpacer { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .stickyCta { transition: none; }
}
```

- ボタン文言: **「相談フォームへ進む」**（Hero主CTAと同文言にし、同じ行き先であることを示す）
- `.stickyCtaNote`: 「その場で契約を迫ることはありません。」
- `<a href="#form">` で `#form` へ。`.anchorTarget` の `scroll-margin-top` が効くので Nav に隠れない
- 追従バーは `<nav aria-label="フォームへのショートカット">` で囲む

### 5.3 表示条件

```
表示する  : Hero の CTA が画面外に出た後
非表示にする: フォームセクション（#form）が viewport に入っている間
非表示にする: status === "success"（送信完了画面）
```

実装は IntersectionObserver 2つ（現行の reveal 用 Observer とは別に用意）:
1. Hero CTA 直後に置いた `<div ref={heroSentinelRef} aria-hidden="true" />` を監視 → `isIntersecting === false` で「Heroを過ぎた」
2. `#form` の `<section>` を監視（`rootMargin: "0px 0px -20% 0px"`）→ `isIntersecting === true` で「フォームが見えている」

`visible = passedHero && !formInView && status !== "success"`

**スクロール位置ベース（`window.scrollY > N`）は使わない** — ページ長がコンテンツ量で変動するため。

### 5.4 Footer最下部の欠けへの対処

固定バーが Footer の著作権表記等を覆うのを防ぐため、`<Footer />` の直後に `<div className={cs.stickyCtaSpacer} aria-hidden="true" />` を置く。
共通 `Footer.tsx` / `page.module.css` を触らずに `/contact` 内で完結させられる。

---

## 6. レスポンシブ設計まとめ

ブレークポイントはデザインシステム §4.4 に準拠（Mobile ≤767 / Tablet 768–1023 / Desktop ≥1024）。

| セクション | Desktop (≥1024) | Tablet (768–1023) | Mobile (≤767) |
|---|---|---|---|
| Hero | 左揃え・バッジ横wrap・CTA横並び | 同左 | CTA縦積み（主CTA full width）・padding 100/56 |
| 相談例（8枚） | 4カラム | 2カラム | 1カラム・padding 18/20 |
| お約束（3枚） | 3カラム縦型 | **1カラム横型**（アイコン左） | 1カラム横型・padding 28 |
| 持ち帰り（4枚） | 2カラム | 2カラム | 1カラム |
| タイムライン | 水平3列 | 水平3列 | **垂直**（左に縦軸線） |
| 流れ（4ステップ） | 番号円60px・gap 32 | 同左 | 番号円48px・gap 20 |
| フォーム全体 | カードpadding 56 / 2カラムgrid | 同左 | **padding 28/20**・1カラム |
| テーマチップ | wrap（2〜3行） | wrap | wrap・font 14px・gap 8 |
| 希望日時 | `.textarea` 全幅（`grid-column: 1 / -1`）| 同左 | 同左（横並びが存在しないため対処不要） |
| 送信ボタン | inline（padding 18/56） | 同左 | **width 100%** |
| FAQ | max-width 860 | 同左 | 質問 font 16px（既存CSS準拠） |
| 追従CTA | 非表示 | 非表示 | **表示** |
| 完了画面 | max-width 600・ボタン横並び | 同左 | ボタン縦積み full width |

**モバイルでフォームカードのpaddingを28px/左右20pxに狭める根拠**: 375px幅から左右のcontainer padding 20px×2 を引いて335px。フォームカードのpaddingを56pxのままだと入力欄の実幅が223pxしかなく、テーマチップ（`min-height: 48px` のピルを2〜3個/行で折り返す）が窮屈になる。現行CSSも `padding: var(--space-card-pad-mobile) 20px` になっているため、**既存踏襲でよい**。

> 希望日時がフリーテキストになったことで、当初この padding を規定していた「開始〜終了の横並びが成立するか」という制約は消滅した。現在の律速はテーマチップ。

---

## 7. アクセシビリティ要件

| 項目 | 仕様 |
|---|---|
| コントラスト | §2.3 の表に従う。`--color-muted` を読ませるテキストに使わない |
| タップターゲット | すべての操作要素を 44×44px 以上。チップ48px / 入力48px / 同意行48px / 追従CTA 52px / 削除ボタン40px（周囲 gap 10px 込みで実効44px超） |
| フォーカス可視 | 新規要素は `outline: 2px solid var(--color-accent); outline-offset: 2px`。既存入力の `box-shadow: 0 0 0 3px rgba(79,142,247,0.15)` は弱いため、**新規要素では outline を併用**する |
| キーボード | チップは `<input type="checkbox">` が実体なので Tab + Space で操作可。`.themeChipInput` は `display:none` ではなく**視覚的隠蔽（clip-path）** にすること（`display:none` だとフォーカス不能になる） |
| フォーム構造 | テーマ群は `<fieldset>/<legend>`、日時枠は `role="group" aria-label="ご希望の日時"` |
| エラー | `aria-invalid` / `aria-describedby` / `role="alert"`。送信時に最初のエラーへフォーカス移動 |
| 動的変化 | 「候補を追加」後に新しい日付入力へフォーカス移動。「後日調整」チェックに `aria-controls` |
| 完了通知 | `.successBox` に `role="status"` + プログラム的フォーカス（§4.8.4） |
| 動きの抑制 | `prefers-reduced-motion` で reveal・スピナー・枠追加アニメ・追従バーのtransitionを無効化。加えて `html { scroll-behavior: auto }` を提案（§3.3） |
| 装飾要素 | すべてのインラインSVGに `aria-hidden="true" focusable="false"` |
| 見出し階層 | H1（Hero）→ H2（各セクションタイトル）→ H3（カード見出し・FAQ質問）。スキップしない |

---

## 8. アニメーション仕様

| 要素 | 内容 | duration / easing |
|---|---|---|
| セクション入場 | 既存 `.reveal` → `.revealed`（opacity + translateY 28px） | 0.65s ease（既存） |
| カード hover | `translateY(-4px)` + border-color | 0.3s ease |
| チップ | background / border-color / color のみ（**transform なし**） | 0.15s ease |
| 日時枠の追加 | `slotIn`（opacity + translateY -6px） | 0.22s ease |
| 送信中スピナー | `spin` 回転 | 0.7s linear infinite |
| 追従CTA | `translateY(110% → 0)` | 0.25s ease |
| `<details>` の矢印 | `rotate(180deg)` | 0.2s ease |

すべて `@media (prefers-reduced-motion: reduce)` で無効化。

---

## 9. 新規クラス一覧（実装チェックリスト）

### 9.1 `app/globals.css`（追記）

- [ ] `--color-text-help: #8C9AC0`
- [ ] `--space-section-compact: 96px` / `--space-section-compact-mobile: 64px`
- [ ] `--z-sticky-cta: 90`
- [ ] （任意）`prefers-reduced-motion` 内に `html { scroll-behavior: auto }`

### 9.2 `app/page.module.css`（追記・全ページ共通型）

- [ ] `.eyebrow`（デザインシステム §5.4 の型を初実装）
- [ ] `.eyebrowJa`（和文バリアント）

### 9.3 `app/contact/contact.module.css`（新規クラス）

| カテゴリ | クラス |
|---|---|
| 共通 | `.anchorTarget` `.sectionCompact` |
| Hero | `.contactHero` `.heroCtaRow` `.heroCtaMain` `.trustBadgeRow` `.trustBadge` `.trustBadgeIcon` `.heroSla` `.heroRiskReversal` |
| 相談例 | `.themeExampleGrid` `.themeExampleCard` `.themeExampleIcon` `.themeClosing` |
| お約束 | `.promiseGrid` `.promiseCard` `.promiseIconBox` `.promiseH3` `.promiseBody` `.promiseNote` |
| 持ち帰り | `.takeawayGrid` `.takeawayCard` `.takeawayNum` `.takeawayH3` `.takeawayBody` `.timelineWrap` `.timelineTitle` `.timelineTrack` `.timelineStep` `.timelineTime` `.timelineBody` `.presenterNote` `.presenterNoteLink` |
| 流れ | `.flowList` `.flowItem` `.flowNum` `.flowContent` `.flowH3` `.flowBody` `.flowPill` |
| フォーム | `.formSection` `.formSectionGlow` `.formInner` `.formLead` `.formDivider` `.formDividerLabel` `.optional` `.helpText` |
| テーマチップ | `.themeFieldset` `.themeLegend` `.themeChipGroup` `.themeChip` `.themeChipInput` `.themeChipCheck` `.themeChipLabel` |
| 希望日時 | **新規クラスなし**（既存 `.fieldWrap` `.label` `.textarea` `.helpText` を流用） |
| 同意・送信 | `.privacyCheck` `.privacyCheckError` `.submitSpinner` `.submitNote` `.submitNoteMuted` |
| FAQ | `.contactFaqWrap` |
| 完了画面 | `.successSteps` `.successStepItem` `.successClosing` `.successActions` `.submittedDetails` `.submittedSummary` `.submittedBody` |
| 追従CTA | `.stickyCta` `.stickyCtaVisible` `.stickyCtaBtn` `.stickyCtaNote` `.stickyCtaSpacer` |

### 9.4 変更する既存クラス（contact.module.css 内）

| クラス | 変更内容 |
|---|---|
| `.required` | 色・背景・ボーダーを強化（§4.6.4） |
| `.errorMsg` | 12px → 13px、アイコン併記のため flex 化 |
| `.submitBtn` | padding 16→18px、`display: inline-flex`（スピナー併置） |
| `.submitError` | 囲み（border + background）を追加 |
| `.successBox` `.successH2` | max-width 540→600、H2 24→26px |
| `.input::placeholder` `.textarea::placeholder` | `--color-muted` → `--color-text-help` |
(希望日時まわりの既存クラスは変更ではなく**削除**になる。§9.5 を参照)

### 9.5 削除する既存クラス

| クラス | 理由 |
|---|---|
| `.loading` / `@keyframes pulse` | スピナーに置き換え |
| `.dateSlot` `.dateSlotLabel` `.dateSlotSep` `.dateSlotMeta` `.dateSlotRight` `.dateSlotInputs` `.dateInput` `.timeSelectWrap` `.timeSelect` `.timeSelectColon` `.timeInput` | **希望日時の構造化UIが全廃**され、フリーテキスト1項目（既存 `.textarea` 流用）に置き換わるため（決定事項E1最終版） |

> **あわせて `app/contact/page.tsx` から削除するもの**
>
> - `TimeSelect` コンポーネント
> - `HOURS` / `MINUTES` 定数
> - `dateFields` 配列（第1〜第5希望の定義）
> - `validateSlot()` と、それに紐づくエラー state の枝
> - `initialForm` の `date1Date`〜`date5End`（15個）→ `preferredDate` 1つに置き換え
>
> 希望日時はフォーム内で最大のコード量を占めていたため、**この変更は実装の正味の削減になる**。

### 9.6 `app/components/FaqAccordion.tsx`

- [ ] `groups?` / `showTabs?` props を追加（既定値で後方互換を維持）
- [ ] （任意）`<dl>` の構造・`aria-controls` の是正

### 9.7 `lib/seo/faqs.ts`

- [ ] `CONTACT_FAQS`（13問）を追加

---

## 10. 既存流用 / 新規 の区分サマリー

| 要素 | 既存流用 | 新規 |
|---|---|---|
| カラー・角丸・余白トークン | ほぼ全て | 3種（`--color-text-help` / `--space-section-compact*` / `--z-sticky-cta`） |
| ボタン | `.btnPrimary` `.btnGhost` `.submitBtn` | `.stickyCtaBtn` |
| カード | 標準カード型（§5.2）の値をそのまま適用 | 形状は新規だが、値は全て既存トークン |
| 入力要素 | `.input` `.textarea`（希望日時にも流用） `.label` `.fieldWrap` `.formGrid` `.form` | `.themeChip` `.privacyCheck` |
| ステップ表現 | `/partner` の `.partnerStep*` の構造 | 色のブルー化のみ（`.flow*` として複製） |
| FAQ | `FaqAccordion` + `FaqAccordion.module.css`（CSS変更ゼロ） | props追加のみ |
| 完了画面 | `.successBox` `.successIcon` `.successText` `.submittedRow/Label/Value` | `.successSteps` `.submittedDetails` |
| スクロールreveal | 既存 IntersectionObserver | 追従CTA用に Observer 2つ追加 |
| アイコン | — | インラインSVG 約14点（全て線画・1.5px stroke・currentColor） |

---

## 11. 実装時に判断が必要な点・確認事項

実装開始をブロックするものは **1件もない**（すべて暫定仕様を本書に記載済み）。

| # | 項目 | 本書の暫定仕様 | 判断者 |
|---|---|---|---|
| 1 | ~~希望日時の入力UI~~ | **決定: フリーテキスト1項目**（決定事項E1最終版）。検討した3案（時間帯セレクト／開始のみ／開始〜終了）はすべて不採用。構造化UIそのものを廃止 | 決定済 |
| 2 | ~~時刻ラベルのモバイル短縮~~ | **決定事項E1最終版により論点ごと消滅**（時刻セレクトが存在しない） | 決定済 |
| 3 | ~~`::placeholder` の色を全ページで統一するか~~ | **決定: 本フェーズは `/contact` 内のみ**（決定事項E4）。`/contact` で実装した見え方を確認したうえで、全ページ展開を後日判断する | 決定済 |
| 4 | FAQ Q12 の強調（`**〜**`）の扱い | `.answer` は `white-space: pre-line` のプレーンテキストのため Markdown は効かない。`<strong>` を含む JSX にするか、強調なしにするか | 実装者 |
| 5 | ~~完了画面の主要ボタンの遷移先~~ | **決定: トップページ（`/`）。ボタンは1つに集約**（決定事項E2・§4.8.5） | 決定済 |
| 6 | 安心バッジのアイコン形状 | 本書の指定（時計・ディスプレイ・月・書類＋斜線 等）。SVGパスは実装者が Heroicons / Lucide 等の Outline 系から選定し、**インラインで埋め込む**（ライブラリ依存を増やさない）。ライセンス表記が必要なものは避ける | 実装者 |
| 7 | 相談例8項目の並び順 | 構成案どおり。将来クリック計測をするなら順序の入れ替えテストが可能 | — |
| 8 | ~~電話番号欄の追加~~ | **決定: 追加しない**（決定事項E3）。設計済みの内容どおり | 決定済 |
| 9 | 追従CTAをPCにも出すか | 出さない。将来出す場合は右下フローティングボタン（56px円 or ピル）を推奨。固定バーはPCでは余白設計を壊す | デザイナー |
| 10 | `/shindan` 等からの流入パラメータ（`?from=`）でのテーマ自動チェック | UIとしてはチップに初期 `data-checked="true"` が付くだけで、デザイン変更は不要。フェーズ3で実装 | — |
| 11 | 時刻セレクトの既定ラベル | 確定仕様は「開始＝時刻はおまかせ／終了＝〜」だったが、**開始＝「おまかせ」／終了＝「指定なし」** に調整した。理由は①終了を「〜」にするとセパレータ「〜」と重複表示になる ②「時刻はおまかせ」（98px）はモバイルのセレクト文字領域75.5pxに収まらない（§4.6.6 の実幅計算）。`value` は仕様どおり空文字で変更なし。意味は補助テキストで補う | 代表 |
| 12 | 終了セレクトを「開始が未選択のあいだ `disabled`」にするか | 本書は `disabled` を採用（「終了のみ選択」という曖昧な状態を構造的に封じ、バリデーションを増やさないため）。代わりに「終了のみ＝その時刻までに」と解釈して許容する案もあるが、意味が伝わりにくく誤入力を誘発する | 実装者 |

---

## 12. デザインシステムへの追補（`.claude/skills/web-design-system/design-spec.md` §13 として反映済み）

本ページで新たに定義し、サイト共通の型として扱うべきもの:

1. **`--color-text-help` トークンの新設**と、`--color-muted` の用途制限（読ませるテキストに使わない）
2. **`.eyebrow` / `.eyebrowJa`** — §5.4 の型を `page.module.css` に初実装。和文バリアントを追加
3. **`--space-section-compact`** — セクション数の多いLP型ページ向けの圧縮スペーシング
4. **トグルチップ型** — 複数選択UIの標準形（`data-checked` 属性駆動）
5. **アイコン方針** — Hero・信頼訴求領域では絵文字を使わず、1.5pxストローク・`currentColor` の線画インラインSVGに統一する
6. **モバイル固定CTAバー型**（`--z-sticky-cta` = 90 / Nav の 100 より下）
7. **`scroll-margin-top`** — Nav固定分のアンカー補正（96px / SP 88px）。既存の `#entry`・`#services` にも同じ不具合がある

---

## 付録: フォームのフィールド名（API仕様との対応・参考）

構成案 §7.2 の API 改修と一致させるため、デザイン上の項目とフィールド名の対応を記載する。

| 画面上の項目 | フィールド名 | 型 | 必須 |
|---|---|---|---|
| お名前 | `name` | string | ○ |
| メールアドレス | `email` | string | ○ |
| ご相談のテーマ | `categories` | string[] | ○（1つ以上） |
| ご相談内容 | `content` | string | — |
| 会社名・屋号 | `company` | string | — |
| ご希望の日時 | `preferredDate` | string（自由記述・最大500文字） | — |
| プライバシー同意 | `privacy` | boolean | ○ |
| （将来）流入元 | `source` | string | — |

**現行 `route.ts` との差分（重要）**

希望日時が**15フィールド（`date1Date`〜`date5End`）から `preferredDate` 1つに減る**。
これは API 改修としても正味の削減になる。

| 観点 | 現行 | 改修後 |
|---|---|---|
| フィールド数 | `dateNDate` / `dateNStart` / `dateNEnd` × 5枠 = **15個** | `preferredDate` **1個** |
| 値の形式 | `YYYY-MM-DD` と `"HH:MM"` | 自由記述の文字列（最大500文字） |
| 検証 | 「30分以上の幅」「部分入力時の全項目必須」をフロント側で実施 | **なし**（長さ上限のみ） |
| `formatSlot()` | `YYYY/MM/DD HH:MM〜HH:MM` に整形。5枠をループして空枠を除外 | **関数ごと削除**。`preferredDate` をそのまま出力 |
| Slack通知 | 希望日時を5行のリストで出力 | 1ブロックで出力。空文字のときは**ブロックごと省略** |

> **セキュリティ上の注意（構成案 §7.3 と同じ）**: `preferredDate` はユーザーの自由入力が
> そのまま Slack の mrkdwn に渡るため、`content` / `name` などの既存の自由記述項目と
> **同じエスケープ方針を適用する**こと。選択式ではなくなったため、許可値リストによる照合は使えない。

