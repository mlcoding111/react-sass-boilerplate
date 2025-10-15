import type { RouterContext, UserRole } from "@/routes/__root";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { QueryClient } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useRouterContextState(_queryClient: QueryClient): Omit<RouterContext, 'queryClient'> { // Modified
  // queryClient parameter is used for type signature but not in function body
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole;
    return savedRole || null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]); // Modified

  const login = (newRole: "admin" | "client") => {
    flushSync(() => {
      setRole(newRole);
    });
  }; // Modified

  const logout = () => {
    setRole(null);
  }; // Modified

  const isAdmin = role === "admin";
  const isClient = role === "client";
  const isAuthenticated = !!role;

  return {
    role,
    login,
    logout,
    isAdmin,
    isClient,
    isAuthenticated,
  }; // Modified
}
