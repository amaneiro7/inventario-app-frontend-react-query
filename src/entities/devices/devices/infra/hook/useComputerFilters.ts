import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import {
	DeviceComputerFilter,
	defaultMainCategoryValue
} from '@/entities/devices/devices/application/computerFilter/DeviceComputerFilter'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'

/**
 * `useComputerFilter`
 * @function
 * @description Hook personalizado para gestionar los filtros de dispositivos de tipo 'computadora'.
 * Utiliza `useGenericFilter` para integrar la lógica de filtrado, paginación y ordenación con la URL.
 * @returns {DeviceBaseFilters & { mainCategoryId: string }} Un objeto que contiene los valores de los filtros y las funciones para manipularlos, además del `mainCategoryId` por defecto.
 */
export function useComputerFilter() {
	const mainCategoryId = defaultMainCategoryValue

	const filters = useGenericFilter<DeviceBaseFilters>({
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
			'operatingSystem',
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
