import { ServerStatus } from "@/types/types";

interface ServerStatusBadgeProps {
  status: ServerStatus;
}

export function ServerStatusBadge({ status }: ServerStatusBadgeProps) {
  const variants = {
    up: {
      className:
        "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",
      label: "Up",
      icon: (
        <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
      ),
    },
    down: {
      className: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",
      label: "Down",
      icon: (
        <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
      ),
    },
    degraded: {
      className:
        "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200",
      label: "Degraded",
      icon: (
        <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
      ),
    },
  };

  const variant = variants[status];

  return (
    <div
      className={`${variant.className} inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden`}
    >
      {variant.icon}
      {variant.label}
    </div>
  );
}
