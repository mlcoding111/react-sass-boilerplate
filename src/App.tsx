import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useRouterContextState } from "@/lib/use-router-context-state";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,

  /* Preload route !! You can also set this on a per-route basis on the Link component !!
    - intent: preload the route when the user is about to navigate to it
    - none: don't preload the route
    - offscreen: preload the route when the user is not looking at it
  */
  defaultPreload: "intent",

  context: {
    queryClient,
    role: null,
    login: () => {},
    logout: () => {},
    isAdmin: false,
    isClient: false,
    isAuthenticated: false,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
    queryClient: QueryClient;
  }
}

function App() {
  const routerContextState = useRouterContextState(queryClient);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ ...routerContextState, queryClient }} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  ); // Modified
}

export default App;
