import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrandGetAllService } from '@/core/brand/infra/service/brandGetAll.service'
import { type BrandFilters, BrandGetByCriteria } from '@/core/brand/application/BrandGetByCiteria'

export const useGetAllBrands = (query: BrandFilters) => {
	const repository = useMemo(() => new BrandGetAllService(), [])
	const getAll = useMemo(() => new BrandGetByCriteria(repository), [repository])
	const {
		isLoading,
		isError,
		data: brands
	} = useQuery({
		queryKey: ['brands', query.options],
		queryFn: async () => await getAll.search(query)
	})

	return {
		isLoading,
		isError,
		brands
	}
}
