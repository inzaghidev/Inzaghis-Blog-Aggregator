import sanitizeHtml from "sanitize-html";
import { excerpt } from "@/lib/utils";
import { mockArticles } from "./mock";
import type { Article, Blog, BlogSource } from "./types";

const names: Record<BlogSource, string> = {
  legacy: "IB Legacy",
  teknoblog: "Teknoblog",
  miniblog: "Miniblog",
};
const sourceFor = (position: number): BlogSource =>
  (["legacy", "teknoblog", "miniblog"] as BlogSource[])[position % 3];

const categoryRules = [
  {
    slug: "rumus-rumus",
    label: "Rumus-rumus",
    sources: ["legacy", "teknoblog"] as BlogSource[],
  },
  {
    slug: "tekno",
    label: "Tekno",
    sources: ["legacy", "teknoblog"] as BlogSource[],
  },
  {
    slug: "berita",
    label: "Berita",
    sources: ["legacy", "teknoblog", "miniblog"] as BlogSource[],
  },
  {
    slug: "umum-dan-lain-lain",
    label: "Umum dan Lain-lain",
    sources: ["legacy", "teknoblog"] as BlogSource[],
  },
  {
    slug: "artikel-pendek",
    label: "Artikel Pendek",
    sources: ["miniblog"] as BlogSource[],
  },
  {
    slug: "vlog",
    label: "VLOG",
    sources: ["legacy", "teknoblog", "miniblog"] as BlogSource[],
  },
  { slug: "resep", label: "Resep", sources: ["miniblog"] as BlogSource[] },
  {
    slug: "doa-dan-ibadah",
    label: "Doa dan Ibadah",
    sources: ["miniblog"] as BlogSource[],
  },
  {
    slug: "prompt-ai",
    label: "Prompt AI",
    sources: ["miniblog"] as BlogSource[],
  },
] as const;

export function normalizeCategoryKey(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

export function isArticleInCategory(
  article: Article,
  categorySlug: string,
): boolean {
  const normalizedSlug = normalizeCategoryKey(categorySlug);
  const rule = categoryRules.find(
    (entry) =>
      normalizeCategoryKey(entry.slug) === normalizedSlug ||
      normalizeCategoryKey(entry.label) === normalizedSlug,
  );

  if (rule) {
    return (
      rule.sources.includes(article.source) &&
      article.labels.some(
        (label) =>
          normalizeCategoryKey(label) === normalizeCategoryKey(rule.label),
      )
    );
  }

  return article.labels.some(
    (label) =>
      normalizeCategoryKey(label) === normalizedSlug ||
      normalizeCategoryKey(label).includes(normalizedSlug),
  );
}
const ids = () =>
  (process.env.BLOGGER_BLOG_IDS || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const api = async (path: string, attempts = 2): Promise<any> => {
  const key = process.env.BLOGGER_API_KEY;
  if (!key) throw new Error("Blogger API is not configured");
  const url = `https://www.googleapis.com/blogger/v3${path}${path.includes("?") ? "&" : "?"}key=${key}`;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { next: { revalidate: 300 } });
      if (response.ok) return response.json();
      const retryable = response.status === 429 || response.status >= 500;
      if (attempt < attempts && retryable) {
        await wait(attempt * 400);
        continue;
      }
      throw new Error(`Blogger API returned ${response.status}`);
    } catch (error) {
      if (attempt < attempts) {
        await wait(attempt * 400);
        continue;
      }
      throw error;
    }
  }
};

const safeApi = async (path: string): Promise<any> => {
  try {
    return await api(path);
  } catch {
    return null;
  }
};
const extractFirstImage = (content: string): string | null => {
  if (!content) return null;
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
};

const normalize = (post: any, blogId: string, i = 0): Article => {
  const content = sanitizeHtml(post.content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "pre",
      "code",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "caption",
      "figure",
      "figcaption",
      "div",
      "span",
    ]),
    allowedAttributes: {
      "*": ["class", "style"],
      a: ["href", "target", "rel", "style"],
      img: ["src", "alt", "width", "height", "style"],
      td: ["colspan", "rowspan", "style"],
      th: ["colspan", "rowspan", "style"],
    },
  });

  const parsedCover = extractFirstImage(post.content || "");
  let cover =
    parsedCover ||
    post.images?.[0]?.url ||
    mockArticles[i % mockArticles.length].cover;
  if (cover && cover.startsWith("//")) {
    cover = `https:${cover}`;
  }

  return {
    id: post.id,
    blogId,
    source: sourceFor(i),
    title: post.title,
    content,
    excerpt: excerpt(content),
    published: post.published,
    updated: post.updated,
    url: `/posts/${post.id}`,
    cover,
    labels: post.labels || ["Technology"],
    author: { name: post.author?.displayName || "Inzaghi's Blog" },
    views: 0,
    comments: 0,
  };
};

export async function getArticles(query?: string): Promise<Article[]> {
  const blogIds = ids();
  if (!blogIds.length)
    return query
      ? mockArticles.filter((a) =>
          `${a.title} ${a.excerpt}`.toLowerCase().includes(query.toLowerCase()),
        )
      : mockArticles;
  const groups = await Promise.all(
    blogIds.map(async (id, i) => {
      const data = await safeApi(`/blogs/${id}/posts?maxResults=50`);
      return (data?.items || []).map((p: any) => normalize(p, id, i));
    }),
  );
  const results = groups
    .flat()
    .sort((a, b) => +new Date(b.published) - +new Date(a.published));
  const source = results.length ? results : mockArticles;
  return query
    ? source.filter((a) =>
        `${a.title} ${a.excerpt}`.toLowerCase().includes(query.toLowerCase()),
      )
    : source;
}
export async function getArticle(id: string): Promise<Article | undefined> {
  if (id.startsWith("demo-")) return mockArticles.find((a) => a.id === id);
  const blogIds = ids();
  for (let i = 0; i < blogIds.length; i++) {
    const blogId = blogIds[i];
    try {
      return normalize(await api(`/blogs/${blogId}/posts/${id}`), blogId, i);
    } catch {
      /* next blog */
    }
  }
  return undefined;
}
export async function getBlogs(): Promise<Blog[]> {
  const blogIds = ids();
  const demoBlogs = (["legacy", "teknoblog", "miniblog"] as BlogSource[]).map(
    (source, i) => ({ id: `demo-${i}`, source, name: names[source] }),
  );
  if (!blogIds.length) return demoBlogs;
  const blogs = await Promise.all(
    blogIds.map(async (id, i): Promise<Blog | null> => {
      const data = await safeApi(`/blogs/${id}`);
      if (!data) return null;
      return {
        id,
        source: sourceFor(i),
        name: data.name,
        description: data.description,
        url: data.url,
      };
    }),
  );
  const real = blogs.filter((blog): blog is Blog => blog !== null);
  return real.length ? real : demoBlogs;
}
