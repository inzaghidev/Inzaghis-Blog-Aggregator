import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/blogger/service";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articles = await getArticles();
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/articles`, lastModified: new Date() },
    ...articles.map((a) => ({
      url: `${base}${a.url}`,
      lastModified: new Date(a.updated || a.published),
    })),
  ];
}
