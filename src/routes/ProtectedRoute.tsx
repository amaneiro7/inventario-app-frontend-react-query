import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth/AuthContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryCliente'

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
