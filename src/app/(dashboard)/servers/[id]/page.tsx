"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Server, ServerMetrics } from "@/types/types";
import { useAuth } from "@/context/authContext";
import { ServerStatusBadge } from "@/components/ui/serverBadge";
import { MetricCard } from "@/components/ui/metricCard";
import { FaArrowLeft, FaFloppyDisk } from "react-icons/fa6";
import { BiServer, BiTimeFive } from "react-icons/bi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdNetworkWifi3Bar, MdOutlineSignalCellularAlt } from "react-icons/md";
import { FiCpu } from "react-icons/fi";
import { PiMemoryBold } from "react-icons/pi";
import ServerLoader from "@/components/ui/serverLoader";
import AuthLoading from "@/components/AuthLoading";

interface ServerDetailsResponse extends Server {
  metrics: ServerMetrics | null;
}

export default function ServerDetailsPage() {
  const { isAuthenticated, loading } = useAuth();
  const [server, setServer] = useState<ServerDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchServerDetails = async () => {
      try {
        const response = await fetch(`/api/servers/${id}`);
        if (!response.ok) {
          throw new Error("Server not found");
        }
        const data = await response.json();
        setServer(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch server details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchServerDetails();
      const interval = setInterval(fetchServerDetails, 10000);
      return () => clearInterval(interval);
    }
  }, [id, isAuthenticated]);

  if (loading) {
    return <AuthLoading />;
  }

  if (isLoading) {
    return <ServerLoader />;
  }

  if (error || !server) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error || "Server not found"}</p>
            <button
              className="bg-secondary text-white py-2 px-4 rounded-md  hover:bg-primary transition-all duration-200 cursor-pointer active:transform active:scale-95 "
              onClick={() => router.push("/")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main">
      <main className="relative container mx-auto px-4 py-8 space-y-8">
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push("/")}
              className=" flex items-center gap-2 bg-accent text-main py-2 px-4 rounded-md w-fit hover:bg-accent/80 transition-all duration-200 cursor-pointer active:transform active:scale-95 "
            >
              <FaArrowLeft />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </div>

          <div className="p-8  text-background ">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-primary ">
                    <BiServer className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">{server.name}</h1>
                    <p className="text-gray-600 mt-2 text-lg">
                      {server.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ServerStatusBadge status={server.status} />
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BiTimeFive />
                    Last updated:{" "}
                    {new Date(server.lastChecked).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="p-6 text-background flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-[rgba(24,29,84,0.6)] backdrop-blur-sm border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent">
                  <IoInformationCircleOutline className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold ">Server Information</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 text-background rounded-xl border py-6 shadow-sm bg-[rgba(24,29,84,0.6)] backdrop-blur-sm border-[rgba(255,255,255,0.06)]">
                    <p className="text-sm font-medium  mb-1">Server Type</p>
                    <p className="text-lg font-semibold ">{server.type}</p>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${
                      server.status === "up"
                        ? "bg-up-light"
                        : server.status === "down"
                        ? "bg-down-light"
                        : "bg-degarded-light"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground mb-1">
                      Status
                    </p>
                    <ServerStatusBadge status={server.status} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                    <p className="text-sm font-medium text-purple-600 mb-1">
                      IP Address
                    </p>
                    <p className="font-mono text-lg font-semibold text-gray-900">
                      {server.ipAddress}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200">
                    <p className="text-sm font-medium text-orange-600 mb-1">
                      Location
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {server.location}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200">
                    <p className="text-sm font-medium text-cyan-600 mb-1">
                      Response Time
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {server.status === "down"
                        ? "N/A"
                        : `${server.responseTime}ms`}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                    <p className="text-sm font-medium text-emerald-600 mb-1">
                      Uptime
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {server.uptime}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="p-6 text-background flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-[rgba(24,29,84,0.6)] backdrop-blur-sm border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-cyan-500">
                  <MdOutlineSignalCellularAlt className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold ">Performance Metrics</h2>
              </div>

              {server.metrics ? (
                <div className="grid gap-6 md:grid-cols-2">
                  <MetricCard
                    label="CPU Usage"
                    value={server.metrics.cpu}
                    icon={<FiCpu className="w-5 h-5 text-cyan-600" />}
                  />
                  <MetricCard
                    label="Memory Usage"
                    value={server.metrics.memory}
                    icon={<PiMemoryBold className="w-5 h-5 text-green-600" />}
                  />
                  <MetricCard
                    label="Disk Usage"
                    value={server.metrics.disk}
                    icon={<FaFloppyDisk className="w-5 h-5 text-red-600" />}
                  />
                  <MetricCard
                    label="Network Usage"
                    value={server.metrics.network}
                    icon={
                      <MdNetworkWifi3Bar className="w-5 h-5 text-orange-600" />
                    }
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="p-4 rounded-full bg-gray-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MdOutlineSignalCellularAlt className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-lg">
                    No metrics available for this server
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Metrics will appear here once the server starts reporting
                    data
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
