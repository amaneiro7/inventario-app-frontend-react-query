import { DeviceMonitoringStatuses } from '../value-object/Status'

export interface DeviceMonitoringDashboardDto {
	total: number
	[DeviceMonitoringStatuses.ONLINE]: number
	[DeviceMonitoringStatuses.OFFLINE]: number
}
