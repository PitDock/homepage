import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "./components/JsonLd";
import { createPageMetadata } from "../lib/seo/metadata";
import { faqPageJsonLd, organizationJsonLd, webSiteJsonLd } from "../lib/seo/json-ld";
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/seo/site";
import "./globals.css";

const homeTitle = `${SITE_NAME} | DX・AXコンサルティング・システム開発`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: homeTitle,
  },
  ...createPageMetadata({
    title: homeTitle,
    description: SITE_DESCRIPTION,
    path: "/",
    skipTitle: true,
    image: DEFAULT_OG_IMAGE,
    imageAlt: SITE_NAME,
    keywords: [
      "GOWS",
      "DX",
      "AX",
      "AI活用",
      "ITコンサルティング",
      "システム開発",
      "中小企業",
      "スタートアップ",
    ],
  }),
  icons: {
    icon: "/images/gows_favicon.png",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd(), faqPageJsonLd()]} />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
