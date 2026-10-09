import type { ReactNode } from "react";

/**
 * 図解・バッジ用のインラインSVGアイコン集（設計仕様書 §6-0 の共通仕様）。
 *
 * viewBox 0 0 24 24 / fill none / stroke currentColor / stroke-width 1.75 /
 * linecap-linejoin round / aria-hidden（意味はテキストが担保する）。
 * 表示サイズは呼び出し側の CSS クラス（width/height）で決める。
 *
 * 禁止モチーフ（§1 原則5）: 盾・鎧・防壁・SOS・サイレン・警察・救急・監視カメラ・
 * 大きな目のモチーフ・赤い警告。ここには1つも入れていない。
 */
export type IconName =
  | "eyeOff"
  | "note"
  | "noteCheck"
  | "circleMinus"
  | "circleCheck"
  | "check"
  | "minus"
  | "mapOff"
  | "homeLock"
  | "peopleCheck"
  | "clockTrash"
  | "trash"
  | "person"
  | "arrowRight"
  | "lockCheck"
  | "linkOff"
  | "phonePocket"
  | "moonClock"
  | "mailOpen"
  | "phone"
  | "phonePerson"
  | "warning"
  | "document"
  | "relation"
  | "switchDirection"
  | "distance";

const GLYPHS: Record<IconName, ReactNode> = {
  // 目に斜線（D1「見えません」・20〜22pxまで。大きく使わない）
  eyeOff: (
    <>
      <path d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6Z" />
      <circle cx="12" cy="12" r="2.6" />
      <line x1="4" y1="20" x2="20" y2="4" />
    </>
  ),
  // ノート（D1「相手に見えるのはこれだけ」・D2 の日記アイコン）
  note: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <line x1="8.6" y1="3" x2="8.6" y2="21" />
      <line x1="11.6" y1="9.5" x2="16" y2="9.5" />
      <line x1="11.6" y1="13.5" x2="16" y2="13.5" />
    </>
  ),
  // ノート＋チェック（B1 の肯定チップ）
  noteCheck: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <polyline points="8.8,12 11,14.2 15.2,9.6" />
    </>
  ),
  // 丸に横棒（否定側の項目。✕ではない・赤でもない）
  circleMinus: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  circleCheck: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="8.5,12.2 11,14.7 15.5,9.8" />
    </>
  ),
  check: <polyline points="4.5,12.6 9.4,17.5 19.5,7" />,
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
  // 折り畳み地図の輪郭＋斜線（「地図はない」の意味でのみ使う）
  mapOff: (
    <>
      <path d="M3 7.5 9 5l6 2.5L21 5v12l-6 2.5L9 17l-6 2.5v-12Z" />
      <line x1="9" y1="5" x2="9" y2="17" />
      <line x1="15" y1="7.5" x2="15" y2="19.5" />
      <line x1="4" y1="20.5" x2="20" y2="3.5" />
    </>
  ),
  // 家＋鍵（盾・金庫は使わない）
  homeLock: (
    <>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z" />
      <rect x="9.4" y="13.2" width="5.2" height="4.6" rx="1.1" />
      <path d="M10.7 13.2v-1.1a1.3 1.3 0 0 1 2.6 0v1.1" />
    </>
  ),
  // 人物2つ＋チェック（握手は40pxで潰れるため使わない）
  peopleCheck: (
    <>
      <circle cx="7.6" cy="8.6" r="2.6" />
      <path d="M3.4 17.6c0-2.4 1.9-4.2 4.2-4.2" />
      <circle cx="16.4" cy="8.6" r="2.6" />
      <path d="M20.6 17.6c0-2.4-1.9-4.2-4.2-4.2" />
      <polyline points="9.4,17.4 11.4,19.4 14.8,15.6" />
    </>
  ),
  // 時計＋ゴミ箱（砂時計・タイマーは使わない）
  clockTrash: (
    <>
      <circle cx="9.8" cy="9.8" r="6.3" />
      <polyline points="9.8,6.2 9.8,9.8 12.4,11.2" />
      <line x1="14.8" y1="17" x2="21.5" y2="17" />
      <path d="M16.2 17l.7 4.2h3.4l.7-4.2" />
    </>
  ),
  trash: (
    <>
      <line x1="4" y1="7" x2="20" y2="7" />
      <path d="M9.2 7V5.2a1.2 1.2 0 0 1 1.2-1.2h3.2a1.2 1.2 0 0 1 1.2 1.2V7" />
      <path d="M6.2 7l.9 12.2a1.2 1.2 0 0 0 1.2 1.1h7.4a1.2 1.2 0 0 0 1.2-1.1L17.8 7" />
    </>
  ),
  // 年齢・性別の記号を付けないシルエット
  person: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
    </>
  ),
  arrowRight: (
    <>
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="14,7 19,12 14,17" />
    </>
  ),
  // 南京錠＋チェック（鍵＋承認）
  lockCheck: (
    <>
      <rect x="5" y="10.4" width="14" height="10.2" rx="2" />
      <path d="M8.6 10.4V8a3.4 3.4 0 0 1 6.8 0v2.4" />
      <polyline points="9.8,15.5 11.5,17.2 14.4,13.9" />
    </>
  ),
  // 鎖の輪が外れた形（いつでも解除）
  linkOff: (
    <>
      <path d="M9.6 14.4 7.2 16.8a3.4 3.4 0 0 1-4.8-4.8l2.4-2.4" />
      <path d="M14.4 9.6l2.4-2.4a3.4 3.4 0 0 1 4.8 4.8l-2.4 2.4" />
      <line x1="11.4" y1="5.2" x2="11.4" y2="2.6" />
      <line x1="12.6" y1="21.4" x2="12.6" y2="18.8" />
    </>
  ),
  // ポケットに入ったスマホ（GPS電波・アンテナ波紋は使わない）
  phonePocket: (
    <>
      <rect x="7.6" y="3" width="8.8" height="12.4" rx="2" />
      <path d="M3.2 21c0-4.3 2.2-7.6 5-8.6" />
      <path d="M20.8 21c0-4.3-2.2-7.6-5-8.6" />
    </>
  ),
  // 三日月＋小さな時計（3時）
  moonClock: (
    <>
      <path d="M15.6 3.2A8.4 8.4 0 1 0 19.4 12.6" />
      <circle cx="17.6" cy="17.6" r="4" />
      <polyline points="17.6,15.7 17.6,17.6 19.3,17.6" />
    </>
  ),
  // 封筒を開いた形＋中に横線2本（ベル・通知バッジは使わない）
  mailOpen: (
    <>
      <path d="M3.4 9.6 12 3.2l8.6 6.4" />
      <rect x="3.4" y="9.6" width="17.2" height="11.2" rx="1.6" />
      <line x1="7.8" y1="14" x2="16.2" y2="14" />
      <line x1="7.8" y1="17.4" x2="13" y2="17.4" />
    </>
  ),
  // スマホ（無地画面）= D9「相手の端末」
  phone: (
    <>
      <rect x="6.6" y="2.6" width="10.8" height="18.8" rx="2.6" />
      <line x1="10.4" y1="5.6" x2="13.6" y2="5.6" />
    </>
  ),
  // スマホ＋人物（小）= D9「あなたの端末」
  phonePerson: (
    <>
      <rect x="3.4" y="3" width="9.6" height="18" rx="2.4" />
      <circle cx="18.2" cy="9.2" r="2" />
      <path d="M15.2 17.4c0-1.9 1.3-3.3 3-3.3s3 1.4 3 3.3" />
    </>
  ),
  // 注意三角（赤ではなくアンバーで塗る）
  warning: (
    <>
      <path d="M12 3.6 2.6 20.4h18.8L12 3.6Z" />
      <line x1="12" y1="9.6" x2="12" y2="14.4" />
      <line x1="12" y1="17.2" x2="12" y2="17.4" />
    </>
  ),
  document: (
    <>
      <path d="M6 3h7l5 5v12.4a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6V3.6A.6.6 0 0 1 6 3Z" />
      <polyline points="13,3 13,8 18,8" />
    </>
  ),
  // 2つの円が重なる＝関係性
  relation: (
    <>
      <circle cx="9.4" cy="12" r="5.6" />
      <circle cx="14.6" cy="12" r="5.6" />
    </>
  ),
  // 矢印が別方向に向き直る＝乗り換え
  switchDirection: (
    <>
      <line x1="4" y1="8.5" x2="20" y2="8.5" />
      <polyline points="16.2,4.7 20,8.5 16.2,12.3" />
      <line x1="20" y1="15.5" x2="4" y2="15.5" />
      <polyline points="7.8,11.7 4,15.5 7.8,19.3" />
    </>
  ),
  // 離れた2点を結ぶ線
  distance: (
    <>
      <circle cx="5.2" cy="12" r="2.4" />
      <circle cx="18.8" cy="12" r="2.4" />
      <line x1="8.4" y1="12" x2="15.6" y2="12" strokeDasharray="2 2.6" />
    </>
  ),
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}

export default Icon;
