# Gentle Diary LP 全面リニューアル（A/Bテスト基盤）｜デザイン仕様書

- 対象URL: https://www.pit-dock.com/service/products/gentle-diary
- 対象ファイル: `app/service/products/gentle-diary/page.module.css` / `_components/*`
- 入力（唯一の正）: `docs/gentle-diary-lp-ab-content-plan.md`（第3版）
- 作成: web-designer（CLAUDE.md 作業プロセス 2）
- 次工程: homepage-builder（実装）／ 並行: 撮影担当（§7 画像スロット仕様表）
- 初版: 2026-10-08

> **この仕様書の読者**
> - **homepage-builder**: §2・§3・§6・§7・§9 をそのまま書き写して実装できます
> - **ユーザー（PitDock代表）**: §0-2 の判断待ち事項を確認してください
> - **撮影担当**: §7 の表だけ見れば撮影できます

> **スコープ**: 本書はデザイン仕様のみ。コンテンツ・コピー・セクション構成は設計書（第3版）が正であり、本書はそれを変更しません。実装ファイル（`page.tsx` 等）は homepage-builder が担当します。

---

## 0. サマリと判断待ち事項

### 0-1. デザイン判断のサマリ

| # | 判断 | 内容 |
|---|---|---|
| 1 | **LPローカルトークン方式（`--gd-` 接頭辞）** | Duosub LP（commit 155768f）が確立した `--ds-` 接頭辞方式を踏襲。プロダクトLPは「別ブランドの明るい面」であり、コーポレートのダークトークン（`globals.css` の `--color-*`）は**使わない**。`globals.css` への追加・変更は**ゼロ**（§2-1） |
| 2 | **ティール基調を維持し、文字に使える濃度を新設** | 現行 Gentle Diary の `#4aa6b1` と `LpProductFooter variant="teal"`（`--lp-accent: #4aa6b1`）との一貫性を保つため色相はティールのまま。ただし `#4aa6b1` は白背景で **2.66:1** しかなく文字に使えないため、`--gd-teal-ink: #1F6F79`（5.44:1）を新設し、文字・線・アイコン・CTA塗りはこちらに寄せる（§2-2・§8-1） |
| 3 | **図解 D1〜D9 はすべて HTML+CSS（アイコンのみインラインSVG）** | 画像書き出しをしない。理由: ①図内文字がレスポンシブで読める ②スクリーンリーダーが読める ③SEOキーワードがHTMLに乗る（§3-10 の前提） ④コピー修正が差分1行で済む ⑤新規画像素材の調達依存を1つ減らせる（§6-0） |
| 4 | **FAQは既存 `FaqAccordion` を流用せず、ネイティブ `<details>` で新規実装** | 既存コンポーネントは①ダークトークン直結 ②`{open === i && <dd>}` で**閉じている間 回答テキストがDOMに存在しない**ため、§3-10 が依拠する「HTML内キーワード供給」が崩れる。Duosub LP の `<details>` 方式に揃える（§3-7） |
| 5 | **ヘッダーにストアCTAを置かない** | CTA は A/B とも**4箇所ちょうど**（§1-3）。ヘッダーにバッジを置くと5箇所目になり計測設計が崩れる。「お問い合わせ」も §2-6 の指示どおりヘッダー・ヒーローから外し `LpProductFooter` のみ（§3-2） |
| 6 | **画像スロットは「枠がアスペクト比を持ち、中身を差し替える」設計** | スクショ S1〜S8 が未撮影でも先にレイアウトを組めるよう、`_components/Shot.tsx` + `shots.ts` の1ファイル差し替え方式を定義。プレースホルダと実画像が**同一寸法**なので差し替えでレイアウトが動かない（§7-2・§9-4） |

### 0-2. ユーザー（PitDock代表）の判断が必要な点

| # | 確認事項 | 推測で決めずに残した理由 | 本書の暫定 |
|---|---|---|---|
| ~~**Q-A**~~ **【再決定済み 2026-10-09】常時表示のストアCTA** | 当初は「入れない」で確定したが、ユーザー判断で**反転**した | **【2026-10-09 再決定・ユーザー判断でQ-Aを覆した】常時表示のストアCTAを入れる。** Duosub LP と同方式で、**モバイル（〜767px）は下部固定バー、768px以上はヘッダー内バッジ**（両者はブレークポイントで排他）。本文内のCTAは A/B とも4箇所のまま。常時表示分を含めると1ビューポートあたり**5箇所**になる。**A/B とも共通コンポーネント（`shared.tsx` の `LpHeader` / `StickyStoreBar`）から出力するため、仕様は完全に同一**で、ABテストの交絡要因にはならない。ただし固定バー／ヘッダー経由のクリックも `StoreCta` を通るので計測対象に含まれる（集計の解釈は コンテンツ設計書 §3-7 の注記を参照）。 |
| ~~**Q-B**~~ **【解決済み 2026-10-09】既存イラストの使用可否** | コーディネータが3枚を目視確認。**年齢描写以前に、禁止モチーフとトーン制約に抵触**していたため判定が覆った | **結論: `0.png` / `1.png` / `2.png` は3枚とも不使用。** A2/B2 はテキストのみで構成する（§4-2 の設計どおり成立）。理由 — `1.png`: 空に**巨大な目のモチーフ**（§4-3「目のモチーフを大きく使う」禁止に直接抵触）／**"LIVE TRACKING" の英字バナー**／電波塔＋赤い点滅＝監視インフラの記号／暗い夜のブルー基調で原則1「Quiet Light」と正反対。`0.png`: **影の人物が ? と × を浮かべて手を伸ばす脅威の構図**＋**光の球＝防壁のモチーフ**（§4-3「盾・防壁」禁止に抵触）。`2.png`: トーンは近いが**涙目・手つかずの食事という強い不安表現**で「煽り・過度な不安訴求はNG」に抵触し、かつ訴求が A2 のカード内容とズレる |
| **Q-C** | **ポリシー/規約ページ（遷移先）のトーン** | `privacy/` `terms/` は**コーポレートのダークテーマ**（`app/page.module.css` の `.pageHero` / `.pageH1` を流用）。LPは明るい面なので、LP→規約で明↔暗が反転する。Duosub も同じ構造なので既存仕様としては一貫しているが、§2-8 で「規約を読ませる導線自体を社会的証明にする」設計になったため、反転が離脱要因になる懸念がある | **今回は変更しない**（スコープ外・既存の全プロダクトLPと同じ挙動）。気になる場合は別タスクとして「LP配色の規約ページ」を起票 |
| **Q-D** | **B6 SEOキーワード帯の本文3行** | 設計書 §4-4 に「本文3行は web-designer の帯の幅確定後に詰める」とある | **帯の寸法を確定しました**（§5-6）。`max-width: 760px` / 16px / 3行 → **全角 110〜135字**。この字数で corporate-engagement-specialist に本文を依頼してください |

### 0-3. 撮影担当への依頼事項（要点）

- **全点 iOS シミュレータ or 実機の縦向き・ダミーアカウント**で撮影。実在の住所・建物名・メールアドレスを写さない
- **S1 / S2 / S3 / S4 が最優先**（これが無いとヒーローと B の中核セクション D9 が組めません）
- **書き出しキャンバスは §7-1 の表の px を厳守**。端末フレーム・角丸・影・影付き背景は**付けない**（LP側でCSSで付けます）
- **AdMobバナーを隠す場合は、アプリ背景色の単色で塗りつぶして「キャンバス比率は維持」**（トリミングして比率が変わるとLPのレイアウトが崩れます）
- **S2 だけ例外**: 日記カード1枚を中央に置き、**上下左右に 64px 以上（2x換算）のアプリ背景色の余白**を付けて `1080 × 720`（3:2）で書き出し。キャプション（補足文）を下に置くため
- **S7 は iOS / Android の2枚**。どちらも **1000 × 1000（1:1）** の正方形で、権限ダイアログを中央に。端末比率の違いを吸収するため正方形に統一しています
- **S4 / S6 は D9（代理設定フロー図）で並べて使う**ので、**同じ端末サイズ・同じ余白**で書き出すこと

---

## 1. デザインコンセプト

コアメッセージ **「監視ではなく、つながり」** と、トーン **「やさしく・安心・ほどよい距離感」** を、次の **5つのビジュアル原則**に翻訳します。以降の全仕様はこの5原則から導出されています。

### 原則1. 明るく、静かな面で語る（Quiet Light）

コーポレートサイトはダークネイビー基調（先進的・プロフェッショナル）ですが、このLPが扱う感情は「不安」「後ろめたさ」「ほどよい距離感」です。ダーク面はコントラストが強く、監視・セキュリティ製品の記号に近づきます。**淡いティールがかったオフホワイト（`#F4F8F8`）を基調**に、影は最小、彩度は低めに保ちます。

- 影は `0 1px 2px` + `0 2px 8px` 程度の**ごく薄い2段**まで。ドロップシャドウで「浮かせる」演出はしない
- 彩度の高いティール（`#4AA6B1`）は**塗りと装飾線だけ**。文字・意味を持つ線は `#1F6F79`
- グラデーションは**最終CTAバンドの1箇所のみ**。ページ本体はフラット

### 原則2. 「見えない」を弱く描かない（Equal Weight）

このLPの説得力は**「できないこと・見えないことを、同じ大きさで並べられる誠実さ」**に宿ります（設計書 §2-3-4 / §4-3 D8）。否定側を小さく・薄く・赤くするのは、このプロダクトのポジショニングそのものを壊します。

- D1「見えない／見える」、D8「できる／できない」の2カラムは、**padding・font-size・border幅・本文色をすべて同一**にする
- 否定側に**エラー色（赤）を一切使わない**。落ち着いたグレー（`--gd-neutral-*`）で静かに示す
- モバイルで縦積みになっても、**2つ目のカラムを折りたたまない・縮小しない**
- 否定側のアイコンは「✕」ではなく**中立的な横棒（−）または目に斜線**。警告記号に見せない

### 原則3. 主張を奪わない添え書きの階層（One Quiet Tier）

設計書 §2-2 の「日記」補足文は「小さくどこかに」が指示です。ページ全体で**「添え書き」の階層をただ1つに固定**し、`.microNote` と `.ctaNote` を同じスケール（13px / `--gd-text-muted`）に揃えます。見出し化・帯化・強調・アニメーションは禁止。ただしコントラスト比は全ての背景面で **4.5:1 以上**を実測で担保します（§8-1）。

### 原則4. 「ため」をつくる余白（Breathing Pause）

B-H1-1「見守りたい。／でも、監視はしたくない。」は、**2行の間の余白そのものが葛藤の表現**です（設計書 §2-4）。余白を演出装置として明示的に設計します。

- H1 の2行目に `.h1Pause`（`margin-top: 0.3em`）を与え、1行目と2行目の間に明確な「間」を作る
- 「でも、」を `0.78em` / `--gd-text-sub` に落とし、2行目の立ち上がりをわずかに弱める（否定が強く響きすぎないため）
- セクション間は `64 / 88 / 112px`（M/T/D）。情報密度より「読み進める速度」を優先

### 原則5. 防犯・緊急の記号を1つも置かない（No Alarm）

実装に緊急通知・SOS・ジオフェンスが存在しないため（F25）、**警察・救急・SOS・警報・サイレン・盾・鎧・防壁・監視カメラ・目のモチーフの大きな使用・赤い警告**は使用禁止。D9 の注意喚起も**赤ではなくアンバー（`#8A5A00` / `#FFF6E3`）＋枠線＋アイコン**で、不安を煽らず見落とされない強度に置きます。

**使用禁止モチーフ一覧（図解・アイコン・イラスト共通）**

| 禁止 | 代替 |
|---|---|
| 盾・鎧・防壁・錠付き盾 | 家＋鍵（`--gd-teal-ink` 線画） |
| SOSボタン・サイレン・警報・赤色灯 | （描かない。該当機能が無い） |
| 監視カメラ・大きな目のモチーフ | 目に斜線の小アイコン（20px以下・D1の「見えない」側のみ） |
| 赤い警告（`#F87171` 等のエラー色） | アンバー（`--gd-amber-*`）＋枠線＋⚠線画アイコン |
| 勲章・認証バッジ風リボン（D7） | 線画アイコン（第三者認証ではないため誤認を招く） |
| 地図ピンの大きな使用・地図面の描画 | 折り畳み地図の輪郭＋斜線（「地図はない」の意味でのみ） |
| 数字（DL数・評価・ユーザー数・満足度） | （一切使わない） |
| 年齢特定描写（制服・ランドセル・学童） | 年齢非特定の円頭シルエット |

---

## 2. デザイントークン（**A/B完全共通**）

> **A/B共通であることの宣言**: 本章のトークンは `page.module.css` の `.root` に**1組だけ**定義し、`VariantA.tsx` / `VariantB.tsx` の両方が同じ `.root` 配下に入る。**AとBでトークンを上書きする記述を書いてはならない**（色違いABにしないことが本テストの前提・設計書 §1-3）。

### 2-1. `globals.css` との関係

| 項目 | 判断 |
|---|---|
| `globals.css` への**追加・変更** | **ゼロ。** 一切触らない |
| `globals.css` の `--color-*` / `--radius-*` / `--space-*` の**使用** | **使わない。** ダークテーマ前提の値であり、明るいLP面では意味を持たない |
| 継承されるもの（避けられないもの） | ①`html { font-size: 105% }` → `rem` = 約16.8px。**本書は全て px 指定**にして曖昧さを消す ②`body { font-family: var(--font) }` → Noto Sans JP + Inter が既にロード済み（`app/layout.tsx` の Google Fonts link）。**新規フォント読み込みは不要** ③`a { text-decoration: none; color: inherit }` ④`img { max-width: 100%; display: block }` ⑤`* { box-sizing: border-box; margin:0; padding:0 }` ⑥`[id] { scroll-margin-top: 96px }` → **LPに固定Navが無いので過大。`.root` 内で 76px に上書きする**（§3-1） |
| `.container`（globalクラス） | **使わない。** LPは読み物幅（1080px）なので `.container`（1600px）は広すぎる。LPローカルの `.container` を定義 |
| 前例 | Duosub LP が `--ds-` 接頭辞でLP内に閉じたトークンを定義している。**同じ作法を踏襲**し、接頭辞は `--gd-` |

### 2-2. 色トークン（全て新規・`.root` スコープ）

```css
/* app/service/products/gentle-diary/page.module.css */
/* Gentle Diary LP。トークンは --gd- 接頭辞でこのLP内だけに閉じる（Duosub LP の --ds- と同じ作法） */
/* A/B 共通。VariantA / VariantB で上書きしないこと */

.root {
  /* ===== 面（Surfaces）===== */
  --gd-bg:            #F4F8F8;  /* 基調。淡いティールのオフホワイト */
  --gd-bg-alt:        #E9F1F1;  /* セクション交互 */
  --gd-bg-soft:       #E6F2F3;  /* 「何が見える？」等、1段ティールを感じさせる面 */
  --gd-surface:       #FFFFFF;  /* カード・引用ブロック */
  --gd-surface-2:     #F7FAFA;  /* 画像スロットの下地・入れ子の面 */

  /* ===== 線 ===== */
  --gd-line:          #D7E3E5;  /* 通常の罫線・カード枠 */
  --gd-line-strong:   #7E9299;  /* 3:1 が必要な境界（プレースホルダ枠・区切り） */

  /* ===== 文字 ===== */
  --gd-text:          #16232A;  /* 見出し・本文・図解の本文（全面で15:1以上） */
  --gd-text-sub:      #3C4A52;  /* リード・カード本文 */
  --gd-text-muted:    #5A6A73;  /* .microNote / .ctaNote / caption（全面で4.5:1以上） */

  /* ===== ブランド（ティール）=====
     #4AA6B1 は白背景で 2.66:1。文字・意味を持つ線には使えないため用途を分ける */
  --gd-teal:          #4AA6B1;  /* 塗り・装飾線のみ。文字には使わない */
  --gd-teal-ink:      #1F6F79;  /* 文字・リンク・アイコン線・フォーカスリング・CTA塗り */
  --gd-teal-soft:     #DCEEF0;  /* チップ・D1の「見える」側の塗り */
  --gd-teal-wash:     rgba(74, 166, 177, 0.10); /* ごく淡いハイライト */

  /* ===== 中立（「見えない」「できない」側。エラー色ではない）===== */
  --gd-neutral-ink:   #4F5B62;  /* 中立カラムの見出しアイコン・ラベル */
  --gd-neutral-soft:  #E7ECEE;  /* 中立カラムの塗り */
  --gd-neutral-line:  #C9D3D6;  /* 中立カラムの枠・アクセントバー */

  /* ===== 注意喚起（アンバー・赤は使わない）===== */
  --gd-amber-ink:     #8A5A00;  /* ⚠注意の文字 */
  --gd-amber-soft:    #FFF6E3;  /* ⚠注意の塗り */
  --gd-amber-line:    #A4701A;  /* ⚠注意の枠・アイコン線（3.98:1） */

  /* ===== 第2レーン色（D9「あなたの端末」。色だけに依存させない）===== */
  --gd-slate-ink:     #3F4E6B;
  --gd-slate-soft:    #E4E9F2;
  --gd-slate-line:    #B8C3D6;

  /* ===== 最終CTAバンド ===== */
  --gd-cta-bg:        linear-gradient(160deg, #23767F 0%, #1A626B 100%);
  --gd-on-cta:        #FFFFFF;  /* バンド上の見出し（5.29〜6.99:1） */
  --gd-on-cta-sub:    #EAF4F5;  /* バンド上の .ctaNote（4.73:1） */

  /* ===== フォーカス ===== */
  --gd-focus:         #1F6F79;  /* 明面上（対 --gd-bg で 5.44:1 ＝ 3:1 要件クリア） */
  --gd-focus-on-cta:  #FFFFFF;  /* CTAバンド上 */

  /* ===== フッター境界（LpProductFooter variant="teal" = #111827）=====
     最終CTAバンド（濃ティール）→ フッター（濃ネイビー）で自然に沈むため
     スペーサーは不要。margin も入れない */
}
```

**色の使い分けルール（これを破るとコントラストが落ちます）**

| 用途 | 使うトークン | 使ってはいけないトークン |
|---|---|---|
| 見出し・本文・図解内の本文 | `--gd-text` / `--gd-text-sub` | — |
| 添え書き（`.microNote` `.ctaNote` `.caption`） | `--gd-text-muted` | `--gd-line-strong`（2.37:1） |
| リンク・アイコン線・強調語 | `--gd-teal-ink` | **`--gd-teal`（2.66:1・AA未達）** |
| ボタン塗り（白文字） | `--gd-teal-ink` | `--gd-teal`（白文字 1.86:1） |
| チップ・図解の塗り分け | `--gd-teal-soft` / `--gd-neutral-soft` | — |
| 装飾の面・アイコンの塗り | `--gd-teal` | — |
| エラー・警告 | `--gd-amber-*` | **赤系（`#F87171` 等）禁止** |

### 2-3. タイポグラフィスケール（モバイル / デスクトップ）

フォントは既存ロード分のみ。`--gd-font` は和文、`--gd-font-num` は数字・ラテン専用。

```css
.root {
  --gd-font:     "Noto Sans JP", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --gd-font-num: "Inter", "Noto Sans JP", -apple-system, sans-serif;

  font-family: var(--gd-font);
  font-size: 16px;      /* html の 105% を打ち消し、px基準をこのLP内で確定させる */
  line-height: 1.85;
  color: var(--gd-text);
  background: var(--gd-bg);
  overflow-x: clip;
}
```

| 型 | クラス | モバイル（〜767px） | デスクトップ（1024px〜） | 共通 |
|---|---|---|---|---|
| **H1** | `.h1` | `clamp(27px, 7.4vw, 44px)`<br>※`max-width: 359px` では `24px` 固定 | `clamp(44px, 3.2vw + 20px, 52px)` | `line-height: 1.3`（D: `1.24`）/ `font-weight: 700` / `letter-spacing: -0.01em` / `font-feature-settings: "palt" 1` |
| **H2** | `.h2` | `clamp(24px, 3.6vw + 10px, 30px)` | `clamp(32px, 2.2vw + 14px, 38px)` | `line-height: 1.45`（D: `1.4`）/ `700` / `-0.005em` / `"palt" 1` / `text-wrap: balance` |
| **H3**（カード見出し・ブロック見出し） | `.h3` | `19px` | `22px` | `line-height: 1.5` / `700` / `"palt" 1` |
| **H4**（図解のカラム見出し・ステップ見出し） | `.h4` | `16px` | `17px` | `line-height: 1.6` / `700` |
| **リード** | `.lead` | `16px` | `18px` | `line-height: 1.85` / `letter-spacing: 0.02em` / `--gd-text-sub` / `max-width: 34em` |
| **本文** | `.body` | `15px` | `16px` | `line-height: 1.85` / `0.02em` / `--gd-text-sub` |
| **小** | `.small` | `14px` | `14px` | `line-height: 1.75` / `--gd-text-sub` |
| **`.microNote`**（§2-2 補足文・3箇所） | `.microNote` | **`13px`** | **`13px`** | `line-height: 1.7` / `letter-spacing: 0.01em` / **`--gd-text-muted`** / `font-weight: 400` / `margin-top: 10px` / `max-width: 32em` |
| **`.ctaNote`**（CTAマイクロコピー） | `.ctaNote` | **`13px`** | **`13px`** | `line-height: 1.7` / **`--gd-text-muted`** / `margin-top: 12px` / `max-width: 30em` |
| **キャプション**（図の下） | `.caption` | `13px` | `13px` | `line-height: 1.7` / `--gd-text-muted` / `text-align: center` |
| **Eyebrow**（使用は最小限） | `.eyebrow` | `11px` | `12px` | `--gd-font-num` / `700` / `letter-spacing: 0.14em` / `text-transform: uppercase` / `--gd-teal-ink` |
| **数値・時刻**（図解内の「12:20頃」等） | `.num` | 継承 | 継承 | `--gd-font-num` / `font-variant-numeric: tabular-nums` / `font-weight: 600` |

> **`.microNote` と `.ctaNote` を同一スケールにする理由**: 設計書 §2-2 の指示（「`.ctaNote` と同じスケールに揃えると添え書きの階層が1つに定まる」）に従い、ページ全体で「小さく添える」階層をただ1つに固定する（原則3）。**モバイルで大きくする・FVだけ大きくする等はしない。**

**H1 の2行組み（B-H1-1 必須 / A-H1-1 も同構造）**

```css
.h1Line { display: block; }
.h1Line + .h1Line { margin-top: 0.14em; }
/* B-H1-1 の「ため」。1行目（肯定）と2行目（否定）の間に明確な間を作る */
.h1Line + .h1Pause { margin-top: 0.3em; }
/* 「でも、」をわずかに弱め、否定が強く響きすぎないようにする */
.h1Soft { font-size: 0.78em; color: var(--gd-text-sub); }
```

```html
<!-- B-H1-1（必ず2行組み） -->
<h1 class="h1">
  <span class="h1Line">見守りたい。</span>
  <span class="h1Line h1Pause"><span class="h1Soft">でも、</span>監視はしたくない。</span>
</h1>

<!-- A-H1-1 -->
<h1 class="h1">
  <span class="h1Line">「今どこ？」って、</span>
  <span class="h1Line">聞かなくていい。</span>
</h1>
```

> **折り返し事故の防止**: B-H1-1 の2行目は12文字（うち3文字が0.78em）。375px幅・`7.4vw = 27.75px` で約315px、ガター20px×2を引いた335pxに収まる。320px幅では `clamp` 下限27pxでも約306px > 280px となり折り返すため、`@media (max-width: 359px) { .h1 { font-size: 24px } }` を必ず入れる。`text-wrap: balance` は明示的な行分けと競合するので **H1には付けない**（H2のみ）。

### 2-4. spacing スケール

```css
.root {
  --gd-s1:  4px;   --gd-s2:  8px;   --gd-s3: 12px;  --gd-s4: 16px;
  --gd-s5: 20px;   --gd-s6: 24px;   --gd-s7: 32px;  --gd-s8: 40px;
  --gd-s9: 48px;   --gd-s10: 64px;  --gd-s11: 80px; --gd-s12: 96px;
  --gd-s13: 120px;

  /* セクション上下（レスポンシブで上書き） */
  --gd-sec-y:         64px;   /* mobile */
  --gd-sec-y-compact: 48px;   /* 説明系・帯セクション */

  /* コンテナ */
  --gd-container: 1080px;
  --gd-gutter:    20px;       /* mobile */
}

@media (min-width: 768px) {
  .root { --gd-sec-y: 88px; --gd-sec-y-compact: 64px; --gd-gutter: 32px; }
}
@media (min-width: 1024px) {
  .root { --gd-sec-y: 112px; --gd-sec-y-compact: 80px; --gd-gutter: 40px; }
}
```

