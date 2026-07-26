import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo/site";

const routes: { path: string; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/company-info", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/personal-info", changeFrequency: "yearly", priority: 0.3 },
  { path: "/service/dx-ax", changeFrequency: "monthly", priority: 0.9 },
  { path: "/service/system-dev", changeFrequency: "monthly", priority: 0.9 },
  { path: "/service/tech-advisor", changeFrequency: "monthly", priority: 0.9 },
  { path: "/service/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/service/products/duosub", changeFrequency: "weekly", priority: 0.9 },
  { path: "/service/products/duosub/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/service/products/safepage", changeFrequency: "weekly", priority: 0.9 },
  { path: "/service/products/safepage/terms_of_use", changeFrequency: "yearly", priority: 0.4 },
  { path: "/service/products/dinder", changeFrequency: "weekly", priority: 0.8 },
  { path: "/service/products/gentle-diary", changeFrequency: "weekly", priority: 0.8 },
  { path: "/service/products/gentle-diary/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/service/products/gentle-diary/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/news", changeFrequency: "weekly", priority: 0.8 },
  { path: "/news/4", changeFrequency: "yearly", priority: 0.6 },
  { path: "/partner", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency = "monthly", priority = 0.7 }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
