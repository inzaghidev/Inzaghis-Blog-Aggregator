import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "@/lib/blogger/service";
const buckets = new Map<string, { count: number; reset: number }>();
export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  const item = buckets.get(ip) || { count: 0, reset: now + 60_000 };
  if (now > item.reset) {
    item.count = 0;
    item.reset = now + 60_000;
  }
  if (++item.count > 60)
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  buckets.set(ip, item);
  return NextResponse.json(
    await getArticles(request.nextUrl.searchParams.get("q") || undefined),
    {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    },
  );
}
