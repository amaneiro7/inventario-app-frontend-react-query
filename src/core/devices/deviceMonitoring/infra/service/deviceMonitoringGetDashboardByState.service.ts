import { fetching } from '@/api/api'
import { type DeviceMonitoringDashboardByStateRepository } from '../../domain/repository/DeviceMonitoringDashboardByStateRepository'
import { type DeviceMonitoringDashboardByStateDto } from '../../domain/dto/DeviceMonitoringDashboardByState.dto'
import { deviceMonitoringDashboardByStateUrl } from '../../domain/entity/baseUrl'

export class DeviceMonitoringDashboardByStateService
	implements DeviceMonitoringDashboardByStateRepository
{
	async get(queryParams?: string): Promise<DeviceMonitoringDashboardByStateDto> {
		return await fetching({
			url: `${deviceMonitoringDashboardByStateUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
