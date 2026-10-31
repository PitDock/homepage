import { Space_Grotesk, Zen_Kaku_Gothic_New } from "next/font/google";

// 新デザイン（トップページ・共通ヘッダー／フッター）で使うフォント。
// 日本語は Zen Kaku Gothic New、英数字は Space Grotesk。
// 使う要素に `${zenKaku.variable} ${spaceGrotesk.variable}` を付け、
// font-family で var(--font-space), var(--font-zen) を指定する。

export const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  // 日本語フォントは容量が大きいため preload せず、表示時に必要な分だけ読み込ませる
  preload: false,
  variable: "--font-zen",
});

export const spaceGrotesk = Space_Grotesk({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

export const brandFontVariables = `${zenKaku.variable} ${spaceGrotesk.variable}`;
