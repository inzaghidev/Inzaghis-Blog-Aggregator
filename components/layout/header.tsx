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
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
        {/* Logo */}
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
              className="h-10 w-auto max-w-[160px]"
              alt="Inzaghi's Blog"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-8 hidden items-center gap-5 text-xs font-semibold md:flex">
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

        {/* Search (Desktop Only) */}
        <div className="ml-8 hidden max-w-xs flex-1 items-center rounded-full bg-zinc-100 px-3 py-2 text-xs text-zinc-400 dark:bg-zinc-900 lg:flex">
          <Search className="mr-2 size-3.5" />

          <input
            aria-label="Search articles"
            className="w-full bg-transparent outline-none"
            placeholder="Search articles..."
          />
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Dark Mode */}
          <button
            aria-label="Toggle dark mode"
            onClick={toggle}
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-zinc-100 hover:shadow-sm active:scale-95 dark:hover:bg-zinc-800"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          {/* Notification */}
          <button className="hidden rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-zinc-100 hover:shadow-sm active:scale-95 dark:hover:bg-zinc-800 sm:block">
            <Bell className="size-4" />
          </button>

          {/* Create Post */}
          <Link
            href="/admin"
            className="hidden rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:shadow-md active:scale-95 sm:block"
          >
            Create Post
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-zinc-100 hover:shadow-sm active:scale-95 dark:hover:bg-zinc-800 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <nav className="flex flex-col px-5 py-4 gap-3">
            <Link
              href="/"
              className={linkClass("/")}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/blogs"
              className={linkClass("/blogs")}
              onClick={() => setOpen(false)}
            >
              Blogs
            </Link>

            <Link
              href="/microblogs"
              className={linkClass("/microblogs")}
              onClick={() => setOpen(false)}
            >
              Microblogs
            </Link>

            <Link
              href="/admin"
              className="mx-5 mt-3 rounded-lg bg-orange-500 px-4 py-3 text-center text-sm font-bold text-white hover:bg-orange-600"
              onClick={() => setOpen(false)}
            >
              Create Post
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