**縦リズム（セクション内の標準間隔）**

| 関係 | 間隔 |
|---|---|
| H2 → リード | `16px`（D: `20px`） |
| セクション見出しブロック → 本体 | `40px`（D: `56px`） |
| H3 → 本文 | `8px` |
| 本文 → `.microNote` | `10px` |
| 本文 → CTA | `32px`（D: `40px`） |
| 図 → `.caption` | `16px` |
| カードグリッド gap | `16px`（D: `24px`） |
| カード内 padding | `24px`（D: `32px`） |

### 2-5. 角丸

```css
.root {
  --gd-r-sm:    10px;  /* チップ・小ボタン・バッジリンク */
  --gd-r-md:    16px;  /* 画像スロット・注意囲み・引用ブロック */
  --gd-r-lg:    24px;  /* 標準カード・図解のカラム */
  --gd-r-xl:    32px;  /* 大型パネル（CTAブロック） */
  --gd-r-pill:  999px; /* ピル型チップ・レーンラベル */
  --gd-r-phone: 40px;  /* 端末フレーム外側（内側メディアは 30px） */
}
```

> コーポレートの `--radius-lg: 20px` より **1段大きい 24px** を標準カードに採用。やさしさ・柔らかさを形状で表現するため（原則1）。LP内に閉じた値なのでサイト全体の形状言語とは衝突しない（Duosub も `--ds-radius-lg: 20px` を独自に持っている）。

### 2-6. 影

```css
.root {
  --gd-shadow-sm: 0 1px 2px rgba(22, 35, 42, 0.04), 0 2px 8px rgba(22, 35, 42, 0.05);
  --gd-shadow-md: 0 2px 4px rgba(22, 35, 42, 0.04), 0 6px 24px rgba(22, 35, 42, 0.07);
  --gd-shadow-lg: 0 4px 8px rgba(22, 35, 42, 0.05), 0 14px 40px rgba(22, 35, 42, 0.10);
}
```

- カード通常: `--gd-shadow-sm` ／ カードhover: `--gd-shadow-md`
- 端末フレーム（S1ヒーロー）: `--gd-shadow-lg`（ページ内で唯一これを使う要素）
- 図解のカラム・注意囲み・引用ブロック: **影なし**（枠線で成立させる）

### 2-7. ブレークポイント

```
Mobile   :         〜 767px   1カラム、--gd-gutter 20px
Tablet   :  768px 〜 1023px   2カラム化、--gd-gutter 32px
Desktop  : 1024px 〜          ヒーロー2カラム、図解横並び、--gd-gutter 40px
Wide     : 1280px 〜          コンテナ 1080px で打ち止め（それ以上広げない）
狭域ガード:         〜 359px   H1 を 24px 固定
```

**モバイルファースト**で記述する（ベースをモバイル、`min-width` で加算）。既存 `gentle-diary/page.module.css` の `640px` / `820px` という独自ブレークポイントは**廃止**し、サイト標準の 768 / 1024 に揃える。

---


---

## 3. 共通コンポーネント設計

> すべて `page.module.css` に定義し、`VariantA.tsx` / `VariantB.tsx` の両方から同じクラスを使う。**A専用・B専用のスタイルは作らない。**

### 3-1. ルート・セクションラッパー

```css
.root {
  /* §2-2〜2-6 のトークン定義（省略） */
  background: var(--gd-bg);
  color: var(--gd-text);
  font-family: var(--gd-font);
  font-size: 16px;
  line-height: 1.85;
  overflow-x: clip;
}

.root *, .root *::before, .root *::after { box-sizing: border-box; }

/* globals.css の [id]{scroll-margin-top:96px} は固定Nav前提で過大。
   このLPは sticky ヘッダー 56px（D 64px）なのでアンカー到達位置を補正する */
.root :where([id]) { scroll-margin-top: 76px; }
@media (min-width: 1024px) { .root :where([id]) { scroll-margin-top: 84px; } }

/* フォーカスリング（LP内で一括。ブラウザ既定の outline は明面で見づらいため上書き） */
.root :focus-visible {
  outline: 2px solid var(--gd-focus);
  outline-offset: 3px;
  border-radius: 2px;
}

.container {
  max-width: var(--gd-container);
  margin: 0 auto;
  padding-inline: var(--gd-gutter);
}

.section        { padding-block: var(--gd-sec-y); }
.sectionCompact { padding-block: var(--gd-sec-y-compact); }

.bgBase { background: var(--gd-bg); }
.bgAlt  { background: var(--gd-bg-alt); }
.bgSoft { background: var(--gd-bg-soft); }

/* セクション見出しブロック */
.sectionHead {
  max-width: 760px;
  margin: 0 auto 40px;
  text-align: center;
}
.sectionHead .lead { margin: 16px auto 0; max-width: 34em; }
@media (min-width: 1024px) {
  .sectionHead { margin-bottom: 56px; }
  .sectionHead .lead { margin-top: 20px; }
}

/* 左寄せ見出しブロック（ヒーロー・B7の手順ブロック等） */
.blockHead { max-width: 680px; margin: 0 0 24px; }

/* スクリーンリーダー専用 */
.srOnly {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}

/* 改行させない語の塊（Gentle Diary 等） */
.nb { display: inline-block; }
```

**セクション背景の交互パターン（A/Bとも9セクション）**

| A | 背景 | B | 背景 |
|---|---|---|---|
| A1 ヒーロー | `bgBase` | B1 ヒーロー | `bgBase` |
| A2 共感 | `bgAlt` | B2 共感 | `bgAlt` |
| A3 解決提示 | `bgBase` | B3 何が見える | `bgSoft` |
| A4 何が見える | `bgSoft` | B4 粒度 | `bgBase` |
| A5 使い方 | `bgBase` | B5 できる/できない | `bgAlt` |
| A6 誰のため | `bgAlt` | B6 プライバシー設計 | `bgBase` |
| A7 社会的証明 | `bgBase` | B7 使い方 | `bgAlt` |
| A8 FAQ | `bgAlt` | B8 FAQ | `bgBase` |
| A9 最終CTA | `ctaBand` | B9 最終CTA | `ctaBand` |

> `bgSoft`（1段ティールを感じさせる面）は、**A/Bとも「相手に何が見える？」セクションに1回だけ**割り当てる。D1 が置かれる最重要セクションを面の色で持ち上げるため。A/Bで割り当て先のセクション**番号**は違うが、**同じ内容のセクションに同じ面**が付くのでデザイン差分にはならない。

### 3-2. ヘッダー（`.header`）

```css
.header {
  position: sticky; top: 0; z-index: 40;
  background: rgba(244, 248, 248, 0.92);          /* --gd-bg の半透明 */
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--gd-line);
}
.headerInner {
  height: 56px;
  display: flex; align-items: center; gap: 10px;
}
.headerIcon  { width: 28px; height: 28px; border-radius: 8px; }
.headerName  { font-size: 16px; font-weight: 700; letter-spacing: 0.01em; }
@media (min-width: 1024px) {
  .headerInner { height: 64px; }
  .headerIcon  { width: 32px; height: 32px; border-radius: 9px; }
  .headerName  { font-size: 17px; }
}
```

**構造（A/B共通・CTAを置かない）**

```
+----------------------------------------------+
| [icon 28] Gentle Diary                       |  <- 56px / sticky
+----------------------------------------------+
```

- アイコンは `/images/products/GentleDiary.png`、`alt="Gentle Diary のアプリアイコン"`
- **ストアバッジ・お問い合わせボタンは置かない**（§0-1 判断5。CTA 4箇所を守るため／設計書 §2-6「お問い合わせはヒーローから外す」）
- 現行の `position: fixed` + `.page { padding-top: 72px }` 方式は**廃止**（`sticky` なら padding 不要。モバイルで2段組みに崩れる既存問題も同時に解消）
- ロゴ・名称をトップページへのリンクにしない（LPからの離脱を作らない）

### 3-3. `StoreCta`（ストアCTA・計測の唯一の経路）

設計書 §3-4 の `_components/StoreCta.tsx` に対応。**A/Bとも4箇所、すべてこのコンポーネント経由。**生の `<a>` を書かない。

> **命名注意**: 既存 props に `variant: "A" | "B"`（計測用のLPパターン）があるため、**見た目の変種は `size` プロパティ**にする。`variant` を見た目に使うと衝突する。

| `size` | 使用箇所 | 見出し | バッジ高さ | マイクロコピー | 配置 |
|---|---|---|---|---|---|
| `"hero"` | **A1 / B1** | あり 18px（D 20px） | 44px → 48px | あり | M 中央／D 左寄せ |
| `"block"` | **A5 / B3** | あり 18px（D 20px） | 44px → 48px | あり | 中央 |
| `"inline"` | **A3 / B6** | **なし** | 40px | 1行のみ（任意） | 中央 |
| `"final"` | **A9 / B9** | あり 20px（D 24px） | 46px → 52px | あり | 中央・CTAバンド上 |

```css
.storeCta { display: flex; flex-direction: column; align-items: center; }
.storeCtaHero { align-items: center; }
@media (min-width: 1024px) { .storeCtaHero { align-items: flex-start; } }

.ctaHeading {
  font-size: 18px; font-weight: 700; line-height: 1.5;
  color: var(--gd-text); margin-bottom: 16px; text-align: center;
}
.storeCtaHero .ctaHeading { text-align: inherit; }
@media (min-width: 1024px) { .ctaHeading { font-size: 20px; } }
.storeCtaFinal .ctaHeading { font-size: 20px; }
@media (min-width: 1024px) { .storeCtaFinal .ctaHeading { font-size: 24px; } }

.storeButtons {
  display: flex; flex-wrap: wrap; align-items: center;
  justify-content: center; gap: 12px;
}
.storeCtaHero .storeButtons { justify-content: inherit; }

.storeBtn {
  display: inline-block; border-radius: var(--gd-r-sm);
  transition: opacity 150ms ease, transform 150ms ease;
}
.storeBtn:hover  { opacity: 0.86; transform: translateY(-1px); }
.storeBtn:active { transform: translateY(0); }
.root .storeBtn:focus-visible { outline-offset: 4px; }

.storeBtnImg { display: block; height: 44px; width: auto; }
@media (min-width: 768px) { .storeBtnImg { height: 48px; } }

.storeCtaInline .storeBtn    { padding-block: 2px; }   /* 実効44px確保 */
.storeCtaInline .storeBtnImg { height: 40px; }
.storeCtaFinal  .storeBtnImg { height: 46px; }
@media (min-width: 768px) { .storeCtaFinal .storeBtnImg { height: 52px; } }

.ctaNote {
  margin-top: 12px; max-width: 30em;
  font-size: 13px; line-height: 1.7; color: var(--gd-text-muted);
  text-align: center;
}
.storeCtaHero .ctaNote { text-align: inherit; }
```

- **並び順は App Store → Google Play で固定**（A/B共通・設計書 §2-6）
- バッジ画像は `/images/products/AppStore.png` → `/images/products/GooglePlay.png`（既存流用）
- `alt` は設計書 §2-12 の文言をそのまま使う
- バッジ高さ 40〜52px はいずれも 44px 要件を満たす（`inline` のみ padding で補う）

**最終CTAバンド上の色の反転**

```css
.ctaBand {
  padding-block: 88px; text-align: center;
  background: var(--gd-cta-bg);
}
@media (min-width: 1024px) { .ctaBand { padding-block: 120px; } }

.ctaBand .h2         { color: var(--gd-on-cta); }
.ctaBand .lead       { color: var(--gd-on-cta-sub); }
.ctaBand .ctaHeading { color: var(--gd-on-cta); }
.ctaBand .ctaNote    { color: var(--gd-on-cta-sub); }
.root .ctaBand :focus-visible { outline-color: var(--gd-focus-on-cta); }

.ctaAppIcon {
  width: 64px; height: 64px; border-radius: 15px;
  margin: 0 auto 24px; box-shadow: var(--gd-shadow-md);
}
```

#### 3-3-5. （不使用）モバイル追従ストアバー ※**今回は実装しない**

**【再決定済み 2026-10-09・実装済み】** 常時表示のストアCTAを入れる方針に反転。実装は `page.module.css` 末尾の「常時表示のストアCTA」ブロック（`.stickyBar` / `.barSpacer` / `.headerCta` / `.storeCtaSticky` / `.storeCtaHeader`）と、`shared.tsx` の `LpHeader` / `StickyStoreBar` / `StickyBarSpacer`。モバイルは下部固定バー、768px以上はヘッダー内バッジで排他。

```css
.stickyBar {
  position: fixed; inset-inline: 0; bottom: 0; z-index: 30;
  background: rgba(244, 248, 248, 0.94);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  border-top: 1px solid var(--gd-line);
  padding: 10px max(16px, env(safe-area-inset-right))
           calc(10px + env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
}
.barSpacer { height: calc(61px + env(safe-area-inset-bottom)); background: #111827; }
@media (min-width: 768px) { .stickyBar, .barSpacer { display: none; } }
```
※有効化する場合は `layout.tsx` に `export const viewport = { viewportFit: "cover" }` が必要（Duosub と同じ）。`z-index: 30` はヘッダー（40）より下。

### 3-4. `.microNote`（設計書 §2-2 の新設クラス）

```css
.microNote {
  margin-top: 10px;
  max-width: 32em;
  font-size: 13px;
  line-height: 1.7;
  letter-spacing: 0.01em;
  font-weight: 400;                  /* 太字にしない */
  color: var(--gd-text-muted);       /* 全背景面で 4.5:1 以上（§8-1 実測） */
}
```

**守るべき制約（設計書 §2-2「扱いのルール」）**

| 項目 | 指定 |
|---|---|
| 配置箇所 | **3箇所のみ**: ①FV サブコピー直下（短縮版） ②S2 スクショ直下のキャプション（全文版） ③FAQ Q2 回答の1文目（全文版） |
| 見出し化 | **禁止**（`<h*>` にしない） |
| 帯化・独立セクション化 | **禁止** |
| 強調（太字・ブランドカラー・マーカー） | **禁止** |
| アニメーション | **禁止**（`.fadeIn` も付けない） |
| A/B差分 | **禁止**（文言・配置・スタイルすべて同一） |
| FVだけ大きくする等 | **禁止**（13px 固定） |

> **③ FAQ Q2 についての設計上の注記**: 設計書 §2-2 は「FAQ Q2 冒頭に全文版」とし、§2-9 Q2 では太字で記載されています。一方 §2-2 の扱いルールは「強調しない」です。FAQ の回答全体が本文スケールなので、ここでは **`.microNote` を適用せず、Q2 回答の1文目として通常の本文色・通常ウェイトで記述**します（§2-2 のルールを優先）。1文目に置くこと自体で十分に目に入り、「添え書きの階層」も壊しません。

### 3-5. カード（`.card`）

```css
.card {
  background: var(--gd-surface);
  border: 1px solid var(--gd-line);
  border-radius: var(--gd-r-lg);
  padding: 24px;
  box-shadow: var(--gd-shadow-sm);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--gd-shadow-md);
  border-color: var(--gd-teal);
}
@media (min-width: 1024px) { .card { padding: 32px; } }

.cardH3   { font-size: 19px; font-weight: 700; line-height: 1.5; color: var(--gd-text); }
.cardBody { margin-top: 8px; font-size: 15px; line-height: 1.85; color: var(--gd-text-sub); }
@media (min-width: 1024px) {
  .cardH3   { font-size: 21px; }
  .cardBody { font-size: 16px; }
}

/* カード内の補助イラスト枠（既存の横長イラストを収める。§7-3） */
.cardFig {
  margin-top: 20px;
  width: 100%;
  aspect-ratio: 5 / 4;
  max-height: 180px;
  border-radius: var(--gd-r-md);
  overflow: hidden;
  background: var(--gd-surface-2);
}
.cardFig img { width: 100%; height: 100%; object-fit: cover; object-position: center; }

/* グリッド */
.grid3 { display: grid; grid-template-columns: 1fr; gap: 16px; }
.grid2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 768px) {
  .grid3 { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .grid2 { grid-template-columns: repeat(2, 1fr); gap: 20px; }
}
@media (min-width: 1024px) {
  .grid3 { grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .grid2 { gap: 24px; }
}
```

> **hover の border に `--gd-teal`（2.66:1）を使ってよい理由**: hover 境界は情報を単独で伝えないため 3:1 要件の対象外。かつ `transform` と `box-shadow` が同時に変化するので色だけに依存していない。

### 3-6. 信頼バッジ（`.trustCard`・設計書 §2-8 の4つ）

```css
.trustGrid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 768px)  { .trustGrid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
@media (min-width: 1024px) { .trustGrid { gap: 24px; } }

.trustCard {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 16px;
  align-items: start;
  background: var(--gd-surface);
  border: 1px solid var(--gd-line);
  border-radius: var(--gd-r-lg);
  padding: 24px;
}
@media (min-width: 1024px) { .trustCard { padding: 28px 32px; } }

.trustIcon { width: 40px; height: 40px; color: var(--gd-teal-ink); flex: none; }
.trustH4   { font-size: 16px; font-weight: 700; line-height: 1.6; color: var(--gd-text); }
.trustBody { margin-top: 6px; font-size: 14px; line-height: 1.8; color: var(--gd-text-sub); }
@media (min-width: 1024px) { .trustH4 { font-size: 17px; } .trustBody { font-size: 15px; } }
```

- **hover効果を付けない**（事実の提示であり操作対象ではない）
- 見出しは `<h3>` ではなく `<p class="trustH4">`（見出し階層を乱さない。§8-4）
- アイコンは §6-7（D7）の4グリフ。**勲章・認証マーク風にしない**

### 3-7. アコーディオン（FAQ）— **既存 `FaqAccordion` は流用しない**

**判断と根拠**

| 観点 | 既存 `app/components/FaqAccordion.tsx` | 本LPの要件 | 判定 |
|---|---|---|---|
| 配色 | `--color-border` / `--color-text` 等、**ダークテーマのグローバルトークン直結** | 明るいLP面 | 不可。全面上書きが必要でカスケードと戦う |
| DOM | `{open === i && <dd>}` で**閉じている間は回答テキストがDOMに存在しない** | 設計書 §3-10 は「FAQ本文が最大の長文キーワード供給源」「A/B両方のHTMLに存在させる」が前提 | **致命的。**既定で全問閉じるため初期HTMLに回答が1つも載らない |
| ARIA | 閉じている間 `aria-controls` が存在しないIDを指す | — | 不正（軽微） |
| JS | クライアントコンポーネント必須 | `<details>` なら JS 不要 | — |
| 前例 | — | **Duosub LP は `<details>` を採用**（現在の品質基準） | 揃えるべき |

→ **ネイティブ `<details>/<summary>` で新規実装**（Duosub の `.faqList` / `.faqItem` / `.faqQ` / `.faqMark` / `.faqA` と同じ構造を `--gd-` トークンで実装）。

```css
.faqList { max-width: 760px; margin: 0 auto; border-top: 1px solid var(--gd-line); }
.faqItem { border-bottom: 1px solid var(--gd-line); }

.faqQ {
  display: grid; grid-template-columns: 1fr 20px; gap: 16px; align-items: center;
  padding: 20px 0; min-height: 48px;        /* タップターゲット 44px 以上 */
  cursor: pointer; list-style: none;
}
.faqQ::-webkit-details-marker { display: none; }

.faqQText {
  font-size: 16px; font-weight: 700; line-height: 1.6;
  color: var(--gd-text); font-feature-settings: "palt" 1;
}
@media (min-width: 1024px) { .faqQText { font-size: 17px; } }
.faqQ:hover .faqQText { color: var(--gd-teal-ink); }

/* ＋／− マーク（open で横棒1本に） */
.faqMark { position: relative; width: 20px; height: 20px; }
.faqMark::before, .faqMark::after {
  content: ""; position: absolute; left: 4px; top: 9.25px;
  width: 12px; height: 1.5px; background: var(--gd-teal-ink);
  transition: transform 150ms ease;
}
.faqMark::after { transform: rotate(90deg); }
.faqItem[open] .faqMark::after { transform: rotate(90deg) scaleX(0); }

.faqA {
  padding: 0 36px 24px 0;
  font-size: 15px; line-height: 1.9; color: var(--gd-text-sub);
}
@media (min-width: 1024px) { .faqA { font-size: 16px; } }
.faqA p + p { margin-top: 14px; }
.faqA a { color: var(--gd-teal-ink); text-decoration: underline; text-underline-offset: 3px; }

/* Q2 の日記サンプル（「7:00頃 自宅付近」…）。引用ではなく画面内容の再現なので .quote は使わない */
.faqSample {
  margin: 14px 0;
  padding: 16px 20px;
  background: var(--gd-surface-2);
  border: 1px solid var(--gd-line);
  border-radius: var(--gd-r-md);
  font-family: var(--gd-font-num);
  font-variant-numeric: tabular-nums;
  font-size: 14px; line-height: 2; color: var(--gd-text);
}
.faqSampleRow { display: grid; grid-template-columns: 5.5em 1fr; gap: 8px; }
```

**状態**

| 状態 | 見た目 |
|---|---|
| 既定（閉） | `＋`（2本線のクロス）／見出し `--gd-text` |
| hover | 見出しが `--gd-teal-ink` |
| focus-visible | `.root` 共通のフォーカスリング（`outline-offset: 3px`） |
| open | `−`（縦線が `scaleX(0)`）／回答が展開 |
| reduced-motion | `.faqMark::before, .faqMark::after { transition: none }` |

**ARIA**: ネイティブ `<details>` が状態を自動で持つため**追加の ARIA 属性は不要**。`<summary>` は暗黙のボタンロールを持ち Enter/Space で開閉できる。`<dl>/<dt>/<dd>` は使わない（`<details>` と組み合わせると構造が不正になる）。

**JSON-LD との整合**: 表示は ReactNode（リンク・サンプル枠を含む）、`faqPageJsonLd()` は `lib/seo/gentle-diary-faqs.ts` の**プレーンテキスト `a`** を使う。同じ文章の2表現になるため、**builder は文言の一致を目視確認**すること（§9-6）。

### 3-8. 対比2カラム（`.compare`）— D1 と D8 の土台

**原則2（Equal Weight）の実装がこのコンポーネントの最重要点。**

```css
.compare {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: stretch;              /* 両カラムの高さを揃える */
  max-width: 920px; margin: 0 auto;
}
@media (min-width: 768px)  { .compare { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
@media (min-width: 1024px) { .compare { gap: 24px; } }

/* 2カラムは padding / font-size / border幅 / 本文色をすべて同一にする。
   違うのは「上端アクセントバーの色」と「アイコン」だけ */
.compareCol {
  position: relative;
  border-radius: var(--gd-r-lg);
  padding: 24px 20px;
  display: flex; flex-direction: column;
}
@media (min-width: 1024px) { .compareCol { padding: 32px 28px; } }

.compareCol::before {
  content: ""; position: absolute; inset-inline: 0; top: 0; height: 4px;
  border-radius: var(--gd-r-lg) var(--gd-r-lg) 0 0;
}

/* 見出しは両カラムとも --gd-text（同一）。色で優劣を作らない */
.compareHead {
  display: flex; align-items: center; gap: 10px;
  font-size: 16px; font-weight: 700; line-height: 1.5;
  color: var(--gd-text);
  padding-bottom: 16px;
  border-bottom: 1px solid;          /* 色はカラム別指定 */
}
@media (min-width: 1024px) { .compareHead { font-size: 17px; } }
.compareHeadIcon { width: 22px; height: 22px; flex: none; }

.compareList { list-style: none; margin: 0; padding: 16px 0 0; display: grid; gap: 14px; }
.compareItem {
  display: grid; grid-template-columns: 20px 1fr; gap: 10px; align-items: start;
  font-size: 15px; line-height: 1.75;
  color: var(--gd-text);             /* ★両カラム同一（13.4:1 / 13.5:1） */
}
@media (min-width: 1024px) { .compareItem { font-size: 16px; } }
.compareItemIcon { width: 20px; height: 20px; margin-top: 4px; flex: none; }

/* ---- 中立側（見えない／できない）---- */
.compareColNeutral          { background: var(--gd-neutral-soft); }
.compareColNeutral::before  { background: var(--gd-neutral-line); }
.compareColNeutral .compareHead     { border-bottom-color: var(--gd-neutral-line); }
.compareColNeutral .compareHeadIcon,
.compareColNeutral .compareItemIcon { color: var(--gd-neutral-ink); }

/* ---- ブランド側（見える／できる）---- */
.compareColBrand            { background: var(--gd-teal-soft); }
.compareColBrand::before    { background: var(--gd-teal); }
.compareColBrand .compareHead       { border-bottom-color: rgba(31, 111, 121, 0.28); }
.compareColBrand .compareHeadIcon,
.compareColBrand .compareItemIcon   { color: var(--gd-teal-ink); }

/* 図の下の確定文言・締めの文 */
.compareFoot {
  max-width: 920px; margin: 20px auto 0;
  font-size: 14px; line-height: 1.8; color: var(--gd-text-sub);
  text-align: center;
}
```

