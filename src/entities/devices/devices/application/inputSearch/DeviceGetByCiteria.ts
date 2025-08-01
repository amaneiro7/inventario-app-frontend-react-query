import { DeviceGetAllRepository } from '../../domain/repository/DeviceGetAllRepository'
import { DeviceGetAll } from '../DeviceGetAll'
import { type DeviceFilters, createDeviceParams } from './createDeviceQueryParams'

export class DeviceGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 10
	static readonly defaultOrderBy = 'serial'
	private readonly getAll: DeviceGetAll
	constructor(private readonly repository: DeviceGetAllRepository) {
		this.getAll = new DeviceGetAll(this.repository)
	}

	async search({
		pageNumber,
		pageSize = DeviceGetByCriteria.defaultPageSize,
		orderBy = DeviceGetByCriteria.defaultOrderBy,
		orderType,
		...options
	}: DeviceFilters) {
		const queryParams = await createDeviceParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
