import type { Article } from "./types";

const redisConfig = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
};

const viewKey = (article: Pick<Article, "blogId" | "id">) =>
  `blog-aggregator:views:${article.blogId}:${article.id}`;

const redisRequest = async (path: string) => {
  const config = redisConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/${path}`, {
    headers: { Authorization: `Bearer ${config.token}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`View store returned ${response.status}`);
  return response.json() as Promise<{ result: unknown }>;
};

export async function getViewCounts(
  articles: Pick<Article, "blogId" | "id">[],
): Promise<Map<string, number>> {
  if (!articles.length || !redisConfig()) return new Map();

  try {
    const keys = articles.map(viewKey);
    const result = await redisRequest(
      `mget/${keys.map(encodeURIComponent).join("/")}`,
    );
    const counts = result?.result;
    if (!Array.isArray(counts)) return new Map();

    return new Map(
      articles.flatMap((article, index) => {
        const count = Number(counts[index]);
        return Number.isSafeInteger(count) && count >= 0
          ? [[article.id, count]]
          : [];
      }),
    );
  } catch {
    return new Map();
  }
}

export async function incrementViewCount(
  article: Pick<Article, "blogId" | "id">,
): Promise<number | null> {
  if (!redisConfig()) return null;

  try {
    const result = await redisRequest(
      `incr/${encodeURIComponent(viewKey(article))}`,
    );
    const count = Number(result?.result);
    return Number.isSafeInteger(count) && count > 0 ? count : null;
  } catch {
    return null;
  }
}
