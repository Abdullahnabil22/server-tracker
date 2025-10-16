"use client";
import { Server } from "@/types/types";
import { useEffect, useState } from "react";
import ServerStats from "../serverStats";
import ServerCard from "../ui/serverCard";
import SkeletonLoader from "../ui/skeletonLoader";
import Input from "../ui/Input";

export default function Dashboard() {
  const [servers, setServers] = useState<Server[]>([]);
  const [filteredServers, setFilteredServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch("/api/servers");
        const data = await response.json();
        setServers(data);
        setFilteredServers(data);
      } catch (error) {
        console.error("Failed to fetch servers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServers();
    const interval = setInterval(fetchServers, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let result = [...servers];

    if (searchQuery) {
      result = result.filter(
        (server) =>
          server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          server.ipAddress.includes(searchQuery) ||
          server.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          server.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((server) => server.status === statusFilter);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "status":
          return a.status.localeCompare(b.status);
        case "responseTime":
          return a.responseTime - b.responseTime;
        case "uptime":
          return b.uptime - a.uptime;
        default:
          return 0;
      }
    });

    setFilteredServers(result);
  }, [searchQuery, statusFilter, sortBy, servers]);

  if (isLoading) return <SkeletonLoader />;

  return (
    <div className="space-y-6">
      <ServerStats servers={servers} />

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeHolder="Search servers by name, IP, location, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white"
              type="search"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-[180px] bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-input-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent  hover:border-gray-400 transition-colors"
            aria-label="Filter by status"
            title="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="up">Up</option>
            <option value="degraded">Degraded</option>
            <option value="down">Down</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-[180px] bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-input-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent  hover:border-gray-400 transition-colors"
            aria-label="Sort by"
            title="Sort by"
          >
            <option value="name">Name</option>
            <option value="status">Status</option>
            <option value="responseTime">Response Time</option>
            <option value="uptime">Uptime</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredServers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No servers found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredServers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
