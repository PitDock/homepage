import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "会社概要",
  description:
    "PitDock株式会社（PitDock, Inc.）の会社概要。DX・AXコンサルティング、システム開発、自社プロダクトの開発・運営を行っています。",
  path: "/company-info",
  keywords: ["PitDock", "ITコンサルティング", "DX", "AX", "AI", "システム開発", "自社プロダクト", "小山望海"],
});

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
