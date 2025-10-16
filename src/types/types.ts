export type User = {
  id: string;
  name: string;
  email: string;
};

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export type ServerStatus = "up" | "down" | "degraded";

export interface Server {
  id: string;
  name: string;
  ipAddress: string;
  status: ServerStatus;
  responseTime: number;
  uptime: number;
  location: string;
  type: string;
  lastChecked: string;
  description?: string;
}

export interface ServerMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}
