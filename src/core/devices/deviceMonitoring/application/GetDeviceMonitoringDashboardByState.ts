import { type DeviceMonitoringDashboardByStateDto } from '../domain/dto/DeviceMonitoringDashboardByState.dto'
import { type DeviceMonitoringDashboardByStateRepository } from '../domain/repository/DeviceMonitoringDashboardByStateRepository'

export class GetDeviceMonitoringDashboardByState {
	constructor(
		private readonly deviceMonitoringDashboardByStateRepository: DeviceMonitoringDashboardByStateRepository
	) {}

	async execute(): Promise<DeviceMonitoringDashboardByStateDto> {
		return await this.deviceMonitoringDashboardByStateRepository.get()
	}
}
