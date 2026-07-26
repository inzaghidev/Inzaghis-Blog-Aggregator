import { getArticles } from "@/lib/blogger/service";
import { BlogsClient } from "./blogs-client";

export const revalidate = 300;

export default async function BlogsPage() {
  const articles = await getArticles();
  
  // Filter for IB Legacy (legacy) and Teknoblog (teknoblog)
  const blogArticles = articles.filter(
    (a) => a.source === "legacy" || a.source === "teknoblog"
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
          Publication
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Blogs
        </h1>
        <p className="max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
          Articles and stories from IB Legacy and Teknoblog.
        </p>
      </div>

      <BlogsClient initialArticles={blogArticles} />
    </main>
  );
}
