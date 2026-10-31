import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo/site";

// lastModified はページ内容を実際に更新した日（YYYY-MM-DD）。ページを更新したら合わせて書き換える。
// ビルド日時を入れると全ページが毎回「更新」扱いになり、Google に lastmod を信用されなくなるため。
const routes: { path: string; lastModified: string; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number }[] = [
  { path: "/", lastModified: "2026-10-31", changeFrequency: "weekly", priority: 1 },
  { path: "/company-info", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", lastModified: "2026-10-11", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", lastModified: "2026-08-09", changeFrequency: "yearly", priority: 0.3 },
  { path: "/personal-info", lastModified: "2026-08-08", changeFrequency: "yearly", priority: 0.3 },
  { path: "/service/dx-ax", lastModified: "2026-08-09", changeFrequency: "monthly", priority: 0.9 },
  { path: "/service/system-dev", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.9 },
  { path: "/service/tech-advisor", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.9 },
  { path: "/service/products", lastModified: "2026-08-18", changeFrequency: "weekly", priority: 0.9 },
  { path: "/service/products/duosub", lastModified: "2026-10-07", changeFrequency: "weekly", priority: 0.9 },
  { path: "/service/products/duosub/terms", lastModified: "2026-08-09", changeFrequency: "yearly", priority: 0.4 },
  { path: "/service/products/safepage", lastModified: "2026-07-26", changeFrequency: "weekly", priority: 0.9 },
  { path: "/service/products/safepage/terms_of_use", lastModified: "2026-08-09", changeFrequency: "yearly", priority: 0.4 },
  { path: "/service/products/dinder", lastModified: "2026-08-08", changeFrequency: "weekly", priority: 0.8 },
  { path: "/service/products/gentle-diary", lastModified: "2026-10-10", changeFrequency: "weekly", priority: 0.8 },
  { path: "/service/products/gentle-diary/terms", lastModified: "2026-10-10", changeFrequency: "yearly", priority: 0.4 },
  { path: "/service/products/gentle-diary/privacy", lastModified: "2026-08-09", changeFrequency: "yearly", priority: 0.4 },
  { path: "/news", lastModified: "2026-10-01", changeFrequency: "weekly", priority: 0.8 },
  { path: "/news/4", lastModified: "2026-08-08", changeFrequency: "yearly", priority: 0.6 },
  { path: "/news/8", lastModified: "2026-08-11", changeFrequency: "yearly", priority: 0.6 },
  { path: "/partner", lastModified: "2026-10-11", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified, changeFrequency = "monthly", priority = 0.7 }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
