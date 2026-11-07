import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * OGP画像用フォント（assets/fonts/og/）。docs/ogp-image-design-spec.md §6。
 * ブラウザには配信しないので public/ ではなく assets/ に置き、ビルド時に fs で読む。
 */

const FONT_DIR = join(process.cwd(), "assets", "fonts", "og");

function load(file: string): Buffer {
  return readFileSync(join(FONT_DIR, file));
}

export const OG_FONTS = [
  { name: "Space Grotesk", data: load("SpaceGrotesk-Bold.ttf"), weight: 700, style: "normal" },
  { name: "Space Grotesk", data: load("SpaceGrotesk-Regular.ttf"), weight: 400, style: "normal" },
  { name: "Zen Kaku Gothic New", data: load("ZenKakuGothicNew-Bold.subset.ttf"), weight: 700, style: "normal" },
  { name: "Zen Kaku Gothic New", data: load("ZenKakuGothicNew-Regular.subset.ttf"), weight: 400, style: "normal" },
] as const;

const CHARSET: ReadonlySet<string> = new Set(
  Array.from(readFileSync(join(FONT_DIR, "charset.txt"), "utf-8").replace(/[\r\n]/g, "")),
);

/**
 * 画像に入れる文字がサブセットに含まれているかを調べ、足りなければ throw してビルドを止める。
 * □ になった画像が公開されるのを防ぐため。
 */
export function assertGlyphsAvailable(texts: readonly string[], path: string): void {
  const missing = new Set<string>();
  for (const text of texts) {
    for (const ch of text) {
      if (!CHARSET.has(ch)) missing.add(ch);
    }
  }
  if (missing.size > 0) {
    const list = Array.from(missing)
      .map((ch) => `"${ch}" (U+${ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")})`)
      .join(", ");
    throw new Error(
      `[og] ${path} のOGP画像に、フォントのサブセットに含まれない文字があります: ${list}。` +
        "assets/fonts/og/charset.txt に文字を足して scripts/og-fonts/subset.sh を実行してください（assets/fonts/og/README.md）。",
    );
  }
}
