import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Globe,
  Sparkles,
} from "lucide-react";
import { AboutBrandCard } from "./about-brand-card";

export const metadata: Metadata = {
  title: "About Us | Inzaghi's Blog Aggregator",
  description:
    "Inzaghi's Blog adalah Platform Blogging sebagai tempat untuk berbagi Ilmu Pengetahuan seperti Teknologi, Sains, Tips dan Tutorial, Berita, dan lain-lain.",
};

const blogEcosystem = [
  {
    title: "Inzaghi's Blog Legacy",
    year: "Since 2018",
    category: "Old Blog / Parent",
    url: "https://inzaghiposuma.blogspot.com",
    description:
      "Blog pertama yang telah hadir sejak tahun 2018, menjadi tempat berbagi berbagai topik umum, catatan perjalanan, dan pemikiran inspiratif.",
    badge: "Legacy",
  },
  {
    title: "Teknoblog",
    year: "Since 2023",
    category: "Technology Focus",
    url: "https://enzatech.blogspot.com",
    description:
      "Pindahan dari blog lama yang secara khusus menyajikan pembahasan mendalam tentang dunia teknologi, pemrograman, web development, dan tutorial IT.",
    badge: "Tech",
  },
  {
    title: "Miniblog",
    year: "Since 2023",
    category: "Microblogging",
    url: "https://enzashorts.blogspot.com",
    description:
      "Platform microblogging ringkas untuk membagikan snippet kode, cheatsheet cepat, serta tips dan trik praktis yang mudah dipahami dalam sekejap.",
    badge: "Shorts",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      {/* Page Header */}
      <header className="mb-10 sm:mb-14">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
          About Us
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          About Inzaghi&apos;s Blog
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
          Mengenal lebih dekat platform blogging, portal artikel, dan ekosistem
          pengetahuan Inzaghi&apos;s Blog.
        </p>
      </header>

      {/* Main 2-Column Responsive Grid */}
      <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Text Content */}
        <div className="space-y-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] lg:col-span-7">
          <p className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4 font-medium text-zinc-800 dark:text-zinc-200">
            <strong className="text-orange-600 dark:text-orange-400">
              Inzaghi&apos;s Blog
            </strong>{" "}
            adalah Platform Blogging sebagai tempat untuk berbagi Ilmu
            Pengetahuan seperti Teknologi, Sains, Tips dan Tutorial, Berita, dan
            lain-lain. Di sini kami hanya akan memberikan Anda konten yang
            menarik, yang sangat Anda sukai.
          </p>

          <p>
            Melalui <strong>Inzaghi&apos;s Blog Aggregator</strong> ini, seluruh
            konten dan artikel dari berbagai lini blog kami disatukan dalam satu
            wadah terintegrasi yang modern, cepat, dan mudah diakses. Situs ini
            dirancang untuk memberikan pengalaman membaca yang lebih bersih,
            nyaman, dan terpusat bagi pembaca setia kami.
          </p>

          <p>
            Inzaghi&apos;s Blog juga memudahkan Anda untuk mengakses dan
            menjelajahi berbagai macam topik artikel mendalam, mulai dari
            Seputar IT, Sains, Doa dan Ibadah, Edukasi, Campus Life, hingga kode
            program dan tutorial singkat yang dapat dicari dengan mudah melalui
            kategori, pencarian pintar, dan format microblogging.
          </p>

          <p>
            Perjalanan Inzaghi&apos;s Blog telah dimulai sejak tahun 2018
            melalui <strong>Inzaghi&apos;s Blog Legacy</strong>, yang kemudian
            berkembang dengan hadirnya <strong>Teknoblog</strong> dan{" "}
            <strong>Miniblog</strong> pada tahun 2023. Sebagai bagian resmi dari{" "}
            <strong>Inzaghi&apos;s Group</strong> dan didukung penuh oleh{" "}
            <strong>Inzaghi&apos;s Corp (InzaTech Poshaf Corp)</strong>, kami
            terus berdedikasi untuk menyajikan informasi yang edukatif,
            inspiratif, dan bermanfaat bagi masyarakat luas.
          </p>

          {/* Quick CTA Links */}
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-95"
            >
              <BookOpen className="size-4" />
              Explore Articles
            </Link>
            <Link
              href="/blog-lists"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/80 px-4 py-2.5 text-xs font-bold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 active:scale-95"
            >
              <Globe className="size-4" />
              Our Blogs
            </Link>
            <Link
              href="/microblogs"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/80 px-4 py-2.5 text-xs font-bold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 active:scale-95"
            >
              <Sparkles className="size-4" />
              Microblogs
            </Link>
          </div>
        </div>

        {/* Right Column: Brand Card (Responsive Grid Image) */}
        <div className="w-full lg:col-span-5">
          <AboutBrandCard />
        </div>
      </section>

      {/* Blog Ecosystem Section */}
      <section className="mt-16 sm:mt-20">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Blog Network & Ecosystem
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              Lini blog yang terafiliasi di dalam ekosistem Inzaghi&apos;s Blog.
            </p>
          </div>
          <Link
            href="/blog-lists"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200"
          >
            Lihat semua blog
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {blogEcosystem.map((item) => (
            <article
              key={item.title}
              className="paper flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
                    {item.year}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 border-t border-zinc-200/60 pt-3 dark:border-zinc-800">
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 hover:underline dark:text-orange-300"
                >
                  Kunjungi Blog
                  <ExternalLink className="size-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
