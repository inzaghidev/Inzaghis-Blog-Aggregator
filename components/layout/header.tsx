// Old Code

"use client";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Moon,
  Search,
  SearchSlash,
  Sun,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const blogLinks = [
  { label: "IB Legacy", href: "https://inzaghiposuma.blogspot.com" },
  { label: "Teknoblog", href: "https://enzatech.blogspot.com" },
  { label: "Miniblog", href: "https://enzashorts.blogspot.com" },
];

export function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [blogsOpen, setBlogsOpen] = useState(false);
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

  const closeMobileMenu = () => {
    setOpen(false);
    setBlogsOpen(false);
  };

  const isActivePath = (path: string) => {
    const isHome = path === "/";
    return isHome
      ? pathname === "/" || pathname === "" || pathname === "//"
      : pathname === path;
  };

  const desktopLinkClass = (path: string) =>
    isActivePath(path)
      ? "px-3 py-2 font-bold text-orange-500 md:px-0 lg:py-3"
      : "px-3 py-2 text-zinc-500 transition-colors dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 md:px-0 lg:py-3";

  const mobileLinkClass = (path: string) =>
    `rounded-lg px-3 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
      isActivePath(path)
        ? "font-bold text-orange-500"
        : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
    }`;

  return (
    <header
      className={
        dark
          ? "sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl dark:bg-[#0b0b0c]/80"
          : "sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl dark:border-white/8"
      }
    >
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
              src={
                dark
                  ? "/icons/inzaghis-blog-logo-vertical-white-transparent.png"
                  : "/icons/inzaghis-blog-logo-vertical-transparent.png"
              }
              title="Inzaghi's Blog"
              className="h-10 w-auto max-w-[160px]"
              alt="Inzaghi's Blog"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-4 hidden items-center gap-5 text-xs font-semibold md:flex lg:ml-8">
          <Link className={desktopLinkClass("/")} href="/">
            Home
          </Link>

          <Link className={desktopLinkClass("/blogs")} href="/blogs">
            Blogs
          </Link>

          <Link className={desktopLinkClass("/microblogs")} href="/microblogs">
            Microblogs
          </Link>

          <Link
            className={desktopLinkClass("/sitemap-client")}
            href="/sitemap-client"
          >
            Sitemap
          </Link>
        </nav>

        {/* Search (Desktop Only) */}
        {/* <form
          role="search"
          onSubmit={submitSearch}
          className="ml-4 hidden max-w-[400px] min-w-0 flex-1 items-center rounded-full bg-zinc-200 px-3 py-2 text-xs text-zinc-400 transition focus-within:bg-zinc-50 focus-within:ring-2 focus-within:ring-orange-500/40 dark:bg-zinc-900 dark:focus-within:bg-zinc-800 md:ml-4 md:flex lg:ml-8"
        > */}
        <form
          role="search"
          onSubmit={submitSearch}
          className="ml-4 hidden max-w-[400px] min-w-0 flex-1 items-center rounded-full bg-zinc-100 px-3 py-2 text-xs text-zinc-400 transition focus-within:bg-zinc-50 focus-within:ring-2 focus-within:ring-orange-500/40 dark:bg-zinc-900 dark:focus-within:bg-zinc-800 md:ml-4 md:flex lg:ml-8"
        >
          <Search className="mr-2 size-3.5 shrink-0" />

          <input
            ref={desktopSearchRef}
            aria-label="Search articles"
            className="min-w-0 w-full bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
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
            {mobileSearch ? (
              <SearchSlash className="size-5" />
            ) : (
              <Search className="size-5" />
            )}
          </button>

          {/* Dark Mode */}
          <button
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggle}
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-zinc-100 hover:shadow-sm active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          {/* Our Blogs */}
          <div className="relative hidden md:block">
            <button
              type="button"
              aria-expanded={blogsOpen}
              aria-haspopup="true"
              aria-controls="desktop-blog-menu"
              onClick={() => setBlogsOpen(!blogsOpen)}
              className="flex items-center gap-2 rounded-lg border border-white/25 bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-orange-950/10 backdrop-blur-xl transition-all duration-200 hover:bg-orange-600/85 hover:shadow-lg active:scale-95"
            >
              Our Blogs
              <ChevronDown
                className={`size-3.5 transition-transform ${blogsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {blogsOpen && (
              <div
                id="desktop-blog-menu"
                className="absolute right-0 top-full z-50 mt-2 min-w-44 overflow-hidden rounded-xl border border-white/10 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-zinc-900/95"
              >
                <Link
                  href="/blog-lists"
                  onClick={() => setBlogsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  All Blogs
                </Link>
                <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
                {blogLinks.map((blog) => (
                  <a
                    key={blog.label}
                    href={blog.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setBlogsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  >
                    {blog.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => {
              setOpen(!open);
              setBlogsOpen(false);
            }}
            className="rounded-lg p-2 text-zinc-500 transition-all duration-200 hover:bg-zinc-100 hover:shadow-sm active:scale-95 dark:hover:bg-zinc-800 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {mobileSearch && (
        <div className="border-t border-zinc-200 bg-[#fffdfb] px-4 py-3 dark:border-zinc-800 dark:bg-[#272422] md:hidden">
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
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-zinc-200 bg-[#fffdfb] dark:border-zinc-800 dark:bg-[#272422] md:hidden">
          <nav className="flex flex-col px-5 py-4 gap-3">
            <Link
              href="/"
              className={mobileLinkClass("/")}
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            <Link
              href="/blogs"
              className={mobileLinkClass("/blogs")}
              onClick={closeMobileMenu}
            >
              Blogs
            </Link>

            <Link
              href="/microblogs"
              className={mobileLinkClass("/microblogs")}
              onClick={closeMobileMenu}
            >
              Microblogs
            </Link>

            <Link
              href="/sitemap-client"
              className={mobileLinkClass("/sitemap-client")}
              onClick={closeMobileMenu}
            >
              Sitemap
            </Link>

            <div className="relative mt-2">
              <div className="flex items-center rounded-xl border border-white/25 bg-orange-500 text-white shadow-md shadow-orange-950/10 backdrop-blur-xl transition-colors hover:bg-orange-600/85">
                <Link
                  href="/blog-lists"
                  className="flex-1 px-4 py-3 text-sm font-bold"
                  onClick={closeMobileMenu}
                >
                  Our Blogs
                </Link>
                <button
                  type="button"
                  aria-label={blogsOpen ? "Hide blog links" : "Show blog links"}
                  aria-expanded={blogsOpen}
                  aria-controls="mobile-blog-menu"
                  onClick={() => setBlogsOpen(!blogsOpen)}
                  className="self-stretch rounded-r-lg px-4 transition-colors hover:bg-orange-700/80"
                >
                  <ChevronDown
                    className={`size-4 transition-transform ${blogsOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {blogsOpen && (
                <div
                  id="mobile-blog-menu"
                  className="mt-2 flex flex-col rounded-lg border border-orange-200/50 bg-white/70 p-1.5 shadow-lg backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-zinc-900/70"
                >
                  {blogLinks.map((blog) => (
                    <a
                      key={blog.label}
                      href={blog.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="rounded-md px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      {blog.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
