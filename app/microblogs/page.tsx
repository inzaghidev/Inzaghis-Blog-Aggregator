import { getArticles } from "@/lib/blogger/service";
import { ArticleList } from "@/components/articles/article-list";

export const revalidate = 300;

export default async function MicroblogsPage() {
  const articles = await getArticles();
  const microArticles = articles.filter((a) => a.source === "miniblog");

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <ArticleList
        articles={microArticles}
        title="Microblogs"
        description="Quick reads, snippets, and short thoughts from Miniblog."
        pageSize={18}
      />
    </main>
  );
}
