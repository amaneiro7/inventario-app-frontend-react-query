import { useGenericFilter } from '../../../../../shared/lib/hooks/useHookFilter'
import {
	defaultMainCategoryValue,
	DeviceScreenFilter
} from '@/entities/devices/devices/application/screenFilter/DeviceScreenFilter'
import { type DeviceScreenFilters } from '@/entities/devices/devices/application/screenFilter/CreateDeviceScreenParams'

export function useScreenFilter() {
	const mainCategoryId = defaultMainCategoryValue

	const filters = useGenericFilter<DeviceScreenFilters>({
		defaultPageSize: DeviceScreenFilter.defaultPageSize,
		filterKeys: [
			'categoryId',
			'brandId',
			'statusId',
			'activo',
			'serial',
			'modelId',
			'employeeId',
			'locationId',
			'typeOfSiteId',
			'directivaId',
			'vicepresidenciaEjecutivaId',
			'vicepresidenciaId',
			'departamentoId',
			'cargoId',
			'cityId',
			'stateId',
			'regionId',
			'administrativeRegionId',
			'orderBy',
			'orderType'
		]
	})

	return {
		...filters,
		mainCategoryId
	}
}
