import { DeviceGetAllRepository } from '../../domain/repository/DeviceGetAllRepository'
import { DeviceGetAll } from '../DeviceGetAll'
import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { createDeviceQueryParams, type DevicePartsFilters } from './CreateDevicePartsParams'

export const defaultMainCategoryValue = MainCategoryOptions.PARTS

export class DevicePartsFilter {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'categoryId'
	private readonly getAll: DeviceGetAll
	constructor(private readonly repository: DeviceGetAllRepository) {
		this.getAll = new DeviceGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = DevicePartsFilter.defaultPageSize,
		orderBy = DevicePartsFilter.defaultOrderBy,
		orderType,
		...options
	}: DevicePartsFilters) {
		const queryParams = await createDeviceQueryParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType,
			defaultQuery: 'parts'
		})

		return this.getAll.execute(queryParams)
	}
}
