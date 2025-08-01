import { type LocationMonitoringDashboardByStateDto } from '../dto/LocationMonitoringDashboardByState.dto'

export abstract class LocationMonitoringDashboardByStateRepository {
	abstract get(queryParams?: string): Promise<LocationMonitoringDashboardByStateDto>
}
