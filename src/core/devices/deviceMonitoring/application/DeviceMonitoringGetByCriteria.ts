import { type DeviceMonitoringGetAllRepository } from '../domain/repository/DeviceMonitoringGetAllRepository'
import {
	createDeviceMonitoringParams,
	type DeviceMonitoringFilters
} from './createDeviceMonitoringQueryParams'
import { DeviceMonitoringGetAll } from './DeviceMonitoringGetAll'

export class DeviceMonitoringGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	private readonly getAll: DeviceMonitoringGetAll
	constructor(private readonly repository: DeviceMonitoringGetAllRepository) {
		this.getAll = new DeviceMonitoringGetAll(this.repository)
	}

	async search({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...options
	}: DeviceMonitoringFilters) {
		const queryParams = await createDeviceMonitoringParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
