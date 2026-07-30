"use client";

import Image from "next/image";
import { useState } from "react";

interface ArticleContentProps {
  cover: string;
  html: string;
}

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
          if (target.tagName === "IMG") {
            const src = (target as HTMLImageElement).src;
            if (src) setPreviewSrc(src);
          }
        }}
      />

      {previewSrc ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewSrc(null)}
        >
          <div className="relative max-h-full max-w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
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
