import { NextResponse } from "next/server";
import { getArticle } from "@/lib/blogger/service";
import { incrementViewCount } from "@/lib/blogger/views";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const article = await getArticle((await params).id);
  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const views = await incrementViewCount(article);
  return views === null
    ? NextResponse.json(
        { error: "Persistent view tracking is not configured" },
        { status: 503 },
      )
    : NextResponse.json({ views });
}