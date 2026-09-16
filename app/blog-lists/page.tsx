import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Blogs | Inzaghi's Blog Aggregator",
  description: "List of all blogs associated with Inzaghi Posuma.",
};

const blogs = [
  {
    title: "Inzaghi's Blog Legacy",
    url: "https://inzaghiposuma.blogspot.com",
    image: "/images/inzaghis-blog-legacy.png",
    description: "Merupakan Blog Lama yang sudah tersedia sejak Tahun 2018, tempat untuk memposting apapun itu.",
    category: "Personal",
    since: "Since 2018",
  },
  {
    title: "Teknoblog",
    url: "https://enzatech.blogspot.com",
    image: "/images/teknoblog-by-inzaghis-blog.png",
    description: "Merupakan Pindahan dari Blog Lama yang bernama Inzaghi's Blog (Legacy), dan Artikel yang dikhususkan tentang Teknologi.",
    category: "Technology",
    since: "Since 2024",
  },
  {
    title: "Miniblog",
    url: "https://enzashorts.blogspot.com",
    image: "/images/miniblog-by-inzaghis-blog.png",
    description: "Merupakan Blog khusus Microblogging, terutama untuk menyimpan Postingan Sederhana seperti Kode Program Sederhana, hingga Teks dan Tutorial Singkat.",
    category: "Microblogging",
    since: "Since 2024",
  },
];

export default function BlogListsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:px-0">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Our Blogs
        </h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          Explore the various blogs and platforms maintained by Inzaghi Posuma.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <Link href={blog.url} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                    {blog.category}
                  </span>
                  <span className="text-[10px] font-medium text-zinc-400">
                    {blog.since}
                  </span>
                </div>
                
                <h3 className="mt-4 text-xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
                  {blog.title}
                </h3>
                
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {blog.description}
                </p>

                <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        src="/images/inzaghi-posuma-alkahfi.jpg"
                        alt="Inzaghi Posuma"
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </div>
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Inzaghi Posuma
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
