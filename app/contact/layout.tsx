import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "無料相談のご予約",
  description:
    "GOWS合同会社への無料相談のご予約。DX推進、AI活用（AX）、システム開発などに関するご相談を承ります。",
  path: "/contact",
  keywords: ["無料相談", "GOWS", "DX", "AX", "AI", "システム開発"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
