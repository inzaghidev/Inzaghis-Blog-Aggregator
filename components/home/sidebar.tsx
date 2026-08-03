import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { getArticles } from "@/lib/blogger/service";

const categories = [
  { slug: "rumus-rumus", label: "Rumus-rumus" },
  { slug: "tekno", label: "Tekno" },
  { slug: "berita", label: "Berita" },
  { slug: "kode-program", label: "Kode Program" },
  { slug: "prompt-ai", label: "Prompt AI" },
  { slug: "vlog", label: "VLOG" },
  { slug: "resep", label: "Resep" },
  { slug: "doa-dan-ibadah", label: "Doa dan Ibadah" },
];

export async function Sidebar() {
  const articles = await getArticles();
  const popularPosts = articles.slice(0, 3);

  return (
    <aside className="space-y-5">
      <section className="paper rounded-2xl p-5">
        <h2 className="text-xs font-bold tracking-wide">🏷 Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              href={`/categories/${c.slug}`}
              key={c.slug}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>
      <section className="paper rounded-2xl p-5">
        <h2 className="text-xs font-bold tracking-wide">〽 Popular Posts</h2>
        {popularPosts.map((post, i) => (
          <Link href={post.url} key={post.id} className="group mt-4 flex gap-3 block">
            <span className="text-3xl font-bold leading-none text-zinc-200 transition-colors group-hover:text-orange-500 dark:text-zinc-700">
              0{i + 1}
            </span>
            <div>
              <p className="line-clamp-2 text-xs font-semibold leading-snug transition-colors group-hover:text-orange-500">
                {post.title}
              </p>
              <p className="mt-1 text-[10px] text-zinc-400">
                {i + 3}.2k reads · {i + 2} comments
              </p>
            </div>
          </Link>
        ))}
      </section>
      <section className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 p-5 text-white shadow-lg shadow-orange-500/20">
        <Mail className="size-5" />
        <h2 className="mt-3 text-sm font-bold">Inzaghi&apos;s Blog Weekly</h2>
        <p className="mt-2 text-xs leading-relaxed text-orange-100">
          The best technical articles, delivered straight to your inbox every
          Monday.
        </p>
        <input
          className="mt-4 w-full rounded-lg bg-white/15 px-3 py-2 text-xs outline-none placeholder:text-orange-100"
          placeholder="email@example.com"
        />
        <button className="mt-2 w-full rounded-lg bg-white px-3 py-2 text-xs font-bold text-orange-600">
          Subscribe now <ArrowUpRight className="inline size-3" />
        </button>
      </section>
    </aside>
  );
}
