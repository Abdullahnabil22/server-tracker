"use client";
import { useAuth } from "@/context/authContext";
import { getInitials } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

export default function Header() {
  const { logout, user } = useAuth();
  const initials = getInitials(user?.name);
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-2xl font-semibold">
        <span className="inline-block transition-transform duration-300 hover:scale-125">
          X
        </span>
        <span
          className="inline-block transition-transform duration-300 hover:scale-125 hover:rotate-12"
          style={{ transitionDelay: "100ms" }}
        >
          O
        </span>
        <span>rithm</span>
        <span className="ml-2 text-accent">STATUS</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {initials}
        </div>
        <span className="text-sm font-semibold">{user?.name}</span>
        <button
          onClick={handleLogout}
          aria-label="logout"
          className="p-3 rounded-full group cursor-pointer transition-all duration-300 hover:bg-accent content-center"
        >
          <BiLogOut className="w-5 h-5 text-accent group-hover:text-background transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
}
