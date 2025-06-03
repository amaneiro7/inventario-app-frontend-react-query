import { type DeviceMonitoringDashboardDto } from '../domain/dto/DeviceMonitoringDashboard.dto'
import { type DeviceMonitoringDashboardRepository } from '../domain/repository/DeviceMonitoringDashboardRepository'
import {
	createDeviceMonitoringParams,
	type DeviceMonitoringFilters
} from './createDeviceMonitoringQueryParams'

export class GetDeviceMonitoringDashboard {
	constructor(
		private readonly deviceMonitoringDashboardRepository: DeviceMonitoringDashboardRepository
	) {}

	async execute({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...query
	}: DeviceMonitoringFilters): Promise<DeviceMonitoringDashboardDto> {
		const queryParams = await createDeviceMonitoringParams(query)
		return await this.deviceMonitoringDashboardRepository.get(queryParams)
	}
}
