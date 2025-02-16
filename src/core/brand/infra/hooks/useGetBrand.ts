import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrandGetService } from '../service/brandGet.service'
import { BrandGetter } from '../../application/BrandGetter'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type BrandId } from '../../domain/value-object/BrandId'

export function useGetBrand({ id }: { id: Primitives<BrandId> }) {
	const repository = useMemo(() => new BrandGetService(), [])
	const get = useMemo(() => new BrandGetter(repository), [repository])
	const { data, isLoading, isError } = useQuery({
		queryKey: ['brand', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError
	}
}
