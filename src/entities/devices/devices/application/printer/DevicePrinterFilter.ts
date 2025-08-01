import { DeviceGetAllRepository } from '../../domain/repository/DeviceGetAllRepository'
import { DeviceGetAll } from '../DeviceGetAll'
import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { createDeviceQueryParams, type DevicePrinterFilters } from './CreateDevicePrinterParams'

export const defaultMainCategoryValue = MainCategoryOptions.PRINTERS

export class DevicePrinterFilter {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'employeeId'
	private readonly getAll: DeviceGetAll
	constructor(private readonly repository: DeviceGetAllRepository) {
		this.getAll = new DeviceGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = DevicePrinterFilter.defaultPageSize,
		orderBy = DevicePrinterFilter.defaultOrderBy,
		orderType,
		...options
	}: DevicePrinterFilters) {
		const queryParams = await createDeviceQueryParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType,
			defaultQuery: 'printer'
		})

		return this.getAll.execute(queryParams)
	}
}
