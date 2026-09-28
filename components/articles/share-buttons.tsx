"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

interface ShareButtonsProps {
  articleUrl: string;
}

const buttonClassName =
  "inline-flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-200 hover:dark:bg-gray-700";

export function ShareButtons({ articleUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(articleUrl);

  async function copyArticleUrl() {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-3 flex gap-2">
      <a
        href={`https://wa.me/?text=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className={buttonClassName}
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <FaWhatsapp className="size-4" aria-hidden="true" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className={buttonClassName}
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <FaFacebookF className="size-4" aria-hidden="true" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className={buttonClassName}
        aria-label="Share on X"
        title="Share on X"
      >
        <FaXTwitter className="size-4" aria-hidden="true" />
      </a>
      <a
        href={`https://www.instagram.com/share?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className={buttonClassName}
        aria-label="Share on Instagram"
        title="Share on Instagram"
      >
        <FaInstagram className="size-4" aria-hidden="true" />
      </a>
      {/* <button
        type="button"
        onClick={copyArticleUrl}
        className={buttonClassName}
        aria-label={copied ? "Article link copied" : "Copy link for Instagram"}
        title={copied ? "Link copied" : "Copy link for Instagram"}
      >
        <FaInstagram className="size-4" aria-hidden="true" />
      </button> */}
    </div>
  );
}
