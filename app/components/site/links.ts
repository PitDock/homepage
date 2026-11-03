// サイト共通（ヘッダー・フッター・トップページ）で使うリンク先。
// 無料相談フォームに営業の連絡が大量に届くのを避けるため、
// 「無料相談」系と「お問い合わせ」系でフォームを分けている。

/** 無料相談フォーム（「無料相談を予約する」「詳しく相談する」） */
export const CONSULT_URL = "/contact";
/** お問い合わせフォーム（ヘッダー・フッター・メニューの「お問い合わせ」） */
export const INQUIRY_URL = "https://forms.gle/9EPiyGuYy5HdvDVZ8";

export type NavItem = {
  label: string;
  href: string;
  /** ヘッダーではプルダウン、メニューでは字下げして表示する下層リンク */
  children?: { label: string; href: string }[];
};

/** トップページ内のセクションへのリンクは、どのページからでも飛べるよう "/#..." で書く */
export const homeNavItems: NavItem[] = [
  { label: "サービス", href: "/#services" },
  { label: "コラム", href: "/#column" },
  { label: "会社概要", href: "/company-info" },
  { label: "お知らせ", href: "/news" },
];

/** サービスの各ページ（ヘッダー・メニューの「サービス」の下層） */
export const serviceNavItems = [
  { label: "DX/AXコンサルティング", href: "/service/dx-ax" },
  { label: "システム開発", href: "/service/system-dev" },
  { label: "技術顧問", href: "/service/tech-advisor" },
  { label: "自社プロダクト", href: "/service/products" },
];

/** ヘッダー・メニュー用（「サービス」に下層リンクを付け、フッターには載せない「パートナー募集」を加える） */
export const headerNavItems: NavItem[] = [
  ...homeNavItems.map((item) => (item.href === "/#services" ? { ...item, children: serviceNavItems } : item)),
  { label: "パートナー募集", href: "/partner" },
];
