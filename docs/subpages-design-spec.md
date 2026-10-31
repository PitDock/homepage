# 下層ページ デザイン統一仕様（トップページ新デザイン準拠）

作成: 2026-10-31 / 作成者: web-designer / ブランチ: `feature/design_renewal`
実装担当: homepage-builder

> 目的: トップページ（`app/page.tsx` + `app/home.module.css`、Figma「pitdock-desktop」準拠のライトテーマ）で確立したデザイン言語を、PitDock本体の下層ページ本文に展開し、サイト全体の統一感を出す。
> 文章・構成は原則変更しない。見た目のみを揃える。コンテンツ変更が必要と思われる点は §9「コンテンツ変更の提案」に分離した。
> 自社プロダクトLPは対象外（§2.2）。

---

## 0. 実装前に必ず読むこと（重要な制約）

1. **`app/globals.css` の `:root` と `body` は変更しない。**
   ダークテーマのトークン（`--color-text` `--color-border` `--color-accent` 等）と `body { background: var(--color-bg) }` は、Duosub / SafePage / Gentle Diary の各LPと規約ページが今も参照している。ここを書き換えるとLPが壊れる。
2. **`app/page.module.css` は変更しない（削除もしない）。**
   プロダクト配下の規約ページ（`/service/products/duosub/terms`、`/safepage/terms_of_use`、`/gentle-diary/terms`、`/gentle-diary/privacy`）が `pageHero` `pageHeroTerms` `breadcrumb` などを import している。下層ページはこのファイルへの依存を外し、新しい共通モジュールに乗り換える。未使用になったクラスの掃除は本タスクでは行わない（別タスクとして §10 に記載）。
3. **`app/home.module.css` / `app/page.tsx`（トップページ）は変更しない。** トップと同じ値を新モジュールに複製する（共通ヘッダー・フッター `site.module.css` が既に採っているのと同じ方式）。
4. **トークンはページのラッパー要素（`.page`）に閉じる。** `home.module.css` の `.page` と同じやり方。カスタムプロパティは子孫に継承されるので、各ページ固有の `*.module.css` からも `var(--brand-*)` がそのまま使える。
5. **Tailwind は使わない。** 既存どおり CSS Modules。

---

## 1. トップページのデザイン言語（抽出結果）

下層ページはこの表に書いてある値だけで組む。新しい色や角丸、影は足さない。

### 1.1 カラートークン（`home.module.css` `.page` より）

| トークン | 値 | 用途 | 白背景でのコントラスト |
|---|---|---|---|
| `--brand-pit-blue` | `#14509E` | メインのボタン、見出しのアクセント、リンク、カード見出し | 7.9:1（AAA） |
| `--brand-dock-blue` | `#3AA0E8` | 罫線、カードの枠線、装飾用の英字・番号 | 2.85:1（**本文やUIの文字には使わない**） |
| `--brand-ink` | `#0E1B2C` | 本文、見出し | 17:1 |
| `--brand-tint` | `#EEF5FC` | ページ下端のグラデーション終点、タグの背景、サムネイルの背景、ヘッダー・フッターの背景 | — |
| `--brand-gray` | `#5A616B` | 補足テキスト（日付・注記・ヘルプ） | 6.3:1（AA） |
| `--brand-white` | `#FFFFFF` | カードの背景、帯の上の文字 | — |
| `--note-border` | `#C7CCD1` | 薄い罫線（フォームの入力枠、長文の区切り線） | — |
| `--brand-pit-blue-hover` | `#0F3F7E` | ボタンのホバー | — |
| `--brand-white-hover` | `#DCE9F7` | 白ボタン・枠線ボタンのホバー | — |

**下層ページで追加するトークン（新規、`.page` 内に定義）**

| トークン | 値 | 理由 |
|---|---|---|
| `--brand-error` | `#C62828` | フォームのエラー表示。トップにはフォームがないため新設。白背景で 5.6:1（AA） |
| `--focus-ring` | `0 0 0 3px rgba(20, 80, 158, 0.28)` | 入力欄にフォーカスしたときの補助リング（枠線の色変更と併用） |

### 1.2 タイポグラフィ

- フォント: `font-family: var(--font-space), var(--font-zen), "Hiragino Sans", sans-serif;`（欧文 Space Grotesk、和文 Zen Kaku Gothic New）。`app/fonts.ts` の `brandFontVariables` をラッパーに付ける。
- 太さは 400 / 700 の2段階だけ（fonts.ts で読み込んでいるのがこの2つ）。500 / 600 は使わない。
- 文字間隔の調整や `palt` はトップでは使っていないので、下層でも使わない。

| 役割 | PC | SP（≤767px） | 備考 |
|---|---|---|---|
| 英字ディスプレイ（`.bt`） | 48px / 1.2 / 700 | 34px | Space Grotesk、2色に塗り分ける |
| H1・セクション見出し H2 | 28px / 1.5 / 700 | 22px | 色は ink |
| 長いH1（お知らせ詳細など） | 24px / 1.5 / 700 | 20px | 新設 |
| プロフィール見出し | 24px / 1.4 / 700 | 18px / 1.5 | |
| カード見出し H3（強） | 22px / 1.45 / 700 | 18px / 1.5 | 色は pit-blue |
| カード見出し H3（弱） | 18px / 1.35 / 700 | 17px / 1.5 | 色は ink |
| 本文 | 16px / 2 / 400 | 15px | |
| 小さい文字（表のラベル・タグ・パンくず） | 13px / 1.4 | 13px | |
| 日付・番号（欧文） | Space Grotesk | | |

### 1.3 スペーシング・レイアウト

| 項目 | PC | SP（≤767px） |
|---|---|---|
| コンテンツの最大幅（`.inner`） | 1280px、中央寄せ | — |
| セクション上下（`--section-pad-y`） | 100px | 64px |
| セクション左右（`--section-pad-x`） | 80px | 24px |
| ブロック内の要素間隔（`.block`） | 40px | 32px |
| 見出しとリード文の間隔（`.secHead`） | 14px | 14px |
| カードグリッドの間隔 | 20px | 20px（1列のとき 16px） |
| カード内側の余白 | 20px | 20px |
| ヘッダーの高さ（`--header-height`） | 88px（≥1152px） | 56px（≤1151px） |

- ブレークポイントはトップと同じ: `1279px` / `1199px` / `1151px`（ヘッダー切り替え）/ `1023px` / `767px`。
- 横並びはすべて**左揃え**（トップには中央揃えの見出しがない）。現状の下層ページで中央揃えになっている見出し・CTAは、すべて左揃えに変える。

### 1.4 形と装飾のルール

- **角丸は使わない**（0px）。例外はタグの 2px だけ。現行下層ページの `--radius-lg`(20px) などはすべて外す。
- **影を付けない。ホバーで浮き上がらせない**（`transform` / `box-shadow` は使わない）。ホバーでは色だけ変え、`transition: background-color 0.2s` または `color 0.2s` にする。
- **グラデーション背景、光彩（glow / orb）、パーティクル、アニメーションするグラデーションは使わない。** ページの背景は全体で1枚の `linear-gradient(180deg, #FFFFFF 0%, #EEF5FC 100%)` だけ。
- 区切りは罫線で表す。強い区切りは `1px solid var(--brand-dock-blue)`、長文の中の弱い区切りは `1px solid var(--note-border)`。
- セクション見出しの前には **Pマーク**（`/brand/p-mark.svg`）を置く。これがトップの最も特徴的な要素なので、下層ページでも全部の H2 に付ける。
- 背景色で目立たせる帯は、**pit-blue の CTA 帯（トップの Contact と同じ）だけ**にする。セクションごとに背景色を交互に変えることはしない（トップもしていない）。

