import { type LocationMonitoringDashboardDto } from '../dto/LocationMonitoringDashboard.dto'

export abstract class LocationMonitoringDashboardRepository {
	abstract get(queryParams?: string): Promise<LocationMonitoringDashboardDto>
}
