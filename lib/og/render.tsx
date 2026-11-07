import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";
import { SITE_NAME } from "../seo/site";
import { assertGlyphsAvailable, OG_FONTS } from "./fonts";
import type { OgContent, OgHomeContent, OgPageContent, OgTitleLine, OgTitleSize } from "./pages";

/**
 * OGP画像の共通描画（docs/ogp-image-design-spec.md §2〜§5・§7.3）。
 * 中央630×630で切り抜かれても欠けないよう、ロゴ・文字はすべて x 315〜885 に中央揃えで置く。
 */

export const OG_ALT = SITE_NAME;
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const COLOR = {
  ink: "#0E1B2C",
  pitBlue: "#14509E",
  dockBlue: "#3AA0E8",
  gray: "#5A616B",
} as const;

const FONT_MIXED = "Space Grotesk, Zen Kaku Gothic New";
const FONT_LATIN = "Space Grotesk";
const DOMAIN_LABEL = "pit-dock.com";

const RIBBON_STOPS: readonly [number, string][] = [
  [0, "#14509E"],
  [0.18, "#3AA0E8"],
  [0.36, "#35C8C0"],
  [0.52, "#6BD36B"],
  [0.66, "#F5C542"],
  [0.8, "#F28C3A"],
  [0.9, "#E9557A"],
  [1, "#8C7BE8"],
];

// 1本のパスにする（分けるとループの交差部分で色が濃くなる）
const RIBBON_PATH =
  "M-80 70 C110 70 205 190 200 330 C195 480 300 596 600 598 C860 600 985 520 1010 420 " +
  "C1035 320 1150 300 1150 380 C1150 450 1050 440 1040 360 C1030 270 1080 120 1280 60";

const RIBBON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">' +
  '<defs><linearGradient id="r" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">' +
  RIBBON_STOPS.map(([offset, color]) => `<stop offset="${offset}" stop-color="${color}"/>`).join("") +
  "</linearGradient></defs>" +
  `<path d="${RIBBON_PATH}" fill="none" stroke="url(#r)" stroke-opacity="0.75" ` +
  'stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>' +
  "</svg>";

const RIBBON_SRC = `data:image/svg+xml;base64,${Buffer.from(RIBBON_SVG).toString("base64")}`;
const LOGO_SRC = `data:image/svg+xml;base64,${readFileSync(
  join(process.cwd(), "public", "brand", "logo.svg"),
).toString("base64")}`;

/** §5.2 見出しのサイズごとの上限（幅は全角1字=1、半角=0.6 で数える） */
const TITLE_LIMITS: Record<OgTitleSize, { maxWidth: number; maxLines: number }> = {
  56: { maxWidth: 10, maxLines: 2 },
  48: { maxWidth: 11.8, maxLines: 3 },
  40: { maxWidth: 14.2, maxLines: 3 },
  34: { maxWidth: 16.7, maxLines: 3 },
};
const SUB_MAX_LINES = 2;
const SUB_MAX_WIDTH = 28;

function textWidth(text: string): number {
  let width = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    width += code < 0x7f || (code >= 0xff61 && code <= 0xff9f) ? 0.6 : 1;
  }
  return width;
}

function lineText(line: OgTitleLine): string {
  return typeof line === "string" ? line : line.map((seg) => seg.text).join("");
}

function validatePage(content: OgPageContent): void {
  const { maxWidth, maxLines } = TITLE_LIMITS[content.titleSize];
  const titles = content.titleLines.map(lineText);
  if (titles.length === 0 || titles.length > maxLines) {
    throw new Error(`[og] ${content.path}: 見出しは ${content.titleSize}px では${maxLines}行までです（${titles.length}行）`);
  }
  for (const t of titles) {
    if (textWidth(t) > maxWidth) {
      throw new Error(`[og] ${content.path}: 見出し「${t}」は ${content.titleSize}px の1行の上限（${maxWidth}字分）を超えています`);
    }
  }
  const subs = content.subLines ?? [];
  if (subs.length > SUB_MAX_LINES) {
    throw new Error(`[og] ${content.path}: 補足文は${SUB_MAX_LINES}行までです（${subs.length}行）`);
  }
  for (const s of subs) {
    if (textWidth(s) > SUB_MAX_WIDTH) {
      throw new Error(`[og] ${content.path}: 補足文「${s}」は1行の上限（${SUB_MAX_WIDTH}字分）を超えています`);
    }
  }
}

