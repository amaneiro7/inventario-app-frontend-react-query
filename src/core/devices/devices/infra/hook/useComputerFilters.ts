import { useGenericFilter } from '../../../../../hooks/useHookFilter'
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
			'directivaId',
			'vicepresidenciaEjecutivaId',
			'vicepresidenciaId',
			'departamentoId',
			'cargoId',
			'cityId',
			'stateId',
			'administrativeRegionId',
			'regionId',
			'computerName',
			'operatingSystemId',
			'operatingSystemArqId',
			'hardDriveTypeId',
			'memoryRamTypeId',
			'memoryRamCapacity',
			'memoryRamCapacityOperator',
			'hardDriveCapacity',
			'hardDriveCapacityOperator',
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
