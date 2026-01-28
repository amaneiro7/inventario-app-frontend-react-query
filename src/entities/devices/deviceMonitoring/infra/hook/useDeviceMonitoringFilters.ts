import { useGenericFilter } from '../../../../../shared/lib/hooks/useHookFilter'
import { DeviceMonitoringGetByCriteria } from '../../application/DeviceMonitoringGetByCriteria'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

/**
 * `useDeviceMonitoringFilter`
 * @function
 * @description Hook personalizado para gestionar los filtros de monitoreo de dispositivos.
 * Utiliza `useGenericFilter` para integrar la lógica de filtrado, paginación y ordenación con la URL.
 * @returns {DeviceMonitoringFilters} Un objeto que contiene los valores de los filtros y las funciones para manipularlos.
 */
export function useDeviceMonitoringFilter() {
	const filters = useGenericFilter<DeviceMonitoringFilters>({
		defaultPageSize: DeviceMonitoringGetByCriteria.defaultPageSize,
		filterKeys: [
			'ipAddress',
			'computerName',
			'status',
			'locationId',
			'typeOfSiteId',
			'cityId',
			'stateId',
			'siteId',
			'administrativeRegionId',
			'regionId',
			'orderBy',
			'orderType'
		]
	})

	return {
		...filters
	}
}
