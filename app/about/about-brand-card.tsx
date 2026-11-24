"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";

interface BrandImage {
  id: string;
  label: string;
  src: string;
  alt: string;
  description: string;
}

const brandImages: BrandImage[] = [
  {
    id: "blog",
    label: "Inzaghi's Blog",
    src: "/images/inzaghis-blog-by-inzaghis-group-corp.png",
    alt: "Inzaghi's Blog - A member of Inzaghi's Group and Powered by Inzaghi's Corp",
    description: "Official Inzaghi's Blog Brand Identity",
  },
  {
    id: "inzatech",
    label: "Inzaghi's Group",
    src: "/images/inzaghis-group-partners.png",
    alt: "Inzaghi's Group and Powered by Inzaghi's Corp",
    description: "Inzaghi's Group Portal Brand Identity",
  },
];

export function AboutBrandCard() {
  const [selectedId, setSelectedId] = useState<string>("blog");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage =
    brandImages.find((img) => img.id === selectedId) ?? brandImages[0];

  return (
    <div className="space-y-3">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between">
        <div className="inline-flex rounded-xl bg-zinc-200/70 p-1 dark:bg-zinc-800/80">
          {brandImages.map((item) => {
            const isActive = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                type="button"
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-orange-600 shadow-sm dark:bg-zinc-900 dark:text-orange-400"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
          Group Brand
        </span>
      </div>

      {/* Main Image Card */}
      <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/70 p-2 shadow-lg shadow-zinc-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/70 dark:shadow-none sm:rounded-3xl sm:p-3">
        <div className="relative aspect-[1200/768] w-full overflow-hidden rounded-xl sm:rounded-2xl">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={1200}
            height={768}
            priority
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />

          {/* Quick zoom button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Zoom image"
            className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 active:scale-95"
          >
            <Maximize2 className="size-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between px-2 text-xs text-zinc-700 dark:text-zinc-300">
          <span className="font-semibold">{activeImage.description}</span>
          <span className="text-[11px] text-orange-700 dark:text-orange-300">
            A member of Inzaghi&apos;s Group
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-zinc-950 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
            >
              <X className="size-5" />
            </button>
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={1200}
              height={768}
              className="h-auto w-full rounded-xl object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
