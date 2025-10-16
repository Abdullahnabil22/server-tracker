import { Server } from "@/types/types";

export const mockServers: Server[] = [
  {
    id: "1",
    name: "Production API Server",
    ipAddress: "192.168.1.10",
    status: "up",
    responseTime: 45,
    uptime: 99.98,
    location: "US East (Virginia)",
    type: "API Server",
    lastChecked: new Date().toISOString(),
    description: "Main production API server handling client requests",
  },
  {
    id: "2",
    name: "Database Primary",
    ipAddress: "192.168.1.20",
    status: "up",
    responseTime: 12,
    uptime: 99.99,
    location: "US East (Virginia)",
    type: "Database",
    lastChecked: new Date().toISOString(),
    description: "Primary PostgreSQL database instance",
  },
  {
    id: "3",
    name: "Web Server 01",
    ipAddress: "192.168.1.30",
    status: "degraded",
    responseTime: 320,
    uptime: 98.5,
    location: "US West (Oregon)",
    type: "Web Server",
    lastChecked: new Date().toISOString(),
    description: "Frontend web server experiencing high load",
  },
  {
    id: "4",
    name: "Cache Server",
    ipAddress: "192.168.1.40",
    status: "up",
    responseTime: 8,
    uptime: 99.95,
    location: "US East (Virginia)",
    type: "Cache",
    lastChecked: new Date().toISOString(),
    description: "Redis cache server for session management",
  },
  {
    id: "5",
    name: "Background Worker",
    ipAddress: "192.168.1.50",
    status: "up",
    responseTime: 156,
    uptime: 99.7,
    location: "EU West (Ireland)",
    type: "Worker",
    lastChecked: new Date().toISOString(),
    description: "Background job processing server",
  },
  {
    id: "6",
    name: "CDN Edge Node",
    ipAddress: "192.168.1.60",
    status: "up",
    responseTime: 23,
    uptime: 99.92,
    location: "Asia Pacific (Singapore)",
    type: "CDN",
    lastChecked: new Date().toISOString(),
    description: "Content delivery network edge server",
  },
  {
    id: "7",
    name: "Analytics Server",
    ipAddress: "192.168.1.70",
    status: "down",
    responseTime: 0,
    uptime: 95.2,
    location: "US West (Oregon)",
    type: "Analytics",
    lastChecked: new Date().toISOString(),
    description: "Analytics and metrics collection server - currently offline",
  },
  {
    id: "8",
    name: "Load Balancer",
    ipAddress: "192.168.1.80",
    status: "up",
    responseTime: 5,
    uptime: 99.99,
    location: "US East (Virginia)",
    type: "Load Balancer",
    lastChecked: new Date().toISOString(),
    description: "Primary load balancer distributing traffic",
  },
  {
    id: "9",
    name: "Backup Server",
    ipAddress: "192.168.1.90",
    status: "up",
    responseTime: 89,
    uptime: 99.85,
    location: "EU Central (Frankfurt)",
    type: "Backup",
    lastChecked: new Date().toISOString(),
    description: "Automated backup and disaster recovery server",
  },
  {
    id: "10",
    name: "Monitoring Server",
    ipAddress: "192.168.1.100",
    status: "up",
    responseTime: 34,
    uptime: 99.94,
    location: "US East (Virginia)",
    type: "Monitoring",
    lastChecked: new Date().toISOString(),
    description: "Infrastructure monitoring and alerting system",
  },
];

export function getServers(): Server[] {
  return mockServers.map((server) => ({
    ...server,
    lastChecked: new Date().toISOString(),
    responseTime:
      server.status === "down"
        ? 0
        : Math.max(1, server.responseTime + Math.floor(Math.random() * 10 - 5)),
  }));
}

export function getServerById(id: string): Server | undefined {
  return mockServers.find((server) => server.id === id);
}

export function getServerMetrics(serverId: string) {
  const server = getServerById(serverId);
  if (!server) return null;

  const baseMetrics = {
    cpu:
      server.status === "down"
        ? 0
        : server.status === "degraded"
        ? 85 + Math.random() * 10
        : 30 + Math.random() * 40,
    memory:
      server.status === "down"
        ? 0
        : server.status === "degraded"
        ? 80 + Math.random() * 15
        : 40 + Math.random() * 30,
    disk: server.status === "down" ? 0 : 50 + Math.random() * 30,
    network:
      server.status === "down"
        ? 0
        : server.status === "degraded"
        ? 70 + Math.random() * 20
        : 20 + Math.random() * 40,
  };

  return {
    cpu: Math.round(baseMetrics.cpu * 10) / 10,
    memory: Math.round(baseMetrics.memory * 10) / 10,
    disk: Math.round(baseMetrics.disk * 10) / 10,
    network: Math.round(baseMetrics.network * 10) / 10,
  };
}
