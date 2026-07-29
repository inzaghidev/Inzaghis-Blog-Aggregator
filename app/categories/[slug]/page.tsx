import { getArticles } from "@/lib/blogger/service";
import { ArticleCard } from "@/components/articles/article-card";
export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const label = decodeURIComponent((await params).slug).replace(/-/g, " ");
  const posts = (await getArticles()).filter((a) =>
    a.labels.some((x) => x.toLowerCase().includes(label.toLowerCase())),
  );
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
        Category
      </p>
      <h1 className="mt-2 text-4xl font-extrabold capitalize tracking-tight">
        {label}
      </h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(posts.length ? posts : await getArticles()).map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </main>
  );
}
