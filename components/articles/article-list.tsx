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
        <nav className="mt-12 flex items-center justify-center gap-2 text-sm font-medium">
          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className={`flex size-10 items-center justify-center rounded-full border transition-all ${
              page === 1
                ? "border-slate-200 text-slate-400 cursor-not-allowed"
                : "border-[#b58c42] text-[#b58c42] hover:bg-[#b58c42]/10"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          {(() => {
            const pages = [];
            if (totalPages <= 7) {
              for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
              if (page <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
              } else if (page >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
              } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
              }
            }

            return pages.map((p, idx) => {
              if (p === "...") {
                return (
                  <span key={`ellipsis-${idx}`} className="flex size-10 items-center justify-center text-blue-900">
                    ...
                  </span>
                );
              }
              const isCurrent = p === page;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`flex size-10 items-center justify-center rounded-full transition-all ${
                    isCurrent
                      ? "bg-orange-500 text-white font-bold"
                      : "border border-[#d6dbe0] text-[#1e3a8a] hover:border-orange-300 hover:text-orange-300"
                  }`}
                >
                  {p}
                </button>
              );
            });
          })()}

          <button
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
            className={`flex size-10 items-center justify-center rounded-full border transition-all ${
              page === totalPages
                ? "border-slate-200 text-slate-400 cursor-not-allowed"
                : "border-orange-500 text-orange-500 hover:bg-orange-500/10"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </nav>
      ) : null}
    </div>
  );
}
