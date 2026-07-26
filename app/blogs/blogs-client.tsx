"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/articles/article-card";
import type { Article } from "@/lib/blogger/types";

interface BlogsClientProps {
  initialArticles: Article[];
}

export function BlogsClient({ initialArticles }: BlogsClientProps) {
  const [filter, setFilter] = useState<"all" | "legacy" | "teknoblog">("all");

  const filteredArticles = initialArticles.filter((article) => {
    if (filter === "all") return true;
    return article.source === filter;
  });

  return (
    <div className="mt-8">
      {/* Premium Filter Controls */}
      <div className="mb-8 flex gap-3 border-b border-zinc-100 pb-3 dark:border-zinc-800">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-xs font-bold transition-all rounded-full ${
            filter === "all"
              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
              : "text-zinc-500 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          }`}
        >
          All Blogs ({initialArticles.length})
        </button>
        <button
          onClick={() => setFilter("legacy")}
          className={`px-4 py-2 text-xs font-bold transition-all rounded-full ${
            filter === "legacy"
              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
              : "text-zinc-500 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          }`}
        >
          IB Legacy (
          {initialArticles.filter((a) => a.source === "legacy").length})
        </button>
        <button
          onClick={() => setFilter("teknoblog")}
          className={`px-4 py-2 text-xs font-bold transition-all rounded-full ${
            filter === "teknoblog"
              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
              : "text-zinc-500 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          }`}
        >
          Teknoblog (
          {initialArticles.filter((a) => a.source === "teknoblog").length})
        </button>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">
          No articles found for this blog.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
