/**
 * アプリ実画面スクリーンショットのレジストリ（設計仕様書 §7-2）。
 *
 * 撮影完了後は、このファイルの `src` を null → パスに書き換えるだけで全箇所が差し替わる。
 * `aspect-ratio` は枠（.shotMedia）側が持つため、差し替えでレイアウトは1pxも動かない。
 * 配置先: public/images/products/GentleDiary/
 */
export type ShotId = "S1" | "S2" | "S3" | "S4" | "S6" | "S7a";

export type ShotSpec = {
  /** CSS aspect-ratio に渡す値 */
  ar: string;
  /** プレースホルダに出すラベル */
  label: string;
  /** 設計書 §2-12 の alt 文言 */
  alt: string;
  /** 撮影前は null。撮影後にパスを入れるだけで全箇所が差し替わる */
  src: string | null;
  /** 入稿画像の実寸（next/image 用） */
  width: number;
  height: number;
};

export const SHOTS: Record<ShotId, ShotSpec> = {
  S1: {
    ar: "1168 / 2093",
    label: "タイムライン画面",
    src: "/images/products/GentleDiary/timeline.jpg",
    width: 1168,
    height: 2093,
    alt: "Gentle Diary の画面。自動でできた位置情報日記に、時刻と「〇〇周辺」の場所が並んでいる",
  },
  S2: {
    ar: "1127 / 628",
    label: "日記カード拡大",
    src: "/images/products/GentleDiary/diary_card.jpg",
    width: 1127,
    height: 628,
    alt: "位置情報日記の拡大表示。「13:20頃 東京スカイツリー周辺」「13:40頃 自宅付近」のように、20分単位の時刻と周辺表記の場所が並ぶ",
  },
  S3: {
    ar: "1170 / 1602",
    label: "閲覧権限画面",
    src: "/images/products/GentleDiary/viewing.png",
    width: 1170,
    height: 1602,
    alt: "Gentle Diary の閲覧権限画面。日記を見せる相手を承認制で管理できる",
  },
  S4: {
    ar: "1170 / 870",
    label: "閲覧申請モーダル",
    src: "/images/products/GentleDiary/viewing_permission.png",
    width: 1170,
    height: 870,
    alt: "Gentle Diary の閲覧申請画面。相手のメールアドレスを入力して日記の閲覧を申請する",
  },
  S6: {
    ar: "1170 / 2406",
    label: "ログイン画面",
    src: "/images/products/GentleDiary/login.jpg",
    width: 1170,
    height: 2406,
    alt: "Gentle Diary のログイン画面。メールアドレスだけでログインでき、パスワードは不要",
  },
  S7a: {
    ar: "1170 / 2286",
    label: "権限ダイアログ（iOS）",
    src: "/images/products/GentleDiary/location_permission2.png",
    width: 1170,
    height: 2286,
    alt: "位置情報の許可で「常に許可」を選ぶ画面。カップル 位置共有や家族 見守りで位置情報日記を作るために必要",
  },
};
