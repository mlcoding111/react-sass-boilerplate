import { Button } from "@/components/ui/button";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: z.object({
    redirectTo: z.string().default("/"),
  }),
  beforeLoad: async ({ search, context }): Promise<{ redirectTo: string }> => {
    const { isAdmin, isAuthenticated } = context;

    if (isAuthenticated) {
      throw redirect({
        to: search.redirectTo || (isAdmin ? "/admin" : "/client"),
      });
    }

    return { redirectTo: search.redirectTo };
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { login, isAdmin } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const router = useRouter();
  const search = Route.useSearch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <h1>Login</h1>
      <input
        type="text" 
        className="border border-gray-300 rounded-md p-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      {/* <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> */}
      <Button
        type="submit"
        onClick={() => {
          if (username === "admin") {
            login("admin");
          } else {
            login("client");
          }

          router.invalidate();
          navigate({
            to: search.redirectTo || (isAdmin ? "/admin" : "/client"),
          });
        }}
      >
        Login
      </Button>
    </form>
  );
}
