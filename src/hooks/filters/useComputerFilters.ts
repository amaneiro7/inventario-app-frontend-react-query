import { useGenericFilter } from '../useHookFilter'
import {
	DeviceComputerFilter,
	defaultMainCategoryValue
} from '@/core/devices/devices/application/computerFilter/DeviceComputerFilter'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'

export function useComputerFilter() {
	const mainCategoryId = defaultMainCategoryValue

	const filters = useGenericFilter<DeviceComputerFilters>({
		defaultPageSize: DeviceComputerFilter.defaultPageSize,
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
			'departamentoId',
			'cargoId',
			'cityId',
			'stateId',
			'regionId',
			'computerName',
			'operatingSystemId',
			'operatingSystemArqId',
			'processor',
			'ipAddress',
			'orderBy',
			'orderType'
		]
	})

	return {
		...filters,
		mainCategoryId
	}
}
