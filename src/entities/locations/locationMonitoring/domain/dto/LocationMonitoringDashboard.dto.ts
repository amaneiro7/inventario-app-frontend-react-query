import { LocationMonitoringStatuses } from '../value-object/LocationMonitoringStatus'

export interface LocationMonitoringDashboardDto {
	total: number
	[LocationMonitoringStatuses.ONLINE]: number
	[LocationMonitoringStatuses.OFFLINE]: number
}
