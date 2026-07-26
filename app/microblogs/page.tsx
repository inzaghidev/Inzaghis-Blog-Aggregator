import { getArticles } from "@/lib/blogger/service";
import { ArticleCard } from "@/components/articles/article-card";

export const revalidate = 300;

export default async function MicroblogsPage() {
  const articles = await getArticles();
  
  // Filter for Miniblog (miniblog)
  const microArticles = articles.filter(
    (a) => a.source === "miniblog"
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
          Publication
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Microblogs
        </h1>
        <p className="max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
          Quick reads, snippets, and short thoughts from Miniblog.
        </p>
      </div>

      <div className="mt-8">
        {microArticles.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            No microblog posts found.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {microArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
