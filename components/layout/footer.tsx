import Link from "next/link";
export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 px-5 py-12 text-xs text-zinc-500 dark:border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center">
        <div className="font-bold text-orange-500">
          ◇ inzaghi.blog
          <br />
          <span className="font-normal text-zinc-500">
            © 2026 Inzaghi&apos;s Blog. All rights reserved.
          </span>
        </div>
        <nav className="sm:ml-auto flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/categories">Guidelines</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/rss.xml">RSS</Link>
        </nav>
      </div>
    </footer>
  );
}
