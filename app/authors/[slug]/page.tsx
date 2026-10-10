import { getArticles } from "@/lib/blogger/service";
import { ArticleCard } from "@/components/articles/article-card";
import { randomItems } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

const normalizeAuthorSlug = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

export default async function Author({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = decodeURIComponent((await params).slug);
  const articles = await getArticles();
  const authorArticles = articles.filter(
    (article) =>
      normalizeAuthorSlug(article.author.name) === normalizeAuthorSlug(slug),
  );

  if (!authorArticles.length) notFound();

  const name = authorArticles[0].author.name;
  const profileId = authorArticles.find((article) => article.author.profileId)
    ?.author.profileId;
  const related = randomItems(authorArticles, 12);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <section className="paper flex flex-col items-start gap-5 rounded-2xl p-7 sm:flex-row sm:items-center">
        <span className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-700 text-2xl font-bold text-white">
          {name[0]}
        </span>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{name}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
            Writer, technologist, and curious builder exploring the tools and
            ideas that shape the web.
          </p>
          <p className="mt-3 text-xs font-semibold text-orange-500">
            {profileId ? (
              <Link
                href={`https://www.blogger.com/profile/${profileId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @{slug}
              </Link>
            ) : (
              <>@{slug}</>
            )}
          </p>
        </div>
      </section>

      <h2 className="mt-12 text-2xl font-bold">Other Articles</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
