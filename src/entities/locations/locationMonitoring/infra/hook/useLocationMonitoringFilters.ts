import { useGenericFilter } from '../../../../../shared/lib/hooks/useHookFilter'
import { LocationMonitoringGetByCriteria } from '../../application/LocationMonitoringGetByCriteria'
import { type LocationMonitoringFilters } from '../../application/createLocationMonitoringQueryParams'

export function useLocationMonitoringFilter() {
	const filters = useGenericFilter<LocationMonitoringFilters>({
		defaultPageSize: LocationMonitoringGetByCriteria.defaultPageSize,
		filterKeys: [
			'subnet',
			'name',
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