### 1.5 モーション

- トップの動きはリボン（`Ribbon.tsx`）だけで、スクロールに合わせたフェードインはない。
- **下層ページではスクロール連動のフェードイン（`.reveal` / `.revealed` と、それを付けている `IntersectionObserver` の `useEffect`）を外す。** あわせて、カードの `transitionDelay` の inline style も外す。
  - 理由: トップの「静かでフラット」な印象に揃えるため。また、フェードインを外すとフォームのない5ページ（dx-ax / system-dev / tech-advisor / products / company-info）から `"use client"` を外せる。初期表示が軽くなる。
- リボンは下層ページには置かない。`Ribbon.tsx` はトップの各セクションの位置（Figma 上の y 座標）に合わせて描かれていて、ほかのページでは位置が合わないため。
- `prefers-reduced-motion` については、残るのが色の transition（0.2s）だけなので、対応は不要。

---

## 2. 対象ページ・対象外ページ

### 2.1 対象（本文のデザインを変える）

| # | パス | ファイル | 現在の状態 | 優先度 |
|---|---|---|---|---|
| 1 | `/service/dx-ax` | `app/service/dx-ax/page.tsx` | 旧ダークテーマ（`page.module.css`） | 高 |
| 2 | `/service/system-dev` | `app/service/system-dev/page.tsx` | 同上 | 高 |
| 3 | `/service/tech-advisor` | `app/service/tech-advisor/page.tsx` | 同上 | 高 |
| 4 | `/service/products` | `app/service/products/page.tsx` | 同上（プロダクトの**一覧ページ**。LPではない） | 高 |
| 5 | `/company-info` | `app/company-info/page.tsx` + `company.module.css` | 同上 | 高 |
| 6 | `/contact` | `app/contact/page.tsx` + `contact.module.css` + `components/FaqAccordion.module.css` | 同上 | 高 |
| 7 | `/partner` | `app/partner/page.tsx` + `partner.module.css` | 同上（独自のヒーローと、アンバー色のアクセント） | 中 |
| 8 | `/news` | `app/news/page.tsx` | 同上 | 中 |
| 9 | `/news/4` | `app/news/4/page.tsx` + `news4.module.css` | 同上 | 中 |
| 10 | `/news/8` | `app/news/8/page.tsx` + `news8.module.css` | 同上 | 中 |
| 11 | `/privacy` | `app/privacy/page.tsx` + `privacy.module.css` | 同上 | 低 |
| 12 | `/personal-info` | `app/personal-info/page.tsx` + `personal-info.module.css` | 同上 | 低 |
| 13 | 404（`not-found`） | `app/not-found.tsx` + `not-found.module.css` | 旧ダーク＋パーティクル | 低（§11 確認事項 Q4） |

ヘッダー・フッターは、直前のコミット `1f07cab` で全ページに反映済み。今回は触らない。

### 2.2 対象外（変更しない）

| パス | 理由 |
|---|---|
| `/service/products/duosub` | 自社プロダクトLP |
| `/service/products/gentle-diary` | 自社プロダクトLP（A/Bテスト中） |
| `/service/products/dinder` | 自社プロダクトLP |
| `/service/products/safepage` | 自社プロダクトLP |
| `app/components/LpProductFooter*` | LP専用のフッター |
| `/` トップページ | 統一の基準になるページ |

### 2.3 判断を保留したページ（§11 確認事項 Q1）

| パス | 状況 |
|---|---|
| `/service/products/duosub/terms` | プロダクトの利用規約。共通ヘッダー・フッターはなく、旧ダークテーマ |
| `/service/products/safepage/terms_of_use` | 同上 |
| `/service/products/gentle-diary/terms` | 同上 |
| `/service/products/gentle-diary/privacy` | プロダクトのプライバシーポリシー。**共通ヘッダー・フッター（ライト）は付いているが、本文はダーク**で、見た目がちぐはぐになっている |

本仕様では、プロダクトに付属する文書としてLPと同じ扱い（**対象外**）を仮置きにする。対象に入れることになった場合は、§8.10 の「規約文書」レイアウトをそのまま当てはめられる。

---

## 3. 実装方針（共通化）

### 3.1 新規ファイル

```
app/components/sub/
  sub.module.css        ← 下層ページ共通のトークンとクラス（本仕様 §4〜§6）
  SubPage.tsx           ← ラッパー（.page + フォント + SiteHeader + main + SiteFooter）
  PageHero.tsx          ← 下層ページのヒーロー（パンくず・英字ラベル・H1・リード・ボタン）
  SectionHeading.tsx    ← Pマーク付き H2（任意でリード文）
  CtaBand.tsx           ← ページ末尾の pit-blue CTA 帯
```

いずれも Server Component にする（`"use client"` を付けない）。クライアント側の処理がいるページ（contact / partner / news）でも、これらは children として import できる。

### 3.2 `SubPage.tsx`

