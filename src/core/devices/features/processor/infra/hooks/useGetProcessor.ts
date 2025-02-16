import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProcessorGetService } from '../service/processorGet.service'
import { ProcessorGetter } from '../../application/ProcessorGetter'
import { type ProcessorId } from '../../domain/value-object/ProcessorId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export function useGetProcessor({ id }: { id: Primitives<ProcessorId> }) {
	const repository = useMemo(() => new ProcessorGetService(), [])
	const get = useMemo(() => new ProcessorGetter(repository), [repository])
	const { data, isLoading, isError } = useQuery({
		queryKey: ['processor', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError
	}
}
