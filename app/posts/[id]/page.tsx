import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Eye, Link2, Share2 } from "lucide-react";
import { getArticle, getArticles } from "@/lib/blogger/service";
import { ArticleCard } from "@/components/articles/article-card";
import { ArticleContent } from "../../../components/articles/article-content";
import { formatDate } from "@/lib/utils";
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
          <div className="flex flex-col gap-2 md:flex-row md:justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
              {article.labels.slice(0, 3).join(" · ")}
            </p>
            <Link
              href={article.url}
              className="flex rounded-lg bg-orange-400 gap-3 px-4 py-2 mr-auto md:mr-0! min-w-0 items-center active:scale-95 transition-all duration-200 text-xs text-white hover:bg-orange-500! hover:text-white"
            >
              Original Post
            </Link>
          </div>
          {/* Jika hanya menampilkan maks. 2 Label/Tag
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
            {article.labels.length >= 2
              ? `${article.labels[0]} · ${article.labels[1]}`
              : article.labels[0]}
          </p> */}
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tighter sm:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex min-w-0 flex-col gap-4 border-y border-zinc-400 py-4 text-xs dark:border-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-orange-500 font-bold text-white">
                {article.author.name[0]}
              </span>
              <Link
                href={`/authors/${authorSlug}`}
                className="rounded-lg gap-3 px-3 py-2 mr-auto md:mr-0! min-w-0 items-center active:scale-95 transition-all duration-200 text-xs text-black dark:text-white hover:bg-gray-200! hover:dark:bg-gray-800!"
              >
                <b>{article.author.name}</b>
                <br />
                <span className="text-zinc-400">Author & Editor</span>
              </Link>
            </div>
            <span className="flex min-w-0 items-center gap-3 text-zinc-500">
              <Calendar className="size-4" /> {formatDate(article.published)}
              <Eye className="size-4" /> {article.views}
            </span>
          </div>
          <ArticleContent
            cover={article.cover}
            html={article.content}
            title={article.title}
          />
          <div className="mt-10 flex flex-wrap gap-2">
            {article.labels.map((tag) => {
              const categorySlug = encodeURIComponent(
                tag.toLowerCase().replace(/\s+/g, "-"),
              );
              return (
                <Link
                  key={tag}
                  href={`/categories/${categorySlug}`}
                  className="rounded-full bg-zinc-100 px-3 py-1.5 text-[10px] font-medium text-zinc-600 transition hover:bg-orange-50 hover:text-orange-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </Link>
              );
            })}
          </div>
          <section className="paper mt-10 rounded-2xl p-5">
            <b className="text-sm">Join the conversation</b>
            <textarea
              className="mt-4 h-24 w-full rounded-xl bg-zinc-100 p-3 text-xs outline-none dark:bg-zinc-900"
              placeholder="Share your thoughts…"
            />
            <button className="mt-3 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold tracking-wide text-white">
              Post comment
            </button>
          </section>
        </article>
        <aside className="h-fit space-y-5 lg:sticky lg:top-24">
          <div className="paper rounded-2xl p-5">
            <p className="text-sm font-bold tracking-wide">In this article</p>
            <a href="#" className="mt-4 block text-xs text-orange-600">
              The synchronous change
            </a>
            <a href="#" className="mt-3 block text-xs text-zinc-500">
              Looking ahead
            </a>
          </div>
          <div className="paper rounded-2xl p-5">
            <p className="text-sm font-bold tracking-wide">Share</p>
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
