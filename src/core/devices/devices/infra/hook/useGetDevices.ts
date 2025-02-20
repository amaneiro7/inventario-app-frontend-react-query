import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DeviceGetter } from '../../application/DeviceGetter'
import { DeviceGetService } from '../service/deviceGet.service'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DeviceId } from '../../domain/value-object/DeviceId'

export function useGetDevice({ id }: { id: Primitives<DeviceId> }) {
	const repository = useMemo(() => new DeviceGetService(), [])
	const get = useMemo(() => new DeviceGetter(repository), [repository])
	const { data, isLoading, isError } = useQuery({
		queryKey: ['device', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError
	}
}
