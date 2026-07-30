import { getArticles, isArticleInCategory, normalizeCategoryKey } from "@/lib/blogger/service";
import { ArticleCard } from "@/components/articles/article-card";

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = decodeURIComponent((await params).slug);
  const label = slug.replace(/-/g, " ");
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
      {posts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
          No posts found for this category yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}
