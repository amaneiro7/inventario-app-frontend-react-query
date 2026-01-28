import { fetching } from '@/shared/api/api'
import { type StatusDashboardRepository } from '../../domain/repository/StatusDashboardRepository'
import { type StatusDashboardDto } from '../../domain/dto/StatusDashboard.dto'
import { statusDashboardUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the StatusDashboardRepository interface using the fetching utility.
 * This service is responsible for retrieving status dashboard data from the API.
 */
export class StatusDashboardService implements StatusDashboardRepository {
	/**
	 * Retrieves the status dashboard data.
	 * @returns A Promise that resolves to the StatusDashboardDto.
	 */
	async get(): Promise<StatusDashboardDto> {
		return await fetching({
			url: statusDashboardUrl,
			method: 'GET'
		})
	}
}
