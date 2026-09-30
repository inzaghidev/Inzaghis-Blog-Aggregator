"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ArticleViewCount({
  articleId,
  initialViews,
}: {
  articleId: string;
  initialViews: number;
}) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const storageKey = `article-viewed:${articleId}`;
    if (sessionStorage.getItem(storageKey)) return;

    sessionStorage.setItem(storageKey, "1");
    fetch(`/api/articles/${encodeURIComponent(articleId)}/views`, {
      method: "POST",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("View count update failed");
        const data = (await response.json()) as { views: number };
        setViews(data.views);
      })
      .catch(() => sessionStorage.removeItem(storageKey));
  }, [articleId]);

  return (
    <span className="flex items-center gap-3 text-zinc-500" aria-live="polite">
      <Eye className="size-4" /> {views.toLocaleString("en-US")}
    </span>
  );
}