import { DeviceMonitoringStatuses } from '../value-object/DeviceMonitoringStatus'

export interface DeviceMonitoringDashboardDto {
	total: number
	[DeviceMonitoringStatuses.ONLINE]: number
	[DeviceMonitoringStatuses.OFFLINE]: number
}
