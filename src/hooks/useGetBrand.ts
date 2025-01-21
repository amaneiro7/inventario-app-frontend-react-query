import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrandGetService } from '@/core/brand/infra/brandGet.service'
import { BrandGetter } from '@/core/brand/application/BrandGetter'

export const useGetBrand = () => {
	const repository = useMemo(() => new BrandGetService(), [])
	const get = useMemo(() => new BrandGetter(repository), [repository])
	const id = '44a3ac97-5e7c-402a-a3df-ebd1c5bbecaf'
	const {
		isLoading,
		isError,
		data: brand
	} = useQuery({
		queryKey: ['brand', id],
		queryFn: () => get.execute({ id }),
		refetchOnWindowFocus: false,
		staleTime: Infinity
	})

	return {
		isLoading,
		isError,
		brand
	}
}
