"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Loader2, Sparkles } from "lucide-react";
import type { Article } from "@/lib/blogger/types";

const sourceNames: Record<string, string> = {
  legacy: "IB Legacy",
  teknoblog: "Teknoblog",
  miniblog: "Miniblog",
};

const sourceColors: Record<string, string> = {
  legacy: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  teknoblog: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  miniblog: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return <>{text}</>;
  const regex = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        part && terms.includes(part.toLowerCase()) ? (
          <mark
            key={i}
            className="rounded-sm bg-orange-500/20 px-0.5 text-orange-700 dark:text-orange-400"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function searchArticles(articles: Article[], query: string): Article[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return articles;

  return articles
    .map((article) => {
      const title = article.title.toLowerCase();
      const excerpt = article.excerpt.toLowerCase();
      const content = article.content.toLowerCase();
      const labels = article.labels.join(" ").toLowerCase();
      const author = article.author.name.toLowerCase();

      let score = 0;
      for (const term of terms) {
        const titleScore =
          title === term
            ? 120
            : title.startsWith(term)
              ? 100
              : title.includes(term)
                ? 80
                : 0;
        const fieldScore = (value: string, weight: number) =>
          value.includes(term) ? weight : 0;
        const best = Math.max(
          titleScore,
          fieldScore(labels, 50),
          fieldScore(excerpt, 40),
          fieldScore(author, 25),
          fieldScore(content, 12),
        );
        if (!best) return null;
        score += best;
      }
      return { article, score };
    })
    .filter(
      (entry): entry is { article: Article; score: number } => entry !== null,
    )
    .sort(
      (a, b) =>
        b.score - a.score ||
        +new Date(b.article.published) - +new Date(a.article.published),
    )
    .map((entry) => entry.article);
}

export function SearchClient({
  articles,
  initialQuery,
}: {
  articles: Article[];
  initialQuery: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isSyncing, setIsSyncing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const q = query.trim();
      setIsSyncing(true);
      router.replace(q ? `/search?q=${encodeURIComponent(q)}` : "/search", {
        scroll: false,
      });
      setTimeout(() => setIsSyncing(false), 300);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, router]);

  const results = useMemo(
    () => searchArticles(articles, query),
    [articles, query],
  );

  const popularLabels = useMemo(() => {
    const counts = new Map<string, number>();
    articles.forEach((a) =>
      a.labels.forEach((label) =>
        counts.set(label, (counts.get(label) || 0) + 1),
      ),
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label]) => label);
  }, [articles]);

  const trimmedQuery = query.trim();
  const emptyState = !trimmedQuery;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
        Search
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
        {emptyState
          ? "Find what you're looking for"
          : `Results for “${trimmedQuery}”`}
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        role="search"
        className="mt-6 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <Search className="size-4 shrink-0 text-zinc-400" />
        <input
          ref={inputRef}
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, categories, labels, authors..."
          aria-label="Search articles"
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
        {isSyncing && (
          <Loader2 className="size-4 shrink-0 animate-spin text-zinc-400" />
        )}
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="shrink-0 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="size-3.5" />
          </button>
        )}
      </form>

      <div className="mt-8">
        {emptyState ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 p-8 text-center dark:border-zinc-800">
            <Sparkles className="mx-auto size-6 text-orange-500" />
            <p className="mt-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Try one of the popular topics
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {popularLabels.map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    setQuery(label);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-semibold text-zinc-500 transition hover:border-orange-500 hover:text-orange-600 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 p-8 text-center dark:border-zinc-800">
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              No results for “{trimmedQuery}”
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Try different keywords or browse a popular topic below.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {popularLabels.slice(0, 6).map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    setQuery(label);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-semibold text-zinc-500 transition hover:border-orange-500 hover:text-orange-600 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-400">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <div className="flex flex-col gap-3">
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={article.url}
                  className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-orange-500/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={article.cover}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="128px"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          sourceColors[article.source] ??
                          "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                        }`}
                      >
                        {sourceNames[article.source] ?? article.source}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {new Date(article.published).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <h3 className="mt-1.5 line-clamp-2 text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                      <Highlight text={article.title} query={trimmedQuery} />
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                      <Highlight text={article.excerpt} query={trimmedQuery} />
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {article.labels.slice(0, 3).map((label) => (
                        <span
                          key={label}
                          className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
