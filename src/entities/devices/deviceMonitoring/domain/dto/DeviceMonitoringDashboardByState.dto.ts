import { DeviceMonitoringStatuses } from '../value-object/Status'

export interface DeviceMonitoringDashboardByStateDto {
	total: number
	[DeviceMonitoringStatuses.ONLINE]: number
	[DeviceMonitoringStatuses.OFFLINE]: number
	byState: {
		stateName: string
		total: number
		onlineCount: number
		offlineCount: number
	}[]
}
