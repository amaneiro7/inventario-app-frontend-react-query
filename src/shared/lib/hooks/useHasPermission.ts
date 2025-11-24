import { useAuth } from '@/entities/user/infra/hooks/useAuth'
import { Permission } from '@/shared/config/permissions'

/**
 * Hook personalizado para verificar si el usuario autenticado tiene un permiso específico.
 * @param {Permission} permission - El permiso a verificar.
 * @returns {boolean} `true` si el usuario tiene el permiso, de lo contrario `false`.
 */
export const useHasPermission = (permission: Permission): boolean => {
	const { hasPermission } = useAuth()

	return hasPermission(permission)
}
