"use client";

import {
  TbMoodSadSquint,
  TbArrowBackUp,
  TbRefresh,
  TbHome,
} from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Next.js App Router error boundary component signature
export default function Error(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const { error, reset } = props;

  return (
    <div className="min-h-[calc(100dvh-0px)] w-full bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-zinc-100 flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-zinc-800/60 ring-1 ring-white/10 grid place-items-center shadow-lg shadow-black/40">
          <TbMoodSadSquint className="h-10 w-10 text-zinc-200" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        {error?.message ? (
          <p className="mt-2 text-zinc-400 line-clamp-3">{error.message}</p>
        ) : (
          <p className="mt-2 text-zinc-400">
            An unexpected error occurred. Please try again.
          </p>
        )}

        {error?.digest && (
          <p className="mt-2 text-xs text-zinc-500">Error ID: {error.digest}</p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 font-medium text-zinc-900 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:translate-y-px transition"
          >
            <TbRefresh className="h-5 w-5" />
            Try again
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800/60 px-4 py-2.5 font-medium text-zinc-200 hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 active:translate-y-px transition"
          >
            <TbArrowBackUp className="h-5 w-5" />
            Go back
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800/60 px-4 py-2.5 font-medium text-zinc-200 hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 active:translate-y-px transition"
          >
            <TbHome className="h-5 w-5" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
