import { type DeviceMonitoringDashboardByLocationDto } from '../dto/DeviceMonitoringDashboardByLocation.dto'

export abstract class DeviceMonitoringDashboardByLocationRepository {
	abstract get(queryParams?: string): Promise<DeviceMonitoringDashboardByLocationDto[]>
}
