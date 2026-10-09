import type { Metadata } from "next";
import { createPageMetadata } from "../../../../lib/seo/metadata";
import {
  PAGE_DESCRIPTION,
  PAGE_KEYWORDS,
  PAGE_PATH,
  PAGE_TITLE,
} from "./_components/copy";

// title / description / keywords / canonical は A/B で変えない（設計書 §3-10 SEO交絡防止）
export const metadata: Metadata = {
  ...createPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    absoluteTitle: true,
    image: "/images/products/GentleDiary.png",
    imageAlt: "Gentle Diary のアプリアイコン",
    keywords: PAGE_KEYWORDS,
  }),
  icons: {
    icon: "/images/products/GentleDiary.png",
  },
};

export default function GentleDiaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
