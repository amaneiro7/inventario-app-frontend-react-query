import { useQuery } from '@tanstack/react-query'
import { AppSettingsGetAllService } from '../service/appSettingsGetAll.service'
import { AppSettingsGetAll } from '../../application/AppSettingsGetAll'

const repository = new AppSettingsGetAllService()
const getAll = new AppSettingsGetAll(repository)

/**
 * A React Query hook for fetching all directiva data based on provided filters.
 * It uses `DirectivaGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching directivas.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllAppSettings = () => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['appSettings'],
		queryFn: () => getAll.execute(),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
