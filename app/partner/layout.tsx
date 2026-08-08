import { createPageMetadata } from "../../lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "フリーランスパートナー募集（業務委託） | PitDock株式会社",
  description:
    "PitDock株式会社は、DX・AXコンサルティングとシステム開発の案件に参画するフリーランスパートナーを随時募集しています。週2日〜の稼働、業務委託契約。上流から一緒に課題解決に取り組みませんか。",
  path: "/partner",
  keywords: [
    "フリーランス",
    "パートナー募集",
    "業務委託",
    "DXコンサルタント",
    "エンジニア募集",
    "AIエンジニア",
    "PitDock",
  ],
});

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
