"use client";

import Image from "next/image";
import { useState } from "react";

interface ArticleContentProps {
  cover: string;
  html: string;
}

const isImageUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url, window.location.href);
    if (/\.(jpe?g|png|gif|webp|avif|bmp|svg)(\?|#|$)/i.test(parsed.pathname)) {
      return true;
    }
    return /googleusercontent\.com\/img\//i.test(parsed.hostname + parsed.pathname);
  } catch {
    return false;
  }
};

export function ArticleContent({ cover, html }: ArticleContentProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  return (
    <>
      <div className="relative mt-7 aspect-video overflow-hidden rounded-2xl">
        <Image
          src={cover}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
          onClick={() => setPreviewSrc(cover)}
        />
      </div>

      <div
        className="article-copy text-[15px]"
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={(event) => {
          const target = event.target as HTMLElement;
          const img = target.closest("img");
          if (img) {
            const src = (img as HTMLImageElement).currentSrc || img.getAttribute("src");
            if (src) {
              event.preventDefault();
              setPreviewSrc(src);
            }
            return;
          }
          const anchor = target.closest("a");
          if (anchor && isImageUrl(anchor.href)) {
            event.preventDefault();
            setPreviewSrc(anchor.href);
          }
        }}
      />

      {previewSrc ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewSrc(null)}
        >
          <div className="relative max-h-full max-w-full overflow-hidden rounded-lg bg-black shadow-2xl">
            <button
              onClick={() => setPreviewSrc(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-2 text-xs font-bold text-zinc-900 shadow-lg"
            >
              Close
            </button>
            <img
              src={previewSrc}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
