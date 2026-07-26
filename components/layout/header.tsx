"use client";
import Link from "next/link";
import { Bell, Menu, X, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark((x) => !x);
  };

  const linkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "text-orange-500 font-bold"
      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl dark:border-white/8 dark:bg-[#0b0b0c]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-sm font-bold tracking-tight"
        >
          <div
            id="header-logo inzaghis-blog-logo"
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <img
              src="/icons/inzaghis-blog-logo-vertical-transparent.png"
              title="Inzaghi's Blog"
              className="!h-14"
              id="logo-nav"
              alt="Inzaghi's Blog"
            />
          </div>
        </Link>
        <nav className="hidden items-center gap-5 text-xs font-semibold md:flex">
          <Link className={linkClass("/")} href="/">
            Home
          </Link>
          <Link className={linkClass("/blogs")} href="/blogs">
            Blogs
          </Link>
          <Link className={linkClass("/microblogs")} href="/microblogs">
            Microblogs
          </Link>
        </nav>
        <div className="ml-auto hidden max-w-xs flex-1 items-center rounded-full bg-zinc-100 px-3 py-2 text-xs text-zinc-400 dark:bg-zinc-900 sm:flex">
          <Search className="mr-2 size-3.5" />
          <input
            aria-label="Search articles"
            className="w-full bg-transparent outline-none"
            placeholder="Search articles..."
          />
        </div>
        <button
          aria-label="Toggle dark mode"
          onClick={toggle}
          className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
        <Bell className="hidden size-4 text-zinc-500 sm:block" />
        <Link
          href="/admin"
          className="hidden rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600 sm:block"
        >
          Create post
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-3 border-t px-5 py-4 text-sm md:hidden bg-white dark:bg-[#0b0b0c]">
          <Link
            onClick={() => setOpen(false)}
            className={linkClass("/")}
            href="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className={linkClass("/blogs")}
            href="/blogs"
          >
            Blogs
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className={linkClass("/microblogs")}
            href="/microblogs"
          >
            Microblogs
          </Link>
        </nav>
      )}
    </header>
  );
}
