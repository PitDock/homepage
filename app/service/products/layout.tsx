import type { Metadata } from "next";
import { createPageMetadata } from "../../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "自社プロダクト",
  description:
    "GOWS合同会社が開発・運営する自社プロダクト一覧。Duosub（英語学習）、Gentle Diary（見守り）、dinder（飲食店選び）など。",
  path: "/service/products",
  keywords: ["Duosub", "Gentle Diary", "dinder", "GOWS", "アプリ"],
});

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
