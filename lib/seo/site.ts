/** 本番サイトの正規 URL（環境変数で上書き可能） */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://gows-llc.com")
);

export const SITE_NAME = "GOWS合同会社";
export const SITE_NAME_EN = "GOWS Inc.";
export const SITE_DESCRIPTION =
  "中小企業・スタートアップのDX推進・AI活用（AX）を戦略立案から実装まで支援。GOWS合同会社のITコンサルティング・システム開発サービス。";

export const DEFAULT_OG_IMAGE = "/images/gows_favicon.png";

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "GOWS合同会社",
  alternateName: SITE_NAME_EN,
  url: SITE_URL,
  logo: `${SITE_URL}/images/gows_favicon.png`,
  foundingDate: "2024-04-08",
  address: {
    streetAddress: "神泉町10-15-301",
    addressLocality: "渋谷区",
    addressRegion: "東京都",
    postalCode: "150-0045",
    addressCountry: "JP",
  },
  sameAs: [
    "https://www.linkedin.com/company/gows-inc",
    "https://x.com/gows_ktma",
    "https://www.instagram.com/gows_ktma/",
  ],
} as const;

export const PUBLISHER_ID = `${SITE_URL}/#organization`;
