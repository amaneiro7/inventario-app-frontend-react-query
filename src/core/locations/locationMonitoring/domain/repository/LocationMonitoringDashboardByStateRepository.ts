import { type LocationMonitoringDashboardByStateDto } from '../dto/LocationMonitoringDashboardByState.dto'

export abstract class LocationMonitoringDashboardByStateRepository {
	abstract get(): Promise<LocationMonitoringDashboardByStateDto>
}