```tsx
import SiteHeader from "../site/SiteHeader";
import SiteFooter from "../site/SiteFooter";
import { brandFontVariables } from "../../fonts";
import s from "./sub.module.css";

export default function SubPage({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${s.page} ${brandFontVariables}`}>
      <SiteHeader />
      <main className={s.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
```

- 各ページの `<>…<SiteHeader />…<SiteFooter /></>` をこれに置き換える。
- contact のモバイル追従CTA（`<nav className={cs.stickyCta}>`）は `SubPage` の children の末尾に置く。`position: fixed` なので、置く場所で見た目は変わらない。
- partner は今 `<main>` を独自に持っている。`SubPage` の `main` と二重にならないよう、ページ側の `<main>` は外す。

### 3.3 `PageHero.tsx` の props

```ts
type Crumb = { label: string; href?: string };    // href なし = 現在のページ（aria-current="page"）
type Props = {
  breadcrumbs: Crumb[];                 // 先頭の「ホーム」も含めて渡す
  en?: [string, string];                // 英字ラベル [Pit色の語, Dock色の語]。§11 Q2 の回答待ち。未指定なら出さない
  title: React.ReactNode;               // H1
  titleSize?: "default" | "long";       // long = お知らせ詳細のような長いH1
  lead?: React.ReactNode;               // 空なら <p> を出さない（現在の空の pageSubCopy は出さない）
  actions?: React.ReactNode;            // ボタン群（.btn / .btnOutline の <a>）
  children?: React.ReactNode;           // contact のバッジなど、ページ固有の追加要素（lead の下、actions の上に入る）
  after?: React.ReactNode;              // actions の下に置く注記（contact の heroRiskReversal）
};
```

### 3.4 `SectionHeading.tsx`

トップの `SectionHeading`（`app/page.tsx` 内）と同じ見た目にする。トップ側はファイルを触らない方針なので、下層用に作り直す。

```tsx
type Props = { id?: string; children: React.ReactNode; lead?: React.ReactNode; as?: "h2" | "h3" };
// <div className={s.secHead}>
//   <h2 id={id} className={s.secHeading}>
//     <img src="/brand/p-mark.svg" alt="" className={s.pMark} width={36} height={30} />
//     <span>{children}</span>
//   </h2>
//   {lead && <p className={s.body}>{lead}</p>}
// </div>
```

### 3.5 `CtaBand.tsx`

```ts
type Props = { heading: React.ReactNode; body?: React.ReactNode; href: string; label: string; external?: boolean };
```

トップの Contact セクション（`.contact`）と同じ見た目にする。§6.4 を参照。

### 3.6 各ページのCSSについて

- `contact.module.css` / `partner.module.css` / `company.module.css` / `privacy.module.css` / `personal-info.module.css` / `news4.module.css` / `news8.module.css` / `not-found.module.css` は、§8 の指定に沿って**中身を書き換える**。
- 書き換えたあとに `var(--color-*)` `var(--radius-*)` `var(--space-*)` `var(--gradient-*)` `var(--font)` が残っていないことを、grep で確認する（受け入れ条件 §12）。
- `className="container"`（グローバルクラス。最大幅 1600px・左右 48px）は使わず、`s.inner`（最大幅 1280px）とセクションの左右パディングに置き換える。

---

## 4. `sub.module.css` — トークンと土台

```css
.page {
  /* トップ（app/home.module.css .page）と同じ値 */
  --brand-pit-blue: #14509E;
  --brand-dock-blue: #3AA0E8;
  --brand-ink: #0E1B2C;
  --brand-tint: #EEF5FC;
  --brand-gray: #5A616B;
  --brand-white: #FFFFFF;
  --note-border: #C7CCD1;
  --brand-pit-blue-hover: #0F3F7E;
  --brand-white-hover: #DCE9F7;
  /* 下層ページで追加 */
  --brand-error: #C62828;
  --focus-ring: 0 0 0 3px rgba(20, 80, 158, 0.28);

  --header-height: 88px;
  --section-pad-y: 100px;
  --section-pad-x: 80px;

  position: relative;
  overflow-x: clip;
  background: linear-gradient(180deg, var(--brand-white) 0%, var(--brand-tint) 100%);
  color: var(--brand-ink);
  font-family: var(--font-space), var(--font-zen), "Hiragino Sans", sans-serif;
  font-size: 16px;
  line-height: 2;
}

/* globals.css の body（ダーク）がオーバースクロール時に見えないようにする */
:global(body):has(.page) { background: var(--brand-white); }

.page ul, .page ol { list-style: none; }
.page [id] { scroll-margin-top: var(--header-height); }

/* キーボード操作時のフォーカス表示（トップでは未定義。下層で新設。dock-blue は 3:1 未満なので pit-blue） */
.page a:focus-visible,
.page button:focus-visible,
.page summary:focus-visible {
  outline: 2px solid var(--brand-pit-blue);
  outline-offset: 2px;
}

.main { padding-top: var(--header-height); }

.inner { position: relative; max-width: 1280px; margin: 0 auto; }

.section { padding: var(--section-pad-y) var(--section-pad-x); }

.block { display: flex; flex-direction: column; gap: 40px; }

.body { font-size: 16px; line-height: 2; }
.note { font-size: 13px; line-height: 1.8; color: var(--brand-gray); }

.pcOnly { display: inline; }
.spOnly { display: none; }

@media (max-width: 1151px) { .page { --header-height: 56px; } }

@media (max-width: 767px) {
  .page { --section-pad-y: 64px; --section-pad-x: 24px; font-size: 15px; }
  .body { font-size: 15px; }
  .block { gap: 32px; }
  .pcOnly { display: none; }
  .spOnly { display: inline; }
}
```

---

## 5. ページヒーロー（`PageHero`）

### 5.1 レイアウト

```
┌──────────────────────────────────────────── max 1280 ─┐
│ ホーム / サービス / DX・AXコンサルティング   ← パンくず 13px │
│                                         ↓ 40px       │
│ DX / AX Consulting.          ← 英字 48px（Q2の回答待ち） │
│                                         ↓ 20px       │
│ DX・AXコンサルティング        ← H1 28px ink           │
│                                         ↓ 20px       │
│ AIとデジタルの力で…          ← リード 16px/2、最大 728px  │
│                                         ↓ 40px       │
│ [無料相談を予約する]  [枠線ボタン]                      │
└───────────────────────────────────────────────────────┘
                     ↓ 次のセクションの padding-top 100px
```

- 狙い: トップの Concept セクション（英字 "Business Transformation." の下に 28px の見出しとリード文）と同じ構成にする。下層ページの冒頭が、トップの「顔」の続きに見える。
- ヒーローは背景を敷かず、ページのグラデーションの上にそのまま置く。下端の罫線も引かない。旧デザインの暗い面や放射グラデーションはやめる。

### 5.2 CSS

```css
.hero { padding: 80px var(--section-pad-x) 0; }
.heroInner { display: flex; flex-direction: column; align-items: flex-start; }

.breadcrumb ol { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; font-size: 13px; line-height: 1.4; }
.breadcrumb a { color: var(--brand-pit-blue); text-decoration: underline; text-underline-offset: 3px; }
.breadcrumb a:hover { color: var(--brand-pit-blue-hover); }
.breadcrumbSep { color: var(--brand-gray); }               /* 区切りの「/」（aria-hidden） */
.breadcrumb [aria-current="page"] { color: var(--brand-ink); }

.heroEn {                                                    /* lang="en" aria-hidden="true" */
  margin-top: 40px;
  font-family: var(--font-space), sans-serif;
  font-size: 48px; line-height: 1.2; font-weight: 700;
}
.heroEnPit  { color: var(--brand-pit-blue); }
.heroEnDock { color: var(--brand-dock-blue); }

.heroTitle { margin-top: 40px; font-size: 28px; line-height: 1.5; font-weight: 700; color: var(--brand-ink); }
.heroEn + .heroTitle { margin-top: 20px; }
.heroTitleLong { font-size: 24px; }

.heroLead { margin-top: 20px; max-width: 728px; font-size: 16px; line-height: 2; white-space: pre-line; }
.heroActions { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 40px; }

@media (max-width: 767px) {
  .hero { padding-top: 40px; }
  .heroEn { margin-top: 24px; font-size: 34px; }
  .heroTitle { margin-top: 24px; font-size: 22px; }
  .heroEn + .heroTitle { margin-top: 12px; }
  .heroTitleLong { font-size: 20px; }
  .heroLead { font-size: 15px; }
  .heroActions { margin-top: 32px; gap: 12px; }
}
```

- `white-space: pre-line` は、現行の lead にある `{"\n"}` の改行をそのまま生かすため。
- 英字ラベルは装飾として扱い、`aria-hidden="true"` にする（意味は H1 が伝える）。dock-blue の文字はコントラストが 2.85:1 で、装飾以外の文字には使えないため。トップの "Transformation." と同じ扱い。

### 5.3 英字ラベル案（§11 Q2 で採否を確認）

| ページ | Pit色（pit-blue） | Dock色（dock-blue） |
|---|---|---|
| dx-ax | `DX / AX` | `Consulting.` |
| system-dev | `System` | `Development.` |
| tech-advisor | `Technical` | `Advisory.` |
| products | `Our` | `Products.` |
| company-info | `Company` | `Profile.` |
| news | `News &` | `Topics.` |
| contact | `Free` | `Consultation.` |
| partner | `Join as a` | `Partner.` |
| privacy | `Privacy` | `Policy.` |
| personal-info | `Personal` | `Information.` |
| news/4, news/8 | 出さない（`titleSize="long"`） | |

不採用になった場合は `en` を渡さずに実装する。H1 の上の余白は 40px になる（CSS で対応済み）。

---

## 6. 共通コンポーネント（`sub.module.css`）

### 6.1 セクション見出し（トップと同じ値）

```css
.secHead { display: flex; flex-direction: column; gap: 14px; }
.secHead .body { max-width: 880px; }
.secHeading { display: flex; align-items: flex-start; gap: 14px; font-size: 28px; line-height: 1.5; font-weight: 700; color: var(--brand-ink); }
.pMark { flex-shrink: 0; width: 36px; height: 28px; object-fit: contain; margin-top: 7px; }

/* セクションの中の小見出し（H3、Pマークなし） */
.subHeading { font-size: 22px; line-height: 1.45; font-weight: 700; color: var(--brand-pit-blue); }

@media (max-width: 767px) {
  .secHeading { font-size: 22px; gap: 6px; }
  .pMark { width: 30px; height: 25px; margin-top: 4px; }
  .subHeading { font-size: 18px; line-height: 1.5; }
}
```

- 現行の `.sectionSub` に `&nbsp;` だけが入っているもの（dx-ax / system-dev / tech-advisor の「選ばれる理由」）は、リード文なしとして出力しない。

### 6.2 ボタン

| クラス | 見た目 | 使う場所 |
|---|---|---|
| `.btn` | pit-blue の面に白文字 | メインの行動（無料相談・送信） |
| `.btnOutline` | 白い面、1px の pit-blue 枠、pit-blue の文字 | 2番目の行動（相談の流れを見る・問い合わせる・詳しく見る） |
| `.btnWhite` | 白い面に pit-blue の文字 | pit-blue の CTA 帯の上でだけ使う |
| `.btnSm` | 上のどれかに付けて小さくする | カードの中のボタン |

```css
.btn, .btnOutline, .btnWhite {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 18px 36px; font-size: 16px; font-weight: 700; line-height: 2;
  border: 1px solid transparent; border-radius: 0; cursor: pointer;
  transition: background-color 0.2s; font-family: inherit;
}
.btn        { background: var(--brand-pit-blue); color: var(--brand-white); }
.btn:hover  { background: var(--brand-pit-blue-hover); }
.btnOutline { padding: 17px 35px; border-color: var(--brand-pit-blue); background: var(--brand-white); color: var(--brand-pit-blue); }
.btnOutline:hover { background: var(--brand-white-hover); }
.btnWhite   { background: var(--brand-white); color: var(--brand-pit-blue); }
.btnWhite:hover { background: var(--brand-white-hover); }
.btnWhite:focus-visible { outline-color: var(--brand-white); }    /* pit-blue の帯の上なので白にする */
.btnSm { padding: 8px 24px; font-size: 14px; line-height: 1.8; }
.btnOutline.btnSm { padding: 7px 23px; }

@media (max-width: 767px) {
  .btn, .btnOutline, .btnWhite { padding: 14px 28px; font-size: 15px; }
  .btnOutline { padding: 13px 27px; }
}
```

- 角丸・影・グラデーションは付けない。トップのボタンとまったく同じ形にする。
- 現行のボタン文言の末尾にある「→」は、トップのボタンにはない。外すかどうかは §11 Q3 で確認する（文言の変更にあたるため）。

### 6.3 カード・グリッド

```css
/* 枠線カード（トップの .serviceCard / .reasonCard と同じ） */
.card { display: flex; flex-direction: column; gap: 12px; padding: 20px; border: 1px solid var(--brand-dock-blue); background: var(--brand-white); }
.cardLoose { gap: 20px; }                    /* 要素が多いカード用 */
.cardTitle { font-size: 22px; line-height: 1.45; font-weight: 700; color: var(--brand-pit-blue); }
.cardTitleSm { font-size: 18px; line-height: 1.35; font-weight: 700; color: var(--brand-ink); }
.cardNum {                                   /* 装飾用の番号。aria-hidden="true" */
  font-family: var(--font-space), sans-serif; font-size: 32px; line-height: 1; font-weight: 700; color: var(--brand-dock-blue);
}

/* 4項目用: 4列 → 2列（≤1199px）→ 1列（≤767px）。トップの .serviceGrid と同じ切り替え */
.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
/* 3項目・6項目用: 3列 → 2列（≤1199px）→ 1列（≤767px） */
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
/* 2列（トップの .problemGrid 相当） → 1列（≤1023px） */
.grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }

