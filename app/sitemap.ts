import type { MetadataRoute } from "next";
import { getSitemapArticles } from "@/lib/blogger/service";

export const revalidate = 7200;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articles = await getSitemapArticles();
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/articles`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/disclaimer`, lastModified: new Date() },
    ...articles.map((a) => ({
      url: `${base}${a.url}`,
      lastModified: new Date(a.updated || a.published),
    })),
  ];
}
