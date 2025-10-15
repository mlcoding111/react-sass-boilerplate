import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      This is the main page <Link to="/login">Login</Link>{" "}
      <Link to="/register">Register</Link>{" "}
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
