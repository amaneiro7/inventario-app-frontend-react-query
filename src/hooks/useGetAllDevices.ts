import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

export const useGetAllDevicess = () => {
	const repository = useMemo(() => new DeviceGetAllService(), [])
	const getAll = useMemo(() => new DevicesGetAll(repository).execute(), [repository])
	const {
		isLoading,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices'],
		queryFn: () => getAll
	})

	return {
		isLoading,
		isError,
		devices
	}
}
