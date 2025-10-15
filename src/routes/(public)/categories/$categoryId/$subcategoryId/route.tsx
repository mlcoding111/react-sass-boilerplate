import { getProducts } from "@/lib/mock";
import { createFileRoute, Link, notFound, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(public)/categories/$categoryId/$subcategoryId"
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const products = await getProducts(params.subcategoryId);

    if (products.length === 0) {
      throw notFound();
    }

    return { products };
  },
  pendingComponent: () => <div>Products are loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
});

function RouteComponent() {
  const { products } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <h2 className="heading">Products</h2>
      <div className="list">
        {products.map((product) => (
          <Link
            key={product.id}
            from="/categories/$categoryId/$subcategoryId"
            to="/categories/$categoryId/$subcategoryId/$productId"
            params={{ productId: product.id.toString() }}
            className="card"
            hash="product-details"
            activeProps={{ className: "active-card" }}
          >
            <p className="title">{product.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
