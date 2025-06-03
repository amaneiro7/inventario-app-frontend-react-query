import { DeviceMonitoringStatuses } from '../value-object/DeviceMonitoringStatus'

export interface DeviceMonitoringDashboardByStateDto {
	total: number
	[DeviceMonitoringStatuses.ONLINE]: number
	[DeviceMonitoringStatuses.OFFLINE]: number
	byState: {
		stateName: string
		total: number
		[DeviceMonitoringStatuses.ONLINE]: number
		[DeviceMonitoringStatuses.OFFLINE]: number
	}[]
}
