import { createLazyFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/signup-form";

export const Route = createLazyFileRoute("/_auth/register")({
  component: Register,
});

function Register() {
  return <div><SignupForm /></div>;
}
