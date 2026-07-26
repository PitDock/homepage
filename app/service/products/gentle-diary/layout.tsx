import type { Metadata } from "next";
import { createPageMetadata } from "../../../../lib/seo/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Gentle Diary | やさしく見守る行動要約アプリ",
    description:
      "リアルタイムな位置情報の共有はしない。1日の行動をやさしく要約して届ける、家族や大切な人のための見守りアプリ。",
    path: "/service/products/gentle-diary",
    absoluteTitle: true,
    image: "/images/products/GentleDiary.png",
    imageAlt: "Gentle Diary ロゴ",
    keywords: ["Gentle Diary", "見守り", "位置情報", "プライバシー", "日記", "自動", "家族", "恋人"],
  }),
  icons: {
    icon: "/images/products/GentleDiary.png",
  },
};

export default function GentleDiaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
