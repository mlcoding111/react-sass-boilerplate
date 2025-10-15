import type { RouterContext, UserRole } from "@/routes/__root";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { QueryClient } from "@tanstack/react-query";

export function useRouterContextState(): RouterContext {
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole;
    return savedRole || null;
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]);

  const login = (newRole: "admin" | "client") => {
    flushSync(() => {
      setRole(newRole);
    });
  };

  const logout = () => {
    setRole(null);
  };

  const isAdmin = role === "admin";
  const isClient = role === "client";
  const isAuthenticated = !!role;

  return {
    queryClient,
    role,
    login,
    logout,
    isAdmin,
    isClient,
    isAuthenticated,
  };
}
