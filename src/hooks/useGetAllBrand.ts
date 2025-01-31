import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrandGetAllService } from '@/core/brand/infra/brandGetAll.service'
import { BrandGetAll } from '@/core/brand/application/BrandGetAll'

export const useGetAllBrands = () => {
	const repository = useMemo(() => new BrandGetAllService(), [])
	const getAll = useMemo(() => new BrandGetAll(repository).execute(), [repository])
	const {
		isLoading,
		isError,
		data: brands
	} = useQuery({
		queryKey: ['brands'],
		queryFn: () => getAll
	})

	return {
		isLoading,
		isError,
		brands
	}
}
