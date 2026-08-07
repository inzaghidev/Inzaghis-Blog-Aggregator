import { getArticles, isArticleInCategory } from "@/lib/blogger/service";
import { ArticleList } from "@/components/articles/article-list";

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
      <ArticleList articles={posts} pageSize={18} title="" description="" />
    </main>
  );
}
