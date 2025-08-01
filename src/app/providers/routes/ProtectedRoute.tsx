import { use } from 'react'
import { Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/shared/lib/queryCliente'
import { AuthContext } from '@/app/providers/AuthContext'

export function ProtectedRoute(Component: React.ComponentType) {
	return () => {
		const {
			auth: { isLogged }
		} = use(AuthContext)

		if (!isLogged) {
			return <Navigate to="/login" replace={true} />
		}

		return (
			<QueryClientProvider client={queryClient}>
				<Component />
				<ReactQueryDevtools />
			</QueryClientProvider>
		)
	}
}
