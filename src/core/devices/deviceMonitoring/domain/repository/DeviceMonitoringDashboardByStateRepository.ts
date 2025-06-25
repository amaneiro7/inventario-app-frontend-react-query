import { type DeviceMonitoringDashboardByStateDto } from '../dto/DeviceMonitoringDashboardByState.dto'

export abstract class DeviceMonitoringDashboardByStateRepository {
	abstract get(queryParams?: string): Promise<DeviceMonitoringDashboardByStateDto>
}
