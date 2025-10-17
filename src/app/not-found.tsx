import Link from "next/link";
import { TbGhost2, TbHome } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100dvh-0px)] w-full bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-zinc-100 flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-zinc-800/60 ring-1 ring-white/10 grid place-items-center shadow-lg shadow-black/40">
          <TbGhost2 className="h-10 w-10 text-zinc-200" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-zinc-400">
          The page you’re looking for doesn’t exist or has moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 font-medium text-zinc-900 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:translate-y-px transition"
          >
            <TbHome className="h-5 w-5" />
            Go home to Browse servers
          </Link>
        </div>
      </div>
    </div>
  );
}