function collectTexts(content: OgContent): string[] {
  if (content.kind === "home") {
    return [...content.catchLines, content.tagline, ...content.descriptionLines, DOMAIN_LABEL];
  }
  return [
    ...(content.label ?? []),
    ...content.titleLines.map(lineText),
    ...(content.subLines ?? []),
    DOMAIN_LABEL,
  ];
}

// 文字の自動折り返しには頼らない（行ごとに div を分け、折り返しを禁止する）
const LINE: CSSProperties = { display: "flex", justifyContent: "center", whiteSpace: "nowrap" };

const BODY_BLOCK: CSSProperties = {
  position: "absolute",
  left: 315,
  top: 110,
  width: 570,
  height: 360,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

function HomeBody({ content }: { content: OgHomeContent }) {
  return (
    <div style={BODY_BLOCK}>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 52, fontWeight: 700, lineHeight: 1.35, color: COLOR.ink }}>
        {content.catchLines.map((line) => (
          <div key={line} style={LINE}>
            {line}
          </div>
        ))}
      </div>
      <div style={{ ...LINE, marginTop: 24, fontSize: 26, fontWeight: 700, lineHeight: 1.4, color: COLOR.pitBlue }}>
        {content.tagline}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 28,
          fontSize: 18,
          fontWeight: 400,
          lineHeight: 1.75,
          color: COLOR.ink,
        }}
      >
        {content.descriptionLines.map((line) => (
          <div key={line} style={LINE}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function PageBody({ content }: { content: OgPageContent }) {
  return (
    <div style={BODY_BLOCK}>
      {content.label && (
        <div
          style={{
            ...LINE,
            marginBottom: 16,
            fontFamily: FONT_LATIN,
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: COLOR.pitBlue }}>{content.label[0]}</span>
          <span style={{ color: COLOR.dockBlue, whiteSpace: "pre" }}>{` ${content.label[1]}`}</span>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: content.titleSize,
          fontWeight: 700,
          lineHeight: 1.35,
          color: COLOR.ink,
        }}
      >
        {content.titleLines.map((line) => (
          <div key={lineText(line)} style={LINE}>
            {typeof line === "string"
              ? line
              : line.map((seg) => (
                  <span key={seg.text} style={seg.accent ? { color: COLOR.pitBlue } : undefined}>
                    {seg.text}
                  </span>
                ))}
          </div>
        ))}
      </div>
      {content.subLines && content.subLines.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.7,
            color: COLOR.pitBlue,
          }}
        >
          {content.subLines.map((line) => (
            <div key={line} style={LINE}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function renderOgImage(content: OgContent): ImageResponse {
  if (content.kind === "page") validatePage(content);
  assertGlyphsAvailable(collectTexts(content), content.path);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, #FFFFFF 0%, #EEF5FC 100%)",
          fontFamily: FONT_MIXED,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={RIBBON_SRC} width={1200} height={630} alt="" style={{ position: "absolute", left: 0, top: 0 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_SRC} width={240} height={38} alt="" style={{ position: "absolute", left: 480, top: 60 }} />
        {content.kind === "home" ? <HomeBody content={content} /> : <PageBody content={content} />}
        <div
          style={{
            position: "absolute",
            left: 315,
            top: 478,
            width: 570,
            display: "flex",
            justifyContent: "center",
            fontFamily: FONT_LATIN,
            fontSize: 18,
            fontWeight: 700,
            color: COLOR.gray,
          }}
        >
          {DOMAIN_LABEL}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: OG_FONTS.map((font) => ({ ...font })),
    },
  );
}
