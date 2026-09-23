import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "無料相談のご予約（30分・オンライン）",
  description:
    "DX推進・AI活用（AX）・システム開発に関するご相談を、30分・オンラインで無料でお受けします。「何から始めるべきか分からない」「費用感だけ知りたい」段階でも歓迎です。売り込みはせず、その場で契約を迫ることもありません。翌営業日までにご連絡します。夜間・土日の相談にも対応。",
  path: "/contact",
  keywords: [
    "無料相談",
    "PitDock",
    "DX",
    "AX",
    "AI活用",
    "システム開発",
    "ITコンサルティング",
    "DX 相談",
    "技術顧問",
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
