export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-4 py-6">
      <div className="h-96 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-10 grid grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div
            className="h-64 rounded-2xl bg-zinc-100 dark:bg-zinc-900"
            key={i}
          />
        ))}
      </div>
    </main>
  );
}
