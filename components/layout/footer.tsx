"use client";

import Link from "next/link";
import GitHubButton from "react-github-btn";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 px-5 py-12 text-xs text-zinc-500 dark:border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center">
        <div className="font-bold text-orange-500">
          <section className="inzaghis-blog-logo !mb-10">
            <Link href="/" id="logo">
              <img
                src="/icons/inzaghis-blog-logo-vertical-transparent.png"
                className="h-16 w-auto"
                id="logo-foot"
                alt="logo"
              />
            </Link>
          </section>
          <br />
          <span className="font-normal text-zinc-500">
            © 2026 Inzaghi&apos;s Blog., by InzaTech Poshaf Corp. All rights
            reserved.
          </span>
        </div>
        <nav className="sm:ml-auto flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/rss.xml">RSS</Link>
          <GitHubButton
            href="https://github.com/inzaghidev/Inzaghis-Blog-Aggregator"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-size="large"
            aria-label="Look at @inzaghidev"
          >
            Look at @inzaghidev
          </GitHubButton>
        </nav>
      </div>
    </footer>
  );
}
