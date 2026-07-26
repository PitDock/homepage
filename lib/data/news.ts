// ニュースデータの共通定義
// トップページ (app/page.tsx) と /news ページ (app/news/page.tsx) で共有する。
// 件数が増えた場合や CMS 連携を行う際はここを起点に改修すること。

export type NewsEntry = {
  id: number;
  tags: string[];
  date: string;
  title: string;
  url: string;
};

export const news: NewsEntry[] = [
  {
    id: 1,
    tags: ["プレスリリース", "Duosub"],
    date: "2025.01.30",
    title: "海外映画・ドラマの英語字幕表示アプリ「Duosub」大幅アップデート（日本語訳の常時表示が可能に。）",
    url: "https://www.atpress.ne.jp/news/423834",
  },
  {
    id: 2,
    tags: ["プレスリリース", "Duosub"],
    date: "2025.05.17",
    title: "海外映画・ドラマの英語字幕・日本語訳アプリ『Duosub』が大幅アップデート（広告なしで全機能使い放題の格安サブスクプランを追加）",
    url: "https://prtimes.jp/main/html/rd/p/000000001.000156441.html",
  },
  {
    id: 3,
    tags: ["プレスリリース", "Duosub"],
    date: "2025.11.08",
    title: "海外映画・ドラマの英語字幕・日本語訳アプリ『Duosub』がYouTubeにも対応！",
    url: "https://prtimes.jp/main/html/rd/p/000000003.000156441.html",
  },
  {
    id: 4,
    tags: ["メディア掲載"],
    date: "2025.11.10",
    title: "弊社代表の小山望海が朝日新聞に掲載されました。",
    url: "/news/4",
  },
  {
    id: 5,
    tags: ["プレスリリース", "Duosub"],
    date: "2025.12.02",
    title: "海外動画の英語字幕・日本語訳アプリ『Duosub』の日本語訳性能が向上",
    url: "https://prtimes.jp/main/html/rd/p/000000004.000156441.html",
  },
  {
    id: 6,
    tags: ["プレスリリース", "Gentle Diary"],
    date: "2026.04.16",
    title: "新サービス「Gentle Diary」リリース",
    url: "https://prtimes.jp/main/html/rd/p/000000005.000156441.html",
  },
  {
    id: 7,
    tags: ["サービス開始"],
    date: "2026.05.12",
    title: "技術顧問サービスを開始しました。月額2万円〜、最短3ヶ月からご利用いただけます。",
    url: "/service/tech-advisor",
  },
];
