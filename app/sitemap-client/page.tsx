import { getArticles } from "@/lib/blogger/service";
import { SitemapClient } from "./sitemap-client";

export const metadata = {
  title: "Sitemap - All Blog Posts",
  description:
    "Browse all posts from Inzaghi's Blog Legacy, Teknoblog, and Miniblog. Find articles about technology, campus life, coding, and more.",
  keywords: [
    "sitemap",
    "blog posts",
    "Inzaghi's Blog",
    "Teknoblog",
    "Miniblog",
    "IB Legacy",
    "articles",
    "technology",
    "coding",
    "campus life",
  ],
  openGraph: {
    title: "Sitemap - All Blog Posts | Inzaghi's Blog",
    description:
      "Browse all posts from Inzaghi's Blog Legacy, Teknoblog, and Miniblog.",
    type: "website",
  },
  alternates: {
    canonical: "/sitemap-client",
  },
};

export default async function SitemapPage() {
  const articles = await getArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sitemap - All Blog Posts",
    description:
      "Browse all posts from Inzaghi's Blog Legacy, Teknoblog, and Miniblog.",
    url: "/sitemap-client",
    numberOfItems: articles.length,
    hasPart: articles.slice(0, 50).map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: article.url,
      datePublished: article.published,
      author: { "@type": "Person", name: article.author.name },
    })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SitemapClient articles={articles} />
    </main>
  );
}
