import { Metadata } from "next";
import { getArticles } from "@/lib/blogger/service";
import { SearchClient } from "./search-client";

export const metadata: Metadata = {
  title: "Search",
};

export const revalidate = 300;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const articles = await getArticles();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <SearchClient articles={articles} initialQuery={q ?? ""} />
    </main>
  );
}
