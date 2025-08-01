import { LocationMonitoringStatuses } from '../value-object/LocationMonitoringStatus'

export interface LocationMonitoringDashboardByStateDto {
	total: number
	[LocationMonitoringStatuses.ONLINE]: number
	[LocationMonitoringStatuses.OFFLINE]: number
	byState: {
		stateName: string
		total: number
		onlineCount: number
		offlineCount: number
	}[]
}
