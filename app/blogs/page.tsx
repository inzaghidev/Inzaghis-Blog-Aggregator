import { getArticles } from "@/lib/blogger/service";
import { ArticleList } from "@/components/articles/article-list";

export const revalidate = 300;

export default async function BlogsPage() {
  const articles = await getArticles();
  const blogArticles = articles.filter(
    (a) => a.source === "legacy" || a.source === "teknoblog"
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <ArticleList
        articles={blogArticles}
        title="Blogs"
        description="Articles and stories from IB Legacy and Teknoblog."
        pageSize={18}
        filterSources={[
          { value: "legacy", label: "IB Legacy" },
          { value: "teknoblog", label: "Teknoblog" },
        ]}
      />
    </main>
  );
}
