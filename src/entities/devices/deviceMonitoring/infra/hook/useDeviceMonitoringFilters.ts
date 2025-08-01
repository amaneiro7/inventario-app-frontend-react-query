import { useGenericFilter } from '../../../../../shared/lib/hooks/useHookFilter'
import { DeviceMonitoringGetByCriteria } from '../../application/DeviceMonitoringGetByCriteria'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

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
