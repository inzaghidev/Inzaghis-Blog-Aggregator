"use client";
import Link from "next/link";
import { Menu, X, Moon, Search, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark =
      savedTheme === "dark"
        ? true
        : savedTheme === "light"
          ? false
          : prefersDark;

    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
  }, [pathname]);

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el || !el.tagName) return false;
      const tag = el.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || el.isContentEditable;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        focusSearch();
      } else if (e.key === "/" && !isTypingTarget(e.target)) {
        e.preventDefault();
        focusSearch();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const nextTheme = !dark;
    setDark(nextTheme);

    if (nextTheme) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  };

  const focusSearch = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      desktopSearchRef.current?.focus();
    } else {
      setMobileSearch(true);
      requestAnimationFrame(() => mobileSearchRef.current?.focus());
    }
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    setOpen(false);
    setMobileSearch(false);
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
              src={dark ? "/icons/inzaghis-blog-logo-vertical-white-transparent.png" : "/icons/inzaghis-blog-logo-vertical-transparent.png"}
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
        <form
          role="search"
          onSubmit={submitSearch}
          className="ml-8 hidden max-w-xs flex-1 items-center rounded-full bg-zinc-100 px-3 py-2 text-xs text-zinc-400 transition focus-within:bg-zinc-50 focus-within:ring-2 focus-within:ring-orange-500/40 dark:bg-zinc-900 dark:focus-within:bg-zinc-800 md:flex"
        >
          <Search className="mr-2 size-3.5 shrink-0" />

          <input
            ref={desktopSearchRef}
            aria-label="Search articles"
            className="w-full bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                desktopSearchRef.current?.focus();
              }}
              className="ml-1 shrink-0 rounded-full p-0.5 text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="size-3" />
            </button>
          ) : (
            <kbd className="ml-1 hidden shrink-0 rounded border border-zinc-300 px-1 py-0.5 text-[9px] font-semibold text-zinc-400 dark:border-zinc-700 lg:inline-flex">
              Ctrl K
            </kbd>
          )}
        </form>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search (Mobile Only) */}
          <button
            aria-label="Toggle search"
            onClick={() => setMobileSearch(!mobileSearch)}
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-zinc-100 hover:shadow-sm active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-800 md:hidden"
          >
            {mobileSearch ? <X className="size-5" /> : <Search className="size-5" />}
          </button>

          {/* Dark Mode */}
          <button
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggle}
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-zinc-100 hover:shadow-sm active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
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

      {/* Mobile Search */}
      {mobileSearch && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <form onSubmit={submitSearch} role="search">
            <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2.5 dark:bg-zinc-900">
              <Search className="size-4 shrink-0 text-zinc-400" />
              <input
                ref={mobileSearchRef}
                autoFocus
                aria-label="Search articles"
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="shrink-0 rounded-full p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </form>
        </div>
      )}

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
