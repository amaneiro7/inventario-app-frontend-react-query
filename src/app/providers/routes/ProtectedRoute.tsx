import { use } from 'react'
import { Navigate } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthContext } from '@/app/providers/AuthContext'
import { useUserPermissions } from '@/features/auth/hook/useUserPermissions'
import { Loading } from '@/shared/ui/Loading'

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
		const context = use(AuthContext)
		const auth = context?.auth

		const { data, isLoading } = useUserPermissions()

		// Si auth es undefined (contexto no listo) o isLogged es undefined (cargando estado),
		// mostramos el loader en lugar de redirigir al login inmediatamente.
		if (!auth || auth.isLogged === undefined) {
			return <Loading />
		}

		if (!auth.isLogged) {
			return <Navigate to="/login" replace={true} />
		}

		// 1. Manejar el estado de carga primero.
		if (isLoading) {
			return <Loading />
		}

		if (auth.isLogged && (!data || data.permissions.length === 0)) {
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
