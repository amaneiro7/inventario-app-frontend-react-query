import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryCliente'
import { AuthContext } from '../context/Auth/AuthContext'

export function ProtectedRoute(Component: React.ComponentType) {
	return () => {
		const {
			auth: { isLogged }
		} = useContext(AuthContext)

		if (!isLogged) {
			return <Navigate to="/login" replace={true} />
		}

		return (
			<QueryClientProvider client={queryClient}>
				<Component />
			</QueryClientProvider>
		)
	}
}
