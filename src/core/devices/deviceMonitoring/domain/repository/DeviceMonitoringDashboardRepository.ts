import { type DeviceMonitoringDashboardDto } from '../dto/DeviceMonitoringDashboard.dto'

export abstract class DeviceMonitoringDashboardRepository {
	abstract get(queryParams?: string): Promise<DeviceMonitoringDashboardDto>
}