**禁止事項（実装時に必ず守る）**

- 中立側に `opacity` を掛けない／`font-size` を下げない／`<details>` に入れない
- 中立側に**赤系の色を一切使わない**
- モバイルで中立側を2番目に置くのは可（視線順）だが、**スタイルは完全に同一**
- 「✕」を赤で描かない（アイコンは §6-1 / §6-8 の指定グリフ）

### 3-9. 注意囲み（`.notice`）— B7 代理設定ブロック内 / D9 図内

```css
.notice {
  display: grid; grid-template-columns: 24px 1fr; gap: 12px; align-items: start;
  background: var(--gd-amber-soft);
  border: 1px solid var(--gd-amber-line);
  border-left-width: 4px;
  border-radius: var(--gd-r-md);
  padding: 16px 18px;
  margin-top: 20px;
}
@media (min-width: 1024px) { .notice { padding: 20px 22px; } }

.noticeIcon  { width: 24px; height: 24px; color: var(--gd-amber-line); flex: none; }
.noticeLabel {
  font-size: 13px; font-weight: 700; letter-spacing: 0.06em;
  color: var(--gd-amber-ink); line-height: 1.5;
}
.noticeTitle { margin-top: 4px; font-size: 15px; font-weight: 700; line-height: 1.7; color: var(--gd-amber-ink); }
.noticeBody  { margin-top: 6px; font-size: 14px; line-height: 1.8; color: var(--gd-text); }
@media (min-width: 1024px) { .noticeTitle { font-size: 16px; } .noticeBody { font-size: 15px; } }
```

**強度の設計（設計書 §2-7 末尾・§4-3 D9 の指示）**

- **赤は使わない。** アンバー（文字 `#8A5A00` = 5.51:1 / 枠 `#A4701A` = 3.98:1）＋4px左バー＋注意三角の線画アイコン＋「注意」ラベルの**4重**で、色に依存せず見落とされない強度を作る
- **別セクションに切り出さない。** B7 の代理設定ブロック（`.proxyBlock`）**の内側**に置く
- **折りたたまない・小さくしすぎない。** `.noticeTitle`（15/16px）は同ブロックの `<h3>`（19/22px）より明確に1段弱く、本文（14/15px）はブロック本文と同等スケール＝「見出しより1段弱い扱い」
- D9 図内でも**同じ `.notice` クラス**を使う（重複定義しない）

### 3-10. 引用ブロック（`.quote`）— 規約引用（設計書 §2-8）

```css
.quote {
  background: var(--gd-surface);
  border: 1px solid var(--gd-line);
  border-left: 3px solid var(--gd-teal-ink);
  border-radius: 0 var(--gd-r-md) var(--gd-r-md) 0;
  padding: 20px 24px;
  margin: 0;                              /* blockquote 既定を打ち消す */
  max-width: 760px;
}
.quoteMark {
  display: block;
  font-family: var(--gd-font-num);
  font-size: 28px; font-weight: 700; line-height: 1;
  color: var(--gd-teal); margin-bottom: 4px;
}
.quoteText {
  font-size: 16px; font-weight: 500; line-height: 1.85;
  color: var(--gd-text);
  font-style: normal;                     /* 和文を斜体にしない */
}
@media (min-width: 1024px) { .quoteText { font-size: 17px; } }
.quoteSource {
  display: block; margin-top: 12px;
  font-size: 13px; line-height: 1.7; color: var(--gd-text-muted);
  font-style: normal;
}
.quoteSource a { color: var(--gd-teal-ink); text-decoration: underline; text-underline-offset: 3px; }
```

**構造**

```html
<blockquote class="quote">
  <span class="quoteMark" aria-hidden="true">&ldquo;</span>
  <p class="quoteText">本サービスには、リアルタイムの位置情報を第三者と共有する機能がありません</p>
  <cite class="quoteSource">
    Gentle Diary <a href="/service/products/gentle-diary/terms">利用規約</a> 第7条3項
  </cite>
</blockquote>
```

- 「引用だと分かる扱い」を **①`<blockquote>` ②3px 左罫線 ③引用符グリフ ④`<cite>` による出典明記**の4点で担保
- **ポリシー/規約リンクのすぐ近く**に置く（`.quote` の直下 24px に `.policyLinks`）
- `.quoteMark` は装飾なので `aria-hidden`。**引用文言は一字一句変えない**（法務確認済み・`terms/page.tsx` 第7条3項と一致）

```css
/* ポリシー導線（フッターの小リンクではなく、セクション内の目に入る位置） */
.policyLinks { display: flex; flex-wrap: wrap; gap: 8px 20px; align-items: center; margin-top: 24px; }
.policyLink {
  display: inline-flex; align-items: center; gap: 6px;
  min-height: 44px; padding: 10px 0;      /* タップターゲット */
  font-size: 15px; font-weight: 600; color: var(--gd-teal-ink);
  text-decoration: underline; text-underline-offset: 4px;
}
.policyLink:hover { text-decoration-thickness: 2px; }
.policyLinkIcon { width: 16px; height: 16px; flex: none; }

.operator { margin-top: 20px; font-size: 14px; line-height: 1.8; color: var(--gd-text-sub); }
.operator strong { font-weight: 700; color: var(--gd-text); }
.operator a { color: var(--gd-teal-ink); text-decoration: underline; text-underline-offset: 3px; }
```

### 3-11. チップ（`.chip`）— B1 ヒーローのミニチップ

設計書 §1-2 の「現在地（なし）」「地図（なし）」「1日1回の日記（あり）」。**絵文字は使わず線画インラインSVG**（サイト方針 §13.6）。

```css
.chipRow { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }

.chip {
  display: inline-flex; align-items: center; gap: 6px;
  min-height: 34px; padding: 6px 14px;
  border-radius: var(--gd-r-pill);
  font-size: 13px; font-weight: 600; line-height: 1.4;
  color: var(--gd-text);                  /* ★両種同一 */
  border: 1px solid transparent;
}
.chipIcon { width: 16px; height: 16px; flex: none; }

/* 否定チップ（現在地・地図）: 中立グレー。赤にしない */
.chipOff { background: var(--gd-neutral-soft); border-color: var(--gd-neutral-line); }
.chipOff .chipIcon { color: var(--gd-neutral-ink); }

/* 肯定チップ（1日1回の日記）: ティール */
.chipOn { background: var(--gd-teal-soft); border-color: rgba(31, 111, 121, 0.28); }
.chipOn .chipIcon { color: var(--gd-teal-ink); }

@media (min-width: 1024px) { .chip { font-size: 14px; min-height: 36px; } }
```

- 否定の記号は汎用の禁止マークではなく、**「目に斜線」「地図に斜線」の意味アイコン**（§6-1 のグリフを 16px で再利用）
- 肯定は「ノート＋チェック」
- **読み上げ対応**: アイコンは `aria-hidden`。設計書の表記は「❌ 現在地」「⭕ 1日1回の日記」という記号＋名詞なので、**記号を読み上げに残せない**。`.srOnly` で「共有されません」「共有されます」を補う。例:
  `<span class="chip chipOff"><svg …/>現在地<span class="srOnly">は共有されません</span></span>`

### 3-12. アンカーリンク（`.anchorLink`）— B5「できること」5項目目 → B7

```css
.anchorLink {
  display: inline-flex; align-items: center; gap: 6px;
  min-height: 44px; padding: 10px 14px; margin-top: 4px;
  border-radius: var(--gd-r-pill);
  background: var(--gd-surface);
  border: 1px solid var(--gd-teal-ink);
  font-size: 14px; font-weight: 600; color: var(--gd-teal-ink);
}
.anchorLink:hover { background: var(--gd-teal-soft); }
.anchorLinkIcon { width: 14px; height: 14px; }
```

> 本文中のインラインリンクでは 44px のタップターゲットを確保できないため、**独立したピル型リンク**にする（ラベル「設定のしかた」＋右向き矢印アイコン）。リンク先は `#proxy-setup`（B7 内の代理設定ブロック）。

### 3-13. 画像スロット（`.shot*`）— §7 と対になる実装

```css
/* 枠が寸法とアスペクト比を持ち、中身（実画像 or プレースホルダ）を差し替える */
.shot { position: relative; width: 100%; margin-inline: auto; }

.shotMedia {
  position: relative;
  width: 100%;
  aspect-ratio: var(--gd-ar, 393 / 852);   /* スロットごとに inline style で渡す */
  border-radius: var(--gd-r-md);
  overflow: hidden;
  background: var(--gd-surface-2);
}
.shotMedia img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.shotContain .shotMedia img { object-fit: contain; }

/* 端末フレーム（S1 ヒーロー / S3 / S5 / S8） */
.shotPhone {
  padding: 10px;
  border: 1.5px solid #243036;
  border-radius: var(--gd-r-phone);
  background: #0E1518;
  box-shadow: var(--gd-shadow-lg);
}
.shotPhone .shotMedia { border-radius: 30px; }

/* 小型の端末フレーム（D9 内の S6 / S4） */
.shotPhoneSm { padding: 7px; border-radius: 28px; box-shadow: var(--gd-shadow-sm); }
.shotPhoneSm .shotMedia { border-radius: 21px; }

/* 枠なしスロット（S2 日記カード拡大 / S7 正方形） */
.shotPlain .shotMedia { border: 1px solid var(--gd-line); }

/* 撮影待ちプレースホルダ。実画像と完全に同一寸法なので差し替えても動かない */
.shotPlaceholder {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; padding: 12px; text-align: center;
  border: 2px dashed var(--gd-line-strong);
  border-radius: inherit;
  background: var(--gd-surface-2);
  color: var(--gd-text-muted);
}
.shotPlaceholderId   { font-family: var(--gd-font-num); font-size: 15px; font-weight: 700; color: var(--gd-text-sub); }
.shotPlaceholderText { font-size: 12px; line-height: 1.6; }
.shotPlaceholderAr   { font-family: var(--gd-font-num); font-size: 11px; letter-spacing: 0.04em; }

/* 汎用スロット（比率の違う画像を並べる D4 / D9 のステップ内）。contain で絶対に切らない */
.figSlot {
  width: 100%; aspect-ratio: var(--gd-ar, 3 / 4);
  border-radius: var(--gd-r-md);
  background: var(--gd-surface-2);
  border: 1px solid var(--gd-line);
  display: grid; place-items: center; padding: 12px; overflow: hidden;
}
.figSlot img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; }
```

**プレースホルダの表示内容**

```
+ - - - - - - - - +
|       S1        |   <- .shotPlaceholderId
| タイムライン画面 |   <- .shotPlaceholderText
|    撮影待ち      |
|    393 : 852    |   <- .shotPlaceholderAr
+ - - - - - - - - +
```

**差し替え時にレイアウトが崩れない理由**

1. `aspect-ratio` は**枠（`.shotMedia`）側**にあり、画像の実寸に依存しない
2. 枠の `width` は親の `max-width` / `width` で決まり、画像の有無に影響されない
3. プレースホルダは `position: absolute; inset: 0` なので高さを持たない
4. 実画像は `width/height: 100%` + `object-fit` なので、入稿寸法が多少ずれても枠が守られる

### 3-14. フェードイン（`.fadeIn`）— 現行処理の是正

現行 `page.tsx` は `IntersectionObserver` で `.fadeIn` → `.isVisible` を付ける方式ですが、**既定状態が `opacity: 0`** のため JS 失敗時・クローラ環境でコンテンツが見えません。次のように是正します。

```css
/* 既定は「見える」。JS が .fadeInReady を付けてから初めて隠す */
.fadeIn { }
.fadeInReady {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 600ms ease, transform 600ms ease;
}
.isVisible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .fadeInReady { opacity: 1; transform: none; transition: none; }
  .card, .storeBtn, .faqMark::before, .faqMark::after { transition: none; }
  .card:hover, .storeBtn:hover { transform: none; }
}
```

**実装ルール**

1. クライアント側 effect で `matchMedia("(prefers-reduced-motion: reduce)").matches` が `true` なら**何もしない**（`.fadeInReady` を付けない）
2. それ以外は要素に `.fadeInReady` を付けてから `IntersectionObserver` で `.isVisible` を付与
3. **ヒーロー（A1 / B1）には `.fadeIn` を付けない**（LCP 要素なので遅延させない）
4. **`.microNote` には付けない**（設計書 §2-2 でアニメーション禁止）
5. 付与対象は「セクション見出しブロック」「カードグリッド」「図解」の単位。1要素ずつ付けると画面がチラつく

---

## 4. パターンA の画面設計（A1〜A9）

**共通構造**

```
<div class="root">
  <header class="header">…</header>          ← sticky 56/64px・CTAなし
  <main>
    A1 … A9
  </main>
  <LpProductFooter variant="teal" … />        ← tagline は現行のまま変更不要
  <LpImpression isoWeek variant="A" />
</div>
```

**CTA（StoreCta）の設置: 4箇所** — A1（`hero`）／A3（`inline`）／A5（`block`）／A9（`final`）

---

### A1 ヒーロー（`bgBase` / `padding-block: 24px 64px` → D `40px 112px`）

**使用コンポーネント**: `.h1`（2行組み）／`.lead`／`.microNote`／`StoreCta size="hero"`／`.shot .shotPhone`（S1）

**モバイル（〜767px）: 1カラム・縦積み**

```
+----------------------------------------------+
| 「今どこ？」って、                            |  .h1  27px〜
| 聞かなくていい。                              |  （.h1Line ×2 / gap 0.14em）
|                                              |  24px
| 常に"今どこ"を見せ合うのは、正直しんどい。      |  .lead 16px
| かといって、何も分からないのも落ち着かない。    |
| Gentle Diary は、リアルタイムの位置を共有      |
| しません。届くのは、1日の行動を自動でまとめた   |
| 日記だけ。常時共有の代わりを探している恋人・    |
| 夫婦に。                                      |
| ※日記といっても、書く必要はありません。        |  .microNote 13px（10px上）
|   時刻と場所のリストが自動でできます。          |
|                                              |  32px
|          無料でダウンロード                   |  .ctaHeading 18px（中央）
|      [App Store] [Google Play]               |  44px バッジ・gap 12px
|   無料。相手に現在地が見えることはありません。   |  .ctaNote 13px
|                                              |  40px
|            +--------------+                  |
|            |              |                  |  .shotPhone
|            |   S1 画面     |                  |  width: min(72vw, 264px)
|            |  393 : 852   |                  |  （中央寄せ）
|            |              |                  |
|            +--------------+                  |
+----------------------------------------------+
```

**デスクトップ（1024px〜）: 2カラム**

```css
.heroGrid { display: flex; flex-direction: column; align-items: center; }
@media (min-width: 1024px) {
  .heroGrid {
    display: grid;
    grid-template-columns: 1fr 300px;
    column-gap: 72px;
    align-items: center;
  }
  .heroCopy { text-align: left; }
  .heroShot { margin-top: 0; }
}
.heroCopy { text-align: center; max-width: 34em; }
.heroShot { margin-top: 40px; }
```

```
+--------------------------------------------------------------+
|  「今どこ？」って、                        +------------+     |
|  聞かなくていい。                          |            |     |
|                                            |  S1 画面    |     |
|  常に"今どこ"を見せ合うのは…（.lead 18px）  | 393:852    |     |
|  ※日記といっても、書く…（.microNote）       |  300px幅   |     |
|                                            |            |     |
|  無料でダウンロード                         |            |     |
|  [App Store] [Google Play]                 |            |     |
|  無料。相手に現在地が…（.ctaNote）          +------------+     |
+--------------------------------------------------------------+
   1fr                      72px gap            300px
```

**画像スロット**: S1（`.shotPhone`・`--gd-ar: 393/852`）
- M `width: min(72vw, 264px)` / T `280px` / D `300px`（**外枠の幅**。内側メディアは枠 padding 10px + border 1.5px を引いた値）
- **`.fadeIn` を付けない**（LCP）。`next/image` に `priority` を付与

**余白**: H1→lead 24px（D 28px）／lead→microNote 10px／microNote→CTA 32px（D 40px）／CTA→S1 40px（D 0・横並び）

**A1 の注意**
- H1 は `.h1Line` 2本。A-H1-1 は「ため」不要なので `.h1Pause` は**付けない**（B との差はここだけ）
- `.lead` の `max-width: 34em` で長文サブコピーの行長を制御（1行 34文字程度）
- お問い合わせボタンは置かない

---

### A2 共感（痛みの言語化）（`bgAlt` / `.section`）

**H2**: 「今どこ？」を見せ合うのに、疲れていませんか
**セクションリード**: 位置を見せ合うのは、安心のためだったはずなのに。

**使用コンポーネント**: `.sectionHead`／`.grid3` + `.card`（3枚）／`.cardFig`（既存イラスト）／**D2**／`.caption`

```
+----------------------------------------------+
|        H2（中央・.sectionHead）               |
|        位置を見せ合うのは…（.lead）            |
|                                      40/56px |
| +------------+ +------------+ +------------+ |
| | 「今どこ？」| | 見られてい | | かといって、| |
| | って、本当 | | ると、寄り | | 何も分から | |
| | は聞きたく | | 道ひとつに | | ないのは落 | |
| | ない       | | 理由がいる | | ち着かない | |
| | （本文）   | | （本文）   | | （本文）   | |
| | [イラスト] | | ─────      | | [イラスト] | |
| +------------+ +------------+ +------------+ |
|                                        48px  |
| +------------------------------------------+ |
| |            D2 比較図                      | |
| +------------------------------------------+ |
|  ずっと見える必要は、たぶんなかった。（.caption）|
+----------------------------------------------+
```

- **モバイル**: `.grid3` が1カラム → カード縦積み（gap 16px）
- **タブレット**: 2カラム（3枚目が下段左に単独 → `grid-column: span 2` にはしない。左寄せで可）
- **デスクトップ**: 3カラム（gap 24px）
- **イラスト（§7-3）**: カード1に `1.png`、カード3に `2.png` を `.cardFig`（5:4・max-height 180px）で配置。**カード2はイラストなし**（3枚すべてに入れると重く、`0.png` は内容が一致しない）。
  → **【解決済み 2026-10-09】3枚とも不使用に決定**（§0-2 Q-B 参照）。**A2 / B2 はテキストのみで構成する。** 既存イラストは1枚も使わない
- D2 は `.section` 内で `max-width: 860px; margin: 48px auto 0`
- `.caption` は D2 の直下 16px。**A のキャプション文言は「ずっと見える必要は、たぶんなかった。」**（B とは異なる＝設計書 §4-3 D2 の指定）

---

### A3 解決提示（`bgBase` / `.section`）

**H2**: リアルタイム追跡をしない、位置情報共有アプリです
**コピー**: 「"今どこにいる"はやめて、"今日どこにいた"だけにした。」

**使用コンポーネント**: `.sectionHead`／`.statement`（大きめの言い切りコピー）／`<h3>` ＋ `.shot .shotPlain`（S2）／`.microNote`／`.grainList`（粒度3点）／`StoreCta size="inline"`

> **SEO上の必須要素（設計書 §2-11 末尾・§3-10-1）**: 「位置情報 日記」を含む H2 が B にしか無い状態を避けるため、**A3 の中に `<h3>`「届くのは、1日分の位置情報日記だけ」を置く**（設計書の推奨＝A3 内に B4 相当の内容を含める方式）。セクション数は9のまま。

```
+----------------------------------------------+
|        H2（中央）                             |
|                                      40/56px |
|   "今どこにいる"はやめて、                     |  .statement
|   "今日どこにいた"だけにした。                 |  20/26px・700・中央
|                                        48px  |
|   h3 届くのは、1日分の位置情報日記だけ         |  .h3（中央）
|                                        24px  |
|        +--------------------------+          |
|        |      S2 日記カード拡大     |          |  .shotPlain
|        |        3 : 2             |          |  max-width 520px
|        +--------------------------+          |
|  ※日記といっても、文章を書く必要はありません。  |  .microNote（中央・12px上）
|   1日の行動が「時刻と場所」のリストに自動で     |
|   まとめられます。                             |
|                                        40px  |
|  ・時刻は20分単位のおおよその表記（12:20頃）    |  .grainList
|  ・場所は「〇〇周辺」という粒度                 |
|  ・同じ場所にいる間は、行が増えません           |
|                                        40px  |
|        [App Store] [Google Play]             |  StoreCta size="inline"
+----------------------------------------------+
```

```css
.statement {
  max-width: 24em; margin: 0 auto;
  font-size: 20px; font-weight: 700; line-height: 1.75;
  letter-spacing: 0.01em; color: var(--gd-text);
  text-align: center; font-feature-settings: "palt" 1;
}
@media (min-width: 1024px) { .statement { font-size: 26px; line-height: 1.7; } }

/* 粒度3点（F3 / F4 / F6） */
.grainList { list-style: none; margin: 40px auto 0; padding: 0; max-width: 560px; display: grid; gap: 12px; }
.grainItem {
  display: grid; grid-template-columns: 20px 1fr; gap: 10px; align-items: start;
  font-size: 15px; line-height: 1.8; color: var(--gd-text-sub);
}
.grainIcon { width: 20px; height: 20px; margin-top: 5px; color: var(--gd-teal-ink); flex: none; }
@media (min-width: 1024px) { .grainItem { font-size: 16px; } }
```

**画像スロット**: S2（`.shotPlain`・`--gd-ar: 3/2`）・`max-width: 520px`（M は `width: 100%`）。中央寄せ
**`.microNote` 配置箇所②**（全文版）: S2 の直下 12px。中央寄せ（`margin-inline: auto`）
**CTA**: `size="inline"`（見出しなし・バッジ 40px）。設計書 A3 の「△テキストCTA」に相当するが、**計測の都合で必ず StoreCta 経由**にする（生の `<a>` を作らない）

---

### A4 相手に何が見える？（`bgSoft` / `.section`）【最重要】

**H2**: 相手に何が見える？ 見えるもの・見えないもの
**リード（A視点）**: 「自分が何を見られるのか」を先にお伝えします。

**使用コンポーネント**: `.sectionHead`／**D1**（`.compare`）／`.compareFoot`（確定文言）／**D3**（粒度変換フロー）

```
+----------------------------------------------+
|        H2（中央）／リード（A視点）              |
|                                      40/56px |
| +---------------------+ +------------------+ |
| | [目に斜線]           | | [ノート]          | |
| | 相手には見えません    | | 相手に見えるのは   | |
| | ------------------- | | これだけ           | |
| | − 今いる場所（現在地）| | ------------------ | |
| | − 地図上の位置       | | ○ 1日1回つくられる | |
| | − リアルタイムの移動  | |   日記            | |
| | − 正確な緯度・経度   | | ○ 20分単位の時刻   | |
| | − 分単位の正確な時刻  | | ○「〇〇周辺」の場所 | |
| | − 登録した自宅の住所  | | ○ 自宅1km以内は   | |
| | − メールアドレス全文  | |   「自宅付近」のみ  | |
| |                     | | ○ 直近2日分だけ    | |
| +---------------------+ +------------------+ |
|   ↑ padding・font-size・本文色は完全に同一    |
|                                        20px  |
|  場所名への変換に利用する外部地図サービス以外に、|  .compareFoot
|  位置データを第三者に提供しません。             |  （確定文言・言い換え禁止）
|                                        64px  |
| +------------------------------------------+ |
| |            D3 粒度のぼかし変換図           | |
| +------------------------------------------+ |
+----------------------------------------------+
```

- **モバイル**: `.compare` 1カラム。「相手には見えません」→「相手に見えるのはこれだけ」の順（視線順）。**縮小・折りたたみ禁止**
- 項目数が7 vs 5 で非対称なため、`align-items: stretch` で**高さを揃える**（短い側に余白が入る形。これは許容。短い側を詰めて見せると「見える側が少ない」印象が強調されすぎるため、むしろ望ましい）
- `.compareFoot` の確定文言は **FAQ Q3・D1・D6 の3系統で同一文言**（設計書 §2-8）
- D3 は `max-width: 860px; margin: 64px auto 0`（§6-3）

---

### A5 使い方3ステップ（`bgBase` / `.section`）

**H2**: 使い方は3ステップ。位置情報日記が自動でできるまで

**使用コンポーネント**: `.sectionHead`／**D4**（3ステップ）／`.setupList`（初期設定3つ）／`StoreCta size="block"`

