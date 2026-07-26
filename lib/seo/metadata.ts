import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "./site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** title フィールドを出力しない（ルート layout の template 用） */
  skipTitle?: boolean;
  /** true のとき title.template を適用しない */
  absoluteTitle?: boolean;
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
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  keywords,
  noIndex = false,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

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
      images: [
        {
          url: imageUrl,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
