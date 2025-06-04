import { type LocationMonitoringDashboardByStateDto } from '../domain/dto/LocationMonitoringDashboardByState.dto'
import { type LocationMonitoringDashboardByStateRepository } from '../domain/repository/LocationMonitoringDashboardByStateRepository'

export class GetLocationMonitoringDashboardByState {
	constructor(
		private readonly locationMonitoringDashboardByStateRepository: LocationMonitoringDashboardByStateRepository
	) {}

	async execute(): Promise<LocationMonitoringDashboardByStateDto> {
		return await this.locationMonitoringDashboardByStateRepository.get()
	}
}
