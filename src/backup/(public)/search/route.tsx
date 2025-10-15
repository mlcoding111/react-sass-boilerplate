import { searchProducts } from "@/lib/mock";
import { searchSchema } from "@/routes/(public)/search/-types/searchSchema";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FilterPanel } from "@/routes/(public)/search/-components/filter-panel";

export const Route = createFileRoute("/(public)/search")({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    const products = await searchProducts({
      ...search,
      sort: search.sort as "alphabeticalAsc" | "alphabeticalDesc",
    });
    return { products };
  },
});

function RouteComponent() {
  const { products } = Route.useLoaderData();

  return (
    <>
      <FilterPanel />
      <div className="list">
        {products.map((product) => (
          <Link
            className="card"
            to="/categories/$categoryId/$subcategoryId/$productId"
            params={{
              productId: product.id,
              categoryId: product.categoryId,
              subcategoryId: product.subcategoryId,
            }}
            key={product.id}
          >
            <p className="title">{product.name}</p>
            <p className="description">{product.description}</p>
            <p className="price">{product.price}</p>
          </Link>
        ))}
      </div>
    </>
  );
}