import { useQuery } from '@tanstack/react-query'
import { MemoryRamTypeGetAllService } from '../service/memoryRamTypeGetAll.service'
import { MemoryRamTypeGetByCriteria } from '../../application/MemoryRamTypeGetByCriteria'
import { type MemoryRamTypeFilters } from '../../application/createMemoryRamTypeQueryParams'

const repository = new MemoryRamTypeGetAllService()
const getAll = new MemoryRamTypeGetByCriteria(repository)
export const useGetAllMemoryRamType = (query: MemoryRamTypeFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['memoryRamTypes', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