```
+----------------------------------------------+
|        H2（中央）                             |
|                                      40/56px |
| +----------+  +----------+  +----------+     |  D4（§6-4）
| |[アイコン] |  |[アイコン] |  |[アイコン] |     |
| | STEP 1   |  | STEP 2   |  | STEP 3   |     |
| | いつも通り|  | 夜のあいだ|  | 翌朝、やさ|     |
| | 過ごす    |  | に日記が  |  | しく届く  |     |
| | （本文）  |  | できる    |  | （本文）  |     |
| | +------+ |  | +------+ |  | +------+ |     |
| | | S7a  | |  | | S2   | |  | | S1   | |     |  .figSlot（contain）
| | +------+ |  | +------+ |  | +------+ |     |
| +----------+  +----------+  +----------+     |
|                                        64px  |
|  はじめにすることは、3つだけ（h3）             |
|  ① メールアドレスでログイン（パスワード不要）   |  .setupList
|  ② 位置情報の許可を「常に許可」にする          |
|  ③ 自宅の住所を登録する（任意）                |
|                                        48px  |
|           無料でダウンロード                  |  StoreCta size="block"
|       [App Store] [Google Play]              |
|   無料。相手に現在地が見えることはありません。   |
+----------------------------------------------+
```

```css
/* 初期設定3つ（番号付き） */
.setupList { list-style: none; margin: 0 auto; padding: 0; max-width: 720px; display: grid; gap: 20px; }
.setupItem { display: grid; grid-template-columns: 28px 1fr; gap: 14px; align-items: start; }
.setupNum {
  width: 28px; height: 28px; border-radius: var(--gd-r-pill);
  background: var(--gd-teal-ink); color: #fff;
  font-family: var(--gd-font-num); font-size: 14px; font-weight: 700;
  display: grid; place-items: center; line-height: 1; flex: none;
}
.setupTitle { font-size: 16px; font-weight: 700; line-height: 1.6; color: var(--gd-text); }
.setupBody  { margin-top: 4px; font-size: 14px; line-height: 1.8; color: var(--gd-text-sub); }
@media (min-width: 1024px) { .setupTitle { font-size: 17px; } .setupBody { font-size: 15px; } }
```

**画像スロット**: D4 内に S7a（`--gd-ar: 1/1`）／S2（`--gd-ar: 3/2`）／S1（`--gd-ar: 393/852`）
→ **比率が3種混在するため `.figSlot`（`contain`・`--gd-ar: 3/4` 固定）に収める**。切れない・歪まない・3枚の枠が揃う

**CTA**: `size="block"`（見出し＋48px バッジ＋マイクロコピー）

---

### A6 誰のため（`bgAlt` / `.sectionCompact`）

**H2**: カップル・夫婦の位置共有に、家族の見守りに ← **B にも同一文言のH2が必要**（§5-6）
**セクションリード**: 近い関係だからこそ、ちょうどいい距離で。

**使用コンポーネント**: `.sectionHead`／`.grid3` + `.forWhoCard`（3ブロック）

```
+----------------------------------------------+
|        H2（中央）／リード                      |
|                                      40/56px |
| +------------+ +------------+ +------------+ |
| | [アイコン]  | | [アイコン]  | | [アイコン]  | |
| | カップル・  | | 今まで使って| | 単身赴任・  | |
| | 夫婦の位置  | | いた位置共有| | 遠距離で離れ| |
| | 共有に      | | の代わりに  | | ている人と  | |
| | （本文）    | | （本文）    | | （本文）    | |
| +------------+ +------------+ +------------+ |
+----------------------------------------------+
```

```css
.forWhoCard {
  background: var(--gd-surface);
  border: 1px solid var(--gd-line);
  border-radius: var(--gd-r-lg);
  padding: 24px;
}
@media (min-width: 1024px) { .forWhoCard { padding: 28px; } }
.forWhoIcon { width: 32px; height: 32px; color: var(--gd-teal-ink); margin-bottom: 14px; }
```

- `.card` ではなく `.forWhoCard`（**hover なし・影なし**）。クリック対象でないため
- アイコンは線画32px（①2つの円が重なる＝関係性 ②矢印が別方向に向き直る＝乗り換え ③離れた2点を結ぶ線）
- `.sectionCompact`（48/64/80px）で、重めの A4・A5 の後に軽く挟む

---

### A7 社会的証明（`bgBase` / `.section`）

**H2**: 監視しない位置共有のための、プライバシー設計

**使用コンポーネント**: `.sectionHead`／`.trustGrid` + `.trustCard`（4枚・D7アイコン）／**D5**／`.quote` + `.policyLinks` + `.operator`／`.shot`（S3 / S5）

```
+----------------------------------------------+
|        H2（中央）                             |
|  「リアルタイムには共有しない」は、説明文だけの |  .lead
|   約束ではありません。…（§2-8 リード）         |
|                                      40/56px |
| +---------------------+ +------------------+ |
| |[D7-1] リアルタイム  | |[D7-2] 自宅の住所 | |  .trustGrid 2×2
| | 共有は、機能として  | | は、誰にも公開   | |  （M 1列）
| | 存在しません        | | されません       | |
| +---------------------+ +------------------+ |
| |[D7-3] 共有は承認制。| |[D7-4] 位置情報は | |
| | いつでも解除できます| | 残り続けません   | |
| +---------------------+ +------------------+ |
|                                        64px  |
| +------------------------------------------+ |
| |         D5 承認制・一方向の共有図          | |
| +------------------------------------------+ |
|                                        32px  |
|   +-------+   +-------+                      |
|   |  S3   |   |  S5   |                      |  .shotPhone 240/260px
|   +-------+   +-------+                      |  2枚横並び（M は縦積み）
|   閲覧権限画面  設定画面（.caption）           |
|                                        64px  |
| | " 本サービスには、リアルタイムの位置情報を   |  .quote
| |   第三者と共有する機能がありません          |
| |   Gentle Diary 利用規約 第7条3項            |
|                                        24px  |
|  プライバシーポリシー ／ 利用規約（.policyLinks）|
|                                        20px  |
|  提供: PitDock株式会社（代表取締役 小山 望海） |  .operator
|  ／ 会社概要                                  |
+----------------------------------------------+
```

```css
/* スクショ2枚並べ（A7 / B6） */
.shotPair { display: grid; grid-template-columns: 1fr; gap: 28px; justify-items: center; margin-top: 32px; }
@media (min-width: 768px) { .shotPair { grid-template-columns: repeat(2, auto); gap: 40px; } }
.shotPairItem { width: 240px; }
@media (min-width: 1024px) { .shotPairItem { width: 260px; } }
```

- **`.quote` と `.policyLinks` は必ず隣接**（24px）。設計書 §2-8「引用はリンクのすぐ近くに」
- `.quote` / `.policyLinks` / `.operator` は `max-width: 760px; margin-inline: auto`（左寄せテキスト）
- 信頼バッジのアイコンは §6-7（D7）。**勲章・認証風にしない**

---

### A8 FAQ（`bgAlt` / `.section`）

**H2**: よくあるご質問

**使用コンポーネント**: `.sectionHead`／`.faqList` + `<details class="faqItem">` ×6／`.faqSample`（Q2）

```
+----------------------------------------------+
|        H2（中央）                             |
|                                      40/56px |
| ──────────────────────────────────────────── |
| Q1 相手に現在地がバレることはありますか？   ＋ |  min-height 48px
| ──────────────────────────────────────────── |
| Q2 相手には、具体的に何が共有されるのですか？＋ |
| ──────────────────────────────────────────── |
| Q3 位置情報は外部に提供されたり…           ＋ |
| ──────────────────────────────────────────── |
| Q4 相手とおたがいに登録しないと使えませんか？＋ |
| ──────────────────────────────────────────── |
| Q5 料金はかかりますか？                    ＋ |
| ──────────────────────────────────────────── |
| Q6 位置情報の許可は、どう設定すればいいですか？＋|
| ──────────────────────────────────────────── |
+----------------------------------------------+
```

- `max-width: 760px; margin-inline: auto`
- **初期状態は全問閉**（`open` 属性を付けない）。`<details>` なので回答テキストは閉じていても DOM に存在する
- **Q2 の回答1文目**が `.microNote` 配置箇所③（全文版・ただし §3-4 の注記どおり通常本文スケールで記述）
- Q2 の日記サンプル4行は `.faqSample`（`.faqSampleRow` で時刻と場所を2カラム揃え）
- Q3 / Q4 に規約・ポリシーへのリンク（`.faqA a`）
- Q5 末尾「※アプリ内には広告が表示されます。」は**隠さない**（通常本文として記述。`.microNote` にしない＝事実の開示であり添え書きではない）

---

### A9 最終CTA（`.ctaBand`）

**H2**: 「今どこ？」を聞かない日常を、今日から

**使用コンポーネント**: `.ctaBand`／`.ctaAppIcon`／`.h2`／`.lead`／`StoreCta size="final"`

```
+==============================================+
|                                        88px  |  濃ティールのグラデーション
|              [アプリアイコン 64]               |  .ctaAppIcon
|                                        24px  |
|      「今どこ？」を聞かない日常を、今日から     |  .h2（白）
|                                        16px  |
|    （着地のリード・1〜2行）                    |  .lead（#EAF4F5）
|                                        32px  |
|            無料でダウンロード                 |  .ctaHeading 20/24px（白）
|        [App Store] [Google Play]             |  46/52px バッジ
|    無料。相手に現在地が見えることはありません。  |  .ctaNote（#EAF4F5）
|                                        88px  |
+==============================================+
|  LpProductFooter variant="teal"（#111827）    |  ← 隙間なく接続・スペーサー不要
+----------------------------------------------+
```

- `padding-block: 88px`（D `120px`）
- フォーカスリングは白（`--gd-focus-on-cta`）
- `.ctaBand` の直後に `LpProductFooter` が来る。**`margin` を入れない**（濃ティール→濃ネイビーで自然に沈む）
- 現行 `.footerSlot { margin-top: 64px }` は**削除**

---

## 5. パターンB の画面設計（B1〜B9）

### 5-0. A との差分の範囲（宣言）

> **B は A と、トークン（§2）・コンポーネント（§3）・図解の作図仕様（§6）・画像スロット仕様（§7）をすべて共有します。** 差分は次の3種に限定され、これ以外の差分を実装してはいけません（設計書 §1-3「配色・フォント・コンポーネント・デザイントークンは同一＝色違いABにしない」）。

| 差分の種類 | 具体 | デザイン上の扱い |
|---|---|---|
| **① セクション順序** | A: 共感→解決→何が見える→使い方→誰のため→社会的証明<br>B: 共感→**何が見える（前倒し）**→粒度→できる/できない→社会的証明→使い方 | `VariantB.tsx` の JSX 並び順のみ。背景面の交互（§3-1 の表）はこの順序に合わせて付け替える |
| **② ヒーロー要素** | B1 に `.chipRow`（ミニチップ3つ）が**追加**される／H1 に `.h1Pause` が**付く** | `.chipRow` と `.h1Pause` は §3 に定義済みの共通クラス。**B専用の新規クラスではない**（A が使わないだけ） |
| **③ リード文・コピー** | H1 / サブコピー / 各セクションのリード / CTAマイクロコピー / D2キャプション / 最終CTA見出し | テキストのみ。スタイルは同一 |
| **（＋B固有セクション）** | B5「できること／できないこと」（D8）／B6 内の D6・SEOキーワード帯／B7 内の代理設定ブロック（D9） | **使うコンポーネントはすべて §3 の共通クラス**（`.compare` / `.notice` / `.flow` 等）。B のためだけに新しいビジュアル言語を作らない |

**共通構造**

```
<div class="root">
  <header class="header">…</header>          ← A と完全に同一
  <main> B1 … B9 </main>
  <LpProductFooter variant="teal" … />        ← A と完全に同一・tagline 変更不要
  <LpImpression isoWeek variant="B" />
</div>
```

**CTA（StoreCta）の設置: 4箇所** — B1（`hero`）／B3（`block`）／B6（`inline`）／B9（`final`）
※ B7 は設計書 §1-2 のとおり**見出しなしテキストCTAに留めず、CTAを置かない**（総数を4に合わせるため。B7 に置くと5箇所になる）

---

### B1 ヒーロー（`bgBase` / `padding-block: 24px 64px` → D `40px 112px`）

**A1 との差分**: ①H1 に `.h1Pause`（必須） ②`.chipRow` 追加 ③テキスト

**モバイル（〜767px）**

```
+----------------------------------------------+
| 見守りたい。                                  |  .h1Line
|                                              |  ← 0.3em の「ため」（.h1Pause）
| でも、監視はしたくない。                       |  .h1Line .h1Pause
|  ↑「でも、」は 0.78em / --gd-text-sub         |
|                                        24px  |
| 子どものこと、離れて暮らす親のことは気になる。  |  .lead
| でも、居場所をいつでも見られる状態にしておく    |
| のは、やりすぎな気がする。Gentle Diary は、    |
| 現在地をリアルタイムに共有しません。届くのは、  |
| 1日の行動を自動でまとめた日記だけ。やりすぎ    |
| ない家族の見守りに。恋人や夫婦のあいだでも     |
| 使えます。                                    |
| ※日記といっても、書く必要はありません。        |  .microNote（A と同一文言）
|   時刻と場所のリストが自動でできます。          |
|                                        20px  |
| (現在地は見えません) (地図はありません)        |  .chipRow
| (1日1回の日記だけ)                            |  chipOff ×2 / chipOn ×1
|                                        32px  |
|          無料でダウンロード                   |  StoreCta size="hero"
|      [App Store] [Google Play]               |
|  無料。居場所を追いかけずに、1日の無事だけが    |  .ctaNote（Bの文言・3行想定）
|  わかります。見守る相手の端末にも登録が必要     |
|  ですが、あなたが代理で設定できます。           |
|                                        40px  |
|            +--------------+                  |
|            |   S1 画面     |                  |  .shotPhone（A と同一寸法）
|            +--------------+                  |
+----------------------------------------------+
```

**デスクトップ（1024px〜）**: A1 と同じ `.heroGrid`（`1fr 300px` / gap 72px）。`.chipRow` は `.lead`→`.microNote` の下、CTA の上に左寄せで入る。

**H1 の実装（必須・設計書 §2-4）**

```html
<h1 class="h1">
  <span class="h1Line">見守りたい。</span>
  <span class="h1Line h1Pause"><span class="h1Soft">でも、</span>監視はしたくない。</span>
</h1>
```

- **1行に流してはいけない。** 葛藤の構造（肯定／否定）が消える
- 「ため」は `margin-top: 0.3em`（H1 44px なら約13px、52px なら約16px）
- 「でも、」の弱化（0.78em・`--gd-text-sub`）は**否定が強く響きすぎないため**。肯定（1行目）と否定（2行目）の重さが釣り合う
- `@media (max-width: 359px) { .h1 { font-size: 24px } }` を必ず入れる（2行目が折り返すと構造が崩れる）

**`.ctaNote` が3行になる点**: B-CTA-1 のマイクロコピーは長い（約70字）。`max-width: 30em` で3行に収まる。`--gd-text-muted` の13pxなので主張を奪わない。**ここを太字や注意色にしない**（障壁の提示であり警告ではない）

---

### B2 共感（見守る側の罪悪感）（`bgAlt` / `.section`）【Bの中核】

**H2**: 見守りたい気持ちと、監視したくない気持ちのあいだで
**セクションリード**: 見守りたい気持ちと、監視したくない気持ちのあいだで。

**使用コンポーネント**: A2 と完全に同一（`.sectionHead` / `.grid3` + `.card` ×3 / `.cardFig` / **D2** / `.caption`）

```
+----------------------------------------------+
|        H2（中央）／リード                      |
| +------------+ +------------+ +------------+ |
| | 心配だから、| | でも、いつ | | 見るたびに、| |
| | 見られるよう| | でも見られ | | 少し後ろめ | |
| | にしておき | | る状態は、 | | たい       | |
| | たい       | | やりすぎな | |            | |
| | （本文）   | | 気がする   | | （本文）   | |
| | [イラスト] | | （本文）   | |            | |
| +------------+ +------------+ +------------+ |
| +------------------------------------------+ |
| |            D2 比較図（A と同一）           | |
| +------------------------------------------+ |
|  ずっと見ていなくても、見守ることはできる。     |  .caption（★B の文言）
+----------------------------------------------+
```

- **イラスト**: カード1に `2.png` のみ（設計書 §4-1「2.png は B2 でも流用可」）。**`1.png` は B では使わない**（見守り文脈に合わない＝設計書の指示）。カード2・3はイラストなし
- **D2 は A と同一の図**。キャプションのみ B 文言（「ずっと見ていなくても、見守ることはできる。」）

---

### B3 相手に何が見える？（`bgSoft` / `.section`）【最重要・フルサイズ】

**H2**: 相手に何が見える？ 見えるもの・見えないもの ← **A4 と一字一句同一**
**リード（B視点・設計書 §2-3-3 末尾）**: 「相手から何を奪わないのか」

**使用コンポーネント**: `.sectionHead`／**D1**（`.compare`・**フルサイズ**）／`.compareFoot`／`StoreCta size="block"`

```
+----------------------------------------------+
|        H2（中央・A4 と同一文言）               |
|  Gentle Diary が大事にしているのは、見守る側が  |  .lead（B視点リード）
|  安心できることと、見守られる側が自由でいられる |
|  ことを、同じ仕組みで両立させること…           |
|                                      40/56px |
| +---------------------+ +------------------+ |
| |  D1（A4 と完全に同一の項目・同一スタイル） | |
| |  max-width 920px → B では 1000px        | |
| +---------------------+ +------------------+ |
|                                        20px  |
|  場所名への変換に…第三者に提供しません。       |  .compareFoot（A と同一文言）
|                                        48px  |
|           無料でダウンロード                  |  StoreCta size="block"
|       [App Store] [Google Play]              |
|  無料。居場所を追いかけずに…（B の文言）        |
+----------------------------------------------+
```

- **「フルサイズ」の実装**: `.compare` の `max-width` を B3 でのみ `1000px` にする（`.compareWide` 修飾子）。**項目・文言・スタイル・配色は A4 と完全に同一**
  ```css
  .compareWide { max-width: 1000px; }
  ```
  → これはレイアウト幅の差であり、トークン・コンポーネントの差ではない（設計書 §1-3「図の中身は同一／リードと配置だけ変える」に合致）
- **D3 は B3 に置かない**（B では B4 に置く）。A4 は D1+D3 の2図、B3 は D1 のみ

---

### B4 届くもの（日記の粒度）（`bgBase` / `.section`）

**H2**: 届くのは、1日分の位置情報日記だけ ← **A3 の `<h3>` と同一文言**（§3-10-1 SEO偏り防止）

**使用コンポーネント**: `.sectionHead`／**D3**／`.shot .shotPlain`（S2）／`.microNote`／`.grainList`

```
+----------------------------------------------+
|        H2（中央）                             |
|                                      40/56px |
| +------------------------------------------+ |
| |         D3 粒度のぼかし変換図              | |  （A4 と同一の図）
| +------------------------------------------+ |
|                                        56px  |
|        +--------------------------+          |
|        |      S2 日記カード拡大     |          |  .shotPlain 3:2
|        +--------------------------+          |  max-width 520px
|  ※日記といっても、文章を書く必要はありません。  |  .microNote 配置箇所②
|   1日の行動が「時刻と場所」のリストに自動で     |  （A3 と同一文言・同一位置）
|   まとめられます。                             |
|                                        40px  |
|  ・自宅から約1km以内はすべて「自宅付近」        |  .grainList
|  ・同じ場所にいる間は、行が増えません           |
|  ・時刻は20分単位のおおよその表記（12:20頃）    |
+----------------------------------------------+
```

- **CTAなし**（設計書 §1-2 B4）
- `.microNote` は A3 と**同一文言・同一位置（S2直下）・同一スタイル**

---

### B5 できること／できないこと（`bgAlt` / `.section`）【Bのみ・必須】

**H2**: Gentle Diary でできること、できないこと
**リード**: 見守りに使うものだからこそ、できないこともはっきりお伝えします。

**使用コンポーネント**: `.sectionHead`／**D8**（`.compare` + `.compareD8` 修飾子）／`.anchorLink`／`.compareFoot`（締めの文）

```
+----------------------------------------------+
|        H2（中央）／リード                      |
|                                      40/56px |
| +---------------------+ +------------------+ |
| | [チェック]           | | [横棒]            | |
| | できること           | | できないこと       | |
| | ------------------- | | ------------------ | |
| | ○ 1日の日記が翌朝に | | − 今どこにいるかを | |
| |   届きます          | |   リアルタイムに   | |
| | ○ その日の節目が    | |   確認すること     | |
| |   わかります        | | − 地図の上で居場所 | |
| | ○ 自宅圏内は        | |   を見ること       | |
| |   「自宅付近」だけ   | | − 「着いたら知らせ | |
| | ○ 承認制・一方向・  | |   る」通知機能     | |
| |   いつでも解除      | | − SOS・緊急通報など| |
| | ○ 相手が慣れて      | |   防犯・緊急対応の | |
| |   いなければ代理で  | |   機能             | |
| |   設定できます      | | − 相手に知られずに | |
| |   (設定のしかた →)  | |   見ること         | |
| +---------------------+ +------------------+ |
|   ↑ padding・font-size・本文色は完全に同一    |
|   ↑ 左右どちらも白サーフェス＋1.5px枠         |
|                                        20px  |
|  そのため、「今すぐ無事を確認したい」「緊急の   |  .compareFoot
|  ときに知らせてほしい」という目的には向いて     |  （この文言は削らない）
|  いません。Gentle Diary は、毎日の「変わり     |
|  なかった」を、おたがいに無理のない形で知る     |
|  ためのアプリです。急を要する場面では、電話や   |
|  自治体・事業者の緊急通報サービスをご利用       |
|  ください。                                   |
+----------------------------------------------+
```

**D8 を D1 と視覚的に明確に分ける（設計書 §4-3 D8 の必須要件）**

| | D1（A4 / B3） | D8（B5） |
|---|---|---|
| カラムの地 | **塗り分け**（`--gd-neutral-soft` / `--gd-teal-soft`） | **白サーフェス**（`--gd-surface`）＋**1.5px 枠線** |
| 上端アクセントバー | あり（4px） | **なし** |
| 見出しの装飾 | アイコン＋下罫線 | **ピル型チップ**（`.compareHeadChip`）＋下罫線 |
| 項目アイコン | 左: 目に斜線 ／ 右: ノート | 左: 丸にチェック ／ 右: **丸に横棒（−）** |
| 置かれる面 | `bgSoft`（ティール寄りの面） | `bgAlt` |

```css
/* D8 修飾子: D1 と混同させないための別デザイン */
.compareD8 .compareCol {
  background: var(--gd-surface);
  border: 1.5px solid var(--gd-line);
}
.compareD8 .compareCol::before { display: none; }           /* 上端バーなし */
.compareD8 .compareColNeutral { border-color: var(--gd-neutral-line); }
.compareD8 .compareColBrand   { border-color: rgba(31, 111, 121, 0.45); }

/* 見出しをピル型チップに */
.compareHeadChip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: var(--gd-r-pill);
  font-size: 15px; font-weight: 700; line-height: 1.5;
  color: var(--gd-text);
}
.compareD8 .compareColBrand   .compareHeadChip { background: var(--gd-teal-soft); }
.compareD8 .compareColNeutral .compareHeadChip { background: var(--gd-neutral-soft); }
@media (min-width: 1024px) { .compareHeadChip { font-size: 16px; } }
```

**守るべき制約（設計書 §2-3-4 / §5「web-designer へ」）**

- **「できないこと」側を縮小・折りたたみ・エラー色にしない**（§3-8 の禁止事項が全て適用される）
- 「できないこと」のアイコンは**赤い✕ではなく、中立色の丸＋横棒（−）**。禁止マーク・警告記号に見せない
- 両カラムの枠線の太さ・padding・文字サイズ・本文色を**完全に同一**にする
- 「できること」5項目目に `.anchorLink`（「設定のしかた」→ `#proxy-setup`）
- `.compareFoot` の締めの文は**削らない**。`max-width: 760px`・左寄せ・15px

---

### B6 プライバシー設計（`bgBase` / `.section`）

**このセクションは2つの `<h2>` を持つ**（SEOキーワード帯＋本体）。

**使用コンポーネント**: `.kwBand`／`.trustGrid` + `.trustCard` ×4／**D5**／**D6**／`.quote` + `.policyLinks` + `.operator`／`.shotPair`（S3 / S5 / S8）／`StoreCta size="inline"`

