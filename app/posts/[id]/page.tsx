import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Eye, Link2, Share2 } from "lucide-react";
import { getArticle, getArticles } from "@/lib/blogger/service";
import { ArticleCard } from "@/components/articles/article-card";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const article = await getArticle((await params).id);
  return article
    ? {
        title: article.title,
        description: article.excerpt,
        alternates: { canonical: article.url },
        openGraph: { images: [article.cover] },
      }
    : {};
}
export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const article = await getArticle((await params).id);
  if (!article) notFound();
  const related = (await getArticles())
    .filter((a) => a.id !== article.id)
    .slice(0, 3);
  const authorSlug = article.author.name.toLowerCase().replace(/\s+/g, "-");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    datePublished: article.published,
    image: article.cover,
    author: { "@type": "Person", name: article.author.name },
  };
  return (
    <main className="mx-auto max-w-6xl px-4 py-9 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,720px)_250px]">
        <article>
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
            {article.labels[0]} ·{" "}
            {new Date(article.published).toLocaleDateString()}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-.05em] sm:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-col gap-4 border-y border-zinc-200 py-4 text-xs dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-orange-500 font-bold text-white">
                {article.author.name[0]}
              </span>
              <Link href={`/authors/${authorSlug}`} className="group">
                <span>
                  <b>{article.author.name}</b>
                  <br />
                  <span className="text-zinc-400">Author & Editor</span>
                </span>
              </Link>
            </div>
            <span className="flex items-center gap-3 text-zinc-500">
              <Clock className="size-4" /> 12 min <Eye className="size-4" />{" "}
              {article.views}
            </span>
          </div>
          <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={article.cover}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          <div
            className="article-copy text-[15px]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div className="mt-10 flex flex-wrap gap-2">
            {article.labels.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1.5 text-[10px] text-zinc-500 dark:bg-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <section className="paper mt-10 rounded-2xl p-5">
            <b className="text-sm">Join the conversation</b>
            <textarea
              className="mt-4 h-24 w-full rounded-xl bg-zinc-100 p-3 text-xs outline-none dark:bg-zinc-900"
              placeholder="Share your thoughts…"
            />
            <button className="mt-3 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white">
              Post comment
            </button>
          </section>
        </article>
        <aside className="h-fit space-y-5 lg:sticky lg:top-24">
          <div className="paper rounded-2xl p-5">
            <p className="text-xs font-bold">In this article</p>
            <a href="#" className="mt-4 block text-xs text-orange-600">
              The synchronous change
            </a>
            <a href="#" className="mt-3 block text-xs text-zinc-500">
              Looking ahead
            </a>
          </div>
          <div className="paper rounded-2xl p-5">
            <p className="text-xs font-bold">Share</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                <Share2 className="size-4" />
              </button>
              <button className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                <Link2 className="size-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Keep reading</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.id} article={a} compact />
          ))}
        </div>
      </section>
    </main>
  );
}
