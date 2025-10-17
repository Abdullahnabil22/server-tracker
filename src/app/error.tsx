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
    <div className="min-h-[calc(100dvh-0px)] w-full bg-gradient-to-b from-main via-foreground to-main text-text-main flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-overlay ring-1 ring-ring grid place-items-center shadow-lg shadow-[rgba(0,0,0,0.4)]">
          <TbMoodSadSquint className="h-10 w-10 text-text-main" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        {error?.message ? (
          <p className="mt-2 text-muted-foreground line-clamp-3">
            {error.message}
          </p>
        ) : (
          <p className="mt-2 text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
        )}

        {error?.digest && (
          <p className="mt-2 text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-4 py-2.5 font-medium text-foreground hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px transition"
          >
            <TbRefresh className="h-5 w-5" />
            Try again
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-overlay px-4 py-2.5 font-medium text-text-main hover:bg-main/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 active:translate-y-px transition"
          >
            <TbArrowBackUp className="h-5 w-5" />
            Go back
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-overlay px-4 py-2.5 font-medium text-text-main hover:bg-main/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 active:translate-y-px transition"
          >
            <TbHome className="h-5 w-5" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
