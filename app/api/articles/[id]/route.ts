import { NextResponse } from "next/server";
import { getArticle } from "@/lib/blogger/service";
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const article = await getArticle((await params).id);
  return article
    ? NextResponse.json(article)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
