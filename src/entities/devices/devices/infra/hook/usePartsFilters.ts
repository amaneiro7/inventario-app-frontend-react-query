import { useGenericFilter } from '../../../../../shared/lib/hooks/useHookFilter'
import { type DevicePartsFilters } from '@/entities/devices/devices/application/parts/CreateDevicePartsParams'
import {
	DevicePartsFilter,
	defaultMainCategoryValue
} from '@/entities/devices/devices/application/parts/DevicePartsFilter'

export function usePartsFilter() {
	const mainCategoryId = defaultMainCategoryValue

	const filters = useGenericFilter<DevicePartsFilters>({
		defaultPageSize: DevicePartsFilter.defaultPageSize,
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
			'administrativeRegionId',
			'regionId',
			'orderBy',
			'orderType'
		]
	})

	return {
		...filters,
		mainCategoryId
	}
}
