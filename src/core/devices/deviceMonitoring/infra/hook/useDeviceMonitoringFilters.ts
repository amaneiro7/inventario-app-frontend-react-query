import { useGenericFilter } from '../../../../../hooks/useHookFilter'
import { DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'
import { DeviceMonitoringGetByCriteria } from '../../application/DeviceMonitoringGetByCriteria'

export function useDeviceMonitoringFilter() {
	const filters = useGenericFilter<DeviceMonitoringFilters>({
		defaultPageSize: DeviceMonitoringGetByCriteria.defaultPageSize,
		filterKeys: [
			'locationId',
			'typeOfSiteId',
			'cityId',
			'stateId',
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
