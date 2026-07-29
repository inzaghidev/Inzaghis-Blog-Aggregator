import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { getArticles } from "@/lib/blogger/service";
import { ArticleCard } from "@/components/articles/article-card";
import { Sidebar } from "@/components/home/sidebar";
export const revalidate = 300;
export default async function Home() {
  const articles = await getArticles();
  const hero = articles[0];
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Link
        href={`/posts/${hero.id}`}
        className="group relative isolate block overflow-hidden rounded-2xl bg-zinc-900 text-white"
      >
        <Image
          src={hero.cover}
          alt=""
          fill
          priority
          className="-z-10 object-cover opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="flex min-h-[390px] max-w-2xl flex-col justify-end p-6 sm:p-10">
          <span className="w-fit rounded bg-orange-500 px-2 py-1 text-[9px] font-bold uppercase tracking-wide">
            Featured post
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.04] tracking-[-.05em] sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-200">
            {hero.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs text-zinc-200">
            <span className="grid size-7 place-items-center rounded-full bg-orange-500 font-bold">
              {hero.author.name[0]}
            </span>
            <span>{hero.author.name}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" /> 12 min read
            </span>
          </div>
        </div>
      </Link>
      <section className="mt-10 grid gap-7 lg:grid-cols-[1fr_290px]">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Latest flows</h2>
            <div className="flex gap-3 text-[10px]">
              <button className="border-b border-orange-500 pb-1 text-orange-600">
                Recent
              </button>
              <button className="text-zinc-400">Popular</button>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {articles.slice(1).map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                compact={index > 1}
              />
            ))}
          </div>
          <Link
            href="/articles"
            className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-xs font-semibold text-zinc-600 transition hover:border-orange-500 hover:text-orange-600 dark:border-zinc-800"
          >
            Explore all stories <ArrowRight className="size-3" />
          </Link>
        </div>
        <Sidebar />
      </section>
      <section className="paper mt-16 rounded-2xl p-7 sm:p-10">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500">
            <Sparkles className="size-4" /> Curated for curious builders
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Technology should feel more human.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            We collect rigorous ideas from Inzaghi&apos;s Blog, Teknoblog, and
            Miniblog so you can stay focused on the work that matters.
          </p>
        </div>
      </section>
    </main>
  );
}
