"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/articles/article-card";
import type { Article } from "@/lib/blogger/types";

interface BlogsClientProps {
  initialArticles: Article[];
}

export function BlogsClient({ initialArticles }: BlogsClientProps) {
  const [filter, setFilter] = useState<"all" | "teknoblog" | "legacy">("all");

  const filteredArticles = initialArticles.filter((article) => {
    if (filter === "all") return true;
    return article.source === filter;
  });

  return (
    <div className="mt-8">
      {/* Premium Filter Controls (Tab Switcher) */}
      <div className="mb-8">
        <div className="inline-flex max-w-full flex-wrap items-center rounded-xl bg-zinc-300/70 p-1 dark:bg-zinc-700/80">
          <button
            onClick={() => setFilter("all")}
            type="button"
            className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
              filter === "all"
                ? "bg-white text-orange-600 shadow-lg dark:bg-black dark:text-orange-400"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            All ({initialArticles.length})
          </button>
          <button
            onClick={() => setFilter("teknoblog")}
            type="button"
            className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
              filter === "teknoblog"
                ? "bg-white text-orange-600 shadow-lg dark:bg-black dark:text-orange-400"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Teknoblog (
            {initialArticles.filter((a) => a.source === "teknoblog").length})
          </button>
          <button
            onClick={() => setFilter("legacy")}
            type="button"
            className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
              filter === "legacy"
                ? "bg-white text-orange-600 shadow-lg dark:bg-black dark:text-orange-400"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            IB Legacy (
            {initialArticles.filter((a) => a.source === "legacy").length})
          </button>
        </div>
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
