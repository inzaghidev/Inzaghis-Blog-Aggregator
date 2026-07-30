"use client";

import { useEffect, useMemo, useState } from "react";
import { ArticleCard } from "@/components/articles/article-card";
import type { Article } from "@/lib/blogger/types";

interface ArticleListProps {
  articles: Article[];
  pageSize?: number;
  title?: string;
  description?: string;
  filterSources?: { value: string; label: string }[];
}

export function ArticleList({
  articles,
  pageSize = 18,
  title,
  description,
  filterSources,
}: ArticleListProps) {
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filter, articles.length]);

  const filteredArticles = useMemo(() => {
    if (!filter || filter === "all") return articles;
    return articles.filter((article) => article.source === filter);
  }, [articles, filter]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="mt-8">
      {(title || description || filterSources) && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title ? (
              <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-2 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            ) : null}
          </div>
          {filterSources ? (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-xs font-bold transition-all rounded-full ${
                  filter === "all"
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-zinc-500 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                All ({articles.length})
              </button>
              {filterSources.map((source) => (
                <button
                  key={source.value}
                  onClick={() => setFilter(source.value)}
                  className={`px-4 py-2 text-xs font-bold transition-all rounded-full ${
                    filter === source.value
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "text-zinc-500 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {source.label} (
                  {articles.filter((a) => a.source === source.value).length})
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {paginatedArticles.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">
          No articles found.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <nav className="mt-8 flex items-center justify-center gap-3 text-sm">
          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="rounded-full border border-zinc-200 px-4 py-2 text-zinc-500 transition hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page === totalPages}
            className="rounded-full border border-zinc-200 px-4 py-2 text-zinc-500 transition hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}
