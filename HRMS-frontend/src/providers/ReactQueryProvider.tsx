'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/modern/production.js";

// const ReactQueryDevtoolsProduction = lazy(() =>
//   import("@tanstack/react-query-devtools/build/modern/production.js").then(
//     (d) => ({
//       default: d.ReactQueryDevtools,
//     })
//   )
// );

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  // const [showDevtools, setShowDevtools] = useState(false);
  // useEffect(() => {
  //   // @ts-expect-error dssds
  //   window.toggleDevtools = () => setShowDevtools((old) => !old);
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
      {/* {showDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </Suspense>
      )} */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
