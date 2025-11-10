import { use } from 'react'
import { Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/shared/lib/queryCliente'
import { AuthContext } from '@/app/providers/AuthContext'

/**
 * `ProtectedRoute`
 * @function
 * @description Higher-Order Component (HOC) que envuelve un componente para proteger una ruta.
 * Redirige al usuario a la página de login si no está autenticado.
 * También proporciona el `QueryClientProvider` y `ReactQueryDevtools` a los componentes protegidos.
 * @param {React.ComponentType} Component - El componente React que se desea proteger.
 * @returns {React.ComponentType} Un nuevo componente que envuelve al `Component` original con la lógica de protección.
 */
export function ProtectedRoute(Component: React.ComponentType): React.ComponentType {
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
