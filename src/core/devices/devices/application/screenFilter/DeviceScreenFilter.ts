import { DeviceGetAllRepository } from '../../domain/repository/DeviceGetAllRepository'
import { DeviceGetAll } from '../DeviceGetAll'
import { MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'
import { createDeviceQueryParams, type DeviceScreenFilters } from './CreateDeviceScreenParams'

export const defaultMainCategoryValue = MainCategoryOptions.SCREENS

export class DeviceScreenFilter {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'employeeId'
	private readonly getAll: DeviceGetAll
	constructor(private readonly repository: DeviceGetAllRepository) {
		this.getAll = new DeviceGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = DeviceScreenFilter.defaultPageSize,
		orderBy = DeviceScreenFilter.defaultOrderBy,
		orderType,
		...options
	}: DeviceScreenFilters) {
		const queryParams = await createDeviceQueryParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType,
			defaultQuery: 'monitor'
		})

		return this.getAll.execute(queryParams)
	}
}
