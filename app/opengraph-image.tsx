import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME } from "../lib/seo/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// SITE_DESCRIPTION の要約（発注者確認済み・§10-1）
const TAGLINE = "DX・AXコンサルティング × システム開発";
const DOMAIN_LABEL = "pit-dock.com";

/**
 * Google Fonts の CSS2 API は `text` パラメータを渡すと、
 * 実際に使用する文字だけを含むサブセットフォントを生成して返す。
 * ブラウザ以外の User-Agent で fetch すると woff2 ではなく
 * ttf (truetype) 形式の URL が返るため、ImageResponse の fonts
 * オプションにそのまま渡せる（satori は truetype/opentype のみ対応）。
 */
async function loadSubsetGoogleFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`;
    const cssRes = await fetch(cssUrl);
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const logoBuffer = await readFile(join(process.cwd(), "public/images/logo_white.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  // タグライン + フッターのドメイン表記で使う文字だけをサブセット化対象にする
  const fontData = await loadSubsetGoogleFont(`${TAGLINE}${DOMAIN_LABEL}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#070B14",
          overflow: "hidden",
        }}
      >
        {/* glow 1: 右上寄りのブランドブルーの光暈 */}
        <div
          style={{
            position: "absolute",
            width: 840,
            height: 840,
            left: 860 - 420,
            top: 120 - 420,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(18,58,107,0.9) 0%, rgba(18,58,107,0.35) 45%, rgba(18,58,107,0) 72%)",
            display: "flex",
          }}
        />
        {/* glow 2: 左下の控えめなブルーのぼかし */}
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            left: -220,
            top: 630 - 260,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(43,147,214,0.16) 0%, rgba(43,147,214,0.06) 50%, rgba(43,147,214,0) 75%)",
            display: "flex",
          }}
        />

        {/* ロゴ */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={420}
          height={66}
          style={{ position: "absolute", left: 80, top: 88 }}
        />

        {/* タグライン */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 88 + 66 + 40,
            maxWidth: 880,
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.4,
            color: "#F4F7FF",
            fontFamily: fontData ? "Noto Sans JP" : undefined,
            display: "flex",
          }}
        >
          {TAGLINE}
        </div>

        {/* フッター右下: ドメイン */}
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 64,
            fontSize: 20,
            color: "#57628A",
            fontFamily: "Inter",
            display: "flex",
          }}
        >
          {DOMAIN_LABEL}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Noto Sans JP", data: fontData, weight: 700 as const, style: "normal" as const }]
        : [],
    }
  );
}