/* タグ（トップの .tag と同じ） */
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag  { padding: 4px 10px; border-radius: 2px; background: var(--brand-tint); color: var(--brand-pit-blue); font-size: 13px; line-height: 1.4; }

@media (max-width: 1199px) { .grid4, .grid3 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 1023px) { .grid2 { grid-template-columns: 1fr; } }
@media (max-width: 767px)  {
  .grid4, .grid3 { grid-template-columns: 1fr; gap: 16px; }
  .cardTitle { font-size: 18px; line-height: 1.5; }
  .cardNum { font-size: 24px; }
}
```

- カードはホバーで変化させない（リンクではないため）。カード全体がリンクになっている場合だけ、タイトルの色を pit-blue-hover にする。

### 6.4 罫線リスト（「選ばれる理由」「流れ」など番号付きの縦並び）

トップの「お知らせ」一覧と会社情報の表（dock-blue の罫線で区切った横長の行）と同じ見せ方にする。カードを縦に積むより情報量が多く見え、トップの罫線の印象とも合う。

```css
.rowList { border-top: 1px solid var(--brand-dock-blue); }
.rowItem {
  display: grid; grid-template-columns: 120px 1fr; column-gap: 40px; align-items: start;
  padding: 40px 14px; border-bottom: 1px solid var(--brand-dock-blue);
}
.rowNum { font-family: var(--font-space), sans-serif; font-size: 32px; line-height: 1.2; font-weight: 700; color: var(--brand-dock-blue); }
.rowContent { display: flex; flex-direction: column; gap: 10px; }
.rowTitle { font-size: 22px; line-height: 1.45; font-weight: 700; color: var(--brand-pit-blue); }

@media (max-width: 767px) {
  .rowItem { grid-template-columns: 1fr; row-gap: 8px; padding: 28px 12px; }
  .rowNum { font-size: 24px; }
  .rowTitle { font-size: 18px; line-height: 1.5; }
}
```

### 6.5 データ表（会社概要・料金・変更内容）

```css
.dataTable { border-top: 1px solid var(--brand-dock-blue); }
.dataRow { display: grid; grid-template-columns: 200px 1fr; column-gap: 40px; padding: 24px 14px; border-bottom: 1px solid var(--brand-dock-blue); }
.dataLabel { font-size: 14px; line-height: 1.8; color: var(--brand-pit-blue); }          /* dt / th */
.dataValue { font-size: 16px; line-height: 1.8; font-weight: 700; color: var(--brand-ink); } /* dd / td */
.dataValue ul { display: flex; flex-direction: column; gap: 4px; }

