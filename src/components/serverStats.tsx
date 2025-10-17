import { Server } from "@/types/types";
import Card from "./ui/statCard";
import { BiCheck, BiServer } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import { FaXmark } from "react-icons/fa6";

export default function ServerStats({ servers }: { servers: Server[] }) {
  const upServers = servers.filter((s) => s.status === "up").length;
  const downServers = servers.filter((s) => s.status === "down").length;
  const degradedServers = servers.filter((s) => s.status === "degraded").length;
  const avgResponseTime =
    servers
      .filter((s) => s.status !== "down")
      .reduce((acc, s) => acc + s.responseTime, 0) /
    servers.filter((s) => s.status !== "down").length;
  const avgUptime =
    servers.reduce((acc, s) => acc + s.uptime, 0) / servers.length;
  const healthScore = Math.round((upServers / servers.length) * 100);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="col-span-1">
          <div className="grid gap-4 md:grid-cols-2 h-full">
            <div className=" bg-gradient-to-br from-up-dark/40 to-up-dark/10 backdrop-blur-xl border border-up/20 rounded-2xl p-8 hover:border-up/40 transition-all">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="rgba(226, 232, 240, 0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="url(#healthGradient)"
                      strokeWidth="8"
                      strokeDasharray={`${(healthScore / 100) * 351.86} 351.86`}
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient
                        id="healthGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                      >
                        <stop offset="0%" stopColor="var(--up)" />
                        <stop offset="100%" stopColor="var(--upDark)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-text-main">
                        {healthScore}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Operational
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground font-medium">
                  System Health
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-secondary/40 to-secondary/10 backdrop-blur-xl border border-secondary/20 rounded-2xl p-6 hover:border-secondary/40 transition-all">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-text-main mb-1">
                    {avgResponseTime.toFixed(0)}ms
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                </div>
                <div className="w-full bg-secondary/30 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (avgResponseTime / 1000) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Uptime: {avgUptime.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid gap-4 md:grid-cols-2 h-full">
            <Card
              title="Total Servers"
              number={servers.length}
              bgColor="bg-back"
              icon={<BiServer className="text-secondary w-5 h-5" />}
            />
            <Card
              title="Up Servers"
              number={upServers}
              bgColor="bg-up-light"
              icon={<BiCheck className="text-up w-5 h-5" />}
            />
            <Card
              title="Down Servers"
              number={downServers}
              bgColor="bg-down-light"
              icon={<FaXmark className="text-down w-5 h-5" />}
            />
            <Card
              title="Degraded Servers"
              number={degradedServers}
              bgColor="bg-degraded-light"
              icon={<CiWarning className="text-degraded w-5 h-5" />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
