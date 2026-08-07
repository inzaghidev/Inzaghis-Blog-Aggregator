import { getArticles } from "@/lib/blogger/service";
import { ArticleList } from "@/components/articles/article-list";
export default async function Articles({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = (await searchParams).q;
  const articles = await getArticles(q);
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
        All Posts
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
        {q ? `Results for “${q}”` : "All Posts in Inzaghi's Blog"}
      </h1>
      <form className="mt-7">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search articles…"
          className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500 dark:border-zinc-800 dark:bg-zinc-900"
        />
      </form>
      <ArticleList
        articles={articles}
        pageSize={18}
        title=""
        description=""
        initialPage={q ? 1 : 2}
      />
    </main>
  );
}