```
+----------------------------------------------+
| +------------------------------------------+ |
| | h2 カップル・夫婦の位置共有に、           | |  .kwBand（SEOキーワード帯）
| |    家族の見守りに                        | |  ← A6 の H2 と一字一句同一
| |                                          | |
| |  （本文3行・全角110〜135字）              | |  max-width 760px
| +------------------------------------------+ |
|                                        64px  |
|        h2 監視しない位置共有のための、        |  .sectionHead
|           プライバシー設計                    |
|  「リアルタイムには共有しない」は…（.lead）    |
|                                      40/56px |
| +----------+ +----------+                    |
| | trust 1  | | trust 2  |                    |  .trustGrid 2×2
| +----------+ +----------+                    |  （A7 と同一）
| | trust 3  | | trust 4  |                    |
| +----------+ +----------+                    |
|                                        64px  |
| +------------------------------------------+ |
| |   D5 承認制・一方向（★B では注記付き）     | |
| +------------------------------------------+ |
|                                        32px  |
|   +-------+  +-------+  +-------+            |
|   |  S3   |  |  S5   |  |  S8   |            |  .shotPair（3枚）
|   +-------+  +-------+  +-------+            |
|                                        56px  |
| +------------------------------------------+ |
| |  D6 データのライフサイクル（コンパクト帯）  | |  ★Bのみ
| |  見出し: 見守られる側のデータも、          | |
| |          溜まり続けません                 | |
| +------------------------------------------+ |
|                                        56px  |
| | " 本サービスには…機能がありません          |  .quote（A7 と同一）
| |   Gentle Diary 利用規約 第7条3項            |
|  プライバシーポリシー ／ 利用規約             |  .policyLinks
|  提供: PitDock株式会社（代表取締役 小山 望海） |  .operator
|                                        48px  |
|        [App Store] [Google Play]             |  StoreCta size="inline"
+----------------------------------------------+
```

**SEOキーワード帯（`.kwBand`）の寸法確定（§0-2 Q-D の回答）**

```css
.kwBand {
  max-width: 760px; margin: 0 auto 64px;
  padding: 28px 24px;
  background: var(--gd-surface);
  border: 1px solid var(--gd-line);
  border-radius: var(--gd-r-lg);
  text-align: center;
}
@media (min-width: 1024px) { .kwBand { padding: 32px 40px; margin-bottom: 80px; } }
.kwBandH2   { font-size: 20px; font-weight: 700; line-height: 1.5; color: var(--gd-text); }
.kwBandBody { margin-top: 14px; font-size: 15px; line-height: 1.85; color: var(--gd-text-sub); }
@media (min-width: 1024px) { .kwBandH2 { font-size: 24px; } .kwBandBody { font-size: 16px; } }
```

> **corporate-engagement-specialist への本文依頼仕様**: `max-width: 760px` / 本文 15px（D 16px）/ `line-height 1.85` → **1行あたり全角約38字（D 約44字）**、**3行で全角 110〜135字**。見出しは `<h2>`「カップル・夫婦の位置共有に、家族の見守りに」で **A6 と一字一句同一**（変更不可）。本文は見守り主軸の文脈で書く。

**D6 の「コンパクト帯」としての扱い**: フル幅の図ではなく、`max-width: 920px` の横1列フロー（M は縦積み）。見出しは `<h3>`「見守られる側のデータも、溜まり続けません」（§6-6）

**D5 の B 追加要素**: 相手側アイコンに「相手の端末にもアプリの登録が必要」の注記と、`#proxy-setup`（B7）へのアンカー（§6-5）

---

### B7 使い方3ステップ（`bgAlt` / `.section`）

**H2**: 使い方は3ステップ。位置情報日記が自動でできるまで ← **A5 と一字一句同一**

**使用コンポーネント**: `.sectionHead`／**D4**／`.setupList`／**`.proxyBlock`**（代理設定ブロック・Bのみ）／**D9**／`.notice`／`.supplement`

```
+----------------------------------------------+
|        H2（中央・A5 と同一）                   |
| +----------+ +----------+ +----------+        |
| |  D4（A5 と同一の3ステップ図）         |      |
| +----------+ +----------+ +----------+        |
|                                        64px  |
|  はじめにすることは、3つだけ（h3）             |
|  ① ② ③（.setupList・A5 と同一本文）           |
|                                        64px  |
| +==========================================+ |
| | id="proxy-setup"                         | |  .proxyBlock
| |                                          | |
| | h3 相手がスマホに詳しくなくても、          | |  ★前向きな見出し
| |    あなたが代理で設定できます              | |
| |                                          | |
| | Gentle Diary の日記は、それぞれの端末で   | |  .body
| | 記録された位置情報から作られます。…        | |
| |                                          | |
| | +--------------------------------------+ | |
| | |      D9 代理設定フロー図（4ステップ）  | | |  ★同ブロック内
| | |                                      | | |
| | |  ┌ 注意（アンバー・.notice）─────┐   | | |  ★D9 図内の注意
| | |  | ⚠ あなた自身のアカウントで     |   | | |
| | |  |   相手の端末にログインしないで |   | | |
| | |  |   ください。…                  |   | | |
| | |  └──────────────────────────────┘   | | |
| | +--------------------------------------+ | |
| |                                          | |
| | 設定が終われば、あとは自動です。…          | |  .body
| +==========================================+ |
|                                        32px  |
| | STEP 1 の補足（.supplement）              |  ★追加ブロック②
| | 位置情報は、高精度のGPSを常にオンにする   |
| | 方式ではなく、一定の距離を移動したときだけ |
| | 記録する方式です。                        |
+----------------------------------------------+
```

```css
/* 代理設定ブロック（Bのみ使用・ただしクラスは共通CSSに置く） */
.proxyBlock {
  max-width: 920px; margin: 0 auto;
  background: var(--gd-surface);
  border: 1px solid var(--gd-line);
  border-radius: var(--gd-r-xl);
  padding: 28px 24px;
}
@media (min-width: 1024px) { .proxyBlock { padding: 40px; } }
.proxyBlockH3   { font-size: 19px; font-weight: 700; line-height: 1.6; color: var(--gd-text); }
.proxyBlockBody { margin-top: 12px; font-size: 15px; line-height: 1.85; color: var(--gd-text-sub); }
@media (min-width: 1024px) { .proxyBlockH3 { font-size: 22px; } .proxyBlockBody { font-size: 16px; } }

/* STEP 1 の補足（追加ブロック②）。注意ではないのでアンバーにしない */
.supplement {
  max-width: 920px; margin: 32px auto 0;
  padding: 16px 20px;
  background: var(--gd-surface-2);
  border-left: 3px solid var(--gd-line-strong);
  border-radius: 0 var(--gd-r-md) var(--gd-r-md) 0;
  font-size: 14px; line-height: 1.8; color: var(--gd-text-sub);
}
```

**守るべき構成（設計書 §2-7 末尾の指示）**

1. **見出しは前向きな一文**（「相手がスマホに詳しくなくても、あなたが代理で設定できます」）。`.proxyBlockH3`（19/22px）
2. **⚠注意は同じブロック内の囲み**（`.notice`）。**別セクションに切り出さない**
3. **注意を小さくしすぎない**: `.noticeTitle` 15/16px（見出し 19/22px より1段弱い）／本文 14/15px（ブロック本文と同等）
4. **折りたたまない**（`<details>` に入れない）
5. 注意の色は**アンバー＋枠線＋アイコン＋「注意」ラベル**。**赤は使わない**
6. `.proxyBlock` に `id="proxy-setup"`（B5 の `.anchorLink` のリンク先）
7. **CTAを置かない**（CTA総数4を守る）

---

### B8 FAQ（`bgBase` / `.section`）

**A8 と完全に同一**（H2「よくあるご質問」・6問・文言・順序・`.faqSample`・リンク・初期全閉）。背景面のみ `bgBase`（A8 は `bgAlt`）。

> 背景面が違うのは §3-1 の交互パターンの帰結であり、`.faqList` 以下のスタイルは同一。`.faqQText`（`--gd-text`）は `bgBase`（15.0:1）・`bgAlt`（14.6:1）どちらでも AAA。

---

### B9 最終CTA（`.ctaBand`）

**H2**: やりすぎない見守りを、今日から

A9 と**構造・寸法・配色すべて同一**。異なるのは H2 文言・リード文・`.ctaNote`（B-CTA-1 のマイクロコピー）のみ。

```
+==============================================+
|              [アプリアイコン 64]               |
|      やりすぎない見守りを、今日から            |  .h2（白）
|    （着地のリード・1〜2行）                    |  .lead（#EAF4F5）
|            無料でダウンロード                 |  .ctaHeading（白）
|        [App Store] [Google Play]             |
|  無料。居場所を追いかけずに、1日の無事だけが    |  .ctaNote（#EAF4F5）
|  わかります。見守る相手の端末にも登録が必要     |
|  ですが、あなたが代理で設定できます。           |
+==============================================+
```

---

### 5-7. A/B 対応表（builder 検証用）

| | A | B | 共有しているもの |
|---|---|---|---|
| トークン | `.root` の `--gd-*` | 同一 | **100%共通（上書き禁止）** |
| ヘッダー | `.header`（CTAなし） | 同一 | 100%共通 |
| フッター | `LpProductFooter variant="teal"` | 同一 | 100%共通（tagline 変更なし） |
| H1 | `.h1` + `.h1Line`×2 | `.h1` + `.h1Line` + `.h1Pause` | クラスは共通。B のみ `.h1Pause` を使用 |
| ヒーローチップ | 使わない | `.chipRow` | クラスは共通CSSに定義 |
| D1 | A4（`.compare`） | B3（`.compare .compareWide`） | 項目・文言・配色 100%同一。幅のみ差 |
| D2 | A2 | B2 | 図 100%同一。キャプションのみ差 |
| D3 | A4（D1の下） | B4 | 100%同一 |
| D4 | A5 | B7 | 100%同一 |
| D5 | A7 | B6（＋相手側の注記・D9アンカー） | 図 100%同一。B のみ注記追加 |
| D6 | 使わない | B6 | — |
| D7（アイコン4） | A7 | B6 | 100%同一 |
| D8 | 使わない | B5 | — |
| D9 | 使わない | B7 | — |
| `.microNote` | FV / A3（S2下） / FAQ Q2 | FV / B4（S2下） / FAQ Q2 | **文言・配置・スタイル 100%同一** |
| FAQ | `.faqList` 6問 | 同一 | 100%共通 |
| `.quote` + `.policyLinks` | A7 | B6 | 100%共通 |
| CTA箇所 | A1 / A3 / A5 / A9 | B1 / B3 / B6 / B9 | **4箇所・同一コンポーネント** |
| 「位置情報日記」を含む見出し | A3 の `<h3>` ＋ A5 の `<h2>` = 2 | B4 の `<h2>` ＋ B7 の `<h2>` = 2 | **同数（SEO偏り防止）** |
| 「カップル・夫婦の位置共有に、家族の見守りに」 | A6 の `<h2>` | B6 の `.kwBandH2`（`<h2>`） | **一字一句同一** |

---

## 6. 図解 D1〜D9 の作図仕様

### 6-0. 実装方法の推奨（builder 向け・全図共通）

**すべて HTML + CSS で実装する。インラインSVGはアイコン・矢印グリフのみ。画像書き出し（PNG/SVGファイル）はしない。**

| 理由 | 詳細 |
|---|---|
| ①文字が読める | 図内の文字量が多い（D1 は12項目、D8 は10項目）。SVG を幅100%で縮めると 360px 幅で文字が 6〜7px になり読めない。HTML なら折り返して読める |
| ②スクリーンリーダーが読める | `alt` の1文（§2-12）では D1 の12項目を伝えられない。HTML なら `<ul>` としてそのまま読まれる |
| ③SEOキーワードがHTMLに乗る | 設計書 §3-10 は「指定5キーワードを A・B 両方のHTMLに存在させる」が前提。画像では `alt` しか乗らない |
| ④コピー修正が容易 | 「10日」等の値が変わったとき（設計書 §3-11 の保守注意）、JSX 1行の修正で済む |
| ⑤素材調達の依存を減らす | 作図アセットの入稿待ちが発生しない |
| ⑥明面前提で完結 | ダークモード対応の心配がない（LPは常に明面） |

**アイコンのインラインSVG共通仕様**

```
viewBox         : 0 0 24 24
fill            : none
stroke          : currentColor      ← 親の color を継承させる（.compareItemIcon 等）
stroke-width    : 1.75
stroke-linecap  : round
stroke-linejoin : round
aria-hidden     : true              ← 意味はテキストが担保するため常に隠す
focusable       : false
```

**全図共通の作図ルール（設計書 §4-3 共通ルール）**

- 「追跡」「監視」は**否定文脈のみ**（「リアルタイム追跡はしません」は可）
- 他社サービス名・ロゴ・それを示唆するアイコンを**一切使わない**
- **数字（DL数・評価・ユーザー数・満足度%）を一切使わない**。使ってよい数値は「20分単位」「約1km」「直近2日分」「取得から10日後」「深夜3時」のみ（実装事実）
- **防犯・緊急対応を示唆するビジュアル禁止**（警察・救急・SOS・警報・サイレン・盾・鎧・防壁）
- **不安を煽るビジュアル禁止**（赤い警告・監視カメラ・目のモチーフの大きな使用）
- 図内の文字は**「日記」で統一**（「行動の要約」は使わない）
- 人物は**年齢非特定のシルエット**（円頭＋肩のみ）。制服・ランドセル・性別記号を描かない

**図のラッパー共通クラス**

```css
.figure { margin: 0; max-width: 920px; margin-inline: auto; }
.figureWide { max-width: 1000px; }
.figTitle {                                  /* 図に見出しが必要なとき */
  font-size: 17px; font-weight: 700; line-height: 1.6;
  color: var(--gd-text); text-align: center; margin-bottom: 20px;
}
.caption { margin-top: 16px; font-size: 13px; line-height: 1.7; color: var(--gd-text-muted); text-align: center; }
```

---

### 6-1. D1 見える／見えない 対比図 【最優先】

**使用箇所**: A4（D3 と並ぶ）／B3（フルサイズ・`.compareWide`）
**実装**: §3-8 `.compare`（HTML+CSS）

**構図**

```
デスクトップ（768px〜）: 2カラム横並び・gap 20/24px・高さ揃え
+-------------------------------+  +-------------------------------+
|▔▔▔▔ 4px bar: neutral-line ▔▔|  |▔▔▔▔ 4px bar: --gd-teal ▔▔▔▔|
| [目に斜線 22px] 相手には        |  | [ノート 22px] 相手に見える     |
|                 見えません      |  |               のはこれだけ    |
|───────────────────────────────|  |───────────────────────────────|
| (−) 今いる場所（現在地）        |  | (○) 1日1回つくられる日記       |
| (−) 地図上の位置               |  | (○) 20分単位のおおよその時刻   |
| (−) リアルタイムの移動          |  |     （「12:20頃」）            |
| (−) 正確な緯度・経度            |  | (○)「〇〇周辺」という粒度の場所 |
| (−) 分単位の正確な時刻          |  | (○) 自宅から約1km以内は        |
| (−) 登録した自宅の住所          |  |     「自宅付近」のみ            |
| (−) メールアドレスの全文        |  | (○) 閲覧できるのは直近2日分    |
+-------------------------------+  +-------------------------------+
   背景 --gd-neutral-soft              背景 --gd-teal-soft

モバイル（〜767px）: 縦積み（上=見えません／下=見えるのはこれだけ）
※ padding・font-size・本文色は横並び時と完全に同一。縮小も折りたたみもしない
```

**寸法**

| 項目 | モバイル | デスクトップ |
|---|---|---|
| ラッパー幅 | `100%` | `max-width: 920px`（B3 は `1000px`） |
| カラム padding | `24px 20px` | `32px 28px` |
| カラム gap | `16px` | `20px`（1024+: `24px`） |
| 角丸 | `24px`（`--gd-r-lg`） | 同 |
| 見出し | 16px / 700 / `--gd-text` | 17px |
| 見出しアイコン | 22px | 22px |
| 項目 | 15px / `--gd-text` | 16px |
| 項目アイコン | 20px（`margin-top: 4px`） | 20px |
| 項目 gap | 14px | 14px |
| 上端バー | 4px | 4px |

**配色（原則2: 完全な同一重み）**

| 要素 | 左（見えない） | 右（見える） |
|---|---|---|
| 背景 | `--gd-neutral-soft` #E7ECEE | `--gd-teal-soft` #DCEEF0 |
| 上端バー | `--gd-neutral-line` #C9D3D6 | `--gd-teal` #4AA6B1 |
| 見出し文字 | **`--gd-text` #16232A**（同一） | **`--gd-text` #16232A**（同一） |
| 見出し下罫線 | `--gd-neutral-line` | `rgba(31,111,121,.28)` |
| 見出しアイコン | `--gd-neutral-ink` #4F5B62 | `--gd-teal-ink` #1F6F79 |
| 項目文字 | **`--gd-text`（13.5:1）** | **`--gd-text`（13.4:1）** |
| 項目アイコン | `--gd-neutral-ink` | `--gd-teal-ink` |

**アイコングリフ**

| 用途 | グリフ（24×24 viewBox） |
|---|---|
| 見出し左「見えません」 | **目に斜線**: 標準の eye-off（アーモンド形の輪郭＋中央の円＋左下から右上への斜線）。**20〜22px まで**。大きく使わない |
| 見出し右「見えるのはこれだけ」 | **ノート**: 角丸長方形＋左に綴じ線＋中に2本の横線 |
| 項目 左 | **丸に横棒**: `<circle cx=12 cy=12 r=9/>` + `<line x1=8 y1=12 x2=16 y2=12/>`。**✕ではない。赤でもない** |
| 項目 右 | **丸にチェック**: `<circle cx=12 cy=12 r=9/>` + `<polyline points="8.5,12.2 11,14.7 15.5,9.8"/>` |

**図の下（`.compareFoot`）**

> 場所名への変換に利用する外部地図サービス以外に、位置データを第三者に提供しません。

**言い換え禁止**（FAQ Q3・社会的証明セクション・D6 と同一文言）。`max-width: 920px` / 中央寄せ / 14px / `--gd-text-sub` / `margin-top: 20px`

**レスポンシブ時の組み替え**: 横並び → 縦積みのみ。**順序は変えない**（左=見えない が先）。縦積み時に「見えない側」を閉じる・縮める実装は禁止。

**A11y**: 各カラムを `<div>` + `<p class="compareHead">` + `<ul class="compareList">`。見出しを `<h3>` にしてもよいが、A4/B3 の `<h2>` 直下なので階層は `h2 → h3` が正しい。`<h3>` を使う場合は**両カラム同格**にする。

---

### 6-2. D2 常時共有 vs 1日1回 比較図

**使用箇所**: A2 / B2（図は同一・キャプションのみ A/B で異なる）
**実装**: HTML+CSS（絶対配置のドット＋時刻目盛り）

**構図**

```
デスクトップ
+------------------------------------------------------------+
| 常に見せ合う位置共有                       ずっと見えている  |  .trackLabel
| ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●  |  隙間なく連続（淡いグレー）
|                                                            |
| Gentle Diary                                  夜にまとめて1通|
| ──────────────────────────────────────────────────────[日記]|  1本のレール＋右端に日記アイコン
|                                                            |
| 0        6         12        18        24                  |  .trackAxis（Inter・tabular-nums）
+------------------------------------------------------------+

モバイル（〜767px）: 2トラックを縦に積む。各トラックの上にラベル、下に目盛り
+--------------------------------+
| 常に見せ合う位置共有            |
| ●●●●●●●●●●●●●●●●●●●●●●●●●●●  |
| 0    6    12   18   24         |
| → ずっと見えている             |
|                                |
| Gentle Diary                   |
| ────────────────────────[日記] |
| 0    6    12   18   24         |
| → 夜にまとめて1通              |
+--------------------------------+
```

```css
.d2 { max-width: 860px; margin-inline: auto; }
.d2Track { position: relative; padding: 20px 0; }
.d2TrackLabel { font-size: 14px; font-weight: 700; color: var(--gd-text); margin-bottom: 12px; }
.d2Rail { position: relative; height: 10px; border-radius: 5px; }

/* 上段: 常時共有（淡いグレー・点が隙間なく連続） */
.d2RailDense {
  background: repeating-linear-gradient(90deg,
    var(--gd-neutral-ink) 0 3px, transparent 3px 7px);
  opacity: 0.55;
}
/* 下段: Gentle Diary（ティールの1本レール） */
.d2RailSingle { background: var(--gd-teal-soft); border: 1px solid var(--gd-teal); height: 4px; border-radius: 2px; margin-block: 3px; }
.d2Diary {
  position: absolute; right: 0; top: 50%; transform: translate(0, -50%);
  width: 32px; height: 32px; border-radius: 10px;
  background: var(--gd-teal-ink); color: #fff;
  display: grid; place-items: center;
}
.d2Note { margin-top: 10px; font-size: 13px; color: var(--gd-text-muted); }
.d2Axis {
  display: flex; justify-content: space-between; margin-top: 10px;
  font-family: var(--gd-font-num); font-variant-numeric: tabular-nums;
  font-size: 12px; color: var(--gd-text-muted);
}
@media (min-width: 768px) {
  .d2Note { position: absolute; right: 0; top: 0; margin-top: 0; }
  .d2Axis { margin-top: 16px; }     /* 2トラック共通で1本だけ表示 */
}
```

- 上段は**彩度を落としたグレー**。「常時共有＝悪」と断じる赤系は使わない（他社批判に見せない）
- 下段の日記アイコンは `--gd-teal-ink` 塗り＋白グリフ（32px）
- 0〜24 の目盛りは `0 / 6 / 12 / 18 / 24`。**デスクトップでは2トラックの下に1本だけ**
- **キャプション（`.caption`）は A/B で異なる**: A「ずっと見える必要は、たぶんなかった。」／B「ずっと見ていなくても、見守ることはできる。」

---

### 6-3. D3 粒度のぼかし変換図

**使用箇所**: A4（D1 の下）／B4（セクション主役）
**実装**: HTML+CSS（3段フロー＋分岐）

**構図**

```
デスクトップ（768px〜）: 横3段
+-----------+       +-----------+       +-----------+
| ① 生データ |  ──▶  | ② 丸め    |  ──▶  | ③ 場所名   |
|           |20分単位に|          |建物名＋  |           |
| 35.6586,  |丸める  | 12:40頃   |「周辺」に| 〇〇タワー |
| 139.7454  |       |           |変換    |   周辺     |
| 12:34:07  |       |           |       |           |
+-----------+       +-----------+       +-----------+
  （グレー）          （グレー）           ★枠線で囲む
                                        「相手に届くのは
                                          これだけ」
            +------------------------------------+
            | 分岐: 自宅から1km以内 →「自宅付近」 |
            +------------------------------------+

モバイル（〜767px）: 縦3段。矢印を90度回転
+-----------+
| ① 生データ |
+-----------+
      ▼  20分単位に丸める
+-----------+
| ② 12:40頃 |
+-----------+
      ▼  建物名＋「周辺」に変換
+-----------+
| ③ 〇〇タワー周辺 |  ★枠線＋「相手に届くのはこれだけ」
+-----------+
+-----------+
| 分岐: 自宅1km以内 →「自宅付近」 |
+-----------+
```

```css
.flow { display: grid; grid-template-columns: 1fr; gap: 0; max-width: 860px; margin-inline: auto; }
@media (min-width: 768px) {
  .flow { grid-auto-flow: column; grid-auto-columns: 1fr; align-items: stretch; }
}
.flowStep {
  background: var(--gd-neutral-soft);
  border-radius: var(--gd-r-md);
  padding: 20px 18px; text-align: center;
}
.flowStepFinal {                        /* ③ だけ枠線で強調 */
  background: var(--gd-teal-soft);
  border: 2px solid var(--gd-teal-ink);
}
.flowStepLabel { font-family: var(--gd-font-num); font-size: 12px; font-weight: 700; color: var(--gd-text-muted); letter-spacing: 0.06em; }
.flowStepValue { margin-top: 8px; font-family: var(--gd-font-num); font-variant-numeric: tabular-nums; font-size: 15px; font-weight: 600; line-height: 1.6; color: var(--gd-text); word-break: break-all; }
.flowStepNote  { margin-top: 6px; font-size: 13px; color: var(--gd-text-sub); }

/* 矢印: モバイルは下向き、デスクトップは右向き */
.flowArrow {
  display: grid; place-items: center; gap: 4px;
  padding: 14px 0;
  font-size: 12px; line-height: 1.5; color: var(--gd-text-muted); text-align: center;
}
.flowArrowIcon { width: 20px; height: 20px; color: var(--gd-teal-ink); transform: rotate(90deg); }
@media (min-width: 768px) {
  .flowArrow { padding: 0 10px; }
  .flowArrowIcon { transform: none; }
}

/* 分岐（自宅1km） */
.flowBranch {
  margin-top: 20px; padding: 16px 20px;
  background: var(--gd-surface); border: 1px dashed var(--gd-line-strong);
  border-radius: var(--gd-r-md);
  font-size: 14px; line-height: 1.8; color: var(--gd-text);
  text-align: center;
}
```

