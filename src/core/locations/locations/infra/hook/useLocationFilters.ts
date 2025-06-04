import { useGenericFilter } from '@/hooks/useHookFilter'
import { LocationGetByCriteria } from '../../application/LocationGetByCriteria'
import { type LocationFilters } from '../../application/CreateLocationQueryParams'

export function useLocationFilter() {
	return useGenericFilter<LocationFilters>({
		defaultPageSize: LocationGetByCriteria.defaultPageSize,
		filterKeys: [
			'name',
			'siteId',
			'cityId',
			'subnet',
			'stateId',
			'regionId',
			'orderBy',
			'orderType',
			'name',
			'typeOfSiteId',
			'locationStatusId',
			'administrativeRegionId'
		]
	})
}
