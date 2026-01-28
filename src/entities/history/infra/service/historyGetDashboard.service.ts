import { fetching } from '@/shared/api/api'
import { type HistoryDashboardRepository } from '../../domain/repository/HistoryDashboardRepository'
import { type HistoryDashboardDto } from '../../domain/dto/HistoryDashboard.dto'
import { historyDashboardUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the HistoryDashboardRepository interface using the fetching utility.
 * This service is responsible for retrieving history dashboard data from the API.
 */
export class HistoryDashboardService implements HistoryDashboardRepository {
	/**
	 * Retrieves the history dashboard data.
	 * @returns A Promise that resolves to the HistoryDashboardDto.
	 */
	async get(): Promise<HistoryDashboardDto> {
		return await fetching({
			url: historyDashboardUrl,
			method: 'GET'
		})
	}
}
