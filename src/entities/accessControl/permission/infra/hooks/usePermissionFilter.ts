import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import { PermissionGetByCriteria } from '../../application/PermissionGetByCriteria'
import { type PermissionFilters } from '../../application/createPermissionQueryParams'

/**
 * A React hook for managing Permission filters.
 * It leverages `useGenericFilter` to provide filtering capabilities based on `PermissionFilters`.
 * @returns An object containing filter state and handlers for updating filters.
 */
export function usePermissionFilter() {
	return useGenericFilter<PermissionFilters>({
		defaultPageSize: PermissionGetByCriteria.defaultPageSize,
		filterKeys: ['description', 'name', 'orderBy', 'orderType']
	})
}