- ①②はグレー（内部処理）、③だけ `--gd-teal-soft` + 2px ティール枠（**相手に届くのはこれだけ**）
- ③の枠の下に `.flowStepNote`「相手に届くのはこれだけ」
- 座標の例示値（`35.6586, 139.7454`）は**実在しない地点を指すダミー**であることを確認（東京駅周辺の一般的な例示値。特定個人の居所ではないので可）
- `--gd-font-num` + `tabular-nums` で数値を等幅に

---

### 6-4. D4 3ステップ図

**使用箇所**: A5 / B7（完全同一）
**実装**: HTML+CSS 3カラムグリッド

```
デスクトップ（1024px〜）: 3カラム
+-------------+  +-------------+  +-------------+
| [アイコン36] |  | [アイコン36] |  | [アイコン36] |
| STEP 1      |  | STEP 2      |  | STEP 3      |
| いつも通り、 |  | 夜のあいだに、|  | 翌朝、やさしく|
| 過ごす      |  | 1日が「日記」|  | 届く        |
|             |  | になる      |  |             |
| （本文）     |  | （本文）     |  | （本文）     |
| +---------+ |  | +---------+ |  | +---------+ |
| |  S7a    | |  | |   S2    | |  | |   S1    | |  .figSlot（3/4・contain）
| +---------+ |  | +---------+ |  | +---------+ |
+-------------+  +-------------+  +-------------+

タブレット（768-1023px）: 2カラム（3枚目は下段左）
モバイル（〜767px）: 1カラム縦積み
```

```css
.steps3 { display: grid; grid-template-columns: 1fr; gap: 20px; max-width: 920px; margin-inline: auto; }
@media (min-width: 768px)  { .steps3 { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
@media (min-width: 1024px) { .steps3 { grid-template-columns: repeat(3, 1fr); } }

.step3Card {
  background: var(--gd-surface); border: 1px solid var(--gd-line);
  border-radius: var(--gd-r-lg); padding: 24px;
  display: flex; flex-direction: column;
}
@media (min-width: 1024px) { .step3Card { padding: 28px; } }
.step3Icon  { width: 36px; height: 36px; color: var(--gd-teal-ink); }
.step3Label { margin-top: 14px; font-family: var(--gd-font-num); font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--gd-teal-ink); }
.step3Title { margin-top: 6px; font-size: 17px; font-weight: 700; line-height: 1.6; color: var(--gd-text); }
.step3Body  { margin-top: 8px; font-size: 14px; line-height: 1.85; color: var(--gd-text-sub); }
.step3Shot  { margin-top: 20px; }
@media (min-width: 1024px) { .step3Title { font-size: 18px; } .step3Body { font-size: 15px; } }
```

**アイコングリフ（線画36px・`--gd-teal-ink`）**

| STEP | グリフ | 禁止 |
|---|---|---|
| 1 いつも通り過ごす | **ポケットに入ったスマホ**（角丸長方形のスマホ＋その周囲を囲む布のライン）／または**スマホ＋閉じた画面（斜線なしの無地画面）** | GPS電波・アンテナ波紋（常時追跡の示唆） |
| 2 夜のあいだに日記ができる | **三日月＋小さな時計（3時）** | 砂時計の焦燥感演出 |
| 3 翌朝やさしく届く | **封筒を開いた形＋中に横線2本（日記）** ／または**朝日＋ノート** | ベル・通知バッジ（プッシュ通知は無いため誤認を招く） |

**画像スロット**: S7a（1:1）／S2（3:2）／S1（393:852）→ **比率3種が混在するため `.figSlot`（`--gd-ar: 3/4`・`object-fit: contain`）で統一**。枠が3つ揃い、画像は切れない

---

### 6-5. D5 承認制・一方向の共有図 【最優先】

**使用箇所**: A7 / B6（B のみ相手側に注記＋D9アンカーを追加）
**実装**: HTML+CSS（3カラムグリッド: 人物／矢印2本／人物）

**構図**

```
デスクトップ（768px〜）
+-----------+                                        +-----------+
|  [人物]    |   ───▶ 相手が申請し、あなたが承認した   |  [人物]    |
|  あなた    |        ときだけ、あなたが相手の日記を   |   相手     |
|           |        見られます                      |           |
|           |        (鍵＋承認) (いつでも解除)        | ★Bのみ:   |
|           |                                        | 相手の端末 |
|           |   ◀─── これは別の設定。片方向だけでもOK |  にもアプリ|
|           |        (鍵＋承認) (いつでも解除)        |  の登録が  |
|           |                                        |  必要      |
|           |                                        | [設定のしかた→]|
+-----------+                                        +-----------+
   140px                     1fr                        140px

モバイル（〜767px）: 縦に組み替え
+-------------------------+
|        [人物] あなた     |
+-------------------------+
|           ▼              |
|  相手が申請し、あなたが   |
|  承認したときだけ、       |
|  あなたが相手の日記を     |
|  見られます               |
|  (鍵＋承認)(いつでも解除) |
+-------------------------+
|        [人物] 相手       |
|  ★Bのみ: 相手の端末にも  |
|  アプリの登録が必要       |
|  [設定のしかた →]        |
+-------------------------+
|           ▲              |
|  これは別の設定。         |
|  片方向だけでもOK         |
|  (鍵＋承認)(いつでも解除) |
+-------------------------+
```

```css
.d5 { display: grid; grid-template-columns: 1fr; gap: 16px; max-width: 920px; margin-inline: auto; }
@media (min-width: 768px) {
  .d5 { grid-template-columns: 140px 1fr 140px; gap: 24px; align-items: center; }
}
@media (min-width: 1024px) { .d5 { grid-template-columns: 160px 1fr 160px; gap: 32px; } }

/* 人物カード */
.d5Person {
  background: var(--gd-surface); border: 1px solid var(--gd-line);
  border-radius: var(--gd-r-lg); padding: 20px 16px; text-align: center;
}
.d5PersonIcon { width: 44px; height: 44px; margin: 0 auto; color: var(--gd-teal-ink); }
.d5PersonName { margin-top: 10px; font-size: 15px; font-weight: 700; color: var(--gd-text); }
.d5PersonNote { margin-top: 10px; font-size: 12px; line-height: 1.7; color: var(--gd-text-sub); }  /* ★Bのみ */

/* 矢印2本 */
.d5Arrows { display: grid; gap: 16px; }
.d5Arrow {
  background: var(--gd-teal-soft); border-radius: var(--gd-r-md);
  padding: 16px 18px;
}
.d5ArrowHead {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 700; color: var(--gd-text);
}
.d5ArrowIcon { width: 24px; height: 24px; color: var(--gd-teal-ink); flex: none; transform: rotate(90deg); }
.d5ArrowBack .d5ArrowIcon { transform: rotate(-90deg); }
@media (min-width: 768px) {
  .d5ArrowIcon { transform: none; }
  .d5ArrowBack .d5ArrowIcon { transform: rotate(180deg); }
}
.d5ArrowBody { margin-top: 6px; font-size: 14px; line-height: 1.8; color: var(--gd-text); }
.d5Badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.d5Badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: var(--gd-r-pill);
  background: var(--gd-surface); border: 1px solid rgba(31, 111, 121, 0.35);
  font-size: 12px; font-weight: 600; color: var(--gd-teal-ink);
}
.d5BadgeIcon { width: 13px; height: 13px; }

/* 2本目の矢印は「別の設定」であることを色で弱めず、背景を変えて区別する */
.d5ArrowBack { background: var(--gd-surface); border: 1px solid var(--gd-line); }
```

**寸法・配色**

| 要素 | 値 |
|---|---|
| ラッパー | `max-width: 920px` |
| 人物カラム | M `100%` / T `140px` / D `160px` |
| 人物アイコン | 44px・`--gd-teal-ink`・**年齢非特定の円頭＋肩シルエット** |
| 矢印ブロック padding | `16px 18px` |
| 矢印1（相手→あなた） | 背景 `--gd-teal-soft` |
| 矢印2（あなた→相手） | 背景 `--gd-surface` + 1px `--gd-line`（「別の設定」であることを**地の違い**で示す。文字サイズ・色は矢印1と同一） |
| バッジ | 「鍵＋承認」「いつでも解除」各12px・ピル・`--gd-teal-ink` |

**アイコングリフ**

| 用途 | グリフ |
|---|---|
| 人物 | `<circle cx=12 cy=8 r=3.6/>` + `<path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2"/>`（**性別・年齢の記号を付けない**） |
| 矢印 | `<line x1=4 y1=12 x2=19 y2=12/>` + `<polyline points="14,7 19,12 14,17"/>` |
| 鍵＋承認 | 南京錠の輪郭＋中にチェック（13px） |
| いつでも解除 | 鎖の輪が外れた形（2つの楕円が離れる）（13px） |

**この図が1枚で伝えるべきこと（設計書 §4-3 D5）**: **相互登録が必須でない**。そのため矢印2本の文言に「これは別の設定」「片方向だけでもOK」を必ず入れ、2本の矢印を**向きだけで区別**する（色の強弱で優劣を作らない）。

**B での追加要素（Bのみ・A には出さない）**

1. 相手側の `.d5Person` 内に `.d5PersonNote`「相手の端末にもアプリの登録が必要」（12px・`--gd-text-sub`）
2. その下に `.anchorLink`（「設定のしかた」→ `#proxy-setup`）。モバイルでは 44px タップターゲットを確保
3. **A ではこの2つを描かない**（A はカップル＝双方能動のため不要／設計書 §1-3）

**レスポンシブ時の組み替え**: 横3カラム → **縦4ブロック**（あなた → 矢印1 → 相手 → 矢印2）。矢印アイコンを `rotate(90deg)` / `rotate(-90deg)` にして上下方向に向ける。

---

### 6-6. D6 データのライフサイクル図（Bのみ・コンパクト帯）

**使用箇所**: B6
**実装**: HTML+CSS 4段フロー（`.flow` を再利用）

```
見出し（h3）: 見守られる側のデータも、溜まり続けません

デスクトップ（768px〜）: 横4段
+---------+  ▶  +---------+  ▶  +---------+  ▶  +---------+
| ①位置情報|     | ②深夜3時|     | ③相手が |     | ④取得から|
| を記録   |     | に日記を |     | 読めるの |     | 10日後に |
|         |     | 作成     |     | は直近  |     | 自動削除 |
|         |     |         |     | 2日分   |     | [ゴミ箱] |
+---------+     +---------+     +---------+     +---------+
                                 「3日以上前は
                                  閲覧できません」
+--------------------------------------------------+
| 別枠: アカウントを削除すれば、データも削除されます |
+--------------------------------------------------+
 場所名への変換に利用する外部地図サービス以外に、
 位置データを第三者に提供しません。（.compareFoot）

モバイル: 縦4段・矢印90度回転
```

- `.flow` / `.flowStep` / `.flowArrow` を再利用（新クラスを作らない）
- ④のみ `.flowStepFinal` 相当の強調（ただし D3 の③と区別するため**ティール枠ではなく `--gd-neutral-soft` + 2px `--gd-neutral-line`**）。削除は「嬉しいこと」だが強調色にするとノイズになるため落ち着かせる
- ゴミ箱アイコン 24px（`--gd-neutral-ink`）
- 「10日」は `--gd-font-num` / 600 で視認性を上げる（**実装値。`DeleteOldData.py` の `RETENTION_DAYS` と連動。変更時はLP3箇所同時更新**／設計書 §3-11）
- 別枠（アカウント削除）は `.flowBranch`（点線枠）
- 図の下に `.compareFoot`（第三者提供の確定文言・**言い換え禁止**）
- **コンパクト帯**: `.flowStep` の padding を `16px 14px` に落とす修飾子 `.flowCompact` を使い、B6 内で縦を圧迫しない

```css
.flowCompact .flowStep { padding: 16px 14px; }
.flowCompact .flowStepValue { font-size: 14px; }
```

---

### 6-7. D7 信頼バッジ 4枚のアイコン

**使用箇所**: A7 / B6（`.trustCard` の `.trustIcon`・40px）
**実装**: インラインSVG（24×24 viewBox を 40px 表示）・`--gd-teal-ink`

| # | バッジ | グリフ | 禁止 |
|---|---|---|---|
| 1 | リアルタイム共有は、機能として存在しません | **折り畳み地図の輪郭＋左下→右上の斜線**（地図面の中身は描かない） | 地図の実面・ピンの大きな使用・GPS波紋 |
| 2 | 自宅の住所は、誰にも公開されません | **家の輪郭＋中央に小さな南京錠** | 盾・金庫・警備 |
| 3 | 共有は承認制。いつでも解除できます | **2つの人物アイコン（小）＋間にチェック** | 握手（描画が複雑で40pxで潰れる）・契約書 |
| 4 | 位置情報は、残り続けません | **時計の輪郭＋右下に小さなゴミ箱** | 砂時計・爆弾タイマー |

**共通**

- `stroke-width: 1.75` / `stroke: currentColor` / `fill: none` / `aria-hidden="true"`
- **勲章・リボン・認証マーク風にしない**（第三者認証ではないため誤認を招く／設計書 §4-3 D7）
- **数字を入れない**（「10日」等は本文テキストで示す）
- 4つのグリフの**線の太さ・余白・視覚的な面積を揃える**（40px の枠内で 32px 程度の描画範囲に収める）

---

### 6-8. D8 できること／できないこと 対比図 【最優先・Bのみ】

**使用箇所**: B5
**実装**: §3-8 `.compare` + §5「B5」の `.compareD8` 修飾子（HTML+CSS）

**構図**

```
デスクトップ（768px〜）: 2カラム横並び・高さ揃え
+--------------------------------+  +--------------------------------+
| (チェック) できること  ← ピルチップ|  | (横棒) できないこと ← ピルチップ |
|────────────────────────────────|  |────────────────────────────────|
| (○) 1日の日記が、翌朝に届きます  |  | (−) 今どこにいるかを、リアルタイム|
| (○)「7:00頃 自宅付近」のように、 |  |     に確認することはできません    |
|     その日の節目がわかります     |  | (−) 地図の上で居場所を見ることは  |
| (○) 自宅の住所を登録しておけば、 |  |     できません                   |
|     自宅から約1km以内は         |  | (−)「指定の場所に着いたら知らせる」|
|    「自宅付近」とだけ表示されます |  |     といった通知機能はありません  |
| (○) 共有は承認制で、一方向ごとに |  | (−) SOSボタンや緊急時の通報など、 |
|     設定できます。いつでも解除可 |  |     防犯・緊急対応のための機能は  |
| (○) 相手がスマホの設定に慣れて   |  |     ありません                   |
|     いない場合は、あなたが代理で |  | (−) 相手に知られずに見ることは    |
|     設定できます                |  |     できません（共有には相手の    |
|     [設定のしかた →]            |  |     承認が必要です）             |
+--------------------------------+  +--------------------------------+
  白サーフェス + 1.5px 枠            白サーフェス + 1.5px 枠
  （上端バーなし）                   （上端バーなし）

モバイル: 縦積み（できること → できないこと）。スタイルは完全に同一
```

**D1 との視覚的な区別（必須・設計書 §4-3 D8）**

| | D1 | D8 |
|---|---|---|
| カラムの地 | 塗り分け（neutral-soft / teal-soft） | **白サーフェス ＋ 1.5px 枠線** |
| 上端 4px バー | **あり** | **なし** |
| 見出し | アイコン＋テキスト＋下罫線 | **ピル型チップ**（`.compareHeadChip`・地色付き）＋下罫線 |
| 項目アイコン（否定側） | 丸に横棒 | 丸に横棒（同じグリフだが地が違うため混同しない） |
| 項目アイコン（肯定側） | 丸にチェック | 丸にチェック |
| 置かれる面 | `bgSoft`（ティール寄り） | `bgAlt` |
| 問いの性質 | 「相手に何が**見える**か」 | 「アプリに何が**できる**か」 |

**寸法**

| 項目 | モバイル | デスクトップ |
|---|---|---|
| ラッパー幅 | `100%` | `max-width: 920px` |
| カラム padding | `24px 20px` | `32px 28px` |
| 枠線 | `1.5px solid`（両カラム同一の太さ） | 同 |
| 見出しチップ | `6px 16px` / 15px / 700 | 16px |
| 項目 | 15px / **`--gd-text`（両カラム同一）** | 16px |
| 項目 gap | 14px | 14px |

**配色（原則2）**

- 枠線: できる側 `rgba(31,111,121,.45)` ／ できない側 `--gd-neutral-line`（**太さは両方 1.5px**）
- 見出しチップ地: できる側 `--gd-teal-soft` ／ できない側 `--gd-neutral-soft`
- 見出し文字: **両方 `--gd-text`**
- 項目文字: **両方 `--gd-text`**
- アイコン: できる側 `--gd-teal-ink` ／ できない側 `--gd-neutral-ink`
- **赤・エラー色を一切使わない**

**図の下（`.compareFoot`・この文言は削らない）**

> そのため、「今すぐ無事を確認したい」「緊急のときに知らせてほしい」という目的には向いていません。Gentle Diary は、毎日の「変わりなかった」を、おたがいに無理のない形で知るためのアプリです。急を要する場面では、電話や自治体・事業者の緊急通報サービスをご利用ください。

`max-width: 760px` / 左寄せ / 15px / `line-height: 1.8` / `--gd-text-sub` / `margin-top: 24px`

**「できること」5項目目のアンカー**: `.anchorLink`（「設定のしかた」→ `#proxy-setup`）。**項目の文字サイズは他の4項目と同一**。リンクだけ目立たせるためにピル型にする（44px タップターゲット確保）。

**レスポンシブ時の組み替え**: 横並び → 縦積みのみ。**できること → できないこと の順序は変えない**。縮小・折りたたみ禁止。

---

### 6-9. D9 保護者が代理で設定する流れ図 【最優先・Bのみ】

**使用箇所**: B7（`.proxyBlock` の内側）／B5 からアンカー
**実装**: HTML+CSS（2レーンの4ステップフロー）

**構図**

```
デスクトップ（1024px〜）: 2レーン（左=相手の端末／右=あなたの端末）
      ┌─ 相手の端末 ─┐        ┌─ あなたの端末 ─┐
      │  (塗りチップ)  │        │  (枠線チップ)   │
+----------------------+  +----------------------+
| ① [相手の端末]        |  |                      |
|   アプリをインストール |  |                      |
+----------------------+  +----------------------+
           │
+----------------------+  +----------------------+
| ② [相手の端末]        |  |                      |
|   相手用のメール      |  |                      |
|   アドレスで、相手の   |  |                      |
|   アカウントを作る     |  |                      |
|   +------------+     |  |                      |
|   |    S6      |     |  |                      |
|   +------------+     |  |                      |
|   パスワードは不要。   |  |                      |
|   届いたメールのリンク |  |                      |
|   を開くだけ          |  |                      |
+----------------------+  +----------------------+
           │
+----------------------+  +----------------------+
| ③ [相手の端末]        |  |                      |
|   位置情報を          |  |                      |
|   「常に許可」にする   |  |                      |
|   +------------+     |  |                      |
|   |   S7a/b    |     |  |                      |
|   +------------+     |  |                      |
+----------------------+  +----------------------+
           └──────────────────────┐
+----------------------+  +----------------------+
|                      |  | ④ [あなたの端末]      |
|  ← 相手の端末で承認   |  |   相手のメールアドレス |
|                      |  |   に閲覧を申請        |
|                      |  |   +------------+     |
|                      |  |   |    S4      |     |
|                      |  |   +------------+     |
+----------------------+  +----------------------+

+------------------------------------------------+
| ⚠ 注意（アンバー・.notice）                    |
| あなた自身のアカウントで相手の端末にログイン    |
| しないでください。                              |
| 位置情報も日記もあなたのアカウントのものとして  |
| 記録され、相手の日記は作られません。            |
+------------------------------------------------+

モバイル（〜1023px）: 1カラム。各ステップカードの先頭にレーンチップを置く
+--------------------------------+
| (塗)相手の端末  ①              |
| アプリをインストール            |
+--------------------------------+
            ▼
| (塗)相手の端末  ②              |
| 相手用のメールアドレスで…       |
| [S6]                           |
+--------------------------------+
            ▼
| (塗)相手の端末  ③              |
| 位置情報を「常に許可」にする     |
| [S7a]                          |
+--------------------------------+
            ▼
| (枠)あなたの端末 ④             |
| 相手のメールアドレスに閲覧を申請 |
| [S4] → 相手の端末で承認         |
+--------------------------------+
| ⚠ 注意（.notice）              |
+--------------------------------+
```

```css
.d9 { max-width: 920px; margin-inline: auto; }

/* モバイル: 1カラム縦フロー */
.d9Steps { display: grid; grid-template-columns: 1fr; gap: 0; }

/* デスクトップ: 2レーン */
@media (min-width: 1024px) {
  .d9Steps { grid-template-columns: 1fr 1fr; column-gap: 32px; row-gap: 0; }
  .d9LaneHeads { display: grid; grid-template-columns: 1fr 1fr; column-gap: 32px; margin-bottom: 16px; }
  .d9StepTheirs { grid-column: 1; }
  .d9StepYours  { grid-column: 2; }
}

.d9Step {
  background: var(--gd-surface);
  border: 1px solid var(--gd-line);
  border-radius: var(--gd-r-lg);
  padding: 20px 18px;
}
@media (min-width: 1024px) { .d9Step { padding: 24px; } }

/* レーンを色だけに依存させないため、塗り／枠線の違いも付ける */
.d9LaneChip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: var(--gd-r-pill);
  font-size: 12px; font-weight: 700; line-height: 1.5;
}
.d9LaneTheirs {                             /* 相手の端末: 塗り */
  background: var(--gd-teal-soft);
  border: 1px solid transparent;
  color: var(--gd-teal-ink);
}
.d9LaneYours {                              /* あなたの端末: 枠線 */
  background: var(--gd-surface);
  border: 1px solid var(--gd-slate-line);
  color: var(--gd-slate-ink);
}
.d9LaneChipIcon { width: 14px; height: 14px; }

/* レーン別の左アクセント（さらに形で区別） */
.d9StepTheirs { border-left: 4px solid var(--gd-teal); }
.d9StepYours  { border-left: 4px dashed var(--gd-slate-line); }

.d9StepNum {
  font-family: var(--gd-font-num); font-size: 13px; font-weight: 700;
  color: var(--gd-text-muted); letter-spacing: 0.04em;
}
.d9StepTitle { margin-top: 6px; font-size: 16px; font-weight: 700; line-height: 1.6; color: var(--gd-text); }
.d9StepNote  { margin-top: 8px; font-size: 13px; line-height: 1.8; color: var(--gd-text-sub); }
.d9StepShot  { margin-top: 16px; width: 100%; max-width: 180px; }
@media (min-width: 1024px) { .d9StepTitle { font-size: 17px; } .d9StepShot { max-width: 200px; } }

/* 接続線（モバイルは縦矢印、デスクトップはレーン間の折れ線） */
.d9Connector { display: grid; place-items: center; padding: 12px 0; }
.d9ConnectorIcon { width: 20px; height: 20px; color: var(--gd-line-strong); transform: rotate(90deg); }
@media (min-width: 1024px) {
  /* デスクトップは ::before の罫線で縦につなぐ。④ の前だけ横方向のつなぎを入れる */
  .d9Connector { display: none; }
  .d9Step + .d9Step { margin-top: 16px; }
  .d9StepYours { position: relative; }
  .d9StepYours::before {
    content: ""; position: absolute; left: -32px; top: 32px; width: 32px; height: 2px;
    background: var(--gd-line-strong);
  }
}
```

**配色（レーンの区別）**

| | 相手の端末 | あなたの端末 |
|---|---|---|
| レーンチップ | **塗り** `--gd-teal-soft` / 文字 `--gd-teal-ink` | **枠線** `--gd-slate-line` / 文字 `--gd-slate-ink` #3F4E6B |
| 左アクセント | `4px solid --gd-teal` | `4px dashed --gd-slate-line` |
| チップアイコン | スマホ（無地画面） | スマホ＋人物（小） |
| コントラスト実測 | `#1F6F79` on `#DCEEF0` = **4.86:1** | `#3F4E6B` on `#FFFFFF` = **13.9:1** |

> **色だけに依存させない**: ①レーン名のテキスト（「相手の端末」「あなたの端末」） ②塗り／枠線の違い ③実線／破線の左アクセント ④アイコンの違い の4重で区別する。色覚特性のある方にも伝わる。

**⚠注意（図内に必ず入れる・`.notice` を使う）**

> **注意** — あなた自身のアカウントで相手の端末にログインしないでください。
> 位置情報も日記もあなたのアカウントのものとして記録され、相手の日記は作られません。

