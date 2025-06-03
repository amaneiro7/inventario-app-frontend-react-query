import { type DeviceMonitoringDashboardByStateDto } from '../dto/DeviceMonitoringDashboardByState.dto'

export abstract class DeviceMonitoringDashboardByStateRepository {
	abstract get(): Promise<DeviceMonitoringDashboardByStateDto>
}
