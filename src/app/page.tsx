"use client";
import Dashboard from "@/components/dashboard";
import Header from "@/components/header";
import AuthLoading from "@/components/AuthLoading";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <AuthLoading />;
  }

  return (
    <div className="bg-main min-h-screen text-text-main p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <Header />

        <Dashboard />
      </div>
    </div>
  );
}
