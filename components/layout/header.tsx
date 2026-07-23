"use client";
import Link from "next/link";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
export function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark((x) => !x);
  };
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl dark:border-white/8 dark:bg-[#0b0b0c]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-sm font-bold tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-lg border border-orange-500 text-xs text-orange-500">
            ◇
          </span>
          <span>
            inzaghi<span className="text-orange-500">.blog</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-xs font-semibold text-zinc-500 md:flex">
          <Link className="text-orange-600" href="/">
            Home
          </Link>
          <Link href="/categories">Categories</Link>
          <Link href="/authors/alex-rivera">Authors</Link>
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
          <Menu className="size-5" />
        </button>
      </div>
      {open && (
        <nav className="flex gap-5 border-t px-5 py-3 text-sm md:hidden">
          <Link href="/">Home</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/authors/alex-rivera">Authors</Link>
        </nav>
      )}
    </header>
  );
}
