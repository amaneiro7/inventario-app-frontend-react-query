import { fetching } from '@/shared/api/api'
import { type LocationMonitoringDashboardRepository } from '../../domain/repository/LocationMonitoringDashboardRepository'
import { type LocationMonitoringDashboardDto } from '../../domain/dto/LocationMonitoringDashboard.dto'
import { locationMonitoringDashboardUrl } from '../../domain/entity/baseUrl'

export class LocationMonitoringDashboardService implements LocationMonitoringDashboardRepository {
	async get(queryParams?: string): Promise<LocationMonitoringDashboardDto> {
		return await fetching({
			url: `${locationMonitoringDashboardUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
