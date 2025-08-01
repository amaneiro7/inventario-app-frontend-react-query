import { type DeviceMonitoringDashboardByLocationDto } from '../domain/dto/DeviceMonitoringDashboardByLocation.dto'
import { type DeviceMonitoringDashboardByLocationRepository } from '../domain/repository/DeviceMonitoringDashboardByLocationRepository'
import {
	createDeviceMonitoringParams,
	type DeviceMonitoringFilters
} from './createDeviceMonitoringQueryParams'

export class GetDeviceMonitoringDashboardByLocation {
	constructor(
		private readonly deviceMonitoringDashboardByLocationRepository: DeviceMonitoringDashboardByLocationRepository
	) {}

	async execute({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...query
	}: DeviceMonitoringFilters): Promise<DeviceMonitoringDashboardByLocationDto[]> {
		const queryParams = await createDeviceMonitoringParams(query)
		return await this.deviceMonitoringDashboardByLocationRepository.get(queryParams)
	}
}
