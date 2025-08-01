import { useGenericFilter } from '../../../../../shared/lib/hooks/useHookFilter'
import {
	DeviceFinantialPrinterFilter,
	defaultMainCategoryValue
} from '@/entities/devices/devices/application/finantialPrinter/DeviceFinantialPrinterFilter'
import { type DeviceFinantialPrinterFilters } from '@/entities/devices/devices/application/finantialPrinter/CreateDeviceFinantialPrinterParams'

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
