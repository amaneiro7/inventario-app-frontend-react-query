import { type LocationMonitoringDashboardDto } from '../domain/dto/LocationMonitoringDashboard.dto'
import { type LocationMonitoringDashboardRepository } from '../domain/repository/LocationMonitoringDashboardRepository'
import {
	createLocationMonitoringParams,
	type LocationMonitoringFilters
} from './createLocationMonitoringQueryParams'

export class GetLocationMonitoringDashboard {
	constructor(
		private readonly locationMonitoringDashboardRepository: LocationMonitoringDashboardRepository
	) {}

	async execute({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...query
	}: LocationMonitoringFilters): Promise<LocationMonitoringDashboardDto> {
		const queryParams = await createLocationMonitoringParams(query)
		return await this.locationMonitoringDashboardRepository.get(queryParams)
	}
}
