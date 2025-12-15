import { useQuery } from '@tanstack/react-query'
import { getPermissions } from '../api/getPermissionsService'
import { useAuthStore } from '../model/useAuthStore'

/**
 * Custom hook to fetch and manage user permissions.
 *
 * This hook uses React Query to fetch the user's permissions from the server.
 * - The query is only enabled when the user is authenticated (i.e., a token exists).
 * - It returns the query result, including permissions data, loading state, and error state.
 * - Permissions are cached and considered "stale" after 5 minutes, triggering a background refetch on the next access.
 */
export const useUserPermissions = () => {
	// 1. Obtenemos el token del store de autenticación.
	const token = useAuthStore(state => state.token)

	// 2. Usamos useQuery para gestionar la obtención de datos.
	const query = useQuery({
		// 3. Clave única para esta query. React Query la usa para cachear.
		queryKey: ['user', 'permissions'],

		// 4. La función que se ejecutará para obtener los datos.
		queryFn: getPermissions,

		// 5. ¡Crucial! La query solo se ejecutará si `enabled` es `true`.
		enabled: !!token,

		// 6. (Opcional) Tiempo que los datos se consideran "frescos" (en milisegundos).
		staleTime: 1000 * 60 * 5 // 5 minutos
	})

	return query
}
