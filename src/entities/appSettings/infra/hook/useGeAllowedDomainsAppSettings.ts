import { useSuspenseQuery } from '@tanstack/react-query'
import { AppSettingsGetAllowedDomainsService } from '../service/appSettingsGetAllowedDomains.service'
import { AppSettingsGetAllowedDomains } from '../../application/AppSettingsGetAllowedDomains'
import { cleanStringToArray } from '@/shared/lib/utils/cleanStringToArray'

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
	return useSuspenseQuery({
		queryKey: ['appSettings, allowedDomains'],
		queryFn: () => getAllowedDomains.execute(),
		staleTime: Infinity,
		retry: 3,
		retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponencial
		select: data => cleanStringToArray(data.value)
	})
}
