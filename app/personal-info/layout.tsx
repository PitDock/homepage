import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "個人情報の取り扱い",
  description:
    "GOWS合同会社における個人情報の取り扱いについて。",
  path: "/personal-info",
});

export default function PersonalInfoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
