import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center text-white">
      <h1 className="text-5xl font-black">Project unavailable</h1>
      <p className="mt-4 max-w-xl text-zinc-300">
        This title is not in the project catalog yet. Add it in the data folder, then link to its id.
      </p>
      <Link
        href="/browse"
        className="focus-ring mt-8 rounded bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
      >
        Back to Browse
      </Link>
    </main>
  );
}
