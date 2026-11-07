/**
 * OGP画像に入れる文言（docs/ogp-image-design-spec.md §4.2・§5.3）。
 * 文言はすべて各ページに既にある文章を使う。改行位置はここで決める（自動折り返しはしない）。
 *
 * ニュース（/news とその配下）と自社プロダクトLPはページ別OGPを作らない。
 * これらのページは createPageMetadata() に画像を明示的に渡している。
 */

export type OgTitleSegment = { text: string; accent?: boolean };
/** 文字列、または色を変える部分を含む行（accent は #14509E） */
export type OgTitleLine = string | OgTitleSegment[];

export type OgTitleSize = 56 | 48 | 40 | 34;

export type OgHomeContent = {
  kind: "home";
  path: "/";
  catchLines: string[];
  tagline: string;
  descriptionLines: string[];
};

export type OgPageContent = {
  kind: "page";
  /** エラーメッセージ用のルート */
  path: string;
  /** [前半(pit-blue), 後半(dock-blue)] */
  label?: [string, string];
  titleLines: OgTitleLine[];
  titleSize: OgTitleSize;
  /** 最大2行 */
  subLines?: string[];
};

export type OgContent = OgHomeContent | OgPageContent;

export const OG_HOME: OgHomeContent = {
  kind: "home",
  path: "/",
  catchLines: ["テクノロジーを味方に、", "走り続ける"],
  tagline: "DX・AXコンサルティング × システム開発",
  descriptionLines: [
    "PitDockは、DX・AXコンサルティングやシステム開発を通じて、",
    "お客様が成長し続けるための変革を共に進めるパートナーです。",
  ],
};

export const OG_PAGES = {
  "/service/dx-ax": {
    kind: "page",
    path: "/service/dx-ax",
    label: ["DX / AX", "Consulting."],
    titleLines: ["DX・AXコンサルティング"],
    titleSize: 48,
    subLines: ["AIとデジタルの力で、事業の変革を加速する。"],
  },
  "/service/system-dev": {
    kind: "page",
    path: "/service/system-dev",
    label: ["System", "Development."],
    titleLines: ["システム開発"],
    titleSize: 56,
    subLines: [
      "課題を深く理解した設計と、全工程自社完結の開発力で、",
      "低コスト・短納期・高品質なシステムを提供します。",
    ],
  },
  "/service/tech-advisor": {
    kind: "page",
    path: "/service/tech-advisor",
    label: ["Technical", "Advisory."],
    titleLines: ["技術顧問"],
    titleSize: 56,
    subLines: ["採用コストゼロ、雇用リスクゼロ。"],
  },
  // lead がないため、app/service/products/layout.tsx の description の最初の1文を使う
  "/service/products": {
    kind: "page",
    path: "/service/products",
    titleLines: ["自社プロダクト"],
    titleSize: 56,
    subLines: ["PitDock株式会社が開発・運営する自社プロダクト一覧。"],
  },
  // lead がないため、app/company-info/layout.tsx の description の2文目を使う（1文目は見出しと同じ内容のため）
  "/company-info": {
    kind: "page",
    path: "/company-info",
    titleLines: ["会社概要"],
    titleSize: 56,
    subLines: ["DX・AXコンサルティング、システム開発、", "自社プロダクトの開発・運営を行っています。"],
  },
  "/contact": {
    kind: "page",
    path: "/contact",
    titleLines: ["「まだ何も決まっていない」", "から、どうぞ。"],
    titleSize: 40,
    subLines: ["DX推進、AI活用、システム開発、技術顧問。"],
  },
  "/partner": {
    kind: "page",
    path: "/partner",
    titleLines: [
      "あなたの専門性を、",
      [{ text: "本物の課題解決", accent: true }, { text: "に" }],
      "使ってほしい。",
    ],
    titleSize: 48,
    subLines: ["PitDock株式会社は、DX・AX推進と", "システム開発を手がけています。"],
  },
  "/privacy": {
    kind: "page",
    path: "/privacy",
    titleLines: ["プライバシーポリシー"],
    titleSize: 56,
  },
  "/personal-info": {
    kind: "page",
    path: "/personal-info",
    titleLines: ["個人情報の", "取り扱いについて"],
    titleSize: 56,
  },
} satisfies Record<string, OgPageContent>;

export type OgPagePath = keyof typeof OG_PAGES;
