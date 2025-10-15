import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NavLink } from "./-components/nav-link";
import { QueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
export type UserRole = "admin" | "client" | null;

export type RouterContext = {
  queryClient: QueryClient;
  role: UserRole;
  login: (role: "admin" | "client") => void;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  // const { t } = useTranslation("translations");
  const { logout, isAuthenticated, isAdmin, isClient } =
    Route.useRouteContext();

  const navigate = Route.useNavigate();
  const location = useLocation();

  return (
    // Suspense is used to handle the loading of the translations
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
  );
}