@media (max-width: 767px) {
  .dataRow { grid-template-columns: 1fr; row-gap: 6px; padding: 20px 12px; }
  .dataLabel { font-size: 13px; }
  .dataValue { font-size: 15px; }
}
```

- `<table>`（tech-advisor の料金表）の場合は `tr` に `.dataRow`、`th` に `.dataLabel`、`td` に `.dataValue` を当て、`table { width: 100%; border-collapse: collapse; }` にする。`tr` に grid を当てても表の意味（ロール）は失われない。

### 6.6 CTA 帯（`CtaBand`、トップの `.contact` と同じ）

```css
.ctaBand { padding: var(--section-pad-y) var(--section-pad-x); background: var(--brand-pit-blue); }
.ctaInner { display: flex; flex-direction: column; gap: 60px; }
.ctaText { display: flex; flex-direction: column; gap: 14px; }
.ctaHeading { font-size: 28px; line-height: 1.5; font-weight: 700; color: var(--brand-white); }
.ctaBody { font-size: 16px; line-height: 2; color: rgba(255, 255, 255, 0.85); }
@media (max-width: 767px) { .ctaInner { gap: 40px; } .ctaHeading { font-size: 22px; } .ctaBody { font-size: 15px; } }
```

- 左揃えにする（現行は中央揃え）。ボタンは `.btnWhite`。
- 帯はフッターの直前に置く。トップと同じ「pit-blue の帯 → tint のフッター」の並びになる。

### 6.7 テキストリンク・注記

```css
.textLink { color: var(--brand-pit-blue); text-decoration: underline; text-underline-offset: 3px; }
.textLink:hover { color: var(--brand-pit-blue-hover); text-decoration: none; }
.strong { color: var(--brand-pit-blue); font-weight: 700; }    /* 本文中の <strong> の強調 */
```

---

## 7. フォーム（contact・partner 共通の値）

トップにはフォームがないので新しく定める。値はトップのボタン・タグ・罫線から導いた。
共通クラスとして `sub.module.css` に置き、`contact.module.css` と `partner.module.css` の同じ役割のクラスは、ここに合わせて書き換える（クラス名は変えなくてよい。値だけ揃える）。

| 要素 | 指定 |
|---|---|
| フォームの枠（`formPanel`） | 背景 `--brand-white`、`1px solid var(--brand-dock-blue)`、padding 60px 80px（≤1023px は 40px、≤767px は 32px 20px）、最大幅 880px |
| ラベル | 15px / 1.6 / 700 / ink。入力欄との間は 8px |
| 必須のバッジ | 背景 pit-blue、白文字、11px / 1.4 / 700、padding 2px 6px、角丸 2px、ラベルとの間隔 8px |
| 任意のバッジ | 背景 `--brand-tint`、文字 `--brand-gray`、それ以外は必須と同じ |
| input / select | 高さ 56px、padding 0 16px、`1px solid var(--note-border)`、角丸 0、背景白、16px（iOS で拡大されないよう 16px 未満にしない）、`font: inherit` |
| textarea | 最小の高さ 160px、padding 14px 16px、そのほかは input と同じ |
| placeholder | `--brand-gray` |
| ホバー | 枠線を `--brand-dock-blue` にする |
| フォーカス | 枠線を `--brand-pit-blue` にし、`box-shadow: var(--focus-ring)`、`outline: none` |
| エラー | 枠線を `--brand-error` にする。メッセージは 13px / 1.6 の `--brand-error`、アイコン 14px |
| ヘルプテキスト | 13px / 1.7 の `--brand-gray`。強調部分は ink の 700 |
| 項目どうしの間隔 | 28px（2列のグリッドなら column-gap 24px）。≤767px は1列で 24px |
| 区切り線（「ここから下は任意」） | `1px solid var(--note-border)`、ラベルは 13px の `--brand-gray`、上下に 8px の余白 |
| チェックボックス型のチップ（`themeChip`） | 白背景、`1px solid var(--note-border)`、padding 12px 16px、15px、角丸 0。チェックを入れたら枠線 pit-blue・背景 tint・文字 pit-blue の 700。チェックの箱は 18px 角で、入れたら pit-blue の面に白いチェック。`data-emphasis` は枠線を dock-blue にする。不正なとき（`data-invalid`）は、選ばれていないチップの枠線を error にする |
| radio / checkbox（partner） | `accent-color: var(--brand-pit-blue)`、18px |
| 同意チェック（privacyCheck） | `accent-color: var(--brand-pit-blue)`、リンクは `.textLink` |
| 送信ボタン | `.btn` と同じ値。PC では最小幅 320px で左寄せ、≤767px では幅 100%。無効なときは背景 `#8FA6C4`（文字の白と 2.6:1 になるが、無効な部品はコントラストの要件から外れる）、`cursor: not-allowed` |
| 送信中のスピナー | 16px、白い 2px の線で回転させる（ここだけは動作を伝えるためアニメーションを残す） |
| 送信エラーの箱 | 背景 `#FDECEC`、`1px solid var(--brand-error)`、padding 16px 20px、文字は ink |

---

## 8. ページ別の仕様

各ページの表記方針: 「旧クラス → 新クラス（`sub.module.css` = `s`、ページ固有 = 各モジュール）」。

### 8.1 `/service/dx-ax` と `/service/system-dev`（構成は同じ）

| ブロック | 指定 |
|---|---|
| ラッパー | `SubPage`。`"use client"`、`useEffect`、`.reveal` を外す |
| ヒーロー | `PageHero`。パンくず「ホーム / サービス / {ページ名}」、`lead` = 現在の pageSubCopy、`actions` = `.btn`「無料相談を予約する」→ `/contact` |
| 支援内容 / 幅広い開発ニーズ | `section.section > .inner.block` → `SectionHeading`（lead = 現在の sectionSub）→ `ul.grid4 > li.card`。カードの中身は `.cardNum`（01〜04）→ `h3.cardTitle` → `p.body` |
| 選ばれる理由 | `section.section > .inner.block` → `SectionHeading`（lead なし）→ `ul.rowList > li.rowItem`。`.rowNum` + `.rowContent > h3.rowTitle + p.body` |
| 末尾のCTA | `CtaBand`。heading・body・ボタンは現在の footerCta の文言、ボタンは `/contact` |

- 狙い: 支援内容はトップの「サービス」と同じ4列のカード、理由は罫線の行。トップから下層へ移っても、見え方の規則が続くようにする。

### 8.2 `/service/tech-advisor`

8.1 と同じ構成で、次の点だけ変える。

| ブロック | 指定 |
|---|---|
| 技術顧問サービスとは | `SectionHeading`「技術顧問サービスとは」→ `p.body`（advisorLead の本文、最大幅 880px）。現在は「技術顧問サービスとは」と「提供サービス」が1つのセクションに入っているので、**2つの `section` に分ける**（見出しの階層は変えない） |
| 提供サービス（6項目） | `ul.grid3 > li.card`（3列 × 2段） |
| 選ばれる理由（3項目） | `ul.rowList` |
| 料金・契約について | `SectionHeading`（lead = sectionSub）→ `table.dataTable`。強調する金額（`advisorPriceHighlight`）は Space Grotesk、32px / 1.2 / 700 / pit-blue。注記（`advisorPriceNote`）は 14px の gray で、金額の横に置く（≤767px では改行して下に）。その下の `advisorCompareNote` は `p.body`、最大幅 880px |
| 末尾のCTA | `CtaBand` |

### 8.3 `/service/products`（一覧ページ）

| ブロック | 指定 |
|---|---|
| ヒーロー | `lead` は空なので出さない。`actions` = `.btnOutline`「プロダクトについて問い合わせる」（外部フォーム、`target="_blank"`） |
| プロダクト一覧 | `section.section > .inner` → `ul.productList`（縦に並べ、間隔 20px）→ `li.card.productCard` |
| 末尾のCTA | `CtaBand`（`/contact`） |
| プロダクトをつくる理由 | `SectionHeading` → `p.body`（最大幅 880px） |

```css
.productCard { flex-direction: row; gap: 40px; padding: 20px; }
.productThumb { position: relative; flex-shrink: 0; width: 360px; aspect-ratio: 16 / 10; background: var(--brand-tint); overflow: hidden; }
.productThumb img { object-fit: contain; }                  /* next/image の fill */
.productBody { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
.productSubtitle { font-size: 16px; line-height: 1.6; font-weight: 700; color: var(--brand-ink); }
.productDesc { white-space: pre-line; }                      /* .body と併用 */
.productActions { margin-top: auto; padding-top: 8px; }     /* .btnOutline.btnSm「詳しく見る」 */
@media (max-width: 1023px) { .productCard { flex-direction: column; gap: 20px; } .productThumb { width: 100%; } }
```

