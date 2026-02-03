import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        staleTime: 5 * 60000,
        refetchOnReconnect: true,
        refetchOnMount: true,
        gcTime: 7 * 60000
      }
    }
  })
  return { queryClient }
}

export function Provider({ children, queryClient }: { children: React.ReactNode, queryClient: QueryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
