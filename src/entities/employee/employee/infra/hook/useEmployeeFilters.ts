import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import { EmployeeGetByCriteria } from '../../application/EmployeeGetByCriteria'
import { type EmployeeFilters } from '../../application/createEmployeeQueryParams'

/**
 * A React hook for managing employee filters.
 * It leverages `useGenericFilter` to provide filtering capabilities based on `EmployeeFilters`.
 * @returns An object containing filter state and handlers for updating filters.
 */
export function useEmployeeFilter() {
	return useGenericFilter<EmployeeFilters>({
		defaultPageSize: EmployeeGetByCriteria.defaultPageSize,
		filterKeys: [
			'userName',
			'type',
			'name',
			'lastName',
			'email',
			'isStillWorking',
			'employeeCode',
			'nationality',
			'cedula',
			'locationId',
			'directivaId',
			'vicepresidenciaEjecutivaId',
			'vicepresidenciaId',
			'departamentoId',
			'cargoId',
			'cityId',
			'stateId',
			'regionId',
			'orderBy',
			'orderType'
		]
	})
}
