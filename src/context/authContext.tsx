"use client";
import { authService } from "@/lib/auth";
import { User } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (session?.user) {
      const nextAuthUser: User = {
        id: session.user.id || crypto.randomUUID(),
        email: session.user.email || "",
        name: session.user.name || "",
      };
      setUser(nextAuthUser);
      localStorage.setItem("user", JSON.stringify(nextAuthUser));
    } else {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    }

    setLoading(false);
  }, [session, status]);

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setUser(authService.getCurrentUser());
    }
    return result;
  };

  const signup = async (email: string, password: string, name: string) => {
    const result = await authService.signup(email, password, name);
    if (result.success) {
      setUser(authService.getCurrentUser());
    }
    return result;
  };
  const logout = async () => {
    if (session) {
      await signOut({ redirect: false });
    }
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