- 名前は `h3.cardTitle`、タグは `.tags > .tag`（`darkTag` から置き換える）。
- ロゴ画像のうち Duosub（背景が黒い不透明画像）と dinder（オレンジの不透明画像）は、16:10 の枠に contain で置くと、左右にわずかな tint の余白が出る（dinder で片側およそ 4%）。ノートのサムネイルと同じ「tint の面の上の画像」として扱うので、許容する。気になる場合は §11 Q6。
- 見出しの階層について: 今は H1 の直後に H3 が来ている。見た目はこのままで、`h3` を `h2` に変える（`.cardTitle` を付ければ見た目は変わらない）。アクセシビリティ上の修正で、文言は変わらない。

### 8.4 `/company-info`

| ブロック | 指定 |
|---|---|
| ヒーロー | `lead` は空なので出さない。`actions` なし |
| 会社情報の表 | `section.section > .inner` → `dl.dataTable`（最大幅 960px）→ `div.dataRow > dt.dataLabel + dd.dataValue`。事業内容の `ul.companyList` は `.dataValue ul` のスタイルを使い、行頭の「・」は付けない（トップの会社情報の表も、改行だけで並べている） |
| 代表者 | トップの Company セクションのプロフィールと同じ組み方にする（下に記載） |
| 末尾のCTA | なし（現状にないので足さない。§9 P4 で提案） |

```css
/* company.module.css */
.profile { display: grid; grid-template-columns: 244px 1fr; column-gap: 40px; row-gap: 12px; align-items: start; }
.profilePhoto { grid-row: 1 / span 4; width: 244px; height: 244px; object-fit: cover; }
.profileRole { font-size: 13px; line-height: 1.4; color: var(--brand-pit-blue); }
.profileName { font-size: 24px; line-height: 1.4; font-weight: 700; color: var(--brand-ink); }
.profileNameEn { font-family: var(--font-space), sans-serif; font-size: 14px; line-height: 1.4; color: var(--brand-gray); }
.profileBio { margin-top: 8px; white-space: pre-line; }   /* .body と併用 */
@media (max-width: 767px) {
  .profile { grid-template-columns: 104px 1fr; column-gap: 16px; }
  .profilePhoto { grid-row: 1 / span 3; width: 104px; height: 104px; }
  .profileName { font-size: 18px; }
  .profileBio { grid-column: 1 / -1; }
}
```

- 現行の officerCard（暗い面・角丸 20px の箱）はやめて、トップと同じ「枠なしで写真とテキストを並べる」形にする。
- 写真は今の `/images/company/koyama-nozomi.png` を正方形でトリミングして使う。トップと同じ `/images/photo-ceo.webp` に替えるかどうかは §11 Q5。
- セクション見出しが今はない（「役員紹介」がコメントアウトされている）。見出しを足すかどうかは §9 P3 の提案。足さない場合は、表とプロフィールの間を 100px（セクションの padding）空けて区切る。

### 8.5 `/contact`

構成と文言は変えない。見た目を次のとおり置き換える。

| # | ブロック | 指定 |
|---|---|---|
| 1 | ヒーロー | `PageHero`。`lead` = 現在の pageSubCopy（改行はそのまま）。`children` に信頼バッジと SLA を入れる。`actions` = `.btn`「相談フォームへ進む ↓」+ `.btnOutline`「相談の流れを見る」。`after` = heroRiskReversal |
| | 信頼バッジ（`trustBadge`） | `.tag` を大きくした形: padding 6px 14px、14px / 1.4 / 700、tint の背景、pit-blue の文字、アイコン 16px（`currentColor`）、間隔 6px。並びは gap 8px で折り返す。lead との間 24px |
| | SLA（`heroSla`） | 14px / 1.8 の ink。上に 16px |
| | heroRiskReversal | `.note`（13px の gray）。ボタンの下に 16px |
| 2 | こんなことでもご相談ください | `SectionHeading` → `ul.grid3` の各項目を `li.card`（padding 16px 20px、横並び、gap 12px、アイコン 20px の pit-blue、本文 15px / 1.8）→ themeClosing は `p.body`。≤1023px で2列、≤767px で1列 |
| 3 | 無料相談でやらないこと | `SectionHeading`（lead = sectionSub）→ `ul.grid3 > li.card`（`h3.cardTitleSm` + `p.body`）→ promiseNote は `.note`、14px |
| 4 | 持ち帰っていただけるもの | `SectionHeading`（lead）→ `ul.grid3 > li.card`（`.cardNum` + `h3.cardTitle` + `p.body`）→ 進行表 → presenterNote |
| | 当日の進行（`timeline`） | 上に 60px あける。小見出しは `h3.subHeading`。トラックは横3列のグリッド（gap 20px）。各ステップの上端に `2px solid var(--brand-dock-blue)` の線を引き、線の左端に 10px 角の pit-blue の四角を置く（`::before`、top -6px）。時刻は Space Grotesk 16px / 700 / pit-blue、本文は 15px / 1.8。≤767px では縦に並べ、線は左側の縦線（`border-left`）、四角は左端に置く |
| | presenterNote | `p.body` の 700。リンクがあれば `.textLink` |
| 5 | 申し込みから相談までの流れ | `SectionHeading`（lead）→ `ol.rowList > li.rowItem`（01〜04）。各行をつなぐ縦線や矢印（`flowItem::after`）はやめて、罫線で区切る。本文中の `<strong>` は `.strong`。`flowPill` があれば `.tag` |
| 6 | フォーム | `section.section`。中身は最大幅 880px で左寄せ。`SectionHeading`「無料相談のお申し込み」→ formLead（`p.body`、`strong` は `.strong`）→ `formPanel`（§7）。**`formSectionGlow` の要素と CSS は消す** |
| | 送信完了（`successBox`） | `formPanel` と同じ枠。アイコンは 56px 角の tint の面に、pit-blue のチェック 28px。見出しは `h2` で 22px / 1.5 / 700 / ink。本文は `.body`。手順（`successSteps`）は番号付きで、番号は Space Grotesk 700 の pit-blue。ボタンは `.btn`。入力内容の確認（`details`）は summary を 15px / 700 / pit-blue にし、山形アイコンは開いたら180度回す（transform は 0.2s）。中の表は `.dataTable` を小さくした版（label 13px、value 15px / 400） |
| 7 | よくあるご質問 | `SectionHeading` → `FaqAccordion`（下記） |
| | 追従CTA（≤767px のみ） | 下端に固定。背景は白で、上端に `1px solid var(--brand-dock-blue)`、padding 12px 16px（+ `env(safe-area-inset-bottom)`）。ボタンは `.btn` の幅 100%、補足は 12px の gray。表示・非表示のアニメーションは今のまま（`translateY` で 0.25s）でよい |

**セクションの背景**: 今の `sectionAlt`（背景色の交互の切り替え）はやめて、すべてページのグラデーションの上に置く。`sectionCompact` の上下の余白は、`.section`（100px / 64px）にそろえる。

**`FaqAccordion.module.css`**（使っているのは `/contact` だけ。LPでは使っていないことを確認済み。なのでその場で書き換えてよい）

