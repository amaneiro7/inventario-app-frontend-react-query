import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import { PermissionGroupGetByCriteria } from '../../application/PermissionGroupGetByCriteria'
import { type PermissionGroupFilters } from '../../application/createPermissionGroupQueryParams'

/**
 * A React hook for managing PermissionGroup filters.
 * It leverages `useGenericFilter` to provide filtering capabilities based on `PermissionGroupFilters`.
 * @returns An object containing filter state and handlers for updating filters.
 */
export function usePermissionGroupFilter() {
	return useGenericFilter<PermissionGroupFilters>({
		defaultPageSize: PermissionGroupGetByCriteria.defaultPageSize,
		filterKeys: ['name', 'description', 'permissionId', 'orderBy', 'orderType']
	})
}
