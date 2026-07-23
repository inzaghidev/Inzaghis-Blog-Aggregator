import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
const tags = [
  "#javascript",
  "#react",
  "#rustlang",
  "#nextjs",
  "#docker",
  "#systemdesign",
  "#ai",
  "#css",
];
export function Sidebar() {
  return (
    <aside className="space-y-5">
      <section className="paper rounded-2xl p-5">
        <h2 className="text-xs font-bold tracking-wide">🏷 Trending tags</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Link
              href={`/categories/${t.slice(1)}`}
              key={t}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {t}
            </Link>
          ))}
        </div>
      </section>
      <section className="paper rounded-2xl p-5">
        <h2 className="text-xs font-bold tracking-wide">〽 Trending now</h2>
        {[
          "How we migrated 50 services to Kubernetes",
          "The state of frontend development in 2024",
          "Why I&apos;m leaving the cloud",
        ].map((post, i) => (
          <div key={post} className="mt-4 flex gap-3">
            <span className="text-3xl font-bold leading-none text-zinc-200 dark:text-zinc-700">
              0{i + 1}
            </span>
            <div>
              <p className="text-xs font-semibold leading-snug">{post}</p>
              <p className="mt-1 text-[10px] text-zinc-400">
                {i + 3}.2k reads · {i + 2} comments
              </p>
            </div>
          </div>
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
