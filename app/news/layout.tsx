import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "News",
  description:
    "GOWS合同会社の最新情報・プレスリリース一覧。新サービス開始、メディア掲載、自社プロダクトのアップデートなどをお届けします。",
  path: "/news",
  keywords: ["GOWS", "ニュース", "プレスリリース", "新着情報", "サービス開始", "メディア掲載"],
});

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
