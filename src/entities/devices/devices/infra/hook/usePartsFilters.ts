import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'
import {
	DevicePartsFilter,
	defaultMainCategoryValue
} from '@/entities/devices/devices/application/parts/DevicePartsFilter'

/**
 * `usePartsFilter`
 * @function
 * @description Hook personalizado para gestionar los filtros de dispositivos de tipo 'partes y piezas'.
 * Utiliza `useGenericFilter` para integrar la lógica de filtrado, paginación y ordenación con la URL.
 * @returns {DeviceBaseFilters & { mainCategoryId: string }} Un objeto que contiene los valores de los filtros y las funciones para manipularlos, además del `mainCategoryId` por defecto.
 */
export function usePartsFilter() {
	const mainCategoryId = defaultMainCategoryValue

	const filters = useGenericFilter<DeviceBaseFilters>({
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
