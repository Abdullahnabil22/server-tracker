import Link from "next/link";
import { TbGhost2, TbHome } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100dvh-0px)] w-full bg-gradient-to-b from-main via-foreground to-main text-text-main flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-overlay ring-1 ring-ring grid place-items-center shadow-lg shadow-[rgba(0,0,0,0.4)]">
          <TbGhost2 className="h-10 w-10 text-text-main" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          The page you’re looking for doesn’t exist or has moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-4 py-2.5 font-medium text-foreground hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px transition"
          >
            <TbHome className="h-5 w-5" />
            Go home to Browse servers
          </Link>
        </div>
      </div>
    </div>
  );
}
