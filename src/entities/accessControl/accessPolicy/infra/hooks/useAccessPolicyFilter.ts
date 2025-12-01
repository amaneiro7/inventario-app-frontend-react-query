import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import { AccessPolicyGetByCriteria } from '../../application/AccessPolicyGetByCriteria'
import { type AccessPolicyFilters } from '../../application/createAccessPolicyQueryParams'

/**
 * A React hook for managing AccessPolicy filters.
 * It leverages `useGenericFilter` to provide filtering capabilities based on `AccessPolicyFilters`.
 * @returns An object containing filter state and handlers for updating filters.
 */
export function useAccessPolicyFilter() {
	return useGenericFilter<AccessPolicyFilters>({
		defaultPageSize: AccessPolicyGetByCriteria.defaultPageSize,
		filterKeys: [
			'name',
			'roleId',
			'cargoId',
			'departamentoId',
			'vicepresidenciaId',
			'vicepresidenciaEjecutivaId',
			'directivaId',
			'priority',
			'permissionGroupId',
			'orderBy',
			'orderType'
		]
	})
}
