import type { Metadata } from "next";
import { getArticles, isArticleInCategory } from "@/lib/blogger/service";
import { ArticleList } from "@/components/articles/article-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = decodeURIComponent((await params).slug);
  const label = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `Category: ${label}`,
    description: `Browse all ${label.toUpperCase()} posts from Inzaghi's Blog Legacy, Teknoblog, and Miniblog.`,
    alternates: {
      canonical: `/categories/${slug}`,
    },
    openGraph: {
      title: `Category: ${label}`,
      description: `Browse all ${label.toUpperCase()} posts from Inzaghi's Blog Legacy, Teknoblog, and Miniblog.`,
      type: "website",
      images: [
        {
          url: "/images/inzaghis-blog-aggregator.png",
          width: 1200,
          height: 630,
          alt: "Inzaghi's Blog Aggregator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Category: ${label}`,
      description: `Browse all ${label.toUpperCase()} posts from Inzaghi's Blog Legacy, Teknoblog, and Miniblog.`,
      images: ["/images/inzaghis-blog-aggregator.png"],
    },
  };
}

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = decodeURIComponent((await params).slug);
  const label = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const articles = await getArticles();
  const posts = articles.filter((article) => isArticleInCategory(article, slug));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
        Category
      </p>
      <h1 className="mt-2 text-4xl font-extrabold capitalize tracking-tight">
        {label}
      </h1>
      <ArticleList articles={posts} pageSize={18} title="" description="" />
    </main>
  );
}
