import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import {
	DevicePrinterFilter,
	defaultMainCategoryValue
} from '@/entities/devices/devices/application/printer/DevicePrinterFilter'
import { DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'

/**
 * `usePrinterFilter`
 * @function
 * @description Hook personalizado para gestionar los filtros de dispositivos de tipo 'impresora'.
 * Utiliza `useGenericFilter` para integrar la lógica de filtrado, paginación y ordenación con la URL.
 * @returns {DeviceBaseFilters & { mainCategoryId: string }} Un objeto que contiene los valores de los filtros y las funciones para manipularlos, además del `mainCategoryId` por defecto.
 */
export function usePrinterFilter() {
	const mainCategoryId = defaultMainCategoryValue

	const filters = useGenericFilter<DeviceBaseFilters>({
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
			'orderType',
			'ipAddress'
		]
	})

	return {
		...filters,
		mainCategoryId
	}
}