- `.notice`（アンバー・左4pxバー・注意三角の線画アイコン24px・「注意」ラベル）
- **赤は使わない**（設計書 §4-3 D9 の明示指示）
- **図の末尾・4ステップの直後**に置く（`margin-top: 24px`）。別セクションに切り出さない
- 文言は設計書 §2-7 の B限定ブロック①と一致させる

**画像スロット**: S6（②）／S7a（③）／S4（④）
→ いずれも `.shotPhoneSm`（小型端末フレーム・`--gd-ar: 393/852`）で `max-width: 180px`（D `200px`）。S7a のみ 1:1 なので `.figSlot`（`--gd-ar: 1/1`・`contain`）にする
→ **S4 / S6 は「同じ端末サイズ・同じ余白」で書き出す**（設計書 §4-2）。D9 内で並ぶため不揃いだと目立つ

**レスポンシブ時の組み替え**: 2レーン横並び（1024px〜） → **1カラム縦積み**（〜1023px）。縦積み時は各カードの先頭にレーンチップを置き、カード間に `.d9Connector`（下向き矢印）を挿入。

**A11y**: `<ol class="d9Steps">` の順序リストにする（手順なので `<ol>` が正しい）。レーンチップは `<span>`（テキストが読まれる）。接続矢印は `aria-hidden`。

---

## 7. 画像スロット仕様表

### 7-1. アプリ実画面スクリーンショット S1〜S8（**要新規撮影**）

**撮影・書き出しの共通条件**

| 項目 | 指定 |
|---|---|
| 端末 | **iOS シミュレータ iPhone 15 / 15 Pro（論理 393 × 852 pt）を基準**。実機の場合も同系の論理解像度の機種を使う |
| 向き | 縦向き固定 |
| 倍率 | **@3x（1179 × 2556 px）で取得 → 下表の書き出しキャンバスへ縮小** |
| アカウント | **ダミーアカウント必須。**実在の住所・建物名・メールアドレスを写さない。`place` は公共施設・駅などのダミーに |
| 端末フレーム | **付けない。**（LP側で CSS の `.shotPhone` が描画します） |
| 角丸 | **付けない。**（LP側で `border-radius: 30px` + `overflow: hidden`） |
| 影・背景 | **付けない。**（透明・白フチ・ドロップシャドウ一切不可） |
| ステータスバー | **含める**（時刻・電池。実画面であることの担保になる） |
| AdMobバナー | 隠してよい。ただし**アプリ背景色の単色で塗りつぶし、キャンバス比率は維持**すること（トリミングで比率を変えると LP のレイアウトが崩れます） |
| 形式 | PNG（可逆）。LP実装時に builder が WebP へ変換します |

| ID | 画面 | 書き出しキャンバス（px） | アスペクト比（CSS） | 表示サイズ（M / T / D） | フレーム | トリミング基準 | 優先度 | 使用箇所 |
|---|---|---|---|---|---|---|---|---|
| **S1** | タイムライン（日記カード2枚以上・上のカードが5〜7行） | **786 × 1704**（2x）<br>推奨 1179 × 2556（3x） | `393 / 852` | `min(72vw, 264px)` / `280px` / `300px`（外枠幅） | **`.shotPhone`**（10px padding・1.5px枠・40px角丸） | **全画面**。切らない。上端にステータスバー、下端はバナーを単色塗りで埋めて比率維持 | **最優先** | A1/B1 ヒーロー（主役）、D4 STEP3 |
| **S2** | 日記カード1枚のクローズアップ | **1080 × 720**（= 2x of 540×360） | `3 / 2` | `100%`（max 480px） / `520px` / `520px` | なし（`.shotPlain`・1px枠・16px角丸） | **カードを中央に置き、上下左右に 64px 以上（1080×720換算）のアプリ背景色の余白**を付ける。「自宅付近」の行を必ず含める。時刻と場所が拡大しても読める解像度 | **最優先** | A3 / B4（+`.microNote` キャプション）、D4 STEP2 |
| **S3** | 閲覧権限画面（上段=承認済1件・下段=申請中1件） | **786 × 1704** | `393 / 852` | `240px` / `240px` / `260px` | `.shotPhone` | **全画面**。「あなたが日記を閲覧できるユーザー」「あなたの日記を閲覧できるユーザー」の**2セクションが同一フレームに入ることが必須**（入らない場合は S3a / S3b の2枚に分割し、`.shotPair` に並べる） | **最優先** | A7 / B6 |
| **S4** | 閲覧申請モーダル（タイトル「閲覧申請」＋メール入力欄） | **786 × 1704** | `393 / 852` | `180px` / `180px` / `200px` | `.shotPhoneSm`（7px padding・28px角丸） | **全画面**（モーダルが開いた状態）。**S6 と同じ端末サイズ・同じ余白** | **最優先** | **D9 手順④**、FAQ Q4 |
| **S5** | 設定画面（「自宅の住所」欄＋「自宅の住所は誰にも公開されません。」の注記が読める） | **786 × 1704** | `393 / 852` | `240px` / `240px` / `260px` | `.shotPhone` | 全画面。**注記の文字が読める解像度**（2x必須） | 高 | A7 / B6（信頼バッジ2の裏付け） |
| **S6** | ログイン画面（メール入力欄のみ＝パスワード不要が伝わる） | **786 × 1704** | `393 / 852` | `180px` / `180px` / `200px` | `.shotPhoneSm` | **全画面**。**S4 と同じ端末サイズ・同じ余白** | 高 | **D9 手順②**、初期設定① |
| **S7a** | 位置情報の許可ダイアログ（**iOS**・「常に許可」が見える） | **1000 × 1000**（1:1） | `1 / 1` | `100%`（max 220px） / `220px` / `240px` | なし（`.figSlot` または `.shotPlain`） | **ダイアログを中央に置いた正方形クロップ**。背景のアプリ画面は入ってよい。端末比率の違いを吸収するため正方形に統一 | 高 | D4 STEP1、初期設定②、FAQ Q6、**D9 手順③** |
| **S7b** | 位置情報の許可ダイアログ（**Android**・「常に許可」が見える） | **1000 × 1000**（1:1） | `1 / 1` | 同上 | 同上 | 同上 | 高 | 同上（iOS と並べる／または切り替え表示） |
| **S8** | タイムライン（空状態・「閲覧できる日記がありません」「3日以上前の日記は閲覧できません」） | **786 × 1704** | `393 / 852` | `240px` / `240px` / `260px` | `.shotPhone` | 全画面。文言が読める解像度 | 中 | B6（D6 の裏付け・任意） |

**解像度の根拠**: 最大表示幅は S1 の外枠 300px → 内側メディア 277px（padding 10px + border 1.5px を両側で -23px）。Retina（2x）で必要なのは 554px。**786px は十分なマージンを持ちます。** S2 は表示 520px → 2x で 1040px 必要 → 1080px で充足。

**撮影結果の配置先（builder が受け取る）**

```
public/images/products/GentleDiary/
├── s1-timeline.webp
├── s2-diary-card.webp
├── s3-viewers.webp        （分割時は s3a-viewers.webp / s3b-viewers.webp）
├── s4-add-user.webp
├── s5-settings.webp
├── s6-login.webp
├── s7a-permission-ios.webp
├── s7b-permission-android.webp
└── s8-timeline-empty.webp
```

### 7-2. スクショが揃う前に実装を進めるためのプレースホルダ設計

**`_components/shots.ts`（1ファイル差し替え方式）**

```ts
// app/service/products/gentle-diary/_components/shots.ts
export type ShotId = "S1"|"S2"|"S3"|"S4"|"S5"|"S6"|"S7a"|"S7b"|"S8";

export type ShotSpec = {
  /** CSS aspect-ratio に渡す値 */
  ar: string;
  /** プレースホルダに出すラベル */
  label: string;
  /** §2-12 の alt 文言 */
  alt: string;
  /** 撮影前は null。撮影後にパスを入れるだけで全箇所が差し替わる */
  src: string | null;
  /** 入稿画像の実寸（next/image 用） */
  width: number;
  height: number;
};

export const SHOTS: Record<ShotId, ShotSpec> = {
  S1: { ar: "393 / 852", label: "タイムライン画面", src: null, width: 786, height: 1704,
        alt: "Gentle Diary の画面。自動でできた位置情報日記に、時刻と「〇〇周辺」の場所が並んでいる" },
  S2: { ar: "3 / 2",     label: "日記カード拡大",   src: null, width: 1080, height: 720,
        alt: "位置情報日記の拡大表示。「9:00頃 自宅付近」「12:20頃 〇〇駅周辺」のように、20分単位の時刻と周辺表記の場所が並ぶ" },
  // S3〜S8 も同様
};
```

**`_components/Shot.tsx`（枠が寸法を持つ）**

```tsx
// 枠（aspect-ratio）が寸法を決め、中身だけが差し替わる。
// src が null ならプレースホルダ、入れば実画像。レイアウトは1pxも動かない。
type Props = {
  id: ShotId;
  /** "phone" | "phoneSm" | "plain" | "contain" */
  frame?: "phone" | "phoneSm" | "plain" | "contain";
  className?: string;
};
```

**レイアウトが崩れない設計の要点（§3-13 と対応）**

| # | 仕組み |
|---|---|
| 1 | `aspect-ratio` は**枠（`.shotMedia`）側**に `style={{ "--gd-ar": spec.ar }}` で渡す。画像の実寸に依存しない |
| 2 | 枠の `width` は使用箇所の CSS（`max-width` / `width`）で決まる。画像の有無で変わらない |
| 3 | プレースホルダは `position: absolute; inset: 0` なので**高さを持たない**（枠の高さは `aspect-ratio` だけで決まる） |
| 4 | 実画像は `width/height: 100%` + `object-fit: cover`（または `contain`）なので、入稿寸法が多少ずれても枠が守られる |
| 5 | `next/image` を使う場合は `fill` + `sizes` を指定し、親（`.shotMedia`）が `position: relative` を持つ |

**プレースホルダの見た目（§3-13 の `.shotPlaceholder`）**

```
+ - - - - - - - - - +     破線 2px --gd-line-strong（3.04:1）
|        S1         |     15px / 700 / --gd-text-sub
| タイムライン画面   |     12px / --gd-text-muted
|     撮影待ち       |
|    393 : 852      |     11px / Inter / --gd-text-muted
+ - - - - - - - - - +     地 --gd-surface-2
```

**差し替え手順（撮影完了後）**

1. `public/images/products/GentleDiary/` に WebP を配置
2. `shots.ts` の該当 `src` を `null` → パスに書き換え（**他のファイルは触らない**）
3. `width` / `height` を実寸に合わせる
4. 表示確認（`aspect-ratio` が一致していればレイアウトは動かない）

### 7-3. 既存の横長イラストを降格して使う箇所

**既存アセットの実寸**

| ファイル | 実寸 | 比率 | ファイルサイズ | 新しい扱い |
|---|---|---|---|---|
| `0.png` | 972 × 816 | 約 6:5 | 0.97MB | **ヒーローから降格。今回は使わない**（A2 の3枚目候補だが内容が一致しないため不使用） |
| `1.png` | 1000 × 800 | 5:4 | 1.69MB | **A2 カード1 の補助**（`.cardFig`）。**B では使わない**（見守り文脈に合わない／設計書 §4-1） |
| `2.png` | 1000 × 800 | 5:4 | 1.46MB | **A2 カード3 ／ B2 カード1 の補助**（`.cardFig`） |
| `日記.png` | 914 × 756 | 約 6:5 | 39KB | **使わない。** D3 を HTML+CSS で作図するため下敷き不要（§6-0） |
| `リアルタイム位置情報共有なし.png` | 914 × 756 | 約 6:5 | 299KB | **使わない。** D1 を HTML+CSS で作図するため下敷き不要（§6-0） |
| `GentleDiary.png` | — | 正方形 | 622KB | **使う**: ヘッダーアイコン（28/32px）、`.ctaAppIcon`（64px）、フッターアイコン（40px）、OG画像 |
| `AppStore.png` / `GooglePlay.png` | — | 横長 | 1.8KB / 4.7KB | **使う**: 全CTA（高さ 40〜52px・`width: auto`） |

**横長比率をカード内にどう収めるか（`.cardFig`）**

```css
.cardFig {
  margin-top: 20px;
  width: 100%;
  aspect-ratio: 5 / 4;        /* 元画像とほぼ一致 → cover でもほとんど切れない */
  max-height: 180px;          /* カード内で主役にならないよう高さを制限 */
  border-radius: var(--gd-r-md);
  overflow: hidden;
  background: var(--gd-surface-2);
}
.cardFig img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
```

| 論点 | 判断 |
|---|---|
| 比率の扱い | **`aspect-ratio: 5/4` + `object-fit: cover`**。元が 5:4（`1.png` `2.png`）なので**切れ量はほぼゼロ**。歪ませない（`fill` は使わない） |
| 高さの制限 | `max-height: 180px`。カード幅がデスクトップで約 330px なので 5:4 なら 264px になり、イラストがカードの主役になってしまう。180px に抑えて**テキストが主役**の関係を保つ |
| 配置位置 | **カード本文の下**（見出し → 本文 → イラスト）。上に置くとイラストが見出しより先に目に入り、感情コピーの効きが落ちる |
| 枚数 | **3枚のカードのうち最大2枚まで**。3枚全部に入れると縦に長く重い |
| 視覚的な降格 | 枠線なし・影なし・`--gd-surface-2` の地。`.shotPhone` のような端末フレームは付けない（**実画面と混同させない**ことが重要） |
| 最適化（builder） | **`1.png`（1.69MB）・`2.png`（1.46MB）をそのまま使わない。** `max-height: 180px` × 2x = 360px 相当に合わせて WebP でリサイズ・書き出し（目標各 40KB 以下）。`next/image` の自動最適化に任せる場合も `sizes` を正しく指定する |
| 年齢特定描写の確認 | **【解決済み 2026-10-09】既存イラスト3枚は不使用に決定**（§0-2 Q-B）。禁止モチーフ（目・防壁・脅威の影）とトーン制約への抵触が理由。A2/B2 はテキストのみ |

---

## 8. アクセシビリティ

### 8-1. コントラスト比（**全て実測値**・WCAG 2.1 相対輝度式で算出）

**本文・見出し（AA 4.5:1 / AAA 7:1）**

| 前景 | 背景 | 比 | 判定 |
|---|---|---|---|
| `--gd-text` #16232A | `--gd-bg` #F4F8F8 | **15.01:1** | AAA |
| `--gd-text` #16232A | `--gd-bg-alt` #E9F1F1 | **13.95:1** | AAA |
| `--gd-text` #16232A | `--gd-bg-soft` #E6F2F3 | **13.97:1** | AAA |
| `--gd-text` #16232A | `--gd-surface` #FFFFFF | **16.07:1** | AAA |
| `--gd-text-sub` #3C4A52 | `--gd-bg` #F4F8F8 | **8.56:1** | AAA |
| `--gd-text-sub` #3C4A52 | `--gd-surface` #FFFFFF | **9.16:1** | AAA |

**添え書き（`.microNote` / `.ctaNote` / `.caption`）— 設計書 §2-2 が 4.5:1 維持を明示**

| 前景 | 背景 | 比 | 判定 |
|---|---|---|---|
| `--gd-text-muted` #5A6A73 | `--gd-bg` #F4F8F8 | **5.24:1** | AA ✓ |
| `--gd-text-muted` #5A6A73 | `--gd-bg-alt` #E9F1F1 | **4.89:1** | AA ✓ |
| `--gd-text-muted` #5A6A73 | `--gd-bg-soft` #E6F2F3 | **4.90:1** | AA ✓ |
| `--gd-text-muted` #5A6A73 | `--gd-surface` #FFFFFF | **5.61:1** | AA ✓ |
| `--gd-text-muted` #5A6A73 | `--gd-surface-2` #F7FAFA | **5.36:1** | AA ✓ |
| `--gd-text-muted` #5A6A73 | `--gd-neutral-soft` #E7ECEE | **4.71:1** | AA ✓ |
| `--gd-on-cta-sub` #EAF4F5 | CTAバンド明端 #23767F | **4.73:1** | AA ✓ |

> **`.microNote` は本文より1段淡いが、どの背景面でも 4.5:1 以上**。設計書 §2-2 の「コントラスト比 4.5:1 は維持してアクセシビリティを落とさない」を満たす。

**ブランド色・リンク**

| 前景 | 背景 | 比 | 判定 |
|---|---|---|---|
| `--gd-teal-ink` #1F6F79 | `--gd-bg` #F4F8F8 | **5.44:1** | AA ✓（リンク・アイコン・フォーカス） |
| `--gd-teal-ink` #1F6F79 | `--gd-surface` #FFFFFF | **5.82:1** | AA ✓ |
| `--gd-teal-ink` #1F6F79 | `--gd-teal-soft` #DCEEF0 | **4.86:1** | AA ✓ |
| #FFFFFF | `--gd-teal-ink` #1F6F79（`.setupNum` 塗り） | **5.82:1** | AA ✓ |
| **`--gd-teal` #4AA6B1** | `--gd-bg` #F4F8F8 | **2.66:1** | **AA未達 → 文字・意味を持つ線に使用禁止**（塗り・装飾線のみ） |
| `--gd-text` #16232A | `--gd-teal` #4AA6B1（塗りの上の文字） | **5.64:1** | AA ✓（ティール塗りの上に濃文字は可） |

**対比2カラム（原則2・両カラムの本文を同値にする根拠）**

| 前景 | 背景 | 比 |
|---|---|---|
| `--gd-text` #16232A | `--gd-neutral-soft` #E7ECEE（できない／見えない側） | **13.48:1** |
| `--gd-text` #16232A | `--gd-teal-soft` #DCEEF0（できる／見える側） | **13.41:1** |
| `--gd-neutral-ink` #4F5B62 | `--gd-neutral-soft` #E7ECEE（アイコン） | **5.87:1** |

→ **本文の差は 0.07 ポイント＝実質同一。**「できないこと」が弱く見える要因を色から排除できている。

**注意喚起（アンバー・赤を使わない）**

| 前景 | 背景 | 比 | 判定 |
|---|---|---|---|
| `--gd-amber-ink` #8A5A00 | `--gd-amber-soft` #FFF6E3 | **5.51:1** | AA ✓ |
| `--gd-amber-ink` #8A5A00 | `--gd-surface` #FFFFFF | **5.93:1** | AA ✓ |
| `--gd-amber-line` #A4701A | `--gd-amber-soft` #FFF6E3 | **3.98:1** | 非文字UI 3:1 ✓（枠線・アイコン） |
| `--gd-text` #16232A | `--gd-amber-soft` #FFF6E3 | **14.95:1** | AAA（`.noticeBody`） |

**D9 レーン色**

| 前景 | 背景 | 比 |
|---|---|---|
| `--gd-slate-ink` #3F4E6B | `--gd-surface` #FFFFFF | **13.93:1** |
| `--gd-slate-ink` #3F4E6B | `--gd-slate-soft` #E4E9F2 | **6.86:1** |

**非文字コントラスト（UI部品・境界 3:1）**

| 要素 | 色 | 対背景 | 比 | 判定 |
|---|---|---|---|---|
| プレースホルダ破線 | `--gd-line-strong` #7E9299 | `--gd-surface-2` #F7FAFA | **3.11:1** | ✓ |
| プレースホルダ破線 | `--gd-line-strong` #7E9299 | `--gd-bg` #F4F8F8 | **3.04:1** | ✓ |
| フォーカスリング | `--gd-focus` #1F6F79 | `--gd-bg` #F4F8F8 | **5.44:1** | ✓ |
| フォーカスリング | #FFFFFF | CTAバンド #23767F | **5.29:1** | ✓ |
| `--gd-line` #D7E3E5 | `--gd-bg` #F4F8F8 | **1.25:1** | **装飾専用**（単独で情報を伝えない罫線のみ。情報を伝える境界には `--gd-line-strong` を使う） |

**CTAバンド（白文字）**

| 前景 | 背景 | 比 |
|---|---|---|
| #FFFFFF | グラデ明端 #23767F | **5.29:1** ✓ |
| #FFFFFF | グラデ暗端 #1A626B | **6.99:1** ✓ |

→ **グラデーションのどの位置でも白文字が 4.5:1 以上**。

### 8-2. フォーカスリング

```css
.root :focus-visible {
  outline: 2px solid var(--gd-focus);
  outline-offset: 3px;
  border-radius: 2px;
}
.root .storeBtn:focus-visible { outline-offset: 4px; }   /* バッジ画像は近接しているため */
.root .ctaBand :focus-visible { outline-color: var(--gd-focus-on-cta); }
```

- `:focus-visible` を使う（マウスクリックでリングが出ない）
- **`outline: none` を書かない。** 既存 `gentle-diary/page.module.css` にはフォーカス指定が無く、ブラウザ既定の細い青リングが明面で見づらいため LP 内で一括上書きする
- `outline-offset: 3px` で、カード・チップの角丸に重ならないようにする
- フォーカス可能要素: ストアバッジ（8個 = 4箇所×2）、`<summary>`（6個）、ポリシーリンク（3〜4個）、`.anchorLink`（2個）、FAQ内リンク

### 8-3. `prefers-reduced-motion`（現行フェードインへの対応）

現行 `page.tsx` の `IntersectionObserver` フェードインには2つの問題があります。両方を是正します。

| 問題 | 是正 |
|---|---|
| **① `.fadeIn` の既定が `opacity: 0`** → JS 失敗時・一部クローラでコンテンツが見えない | **既定を「見える」にする。** JS が `.fadeInReady` を付けてから初めて隠す（§3-14） |
| **② `prefers-reduced-motion` 未対応** | ①メディアクエリで `transition: none; opacity: 1; transform: none` ②**JS 側でも `matchMedia("(prefers-reduced-motion: reduce)").matches` なら `.fadeInReady` を付けない**（CSSだけだと `transform` の初期値が残る実装になりがち） |

```css
@media (prefers-reduced-motion: reduce) {
  .fadeInReady { opacity: 1; transform: none; transition: none; }
  .card, .storeBtn, .faqMark::before, .faqMark::after { transition: none; }
  .card:hover, .storeBtn:hover { transform: none; }
}
```

**その他の動きに対する配慮**

| 要素 | 通常 | reduced-motion |
|---|---|---|
| `.card:hover` | `translateY(-3px)` + 影 | `transform: none`（影の変化は残してよい） |
| `.storeBtn:hover` | `opacity` + `translateY(-1px)` | `opacity` のみ |
| `.faqMark` の ＋→− | `transform` 150ms | 即時 |
| ヒーロー | **アニメーションなし**（LCP） | — |
| `.microNote` | **アニメーションなし**（設計書 §2-2 で禁止） | — |
| `html { scroll-behavior: smooth }` | グローバル設定 | `globals.css` に既に `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }` があるため**追加対応不要** |

### 8-4. 見出し階層

```
h1  Gentle Diary のH1（A-H1-1 / B-H1-1）             … 1ページに1つ
├ h2  各セクションの見出し（A2〜A9 / B2〜B9）         … 8〜9個
│  ├ h3  セクション内のブロック見出し
│  │   例: A3「届くのは、1日分の位置情報日記だけ」
│  │      A5/B7「はじめにすることは、3つだけ」
│  │      B7「相手がスマホに詳しくなくても…」（.proxyBlockH3）
│  │      B6「見守られる側のデータも、溜まり続けません」（D6）
│  │      A2/B2 の共感カード（.cardH3）
│  │      A6 の3ブロック（.forWhoCard 内）
│  │      D1 / D8 の2カラム見出し（両カラム同格）
│  └ h4 は使わない（.h4 は見た目のクラスで、要素は <p> にする）
```

**守るべきルール**

| # | ルール |
|---|---|
| 1 | **`h1` はヒーローに1つだけ。** ヘッダーの「Gentle Diary」は `<span>`（見出しにしない） |
| 2 | **レベルを飛ばさない**（`h2` → `h4` にしない） |
| 3 | **B6 は `<h2>` が2つ**（`.kwBandH2` とセクション本体）。これは §3-10 のSEO要件（A6 と同一文言のH2をBにも置く）の帰結であり、仕様として正しい |
| 4 | **信頼バッジの見出しは `<p class="trustH4">`**（4枚 × A/B で見出しが増えすぎるため）。D7 のアイコンも `aria-hidden` |
| 5 | **`.statement`（A3 の言い切りコピー）は `<p>`。** 見た目が大きいが見出しではない |
| 6 | **D1 / D8 の2カラム見出しを `<h3>` にする場合は両カラム同格**（片方だけ `<h3>`、片方 `<p>` は原則2違反） |
| 7 | `.figTitle` も `<h3>` か `<p>` のどちらかに統一（図ごとに変えない） |

### 8-5. タップターゲット（44 × 44px）

