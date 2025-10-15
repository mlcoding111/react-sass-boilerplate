import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCities } from "@/lib/mock";

export const Route = createFileRoute("/contact-us/$country/$city")({
  component: RouteComponent,
  loader: async ({ params: { country, city } }) => {
    const cities = await getCities(country);
    if (!cities.includes(city)) {
      throw notFound();
    }
    return { city };
  },
  pendingComponent: () => <div>Loading City...</div>,
});

function RouteComponent() {
  const { city } = Route.useLoaderData();

  return (
    <>
      <h1 className="heading">Selected City:</h1>
      <p className="title">{city}</p>
    </>
  );
}
