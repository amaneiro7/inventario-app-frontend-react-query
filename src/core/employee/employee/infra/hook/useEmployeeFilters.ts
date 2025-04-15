import { useGenericFilter } from '@/hooks/useHookFilter'
import { EmployeeGetByCriteria } from '../../application/EmployeeGetByCriteria'
import { type EmployeeFilters } from '../../application/createEmployeeQueryParams'

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