| 要素 | 実寸 | 判定 |
|---|---|---|
| ストアバッジ `hero` / `block` | 44px（M）/ 48px（T・D） | ✓ |
| ストアバッジ `final` | 46px（M）/ 52px | ✓ |
| ストアバッジ `inline` | 40px + `padding-block: 2px` ×2 = **44px** | ✓ |
| `<summary class="faqQ">` | `min-height: 48px`（padding 20px×2 + 文字1行） | ✓ |
| `.policyLink` | `min-height: 44px` + `padding-block: 10px` | ✓ |
| `.anchorLink` | `min-height: 44px` | ✓ |
| `.faqA` 内のインラインリンク | 文中リンク（WCAG 2.5.8 の例外に該当） | 許容。ただし `line-height: 1.9` で行間を確保 |
| バッジ間の `gap` | 12px（隣接ターゲットの誤タップ防止） | ✓ |

### 8-6. その他

| 項目 | 指定 |
|---|---|
| `lang` | `app/layout.tsx` の `<html lang="ja">` を継承（変更不要） |
| 画像 `alt` | **設計書 §2-12 の文言をそのまま使う。**「（近日公開）」を含む現行 alt は全削除（grep で0件にする） |
| 装飾画像 | 装飾のみの画像・アイコンは `alt=""` または `aria-hidden="true"` |
| `.srOnly` | `.chip` の否定/肯定の補足（§3-11）、分割した S3a/S3b の説明などに使用 |
| リンクのテキスト | 「こちら」等を使わない（`.policyLink` は「プライバシーポリシー」「利用規約」とフルに書く） |
| 外部リンク | ストアリンクは `target="_blank" rel="noopener noreferrer"`。`.srOnly` で「新しいタブで開きます」を補うことを推奨 |
| `<details>` のキーボード操作 | ネイティブで Enter / Space 対応。独自 JS を足さない |
| ズーム | `viewport` に `maximum-scale` / `user-scalable=no` を**書かない**（既存の `layout.tsx` は指定なし＝問題なし） |
| 文字サイズ変更への耐性 | `.h1` の `clamp()` 下限は px だが、本文は px 固定。**ブラウザのズーム（200%）で横スクロールが出ないこと**を 375px / 768px / 1280px で確認 |
| 色のみに依存しない | D1 / D8（アイコン＋見出しテキスト）、D9（レーン名＋塗り/枠線＋実線/破線＋アイコン）、`.chip`（アイコン＋`.srOnly`）、`.notice`（「注意」ラベル＋アイコン＋左バー）で担保 |

---

## 9. homepage-builder への実装メモ

### 9-1. ファイル構成（設計書 §3-4 に準拠＋デザイン実装分）

```
app/service/products/gentle-diary/
├── layout.tsx                    （既存・metadata を設計書 §2-10 に差し替え。A/B共通）
├── page.tsx                      （★サーバコンポーネント化。"use client" 削除＋週判定分岐）
├── page.module.css               （★全面書き換え。--gd-* トークン＋全クラス。A/B共用の1ファイル）
└── _components/
    ├── VariantA.tsx              （★新規・"use client"・A1〜A9 を上から順に）
    ├── VariantB.tsx              （★新規・"use client"・B1〜B9 を上から順に）
    ├── LpImpression.tsx          （★新規・設計書 §3-4 のまま）
    ├── StoreCta.tsx              （★新規・設計書 §3-4 ＋ size プロパティ追加・§3-3）
    ├── Shot.tsx                  （★新規・画像スロット。§7-2）
    ├── shots.ts                  （★新規・S1〜S8 のパス/比率/alt レジストリ。§7-2）
    ├── Icon.tsx                  （★新規・インラインSVGアイコン集。§6-0 共通仕様）
    └── FadeIn.tsx                （★新規・IntersectionObserver のフェードイン。§3-14）
app/api/lp-event/route.ts         （★新規・設計書 §3-4）
lib/ab/iso-week.ts                （★新規・設計書 §3-2）
lib/ab/lp-event.ts                （★新規・設計書 §3-4）
lib/seo/gentle-diary-faqs.ts      （★新規・FAQ本文。duosub-faqs.ts と同作法）
public/images/products/GentleDiary/  （★新規ディレクトリ・撮影画像の置き場。§7-1）
```

**図解コンポーネントの置き方（推奨）**

D1〜D9 は HTML+CSS なので**独立ファイルにしない**選択もできますが、A/B の両方から呼ばれる図（D1〜D5・D7）は**必ず共有コンポーネントにする**こと。A と B に同じ JSX をコピーすると、片方だけ修正されて A/B の交絡要因になります。

```
_components/diagrams/
├── D1Visibility.tsx      （A4 / B3）  props: { wide?: boolean }
├── D2Timeline.tsx         （A2 / B2）  props: { caption: string }   ← キャプションのみA/Bで差
├── D3Granularity.tsx      （A4 / B4）
├── D4Steps.tsx            （A5 / B7）
├── D5Approval.tsx         （A7 / B6）  props: { showProxyNote?: boolean }  ← Bのみ true
├── D6Lifecycle.tsx        （B6のみ）
├── D8CanCannot.tsx        （B5のみ）
└── D9ProxySetup.tsx       （B7のみ）
（D7 は Icon.tsx の4グリフ＋ .trustCard なので専用ファイル不要）
```

> **D5 の `showProxyNote`** が A/B 差分を props 1つに閉じ込める設計（§6-5）。`D1Visibility` の `wide` も同様（§5 B3）。**これ以外の A/B 差分を図コンポーネントに持ち込まない。**

### 9-2. `page.module.css` のクラス一覧（新規 / 流用の区別）

#### 流用できる既存クラス: **0件**

| 既存クラス | 判断 |
|---|---|
| `.page` `.container` `.section` `.topbar` `.topbarInner` `.topbarLeft` `.topbarLogoImg` `.topbarRight` `.topbarCta` `.contactBtn` `.topbarContactBtn` `.hero` `.heroGrid` `.heroLead` `.ctaRow` `.storeCta` `.heroCard` `.heroIllus` `.stats` `.stat` `.gridTwo` `.card` `.cardMedia` `.featureSection` `.featureList` `.feature` `.sectionTitle` `.cta` `.ctaButtonsWrap` `.storeButtons` `.storeBtn` `.fadeIn` `.isVisible` `.footerSlot` | **全て破棄。** 理由: ①独自トークン（`--primary: #4aa6b1` 等）が文字コントラスト未達 ②`system-ui` フォント指定がサイト標準（Noto Sans JP）と不一致 ③独自ブレークポイント（640 / 820）がサイト標準（768 / 1024）と不一致 ④`.topbar` が `position: fixed` でモバイルで2段に崩れる ⑤`.stats`（「プライバシーに配慮」等3枠）は新構成に存在しない ⑥`.featureSection`（4枠）も新構成に存在しない ⑦`.contactBtn` は設計書 §2-6 でヒーローから除外 |
| `.fadeIn` / `.isVisible` の**考え方** | **概念のみ流用**（IntersectionObserver 方式）。ただし §3-14 のとおり既定を「見える」に是正し、`.fadeInReady` を追加 |

**→ `page.module.css` は全面書き換え。** クラス名が偶然同名になるもの（`.container` `.section` `.card` `.storeBtn` `.storeCta` `.fadeIn` `.isVisible` `.footerSlot`）も**本書の定義で上書き**する。

#### 流用する既存アセット・コンポーネント

| 資産 | 流用 | 備考 |
|---|---|---|
| `app/components/LpProductFooter.tsx` | **そのまま流用** | `variant="teal"`（`--lp-accent: #4aa6b1`）。**`tagline` は現行「リアルタイム共有しない位置情報日記」のまま変更不要**（設計書 §4-4） |
| `public/images/products/AppStore.png` / `GooglePlay.png` | **そのまま流用** | 全CTA |
| `public/images/products/GentleDiary.png` | **そのまま流用** | ヘッダー / `.ctaAppIcon` / フッター / OG / JSON-LD |
| `public/images/products/1.png` / `2.png` | **不使用**（§0-2 Q-B で決定） | 使わないため WebP 変換も不要。A2/B2 はテキストのみで構成する |
| `app/components/JsonLd.tsx` | **そのまま流用** | Duosub と同じ作法 |
| `lib/seo/metadata.ts` の `createPageMetadata` | **そのまま流用** | `absoluteTitle: true` を維持 |
| `lib/seo/json-ld.ts` の `webPageJsonLd` / `softwareApplicationJsonLd` / `faqPageJsonLd` | **そのまま流用** | 設計書 §3-10 |
| `app/components/FaqAccordion.tsx` | **流用しない**（§3-7） | 理由は §3-7 の表 |
| `app/globals.css` | **変更しない** | 追加・修正ゼロ（§2-1） |
| `app/service/products/gentle-diary/privacy/` `terms/` | **変更しない** | §0-2 Q-C。`terms/page.tsx` はコーディネータが修正済み＝触らない |

#### 新規クラス一覧（`page.module.css`）

**基盤・レイアウト**

```
.root  .container  .section  .sectionCompact
.bgBase  .bgAlt  .bgSoft
.sectionHead  .blockHead
.srOnly  .nb
.figure  .figureWide  .figTitle  .caption
.grid2  .grid3
```

**タイポグラフィ**

```
.h1  .h1Line  .h1Pause  .h1Soft
.h2  .h3  .h4
.lead  .body  .small
.microNote        ← ★設計書 §2-2 の新設クラス
.ctaNote
.eyebrow  .num
.statement        （A3 の言い切りコピー）
```

**ヘッダー**

```
.header  .headerInner  .headerIcon  .headerName
```

**CTA**

```
.storeCta  .storeCtaHero  .storeCtaInline  .storeCtaFinal
.ctaHeading  .storeButtons  .storeBtn  .storeBtnImg
.ctaBand  .ctaAppIcon
.stickyBar  .barSpacer  .headerCta  .storeCtaSticky  .storeCtaHeader  （常時表示CTA・実装済み）
```

**カード・バッジ**

```
.card  .cardH3  .cardBody  .cardFig
.trustGrid  .trustCard  .trustIcon  .trustH4  .trustBody
.forWhoCard  .forWhoIcon
```

**FAQ**

```
.faqList  .faqItem  .faqQ  .faqQText  .faqMark  .faqA
.faqSample  .faqSampleRow
```

**対比2カラム（D1 / D8）**

```
.compare  .compareWide  .compareD8
.compareCol  .compareColNeutral  .compareColBrand
.compareHead  .compareHeadIcon  .compareHeadChip
.compareList  .compareItem  .compareItemIcon
.compareFoot
```

**注意・引用・リンク**

```
.notice  .noticeIcon  .noticeLabel  .noticeTitle  .noticeBody
.supplement
.quote  .quoteMark  .quoteText  .quoteSource
.policyLinks  .policyLink  .policyLinkIcon  .operator
.anchorLink  .anchorLinkIcon
.chipRow  .chip  .chipOff  .chipOn  .chipIcon
```

**画像スロット**

```
.shot  .shotMedia  .shotContain
.shotPhone  .shotPhoneSm  .shotPlain
.shotPlaceholder  .shotPlaceholderId  .shotPlaceholderText  .shotPlaceholderAr
.figSlot
.shotPair  .shotPairItem
```

**ヒーロー**

```
.heroGrid  .heroCopy  .heroShot
```

**ステップ・フロー**

```
.setupList  .setupItem  .setupNum  .setupTitle  .setupBody
.steps3  .step3Card  .step3Icon  .step3Label  .step3Title  .step3Body  .step3Shot
.flow  .flowCompact  .flowStep  .flowStepFinal  .flowStepLabel  .flowStepValue  .flowStepNote
.flowArrow  .flowArrowIcon  .flowBranch
.grainList  .grainItem  .grainIcon
```

**D2**

```
.d2  .d2Track  .d2TrackLabel  .d2Rail  .d2RailDense  .d2RailSingle  .d2Diary  .d2Note  .d2Axis
```

**D5**

```
.d5  .d5Person  .d5PersonIcon  .d5PersonName  .d5PersonNote
.d5Arrows  .d5Arrow  .d5ArrowBack  .d5ArrowHead  .d5ArrowIcon  .d5ArrowBody
.d5Badges  .d5Badge  .d5BadgeIcon
```

**D9・B7**

```
.d9  .d9Steps  .d9LaneHeads  .d9Step  .d9StepTheirs  .d9StepYours
.d9LaneChip  .d9LaneTheirs  .d9LaneYours  .d9LaneChipIcon
.d9StepNum  .d9StepTitle  .d9StepNote  .d9StepShot
.d9Connector  .d9ConnectorIcon
.proxyBlock  .proxyBlockH3  .proxyBlockBody
```

**B6 キーワード帯**

```
.kwBand  .kwBandH2  .kwBandBody
```

**アニメーション**

```
.fadeIn  .fadeInReady  .isVisible
```

### 9-3. 計測コンポーネント（`StoreCta`）の設置位置と個数 — **A/Bとも4箇所**

| # | A | `size` | 見出し | マイクロコピー | B | `size` | 見出し | マイクロコピー |
|---|---|---|---|---|---|---|---|---|
| 1 | **A1 ヒーロー** | `hero` | 無料でダウンロード | A-CTA-1 | **B1 ヒーロー** | `hero` | 無料でダウンロード | B-CTA-1 |
| 2 | **A3 解決提示**（末尾） | `inline` | なし | なし（または1行） | **B3 何が見える**（末尾） | `block` | 無料でダウンロード | B-CTA-1 |
| 3 | **A5 使い方**（末尾） | `block` | 無料でダウンロード | A-CTA-1 | **B6 プライバシー設計**（末尾） | `inline` | なし | なし（または1行） |
| 4 | **A9 最終CTA** | `final` | 無料でダウンロード | A-CTA-1 | **B9 最終CTA** | `final` | 無料でダウンロード | B-CTA-1 |

**実装上の厳守事項**

1. **生の `<a href={APP_STORE_URL}>` を1つも書かない。** 全て `StoreCta` 経由（計測漏れの最大要因）
2. **`LpProductFooter` のストアボタンは計測対象外**（別コンポーネントのため）。これは設計書 §3 の設計どおりで、CTA 4箇所の数には含めない
3. ヘッダーにストアCTAを置かない（§3-2・§0-1 判断5）
4. B7 にストアCTAを置かない（置くと5箇所になる）
5. `size` の違いは**見た目だけ**。`sendLpEvent` のペイロード（`isoWeek` / `variant` / `type` / `store`）は4箇所すべて同一。**`size` をログに送らない**（設計書 §3-6 の列定義に無い）
6. ストアバッジの並びは **App Store → Google Play** 固定（A/B共通）

### 9-4. 実装の進め方（スクショ未着手でも進められる順序）

| フェーズ | 内容 | スクショ依存 |
|---|---|---|
| **1** | `page.module.css` に §2 のトークンと §3 の共通コンポーネントを実装 | なし |
| **2** | `shots.ts` を全 `src: null` で作成 ＋ `Shot.tsx`（プレースホルダ表示） | なし |
| **3** | `Icon.tsx`（§6-0 / §6-1 / §6-4 / §6-5 / §6-7 のグリフ） | なし |
| **4** | `diagrams/` の D1〜D9 を実装（**全て HTML+CSS**） | なし |
| **5** | `VariantA.tsx` / `VariantB.tsx` を §4 / §5 のワイヤー順に組む | **なし**（プレースホルダで成立） |
| **6** | `lib/ab/*` / `api/lp-event` / `LpImpression` / `StoreCta`（設計書 §3） | なし |
| **7** | `layout.tsx` の metadata 差し替え / JSON-LD / `gentle-diary-faqs.ts` | なし |
| **8** | **撮影画像を `shots.ts` の `src` に入れるだけ** | ここで初めて必要 |
| ~~9~~ | ~~`1.png` / `2.png` の WebP リサイズ~~ → **不要**（§0-2 Q-B で3枚とも不使用に決定） | — |

> **フェーズ 1〜7 はスクショ無しで完了できます。** これがプレースホルダ設計（§7-2）の目的です。

### 9-5. 既存ファイルへの変更（最小限）

| ファイル | 変更 |
|---|---|
| `app/globals.css` | **変更なし** |
| `app/components/LpProductFooter.tsx` / `.module.css` | **変更なし**（`variant="teal"` をそのまま使う） |
| `app/components/FaqAccordion.tsx` / `.module.css` | **変更なし**（使わない。他ページで使用中なので削除もしない） |
| `app/service/products/gentle-diary/layout.tsx` | metadata を設計書 §2-10 に差し替え。`icons` はそのまま |
| `app/service/products/gentle-diary/page.tsx` | 全面書き換え（設計書 §3-4） |
| `app/service/products/gentle-diary/page.module.css` | 全面書き換え（本書 §2・§3・§4〜§6） |
| `app/service/products/gentle-diary/privacy/` `terms/` | **変更なし**（`terms` はコーディネータ修正済み・触らない） |

### 9-6. 実装後のデザイン検証チェックリスト

**トークン・A/B共通性**

- [ ] `page.module.css` 内に `--gd-*` トークンの**再定義が1箇所だけ**（`.root`）であること。`VariantA` / `VariantB` 用の上書きが無いこと
- [ ] `grep -n "#4aa6b1\|#4AA6B1" app/service/products/gentle-diary/page.module.css` の結果が `--gd-teal` の定義行と `::before`/装飾の使用箇所のみで、**文字色・リンク色に使われていない**こと
- [ ] `app/globals.css` の差分が**0行**であること
- [ ] A と B の HTML を取得し、`class="` に現れるクラス名の集合を比較。**B のみに現れるのは** `compareD8` `compareWide` `chipRow` `chip*` `h1Pause` `h1Soft` `kwBand*` `proxyBlock*` `d6*` `d8*` `d9*` `supplement` `d5PersonNote` **に限られる**こと（逆に A のみは `forWhoCard*` `statement` `grainList`→Bにもあるので除く等、想定外の差分が無いこと）

**原則2（Equal Weight）**

- [ ] D1 / D8 の2カラムで `padding` / `font-size` / `border-width` / 本文の `color` が**完全に一致**していること（DevTools の Computed で比較）
- [ ] 「できないこと」「見えません」側に `opacity` / 赤系の色 / `<details>` / `font-size` の縮小が**無い**こと
- [ ] モバイル（375px）で両カラムが同じ幅・同じ padding で縦積みされること

**`.microNote`**

- [ ] `.microNote` が **3箇所**（A: FV / A3 S2下 / —、B: FV / B4 S2下 / —）に出ていること（FAQ Q2 は本文1文目のため `.microNote` クラスは付かない）
- [ ] A と B で**文言が一字一句同一**であること（`grep` で照合）
- [ ] `.microNote` に `font-weight: 700` / ブランドカラー / `.fadeIn` が付いていないこと
- [ ] コントラスト比が 4.5:1 以上（`--gd-bg` / `--gd-bg-alt` / `--gd-bg-soft` / `--gd-surface` の各面で）

**B-H1-1**

- [ ] 375px / 414px / 768px / 1280px / **320px** で**必ず2行**になり、3行に折り返さないこと
- [ ] 1行目と2行目の間に `0.3em` の「ため」があること
- [ ] 「でも、」が `0.78em` / `--gd-text-sub` であること

**CTA**

- [ ] `grep -c "StoreCta" _components/VariantA.tsx` が **4**、`VariantB.tsx` も **4**
- [ ] `grep -rn "APP_STORE_URL\|GOOGLE_PLAY_URL" _components/Variant*.tsx` が **0件**（URL は `StoreCta.tsx` にのみ存在）
- [ ] バッジの並びが全箇所 App Store → Google Play
- [ ] ヘッダー・B7 にストアCTAが無いこと

**D9・注意囲み**

- [ ] `.notice` が**赤系の色を使っていない**こと（`#F87171` / `red` / `--color-danger` が 0件）
- [ ] `.notice` が `.proxyBlock` の**内側**にあること（別 `<section>` になっていない）
- [ ] `.notice` が `<details>` に入っていないこと
- [ ] D9 のレーン区別が**色以外にも**（テキスト／塗り vs 枠線／実線 vs 破線／アイコン）存在すること

**引用**

- [ ] `.quote` が `<blockquote>` + `<cite>` で実装されていること
- [ ] 引用文が `terms/page.tsx` 第7条3項と**一字一句一致**すること
- [ ] `.quote` の直下（24px）に `.policyLinks` があること

**禁止モチーフ**

- [ ] 盾・鎧・SOS・サイレン・警察・救急・監視カメラのアイコンが**1つも無い**こと
- [ ] 図解・本文に**数字（DL数・評価・ユーザー数・%）が無い**こと（「20分」「1km」「2日分」「10日」「3時」のみ可）
- [ ] 人物アイコンに制服・ランドセル・年齢特定描写が無いこと
- [ ] `alt` に「（近日公開）」が **0件**（`grep -rn "近日公開" app/service/products/gentle-diary/`）

**アクセシビリティ**

- [ ] `:focus-visible` のリングが全フォーカス可能要素で見えること（Tab で一巡）
- [ ] CTAバンド上のフォーカスリングが白であること
- [ ] `prefers-reduced-motion: reduce` でフェードイン・hover transform が止まること
- [ ] **JS を無効化してもコンテンツが全て見える**こと（`.fadeIn` の既定が `opacity: 1`）
- [ ] `h1` が1つ、`h2` → `h3` の階層が飛んでいないこと（B6 の `h2` 2つは仕様）
- [ ] 375px でズーム200%にして横スクロールが出ないこと
- [ ] `<details>` が閉じている状態でも**回答テキストが HTML に存在**すること（`curl` した HTML を `grep`）

**レスポンシブ**

- [ ] 320 / 375 / 414 / 768 / 1024 / 1280 / 1600px で横スクロールが出ないこと
- [ ] `.shotPlaceholder` と実画像で**レイアウトが1pxも動かない**こと（`src` を差し替えて比較）
- [ ] `.compare` / `.steps3` / `.flow` / `.d5` / `.d9Steps` が指定どおりに縦積みへ組み替わること

**パフォーマンス**

- [ ] ヒーロー S1 に `priority`、他は遅延ロード
- [ ] `1.png` / `2.png` が WebP にリサイズされ、各 50KB 未満であること
- [ ] ヒーローに `.fadeIn` が付いていないこと（LCP）

### 9-7. デザイン上の「やらないこと」（意図の記録）

| やらないこと | 理由 |
|---|---|
| コーポレートのダークテーマを使う | このLPが扱う感情（不安・後ろめたさ）にダーク面は不適。かつ Duosub（明面）が確立した「プロダクトLPは別ブランド」の作法に反する |
| A/B で配色を変える | 設計書 §1-3 の前提（色違いABにしない）。独立変数はターゲットセグメントのみ |
| D1〜D9 を画像で書き出す | 文字が読めない・読み上げられない・SEOに乗らない・修正コストが高い（§6-0） |
| 「できないこと」を折りたたむ・薄くする | 誠実さがこのセグメントに対する信頼の作り方（設計書 §2-3-4）。CVR より優先する線 |
| `.microNote` を目立たせる | 設計書 §2-2「主張を奪わない」。H1 の主張を割らないため |
| ヒーローに「お問い合わせ」を置く | 設計書 §2-6（インストールへの一点集中） |
| ヘッダー／B7 にストアCTAを置く | CTA 4箇所の計測設計を守る（§0-1 判断5） |
| ~~追従ストアバーを入れる~~ | **この禁止は撤回**。§0-2 Q-A の再決定（2026-10-09）により常時表示CTAを実装済み |
| 既存 `FaqAccordion` を流用する | 閉じた回答が DOM に無く、§3-10 のSEO前提が崩れる（§3-7） |
| `globals.css` を触る | LP固有の値をグローバルに漏らさない。他ページへの副作用を作らない |
| 既存イラストを端末フレームに入れる | 実画面スクショと混同させない（§7-3） |
| 赤い警告色を使う | 設計書 §4-3 D9・原則5（不安を煽らない） |

---

## 付録: 変更履歴

| 版 | 日付 | 内容 |
|---|---|---|
| 初版 | 2026-10-08 | `docs/gentle-diary-lp-ab-content-plan.md` 第3版を入力として全面策定 |

## 付録: `.claude/skills/web-design-system/design-spec.md` への追補の必要性

本LPは **`--gd-` 接頭辞でLP内に閉じたトークン体系**であり、コーポレートのデザインシステム（`globals.css` / サイト共通仕様）には**一切影響しません**。したがってサイト共通のデザイン仕様書への追補は不要です。

ただし、**「プロダクトLPはLPローカルトークン（`--ds-` / `--gd-` 等の接頭辞）でサイト共通トークンから独立させる」という作法**は、Duosub（2026-10-08・commit 155768f）と本LPで2例目となり、事実上の標準になりました。次回サイト共通仕様書を更新する際に、§対象外の記述（「各プロダクト専用の別ブランドLP」）の補足として**この作法を1段落で明文化しておくこと**を推奨します（本書では共通仕様書の改変はスコープ外としています）。
