/**
 * A/B で一字一句同一にしなければならない文言を1箇所に集約する。
 * （片方だけ修正されるとABテストの交絡要因になるため・設計書 §1-3 / §3-11）
 */

/* ===== ページメタ（layout.tsx / JSON-LD で共用。A/B共通・設計書 §2-10）===== */
export const PAGE_PATH = "/service/products/gentle-diary";
export const PAGE_TITLE =
  "Gentle Diary｜現在地は見せない位置情報共有アプリ｜カップル・家族の位置情報日記";
export const PAGE_DESCRIPTION =
  "「今どこ」は共有しない、監視しない位置共有。1日の行動を自動でまとめた位置情報日記が、承認した相手にだけ届きます。リアルタイム追跡はしません。カップル・夫婦の位置共有、家族の見守りに。iOS / Android、無料。";
export const PAGE_KEYWORDS = [
  "Gentle Diary",
  "位置情報共有 アプリ",
  "カップル 位置共有",
  "家族 見守り",
  "監視しない 位置共有",
  "位置情報 日記",
  "リアルタイム共有しない",
  "プライバシー",
  "夫婦 位置共有",
];

/* ===== ストアURL（StoreCta と JSON-LD / フッターで共用）===== */
export const APP_STORE_URL =
  "https://apps.apple.com/jp/app/gentle-diary-%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0%E5%85%B1%E6%9C%89%E3%81%97%E3%81%AA%E3%81%84%E4%BD%8D%E7%BD%AE%E6%83%85%E5%A0%B1%E6%97%A5%E8%A8%98/id6758263521";
export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.gentlediary&hl=ja";

/* ===== リンク ===== */
export const PRIVACY_PATH = "/service/products/gentle-diary/privacy";
export const TERMS_PATH = "/service/products/gentle-diary/terms";
export const COMPANY_PATH = "/company-info";

/* ===== 「日記」の補足文（設計書 §2-2・A/B同一文言・所定3箇所）===== */
/** ① ファーストビュー サブコピー直下（短縮版） */
export const MICRO_NOTE_SHORT =
  "※日記といっても、書く必要はありません。時刻と場所のリストが自動でできます。";
/**
 * ② S2 スクショ直下のキャプション（全文版）。③ FAQ Q2 の回答1文目にも同文が入る。
 * キャプションでは文ごとに改行したいので配列を正とし、連結したものを MICRO_NOTE_FULL とする
 * （FAQ 本文・JSON-LD は連結版を使うため、文言がズレることがない）
 */
export const MICRO_NOTE_FULL_LINES = [
  "※日記といっても、文章を書く必要はありません。",
  "1日の行動が「時刻と場所」のリストに自動でまとめられます。",
];
export const MICRO_NOTE_FULL = MICRO_NOTE_FULL_LINES.join("");

/* ===== CTA（設計書 §2-6）===== */
export const CTA_HEADING = "無料でダウンロード";
export const A_CTA_NOTE = "無料。相手に現在地が見えることはありません。";
export const B_CTA_NOTE =
  "無料。居場所を追いかけずに、1日の無事だけがわかります。見守る相手の端末にも登録が必要ですが、あなたが代理で設定できます。";

/* ===== 言い換え禁止の確定文言（設計書 §2-8）===== */
/** FAQ Q3・社会的証明セクション・図解 D1 / D6 の3系統で同一文言を使う */
export const THIRD_PARTY_STATEMENT =
  "場所名への変換に利用する外部地図サービス以外に、位置データを第三者に提供しません。";
/** terms/page.tsx 第7条3項からの引用。一字一句変えない */
export const TERMS_QUOTE =
  "本サービスには、リアルタイムの位置情報を第三者と共有する機能がありません";

/* ===== A/B共通のH2（設計書 §2-11。SEO交絡防止のため両方に同一文言で置く）===== */
export const H2_VISIBILITY = "相手に何が見える？ 見えるもの・見えないもの";
export const H2_GRANULARITY = "届くのは、1日分の位置情報日記だけ";
export const H2_HOWTO = "使い方は3ステップ。位置情報日記が自動でできるまで";
export const H2_FOR_WHO = "カップル・夫婦の位置共有に、家族の見守りに";
export const H2_PRIVACY = "監視しない位置共有のための、プライバシー設計";
export const H2_FAQ = "よくあるご質問";

/* ===== D2 のキャプション（A/Bで異なる唯一の図の差分）===== */
export const D2_CAPTION_A = "ずっと見える必要は、たぶんなかった。";
export const D2_CAPTION_B = "ずっと見ていなくても、見守ることはできる。";

/* ===== 粒度3点（A3 / B4・順序のみ各セクションの文脈に合わせる）===== */
export const GRAIN_TIME = "時刻は20分単位のおおよその表記になります（「12:20頃」など）";
export const GRAIN_PLACE = "場所は「〇〇周辺」という粒度までぼかされます";
export const GRAIN_HOME = "自宅から約1km以内はすべて「自宅付近」とだけ表示されます";

/* ===== アプリアイコン ===== */
export const ICON_SRC = "/images/products/GentleDiary.png";
export const ICON_ALT = "Gentle Diary のアプリアイコン";
