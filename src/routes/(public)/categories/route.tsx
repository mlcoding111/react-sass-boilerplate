import { getCategories } from "@/lib/mock";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/categories")({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
  pendingComponent: () => <div>Loading Categories...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
});

function RouteComponent() {
  const { categories } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <h2 className="heading">Categories</h2>
      <div className="list">
        {categories.map((category) => (
          <Link
            key={category.id}
            to="/categories/$categoryId"
            params={{ categoryId: category.id }}
            className="card"
            activeProps={{ className: "active-card" }}
          >
            <p className="title">{category.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
