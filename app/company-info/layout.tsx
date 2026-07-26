import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "会社概要",
  description:
    "GOWS合同会社（GOWS Inc.）の会社概要。DX・AXコンサルティング、システム開発、自社プロダクトの開発・運営を行っています。",
  path: "/company-info",
  keywords: ["GOWS", "ITコンサルティング", "DX", "AX", "AI", "システム開発", "自社プロダクト", "小山望海"],
});

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