| 要素 | 指定 |
|---|---|
| タブ（`.tab`） | padding 8px 20px、14px / 1.6 / 700、`1px solid var(--brand-pit-blue)`、白背景、pit-blue の文字、角丸 0。ホバーで背景 `--brand-white-hover`。選択中（`.tabActive`）は pit-blue の面に白文字。タブどうしの間隔 8px、下に 32px |
| 項目（`.item`） | 下端に `1px solid var(--brand-dock-blue)`。最初の項目だけ上端にも同じ線（`.item:first-child`） |
| 質問（`.question`） | padding 24px 14px、18px / 1.6 / 700 / ink、`font-family: inherit`。ホバーで pit-blue |
| 開閉の記号（`.toggle`） | Space Grotesk、24px、pit-blue |
| 回答（`.answer`） | padding 0 14px 24px、16px / 2 / ink（≤767px では 15px） |
| `var(--font)` などの旧トークン | すべて上の値に置き換える |

### 8.6 `/partner`

| ブロック | 指定 |
|---|---|
| ラッパー | `SubPage`。ページ内の `<main>` を外す |
| ヒーロー | 独自の `partnerHero`（グラデーションと orb）をやめて、`PageHero` にする。H1 の中の `<em>本物の課題解決</em>` は `font-style: normal; color: var(--brand-pit-blue);`（28px の太字はコントラスト 3:1 以上が必要なので、dock-blue は使わない）。`actions` = `.btn`「まず話を聞く」→ `#entry`、`.btnOutline`「募集職種を見る」→ `#roles`。今 `partner.module.css` に入れている `margin-top: 16px` の調整は消す（`SubPage` の `main` がヘッダーの高さを確保するため） |
| 英字の小見出し（`partnerSectionLabel`: WORK WITH US / ROLES / PROCESS / FAQ） | トップでは見出しの前に英字ラベルを置いていない。**`SectionHeading`（Pマーク）に置き換えて、英字ラベルは表示しない**（§11 Q7 で確認）。`partnerSectionDesc` は SectionHeading の lead にする。`.center`（中央揃え）はやめる |
| PitDockのパートナー（3枚のカード） | `ul.grid3 > li.card`。キーワード（`partnerWorkKeyword`）は、今は inline style で3種類のグラデーション背景になっている。**inline style を消して、3枚とも `.tag`** にする。続けて `h3.cardTitle` + `p.body` |
| 募集職種（タブ） | タブは `FaqAccordion` のタブと同じ見た目（§8.5）。パネルは `.card` で padding 40px（≤767px は 24px 20px）、≥1024px では2列のグリッド（左に説明、右にスキル。gap 40px）。バッジ（`partnerRoleBadge*`）は3色の塗り分けをやめて、全部 `.tag` にする。「こんな方に向いています」「求めるスキル・経験」は 13px / 700 / pit-blue。向いている人のリストの「✓」と、スキルの「/」は pit-blue の 700。締めの文（`partnerRoleNote`）は `p.body` を上に 40px あけて置き、最大幅 880px。パネルの出現アニメーション（`partnerPanelIn`）は消す |
| 参画までの流れ | `ol.rowList > li.rowItem`。`partnerStepPill` は `.tag` |
| よくあるご質問（Q/Aのカード） | `.grid2 > .card`（padding 24px）。「Q」は Space Grotesk 20px / 700 / pit-blue、「A」は同じ形の dock-blue（`aria-hidden` なので装飾として扱う）。質問は 16px / 1.6 / 700 / ink、回答は `.body`。Q と A の間隔は 12px |
| まず話を聞く（フォーム） | §7 の共通値。`partnerEntryBg` の要素と CSS は消す。成功時の表示は contact の successBox と同じ扱い |
| アンバー色（`--color-partner-warm` #E8A838） | 全部 pit-blue に置き換える（同意チェックの accent-color、リンクの色、✓ を含む） |

### 8.7 `/news`（一覧）

トップの「最新のお知らせ」と同じ行の形にする。トップで見た一覧が、そのまま全件に広がって見えるようにするため。

| ブロック | 指定 |
|---|---|
| ヒーロー | `PageHero`。H1・パンくずの表記は今のまま（「News」）。統一するかどうかは §9 P1 |
| 一覧 | `section.section > .inner` → `ul.newsList`（トップの CSS をそのまま移す。下記）|

```css
/* sub.module.css または news 専用モジュール。値はトップの .newsList / .newsRow と同じ */
.newsList { border-top: 1px solid var(--brand-dock-blue); }
.newsList > li { border-bottom: 1px solid var(--brand-dock-blue); }
.newsRow { display: grid; grid-template-columns: 120px 160px 1fr; align-items: center; padding: 24px 14px; font-size: 13px; line-height: 1.4; }
.newsDate { font-family: var(--font-space), sans-serif; }
.newsCategory { display: flex; flex-direction: column; gap: 4px; }
.newsTitle { font-size: 15px; line-height: 1.7; }       /* トップは 13px。一覧ページは主役なので一段大きくする */
.newsRow:hover .newsTitle { color: var(--brand-pit-blue); text-decoration: underline; }
@media (max-width: 767px) {
  .newsRow { grid-template-columns: auto 1fr; column-gap: 16px; row-gap: 8px; padding: 20px 12px; }
  .newsTitle { grid-column: 1 / -1; font-size: 14px; line-height: 1.6; }
}
```

- 行の中の並びは、トップと同じ「日付 → カテゴリ → タイトル」にする（今は「タグ → 日付」の順）。
- **モバイルでタイトルを2行に切って「もっと見る」で開く仕組み（`NewsCard` の `useLayoutEffect` / `ResizeObserver` / `newsMoreBtn`）は外す。** トップと同じく、タイトルは全文を出す。これで `NewsCard` は単純な `<li><a>` になり、`"use client"` も外せる。
- 外部リンクの `target="_blank"` の判定（`isExternalNewsUrl`）は残す。
- 並び順（今は id の降順、トップは日付の降順）はデザインの範囲外なので、変えない。

### 8.8 `/news/4`・`/news/8`（詳細）

| ブロック | 指定 |
|---|---|
| ヒーロー | `PageHero`、`titleSize="long"`、`en` なし、`lead` なし |
| 本文の枠（`.article`） | 最大幅 800px で左寄せ（`margin: 0`）。トップの本文も左揃えなので、それに合わせる |
| 日付（`.meta`） | Space Grotesk、14px / 1.4、gray。下に 28px。日付の下に `1px solid var(--brand-dock-blue)` の線を引き、線の下 32px から本文を始める |
| 本文の段落 | 16px / 2 / ink（≤767px は 15px）、段落の間は 1.25em |
| 見出し（news8 の「変更内容」`changeTableHeading`） | h2 にPマークを付けて小さくした形: `display:flex; gap:6px;`、20px / 1.5 / 700 / ink、Pマークは 30×25（SPと同じ大きさ）。上に 60px、下に 24px |
| 変更内容の表（`changeTable`） | `.dataTable` と同じ値（ラベル列の幅は 160px） |
| 紙面画像（news4 の `pressFigure`） | 枠線 `1px solid var(--note-border)`、角丸 0、背景白、画像どうしの間隔 24px |
| リンク（`.linkList a`） | `.textLink`。上に 40px |

### 8.9 `/privacy`・`/personal-info`（規約文書のレイアウト）

長い文章を読ませるページなので、装飾を最小限にして読みやすさを優先する。今の「左端に色の線を引いた角丸カードを積み重ねる」形はやめ、薄い罫線で区切った文書の形にする。

