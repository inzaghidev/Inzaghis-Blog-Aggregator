import Link from "next/link";
export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-5 text-center">
      <div>
        <p className="text-7xl font-extrabold text-orange-500">404</p>
        <h1 className="mt-4 text-2xl font-bold">
          This page drifted off the feed.
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          It may have moved, or it may never have existed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
