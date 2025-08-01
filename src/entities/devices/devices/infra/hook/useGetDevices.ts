import { useQuery } from '@tanstack/react-query'
import { DeviceGetter } from '../../application/DeviceGetter'
import { DeviceGetService } from '../service/deviceGet.service'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceId } from '../../domain/value-object/DeviceId'

const repository = new DeviceGetService()
const get = new DeviceGetter(repository)
export function useGetDevice({ id }: { id: Primitives<DeviceId> }) {
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
