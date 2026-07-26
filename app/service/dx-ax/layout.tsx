import type { Metadata } from "next";
import { createPageMetadata } from "../../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DX・AXコンサルティング",
  description:
    "中小企業・スタートアップ向けのDX・AX（AI活用）コンサルティング。戦略立案から業務改革、AI導入、運用定着まで一貫して支援します。",
  path: "/service/dx-ax",
  keywords: ["DX", "AX", "AI活用", "ITコンサルティング", "業務改革", "戦略立案", "新規事業", "補助金申請", "GOWS"],
});

export default function DxAxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
