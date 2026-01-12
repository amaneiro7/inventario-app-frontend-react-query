import { useQuery } from '@tanstack/react-query'
import { AppSettingsGetAllowedDomainsService } from '../service/appSettingsGetAllowedDomains.service'
import { AppSettingsGetAllowedDomains } from '../../application/AppSettingsGetAllowedDomains'

const repository = new AppSettingsGetAllowedDomainsService()
const getAllowedDomains = new AppSettingsGetAllowedDomains(repository)

/**
 * A React Query hook for fetching all directiva data based on provided filters.
 * It uses `DirectivaGetByCriteria` to perform the search and caches the results.
 *
 * @param query - An object containing filter criteria and pagination options for fetching directivas.
 * @returns An object containing the loading state, refetch function, error state, and the fetched data.
 */
export const useGetAllowedDomainsAppSettings = () => {
	return useQuery({
		queryKey: ['appSettingsAllowedDomains'],
		queryFn: () => getAllowedDomains.execute(),
		staleTime: Infinity,
		retry: true
	})
}
