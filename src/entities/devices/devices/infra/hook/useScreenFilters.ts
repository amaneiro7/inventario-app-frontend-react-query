import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import {
	defaultMainCategoryValue,
	DeviceScreenFilter
} from '@/entities/devices/devices/application/screenFilter/DeviceScreenFilter'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'

/**
 * `useScreenFilter`
 * @function
 * @description Hook personalizado para gestionar los filtros de dispositivos de tipo 'pantalla' (monitores).
 * Utiliza `useGenericFilter` para integrar la lógica de filtrado, paginación y ordenación con la URL.
 * @returns {DeviceBaseFilters & { mainCategoryId: string }} Un objeto que contiene los valores de los filtros y las funciones para manipularlos, además del `mainCategoryId` por defecto.
 */
export function useScreenFilter() {
	const mainCategoryId = defaultMainCategoryValue

	const filters = useGenericFilter<DeviceBaseFilters>({
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
