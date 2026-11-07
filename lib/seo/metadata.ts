import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** title フィールドを出力しない（ルート layout の template 用） */
  skipTitle?: boolean;
  /** true のとき title.template を適用しない */
  absoluteTitle?: boolean;
  /**
   * 渡したときだけ og:image / twitter:image を出力する。
   * 省略時は、そのルートの opengraph-image.tsx から Next.js が og:image を入れ、twitter:image も同じ画像で補完する。
   * ここで既定値を入れると、ページ別の画像より優先されてしまう。
   */
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
};

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  skipTitle = false,
  absoluteTitle = false,
  image,
  imageAlt,
  keywords,
  noIndex = false,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : undefined;

  return {
    ...(skipTitle
      ? {}
      : { title: absoluteTitle ? { absolute: title } : title }),
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "ja_JP",
      url,
      siteName: SITE_NAME,
      title,
      description,
      // images キーがあると opengraph-image.tsx の画像が使われないため、画像がないときはキーごと出さない
      ...(imageUrl ? { images: [{ url: imageUrl, alt: imageAlt ?? title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
  };
}
