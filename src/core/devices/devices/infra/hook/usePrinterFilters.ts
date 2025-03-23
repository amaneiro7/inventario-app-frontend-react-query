import { useGenericFilter } from '../../../../../hooks/useHookFilter'
import {
	DevicePrinterFilter,
	defaultMainCategoryValue
} from '@/core/devices/devices/application/printer/DevicePrinterFilter'
import { type DevicePrinterFilters } from '@/core/devices/devices/application/printer/CreateDevicePrinterParams'

export function usePrinterFilter() {
	const mainCategoryId = defaultMainCategoryValue

	const filters = useGenericFilter<DevicePrinterFilters>({
		defaultPageSize: DevicePrinterFilter.defaultPageSize,
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
			'orderBy',
			'orderType',
			'ipAddress'
		]
	})

	return {
		...filters,
		mainCategoryId
	}
}
