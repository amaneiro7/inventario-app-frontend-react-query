import { useQuery } from '@tanstack/react-query'
import { HardDriveTypeGetAllService } from '../service/hardDriveTypeGetAll.service'
import { HardDriveTypeGetByCriteria } from '../../application/HardDriveTypeGetByCriteria'
import { type HardDriveTypeFilters } from '../../application/createHardDriveTypeQueryParams'

const repository = new HardDriveTypeGetAllService()
const getAll = new HardDriveTypeGetByCriteria(repository)
export const useGetAllHardDriveType = (query: HardDriveTypeFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['hardDriveTypes', query],
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