| 要素 | 指定 |
|---|---|
| 本文の枠（`contentWrap`） | 最大幅 880px で左寄せ。15px / 2 / ink |
| 制定日などの情報（`meta`、privacy のみ） | 右揃えのまま、14px / 1.8 / gray |
| 区切り線（`divider`） | `1px solid var(--brand-dock-blue)`、下に 40px |
| 前文（`lead`） | 15px / 2 / ink、下に 48px |
| 条項のリスト（`policyList`） | 上端に `1px solid var(--brand-dock-blue)`。各項目（`policyItem`）は padding 32px 0 32px 56px、下端に `1px solid var(--note-border)`、背景・角丸・左の太線はなし。最後の項目の下端は dock-blue |
| 条項の番号（`policyItem::before`） | Space Grotesk、24px / 1 / 700 / dock-blue（装飾）、top 34px、left 0、幅 40px で左揃え |
| 条項の見出し（`policyHeading`） | 18px / 1.5 / 700 / ink、下に 12px |
| 条項の本文（`policyBody`） | 15px / 2 / ink |
| 下の階層の番号（`subList` / `nestedItem::before`） | 番号は Space Grotesk の 700、pit-blue、14px。字下げは今のまま |
| 箇条書きの点（`bulletItem::before`） | 6px の**正方形**（角丸をやめる）、pit-blue |
| privacy の `subItem strong` | `display:block`、pit-blue の 700 |
| ≤767px | `policyItem` は padding 24px 0 24px 40px、番号は 20px で top 26px、見出しは 16px、本文は 14px / 1.9 |

### 8.10 （参考）プロダクトの規約文書を対象にする場合

§11 Q1 で「対象にする」と回答があった場合は、`/service/products/*/terms`・`/terms_of_use`・`/gentle-diary/privacy` を `SubPage` + `PageHero`（`en` なし）+ §8.9 の規約文書レイアウトで組み直す。その場合も、`page.module.css` の `pageHeroTerms` などのクラスは削除しない。

### 8.11 404（`not-found`）

| 要素 | 指定 |
|---|---|
| ラッパー | `SubPage` |
| 背景演出 | パーティクルの canvas（`ParticleCanvas`）と glow を外す（§11 Q4） |
| 構成 | `section.section`（上下 120px、≤767px は 80px）の中を左揃えで: バッジ「404 NOT FOUND」は `.tag` → 数字の「404」は `.heroEn` と同じ形（Space Grotesk 700、120px / 1、≤767px は 72px）で、「4」を pit-blue、「04」を dock-blue に塗り分ける（装飾なので `aria-hidden` は今のまま）→ `h1.heroTitle` → 説明文 `p.body` → ボタンは `.btn`「ホームへ戻る」+ `.btnOutline`（今の btnSecondary の文言とリンク先のまま） |
| divider | 消す |

---

## 9. コンテンツ変更の提案（デザイン統一のついでに直すとよい点。採否はユーザーに確認）

| # | ページ | 提案 | 理由 |
|---|---|---|---|
| P1 | `/news` | H1 とパンくずの「News」を「お知らせ」にする | ヘッダー・フッター・トップの見出しは「お知らせ」と書いている |
| P2 | `/news/4` | パンくずの「News」のリンク先を `/#news` から `/news` にする（表記も P1 と揃える） | `/news/8` のパンくずは `/news` へのリンクになっている。一覧へ戻れるほうが自然 |
| P3 | `/company-info` | 表の前に H2「会社情報」、代表者の前に H2「代表者紹介」（または今コメントアウトされている「役員紹介」）を足す | 今は H1 の後に見出しがなく、トップと同じ「Pマーク + 見出し」の型が使えない。スクリーンリーダーで移動するときの目印にもなる |
| P4 | `/company-info` | ページ末尾に `CtaBand`（トップの Contact と同じ文言）を足す | 会社概要を見た人が相談へ進む導線がない |
| P5 | `/service/products`・`/company-info` | ヒーローの空のリード文に一文を入れる（例は corporate-engagement-specialist に依頼） | 空の `<p>` が残っている。デザイン上は出さずに済ませるので、必須ではない |
| P6 | 全般 | ボタン文言の末尾の「→」を外す（§11 Q3） | トップのボタンには矢印がない |

---

## 10. 本タスクの範囲外（別タスク）

- `app/page.module.css` の、使われなくなったクラスの掃除（プロダクトの規約ページで使っているクラスは残す）。
- `.claude/skills/homepage-builder/tech-stack.md` のフォント記述（「Inter + Noto Sans JP」）を、新デザインのフォント（Space Grotesk + Zen Kaku Gothic New）に合わせて更新すること。
- `app/layout.tsx` で読み込んでいる Google Fonts（Inter / Noto Sans JP）を削るかどうか。LPがまだ使っているので、今回は残す。
- トップページの `SectionHeading` を `app/components/sub/SectionHeading.tsx` に寄せる共通化（トップの見た目を変えずにできるが、今回はトップを触らない）。

---

## 11. ユーザーへの確認事項

| # | 内容 | 仮置き（回答がなければこれで実装） |
|---|---|---|
| Q1 | プロダクトの規約・プライバシーポリシー（`/service/products/duosub/terms`、`/safepage/terms_of_use`、`/gentle-diary/terms`、`/gentle-diary/privacy`）は、「LPはそのまま」に含めるか、下層ページとしてデザインを揃えるか。特に `/gentle-diary/privacy` は、今ヘッダー・フッターだけがライトで本文がダークになっている | 対象外（変更しない） |
| Q2 | ページヒーローに、トップの "Business Transformation." と同じ2色の英字ラベル（§5.3 の案）を入れてよいか。表示される文字が増えるので確認したい | 入れる方向で実装し、文字は §5.3 の案。不可なら `en` を外すだけで済む |
| Q3 | ボタン文言の末尾の「→」を外して、トップのボタンに揃えてよいか | 外す |
| Q4 | 404 ページを対象に含めてよいか。含める場合、パーティクルの演出を外してよいか | 含める・外す |
| Q5 | 会社概要の代表者の写真を、トップと同じ `/images/photo-ceo.webp` にそろえるか、今の `koyama-nozomi.png` のままにするか | 今のまま（正方形にトリミング） |
| Q6 | プロダクト一覧のロゴ画像（Duosub は黒、dinder はオレンジの不透明な画像）を、tint の 16:10 の枠に収める見せ方でよいか | よい |
| Q7 | パートナー募集ページの英字の小見出し（WORK WITH US / ROLES / PROCESS / FAQ）を、トップに合わせて消してよいか | 消す |
| Q8 | スクロールに合わせたフェードイン（下層ページにだけある）を外し、トップと同じく静的な表示にしてよいか | 外す |

---

## 12. 受け入れ条件（homepage-builder 向けのチェックリスト）

- [ ] §2.1 の対象ページが、すべて `SubPage` でラップされ、ヒーローが `PageHero` になっている
- [ ] 対象ページとそのモジュールに、`var(--color-` `var(--radius-` `var(--space-` `var(--gradient-` `var(--font)` `className="container"` `s.reveal` が残っていない（`grep -rnE` で確認）
- [ ] 対象ページが `app/page.module.css` を import していない
- [ ] `app/globals.css`・`app/page.module.css`・`app/home.module.css`・`app/page.tsx`・`app/service/products/{duosub,gentle-diary,dinder,safepage}/**`・`LpProductFooter*` に差分がない（`git diff --stat` で確認）
- [ ] LP 4本と規約ページ4本の見た目が変わっていない（`next dev` で目視）
- [ ] 角丸（タグの 2px 以外）・box-shadow・ホバー時の transform が対象ページにない
- [ ] 375px / 768px / 1024px / 1152px / 1440px で、横スクロールが出ず、ヘッダーと本文が重ならない
- [ ] フォームの入力・エラー・送信完了の各状態を、contact と partner で目視確認した
- [ ] キーボードだけで操作したとき、すべてのリンク・ボタン・入力欄にフォーカスの表示が出る
- [ ] `npm run build` が通る
