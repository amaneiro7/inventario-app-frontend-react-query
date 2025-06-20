import { fetching } from '@/api/api'
import { type LocationMonitoringDashboardByStateRepository } from '../../domain/repository/LocationMonitoringDashboardByStateRepository'
import { type LocationMonitoringDashboardByStateDto } from '../../domain/dto/LocationMonitoringDashboardByState.dto'
import { locationMonitoringDashboardByStateUrl } from '../../domain/entity/baseUrl'

export class LocationMonitoringDashboardByStateService
	implements LocationMonitoringDashboardByStateRepository
{
	async get(queryParams?: string): Promise<LocationMonitoringDashboardByStateDto> {
		return await fetching({
			url: `${locationMonitoringDashboardByStateUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
