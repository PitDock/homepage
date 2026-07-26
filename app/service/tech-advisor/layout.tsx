import type { Metadata } from "next";
import { createPageMetadata } from "../../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "技術顧問",
  description:
    "採用コストゼロ、雇用リスクゼロ。経営と技術の両方がわかる外部CTOが、月額2万円からあなたの会社の意思決定を支えます。GOWS合同会社の技術顧問サービス。",
  path: "/service/tech-advisor",
  keywords: [
    "技術顧問",
    "外部CTO",
    "CTO",
    "技術的意思決定",
    "アーキテクチャ設計",
    "技術選定",
    "開発会社 折衝",
    "エンジニア採用",
    "月額",
    "スモールスタート",
    "GOWS",
  ],
});

export default function TechAdvisorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
