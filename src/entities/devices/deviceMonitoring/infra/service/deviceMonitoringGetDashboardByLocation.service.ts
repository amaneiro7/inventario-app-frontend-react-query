import { fetching } from '@/shared/api/api'
import { type DeviceMonitoringDashboardByLocationRepository } from '../../domain/repository/DeviceMonitoringDashboardByLocationRepository'
import { type DeviceMonitoringDashboardByLocationDto } from '../../domain/dto/DeviceMonitoringDashboardByLocation.dto'
import { deviceMonitoringDashboardByLocationUrl } from '../../domain/entity/baseUrl'

export class DeviceMonitoringDashboardByLocationService
	implements DeviceMonitoringDashboardByLocationRepository
{
	async get(queryParams?: string): Promise<DeviceMonitoringDashboardByLocationDto[]> {
		return await fetching({
			url: `${deviceMonitoringDashboardByLocationUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
