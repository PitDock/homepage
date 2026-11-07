import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/seo/metadata";
import { HOME_OG_IMAGE, SITE_NAME } from "../../lib/seo/site";

export const metadata: Metadata = createPageMetadata({
  title: "News",
  description:
    "PitDock株式会社の最新情報・プレスリリース一覧。新サービス開始、メディア掲載、自社プロダクトのアップデートなどをお届けします。",
  path: "/news",
  // ページ別OGPは作らず、トップページの画像を使う
  image: HOME_OG_IMAGE,
  imageAlt: SITE_NAME,
  keywords: ["PitDock", "ニュース", "プレスリリース", "新着情報", "サービス開始", "メディア掲載"],
});

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
