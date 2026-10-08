"use client";

import { useEffect, useRef, useState } from "react";
import {
  getArticleHeadings,
  type ArticleHeading,
} from "./article-outline-utils";

interface ArticleOutlineProps {
  html: string;
}

export function ArticleOutline({ html }: ArticleOutlineProps) {
  const [headings, setHeadings] = useState<ArticleHeading[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const parsed = new DOMParser().parseFromString(html, "text/html");
    setHeadings(
      getArticleHeadings(parsed.body).filter((heading) => heading.text),
    );
  }, [html]);

  useEffect(() => {
    if (!headings?.length) return;

    const articleRoot = document.querySelector<HTMLElement>(".article-copy");
    if (!articleRoot) return;

    const renderedHeadings = getArticleHeadings(articleRoot);
    const headingElements = articleRoot.querySelectorAll<HTMLHeadingElement>(
      "h1, h2, h3, h4, h5, h6",
    );
    headingElements.forEach((heading, index) => {
      if (!heading.id) heading.id = renderedHeadings[index].id;
    });

    const updateActiveHeading = () => {
      const activationLine = 180;
      const articleTop = articleRoot.getBoundingClientRect().top;
      if (articleTop > activationLine) {
        setActiveId(null);
        return;
      }

      const activeHeading = [...headingElements]
        .reverse()
        .find(
          (heading) => heading.getBoundingClientRect().top <= activationLine,
        );
      setActiveId(activeHeading?.id ?? headingElements[0]?.id ?? null);
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveHeading);
    };

    updateActiveHeading();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  useEffect(() => {
    if (!activeId || !navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLElement>(
      `[data-outline-id="${CSS.escape(activeId)}"]`,
    );
    if (!activeLink) return;

    const navBounds = navRef.current.getBoundingClientRect();
    const linkBounds = activeLink.getBoundingClientRect();
    if (linkBounds.top < navBounds.top) {
      navRef.current.scrollTop -= navBounds.top - linkBounds.top;
    } else if (linkBounds.bottom > navBounds.bottom) {
      navRef.current.scrollTop += linkBounds.bottom - navBounds.bottom;
    }
  }, [activeId]);

  if (!headings) return null;
  if (headings.length === 0) {
    return (
      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
        No headings in this article.
      </p>
    );
  }

  return (
    <nav
      ref={navRef}
      aria-label="Article headings"
      className="mt-4 pr-1 lg:max-h-[55dvh] lg:overflow-y-auto lg:overscroll-contain"
    >
      <ol className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 0.65}rem` }}
          >
            <a
              href={`#${encodeURIComponent(heading.id)}`}
              aria-label={`Go to heading: ${heading.text}`}
              data-outline-id={heading.id}
              aria-current={activeId === heading.id ? "location" : undefined}
              className={`flex min-w-0 items-start gap-2 rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                activeId === heading.id
                  ? "font-semibold text-orange-600 dark:text-orange-400"
                  : "text-zinc-600 hover:text-orange-600 dark:text-zinc-300 dark:hover:text-orange-400"
              }`}
            >
              <span className="shrink-0 pt-0.5 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                H{heading.level}
              </span>
              <span className="min-w-0 wrap-break-word">{heading.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
