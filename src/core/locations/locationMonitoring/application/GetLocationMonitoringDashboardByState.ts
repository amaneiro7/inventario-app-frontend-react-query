import { type LocationMonitoringDashboardByStateDto } from '../domain/dto/LocationMonitoringDashboardByState.dto'
import { type LocationMonitoringDashboardByStateRepository } from '../domain/repository/LocationMonitoringDashboardByStateRepository'
import {
	createLocationMonitoringParams,
	type LocationMonitoringFilters
} from './createLocationMonitoringQueryParams'

export class GetLocationMonitoringDashboardByState {
	constructor(
		private readonly locationMonitoringDashboardByStateRepository: LocationMonitoringDashboardByStateRepository
	) {}

	async execute({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...query
	}: LocationMonitoringFilters): Promise<LocationMonitoringDashboardByStateDto> {
		const queryParams = await createLocationMonitoringParams(query)
		return await this.locationMonitoringDashboardByStateRepository.get(queryParams)
	}
}
