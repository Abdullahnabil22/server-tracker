"use client";

import { User } from "@/types/types";

export const authService = {
  signup: async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find(
        (u: User & { password: string }) => u.email === email
      );

      if (existingUser) {
        return { success: false, error: "User already exists" };
      }
      const newUser: User & { password: string } = {
        id: crypto.randomUUID(),
        email,
        name,
        password,
      };
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Signup failed, please try again later",
      };
    }
  },
  login: async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: User & { password: string }) =>
          u.email === email && u.password === password
      );
      if (!user) {
        return { success: false, error: "Invalid email or password" };
      }
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Login failed, please try again later" };
    }
  },
  logout: () => {
    localStorage.removeItem("user");
  },
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};
