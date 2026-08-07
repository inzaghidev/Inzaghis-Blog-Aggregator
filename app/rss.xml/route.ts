import { getArticles } from "@/lib/blogger/service";
export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = await getArticles();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Inzaghi's Blog</title>
        <link>${base}</link>
        <description>All Posts in Inzaghi's Blog.</description>
        ${posts.map((p) => `<item><title><![CDATA[${p.title}]]></title><link>${base}${p.url}</link><guid>${p.id}</guid><pubDate>${new Date(p.published).toUTCString()}</pubDate><description><![CDATA[${p.excerpt}]]></description></item>`).join("")}
      </channel>
    </rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
