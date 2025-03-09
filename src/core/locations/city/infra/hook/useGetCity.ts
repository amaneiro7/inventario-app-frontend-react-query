import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CityGetService } from '../service/cityGet.service'
import { CityGetter } from '../../application/CityGetter'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CityId } from '../../domain/value-object/CityId'

export function useGetCity({ id }: { id: Primitives<CityId> }) {
	const repository = useMemo(() => new CityGetService(), [])
	const get = useMemo(() => new CityGetter(repository), [repository])
	const { data, isLoading, isError } = useQuery({
		queryKey: ['city', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError
	}
}
