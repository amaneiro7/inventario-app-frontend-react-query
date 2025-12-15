import { use } from 'react'
import { Navigate } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthContext } from '@/app/providers/AuthContext'
import { useUserPermissions } from '@/features/auth/hook/useUserPermissions'
import { LoadingSpinner } from '@/shared/ui/Loading/LoadingSpinner'

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

		const { data, isLoading } = useUserPermissions()

		if (!isLogged) {
			return <Navigate to="/login" replace={true} />
		}

		console.log(data?.permissions)

		// 1. Manejar el estado de carga primero.
		if (isLoading) {
			return <LoadingSpinner />
		}

		if (isLogged && (!data || data.permissions.length === 0)) {
			return <Navigate to="/no-permissions" replace={true} />
		}

		return (
			<>
				<Component />
				<ReactQueryDevtools />
			</>
		)
	}
}
