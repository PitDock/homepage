import type { Metadata } from "next";
import { createPageMetadata } from "../../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "システム開発",
  description:
    "GOWS合同会社のシステム開発サービス。Webアプリ・ネイティブアプリ・業務システム等を中心に、要件定義から設計・開発・運用まで伴走します。",
  path: "/service/system-dev",
  keywords: ["システム開発", "AI開発", "Webアプリ", "ネイティブアプリ", "モバイルアプリ", "業務システム", "SaaS", "API", "クラウド", "GOWS"],
});

export default function SystemDevLayout({ children }: { children: React.ReactNode }) {
  return children;
}
