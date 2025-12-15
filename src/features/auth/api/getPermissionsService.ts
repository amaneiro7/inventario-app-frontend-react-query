import { api } from '@/shared/api/axios.config'
import { Permission } from '@/shared/config/permissions'
/**
 * Fetches the permissions for the currently authenticated user.
 * @returns A promise that resolves to an array of permission strings.
 */
export const getPermissions = async (): Promise<{
	permissions: Permission[]
}> => {
	// Asumimos que tu apiClient ya está configurado para enviar el token
	// en las cabeceras de autorización a través de un interceptor.
	const response = await api.get<{
		permissions: Permission[]
	}>('/auth/me/permissions')

	return response.data
}
