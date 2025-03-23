import { useGenericFilter } from '../useHookFilter'
import {
	DeviceFinantialPrinterFilter,
	defaultMainCategoryValue
} from '@/core/devices/devices/application/finantialPrinter/DeviceFinantialPrinterFilter'
import { type DeviceFinantialPrinterFilters } from '@/core/devices/devices/application/finantialPrinter/CreateDeviceFinantialPrinterParams'

export function useFinantialPrinterFilter() {
	const mainCategoryId = defaultMainCategoryValue

	const filters = useGenericFilter<DeviceFinantialPrinterFilters>({
		defaultPageSize: DeviceFinantialPrinterFilter.defaultPageSize,
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
			'orderType'
		]
	})

	return {
		...filters,
		mainCategoryId
	}
}
