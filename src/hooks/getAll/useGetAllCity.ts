import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CityGetAllService } from '@/core/locations/city/infra/cityGetAll.service'
import {
	type CityFilters,
	CityGetByCriteria
} from '@/core/locations/city/application/CityGetByCriteria'

export const useGetAllCity = (query: CityFilters) => {
	const repository = useMemo(() => new CityGetAllService(), [])
	const getAll = useMemo(() => new CityGetByCriteria(repository), [repository])

	const {
		isLoading,
		isError,
		data: cities
	} = useQuery({
		queryKey: ['cities', query.options],
		queryFn: async () => await getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		isError,
		cities
	}
}
