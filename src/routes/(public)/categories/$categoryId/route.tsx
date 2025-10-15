import { createFileRoute, Link, notFound, Outlet } from "@tanstack/react-router";
import { getSubcategories } from "@/lib/mock";

export const Route = createFileRoute("/(public)/categories/$categoryId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const subcategories = await getSubcategories(params.categoryId);

    if (subcategories.length === 0) {
      throw notFound();
    }

    return { subcategories };
  },
  pendingComponent: () => <div>Subcategories are loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
});

function RouteComponent() {
  const { subcategories } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <h2 className="heading">Subcategories</h2>
      <div className="list">
        {subcategories.map((subcategory) => (
          <Link
            key={subcategory.id}
            from="/categories/$categoryId"
            to="/categories/$categoryId/$subcategoryId"
            params={{ subcategoryId: subcategory.id }}
            className="card"
            activeProps={{ className: "active-card" }}
          >
            <p className="title">{subcategory.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
