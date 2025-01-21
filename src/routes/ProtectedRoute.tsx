import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth/AuthContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryCliente'

export function ProtectedRoute({ children }: React.PropsWithChildren) {
	const {
		auth: { isLogged }
	} = useContext(AuthContext)

	return isLogged ? (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	) : (
		<Navigate to="/login" replace={true} />
	)
}
