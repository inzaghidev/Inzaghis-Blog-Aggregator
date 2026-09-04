"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, MessageCircle, Loader2 } from "lucide-react";
import type { Article, BlogSource } from "@/lib/blogger/types";

const BATCH_SIZE = 100;

type FilterType = "all" | "blogs" | "miniblog";

const filterOptions: { value: FilterType; label: string }[] = [
  { value: "all", label: "Blog Posts" },
  { value: "blogs", label: "Blogs" },
  { value: "miniblog", label: "Miniblog" },
];

function getFilteredArticles(articles: Article[], filter: FilterType): Article[] {
  switch (filter) {
    case "blogs":
      return articles.filter((a) => a.source === "legacy" || a.source === "teknoblog");
    case "miniblog":
      return articles.filter((a) => a.source === "miniblog");
    default:
      return articles;
  }
}

function getSourceCount(articles: Article[], source: BlogSource): number {
  return articles.filter((a) => a.source === source).length;
}

const sourceColors: Record<string, string> = {
  legacy: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  teknoblog: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  miniblog: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
};

const sourceLabels: Record<string, string> = {
  legacy: "IB Legacy",
  teknoblog: "Teknoblog",
  miniblog: "Miniblog",
};

export function SitemapClient({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredArticles = useMemo(
    () => getFilteredArticles(articles, filter),
    [articles, filter],
  );

  const visibleArticles = useMemo(
    () => filteredArticles.slice(0, visibleCount),
    [filteredArticles, visibleCount],
  );

  const hasMore = visibleCount < filteredArticles.length;
  const remaining = filteredArticles.length - visibleArticles.length;

  useEffect(() => {
    setFilter("all");
    setVisibleCount(BATCH_SIZE);
  }, []);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [filter]);

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredArticles.length));
            setLoading(false);
          }, 500);
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, filteredArticles.length, loading]);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredArticles.length));
      setLoading(false);
    }, 300);
  };

  const blogsCount = getSourceCount(articles, "legacy") + getSourceCount(articles, "teknoblog");
  const miniblogCount = getSourceCount(articles, "miniblog");

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
        Sitemap
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
        All Blog Posts
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Browse and search through all posts from Inzaghi&apos;s Blog Legacy, Teknoblog, and Miniblog.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {filterOptions.map((opt) => {
          const isActive = filter === opt.value;
          let count = articles.length;
          if (opt.value === "blogs") count = blogsCount;
          if (opt.value === "miniblog") count = miniblogCount;

          return (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`rounded-full border px-5 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-orange-300 hover:text-orange-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-orange-400 dark:hover:text-orange-400"
              }`}
            >
              {opt.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-zinc-400">
          Showing {visibleArticles.length} of {filteredArticles.length} posts
        </p>
        {hasMore && (
          <p className="text-xs text-zinc-400">
            {remaining} more posts below
          </p>
        )}
      </div>

      {visibleArticles.length === 0 ? (
        <div className="mt-12 text-center text-zinc-500">
          No posts found.
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {visibleArticles.map((article) => (
            <Link
              key={article.id}
              href={article.url}
              className="group flex items-center gap-4 rounded-xl border border-zinc-100 bg-white p-3 transition hover:border-orange-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-orange-900/50"
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={article.cover}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                  {article.title}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${sourceColors[article.source]}`}>
                    {sourceLabels[article.source]}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {new Date(article.published).toLocaleDateString("en-UK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {article.labels.slice(0, 3).map((label) => (
                    <span
                      key={label}
                      className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden shrink-0 items-center gap-4 text-zinc-400 sm:flex">
                <span className="text-right text-[10px] leading-tight">
                  <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {article.author.name}
                  </span>
                </span>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1">
                    <Eye className="size-3" /> {article.views ?? 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-3" /> {article.comments ?? 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {hasMore && (
        <div ref={loadMoreRef} className="mt-8 flex flex-col items-center gap-4 py-6">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Loader2 className="size-4 animate-spin text-orange-500" />
              Loading more posts...
            </div>
          ) : (
            <button
              onClick={loadMore}
              className="rounded-full border border-orange-200 bg-orange-50 px-6 py-2.5 text-xs font-bold text-orange-600 transition hover:bg-orange-100 hover:border-orange-300 dark:border-orange-900/50 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/30"
            >
              Load More ({remaining} remaining)
            </button>
          )}
        </div>
      )}

      {!hasMore && visibleArticles.length > 0 && (
        <div className="mt-12 rounded-xl border border-zinc-100 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            You&apos;ve reached the end!
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            All {filteredArticles.length} posts have been loaded.
          </p>
        </div>
      )}
    </div>
  );
}
