import { useCallback } from 'react'
import { useUserPermissions } from './useUserPermissions'
import { type Permission } from '@/shared/config/permissions'

/**
 * A hook that provides a function to check user permissions.
 *
 * @returns An object containing:
 * - `hasPermission`: A memoized function that returns `true` if the user has the required permission.
 * - `isLoading`: A boolean indicating if the permissions are currently being fetched.
 */
export const usePermissionCheck = () => {
	const { data, isLoading } = useUserPermissions()

	const permissions = data?.permissions

	const hasPermission = useCallback(
		(requiredPermission?: Permission): boolean => {
			// If no permission is required, grant access.
			if (requiredPermission === undefined || requiredPermission === null) {
				return true
			}
			// If permissions are not loaded yet or the user has none, deny access.
			return permissions?.includes(requiredPermission) ?? false
		},
		[permissions]
	)

	return { hasPermission, isLoadingPermissions: isLoading }
}
