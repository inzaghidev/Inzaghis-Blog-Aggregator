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
const ids = () =>
  (process.env.BLOGGER_BLOG_IDS || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
const api = async (path: string) => {
  const key = process.env.BLOGGER_API_KEY;
  if (!key) throw new Error("Blogger API is not configured");
  const response = await fetch(
    `https://www.googleapis.com/blogger/v3${path}${path.includes("?") ? "&" : "?"}key=${key}`,
    { next: { revalidate: 300 } },
  );
  if (!response.ok) throw new Error(`Blogger API returned ${response.status}`);
  return response.json();
};
const normalize = (post: any, blogId: string, i = 0): Article => {
  const content = sanitizeHtml(post.content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "pre",
      "code",
    ]),
    allowedAttributes: {
      "*": ["class"],
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
  });
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
    cover: post.images?.[0]?.url || mockArticles[i % mockArticles.length].cover,
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
      const data = await api(`/blogs/${id}/posts?maxResults=20`);
      return (data.items || []).map((p: any) => normalize(p, id, i));
    }),
  );
  const results = groups
    .flat()
    .sort((a, b) => +new Date(b.published) - +new Date(a.published));
  return query
    ? results.filter((a) =>
        `${a.title} ${a.excerpt}`.toLowerCase().includes(query.toLowerCase()),
      )
    : results;
}
export async function getArticle(id: string): Promise<Article | undefined> {
  if (id.startsWith("demo-")) return mockArticles.find((a) => a.id === id);
  for (const blogId of ids()) {
    try {
      return normalize(await api(`/blogs/${blogId}/posts/${id}`), blogId);
    } catch {
      /* next blog */
    }
  }
  return undefined;
}
export async function getBlogs(): Promise<Blog[]> {
  const blogIds = ids();
  if (!blogIds.length)
    return (["legacy", "teknoblog", "miniblog"] as BlogSource[]).map(
      (source, i) => ({ id: `demo-${i}`, source, name: names[source] }),
    );
  return Promise.all(
    blogIds.map(async (id, i) => {
      const data = await api(`/blogs/${id}`);
      return {
        id,
        source: sourceFor(i),
        name: data.name,
        description: data.description,
        url: data.url,
      };
    }),
  );
}
