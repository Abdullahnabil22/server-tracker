import { Server } from "@/types/types";
import { ServerStatusBadge } from "./serverBadge";
import Link from "next/link";

export default function ServerCard({ server }: { server: Server }) {
  return (
    <Link
      href={`/servers/${server.id}`}
      aria-label={`Open server ${server.name}`}
      className="relative text-background flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-[rgba(24,29,84,0.6)] backdrop-blur-sm border-[rgba(255,255,255,0.06)] p-5 cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <header className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{server.name}</h3>
            <p className="text-sm text-muted-foreground">{server.type}</p>
          </div>
          <ServerStatusBadge status={server.status} />
        </div>
      </header>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-1">IP Address</p>
            <p className="font-mono font-medium">{server.ipAddress}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Location</p>
            <p className="font-medium">{server.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Response Time</p>
            <p className="font-semibold">
              {server.status === "down" ? "N/A" : `${server.responseTime}ms`}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Uptime</p>
            <p className="font-semibold">{server.uptime}%</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
