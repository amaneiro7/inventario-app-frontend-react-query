import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrandGetAllService } from '@/core/brand/infra/service/brandGetAll.service'
import { BrandGetByCriteria } from '@/core/brand/application/BrandGetByCiteria'
import { type BrandFilters } from '../../application/createBrandQueryParams'

export const useGetAllBrands = (query: BrandFilters) => {
	const repository = useMemo(() => new BrandGetAllService(), [])
	const getAll = useMemo(() => new BrandGetByCriteria(repository), [repository])
	const {
		isLoading,
		refetch,
		isError,
		data: brands
	} = useQuery({
		queryKey: ['brands', query],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		refetch,
		isError,
		brands
	}
}
