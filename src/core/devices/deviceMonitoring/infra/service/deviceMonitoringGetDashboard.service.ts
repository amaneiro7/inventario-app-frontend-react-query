import { fetching } from '@/api/api'
import { type DeviceMonitoringDashboardRepository } from '../../domain/repository/DeviceMonitoringDashboardRepository'
import { type DeviceMonitoringDashboardDto } from '../../domain/dto/DeviceMonitoringDashboard.dto'
import { deviceMonitoringDashboardUrl } from '../../domain/entity/baseUrl'

export class DeviceMonitoringDashboardService implements DeviceMonitoringDashboardRepository {
	async get(queryParams?: string): Promise<DeviceMonitoringDashboardDto> {
		return await fetching({
			url: `${deviceMonitoringDashboardUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
