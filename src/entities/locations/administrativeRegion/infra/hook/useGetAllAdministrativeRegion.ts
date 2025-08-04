import { useQuery } from '@tanstack/react-query'
import { AdministrativeRegionGetByCriteria } from '../../application/AdministrativeRegionGetByCriteria'
import { AdministrativeRegionGetAllService } from '../service/administrativeRegionGetlAll.service'
import { type AdministrativeRegionFilters } from '../../application/createAdministrativeRegionQueryParams'

const repository = new AdministrativeRegionGetAllService()
const getAll = new AdministrativeRegionGetByCriteria(repository)

export const useGetAllAdministrativeRegion = (query: AdministrativeRegionFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['administrativeRegions', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
