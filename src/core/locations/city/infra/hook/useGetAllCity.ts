import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CityGetAllService } from '../service/cityGetAll.service'
import { CityGetByCriteria } from '@/core/locations/city/application/CityGetByCriteria'
import { type CityFilters } from '../../application/createCityQueryParams'

export const useGetAllCity = (query: CityFilters) => {
	const repository = useMemo(() => new CityGetAllService(), [])
	const getAll = useMemo(() => new CityGetByCriteria(repository), [repository])

	const {
		isLoading,
		refetch,
		isError,
		data: cities
	} = useQuery({
		queryKey: ['cities', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		cities
	}
}
