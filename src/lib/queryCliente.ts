import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 5,
			retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
			experimental_prefetchInRender: true,
			refetchOnWindowFocus: true,
			refetchOnReconnect: true
		}
	}
})
