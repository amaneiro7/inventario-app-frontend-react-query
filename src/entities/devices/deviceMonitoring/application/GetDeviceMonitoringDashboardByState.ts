import { type DeviceMonitoringDashboardByStateDto } from '../domain/dto/DeviceMonitoringDashboardByState.dto'
import { type DeviceMonitoringDashboardByStateRepository } from '../domain/repository/DeviceMonitoringDashboardByStateRepository'
import {
	createDeviceMonitoringParams,
	type DeviceMonitoringFilters
} from './createDeviceMonitoringQueryParams'

export class GetDeviceMonitoringDashboardByState {
	constructor(
		private readonly deviceMonitoringDashboardByStateRepository: DeviceMonitoringDashboardByStateRepository
	) {}

	async execute({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...query
	}: DeviceMonitoringFilters): Promise<DeviceMonitoringDashboardByStateDto> {
		const queryParams = await createDeviceMonitoringParams(query)
		return await this.deviceMonitoringDashboardByStateRepository.get(queryParams)
	}
}
