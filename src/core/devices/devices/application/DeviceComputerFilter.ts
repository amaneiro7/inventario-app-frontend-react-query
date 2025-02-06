import { DeviceGetAllRepository } from '../domain/repository/DeviceGetAllRepository'
import { DeviceGetAll } from './DeviceGetAll'
import { MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'
import { createDeviceQueryParams, type DeviceComputerFilters } from './CreateDeviceComputerParams'

export const defaultMainCategoryValue = MainCategoryOptions.COMPUTER

export class DeviceComputerFilter {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'employeeId'
	private readonly getAll: DeviceGetAll
	constructor(private readonly repository: DeviceGetAllRepository) {
		this.getAll = new DeviceGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = DeviceComputerFilter.defaultPageSize,
		orderBy = DeviceComputerFilter.defaultOrderBy,
		orderType,
		...options
	}: DeviceComputerFilters) {
		const queryParams = await createDeviceQueryParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType,
			defaultQuery: 'computer'
		})

		return this.getAll.execute(queryParams)
	}
}
