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
            &copy; 2026 Inzaghi&apos;s Blog., by InzaTech Poshaf Corp. All
            rights reserved.
          </span>
        </div>
        <nav className="sm:ml-auto flex flex-wrap gap-4 items-center">
          <Link className="hover:text-orange-500" href="/about">
            About
          </Link>
          <Link className="hover:text-orange-500" href="/blogs">
            Blogs
          </Link>
          <Link className="hover:text-orange-500" href="/microblogs">
            Microblogs
          </Link>
          <Link className="hover:text-orange-500" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="hover:text-orange-500" href="/disclaimer">
            Terms of Service
          </Link>
          <Link className="hover:text-orange-500" href="/sitemap-client">
            Sitemap
          </Link>
          <Link className="hover:text-orange-500" href="/rss.xml">
            RSS
          </Link>
          <Link
            href="https://linktr.ee/inzaghigroup"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-700 dark:text-green-300 hover:text-green-900 hover:dark:text-green-100"
          >
            Linktree Inzaghi's Group
          </Link>
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
